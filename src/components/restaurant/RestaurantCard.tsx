'use client';

import React from 'react';
import { MapPin, Navigation, Tag } from 'lucide-react';
import { Restaurant } from '@/types/restaurant';
import { formatDistance } from '@/utils/distance';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  onViewOnMap?: (restaurant: Restaurant) => void;
  isSelected?: boolean;
}

export function RestaurantCard({
  restaurant,
  onClick,
  onViewOnMap,
  isSelected = false,
}: RestaurantCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-2xl border p-4 transition-all cursor-pointer shadow-2xs hover:shadow-md hover:border-orange-300 relative ${
        isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
      }`}
    >
      {/* 상단: 카테고리 & 거리 */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 font-semibold text-xs border border-orange-100">
            {restaurant.category}
          </span>
          {restaurant.subCategory && (
            <span className="text-xs text-gray-500">
              {restaurant.subCategory}
            </span>
          )}
        </div>

        {restaurant.distance !== undefined && (
          <div className="flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50/60 px-2 py-0.5 rounded-full shrink-0">
            <Navigation className="w-3 h-3" />
            <span>{formatDistance(restaurant.distance)}</span>
          </div>
        )}
      </div>

      {/* 음식점 명 */}
      <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors flex items-center gap-1.5">
        {restaurant.name}
      </h3>

      {/* 주소 */}
      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 line-clamp-1">
        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="truncate">{restaurant.roadAddress}</span>
      </div>

      {/* 대표 메뉴 목록 태그 */}
      <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
        <Tag className="w-3 h-3 text-gray-400 shrink-0" />
        {restaurant.mainMenu.map((menu, idx) => (
          <span
            key={idx}
            className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md"
          >
            {menu}
          </span>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-gray-500 gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${
              restaurant.isSample
                ? 'text-amber-700 bg-amber-50 border-amber-100'
                : 'text-emerald-700 bg-emerald-50 border-emerald-100'
            }`}
          >
            {restaurant.isSample ? restaurant.ratingNotice : '검증된 매장 정보'}
          </span>
          <span className="text-gray-400 text-[10px]">
            {restaurant.businessHoursNotice || '영업 정보 매장 확인'}
          </span>
        </div>

        {onViewOnMap && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewOnMap(restaurant);
            }}
            className="text-xs text-orange-600 hover:text-orange-700 font-medium shrink-0 self-end sm:self-auto"
          >
            지도 위치 보기 →
          </button>
        )}
      </div>
    </div>
  );
}
