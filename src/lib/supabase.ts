import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hqialgpwgupbzekkqiko.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_6i7kQm4f0NpB52xd6X-D7g_peDzlpYc';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http')
);

// 빌드 환경(Vercel 등)에서 환경변수가 비어있어도 빌드가 실패하지 않도록 안전하게 생성
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
