/**
 * API 기본 URL 유틸리티
 *
 * - 웹 환경 (Vercel, localhost 등): 상대 경로 ("") 사용
 * - Capacitor 네이티브 앱 환경 (capacitor://, file:// 등): Vercel 서버의 절대 HTTPS URL 사용
 */

const REMOTE_SERVER_URL =
  process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL || 'https://geuncheomasjib.vercel.app';

export function getApiBaseUrl(): string {
  // 빌드 타임 환경변수 지정 시 우선 적용
  if (process.env.NEXT_PUBLIC_API_BASE_URL !== undefined) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // 브라우저 런타임 환경 감지
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    // Capacitor iOS (capacitor://localhost), Android (http://localhost), file:// 등 네이티브 뷰 감지
    const isCapacitorNative =
      protocol === 'capacitor:' ||
      protocol === 'ionic:' ||
      protocol === 'file:' ||
      (hostname === 'localhost' && typeof (window as unknown as { Capacitor?: unknown }).Capacitor !== 'undefined');

    if (isCapacitorNative) {
      return REMOTE_SERVER_URL;
    }
  }

  return '';
}

export function apiUrl(path: string): string {
  const base = getApiBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
