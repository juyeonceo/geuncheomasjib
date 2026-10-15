'use client';

import React from 'react';
import { X, MapPin, Phone, UtensilsCrossed, Clock, Star, AlertTriangle, Navigation } from 'lucide-react';
import { Restaurant } from '@/types/restaurant';
import { formatDistance } from '@/utils/distance';

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onFocusOnMap?: (restaurant: Restaurant) => void;
}

export function RestaurantDetailModal({
  restaurant,
  onClose,
  onFocusOnMap,
}: RestaurantDetailModalProps) {
  if (!restaurant) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모바일 상단 드래그 핸들 */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3 sm:hidden" />

        {/* 헤더 */}
        <div className="px-6 pt-3 pb-4 border-b border-gray-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-orange-100 text-orange-700">
                {restaurant.category}
              </span>
              {restaurant.subCategory && (
                <span className="text-xs text-gray-500 font-medium">
                  {restaurant.subCategory}
                </span>
              )}
              {restaurant.distance !== undefined && (
                <span className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  {formatDistance(restaurant.distance)}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              {restaurant.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 콘텐츠 */}
        <div className="p-6 space-y-5 flex-1">
          {/* 주소 및 연락처 */}
          <div className="space-y-2 bg-gray-50 p-4 rounded-xl text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{restaurant.roadAddress}</p>
                <p className="text-xs text-gray-500 mt-0.5">(지번) {restaurant.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1 text-gray-700">
              <Phone className="w-4 h-4 text-gray-500 shrink-0" />
              <span>{restaurant.phone}</span>
            </div>
          </div>

          {/* 대표 메뉴 */}
          <div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-2.5">
              <UtensilsCrossed className="w-4 h-4 text-orange-500" />
              <span>{restaurant.isSample ? '대표 메뉴 (샘플)' : '대표 메뉴 정보'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {restaurant.mainMenu.map((menu, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-800 flex items-center justify-between"
                >
                  <span>{menu}</span>
                  <span className="text-[11px] text-gray-400">
                    {restaurant.isSample ? '샘플' : '추천'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 안내 및 출처 섹션 */}
          <div className="border border-emerald-200 bg-emerald-50/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900">
              <Star className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>매장 정보 안내</span>
            </div>

            <div className="space-y-2 text-xs text-emerald-950/90 leading-relaxed">
              <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-gray-800">
                    {restaurant.businessHoursNotice || '영업 안내'}
                  </span>
                  <span className="text-gray-500">
                    공공데이터포털 및 로컬 등록 데이터 기준입니다. 명절·휴무일 등은 매장에 유선 확인을 권장합니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 액션 */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
          {onFocusOnMap && (
            <button
              onClick={() => {
                onFocusOnMap(restaurant);
                onClose();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              <Navigation className="w-4 h-4" />
              지도에서 위치 보기
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
