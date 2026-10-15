'use client';

import { useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

interface BackButtonHandlers {
  isDetailOpen: boolean;
  onCloseDetail: () => void;
  isLocationOpen: boolean;
  onCloseLocation: () => void;
  isFavoritesOpen: boolean;
  onCloseFavorites: () => void;
  searchQuery: string;
  onClearSearch: () => void;
  viewMode: 'list' | 'map';
  onSetViewMode: (mode: 'list' | 'map') => void;
}

export function useAndroidBackButton(handlers: BackButtonHandlers) {
  const lastBackPressTime = useRef<number>(0);
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let backListener: { remove: () => void } | null = null;
    let urlListener: { remove: () => void } | null = null;

    // 1. Android 하드웨어 뒤로가기 버튼 리스너 등록
    App.addListener('backButton', () => {
      const h = handlersRef.current;

      // 1순위: 상세 모달이 열려있으면 모달 닫기
      if (h.isDetailOpen) {
        h.onCloseDetail();
        return;
      }

      // 2순위: 지역 선택 모달이 열려있으면 닫기
      if (h.isLocationOpen) {
        h.onCloseLocation();
        return;
      }

      // 3순위: 즐겨찾기 창이 열려있으면 닫기
      if (h.isFavoritesOpen) {
        h.onCloseFavorites();
        return;
      }

      // 4순위: 검색창에 검색어가 있으면 검색어 초기화
      if (h.searchQuery.trim().length > 0) {
        h.onClearSearch();
        return;
      }

      // 5순위: 모바일 지도 보기 모드이면 목록 모드로 전환
      if (h.viewMode === 'map') {
        h.onSetViewMode('list');
        return;
      }

      // 6순위: 최상위 화면에서 2초 내에 뒤로가기 다시 누르면 앱 종료
      const now = Date.now();
      if (now - lastBackPressTime.current < 2000) {
        App.exitApp();
      } else {
        lastBackPressTime.current = now;
      }
    }).then((handle) => {
      backListener = handle;
    });

    // 2. 외부 URL / 소셜 로그인 후 앱 복귀 리스너
    App.addListener('appUrlOpen', (event) => {
      // 딥링크 또는 OAuth 리디렉션 처리
      if (event.url.includes('#access_token=') || event.url.includes('code=')) {
        // Supabase 등 세션 자동 갱신 트리거
        if (typeof window !== 'undefined') {
          window.location.hash = event.url.split('#')[1] || '';
        }
      }
    }).then((handle) => {
      urlListener = handle;
    });

    return () => {
      backListener?.remove();
      urlListener?.remove();
    };
  }, []);
}
