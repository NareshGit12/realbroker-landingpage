// POST { invite_request_id }
// Sends the fixed "request received" emails for a join request that was just submitted:
// a confirmation to the applicant and the details to support@realbroker.app.
//
// It used to accept any { to, subject, body } and send it from our domain with no auth,
// which let anyone send email as RealBroker. Now the recipients and content are built here
// from the invite_requests row, the row must be less than 30 minutes old, and it is sent
// at most once (invite_requests.confirmation_sent_at).
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPPORT_EMAIL = "support@realbroker.app";
const FROM = "RealBroker <RealBroker@propalyst.com>";
const MAX_AGE_MS = 30 * 60 * 1000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const esc = (v: unknown) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const body = await req.json().catch(() => ({}));
  const id = typeof body?.invite_request_id === "string" ? body.invite_request_id : "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: "Missing invite_request_id" }, 400);

  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", {
    auth: { persistSession: false },
  });

  // Claim the row: only a fresh request, and only once.
  const since = new Date(Date.now() - MAX_AGE_MS).toISOString();
  const { data: rows, error } = await db.from("invite_requests")
    .update({ confirmation_sent_at: new Date().toISOString() })
    .eq("id", id).is("confirmation_sent_at", null).gte("created_at", since)
    .select("name, email, company, city, area, whatsapp_number, message, created_at");
  if (error) {
    console.error("send-notification-email: claim failed:", error.message);
    return json({ error: "Could not send" }, 500);
  }
  const r = rows?.[0];
  if (!r) return json({ success: true, sent: 0 }); // unknown, old, or already sent: say nothing more

  const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
  const submitted = new Date(r.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const details = `
    <p><strong>Name:</strong> ${esc(r.name)}</p>
    <p><strong>Email:</strong> ${esc(r.email)}</p>
    <p><strong>Company:</strong> ${esc(r.company || "Independent")}</p>
    <p><strong>WhatsApp:</strong> ${esc(r.whatsapp_number || "Not provided")}</p>
    <p><strong>City:</strong> ${esc(r.city || "Not provided")}</p>
    <p><strong>Area:</strong> ${esc(r.area || "Not provided")}</p>
    <p><strong>Message:</strong> ${esc(r.message || "No message provided").replace(/\n/g, "<br>")}</p>
    <p><strong>Submitted on:</strong> ${esc(submitted)}</p>`;
  const subject = `${String(r.name ?? "").slice(0, 80)}'s request to join RB has been submitted`;

  let sent = 0;
  const email = String(r.email ?? "").trim();
  if (isEmail(email)) {
    try {
      await resend.emails.send({
        from: FROM,
        to: [email],
        subject,
        reply_to: SUPPORT_EMAIL,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your interest in RealBroker, ${esc(r.name)}!</h2>
          <p>We have received your request to join the RealBroker Network.</p>
          <p>Someone from our team will be in touch with you via WhatsApp soon.</p>
          <br/><h3>Application Details:</h3>${details}
          <br/><p>Best regards,</p><p><strong>The RealBroker Team</strong></p></div>`,
      });
      sent++;
    } catch (e) {
      console.error("send-notification-email: applicant email failed:", e);
    }
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: [SUPPORT_EMAIL],
      subject,
      reply_to: isEmail(email) ? email : SUPPORT_EMAIL,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New request to join RealBroker</h2>${details}
        <p>Review it in manage → Join Requests.</p></div>`,
    });
    sent++;
  } catch (e) {
    console.error("send-notification-email: support email failed:", e);
  }

  return json({ success: true, sent });
});
