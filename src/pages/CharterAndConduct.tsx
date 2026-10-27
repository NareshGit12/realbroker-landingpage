import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/seo/Seo';
import { supabase } from '@/integrations/supabase/client';
import DocLayout, { NumberedText } from '@/components/site/DocLayout';

const FAQS = [
  { q: 'How are the code of conduct and charter enforced?', a: 'Our code of conduct is enforced through our governance council with input from community members. Violations may result in warnings, temporary restrictions, or in severe cases, removal from the network.' },
  { q: 'How can I report a potential violation?', a: 'You can report potential violations through the app, or by contacting our support team at support@realbroker.app. All reports are reviewed promptly and handled with discretion.' },
  { q: 'What happens if someone breaks the code?', a: 'They are notified and given an opportunity to address the issue. Repeated or severe violations result in removal from the platform.' },
];

export default function CharterAndConduct() {
  const [text, setText] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    supabase.from('rb_documents').select('content').eq('doc_name', 'RB_code_of_conduct_long').single()
      .then(({ data, error }) => {
        if (error || !data?.content) { setFailed(true); return; }
        setText(data.content.trim());
      });
  }, []);

  return <>
    <Seo title="Charter and Code of Conduct | RealBroker" description="The charter and code of conduct every RealBroker member agrees to, covering ethics, data quality, and fair collaboration between brokers." path="/charter-and-conduct" />
    <DocLayout current="/charter-and-conduct" title="Code of conduct"
      intro="Built for trust, backed by professionals. By joining RealBroker, you agree to these principles. They protect your deals, your relationships and your reputation in the market.">
      {failed ? <p>We couldn’t load the code of conduct right now. Please try again later.</p>
        : text === null ? <p>Loading…</p>
        : <NumberedText text={text} />}
      <p>Also read our <Link to="/charter">network charter</Link>.</p>
      <h2>Frequently asked questions</h2>
      {FAQS.map((f) => <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}
    </DocLayout>
  </>;
}
