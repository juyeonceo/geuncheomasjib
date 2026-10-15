'use client';

import React from 'react';
import { Restaurant } from '@/types/restaurant';
import { RestaurantCard } from './RestaurantCard';
import { ArrowUpDown, SearchX } from 'lucide-react';

export type SortOrder = 'distance' | 'name';

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedRestaurantId?: string;
  sortOrder: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onViewOnMap?: (restaurant: Restaurant) => void;
  onResetFilters?: () => void;
}

export function RestaurantList({
  restaurants,
  selectedRestaurantId,
  sortOrder,
  onSortChange,
  onSelectRestaurant,
  onViewOnMap,
  onResetFilters,
}: RestaurantListProps) {
  return (
    <div className="space-y-3">
      {/* 목록 헤더: 건수 & 정렬 */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs sm:text-sm font-semibold text-gray-700">
          검색 결과 <span className="text-orange-600">{restaurants.length}</span>곳
        </span>

        <div className="flex items-center gap-1.5 text-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as SortOrder)}
            className="bg-transparent border-none text-gray-600 font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="distance">가까운 거리순</option>
            <option value="name">가나다 이름순</option>
          </select>
        </div>
      </div>

      {/* 음식점 카드 리스트 */}
      {restaurants.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={restaurant.id === selectedRestaurantId}
              onClick={() => onSelectRestaurant(restaurant)}
              onViewOnMap={onViewOnMap}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 p-6">
          <SearchX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-800">
            조건에 일치하는 음식점이 없습니다
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            거리 반경 필터를 넓히거나 검색어, 업종 필터를 변경해 보세요.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors"
            >
              필터 전체 초기화
            </button>
          )}
        </div>
      )}
    </div>
  );
}
