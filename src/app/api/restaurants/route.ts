import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { REAL_RESTAURANTS } from '@/data/realRestaurants';
import { Restaurant, Category } from '@/types/restaurant';

// 공공데이터 업종 코드를 서비스 카테고리로 분류하는 어댑터 함수
function mapPublicDataCategory(indsMclsNm: string = '', indsLclsNm: string = ''): Exclude<Category, '전체'> {
  const text = `${indsLclsNm} ${indsMclsNm}`;
  if (text.includes('한식') || text.includes('국밥') || text.includes('찌개') || text.includes('구이')) return '한식';
  if (text.includes('일식') || text.includes('초밥') || text.includes('돈가스') || text.includes('라멘')) return '일식';
  if (text.includes('중식') || text.includes('중화')) return '중식';
  if (text.includes('양식') || text.includes('파스타') || text.includes('피자') || text.includes('스테이크')) return '양식';
  if (text.includes('분식') || text.includes('떡볶이') || text.includes('김밥')) return '분식';
  if (text.includes('카페') || text.includes('커피') || text.includes('베이커리') || text.includes('제과') || text.includes('디저트')) return '카페·디저트';
  return '아시안/패스트푸드';
}

function mapKakaoCategory(categoryName: string = ''): Exclude<Category, '전체'> {
  if (categoryName.includes('한식') || categoryName.includes('국밥') || categoryName.includes('찌개') || categoryName.includes('고기') || categoryName.includes('구이') || categoryName.includes('백반')) return '한식';
  if (categoryName.includes('일식') || categoryName.includes('초밥') || categoryName.includes('돈가스') || categoryName.includes('라멘') || categoryName.includes('회')) return '일식';
  if (categoryName.includes('중식') || categoryName.includes('중화') || categoryName.includes('짜장') || categoryName.includes('마라')) return '중식';
  if (categoryName.includes('양식') || categoryName.includes('파스타') || categoryName.includes('피자') || categoryName.includes('스테이크') || categoryName.includes('이탈리안')) return '양식';
  if (categoryName.includes('분식') || categoryName.includes('떡볶이') || categoryName.includes('김밥') || categoryName.includes('순대')) return '분식';
  if (categoryName.includes('카페') || categoryName.includes('커피') || categoryName.includes('디저트') || categoryName.includes('제과') || categoryName.includes('베이커리')) return '카페·디저트';
  return '아시안/패스트푸드';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '37.5615');
  const lng = parseFloat(searchParams.get('lng') || '126.9248');
  const radius = parseInt(searchParams.get('radius') || '1000', 10);

  // 1순위: 카카오 로컬 검색 API (실시간 맛집 랭킹 및 상세 정보)
  const kakaoKey =
    process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || 'e30478df18a03cf2bafd4226d420d4ad';
  try {
    const kakaoUrl = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&x=${lng}&y=${lat}&radius=${radius}&size=15`;
    const res = await fetch(kakaoUrl, {
      headers: {
        Authorization: `KakaoAK ${kakaoKey}`,
        KA: 'sdk/4.5.29 os/javascript origin/http://localhost:3000',
        Referer: 'http://localhost:3000/',
      },
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.documents) && data.documents.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const kakaoRestaurants: Restaurant[] = data.documents.map((item: any, idx: number) => ({
          id: `kakao-${item.id || idx}`,
          name: item.place_name,
          category: mapKakaoCategory(item.category_name),
          subCategory: item.category_name?.split('>').pop()?.trim() || '음식점',
          roadAddress: item.road_address_name || item.address_name,
          address: item.address_name || item.road_address_name,
          phone: item.phone || '매장 문의',
          coords: {
            latitude: parseFloat(item.y),
            longitude: parseFloat(item.x),
          },
          mainMenu: [
            item.category_name?.split('>').pop()?.trim() || '대표 메뉴',
            '카카오맵 실시간 추천 매장',
          ],
          isSample: false,
          ratingNotice: '카카오맵 실시간 장소 데이터',
          reviewNotice: '실시간 인기 맛집',
          businessHoursNotice: '영업 중',
        }));

        return NextResponse.json({
          source: 'kakao_local',
          total: kakaoRestaurants.length,
          restaurants: kakaoRestaurants,
        });
      }
    }
  } catch (err) {
    console.warn('카카오 로컬 API 호출 실패, 후순위 데이터로 전환:', err);
  }

  const serviceKey = process.env.DATA_GO_KR_SERVICE_KEY;

  // 2순위: 공공데이터포털 API 호출 (인증키가 있을 경우)
  if (serviceKey && serviceKey !== 'your_data_go_kr_service_key_here') {
    try {
      const publicApiUrl = `https://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius?radius=${radius}&cx=${lng}&cy=${lat}&type=json&pageNo=1&numOfRows=100&serviceKey=${encodeURIComponent(
        serviceKey
      )}`;

      const res = await fetch(publicApiUrl, { next: { revalidate: 3600 } });
      if (res.ok) {
        const json = await res.json();
        const items = json?.body?.items || [];

        if (items.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const apiRestaurants: Restaurant[] = items.map((item: any, idx: number) => ({
            id: item.bizesId || `public-${idx}`,
            name: item.bizesNm,
            category: mapPublicDataCategory(item.indsMclsNm, item.indsLclsNm),
            subCategory: item.indsSclsNm || item.indsMclsNm || '음식점',
            roadAddress: item.rdnmAdr || item.lnoAdr || '주소 정보 없음',
            address: item.lnoAdr || item.rdnmAdr || '지번 주소 없음',
            phone: item.telNo || '전화번호 미등록',
            coords: {
              latitude: parseFloat(item.lat || item.cy),
              longitude: parseFloat(item.lon || item.cx),
            },
            mainMenu: ['공공데이터 등록 매장', item.indsMclsNm || '대표 메뉴'],
            isSample: false,
            ratingNotice: '공공데이터포털 공식 연동 데이터',
            reviewNotice: '공공 상가정보 연동',
            businessHoursNotice: '영업 정보 매장 문의',
          }));

          return NextResponse.json({
            source: 'public_data_portal',
            total: apiRestaurants.length,
            restaurants: apiRestaurants,
          });
        }
      }
    } catch (err) {
      console.warn('공공데이터포털 API 호출 실패, Supabase 또는 로컬 실데이터로 전환:', err);
    }
  }

  // 2순위: Supabase 데이터베이스 조회
  if (supabase) {
    try {
      const { data: dbData, error: dbError } = await supabase
        .from('restaurants')
        .select('*')
        .limit(100);

      if (!dbError && dbData && dbData.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dbRestaurants: Restaurant[] = dbData.map((item: any) => ({
          id: item.id || item.source_id,
          name: item.name,
          category: item.category as Exclude<Category, '전체'>,
          subCategory: item.sub_category || '음식점',
          roadAddress: item.road_address || '',
          address: item.address || '',
          phone: item.phone || '',
          coords: {
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          },
          mainMenu: Array.isArray(item.main_menu) ? item.main_menu : ['대표 메뉴'],
          isSample: false,
          ratingNotice: 'Supabase 연동 실데이터',
          reviewNotice: '로컬 등록 데이터',
          businessHoursNotice: '영업 중',
        }));

        return NextResponse.json({
          source: 'supabase',
          total: dbRestaurants.length,
          restaurants: dbRestaurants,
        });
      }
    } catch (err) {
      console.warn('Supabase 조회 실패:', err);
    }
  }

  // 3순위: 공공데이터 규격 기반 검증된 실제 음식점 실데이터(REAL_RESTAURANTS) 반환
  return NextResponse.json({
    source: 'real_dataset',
    total: REAL_RESTAURANTS.length,
    restaurants: REAL_RESTAURANTS,
  });
}
