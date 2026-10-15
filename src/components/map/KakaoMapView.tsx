'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Coordinates, Restaurant, DistanceRadius } from '@/types/restaurant';
import { formatDistance } from '@/utils/distance';
import { Navigation, Plus, Minus, RotateCcw } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

interface KakaoMapViewProps {
  apiKey?: string;
  center: Coordinates;
  centerName: string;
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  radiusFilter: DistanceRadius;
}

export function KakaoMapView({
  center,
  centerName,
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  radiusFilter,
}: KakaoMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const centerMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circleRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlayRef = useRef<any>(null);

  const [mapReady, setMapReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  // 카카오 지도 인스턴스 초기화 (HTML head에 주입된 공식 Kakao Maps SDK 감지 및 연결)
  useEffect(() => {
    let checkTimer: NodeJS.Timeout | null = null;
    let attempts = 0;

    const initMap = () => {
      if (typeof window === 'undefined') return false;
      const kakao = window.kakao;
      if (!kakao || !kakao.maps || !containerRef.current) return false;

      kakao.maps.load(() => {
        if (!containerRef.current) return;
        try {
          if (!mapInstanceRef.current) {
            const options = {
              center: new kakao.maps.LatLng(center.latitude, center.longitude),
              level: radiusFilter === 500 ? 3 : radiusFilter === 3000 ? 5 : 4,
            };
            const map = new kakao.maps.Map(containerRef.current, options);
            mapInstanceRef.current = map;
            setMapReady(true);
            setLoadFailed(false);
          } else {
            const centerPos = new kakao.maps.LatLng(center.latitude, center.longitude);
            mapInstanceRef.current.panTo(centerPos);
            const targetLevel = radiusFilter === 500 ? 3 : radiusFilter === 3000 ? 5 : 4;
            mapInstanceRef.current.setLevel(targetLevel);
          }
        } catch (e) {
          console.warn('카카오 지도 인스턴스 생성 예외:', e);
        }
      });
      return true;
    };

    if (!initMap()) {
      checkTimer = setInterval(() => {
        attempts++;
        if (initMap()) {
          if (checkTimer) clearInterval(checkTimer);
        } else if (attempts >= 60) {
          // 6초 이상 SDK 로드 실패 시에만 폴백 모드 전환
          if (checkTimer) clearInterval(checkTimer);
          setLoadFailed(true);
        }
      }, 100);
    }

    return () => {
      if (checkTimer) clearInterval(checkTimer);
    };
  }, [center.latitude, center.longitude, radiusFilter]);

  // 창 크기 변경 및 뷰포트 전환 시 relayout 보장
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.relayout();
        const centerPos = new window.kakao.maps.LatLng(center.latitude, center.longitude);
        mapInstanceRef.current.setCenter(centerPos);
      }
    };

    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 150);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [mapReady, center.latitude, center.longitude]);

  // 중심 마커 및 반경 원 표시
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const centerPos = new window.kakao.maps.LatLng(center.latitude, center.longitude);

    if (centerMarkerRef.current) {
      centerMarkerRef.current.setMap(null);
    }

    const isCurrentLocation = centerName.includes('현재 위치') || centerName.includes('GPS');
    const centerContent = document.createElement('div');
    centerContent.className = 'flex flex-col items-center pointer-events-none -translate-x-1/2 -translate-y-1/2';
    centerContent.innerHTML = `
      <div class="relative flex items-center justify-center">
        <span class="absolute w-7 h-7 bg-blue-500/30 rounded-full animate-ping"></span>
        <span class="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-md"></span>
      </div>
      <span class="bg-gray-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md mt-1 whitespace-nowrap border border-white/20">
        ${isCurrentLocation ? '📍 내 위치' : centerName.split(' ')[2] || '기준 위치'}
      </span>
    `;

    const centerOverlay = new window.kakao.maps.CustomOverlay({
      position: centerPos,
      content: centerContent,
      yAnchor: 0.5,
      zIndex: 15,
    });
    centerOverlay.setMap(map);
    centerMarkerRef.current = centerOverlay;

    map.panTo(centerPos);

    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    const radiusToDraw = radiusFilter > 0 ? radiusFilter : 1000;
    const circle = new window.kakao.maps.Circle({
      center: centerPos,
      radius: radiusToDraw,
      strokeWeight: 2,
      strokeColor: '#f97316',
      strokeOpacity: 0.7,
      strokeStyle: 'dash',
      fillColor: '#f97316',
      fillOpacity: 0.05,
    });
    circle.setMap(map);
    circleRef.current = circle;
  }, [mapReady, center, centerName, radiusFilter]);

  // 오버레이 닫기
  const closeOverlay = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }
  }, []);

  // 오버레이 열기
  const openRestaurantOverlay = useCallback(
    (restaurant: Restaurant) => {
      if (!mapInstanceRef.current) return;
      closeOverlay();

      const position = new window.kakao.maps.LatLng(
        restaurant.coords.latitude,
        restaurant.coords.longitude
      );

      const content = document.createElement('div');
      content.className =
        'bg-white rounded-xl shadow-xl border border-orange-200 p-3 min-w-[200px] max-w-[260px] text-left transform -translate-y-12 transition-all';
      content.innerHTML = `
        <div class="flex items-center justify-between gap-1 mb-1">
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">
            ${restaurant.category}
          </span>
          <span class="text-[11px] font-semibold text-orange-600">
            ${restaurant.distance !== undefined ? formatDistance(restaurant.distance) : ''}
          </span>
        </div>
        <h4 class="font-bold text-gray-900 text-xs truncate">${restaurant.name}</h4>
        <p class="text-[10px] text-gray-500 truncate mt-0.5">${restaurant.roadAddress}</p>
        <div class="mt-2 pt-1.5 border-t border-gray-100 flex items-center justify-between">
          <span class="text-[9px] ${restaurant.isSample ? 'text-amber-600 bg-amber-50' : 'text-emerald-700 bg-emerald-50'} px-1 py-0.5 rounded font-medium">
            ${restaurant.isSample ? '샘플' : '매장 정보'}
          </span>
          <button id="btn-detail-${restaurant.id}" class="text-[11px] font-bold text-orange-600 hover:text-orange-700 cursor-pointer">
            상세 보기 →
          </button>
        </div>
      `;

      const detailBtn = content.querySelector(`#btn-detail-${restaurant.id}`);
      if (detailBtn) {
        detailBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          onSelectRestaurant(restaurant);
        });
      }

      const overlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
        yAnchor: 1.1,
        zIndex: 20,
      });

      overlay.setMap(mapInstanceRef.current);
      overlayRef.current = overlay;
    },
    [closeOverlay, onSelectRestaurant]
  );

  // 마커 동기화
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    closeOverlay();

    restaurants.forEach((restaurant) => {
      const position = new window.kakao.maps.LatLng(
        restaurant.coords.latitude,
        restaurant.coords.longitude
      );

      const marker = new window.kakao.maps.Marker({
        position: position,
        map: map,
        title: restaurant.name,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        openRestaurantOverlay(restaurant);
        onSelectRestaurant(restaurant);
      });

      markersRef.current.push(marker);
    });
  }, [mapReady, restaurants, openRestaurantOverlay, onSelectRestaurant, closeOverlay]);

  // 선택 식당 위치 이동
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !selectedRestaurant) return;
    const map = mapInstanceRef.current;
    const targetPos = new window.kakao.maps.LatLng(
      selectedRestaurant.coords.latitude,
      selectedRestaurant.coords.longitude
    );

    map.panTo(targetPos);
    openRestaurantOverlay(selectedRestaurant);
  }, [selectedRestaurant, mapReady, openRestaurantOverlay]);

  const handleZoomIn = () => {
    if (!mapInstanceRef.current) return;
    const currentLevel = mapInstanceRef.current.getLevel();
    mapInstanceRef.current.setLevel(currentLevel - 1);
  };

  const handleZoomOut = () => {
    if (!mapInstanceRef.current) return;
    const currentLevel = mapInstanceRef.current.getLevel();
    mapInstanceRef.current.setLevel(currentLevel + 1);
  };

  const handleResetCenter = () => {
    if (!mapInstanceRef.current) return;
    const centerPos = new window.kakao.maps.LatLng(center.latitude, center.longitude);
    mapInstanceRef.current.panTo(centerPos);
    const targetLevel = radiusFilter === 500 ? 3 : radiusFilter === 3000 ? 5 : 4;
    mapInstanceRef.current.setLevel(targetLevel);
    closeOverlay();
  };

  // SDK 로드가 완전히 실패한 경우에만 폴백 레이더 맵 표시
  if (loadFailed && !mapReady) {
    return (
      <InteractiveMap
        center={center}
        centerName={centerName}
        restaurants={restaurants}
        selectedRestaurant={selectedRestaurant}
        onSelectRestaurant={onSelectRestaurant}
        radiusFilter={radiusFilter}
      />
    );
  }

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col bg-slate-100">
      {/* 상단 안내 배너 */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-gray-200/80 text-xs shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-gray-800">카카오 지도</span>
          <span className="text-gray-400 hidden sm:inline">| 실시간 공식 SDK 지도</span>
        </div>
        <div className="text-[11px] text-gray-500 font-medium">
          기준: {centerName}
        </div>
      </div>

      {/* 로딩 인디케이터 (초기 맵 로딩 중 오버레이) */}
      {!mapReady && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs">
          <div className="w-9 h-9 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mb-2.5" />
          <span className="text-xs font-bold text-gray-700">카카오 지도 불러오는 중...</span>
          <span className="text-[11px] text-gray-400 mt-1">실시간 지도 타일 및 음식점 위치를 구성하고 있습니다</span>
        </div>
      )}

      {/* 지도 컨트롤러 (확대 / 축소 / 중심 재설정) */}
      <div className="absolute top-16 right-3 z-10 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-gray-200 shadow-md">
        <button
          onClick={handleZoomIn}
          aria-label="지도 확대"
          className="p-2 text-gray-700 hover:text-orange-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          title="확대"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          aria-label="지도 축소"
          className="p-2 text-gray-700 hover:text-orange-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          title="축소"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetCenter}
          aria-label="기준 위치로 이동"
          className="p-2 text-gray-700 hover:text-orange-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          title="기준점 중심 이동"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 실제 카카오 지도 캔버스 영역 */}
      <div
        id="kakao-map-canvas"
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '420px',
          position: 'relative',
        }}
        className="w-full h-full flex-1 min-h-[420px]"
      />

      {/* 선택된 식당 카드 */}
      {selectedRestaurant && (
        <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-orange-200 flex items-center justify-between gap-3 animate-slide-up">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold mb-0.5">
              <span>{selectedRestaurant.category}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <Navigation className="w-3 h-3" />
                {selectedRestaurant.distance !== undefined
                  ? formatDistance(selectedRestaurant.distance)
                  : ''}
              </span>
            </div>
            <h4 className="font-bold text-gray-900 text-sm truncate">
              {selectedRestaurant.name}
            </h4>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {selectedRestaurant.roadAddress}
            </p>
          </div>
          <button
            onClick={() => onSelectRestaurant(selectedRestaurant)}
            className="px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold shrink-0 shadow-xs transition-colors cursor-pointer"
          >
            상세 보기
          </button>
        </div>
      )}
    </div>
  );
}
