'use client';

import { useState, useCallback } from 'react';
import { Coordinates, Region } from '@/types/restaurant';
import { DEFAULT_REGION } from '@/data/sampleRestaurants';

export type GeolocationErrorCode = 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'NOT_SUPPORTED';

export interface GeolocationState {
  coords: Coordinates;
  locationName: string;
  mode: 'browser' | 'manual';
  isLoading: boolean;
  permissionDenied: boolean;
  errorCode: GeolocationErrorCode | null;
  error: string | null;
}

export function useGeolocation(onLocationFailure?: (msg: string) => void) {
  const [state, setState] = useState<GeolocationState>({
    coords: DEFAULT_REGION.coords,
    locationName: DEFAULT_REGION.name,
    mode: 'manual',
    isLoading: false, // [3단계 요구사항]: 마운트 시 자동 요청하지 않고 버튼 클릭 시 요청
    permissionDenied: false,
    errorCode: null,
    error: null,
  });

  // 버튼을 누를 때 명시적으로 호출되는 브라우저 위치 권한 요청 함수
  const requestBrowserLocation = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      errorCode: null,
    }));

    // 1. 브라우저 지원 여부 확인
    if (typeof window === 'undefined' || !navigator.geolocation) {
      const errorMsg = '사용 중인 브라우저에서 위치 서비스를 지원하지 않습니다. 지역을 직접 선택해 주세요.';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        permissionDenied: true,
        errorCode: 'NOT_SUPPORTED',
        error: errorMsg,
      }));
      onLocationFailure?.(errorMsg);
      return;
    }

    // 2. 브라우저 위치 권한 요청 (getCurrentPosition)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // [보안/개인정보 보호 준수]: 위치 좌표는 React 클라이언트 메모리에만 유지되며 DB에 저장하지 않음
        setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          locationName: '내 현재 위치 (GPS)',
          mode: 'browser',
          isLoading: false,
          permissionDenied: false,
          errorCode: null,
          error: null,
        });
      },
      (geoError) => {
        let errorMsg = '위치 정보를 가져오지 못했습니다.';
        let code: GeolocationErrorCode = 'POSITION_UNAVAILABLE';

        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            errorMsg = '위치 권한이 거부되었습니다. 브라우저 상단에서 위치 권한을 허용하거나 지역을 직접 선택해 주세요.';
            code = 'PERMISSION_DENIED';
            break;
          case geoError.TIMEOUT:
            errorMsg = '위치 확인 요청 시간이 초과되었습니다 (8초). 네트워크 상태를 확인하시거나 지역을 직접 선택해 주세요.';
            code = 'TIMEOUT';
            break;
          case geoError.POSITION_UNAVAILABLE:
            errorMsg = '현재 위치 신호를 확인할 수 없습니다. GPS가 꺼져있거나 실내일 수 있습니다.';
            code = 'POSITION_UNAVAILABLE';
            break;
        }

        setState((prev) => ({
          ...prev,
          isLoading: false,
          permissionDenied: code === 'PERMISSION_DENIED',
          errorCode: code,
          error: errorMsg,
        }));

        // 실패 시 지역 직접 선택을 권장하는 콜백 호출
        onLocationFailure?.(errorMsg);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000, // 8초 타임아웃
        maximumAge: 10000,
      }
    );
  }, [onLocationFailure]);

  // 지역 직접 선택 핸들러
  const setManualRegion = useCallback((region: Region) => {
    setState({
      coords: region.coords,
      locationName: region.name,
      mode: 'manual',
      isLoading: false,
      permissionDenied: false,
      errorCode: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    requestBrowserLocation,
    setManualRegion,
  };
}
