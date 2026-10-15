'use client';

import React, { useState } from 'react';
import { CheckCircle2, X, ChevronRight, Database, Map } from 'lucide-react';

export function SampleNotice() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (isDismissed) return null;

  return (
    <aside aria-label="연동 상태 안내" className="bg-emerald-50 border-b border-emerald-200 text-emerald-900 text-xs sm:text-sm px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2 flex-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <span className="font-semibold text-emerald-950 mr-1.5">[실제 서비스 연동 모드]</span>
            <span>카카오 지도 공식 키와 Supabase 데이터베이스가 연결되었습니다.</span>
            {isExpanded && (
              <div className="mt-1.5 text-emerald-800 leading-relaxed text-xs space-y-1 bg-white/70 p-2.5 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5 text-yellow-600" />
                  <span>카카오 지도 JavaScript SDK 활성화 완료</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Supabase 및 공공데이터포털 상가정보 규격 실데이터 조회 모드 동작 중</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-emerald-700 underline text-xs hover:text-emerald-900 flex items-center"
          >
            {isExpanded ? '간략히' : '연동 정보'}
            <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="안내 닫기"
            className="p-1 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
