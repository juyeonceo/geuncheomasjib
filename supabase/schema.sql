-- ========================================================
-- 우리동네 식당 - Supabase 데이터베이스 테이블 스키마
-- (Supabase 대시보드 > SQL Editor 에서 붙여넣고 Run을 누르세요)
-- ========================================================

-- 1. 음식점 테이블 생성
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id VARCHAR(50) UNIQUE,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  sub_category VARCHAR(100),
  road_address TEXT,
  address TEXT,
  phone VARCHAR(50),
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  main_menu JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RLS(Row Level Security) 설정 및 읽기/쓰기 정책 허용
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- 익명(anon) 및 로그인 사용자 모두 읽기 가능
CREATE POLICY "Allow public read access"
  ON public.restaurants
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 익명(anon) 및 로그인 사용자 삽입 가능
CREATE POLICY "Allow public insert access"
  ON public.restaurants
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 3. 검색 최적화 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_restaurants_coords ON public.restaurants (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_restaurants_category ON public.restaurants (category);
