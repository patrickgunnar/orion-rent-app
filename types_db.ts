export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          created_at: string | null
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          created_at: string | null
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          created_at: string | null
          id?: string
          stripe_customer_id?: string | null
        }
      }
      liked_properties: {
        Row: {
          created_at: string | null
          property_id: number
          user_id: string
          active: boolean
          updated_at: Json
          id: string
        }
        Insert: {
          created_at?: string | null
          property_id: number
          user_id: string
          active: boolean
          updated_at: Json
          id: string
        }
        Update: {
          created_at?: string | null
          property_id?: number
          user_id?: string
          active: boolean
          updated_at: Json
          id: string
        }
      }

      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          start_day: string
          end_day: string
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          start_day: string
          end_day: string
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          start_day?: string 
          end_day?: string
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
      }

      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
      }

      properties: {
        Row: {
          author: string | null
          created_at: string | null
          id: number
          image_path: Json | null
          title: string | null
          description: string | null
          user_id: string | null
          category: Json
          roomCount: number
          bathroomCount: number
          guestCount: number
          locationValue: string
          price: number
          reservation: Json
          commodities: Json
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          renewed: boolean
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          id?: number
          image_path?: Json | null
          title?: string | null
          description?: string | null
          user_id?: string | null
          category: Json
          roomCount: number
          bathroomCount: number
          guestCount: number
          locationValue: string
          price: number
          reservation: Json
          commodities: Json
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          renewed: boolean
        }
        Update: {
          author?: string | null
          created_at?: string | null
          id?: number
          image_path?: Json | null
          title?: string | null
          description?: string | null
          user_id?: string | null
          category: Json
          roomCount: number
          bathroomCount: number
          guestCount: number
          locationValue: string
          price: number
          reservation: Json
          commodities: Json
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          renewed: boolean
        }
      }

      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
          product_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
          product_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
          product_id: string
        }
      }

      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          full_name: string | null
          id: string
          payment_method: Json | null
          email: string
          emailVerified: string
          phone: number
          hashedPassword: string
          created_at: string | null
          updated_at: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
          email: string
          emailVerified: string
          phone: number
          hashedPassword: string
          created_at: string | null
          updated_at: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          email: string
          emailVerified: string
          phone: number
          hashedPassword: string
          created_at: string | null
          updated_at: Json | null
        }
      }

      comments: {
        Row: {
          created_at: string | null
          updated_at: Json | null
          id: string
          user_id: string
          stars_value: number
          comment: string | null
          active: boolean
        }

        Insert: {
          created_at: string | null
          updated_at: Json | null
          id: string
          user_id: string
          stars_value: number
          comment: string | null
          active: boolean
        }

        Update: {
          created_at: string | null
          updated_at: Json | null
          id: string
          user_id: string
          stars_value: number
          comment: string | null
          active: boolean
        }
      }

      messages: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
          host_id: string
          message: string
        }

        Insert: {
          created_at: string | null
          id: string
          user_id: string
          host_id: string
          message: string
        }

        Update: {
          created_at: string | null
          id: string
          user_id: string
          host_id: string
          message: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
