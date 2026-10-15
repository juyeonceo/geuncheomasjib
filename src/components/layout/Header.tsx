'use client';

import React from 'react';
import { MapPin, Navigation, Compass, Heart } from 'lucide-react';

interface HeaderProps {
  locationName: string;
  isGps: boolean;
  isLoadingLocation: boolean;
  onOpenLocationModal: () => void;
  onRequestGps: () => void;
  favoritesCount?: number;
  showFavoritesOnly?: boolean;
  onToggleFavoritesOnly?: () => void;
}

export function Header({
  locationName,
  isGps,
  isLoadingLocation,
  onOpenLocationModal,
  onRequestGps,
  favoritesCount = 0,
  showFavoritesOnly = false,
  onToggleFavoritesOnly,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 pt-[max(env(safe-area-inset-top),0px)] transition-all">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2.5">
        {/* 서비스 타이틀 */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-sm shadow-orange-200">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-base sm:text-lg leading-tight flex items-center gap-1.5">
              우리동네 식당
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                LIVE
              </span>
            </h1>
            <p className="text-[11px] text-gray-500 hidden sm:block">
              내 주변 로컬 음식점 탐색
            </p>
          </div>
        </div>

        {/* 액션 바: 지역 선택 + 즐겨찾기 + 내 주변 GPS */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 즐겨찾기 필터 버튼 */}
          {onToggleFavoritesOnly && (
            <button
              type="button"
              onClick={onToggleFavoritesOnly}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                showFavoritesOnly
                  ? 'bg-red-500 text-white border-red-500 shadow-xs'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
              title="즐겨찾기한 맛집만 모아보기"
            >
              <Heart
                className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current text-white' : 'text-red-500'}`}
              />
              <span className="hidden sm:inline">즐겨찾기</span>
              {favoritesCount > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    showFavoritesOnly
                      ? 'bg-white text-red-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {favoritesCount}
                </span>
              )}
            </button>
          )}

          {/* 현재 기준 위치 & 변경 버튼 */}
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-medium transition-colors border border-gray-200 cursor-pointer"
            title="지역 직접 선택 / 변경"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="max-w-[100px] sm:max-w-[180px] truncate">
              {locationName}
            </span>
            <span className="text-gray-400 text-xs">▼</span>
          </button>

          {/* 내 주변 찾기 버튼 */}
          <button
            type="button"
            onClick={onRequestGps}
            disabled={isLoadingLocation}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all border shadow-xs cursor-pointer ${
              isGps
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                : 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500 active:scale-95'
            }`}
            title="클릭 시 위치 권한을 요청하여 내 현재 위치로 탐색합니다"
          >
            <Navigation
              className={`w-3.5 h-3.5 ${isLoadingLocation ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">
              {isLoadingLocation ? '위치 확인 중...' : isGps ? '내 위치 기준' : '내 주변 찾기'}
            </span>
            <span className="sm:hidden">
              {isLoadingLocation ? '확인중' : isGps ? '내위치' : '내주변'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
