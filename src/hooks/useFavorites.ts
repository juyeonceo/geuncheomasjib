'use client';

import { useState, useEffect, useCallback } from 'react';
import { Restaurant } from '@/types/restaurant';

const STORAGE_KEY = 'geuncheomasjib_favorites_v1';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 로컬 스토리지에서 즐겨찾기 목록 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (e) {
      console.warn('즐겨찾기 로드 실패:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 즐겨찾기 변경 시 로컬 스토리지 자동 저장
  const saveFavorites = useCallback((newFavs: Restaurant[]) => {
    setFavorites(newFavs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
    } catch (e) {
      console.warn('즐겨찾기 저장 실패:', e);
    }
  }, []);

  // 특정 식당의 즐겨찾기 여부 확인
  const isFavorite = useCallback(
    (restaurantId: string) => {
      return favorites.some((item) => item.id === restaurantId);
    },
    [favorites]
  );

  // 즐겨찾기 추가 / 해제 토글
  const toggleFavorite = useCallback(
    (restaurant: Restaurant) => {
      setFavorites((prev) => {
        const exists = prev.some((item) => item.id === restaurant.id);
        const next = exists
          ? prev.filter((item) => item.id !== restaurant.id)
          : [restaurant, ...prev];

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
          console.warn('즐겨찾기 토글 저장 실패:', e);
        }
        return next;
      });
    },
    []
  );

  return {
    favorites,
    isLoaded,
    isFavorite,
    toggleFavorite,
    saveFavorites,
  };
}
