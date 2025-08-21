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
          ip_address: unknown | null
          signature_data: Json | null
          signed_at: string | null
          signer_id: string
          signer_role: string
          status: Database["public"]["Enums"]["signature_status"] | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          agreement_id: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          signature_data?: Json | null
          signed_at?: string | null
          signer_id: string
          signer_role: string
          status?: Database["public"]["Enums"]["signature_status"] | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          agreement_id?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          signature_data?: Json | null
          signed_at?: string | null
          signer_id?: string
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
          listing_broker_id: string
          property_id: string
          seller_commission_fixed_amount: number | null
          seller_commission_percentage: number | null
          seller_commission_type:
            | Database["public"]["Enums"]["commission_type"]
            | null
          seller_pays_commission: boolean | null
          sellers_broker_total_fees: string | null
          selling_broker_id: string
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
          listing_broker_id: string
          property_id: string
          seller_commission_fixed_amount?: number | null
          seller_commission_percentage?: number | null
          seller_commission_type?:
            | Database["public"]["Enums"]["commission_type"]
            | null
          seller_pays_commission?: boolean | null
          sellers_broker_total_fees?: string | null
          selling_broker_id: string
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
          listing_broker_id?: string
          property_id?: string
          seller_commission_fixed_amount?: number | null
          seller_commission_percentage?: number | null
          seller_commission_type?:
            | Database["public"]["Enums"]["commission_type"]
            | null
          seller_pays_commission?: boolean | null
          sellers_broker_total_fees?: string | null
          selling_broker_id?: string
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
        Relationships: []
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
          recipient_email?: string | null
          Status?: string | null
          subject?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      local_areas: {
        Row: {
          area: string
          city_id: string
          city_section: string | null
          created_at: string
          id: string
        }
        Insert: {
          area: string
          city_id: string
          city_section?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          area?: string
          city_id?: string
          city_section?: string | null
          created_at?: string
          id?: string
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
      prop_meta: {
        Row: {
          created_at: string
          Description: string | null
          id: number
          Name: string | null
          Type: string | null
        }
        Insert: {
          created_at?: string
          Description?: string | null
          id?: number
          Name?: string | null
          Type?: string | null
        }
        Update: {
          created_at?: string
          Description?: string | null
          id?: number
          Name?: string | null
          Type?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          area: string | null
          area_id: string | null
          baths: number | null
          bedrooms: number | null
          buyer_commission: number | null
          city: string
          city_id: string | null
          created_at: string
          currency: string
          description: string | null
          id: string
          image_desc: string[] | null
          images: string[] | null
          last_verified: string | null
          marketing_tag: string | null
          price: number | null
          property_type: Database["public"]["Enums"]["property_type"]
          publish: number | null
          sqft: number | null
          static_flyer_url: string | null
          static_html_url: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          view_count: number
          visibility: Database["public"]["Enums"]["property_visibility"] | null
        }
        Insert: {
          area?: string | null
          area_id?: string | null
          baths?: number | null
          bedrooms?: number | null
          buyer_commission?: number | null
          city: string
          city_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_desc?: string[] | null
          images?: string[] | null
          last_verified?: string | null
          marketing_tag?: string | null
          price?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          publish?: number | null
          sqft?: number | null
          static_flyer_url?: string | null
          static_html_url?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          view_count?: number
          visibility?: Database["public"]["Enums"]["property_visibility"] | null
        }
        Update: {
          area?: string | null
          area_id?: string | null
          baths?: number | null
          bedrooms?: number | null
          buyer_commission?: number | null
          city?: string
          city_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_desc?: string[] | null
          images?: string[] | null
          last_verified?: string | null
          marketing_tag?: string | null
          price?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          publish?: number | null
          sqft?: number | null
          static_flyer_url?: string | null
          static_html_url?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
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
      signature_audit_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          performed_by: string | null
          signature_request_id: string
          user_agent: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          performed_by?: string | null
          signature_request_id: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
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
          recipient_id: string
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
          recipient_id: string
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
          recipient_id?: string
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
      whatsapp_outbound: {
        Row: {
          created_at: string
          id: number
          image: string | null
          message: string | null
          message_type: string | null
          phone: string
          send_status: string | null
          send_when: string | null
          sent_time: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          message?: string | null
          message_type?: string | null
          phone: string
          send_status?: string | null
          send_when?: string | null
          sent_time?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          message?: string | null
          message_type?: string | null
          phone?: string
          send_status?: string | null
          send_when?: string | null
          sent_time?: string | null
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_count_rows: {
        Args: { table_name: string }
        Returns: number
      }
      admin_get_tables: {
        Args: Record<PropertyKey, never>
        Returns: {
          tablename: string
        }[]
      }
      force_delete_connection: {
        Args: { connection_id: string }
        Returns: boolean
      }
      generate_invite_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_property_slug: {
        Args: { title: string }
        Returns: string
      }
      generate_vanity_url: {
        Args: { full_name: string }
        Returns: string
      }
      get_connection_degree: {
        Args: { end_user_id: string; start_user_id: string }
        Returns: number
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
      }
      get_network_properties_with_views: {
        Args:
          | { limit_count: number; offset_value?: number; user_uuid: string }
          | { limit_count: number; user_uuid: string }
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
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
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
      commission_type: "percentage" | "fixed_amount"
      property_type: "Rent" | "Sale"
      property_visibility: "Private" | "Network Only" | "All" | "Public"
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
      commission_type: ["percentage", "fixed_amount"],
      property_type: ["Rent", "Sale"],
      property_visibility: ["Private", "Network Only", "All", "Public"],
      signature_status: ["pending", "signed", "declined"],
    },
  },
} as const
