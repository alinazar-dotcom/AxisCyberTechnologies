import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables in src/src/lib/supabase.ts');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Database Types (you can expand these based on your schema)
export type Newsletter = {
  id?: string;
  email: string;
  subscribed_at?: string;
  source?: string;
};

export type ContactSubmission = {
  id?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  phone?: string;
  services?: string[];
  submitted_at?: string;
  status?: 'new' | 'contacted' | 'completed';
};

export type ConsultationRequest = {
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  project_type?: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  requested_at?: string;
  status?: 'pending' | 'scheduled' | 'completed';
};
