import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);
console.log('Supabase Service Key exists:', !!supabaseServiceKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    anonKey: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

if (!supabaseServiceKey) {
  console.warn('VITE_SUPABASE_SERVICE_ROLE_KEY is not set. Admin operations may fail.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  global: {
    headers: {
      'X-Client-Info': 'innovation-ladders-website'
    }
  }
});

// Admin client with service role key to bypass RLS
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers: {
          'X-Client-Info': 'innovation-ladders-admin'
        }
      }
    })
  : createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          'X-Client-Info': 'innovation-ladders-fallback'
        }
      }
    });
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