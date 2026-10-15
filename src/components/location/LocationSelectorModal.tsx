'use client';

import React from 'react';
import { X, Navigation, Check, AlertCircle, HelpCircle } from 'lucide-react';
import { Region } from '@/types/restaurant';
import { AVAILABLE_REGIONS } from '@/data/sampleRestaurants';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocationName: string;
  permissionDenied: boolean;
  errorMessage?: string | null;
  onSelectRegion: (region: Region) => void;
  onRequestGps: () => void;
}

export function LocationSelectorModal({
  isOpen,
  onClose,
  currentLocationName,
  permissionDenied,
  errorMessage,
  onSelectRegion,
  onRequestGps,
}: LocationSelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">지역 직접 선택</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              기준 위치를 중심으로 주변 500m ~ 3km 음식점을 찾습니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 권한 거부 또는 위치 획득 실패 안내 배너 */}
        {(permissionDenied || errorMessage) && (
          <div className="bg-rose-50 border-b border-rose-100 px-5 py-3 text-rose-800 text-xs space-y-1.5">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-900">
                  {permissionDenied ? '위치 권한이 거부되었습니다.' : '위치를 확인할 수 없습니다.'}
                </p>
                <p className="mt-0.5 text-rose-700 leading-relaxed">
                  {errorMessage || '원하는 동네를 아래 목록에서 직접 선택하여 서비스를 이용해 주세요.'}
                </p>
              </div>
            </div>

            {permissionDenied && (
              <div className="bg-white/80 p-2 rounded-lg border border-rose-200/60 text-[11px] text-rose-900 flex items-start gap-1.5 mt-1">
                <HelpCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  브라우저 주소창 좌측 <strong>자물쇠/설정(🔒)</strong> 아이콘 클릭 ➔ <strong>[위치 허용]</strong> 후 다시 시도하실 수 있습니다.
                </span>
              </div>
            )}
          </div>
        )}

        {/* 내 현재 위치(GPS) 재시도 버튼 */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => {
              onRequestGps();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors shadow-xs"
          >
            <Navigation className="w-4 h-4" />
            내 브라우저 현재 위치로 탐색 재시도
          </button>
        </div>

        {/* 추천 동네 목록 */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            동네 바로 선택
          </h3>
          <div className="space-y-1.5">
            {AVAILABLE_REGIONS.map((region) => {
              const isSelected = currentLocationName.includes(region.dong);
              return (
                <button
                  key={region.id}
                  onClick={() => {
                    onSelectRegion(region);
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/60 text-orange-950 font-semibold shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium">{region.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      기준 좌표: {region.coords.latitude.toFixed(4)}, {region.coords.longitude.toFixed(4)}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-orange-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 개인정보 보호 안내 */}
        <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
          <span>🔒 사용자의 위치 정보는 서버/DB에 저장되지 않습니다.</span>
          <button
            onClick={onClose}
            className="text-xs text-gray-600 hover:text-gray-900 font-semibold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
