export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent_master: {
        Row: {
          agent_id: number
          agent_name: string | null
          city: string | null
          company_address: string | null
          company_name: string | null
          created_at: string | null
          notes: string | null
          onboarded: boolean | null
          phone: string
          rm: string | null
          serving_areas: string | null
          serving_areas_ids: Json | null
          supplier_type: string | null
          tempphone: string | null
          updated_at: string | null
          welcome_sent: boolean | null
          welcome_sent_at: string | null
        }
        Insert: {
          agent_id?: number
          agent_name?: string | null
          city?: string | null
          company_address?: string | null
          company_name?: string | null
          created_at?: string | null
          notes?: string | null
          onboarded?: boolean | null
          phone: string
          rm?: string | null
          serving_areas?: string | null
          serving_areas_ids?: Json | null
          supplier_type?: string | null
          tempphone?: string | null
          updated_at?: string | null
          welcome_sent?: boolean | null
          welcome_sent_at?: string | null
        }
        Update: {
          agent_id?: number
          agent_name?: string | null
          city?: string | null
          company_address?: string | null
          company_name?: string | null
          created_at?: string | null
          notes?: string | null
          onboarded?: boolean | null
          phone?: string
          rm?: string | null
          serving_areas?: string | null
          serving_areas_ids?: Json | null
          supplier_type?: string | null
          tempphone?: string | null
          updated_at?: string | null
          welcome_sent?: boolean | null
          welcome_sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_master_rm_fkey"
            columns: ["rm"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_profiles_clean: {
        Row: {
          agent_contact: string
          agent_name: string | null
          bhk_max: number | null
          bhk_min: number | null
          company_name: string | null
          demand_buy_count: number
          demand_rent_count: number
          generated_at: string
          lookback_months: number
          messages_sampled: number
          primary_locations: string[] | null
          primary_property_types: string[] | null
          profile_json: Json
          rent_price_max: number | null
          rent_price_min: number | null
          sale_price_max: number | null
          sale_price_min: number | null
          summary_text: string
          supply_rent_count: number
          supply_sale_count: number
          total_posts: number
        }
        Insert: {
          agent_contact: string
          agent_name?: string | null
          bhk_max?: number | null
          bhk_min?: number | null
          company_name?: string | null
          demand_buy_count?: number
          demand_rent_count?: number
          generated_at?: string
          lookback_months?: number
          messages_sampled?: number
          primary_locations?: string[] | null
          primary_property_types?: string[] | null
          profile_json: Json
          rent_price_max?: number | null
          rent_price_min?: number | null
          sale_price_max?: number | null
          sale_price_min?: number | null
          summary_text: string
          supply_rent_count?: number
          supply_sale_count?: number
          total_posts: number
        }
        Update: {
          agent_contact?: string
          agent_name?: string | null
          bhk_max?: number | null
          bhk_min?: number | null
          company_name?: string | null
          demand_buy_count?: number
          demand_rent_count?: number
          generated_at?: string
          lookback_months?: number
          messages_sampled?: number
          primary_locations?: string[] | null
          primary_property_types?: string[] | null
          profile_json?: Json
          rent_price_max?: number | null
          rent_price_min?: number | null
          sale_price_max?: number | null
          sale_price_min?: number | null
          summary_text?: string
          supply_rent_count?: number
          supply_sale_count?: number
          total_posts?: number
        }
        Relationships: []
      }
      agreement_audit_trail: {
        Row: {
          action: string
          agreement_id: string
          agreement_type: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown
          performed_by_email: string | null
          performed_by_name: string | null
          recipient_email: string | null
          recipient_name: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          agreement_id: string
          agreement_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown
          performed_by_email?: string | null
          performed_by_name?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          agreement_id?: string
          agreement_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown
          performed_by_email?: string | null
          performed_by_name?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      agreement_documents: {
        Row: {
          agreement_id: string
          created_at: string | null
          document_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          uploaded_by: string | null
        }
        Insert: {
          agreement_id: string
          created_at?: string | null
          document_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Update: {
          agreement_id?: string
          created_at?: string | null
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agreement_documents_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "broker_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agreement_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agreement_messages: {
        Row: {
          agreement_id: string
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          message_type: string | null
          recipient_id: string
          sender_id: string
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          agreement_id: string
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          recipient_id: string
          sender_id: string
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          agreement_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          recipient_id?: string
          sender_id?: string
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agreement_messages_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "broker_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agreement_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agreement_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agreement_signatures: {
        Row: {
          agreement_id: string
          created_at: string | null
          id: string
          ip_address: unknown
          signature_data: Json | null
          signed_at: string | null
          signer_id: string | null
          signer_role: string
          status: Database["public"]["Enums"]["signature_status"] | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          agreement_id: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          signature_data?: Json | null
          signed_at?: string | null
          signer_id?: string | null
          signer_role: string
          status?: Database["public"]["Enums"]["signature_status"] | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          agreement_id?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          signature_data?: Json | null
          signed_at?: string | null
          signer_id?: string | null
          signer_role?: string
          status?: Database["public"]["Enums"]["signature_status"] | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agreement_signatures_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "broker_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agreement_signatures_signer_id_fkey"
            columns: ["signer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agreement_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          template_content: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          template_content: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          template_content?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agreement_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      areas_cleanup: {
        Row: {
          created_at: string
          id: string
          name_to_match: string
          nearest_match: string
          rationale: string | null
          society_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          name_to_match: string
          nearest_match: string
          rationale?: string | null
          society_id: number
        }
        Update: {
          created_at?: string
          id?: string
          name_to_match?: string
          nearest_match?: string
          rationale?: string | null
          society_id?: number
        }
        Relationships: []
      }
      broker_agreements: {
        Row: {
          agreement_date: string | null
          agreement_template_id: string | null
          buyer_commission_fixed_amount: number | null
          buyer_commission_percentage: number | null
          buyer_commission_type:
            | Database["public"]["Enums"]["commission_type"]
            | null
          buyer_pays_commission: boolean | null
          buyers_broker_total_fees: string | null
          created_at: string | null
          created_by: string | null
          custom_terms: string | null
          execution_date: string | null
          expiry_date: string | null
          id: string
          listing_broker_id: string | null
          property_id: string | null
          seller_commission_fixed_amount: number | null
          seller_commission_percentage: number | null
          seller_commission_type:
            | Database["public"]["Enums"]["commission_type"]
            | null
          seller_pays_commission: boolean | null
          sellers_broker_total_fees: string | null
          selling_broker_id: string | null
          special_conditions: string | null
          status: Database["public"]["Enums"]["agreement_status"] | null
          updated_at: string | null
        }
        Insert: {
          agreement_date?: string | null
          agreement_template_id?: string | null
          buyer_commission_fixed_amount?: number | null
          buyer_commission_percentage?: number | null
          buyer_commission_type?:
            | Database["public"]["Enums"]["commission_type"]
            | null
          buyer_pays_commission?: boolean | null
          buyers_broker_total_fees?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_terms?: string | null
          execution_date?: string | null
          expiry_date?: string | null
          id?: string
          listing_broker_id?: string | null
          property_id?: string | null
          seller_commission_fixed_amount?: number | null
          seller_commission_percentage?: number | null
          seller_commission_type?:
            | Database["public"]["Enums"]["commission_type"]
            | null
          seller_pays_commission?: boolean | null
          sellers_broker_total_fees?: string | null
          selling_broker_id?: string | null
          special_conditions?: string | null
          status?: Database["public"]["Enums"]["agreement_status"] | null
          updated_at?: string | null
        }
        Update: {
          agreement_date?: string | null
          agreement_template_id?: string | null
          buyer_commission_fixed_amount?: number | null
          buyer_commission_percentage?: number | null
          buyer_commission_type?:
            | Database["public"]["Enums"]["commission_type"]
            | null
          buyer_pays_commission?: boolean | null
          buyers_broker_total_fees?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_terms?: string | null
          execution_date?: string | null
          expiry_date?: string | null
          id?: string
          listing_broker_id?: string | null
          property_id?: string | null
          seller_commission_fixed_amount?: number | null
          seller_commission_percentage?: number | null
          seller_commission_type?:
            | Database["public"]["Enums"]["commission_type"]
            | null
          seller_pays_commission?: boolean | null
          sellers_broker_total_fees?: string | null
          selling_broker_id?: string | null
          special_conditions?: string | null
          status?: Database["public"]["Enums"]["agreement_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "broker_agreements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_agreements_listing_broker_id_fkey"
            columns: ["listing_broker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_agreements_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_agreements_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_with_agent"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_agreements_selling_broker_id_fkey"
            columns: ["selling_broker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      broker_lead_management: {
        Row: {
          areas: string[] | null
          company: string | null
          created_at: string | null
          DoNotContact: boolean | null
          email: string | null
          first_interaction: string | null
          fname: string | null
          fourth_interaction: string | null
          id: string
          last_interaction: string | null
          lname: string | null
          notes: string | null
          phone1: string | null
          phone2: string | null
          second_interaction: string | null
          source: string | null
          status: string | null
          team_member: string | null
          third_interaction: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          areas?: string[] | null
          company?: string | null
          created_at?: string | null
          DoNotContact?: boolean | null
          email?: string | null
          first_interaction?: string | null
          fname?: string | null
          fourth_interaction?: string | null
          id?: string
          last_interaction?: string | null
          lname?: string | null
          notes?: string | null
          phone1?: string | null
          phone2?: string | null
          second_interaction?: string | null
          source?: string | null
          status?: string | null
          team_member?: string | null
          third_interaction?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          areas?: string[] | null
          company?: string | null
          created_at?: string | null
          DoNotContact?: boolean | null
          email?: string | null
          first_interaction?: string | null
          fname?: string | null
          fourth_interaction?: string | null
          id?: string
          last_interaction?: string | null
          lname?: string | null
          notes?: string | null
          phone1?: string | null
          phone2?: string | null
          second_interaction?: string | null
          source?: string | null
          status?: string | null
          team_member?: string | null
          third_interaction?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      buyer_agreement_signatures: {
        Row: {
          agreement_id: string
          created_at: string | null
          id: string
          ip_address: unknown
          signature_data: Json | null
          signed_at: string | null
          signer_email: string
          signer_id: string | null
          signer_name: string
          signer_role: string
          status: string | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          agreement_id: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          signature_data?: Json | null
          signed_at?: string | null
          signer_email: string
          signer_id?: string | null
          signer_name: string
          signer_role: string
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          agreement_id?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          signature_data?: Json | null
          signed_at?: string | null
          signer_email?: string
          signer_id?: string | null
          signer_name?: string
          signer_role?: string
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buyer_agreement_signatures_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "buyer_agreements"
            referencedColumns: ["id"]
          },
        ]
      }
      buyer_agreements: {
        Row: {
          agreement_date: string | null
          agreement_term_months: number | null
          broker_address: string | null
          broker_company: string | null
          broker_email: string | null
          broker_id: string
          broker_name: string
          broker_phone: string | null
          budget_range: string | null
          buyer_address: string | null
          buyer_company: string | null
          buyer_email: string
          buyer_name: string
          buyer_phone: string
          commission_details: string | null
          created_at: string | null
          custom_terms: string | null
          expiry_date: string | null
          grace_period_days: number | null
          id: string
          non_circumvention_months: number | null
          property_requirements: string | null
          purchase_commission_percentage: number | null
          rb_agreement_id: string
          rental_commission_percentage: number | null
          special_conditions: string | null
          status: string | null
          updated_at: string | null
          viewing_schedule: Json | null
        }
        Insert: {
          agreement_date?: string | null
          agreement_term_months?: number | null
          broker_address?: string | null
          broker_company?: string | null
          broker_email?: string | null
          broker_id: string
          broker_name: string
          broker_phone?: string | null
          budget_range?: string | null
          buyer_address?: string | null
          buyer_company?: string | null
          buyer_email: string
          buyer_name: string
          buyer_phone: string
          commission_details?: string | null
          created_at?: string | null
          custom_terms?: string | null
          expiry_date?: string | null
          grace_period_days?: number | null
          id?: string
          non_circumvention_months?: number | null
          property_requirements?: string | null
          purchase_commission_percentage?: number | null
          rb_agreement_id: string
          rental_commission_percentage?: number | null
          special_conditions?: string | null
          status?: string | null
          updated_at?: string | null
          viewing_schedule?: Json | null
        }
        Update: {
          agreement_date?: string | null
          agreement_term_months?: number | null
          broker_address?: string | null
          broker_company?: string | null
          broker_email?: string | null
          broker_id?: string
          broker_name?: string
          broker_phone?: string | null
          budget_range?: string | null
          buyer_address?: string | null
          buyer_company?: string | null
          buyer_email?: string
          buyer_name?: string
          buyer_phone?: string
          commission_details?: string | null
          created_at?: string | null
          custom_terms?: string | null
          expiry_date?: string | null
          grace_period_days?: number | null
          id?: string
          non_circumvention_months?: number | null
          property_requirements?: string | null
          purchase_commission_percentage?: number | null
          rb_agreement_id?: string
          rental_commission_percentage?: number | null
          special_conditions?: string | null
          status?: string | null
          updated_at?: string | null
          viewing_schedule?: Json | null
        }
        Relationships: []
      }
      cities: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      company: {
        Row: {
          Address: string | null
          brai: boolean | null
          City: string | null
          CoKey: string | null
          CoName: string | null
          creai: boolean | null
          created_at: string
          id: number
          "last modified": string | null
          Logo: string | null
          Manager: string | null
          nar: boolean | null
          realtor: boolean | null
        }
        Insert: {
          Address?: string | null
          brai?: boolean | null
          City?: string | null
          CoKey?: string | null
          CoName?: string | null
          creai?: boolean | null
          created_at?: string
          id?: number
          "last modified"?: string | null
          Logo?: string | null
          Manager?: string | null
          nar?: boolean | null
          realtor?: boolean | null
        }
        Update: {
          Address?: string | null
          brai?: boolean | null
          City?: string | null
          CoKey?: string | null
          CoName?: string | null
          creai?: boolean | null
          created_at?: string
          id?: number
          "last modified"?: string | null
          Logo?: string | null
          Manager?: string | null
          nar?: boolean | null
          realtor?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "Company_City_fkey"
            columns: ["City"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      connections: {
        Row: {
          created_at: string
          id: string
          recipient_id: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          recipient_id: string
          requester_id: string
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          recipient_id?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      demand_leads: {
        Row: {
          agent_id: number | null
          attention_note: string | null
          client_intent: number | null
          client_name: string | null
          client_profile: string | null
          created_at: string | null
          email: string | null
          id: number
          lead_number: number | null
          lead_status: Database["public"]["Enums"]["demand_lead_status"] | null
          market_feasibility: number | null
          needs_lm_attention: boolean | null
          needs_rm_attention: boolean | null
          next_action_date: string | null
          next_action_notes: string | null
          payload: Json | null
          phone: string | null
          req_keywords: string[] | null
          rm: string | null
          title: string | null
        }
        Insert: {
          agent_id?: number | null
          attention_note?: string | null
          client_intent?: number | null
          client_name?: string | null
          client_profile?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          lead_number?: number | null
          lead_status?: Database["public"]["Enums"]["demand_lead_status"] | null
          market_feasibility?: number | null
          needs_lm_attention?: boolean | null
          needs_rm_attention?: boolean | null
          next_action_date?: string | null
          next_action_notes?: string | null
          payload?: Json | null
          phone?: string | null
          req_keywords?: string[] | null
          rm?: string | null
          title?: string | null
        }
        Update: {
          agent_id?: number | null
          attention_note?: string | null
          client_intent?: number | null
          client_name?: string | null
          client_profile?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          lead_number?: number | null
          lead_status?: Database["public"]["Enums"]["demand_lead_status"] | null
          market_feasibility?: number | null
          needs_lm_attention?: boolean | null
          needs_rm_attention?: boolean | null
          next_action_date?: string | null
          next_action_notes?: string | null
          payload?: Json | null
          phone?: string | null
          req_keywords?: string[] | null
          rm?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_requirement_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_master"
            referencedColumns: ["agent_id"]
          },
        ]
      }
      email_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      email_verification_tokens: {
        Row: {
          created_at: string
          cust_id: number
          expires_at: string
          id: string
          token: string
          used: boolean
        }
        Insert: {
          created_at?: string
          cust_id: number
          expires_at?: string
          id?: string
          token: string
          used?: boolean
        }
        Update: {
          created_at?: string
          cust_id?: number
          expires_at?: string
          id?: string
          token?: string
          used?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "email_verification_tokens_cust_id_fkey"
            columns: ["cust_id"]
            isOneToOne: false
            referencedRelation: "pro_customer"
            referencedColumns: ["cust_id"]
          },
        ]
      }
      flyers: {
        Row: {
          created_at: string
          custom_price_text: string | null
          description: string | null
          id: string
          images: string[] | null
          price: number | null
          property_id: string
          public_id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_price_text?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          price?: number | null
          property_id: string
          public_id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_price_text?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          price?: number | null
          property_id?: string
          public_id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flyers_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flyers_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_with_agent"
            referencedColumns: ["id"]
          },
        ]
      }
      gdrive_Images: {
        Row: {
          created_at: string
          file_location: string | null
          id: number
          images: string[] | null
          source_key: string | null
        }
        Insert: {
          created_at?: string
          file_location?: string | null
          id?: number
          images?: string[] | null
          source_key?: string | null
        }
        Update: {
          created_at?: string
          file_location?: string | null
          id?: number
          images?: string[] | null
          source_key?: string | null
        }
        Relationships: []
      }
      html_generation_metadata: {
        Row: {
          created_at: string | null
          entity_id: string
          entity_type: string
          file_size_bytes: number | null
          generation_duration_ms: number | null
          html_path: string
          id: string
          last_generated_at: string | null
          needs_regeneration: boolean | null
          skip_auto_generation: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          entity_type: string
          file_size_bytes?: number | null
          generation_duration_ms?: number | null
          html_path: string
          id?: string
          last_generated_at?: string | null
          needs_regeneration?: boolean | null
          skip_auto_generation?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          file_size_bytes?: number | null
          generation_duration_ms?: number | null
          html_path?: string
          id?: string
          last_generated_at?: string | null
          needs_regeneration?: boolean | null
          skip_auto_generation?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      html_generation_queue: {
        Row: {
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          entity_id: string
          entity_type: string
          error_message: string | null
          id: string
          priority: number | null
          started_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          entity_id: string
          entity_type: string
          error_message?: string | null
          id?: string
          priority?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          entity_id?: string
          entity_type?: string
          error_message?: string | null
          id?: string
          priority?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "html_generation_queue_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          id: string
          invite_code: string
          invitee_company_name: string | null
          invitee_email: string
          invitee_first_name: string | null
          invitee_last_name: string | null
          invitee_name: string | null
          invitee_phone: string | null
          inviter_id: string
          message: string | null
          recipient_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          id?: string
          invite_code: string
          invitee_company_name?: string | null
          invitee_email: string
          invitee_first_name?: string | null
          invitee_last_name?: string | null
          invitee_name?: string | null
          invitee_phone?: string | null
          inviter_id: string
          message?: string | null
          recipient_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          id?: string
          invite_code?: string
          invitee_company_name?: string | null
          invitee_email?: string
          invitee_first_name?: string | null
          invitee_last_name?: string | null
          invitee_name?: string | null
          invitee_phone?: string | null
          inviter_id?: string
          message?: string | null
          recipient_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      invite_requests: {
        Row: {
          area: string | null
          city: string | null
          company: string
          created_at: string
          email: string
          heading_variant_id: number | null
          id: string
          message: string | null
          name: string
          profile_photo_url: string | null
          recipient_email: string | null
          Status: string | null
          subject: string | null
          whatsapp_number: string | null
        }
        Insert: {
          area?: string | null
          city?: string | null
          company: string
          created_at?: string
          email: string
          heading_variant_id?: number | null
          id?: string
          message?: string | null
          name: string
          profile_photo_url?: string | null
          recipient_email?: string | null
          Status?: string | null
          subject?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          area?: string | null
          city?: string | null
          company?: string
          created_at?: string
          email?: string
          heading_variant_id?: number | null
          id?: string
          message?: string | null
          name?: string
          profile_photo_url?: string | null
          recipient_email?: string | null
          Status?: string | null
          subject?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      leads_sm_rm: {
        Row: {
          assigned_by: string | null
          created_at: string | null
          id: string
          rm_user_id: string
          team_member_id: string
          team_role: Database["public"]["Enums"]["leads_app_role"]
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          rm_user_id: string
          team_member_id: string
          team_role: Database["public"]["Enums"]["leads_app_role"]
        }
        Update: {
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          rm_user_id?: string
          team_member_id?: string
          team_role?: Database["public"]["Enums"]["leads_app_role"]
        }
        Relationships: []
      }
      local_areas: {
        Row: {
          area: string
          area_images: string[] | null
          blog_content: Json | null
          buyer_intelligence: Json | null
          city_id: string
          city_section: string | null
          confidence_score: number | null
          created_at: string
          data_source: string | null
          description: string | null
          featured_image_url: string | null
          id: string
          infrastructure: Json | null
          last_analyzed: string | null
          local_amenities: Json | null
          market_data: Json | null
          narratives: Json | null
          overview: string | null
          property_count: number | null
          search_queries_used: string[] | null
          slug: string | null
          vibe_and_lifestyle: Json | null
        }
        Insert: {
          area: string
          area_images?: string[] | null
          blog_content?: Json | null
          buyer_intelligence?: Json | null
          city_id: string
          city_section?: string | null
          confidence_score?: number | null
          created_at?: string
          data_source?: string | null
          description?: string | null
          featured_image_url?: string | null
          id?: string
          infrastructure?: Json | null
          last_analyzed?: string | null
          local_amenities?: Json | null
          market_data?: Json | null
          narratives?: Json | null
          overview?: string | null
          property_count?: number | null
          search_queries_used?: string[] | null
          slug?: string | null
          vibe_and_lifestyle?: Json | null
        }
        Update: {
          area?: string
          area_images?: string[] | null
          blog_content?: Json | null
          buyer_intelligence?: Json | null
          city_id?: string
          city_section?: string | null
          confidence_score?: number | null
          created_at?: string
          data_source?: string | null
          description?: string | null
          featured_image_url?: string | null
          id?: string
          infrastructure?: Json | null
          last_analyzed?: string | null
          local_amenities?: Json | null
          market_data?: Json | null
          narratives?: Json | null
          overview?: string | null
          property_count?: number | null
          search_queries_used?: string[] | null
          slug?: string | null
          vibe_and_lifestyle?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "local_areas_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      matching_supply: {
        Row: {
          agent_name: string | null
          agent_note: string | null
          agent_phone: string | null
          attention_note: string | null
          created_at: string | null
          created_by: string | null
          date_entered_status: string | null
          id: string
          lead_id: number
          lm_sm_comments: string | null
          match_number: number | null
          match_status: Database["public"]["Enums"]["match_status"]
          needs_lm_attention: boolean | null
          needs_rm_attention: boolean | null
          rejection_reason: string | null
          short_desc: string | null
          supply_id: string
          updated_at: string | null
          urgency_score: number | null
          viewing_date: string | null
        }
        Insert: {
          agent_name?: string | null
          agent_note?: string | null
          agent_phone?: string | null
          attention_note?: string | null
          created_at?: string | null
          created_by?: string | null
          date_entered_status?: string | null
          id?: string
          lead_id: number
          lm_sm_comments?: string | null
          match_number?: number | null
          match_status?: Database["public"]["Enums"]["match_status"]
          needs_lm_attention?: boolean | null
          needs_rm_attention?: boolean | null
          rejection_reason?: string | null
          short_desc?: string | null
          supply_id: string
          updated_at?: string | null
          urgency_score?: number | null
          viewing_date?: string | null
        }
        Update: {
          agent_name?: string | null
          agent_note?: string | null
          agent_phone?: string | null
          attention_note?: string | null
          created_at?: string | null
          created_by?: string | null
          date_entered_status?: string | null
          id?: string
          lead_id?: number
          lm_sm_comments?: string | null
          match_number?: number | null
          match_status?: Database["public"]["Enums"]["match_status"]
          needs_lm_attention?: boolean | null
          needs_rm_attention?: boolean | null
          rejection_reason?: string | null
          short_desc?: string | null
          supply_id?: string
          updated_at?: string | null
          urgency_score?: number | null
          viewing_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matching_supply_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matching_supply_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "demand_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          property_id: string | null
          read_at: string | null
          recipient_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          property_id?: string | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          property_id?: string | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_with_agent"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          chat_messages: boolean
          connection_requests: boolean
          created_at: string
          email_notifications: boolean
          id: string
          new_listings: boolean
          new_members: boolean
          property_views: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          chat_messages?: boolean
          connection_requests?: boolean
          created_at?: string
          email_notifications?: boolean
          id?: string
          new_listings?: boolean
          new_members?: boolean
          property_views?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          chat_messages?: boolean
          connection_requests?: boolean
          created_at?: string
          email_notifications?: boolean
          id?: string
          new_listings?: boolean
          new_members?: boolean
          property_views?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          content: Json
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          read_at: string | null
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          content: Json
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          read_at?: string | null
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          content?: Json
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          read_at?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pro_appointments: {
        Row: {
          appointment_id: number
          cust_id: number
          message: string | null
          preferred_date: string
          preferred_time: string
          status: string
          submitted_at: string
        }
        Insert: {
          appointment_id?: number
          cust_id: number
          message?: string | null
          preferred_date: string
          preferred_time: string
          status?: string
          submitted_at?: string
        }
        Update: {
          appointment_id?: number
          cust_id?: number
          message?: string | null
          preferred_date?: string
          preferred_time?: string
          status?: string
          submitted_at?: string
        }
        Relationships: []
      }
      pro_customer: {
        Row: {
          created_date: string
          cust_id: number
          email: string
          email_verified: string
          name: string
          phone_no: string | null
          phone_verified: string
          Role: number | null
        }
        Insert: {
          created_date?: string
          cust_id?: number
          email: string
          email_verified?: string
          name: string
          phone_no?: string | null
          phone_verified?: string
          Role?: number | null
        }
        Update: {
          created_date?: string
          cust_id?: number
          email?: string
          email_verified?: string
          name?: string
          phone_no?: string | null
          phone_verified?: string
          Role?: number | null
        }
        Relationships: []
      }
      pro_enquiry: {
        Row: {
          best_times: string | null
          cust_id: number
          preferred_contact: string | null
          pro_enq_id: number
          property_id: string
          property_url: string
          submitted_at: string
          title: string
        }
        Insert: {
          best_times?: string | null
          cust_id: number
          preferred_contact?: string | null
          pro_enq_id?: number
          property_id: string
          property_url: string
          submitted_at?: string
          title: string
        }
        Update: {
          best_times?: string | null
          cust_id?: number
          preferred_contact?: string | null
          pro_enq_id?: number
          property_id?: string
          property_url?: string
          submitted_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "pro_enquiry_cust_id_fkey"
            columns: ["cust_id"]
            isOneToOne: false
            referencedRelation: "pro_customer"
            referencedColumns: ["cust_id"]
          },
          {
            foreignKeyName: "pro_enquiry_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pro_enquiry_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_with_agent"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          areas: string[] | null
          avatar_url: string | null
          bio: string | null
          brokercard: string | null
          city: string | null
          company_id: number | null
          company_name: string | null
          email: string | null
          email_daily_summary: boolean | null
          email_instant_notifications: boolean | null
          email_weekly_listings: boolean | null
          email_weekly_members: boolean | null
          Featured_intro: boolean | null
          full_name: string | null
          id: string
          invitedby: string | null
          member_since: string | null
          mkt_emails: boolean | null
          notes: string | null
          phone: string | null
          rating: number | null
          role: string
          static_html_url: string | null
          updated_at: string | null
          vanity_url: string | null
          website: string | null
        }
        Insert: {
          areas?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          brokercard?: string | null
          city?: string | null
          company_id?: number | null
          company_name?: string | null
          email?: string | null
          email_daily_summary?: boolean | null
          email_instant_notifications?: boolean | null
          email_weekly_listings?: boolean | null
          email_weekly_members?: boolean | null
          Featured_intro?: boolean | null
          full_name?: string | null
          id: string
          invitedby?: string | null
          member_since?: string | null
          mkt_emails?: boolean | null
          notes?: string | null
          phone?: string | null
          rating?: number | null
          role?: string
          static_html_url?: string | null
          updated_at?: string | null
          vanity_url?: string | null
          website?: string | null
        }
        Update: {
          areas?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          brokercard?: string | null
          city?: string | null
          company_id?: number | null
          company_name?: string | null
          email?: string | null
          email_daily_summary?: boolean | null
          email_instant_notifications?: boolean | null
          email_weekly_listings?: boolean | null
          email_weekly_members?: boolean | null
          Featured_intro?: boolean | null
          full_name?: string | null
          id?: string
          invitedby?: string | null
          member_since?: string | null
          mkt_emails?: boolean | null
          notes?: string | null
          phone?: string | null
          rating?: number | null
          role?: string
          static_html_url?: string | null
          updated_at?: string | null
          vanity_url?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          area: string | null
          area_id: string | null
          asset_type: Database["public"]["Enums"]["asset_type"] | null
          baths: number | null
          bedrooms: number | null
          bu_area: number | null
          buyer_commission: number | null
          city: string
          city_id: string | null
          created_at: string
          currency: string
          description: string | null
          facing_dir: Database["public"]["Enums"]["direction"] | null
          floor_no: number | null
          id: string
          image_desc: string[] | null
          images: string[] | null
          last_verified: string | null
          maint_charges: number | null
          marketing_tag: string | null
          price: number | null
          property_type: Database["public"]["Enums"]["property_type"]
          publish: number | null
          society_id: number | null
          source_key: string | null
          source_name: string | null
          source_number: number | null
          sqft: number | null
          static_flyer_url: string | null
          static_html_url: string | null
          status: Database["public"]["Enums"]["property_status"] | null
          title: string
          updated_at: string
          user_id: string
          verified_by: string | null
          view_count: number
          visibility: Database["public"]["Enums"]["property_visibility"] | null
        }
        Insert: {
          area?: string | null
          area_id?: string | null
          asset_type?: Database["public"]["Enums"]["asset_type"] | null
          baths?: number | null
          bedrooms?: number | null
          bu_area?: number | null
          buyer_commission?: number | null
          city: string
          city_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          facing_dir?: Database["public"]["Enums"]["direction"] | null
          floor_no?: number | null
          id?: string
          image_desc?: string[] | null
          images?: string[] | null
          last_verified?: string | null
          maint_charges?: number | null
          marketing_tag?: string | null
          price?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          publish?: number | null
          society_id?: number | null
          source_key?: string | null
          source_name?: string | null
          source_number?: number | null
          sqft?: number | null
          static_flyer_url?: string | null
          static_html_url?: string | null
          status?: Database["public"]["Enums"]["property_status"] | null
          title: string
          updated_at?: string
          user_id: string
          verified_by?: string | null
          view_count?: number
          visibility?: Database["public"]["Enums"]["property_visibility"] | null
        }
        Update: {
          area?: string | null
          area_id?: string | null
          asset_type?: Database["public"]["Enums"]["asset_type"] | null
          baths?: number | null
          bedrooms?: number | null
          bu_area?: number | null
          buyer_commission?: number | null
          city?: string
          city_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          facing_dir?: Database["public"]["Enums"]["direction"] | null
          floor_no?: number | null
          id?: string
          image_desc?: string[] | null
          images?: string[] | null
          last_verified?: string | null
          maint_charges?: number | null
          marketing_tag?: string | null
          price?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          publish?: number | null
          society_id?: number | null
          source_key?: string | null
          source_name?: string | null
          source_number?: number | null
          sqft?: number | null
          static_flyer_url?: string | null
          static_html_url?: string | null
          status?: Database["public"]["Enums"]["property_status"] | null
          title?: string
          updated_at?: string
          user_id?: string
          verified_by?: string | null
          view_count?: number
          visibility?: Database["public"]["Enums"]["property_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_properties_area"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "local_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_properties_city"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_society_id_fkey"
            columns: ["society_id"]
            isOneToOne: false
            referencedRelation: "society"
            referencedColumns: ["id"]
          },
        ]
      }
      property_likes: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_likes_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_likes_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_with_agent"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_views: {
        Row: {
          id: string
          ip_address: string | null
          property_id: string
          user_agent: string | null
          user_id: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          ip_address?: string | null
          property_id: string
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          ip_address?: string | null
          property_id?: string
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_with_agent"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rb_documents: {
        Row: {
          content: string | null
          created_at: string
          doc_name: string | null
          id: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          doc_name?: string | null
          id?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          doc_name?: string | null
          id?: number
        }
        Relationships: []
      }
      requirements: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          budget: number
          city_id: string | null
          created_at: string
          deal_type: string
          description: string | null
          id: string
          location_area: string
          property_type: string
          size: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          budget: number
          city_id?: string | null
          created_at?: string
          deal_type: string
          description?: string | null
          id?: string
          location_area: string
          property_type: string
          size?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          budget?: number
          city_id?: string | null
          created_at?: string
          deal_type?: string
          description?: string | null
          id?: string
          location_area?: string
          property_type?: string
          size?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "requirements_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_agreement_signatures: {
        Row: {
          agreement_id: string
          created_at: string | null
          id: string
          ip_address: unknown
          signature_data: Json | null
          signed_at: string | null
          signer_email: string
          signer_id: string | null
          signer_name: string
          signer_role: string
          status: string | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          agreement_id: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          signature_data?: Json | null
          signed_at?: string | null
          signer_email: string
          signer_id?: string | null
          signer_name: string
          signer_role: string
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          agreement_id?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          signature_data?: Json | null
          signed_at?: string | null
          signer_email?: string
          signer_id?: string | null
          signer_name?: string
          signer_role?: string
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seller_agreement_signatures_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "seller_agreements"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_agreements: {
        Row: {
          agreement_date: string | null
          agreement_term_months: number | null
          broker_address: string | null
          broker_company: string | null
          broker_email: string | null
          broker_id: string
          broker_name: string
          broker_phone: string | null
          created_at: string | null
          custom_terms: string | null
          expected_price_rent: string | null
          expiry_date: string | null
          id: string
          non_circumvention_months: number | null
          notice_period_days: number | null
          property_address: string
          property_features: string | null
          property_type: string
          rb_agreement_id: string
          rental_commission: string | null
          sale_commission: string | null
          seller_address: string
          seller_company: string | null
          seller_email: string
          seller_name: string
          seller_phone: string
          special_conditions: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agreement_date?: string | null
          agreement_term_months?: number | null
          broker_address?: string | null
          broker_company?: string | null
          broker_email?: string | null
          broker_id: string
          broker_name: string
          broker_phone?: string | null
          created_at?: string | null
          custom_terms?: string | null
          expected_price_rent?: string | null
          expiry_date?: string | null
          id?: string
          non_circumvention_months?: number | null
          notice_period_days?: number | null
          property_address: string
          property_features?: string | null
          property_type: string
          rb_agreement_id: string
          rental_commission?: string | null
          sale_commission?: string | null
          seller_address: string
          seller_company?: string | null
          seller_email: string
          seller_name: string
          seller_phone: string
          special_conditions?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agreement_date?: string | null
          agreement_term_months?: number | null
          broker_address?: string | null
          broker_company?: string | null
          broker_email?: string | null
          broker_id?: string
          broker_name?: string
          broker_phone?: string | null
          created_at?: string | null
          custom_terms?: string | null
          expected_price_rent?: string | null
          expiry_date?: string | null
          id?: string
          non_circumvention_months?: number | null
          notice_period_days?: number | null
          property_address?: string
          property_features?: string | null
          property_type?: string
          rb_agreement_id?: string
          rental_commission?: string | null
          sale_commission?: string | null
          seller_address?: string
          seller_company?: string | null
          seller_email?: string
          seller_name?: string
          seller_phone?: string
          special_conditions?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      signature_audit_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown
          performed_by: string | null
          signature_request_id: string
          user_agent: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown
          performed_by?: string | null
          signature_request_id: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown
          performed_by?: string | null
          signature_request_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signature_audit_log_signature_request_id_fkey"
            columns: ["signature_request_id"]
            isOneToOne: false
            referencedRelation: "signature_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      signature_requests: {
        Row: {
          agreement_id: string
          created_at: string | null
          declined_at: string | null
          expires_at: string | null
          id: string
          message: string | null
          recipient_email: string
          recipient_id: string | null
          recipient_name: string
          recipient_role: string
          requester_id: string
          sent_at: string | null
          signed_at: string | null
          status: string
          updated_at: string | null
          viewed_at: string | null
        }
        Insert: {
          agreement_id: string
          created_at?: string | null
          declined_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          recipient_email: string
          recipient_id?: string | null
          recipient_name: string
          recipient_role: string
          requester_id: string
          sent_at?: string | null
          signed_at?: string | null
          status?: string
          updated_at?: string | null
          viewed_at?: string | null
        }
        Update: {
          agreement_id?: string
          created_at?: string | null
          declined_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          recipient_email?: string
          recipient_id?: string | null
          recipient_name?: string
          recipient_role?: string
          requester_id?: string
          sent_at?: string | null
          signed_at?: string | null
          status?: string
          updated_at?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signature_requests_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "broker_agreements"
            referencedColumns: ["id"]
          },
        ]
      }
      social_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      society: {
        Row: {
          area: string | null
          area_temp1: string | null
          area_temp2: string | null
          area_temp3: string | null
          blog_images: string | null
          blog_post: string | null
          community: Json | null
          confidence_score: number | null
          created_at: string | null
          description: string | null
          id: number
          last_analyzed: string | null
          location: Json | null
          market: Json | null
          name: string
          narratives: Json | null
          property_images: Json | null
          search_score: number | null
          slug: string
          source_analyses: Json | null
          source_citations: Json | null
          source_name: string | null
          source_url: string | null
          specifications: Json | null
          stored_at: string | null
          updated_at: string | null
        }
        Insert: {
          area?: string | null
          area_temp1?: string | null
          area_temp2?: string | null
          area_temp3?: string | null
          blog_images?: string | null
          blog_post?: string | null
          community?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          last_analyzed?: string | null
          location?: Json | null
          market?: Json | null
          name: string
          narratives?: Json | null
          property_images?: Json | null
          search_score?: number | null
          slug: string
          source_analyses?: Json | null
          source_citations?: Json | null
          source_name?: string | null
          source_url?: string | null
          specifications?: Json | null
          stored_at?: string | null
          updated_at?: string | null
        }
        Update: {
          area?: string | null
          area_temp1?: string | null
          area_temp2?: string | null
          area_temp3?: string | null
          blog_images?: string | null
          blog_post?: string | null
          community?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          last_analyzed?: string | null
          location?: Json | null
          market?: Json | null
          name?: string
          narratives?: Json | null
          property_images?: Json | null
          search_score?: number | null
          slug?: string
          source_analyses?: Json | null
          source_citations?: Json | null
          source_name?: string | null
          source_url?: string | null
          specifications?: Json | null
          stored_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "society_new_area_fkey"
            columns: ["area"]
            isOneToOne: false
            referencedRelation: "local_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      society_amenities: {
        Row: {
          amenity_name: string
          category: string | null
          created_at: string | null
          id: number
          society_id: number | null
        }
        Insert: {
          amenity_name: string
          category?: string | null
          created_at?: string | null
          id?: number
          society_id?: number | null
        }
        Update: {
          amenity_name?: string
          category?: string | null
          created_at?: string | null
          id?: number
          society_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "society_amenities_society_id_fkey"
            columns: ["society_id"]
            isOneToOne: false
            referencedRelation: "society_old"
            referencedColumns: ["id"]
          },
        ]
      }
      society_media: {
        Row: {
          caption: string | null
          created_at: string | null
          id: number
          media_type: string | null
          society_id: number | null
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: number
          media_type?: string | null
          society_id?: number | null
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: number
          media_type?: string | null
          society_id?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "society_media_society_id_fkey"
            columns: ["society_id"]
            isOneToOne: false
            referencedRelation: "society_old"
            referencedColumns: ["id"]
          },
        ]
      }
      society_old: {
        Row: {
          address_line: string | null
          city: string | null
          created_at: string | null
          developer: string | null
          highlights: string[] | null
          id: number
          land_area: string | null
          locality: string | null
          name: string
          notes: string | null
          overview: string | null
          pincode: string | null
          rera_id: string | null
          slug: string | null
          total_floors: number | null
          total_towers: number | null
          total_units: number | null
          updated_at: string | null
          year_of_completion: number | null
        }
        Insert: {
          address_line?: string | null
          city?: string | null
          created_at?: string | null
          developer?: string | null
          highlights?: string[] | null
          id?: number
          land_area?: string | null
          locality?: string | null
          name: string
          notes?: string | null
          overview?: string | null
          pincode?: string | null
          rera_id?: string | null
          slug?: string | null
          total_floors?: number | null
          total_towers?: number | null
          total_units?: number | null
          updated_at?: string | null
          year_of_completion?: number | null
        }
        Update: {
          address_line?: string | null
          city?: string | null
          created_at?: string | null
          developer?: string | null
          highlights?: string[] | null
          id?: number
          land_area?: string | null
          locality?: string | null
          name?: string
          notes?: string | null
          overview?: string | null
          pincode?: string | null
          rera_id?: string | null
          slug?: string | null
          total_floors?: number | null
          total_towers?: number | null
          total_units?: number | null
          updated_at?: string | null
          year_of_completion?: number | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      temp_areas: {
        Row: {
          area_name: string
          id: number
        }
        Insert: {
          area_name: string
          id?: number
        }
        Update: {
          area_name?: string
          id?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_id: string
          broker_id: string
          content: string
          created_at: string
          id: string
          rating: number
          updated_at: string
        }
        Insert: {
          author_id: string
          broker_id: string
          content: string
          created_at?: string
          id?: string
          rating: number
          updated_at?: string
        }
        Update: {
          author_id?: string
          broker_id?: string
          content?: string
          created_at?: string
          id?: string
          rating?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_listing_data: {
        Row: {
          agent_contact: string | null
          agent_name: string | null
          area_sqft: number | null
          bedroom_count: number | null
          company_name: string | null
          created_at: string
          facing_direction: string | null
          furnishing_status: string | null
          id: string
          llm_json: Json | null
          location: string | null
          message_date: string | null
          message_type: string | null
          parking_count: number | null
          parking_text: string | null
          price: number | null
          price_text: string | null
          project_name: string | null
          property_type: string | null
          raw_message: string
          source_raw_message_id: string | null
          special_features: string[] | null
        }
        Insert: {
          agent_contact?: string | null
          agent_name?: string | null
          area_sqft?: number | null
          bedroom_count?: number | null
          company_name?: string | null
          created_at?: string
          facing_direction?: string | null
          furnishing_status?: string | null
          id?: string
          llm_json?: Json | null
          location?: string | null
          message_date?: string | null
          message_type?: string | null
          parking_count?: number | null
          parking_text?: string | null
          price?: number | null
          price_text?: string | null
          project_name?: string | null
          property_type?: string | null
          raw_message: string
          source_raw_message_id?: string | null
          special_features?: string[] | null
        }
        Update: {
          agent_contact?: string | null
          agent_name?: string | null
          area_sqft?: number | null
          bedroom_count?: number | null
          company_name?: string | null
          created_at?: string
          facing_direction?: string | null
          furnishing_status?: string | null
          id?: string
          llm_json?: Json | null
          location?: string | null
          message_date?: string | null
          message_type?: string | null
          parking_count?: number | null
          parking_text?: string | null
          price?: number | null
          price_text?: string | null
          project_name?: string | null
          property_type?: string | null
          raw_message?: string
          source_raw_message_id?: string | null
          special_features?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_listing_data_source_raw_message_id_fkey"
            columns: ["source_raw_message_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_raw_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_listing_data_source_raw_message_id_fkey"
            columns: ["source_raw_message_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_raw_messages_unprocessed"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_outbound: {
        Row: {
          attributes: Json | null
          campaign_name: string | null
          created_at: string
          error_message: string | null
          id: number
          image: string | null
          message: string | null
          message_type: string | null
          phone: string
          requirement_id: number | null
          retry_count: number | null
          send_status: string | null
          send_when: string | null
          sent_time: string | null
          source: string | null
          tags: string[] | null
          template_params: string[] | null
          url: string | null
          user_name: string | null
        }
        Insert: {
          attributes?: Json | null
          campaign_name?: string | null
          created_at?: string
          error_message?: string | null
          id?: number
          image?: string | null
          message?: string | null
          message_type?: string | null
          phone: string
          requirement_id?: number | null
          retry_count?: number | null
          send_status?: string | null
          send_when?: string | null
          sent_time?: string | null
          source?: string | null
          tags?: string[] | null
          template_params?: string[] | null
          url?: string | null
          user_name?: string | null
        }
        Update: {
          attributes?: Json | null
          campaign_name?: string | null
          created_at?: string
          error_message?: string | null
          id?: number
          image?: string | null
          message?: string | null
          message_type?: string | null
          phone?: string
          requirement_id?: number | null
          retry_count?: number | null
          send_status?: string | null
          send_when?: string | null
          sent_time?: string | null
          source?: string | null
          tags?: string[] | null
          template_params?: string[] | null
          url?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_outbound_requirement_fk"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "demand_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_raw_messages: {
        Row: {
          created_at: string
          id: string
          is_deleted: boolean | null
          is_media: boolean | null
          line_number: number | null
          message_date: string
          message_hash: string
          message_text: string
          processed: boolean | null
          processed_at: string | null
          sender_name: string
          source_file: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          is_media?: boolean | null
          line_number?: number | null
          message_date: string
          message_hash: string
          message_text: string
          processed?: boolean | null
          processed_at?: string | null
          sender_name: string
          source_file?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          is_media?: boolean | null
          line_number?: number | null
          message_date?: string
          message_hash?: string
          message_text?: string
          processed?: boolean | null
          processed_at?: string | null
          sender_name?: string
          source_file?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      locality_distributions: {
        Row: {
          area_0_500: number | null
          area_1000_1500: number | null
          area_1500_2000: number | null
          area_2000_3000: number | null
          area_3000_4000: number | null
          area_4000_5000: number | null
          area_500_1000: number | null
          area_5000_plus: number | null
          avg_area_sqft: number | null
          avg_price: number | null
          bhk_1: number | null
          bhk_2: number | null
          bhk_3: number | null
          bhk_4: number | null
          location: string | null
          max_price: number | null
          min_price: number | null
          price_10_12cr: number | null
          price_12_15cr: number | null
          price_15cr_plus: number | null
          price_2_5cr: number | null
          price_5_8cr: number | null
          price_8_10cr: number | null
          total_listings: number | null
          type_apartment: number | null
          type_independent_house: number | null
          type_plot: number | null
          type_villa: number | null
        }
        Relationships: []
      }
      properties_with_agent: {
        Row: {
          agent_avatar: string | null
          agent_company: string | null
          agent_contact: string | null
          agent_email: string | null
          agent_name: string | null
          agent_vanity_url: string | null
          area: string | null
          area_id: string | null
          asset_type: Database["public"]["Enums"]["asset_type"] | null
          baths: number | null
          bedrooms: number | null
          bu_area: number | null
          buyer_commission: number | null
          city: string | null
          city_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          facing_dir: Database["public"]["Enums"]["direction"] | null
          floor_no: number | null
          id: string | null
          image_desc: string[] | null
          images: string[] | null
          last_verified: string | null
          maint_charges: number | null
          marketing_tag: string | null
          owner_name: string | null
          owner_number: number | null
          price: number | null
          property_type: Database["public"]["Enums"]["property_type"] | null
          publish: number | null
          society_id: number | null
          source_key: string | null
          sqft: number | null
          static_flyer_url: string | null
          static_html_url: string | null
          status: Database["public"]["Enums"]["property_status"] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          verified_by: string | null
          view_count: number | null
          visibility: Database["public"]["Enums"]["property_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_properties_area"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "local_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_properties_city"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_society_id_fkey"
            columns: ["society_id"]
            isOneToOne: false
            referencedRelation: "society"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_listings_relevant: {
        Row: {
          agent_contact: string | null
          agent_name: string | null
          area_sqft: number | null
          bedroom_count: number | null
          company_name: string | null
          created_at: string | null
          facing_direction: string | null
          furnishing_status: string | null
          id: string | null
          llm_json: Json | null
          location: string | null
          message_date: string | null
          message_type: string | null
          parking_count: number | null
          parking_text: string | null
          price: number | null
          price_text: string | null
          project_name: string | null
          property_type: string | null
          raw_message: string | null
          sender_name: string | null
          source_raw_message_id: string | null
          special_features: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_listing_data_source_raw_message_id_fkey"
            columns: ["source_raw_message_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_raw_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_listing_data_source_raw_message_id_fkey"
            columns: ["source_raw_message_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_raw_messages_unprocessed"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_raw_messages_unprocessed: {
        Row: {
          created_at: string | null
          id: string | null
          is_deleted: boolean | null
          is_media: boolean | null
          line_number: number | null
          message_date: string | null
          message_hash: string | null
          message_text: string | null
          processed: boolean | null
          processed_at: string | null
          sender_name: string | null
          source_file: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          is_deleted?: boolean | null
          is_media?: boolean | null
          line_number?: number | null
          message_date?: string | null
          message_hash?: string | null
          message_text?: string | null
          processed?: boolean | null
          processed_at?: string | null
          sender_name?: string | null
          source_file?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          is_deleted?: boolean | null
          is_media?: boolean | null
          line_number?: number | null
          message_date?: string | null
          message_hash?: string | null
          message_text?: string | null
          processed?: boolean | null
          processed_at?: string | null
          sender_name?: string | null
          source_file?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_count_rows: { Args: { table_name: string }; Returns: number }
      admin_get_tables: {
        Args: never
        Returns: {
          tablename: string
        }[]
      }
      claim_invitation: { Args: { code: string }; Returns: boolean }
      execute_readonly_query: { Args: { query_text: string }; Returns: Json }
      force_delete_connection: {
        Args: { connection_id: string }
        Returns: boolean
      }
      generate_invite_code: { Args: never; Returns: string }
      generate_property_slug: { Args: { title: string }; Returns: string }
      generate_vanity_url: { Args: { full_name: string }; Returns: string }
      get_audit_trail_for_token: {
        Args: { token_id: string }
        Returns: {
          action: string
          agreement_id: string
          agreement_type: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown
          performed_by_email: string | null
          performed_by_name: string | null
          recipient_email: string | null
          recipient_name: string | null
          user_agent: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "agreement_audit_trail"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_connection_degree: {
        Args: { end_user_id: string; start_user_id: string }
        Returns: number
      }
      get_invitation_by_code_and_email: {
        Args: { code: string; email: string }
        Returns: {
          id: string
          invite_code: string
          invitee_company_name: string
          invitee_email: string
          invitee_name: string
          invitee_phone: string
          inviter_id: string
          status: string
        }[]
      }
      get_invitation_details_by_code: {
        Args: { code: string }
        Returns: {
          id: string
          invite_code: string
          invitee_company_name: string
          invitee_email: string
          invitee_name: string
          invitee_phone: string
          inviter_id: string
          status: string
        }[]
      }
      get_invite_code_status: {
        Args: { code: string }
        Returns: {
          id: string
          invite_code: string
          status: string
        }[]
      }
      get_member_directory: {
        Args: {
          city_filter?: string
          limit_count?: number
          offset_value?: number
        }
        Returns: {
          areas: string[]
          avatar_url: string
          bio: string
          city: string
          company_name: string
          full_name: string
          id: string
          member_since: string
          properties_count: number
          rating: number
          static_html_url: string
          vanity_url: string
        }[]
      }
      get_network_posts: {
        Args: { user_uuid: string }
        Returns: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          updated_at: string
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "social_posts"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_network_properties_with_views:
        | {
            Args: { limit_count: number; user_uuid: string }
            Returns: {
              baths: number
              bedrooms: number
              currency: string
              id: string
              images: string[]
              price: number
              sqft: number
              title: string
              view_count: number
            }[]
          }
        | {
            Args: {
              limit_count: number
              offset_value?: number
              user_uuid: string
            }
            Returns: {
              baths: number
              bedrooms: number
              currency: string
              id: string
              images: string[]
              price: number
              sqft: number
              title: string
              user_id: string
              view_count: number
            }[]
          }
      get_user_connections_with_profiles: {
        Args: { limit_count: number; user_uuid: string }
        Returns: {
          avatar_url: string
          full_name: string
          id: string
          last_active: string
          property_count: number
          user_id: string
        }[]
      }
      has_leads_role: {
        Args: {
          _role: Database["public"]["Enums"]["leads_app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      update_broker_rating: {
        Args: { input_broker_id: string }
        Returns: number
      }
    }
    Enums: {
      agreement_status:
        | "draft"
        | "pending_signatures"
        | "signed"
        | "executed"
        | "cancelled"
        | "expired"
      asset_type:
        | "Apartment"
        | "Villa"
        | "Independent House"
        | "Land"
        | "Commercial"
        | "Villament"
        | "Plot"
      commission_type: "percentage" | "fixed_amount"
      demand_lead_status:
        | "New"
        | "Need More Info from Client"
        | "Send Matches"
        | "Waiting for Client Response"
        | "Client Non Responsive (C)"
        | "Auto Closed Due to Inactivity (C)"
        | "Viewing Stage"
        | "Offer Stage"
        | "Closed_deal (C)"
        | "Closed_lost (C)"
        | "Closed by RM (C) Add Reason"
      direction:
        | "North"
        | "East"
        | "South"
        | "West"
        | "North-East"
        | "North-West"
        | "South-East"
        | "South-West"
      leads_app_role:
        | "admin"
        | "leads_rm"
        | "leads_lm"
        | "leads_sm"
        | "leads_admin"
      match_status:
        | "Identified"
        | "Need More details"
        | "Please confirm if still available"
        | "RM Rejection (C)"
        | "Unavailable Sold (C)"
        | "Proposed to Client"
        | "Client Rejected (C)"
        | "Viewing Scheduled"
        | "Viewing Completed"
        | "Rejected After Viewing (C)"
        | "Offer Stage"
      matches_next_step:
        | "Waiting for RM"
        | "Call_Selling_Agent_Verify_Details"
        | "Set_Terms_With_Selling_Agent"
        | "Send_to_client"
        | "Wait"
        | "Schedule_Viewing"
        | "Follow_Up"
      property_status:
        | "Available"
        | "Sold"
        | "Rented"
        | "InDealStage"
        | "Delisted"
      property_type: "Rent" | "Sale"
      property_visibility: "Private" | "Network Only" | "All" | "Public"
      rejection_reason:
        | "Price"
        | "Layout"
        | "Location"
        | "Vaastu"
        | "Condition"
        | "Other"
      signature_status: "pending" | "signed" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agreement_status: [
        "draft",
        "pending_signatures",
        "signed",
        "executed",
        "cancelled",
        "expired",
      ],
      asset_type: [
        "Apartment",
        "Villa",
        "Independent House",
        "Land",
        "Commercial",
        "Villament",
        "Plot",
      ],
      commission_type: ["percentage", "fixed_amount"],
      demand_lead_status: [
        "New",
        "Need More Info from Client",
        "Send Matches",
        "Waiting for Client Response",
        "Client Non Responsive (C)",
        "Auto Closed Due to Inactivity (C)",
        "Viewing Stage",
        "Offer Stage",
        "Closed_deal (C)",
        "Closed_lost (C)",
        "Closed by RM (C) Add Reason",
      ],
      direction: [
        "North",
        "East",
        "South",
        "West",
        "North-East",
        "North-West",
        "South-East",
        "South-West",
      ],
      leads_app_role: [
        "admin",
        "leads_rm",
        "leads_lm",
        "leads_sm",
        "leads_admin",
      ],
      match_status: [
        "Identified",
        "Need More details",
        "Please confirm if still available",
        "RM Rejection (C)",
        "Unavailable Sold (C)",
        "Proposed to Client",
        "Client Rejected (C)",
        "Viewing Scheduled",
        "Viewing Completed",
        "Rejected After Viewing (C)",
        "Offer Stage",
      ],
      matches_next_step: [
        "Waiting for RM",
        "Call_Selling_Agent_Verify_Details",
        "Set_Terms_With_Selling_Agent",
        "Send_to_client",
        "Wait",
        "Schedule_Viewing",
        "Follow_Up",
      ],
      property_status: [
        "Available",
        "Sold",
        "Rented",
        "InDealStage",
        "Delisted",
      ],
      property_type: ["Rent", "Sale"],
      property_visibility: ["Private", "Network Only", "All", "Public"],
      rejection_reason: [
        "Price",
        "Layout",
        "Location",
        "Vaastu",
        "Condition",
        "Other",
      ],
      signature_status: ["pending", "signed", "declined"],
    },
  },
} as const
