'use client';

import React from 'react';
import { Category } from '@/types/restaurant';

const CATEGORIES: Category[] = [
  '전체',
  '한식',
  '일식',
  '중식',
  '양식',
  '분식',
  '카페·디저트',
  '아시안/패스트푸드',
];

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isSelected
                ? 'bg-orange-500 text-white shadow-xs font-semibold'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
