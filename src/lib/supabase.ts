import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL 또는 Anon Key가 설정되지 않았습니다.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbRestaurant {
  id: string;
  source_id?: string;
  name: string;
  category: string;
  sub_category?: string;
  road_address?: string;
  address?: string;
  phone?: string;
  latitude: number;
  longitude: number;
  main_menu?: string[];
  created_at?: string;
}
