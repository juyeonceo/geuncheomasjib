'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { REAL_RESTAURANTS } from '@/data/realRestaurants';
import { findSubwayStation, SubwayStation } from '@/data/subwayStations';
import { Restaurant, Category, DistanceRadius, ViewMode } from '@/types/restaurant';
import { calculateDistance } from '@/utils/distance';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useFavorites } from '@/hooks/useFavorites';
import { useAndroidBackButton } from '@/hooks/useAndroidBackButton';
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
import {
  Navigation,
  AlertCircle,
  Train,
  Heart,
  WifiOff,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { apiUrl } from '@/utils/api';

function mapKakaoCategory(categoryName: string = ''): Exclude<Category, '전체'> {
  if (
    categoryName.includes('한식') ||
    categoryName.includes('국밥') ||
    categoryName.includes('찌개') ||
    categoryName.includes('고기') ||
    categoryName.includes('구이') ||
    categoryName.includes('백반')
  )
    return '한식';
  if (
    categoryName.includes('일식') ||
    categoryName.includes('초밥') ||
    categoryName.includes('돈가스') ||
    categoryName.includes('라멘') ||
    categoryName.includes('회')
  )
    return '일식';
  if (
    categoryName.includes('중식') ||
    categoryName.includes('중화') ||
    categoryName.includes('짜장') ||
    categoryName.includes('마라')
  )
    return '중식';
  if (
    categoryName.includes('양식') ||
    categoryName.includes('파스타') ||
    categoryName.includes('피자') ||
    categoryName.includes('스테이크') ||
    categoryName.includes('이탈리안')
  )
    return '양식';
  if (
    categoryName.includes('분식') ||
    categoryName.includes('떡볶이') ||
    categoryName.includes('김밥') ||
    categoryName.includes('순대')
  )
    return '분식';
  if (
    categoryName.includes('카페') ||
    categoryName.includes('커피') ||
    categoryName.includes('디저트') ||
    categoryName.includes('제과') ||
    categoryName.includes('베이커리')
  )
    return '카페·디저트';
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

  // 즐겨찾기 훅
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 검색 & 필터 상태
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
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  // 오프라인/온라인 상태 감지
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Android 하드웨어 뒤로가기 버튼 처리
  useAndroidBackButton({
    isDetailOpen: Boolean(selectedRestaurant),
    onCloseDetail: () => setSelectedRestaurant(null),
    isLocationOpen: isLocationModalOpen,
    onCloseLocation: () => setIsLocationModalOpen(false),
    isFavoritesOpen: showFavoritesOnly,
    onCloseFavorites: () => setShowFavoritesOnly(false),
    searchQuery: searchQuery,
    onClearSearch: () => setSearchQuery(''),
    viewMode: viewMode,
    onSetViewMode: setViewMode,
  });

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

    if (findSubwayStation(q)) {
      setDynamicStation(null);
      return;
    }

    if (typeof window !== 'undefined' && window.kakao?.maps?.services?.Places) {
      try {
        const ps = new window.kakao.maps.services.Places();
        const searchKeyword = q.endsWith('역') ? q : `${q}역`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // 맛집 데이터 조회 함수
  const fetchLiveRestaurants = useCallback(async () => {
    setIsLoadingData(true);
    setFetchError(null);
    try {
      const queryRadius = radiusFilter > 0 ? radiusFilter : 3000;
      const res = await fetch(
        apiUrl(
          `/api/restaurants?lat=${activeCoords.latitude}&lng=${activeCoords.longitude}&radius=${queryRadius}`
        )
      );
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json?.restaurants) && json.restaurants.length > 0) {
          setRestaurants(json.restaurants);
        }
      } else {
        setFetchError('서버 응답이 원활하지 않습니다. 저장된 로컬 매장 데이터를 표시합니다.');
      }
    } catch {
      setFetchError('네트워크 연결이 불안정합니다. 오프라인 실데이터로 탐색합니다.');
    } finally {
      setIsLoadingData(false);
    }
  }, [activeCoords.latitude, activeCoords.longitude, radiusFilter]);

  useEffect(() => {
    fetchLiveRestaurants();
  }, [fetchLiveRestaurants]);

  // 클라이언트 브라우저 카카오 Places 보강
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const kakao = window.kakao;
    if (!kakao?.maps?.services?.Places) return;

    try {
      const ps = new kakao.maps.services.Places();
      const loc = new kakao.maps.LatLng(activeCoords.latitude, activeCoords.longitude);
      const searchRadius = radiusFilter > 0 ? radiusFilter : 2500;

      ps.categorySearch(
        'FD6',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any[], status: any) => {
          if (status === kakao.maps.services?.Status.OK && Array.isArray(data) && data.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    rawRestaurants.forEach((r) => map.set(r.name, r));
    liveKakaoRestaurants.forEach((r) => {
      if (!map.has(r.name)) {
        map.set(r.name, r);
      }
    });
    return Array.from(map.values());
  }, [rawRestaurants, liveKakaoRestaurants]);

  // 필터링 및 거리순 정렬
  const processedRestaurants = useMemo(() => {
    const withDistance = combinedRestaurants.map((restaurant) => {
      const distance = calculateDistance(activeCoords, restaurant.coords);
      return {
        ...restaurant,
        distance,
      };
    });

    const rawQuery = searchQuery.trim();
    const query = rawQuery.toLowerCase();
    const isStationQuery = matchedStation !== null;

    let filtered = withDistance.filter((item) => {
      if (!query) return true;

      if (isStationQuery) {
        const stationName = matchedStation.cleanName.toLowerCase();
        const matchAddress =
          item.roadAddress.toLowerCase().includes(stationName) ||
          item.address.toLowerCase().includes(stationName) ||
          item.name.toLowerCase().includes(stationName);

        const isNearStation = (item.distance ?? 99999) <= 3000;
        return matchAddress || isNearStation;
      }

      const matchName = item.name.toLowerCase().includes(query);
      const matchMenu = item.mainMenu.some((menu) => menu.toLowerCase().includes(query));
      const matchSubCategory = item.subCategory?.toLowerCase().includes(query);
      const matchAddress =
        item.roadAddress.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query);

      return matchName || matchMenu || matchSubCategory || matchAddress;
    });

    // 즐겨찾기만 보기 필터
    if (showFavoritesOnly) {
      filtered = filtered.filter((item) => isFavorite(item.id));
    }

    // 업종 카테고리 필터링
    if (selectedCategory !== '전체') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // 반경 필터링
    if (radiusFilter > 0) {
      filtered = filtered.filter(
        (item) => item.distance !== undefined && item.distance <= radiusFilter
      );
    }

    // 거리 또는 이름순 정렬
    filtered.sort((a, b) => {
      if (sortOrder === 'distance') {
        return (a.distance ?? 0) - (b.distance ?? 0);
      }
      return a.name.localeCompare(b.name, 'ko');
    });

    return filtered;
  }, [
    combinedRestaurants,
    activeCoords,
    searchQuery,
    matchedStation,
    showFavoritesOnly,
    isFavorite,
    selectedCategory,
    radiusFilter,
    sortOrder,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('전체');
    setRadiusFilter(0);
    setShowFavoritesOnly(false);
  };

  const handleViewOnMap = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setViewMode('map');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 pb-[max(env(safe-area-inset-bottom),20px)] md:pb-0">
      {/* 연동 완료 서비스 상태 배너 */}
      <SampleNotice />

      {/* 헤더 */}
      <Header
        locationName={activeLocationName}
        isGps={mode === 'browser' && !matchedStation}
        isLoadingLocation={isLoadingLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onRequestGps={requestBrowserLocation}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
      />

      {/* 오프라인 또는 네트워크 오류 배너 */}
      {(isOffline || fetchError) && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold flex items-center justify-between gap-2 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-1.5">
              <WifiOff className="w-4 h-4 text-slate-950 shrink-0" />
              <span>{isOffline ? '네트워크에 연결되지 않았습니다 (오프라인 모드)' : fetchError}</span>
            </span>
            <button
              type="button"
              onClick={fetchLiveRestaurants}
              disabled={isLoadingData}
              className="flex items-center gap-1 bg-slate-950 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isLoadingData ? 'animate-spin' : ''}`} />
              <span>다시 시도</span>
            </button>
          </div>
        </div>
      )}

      {/* 전철역/지역 검색 활성화 안내 배너 */}
      {matchedStation && (
        <div className="bg-orange-50 border-b border-orange-200 px-4 py-2 text-xs text-orange-950 flex items-center justify-between animate-fade-in">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-semibold text-orange-900">
              <Train className="w-4 h-4 text-orange-600 shrink-0" />
              &apos;{matchedStation.name}&apos; 전철역 탐색: {activeLocationName} 중심 맛집 {processedRestaurants.length}곳
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

      {/* 즐겨찾기 필터 활성화 배너 */}
      {showFavoritesOnly && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-xs text-red-950 flex items-center justify-between animate-fade-in">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-bold text-red-700">
              <Heart className="w-4 h-4 text-red-500 fill-current shrink-0" />
              즐겨찾기한 맛집 ({processedRestaurants.length}곳) 모아보기
            </span>
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className="text-red-700 underline hover:text-red-950 shrink-0 font-bold text-[11px] cursor-pointer"
            >
              전체 목록 보기
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

        {/* 즐겨찾기 목록이 비어있을 때 안내 */}
        {showFavoritesOnly && processedRestaurants.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-gray-200 p-8 my-4">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">아직 즐겨찾기한 맛집이 없습니다</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              마음에 드는 음식점 카드의 하트(❤️) 버튼을 누르면 언제든지 이곳에서 빠르게 모아볼 수 있습니다.
            </p>
            <button
              type="button"
              onClick={() => setShowFavoritesOnly(false)}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              맛집 둘러보기
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
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
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
        isFavorite={selectedRestaurant ? isFavorite(selectedRestaurant.id) : false}
        onToggleFavorite={toggleFavorite}
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
