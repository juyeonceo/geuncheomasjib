'use client';

import React from 'react';
import { DistanceRadius } from '@/types/restaurant';

const DISTANCE_OPTIONS: { label: string; value: DistanceRadius }[] = [
  { label: '전체 거리', value: 0 },
  { label: '500m 이내', value: 500 },
  { label: '1km 이내', value: 1000 },
  { label: '3km 이내', value: 3000 },
];

interface DistanceFilterProps {
  selectedRadius: DistanceRadius;
  onSelectRadius: (radius: DistanceRadius) => void;
}

export function DistanceFilter({
  selectedRadius,
  onSelectRadius,
}: DistanceFilterProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
      <span className="text-xs font-semibold text-gray-500 shrink-0 mr-1">
        반경:
      </span>
      {DISTANCE_OPTIONS.map((opt) => {
        const isSelected = selectedRadius === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onSelectRadius(opt.value)}
            className={`shrink-0 px-2.5 py-1 rounded-lg text-xs transition-all border ${
              isSelected
                ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold shadow-xs'
                : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
