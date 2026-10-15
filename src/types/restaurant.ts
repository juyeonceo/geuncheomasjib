export type Category =
  | '전체'
  | '한식'
  | '일식'
  | '중식'
  | '양식'
  | '분식'
  | '카페·디저트'
  | '아시안/패스트푸드';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Region {
  id: string;
  name: string;
  sido: string;
  sigungu: string;
  dong: string;
  coords: Coordinates;
}

export interface Restaurant {
  id: string;
  name: string;
  category: Exclude<Category, '전체'>;
  subCategory?: string;
  address: string;
  roadAddress: string;
  phone: string;
  coords: Coordinates;
  mainMenu: string[];
  distance?: number; // 기준점과의 거리 (미터 단위, 런타임 계산)
  isSample: boolean;
  // 요구사항 준수: 평점·리뷰·영업시간을 실제 정보처럼 만들지 않음
  ratingNotice: string;
  reviewNotice: string;
  businessHoursNotice: string;
}

export type ViewMode = 'list' | 'map';

export type DistanceRadius = 500 | 1000 | 3000 | 0; // 0은 전체
