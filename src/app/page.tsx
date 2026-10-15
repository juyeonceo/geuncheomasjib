'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { REAL_RESTAURANTS } from '@/data/realRestaurants';
import { findSubwayStation, SubwayStation } from '@/data/subwayStations';
import { Restaurant, Category, DistanceRadius, ViewMode } from '@/types/restaurant';
import { calculateDistance } from '@/utils/distance';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Header } from '@/components/layout/Header';
import { SampleNotice } from '@/components/layout/SampleNotice';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryFilter } from '@/components/search/CategoryFilter';
import { DistanceFilter } from '@/components/search/DistanceFilter';
import { RestaurantList, SortOrder } from '@/components/restaurant/RestaurantList';
import { RestaurantDetailModal } from '@/components/restaurant/RestaurantDetailModal';
import { MapContainer } from '@/components/map/MapContainer';
import { ViewToggle } from '@/components/map/ViewToggle';
import { LocationSelectorModal } from '@/components/location/LocationSelectorModal';
import { Navigation, AlertCircle, MapPin, Train } from 'lucide-react';
import { apiUrl } from '@/utils/api';

function mapKakaoCategory(categoryName: string = ''): Exclude<Category, '전체'> {
  if (categoryName.includes('한식') || categoryName.includes('국밥') || categoryName.includes('찌개') || categoryName.includes('고기') || categoryName.includes('구이') || categoryName.includes('백반')) return '한식';
  if (categoryName.includes('일식') || categoryName.includes('초밥') || categoryName.includes('돈가스') || categoryName.includes('라멘') || categoryName.includes('회')) return '일식';
  if (categoryName.includes('중식') || categoryName.includes('중화') || categoryName.includes('짜장') || categoryName.includes('마라')) return '중식';
  if (categoryName.includes('양식') || categoryName.includes('파스타') || categoryName.includes('피자') || categoryName.includes('스테이크') || categoryName.includes('이탈리안')) return '양식';
  if (categoryName.includes('분식') || categoryName.includes('떡볶이') || categoryName.includes('김밥') || categoryName.includes('순대')) return '분식';
  if (categoryName.includes('카페') || categoryName.includes('커피') || categoryName.includes('디저트') || categoryName.includes('제과') || categoryName.includes('베이커리')) return '카페·디저트';
  return '아시안/패스트푸드';
}

export default function Home() {
  // 위치 실패 시 안내 메시지 상태
  const [locationError, setLocationError] = useState<string | null>(null);

  // 위치 권한 거부 또는 실패 시 모달 자동 오픈 콜백
  const handleLocationFailure = useCallback((errorMsg: string) => {
    setLocationError(errorMsg);
    setIsLocationModalOpen(true);
  }, []);

  // [3단계]: 버튼을 누를 때만 권한 요청하는 훅
  const {
    coords,
    locationName,
    mode,
    isLoading: isLoadingLocation,
    permissionDenied,
    error: geoError,
    requestBrowserLocation,
    setManualRegion,
  } = useGeolocation(handleLocationFailure);

  // 검색 & 필터 상태 ([3단계]: 기본 반경 1km, 기본 정렬 가까운 거리순)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [radiusFilter, setRadiusFilter] = useState<DistanceRadius>(1000); // 기본 1km 반경
  const [sortOrder, setSortOrder] = useState<SortOrder>('distance'); // 직선거리 가까운 순

  // 모바일 뷰 모드 ('list' | 'map')
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  // 모달 상태
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // 실시간 식당 목록 (기본 실데이터셋 + 카카오 장소 검색 동적 보강)
  const [rawRestaurants, setRestaurants] = useState<Restaurant[]>(REAL_RESTAURANTS);
  const [liveKakaoRestaurants, setLiveKakaoRestaurants] = useState<Restaurant[]>([]);
  const [, setIsLoadingData] = useState(false);

  // 동적 카카오 검색으로 찾은 지하철역/장소
  const [dynamicStation, setDynamicStation] = useState<SubwayStation | null>(null);

  // 1. 전국 700+ 전철역 데이터베이스에서 검색어 일치 여부 판별
  const matchedStation = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const found = findSubwayStation(searchQuery);
    if (found) return found;
    return dynamicStation;
  }, [searchQuery, dynamicStation]);

  // 검색어 변경 시 카카오 키워드 검색으로 전철역 동적 조회 (로컬 사전에 없는 역 보완)
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setDynamicStation(null);
      return;
    }

    // 로컬 사전에 이미 있으면 API 호출 불필요
    if (findSubwayStation(q)) {
      setDynamicStation(null);
      return;
    }

    // 전역 kakao 객체로 키워드 검색 시도
    if (typeof window !== 'undefined' && window.kakao?.maps?.services?.Places) {
      try {
        const ps = new window.kakao.maps.services.Places();
        const searchKeyword = q.endsWith('역') ? q : `${q}역`;
        ps.keywordSearch(searchKeyword, (data: any[], status: any) => {
          if (status === window.kakao.maps.services?.Status.OK && data && data.length > 0) {
            const first = data[0];
            if (first.category_name?.includes('지하철') || first.place_name?.includes('역')) {
              setDynamicStation({
                name: first.place_name,
                cleanName: first.place_name.replace('역', ''),
                line: first.category_name?.split('>').pop()?.trim() || '전철역',
                region: first.address_name,
                coords: {
                  latitude: parseFloat(first.y),
                  longitude: parseFloat(first.x),
                },
              });
            }
          }
        });
      } catch (e) {
        console.warn('카카오 키워드 검색:', e);
      }
    }
  }, [searchQuery]);

  // 검색된 특정 전철역/지역이 있으면 해당 위치를 우선 기준 좌표로 적용 (지도 및 거리 계산 자동 동기화)
  const activeCoords = matchedStation ? matchedStation.coords : coords;
  const activeLocationName = matchedStation
    ? `${matchedStation.name} (${matchedStation.line})`
    : locationName;

  // Supabase 및 공공데이터포털 API 연동 데이터 실시간 fetch
  // [개인정보 보호]: 사용자의 실시간 위치는 브라우저 메모리에만 사용되며 서버 DB에 영구 저장하지 않음
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveRestaurants() {
      setIsLoadingData(true);
      try {
        const queryRadius = radiusFilter > 0 ? radiusFilter : 3000;
        const res = await fetch(
          apiUrl(`/api/restaurants?lat=${activeCoords.latitude}&lng=${activeCoords.longitude}&radius=${queryRadius}`)
        );
        if (res.ok) {
          const json = await res.json();
          if (isMounted && Array.isArray(json?.restaurants) && json.restaurants.length > 0) {
            setRestaurants(json.restaurants);
          }
        }
      } catch (err) {
        console.warn('API 연동 데이터 패치 실패 (로컬 실데이터 유지):', err);
      } finally {
        if (isMounted) setIsLoadingData(false);
      }
    }

    fetchLiveRestaurants();
    return () => {
      isMounted = false;
    };
  }, [activeCoords.latitude, activeCoords.longitude, radiusFilter]);

  // 대한민국 어느 전철역이든 카카오 실시간 음식점 검색(Places API)을 통해 주변 맛집 자동 보강
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const kakao = window.kakao;
    if (!kakao?.maps?.services?.Places) return;

    try {
      const ps = new kakao.maps.services.Places();
      const loc = new kakao.maps.LatLng(activeCoords.latitude, activeCoords.longitude);
      const searchRadius = radiusFilter > 0 ? radiusFilter : 2500;

      ps.categorySearch(
        'FD6', // 음식점 카테고리 코드
        (data: any[], status: any) => {
          if (status === kakao.maps.services?.Status.OK && Array.isArray(data) && data.length > 0) {
            const placesRestaurants: Restaurant[] = data.map((place: any, idx: number) => ({
              id: `kakao-${place.id || idx}`,
              name: place.place_name,
              category: mapKakaoCategory(place.category_name),
              subCategory: place.category_name?.split('>').pop()?.trim() || '음식점',
              roadAddress: place.road_address_name || place.address_name,
              address: place.address_name,
              phone: place.phone || '매장 문의',
              coords: {
                latitude: parseFloat(place.y),
                longitude: parseFloat(place.x),
              },
              mainMenu: [
                place.category_name?.split('>').pop()?.trim() || '대표 메뉴',
                '카카오맵 인기 등록 매장',
              ],
              isSample: false,
              ratingNotice: '카카오맵 실시간 장소 데이터',
              reviewNotice: `${activeLocationName.split(' ')[0]} 추천 맛집`,
              businessHoursNotice: '영업 중',
            }));

            setLiveKakaoRestaurants(placesRestaurants);
          }
        },
        {
          location: loc,
          radius: searchRadius,
          sort: kakao.maps.services?.SortBy?.DISTANCE,
        }
      );
    } catch (e) {
      console.warn('카카오 Places 실시간 음식점 검색:', e);
    }
  }, [activeCoords.latitude, activeCoords.longitude, activeLocationName, radiusFilter]);

  // 전체 음식점 데이터 통합 (기존 데이터셋 + 카카오 실시간 매장 데이터)
  const combinedRestaurants = useMemo(() => {
    const map = new Map<string, Restaurant>();
    // 기존 데이터셋 우선 적재
    rawRestaurants.forEach((r) => map.set(r.name, r));
    // 카카오 실시간 매장 보강 적재
    liveKakaoRestaurants.forEach((r) => {
      if (!map.has(r.name)) {
        map.set(r.name, r);
      }
    });
    return Array.from(map.values());
  }, [rawRestaurants, liveKakaoRestaurants]);

  // 기준 좌표에 따른 실시간 직선거리 계산 및 반경 필터링/가까운 순 정렬
  const processedRestaurants = useMemo(() => {
    // 1. 활성 기준 좌표(전국 전철역 또는 내 위치)와 각 음식점 간 Haversine 직선거리 계산
    const withDistance = combinedRestaurants.map((restaurant) => {
      const distance = calculateDistance(activeCoords, restaurant.coords);
      return {
        ...restaurant,
        distance,
      };
    });

    // 2. 검색어 필터링 (음식점 이름 + 대표 메뉴 키워드 + 주소 + 지역역명)
    const rawQuery = searchQuery.trim();
    const query = rawQuery.toLowerCase();
    const isStationQuery = matchedStation !== null;

    let filtered = withDistance.filter((item) => {
      if (!query) return true;

      // 만약 검색어가 '서대문역', '강남역' 같은 특정 지역/지하철역인 경우
      if (isStationQuery) {
        const stationName = matchedStation.cleanName.toLowerCase();
        const matchAddress =
          item.roadAddress.toLowerCase().includes(stationName) ||
          item.address.toLowerCase().includes(stationName) ||
          item.name.toLowerCase().includes(stationName);

        // 해당 전철역 기준 반경 내(3km 이내) 위치한 음식점이면 모두 매칭
        const isNearStation = (item.distance ?? 99999) <= 3000;
        return matchAddress || isNearStation;
      }

      // 일반 검색어: 음식점 이름, 대표 메뉴, 카테고리, 도로명/지번 주소
      const matchName = item.name.toLowerCase().includes(query);
      const matchMenu = item.mainMenu.some((menu) =>
        menu.toLowerCase().includes(query)
      );
      const matchSubCategory = item.subCategory?.toLowerCase().includes(query);
      const matchAddress =
        item.roadAddress.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query);

      return matchName || matchMenu || matchSubCategory || matchAddress;
    });

    // 3. 업종 카테고리 필터링
    if (selectedCategory !== '전체') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // 4. [3단계]: 선택한 범위(500m / 1km / 3km) 안의 음식점만 표시
    if (radiusFilter > 0) {
      filtered = filtered.filter(
        (item) => item.distance !== undefined && item.distance <= radiusFilter
      );
    }

    // 5. [3단계]: 직선거리 기준으로 가까운 순서 정렬 (오름차순)
    filtered.sort((a, b) => {
      if (sortOrder === 'distance') {
        return (a.distance ?? 0) - (b.distance ?? 0);
      }
      return a.name.localeCompare(b.name, 'ko');
    });

    return filtered;
  }, [combinedRestaurants, activeCoords, searchQuery, matchedStation, selectedCategory, radiusFilter, sortOrder]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('전체');
    setRadiusFilter(0);
  };

  const handleViewOnMap = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setViewMode('map');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 pb-16 md:pb-0">
      {/* 연동 완료 서비스 상태 배너 */}
      <SampleNotice />

      {/* 헤더 (내 주변 찾기 명시적 버튼 탑재) */}
      <Header
        locationName={activeLocationName}
        isGps={mode === 'browser' && !matchedStation}
        isLoadingLocation={isLoadingLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onRequestGps={requestBrowserLocation}
      />

      {/* 전철역/지역 검색 활성화 안내 배너 */}
      {matchedStation && (
        <div className="bg-orange-50 border-b border-orange-200 px-4 py-2 text-xs text-orange-950 flex items-center justify-between animate-fade-in">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-semibold text-orange-900">
              <Train className="w-4 h-4 text-orange-600 shrink-0" />
              &apos;{matchedStation.name}&apos; 전철역 탐색: {activeLocationName} 중심으로 지도가 이동되었습니다 (주변 맛집 {processedRestaurants.length}곳)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-orange-700 underline hover:text-orange-950 shrink-0 font-bold text-[11px] cursor-pointer"
            >
              내 위치로 복귀
            </button>
          </div>
        </div>
      )}

      {/* 현재 위치 안내 알림 바 (GPS 탐색 완료 시 또는 실패 시 안내) */}
      {mode === 'browser' && !matchedStation && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-xs text-blue-900 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Navigation className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
              현재 내 브라우저 GPS 위치를 기준으로 반경 내 맛집을 표시 중입니다.
            </span>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="text-blue-700 underline hover:text-blue-900 shrink-0 font-medium text-[11px] cursor-pointer"
            >
              지역 변경
            </button>
          </div>
        </div>
      )}

      {/* 필터 & 검색 영역 (모바일/데스크톱 공통 상단) */}
      <section className="bg-white border-b border-gray-200 sticky top-[57px] z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-2.5">
          {/* 대한민국 모든 전철역 지원 검색창 */}
          <SearchBar
            query={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            onSelectStation={(st) => {
              setSearchQuery(st.name);
            }}
          />

          {/* 업종 카테고리 필터 칩 */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* 반경 필터 & 모바일 뷰 토글 */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100 flex-wrap">
            <DistanceFilter
              selectedRadius={radiusFilter}
              onSelectRadius={setRadiusFilter}
            />

            {/* 모바일 상단 뷰 세그먼트 */}
            <div className="w-full sm:w-auto mt-1 sm:mt-0">
              <ViewToggle
                viewMode={viewMode}
                onToggle={setViewMode}
                count={processedRestaurants.length}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 영역 (반응형: 모바일은 탭 전환 / 데스크톱은 2열 분할 뷰) */}
      <main className="max-w-7xl mx-auto w-full px-4 py-4 flex-1">
        {/* 권한 거부 시 경고 카드 */}
        {permissionDenied && !matchedStation && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center justify-between gap-2 animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>
                위치 권한이 거부되어 기본 지역({locationName})을 기준으로 탐색 중입니다.
              </span>
            </div>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="px-3 py-1 bg-white border border-rose-300 text-rose-700 rounded-lg font-semibold hover:bg-rose-100 transition-colors shrink-0 cursor-pointer"
            >
              지역 직접 선택
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full items-start">
          {/* 목록 컬럼 */}
          <div
            className={`md:col-span-6 lg:col-span-5 space-y-3 ${
              viewMode === 'list' ? 'block' : 'hidden md:block'
            }`}
          >
            <RestaurantList
              restaurants={processedRestaurants}
              selectedRestaurantId={selectedRestaurant?.id}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              onSelectRestaurant={(r) => setSelectedRestaurant(r)}
              onViewOnMap={handleViewOnMap}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* 지도 컬럼 */}
          <div
            className={`md:col-span-6 lg:col-span-7 md:sticky md:top-[205px] h-[calc(100vh-230px)] min-h-[460px] ${
              viewMode === 'map' ? 'block' : 'hidden md:block'
            }`}
          >
            <MapContainer
              center={activeCoords}
              centerName={activeLocationName}
              restaurants={processedRestaurants}
              selectedRestaurant={selectedRestaurant}
              onSelectRestaurant={(r) => setSelectedRestaurant(r)}
              radiusFilter={radiusFilter}
            />
          </div>
        </div>
      </main>

      {/* 상세 모달 / 바텀시트 */}
      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onFocusOnMap={(r) => {
          setSelectedRestaurant(r);
          setViewMode('map');
        }}
      />

      {/* 지역 직접 선택 모달 (위치 권한 거부 또는 수동 변경) */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocationName={activeLocationName}
        permissionDenied={permissionDenied}
        errorMessage={locationError || geoError}
        onSelectRegion={setManualRegion}
        onRequestGps={requestBrowserLocation}
      />
    </div>
  );
}
