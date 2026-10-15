'use client';

import React, { useState, useMemo } from 'react';
import { Coordinates, Restaurant, DistanceRadius } from '@/types/restaurant';
import { calculateDistance, formatDistance } from '@/utils/distance';
import { Navigation, Plus, Minus, RotateCcw, MapPin, Info } from 'lucide-react';

interface InteractiveMapProps {
  center: Coordinates;
  centerName: string;
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  radiusFilter: DistanceRadius;
}

export function InteractiveMap({
  center,
  centerName,
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  radiusFilter,
}: InteractiveMapProps) {
  // 줌 레벨: 1 = 기본(약 3.5km 시야), 1.8 = 확대(500m~1km 중심), 0.7 = 축소
  const [zoom, setZoom] = useState<number>(1.2);

  // 기준 중심점 대비 각 음식점의 상대 x, y (픽셀 오프셋) 계산
  // 1도 위도 ≈ 111,000m, 1도 경도 ≈ 88,800m (서울 위도 37.5 기준)
  // 지도 뷰포트 크기를 600x600 가상 박스로 정의 (중심 300, 300)
  const mapCenterPx = 300;
  // 스케일: 줌 1.0일 때 반경 3km = 250px (즉 1m 당 약 0.0833px)
  const baseScale = (250 / 3000) * zoom;

  const markers = useMemo(() => {
    return restaurants.map((r) => {
      const latDiffMeters = (r.coords.latitude - center.latitude) * 111000;
      const lngDiffMeters =
        (r.coords.longitude - center.longitude) * 88800;

      // x는 동쪽(+), y는 북쪽(+)이므로 SVG 화면상 위쪽은 y 감소(-)
      const x = mapCenterPx + lngDiffMeters * baseScale;
      const y = mapCenterPx - latDiffMeters * baseScale;
      const distance = calculateDistance(center, r.coords);

      return {
        restaurant: r,
        x,
        y,
        distance,
      };
    });
  }, [restaurants, center, baseScale]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.6));
  const handleReset = () => setZoom(1.2);

  const [currentOrigin, setCurrentOrigin] = useState<string>('');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin);
    }
  }, []);

  const handleCopyOrigin = () => {
    if (currentOrigin && navigator.clipboard) {
      navigator.clipboard.writeText(currentOrigin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[420px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col shadow-inner select-none">
      {/* 상단 안내 헤더 */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/60 text-xs text-slate-200 shadow-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-400">우리 동네 탐색 지도</span>
          <span className="text-slate-400 hidden sm:inline">| 실시간 거리 레이더 뷰</span>
        </div>
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Info className="w-3 h-3 text-slate-400" />
          <span>기준: {centerName}</span>
        </div>
      </div>

      {/* 배포 환경 카카오 지도 도메인 등록 안내 배너 */}
      {currentOrigin && !currentOrigin.includes('localhost') && (
        <div className="absolute top-16 left-3 right-16 z-20 bg-amber-950/95 backdrop-blur-md border border-amber-500/80 p-3 rounded-xl text-amber-200 text-xs shadow-xl animate-fade-in">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="font-bold text-amber-300 flex items-center gap-1 text-xs">
                <span>⚠️ 카카오 지도 정식 활성화 안내</span>
              </p>
              <p className="text-[11px] text-amber-100 leading-relaxed">
                현재 배포 주소(<span className="font-mono text-white underline font-semibold">{currentOrigin}</span>)가 카카오 개발자 콘솔에 아직 등록되지 않아 임시 레이더 지도가 표시 중입니다.
              </p>
              <p className="text-[11px] text-amber-200/90">
                👉{' '}
                <a
                  href="https://developers.kakao.com/console/app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline font-bold hover:text-amber-300"
                >
                  카카오 디벨로퍼스
                </a>{' '}
                [앱 설정 &gt; 플랫폼 &gt; Web &gt; 사이트 도메인]에 위 주소를 추가하시면 실제 카카오 지도가 바로 열립니다!
              </p>
            </div>
            <button
              onClick={handleCopyOrigin}
              type="button"
              className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs shrink-0 shadow transition-colors cursor-pointer"
            >
              {copied ? '복사됨!' : '주소 복사'}
            </button>
          </div>
        </div>
      )}

      {/* 맵 컨트롤러 (줌 인/아웃/리셋) */}
      <div className="absolute top-16 right-3 z-10 flex flex-col gap-1.5 bg-slate-800/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 shadow-lg">
        <button
          onClick={handleZoomIn}
          aria-label="지도 확대"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          title="확대"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          aria-label="지도 축소"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          title="축소"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          aria-label="시야 초기화"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          title="기본 시야"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG 인터랙티브 맵 캔버스 영역 */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full max-w-[700px] max-h-[700px] transition-all duration-300"
        >
          {/* 그리드 배경 */}
          <defs>
            <pattern id="radar-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="600" fill="url(#radar-grid)" />

          {/* 반경 가이드 동심원 (500m, 1km, 3km) */}
          {/* 3000m 원 */}
          <circle
            cx={mapCenterPx}
            cy={mapCenterPx}
            r={3000 * baseScale}
            fill="none"
            stroke="#334155"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className={radiusFilter === 3000 ? 'stroke-orange-500/60' : ''}
          />
          <text
            x={mapCenterPx + 10}
            y={mapCenterPx - 3000 * baseScale + 14}
            fill="#64748b"
            fontSize="10"
            fontFamily="sans-serif"
          >
            3km 반경
          </text>

          {/* 1000m 원 */}
          <circle
            cx={mapCenterPx}
            cy={mapCenterPx}
            r={1000 * baseScale}
            fill="none"
            stroke="#334155"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            className={radiusFilter === 1000 ? 'stroke-orange-500/60' : ''}
          />
          <text
            x={mapCenterPx + 10}
            y={mapCenterPx - 1000 * baseScale + 14}
            fill="#64748b"
            fontSize="10"
            fontFamily="sans-serif"
          >
            1km 반경
          </text>

          {/* 500m 원 */}
          <circle
            cx={mapCenterPx}
            cy={mapCenterPx}
            r={500 * baseScale}
            fill="rgba(249, 115, 22, 0.04)"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            className={radiusFilter === 500 ? 'fill-orange-500/10' : ''}
          />
          <text
            x={mapCenterPx + 10}
            y={mapCenterPx - 500 * baseScale + 14}
            fill="#f97316"
            fontSize="10"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            500m 반경
          </text>

          {/* 중심 기준점 펄스 & 마커 (현재 위치) */}
          <circle
            cx={mapCenterPx}
            cy={mapCenterPx}
            r="16"
            fill="rgba(59, 130, 246, 0.2)"
            className="animate-ping"
          />
          <circle
            cx={mapCenterPx}
            cy={mapCenterPx}
            r="7"
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <text
            x={mapCenterPx}
            y={mapCenterPx + 20}
            textAnchor="middle"
            fill="#93c5fd"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            현재 기준점
          </text>

          {/* 음식점 마커 핀들 */}
          {markers.map(({ restaurant, x, y, distance }) => {
            const isSelected = selectedRestaurant?.id === restaurant.id;
            return (
              <g
                key={restaurant.id}
                className="cursor-pointer transition-transform"
                onClick={() => onSelectRestaurant(restaurant)}
              >
                {/* 핀 강조 원 */}
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r="16"
                    fill="rgba(249, 115, 22, 0.3)"
                    className="animate-pulse"
                  />
                )}
                {/* 마커 본체 */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? '9' : '6.5'}
                  fill={isSelected ? '#f97316' : '#fdba74'}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                />
                {/* 마커 라벨 */}
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : '#cbd5e1'}
                  fontSize={isSelected ? '11' : '9.5'}
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  fontFamily="sans-serif"
                  className="pointer-events-none drop-shadow-sm"
                >
                  {restaurant.name.replace('[샘플] ', '')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 하단 선택된 음식점 미니 프리뷰 카드 */}
      {selectedRestaurant && (
        <div className="absolute bottom-3 left-3 right-3 z-10 bg-white rounded-xl p-3.5 shadow-2xl border border-gray-150 flex items-center justify-between gap-3 animate-slide-up">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-orange-600 font-semibold mb-0.5">
              <span>{selectedRestaurant.category}</span>
              <span>•</span>
              <span>{formatDistance(selectedRestaurant.distance ?? 0)}</span>
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
            className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold shrink-0 shadow-xs transition-colors"
          >
            상세 보기
          </button>
        </div>
      )}

      {/* 지도 하단 범례 */}
      <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> 기준점
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" /> 샘플 음식점 ({markers.length}개)
          </span>
        </div>
        <span className="hidden sm:inline text-slate-500 text-[10px]">
          핀을 클릭하면 상세 정보를 확인할 수 있습니다
        </span>
      </div>
    </div>
  );
}
