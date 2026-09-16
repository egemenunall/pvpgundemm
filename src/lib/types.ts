// PVPGündem veritabanı tipleri.
// supabase/migrations/0001_init.sql şemasıyla birebir uyumlu tutulmalı.

export type ServerType = "emek" | "farm" | "pvp" | "ws" | "oldschool" | "diger";

export interface ServerRow {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  opening_date: string; // YYYY-MM-DD
  opening_time: string; // HH:MM:SS
  type: ServerType;
  description: string;
  features: string[];
  website_url: string | null;
  discord_url: string | null;
  is_active: boolean;
  is_vip: boolean;
  is_sponsored: boolean;
  popularity_score: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export type AdvertisementType = "top" | "side" | "hero" | "mobile";

export interface AdvertisementRow {
  id: string;
  title: string;
  type: AdvertisementType;
  image_url: string;
  mobile_image_url: string | null;
  link_url: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type BlogStatus = "draft" | "published";

export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ContactStatus = "yeni" | "okundu" | "cozuldu";

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

export interface AdminProfileRow {
  user_id: string;
  is_admin: boolean;
  full_name: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      servers: {
        Row: ServerRow;
        Insert: Partial<ServerRow> &
          Pick<ServerRow, "name" | "slug" | "opening_date" | "opening_time" | "type" | "description">;
        Update: Partial<ServerRow>;
        Relationships: [];
      };
      advertisements: {
        Row: AdvertisementRow;
        Insert: Partial<AdvertisementRow> & Pick<AdvertisementRow, "title" | "type" | "image_url">;
        Update: Partial<AdvertisementRow>;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPostRow;
        Insert: Partial<BlogPostRow> & Pick<BlogPostRow, "title" | "slug" | "content">;
        Update: Partial<BlogPostRow>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: Partial<ContactMessageRow> &
          Pick<ContactMessageRow, "name" | "email" | "subject" | "message">;
        Update: Partial<ContactMessageRow>;
        Relationships: [];
      };
      admin_profiles: {
        Row: AdminProfileRow;
        Insert: Partial<AdminProfileRow> & Pick<AdminProfileRow, "user_id">;
        Update: Partial<AdminProfileRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_server_view: {
        Args: { server_slug: string };
        Returns: undefined;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
