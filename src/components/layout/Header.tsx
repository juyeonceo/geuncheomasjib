'use client';

import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface HeaderProps {
  locationName: string;
  isGps: boolean;
  isLoadingLocation: boolean;
  onOpenLocationModal: () => void;
  onRequestGps: () => void;
}

export function Header({
  locationName,
  isGps,
  isLoadingLocation,
  onOpenLocationModal,
  onRequestGps,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* 서비스 타이틀 */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-sm shadow-orange-200">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-base sm:text-lg leading-tight flex items-center gap-1.5">
              우리동네 식당
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                LIVE v1.0
              </span>
            </h1>
            <p className="text-[11px] text-gray-500 hidden sm:block">
              내 주변 로컬 음식점 탐색
            </p>
          </div>
        </div>

        {/* 현재 기준 위치 & 변경 버튼 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-medium transition-colors border border-gray-200"
            title="지역 직접 선택 / 변경"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="max-w-[130px] sm:max-w-[200px] truncate">
              {locationName}
            </span>
            <span className="text-gray-400 text-xs">▼</span>
          </button>

          {/* 내 주변 찾기 버튼 (클릭 시 브라우저 위치 권한 요청) */}
          <button
            onClick={onRequestGps}
            disabled={isLoadingLocation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all border shadow-xs ${
              isGps
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                : 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500 active:scale-95'
            }`}
            title="클릭 시 브라우저 위치 권한을 요청하여 내 현재 위치로 탐색합니다"
          >
            <Navigation
              className={`w-3.5 h-3.5 ${isLoadingLocation ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">
              {isLoadingLocation ? '위치 확인 중...' : isGps ? '내 위치 기준' : '내 주변 찾기'}
            </span>
            <span className="sm:hidden">
              {isLoadingLocation ? '탐색 중' : isGps ? '내위치' : '내주변'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
