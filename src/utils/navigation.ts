import { Restaurant } from '@/types/restaurant';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

/**
 * 외부 링크 및 지도 앱 안전 열기
 */
export async function openExternalUrl(url: string) {
  if (Capacitor.isNativePlatform()) {
    try {
      await Browser.open({ url, windowName: '_system' });
      return;
    } catch {
      // Browser plugin fallback
    }
  }
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * 카카오맵 길찾기 연결 (앱 설치 시 앱 실행, 미설치 시 모바일 웹 길찾기)
 */
export async function openKakaoMapRoute(restaurant: Restaurant) {
  const { latitude, longitude } = restaurant.coords;
  const encodedName = encodeURIComponent(restaurant.name);

  if (Capacitor.isNativePlatform()) {
    // 네이티브 앱 환경: 카카오맵 커스텀 URL 스킴 우선 시도
    const appUrl = `kakaomap://route?ep=${latitude},${longitude}&by=PUBLICTRANSIT`;
    const webUrl = `https://map.kakao.com/link/to/${encodedName},${latitude},${longitude}`;

    try {
      // 모바일 브라우저/스킴 연결
      window.location.href = appUrl;
      setTimeout(() => {
        openExternalUrl(webUrl);
      }, 1500);
      return;
    } catch {
      await openExternalUrl(webUrl);
      return;
    }
  }

  // 일반 웹 환경: 카카오맵 웹 길찾기 페이지 오픈
  const webUrl = `https://map.kakao.com/link/to/${encodedName},${latitude},${longitude}`;
  await openExternalUrl(webUrl);
}

/**
 * 네이버 지도 길찾기 연결
 */
export async function openNaverMapRoute(restaurant: Restaurant) {
  const { latitude, longitude } = restaurant.coords;
  const encodedName = encodeURIComponent(restaurant.name);

  if (Capacitor.isNativePlatform()) {
    const appUrl = `nmap://route/public?dlat=${latitude}&dlng=${longitude}&dname=${encodedName}&appname=com.geuncheomasjib.app`;
    const webUrl = `https://map.naver.com/v5/directions/-/-/${longitude},${latitude},${encodedName}/-/transit`;

    try {
      window.location.href = appUrl;
      setTimeout(() => {
        openExternalUrl(webUrl);
      }, 1500);
      return;
    } catch {
      await openExternalUrl(webUrl);
      return;
    }
  }

  const webUrl = `https://map.naver.com/v5/directions/-/-/${longitude},${latitude},${encodedName}/-/transit`;
  await openExternalUrl(webUrl);
}
