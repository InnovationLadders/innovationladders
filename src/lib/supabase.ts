import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface DatabaseService {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface DatabaseSiteSettings {
  id: string;
  key: string;
  value: any;
  updated_at: string;
}