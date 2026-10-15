'use client';

import React from 'react';
import { List, Map } from 'lucide-react';
import { ViewMode } from '@/types/restaurant';

interface ViewToggleProps {
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
  count: number;
}

export function ViewToggle({ viewMode, onToggle, count }: ViewToggleProps) {
  return (
    <>
      {/* 상단 세그먼트 컨트롤 (모바일 & 태블릿) */}
      <div className="flex md:hidden p-1 bg-gray-100 rounded-xl w-full border border-gray-200">
        <button
          onClick={() => onToggle('list')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
            viewMode === 'list'
              ? 'bg-white text-gray-900 shadow-2xs'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          <span>목록 보기 ({count})</span>
        </button>
        <button
          onClick={() => onToggle('map')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
            viewMode === 'map'
              ? 'bg-white text-gray-900 shadow-2xs'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>지도 보기</span>
        </button>
      </div>

      {/* 모바일 화면 하단 고정 플로팅 전환 버튼 (한 손 조작 최적화) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden animate-bounce-subtle">
        <button
          onClick={() => onToggle(viewMode === 'list' ? 'map' : 'list')}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-900 hover:bg-black text-white text-sm font-semibold shadow-xl border border-gray-700 active:scale-95 transition-all"
        >
          {viewMode === 'list' ? (
            <>
              <Map className="w-4 h-4 text-orange-400" />
              <span>지도에서 보기</span>
            </>
          ) : (
            <>
              <List className="w-4 h-4 text-orange-400" />
              <span>목록으로 보기</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
