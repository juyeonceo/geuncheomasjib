'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, MapPin, ChevronRight, Train } from 'lucide-react';
import { searchSubwayStations, SubwayStation } from '@/data/subwayStations';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSelectStation?: (station: SubwayStation) => void;
}

const QUICK_TAGS = [
  '서대문역',
  '강남역',
  '홍대입구역',
  '판교역',
  '수원역',
  '해운대역',
  '동대구역',
  '대전역',
];

export function SearchBar({
  query,
  onChange,
  onClear,
  onSelectStation,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 전철역 자동완성 후보 검색
  const suggestions = React.useMemo(() => {
    if (!query || query.trim().length === 0) return [];
    return searchSubwayStations(query, 6);
  }, [query]);

  const showDropdown = isFocused && suggestions.length > 0;

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (station: SubwayStation) => {
    onChange(station.name);
    if (onSelectStation) {
      onSelectStation(station);
    }
    setIsFocused(false);
  };

  return (
    <div ref={containerRef} className="space-y-1.5 w-full relative">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && suggestions.length > 0) {
              e.preventDefault();
              handleSelect(suggestions[0]);
            }
          }}
          placeholder="대한민국 모든 전철역/기차역 또는 음식점(예: 서대문역, 강남역, 판교역) 검색"
          className="w-full pl-10 pr-9 py-2.5 bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 focus:border-orange-500 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all shadow-2xs"
        />
        {query && (
          <button
            onClick={() => {
              onClear();
              setIsFocused(false);
            }}
            aria-label="검색어 지우기"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 전철역 실시간 자동완성 추천 드롭다운 */}
      {showDropdown && (
        <div className="absolute top-[42px] left-0 right-0 z-50 bg-white rounded-xl shadow-xl border border-orange-200 overflow-hidden divide-y divide-gray-100 animate-slide-up">
          <div className="px-3 py-1.5 bg-orange-50/60 text-[11px] font-bold text-orange-800 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Train className="w-3.5 h-3.5 text-orange-600" />
              전국 전철역 바로가기
            </span>
            <span className="text-[10px] text-gray-500 font-normal">선택 시 해당 역 중심으로 지도 이동</span>
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {suggestions.map((st) => (
              <li key={`${st.name}-${st.line}`}>
                <button
                  type="button"
                  onClick={() => handleSelect(st)}
                  className="w-full px-3.5 py-2 text-left hover:bg-orange-50/80 flex items-center justify-between text-xs transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-orange-100 text-orange-700 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <span className="font-bold text-gray-900 group-hover:text-orange-600 mr-2">
                        {st.name}
                      </span>
                      <span className="text-[11px] text-orange-600 font-medium bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200/60">
                        {st.line}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <span>{st.region}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-500" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 전국 주요 전철역 빠른 탐색 칩 */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto pb-0.5 no-scrollbar">
        <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium shrink-0">
          <Sparkles className="w-3 h-3 text-orange-400" />
          전국 주요역:
        </span>
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(tag)}
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
              query === tag
                ? 'bg-orange-500 text-white shadow-2xs font-bold'
                : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
