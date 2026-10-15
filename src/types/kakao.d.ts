/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        MarkerImage: new (src: string, size: any, options?: any) => any;
        Size: new (width: number, height: number) => any;
        Point: new (x: number, y: number) => any;
        Circle: new (options: any) => any;
        CustomOverlay: new (options: any) => any;
        InfoWindow: new (options: any) => any;
        event: {
          addListener: (target: any, type: string, handler: (...args: any[]) => void) => void;
          removeListener: (target: any, type: string, handler: (...args: any[]) => void) => void;
        };
        services?: {
          Status: {
            OK: any;
            ZERO_RESULT: any;
            ERROR: any;
          };
          SortBy?: {
            ACCURACY: any;
            DISTANCE: any;
          };
          Places: new () => {
            keywordSearch: (
              keyword: string,
              callback: (result: any[], status: any, pagination: any) => void,
              options?: any
            ) => void;
            categorySearch: (
              categoryCode: string,
              callback: (result: any[], status: any, pagination: any) => void,
              options?: any
            ) => void;
          };
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (result: any[], status: any) => void
            ) => void;
          };
        };
      };
    };
  }
}

export {};
