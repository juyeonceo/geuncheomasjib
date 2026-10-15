export interface SubwayStation {
  name: string;
  cleanName: string;
  line: string;
  region: string;
  coords: {
    latitude: number;
    longitude: number;
  };
}

/**
 * 대한민국 주요 전철역 및 기차역 데이터베이스
 * 수도권(1~9호선, 수인분당, 신분당, 경의중앙, 공항철도, 경강, 서해 등)
 * 부산(1~4호선, 동해선), 대구(1~3호선), 대전(1호선), 광주(1호선), KTX 주요 역
 */
export const SUBWAY_STATIONS: SubwayStation[] = [
  // === 서울 1호선 & KTX ===
  { name: '서울역', cleanName: '서울', line: '1·4호선·공항철도·경의중앙·KTX', region: '서울 용산구/중구', coords: { latitude: 37.5562, longitude: 126.9723 } },
  { name: '시청역', cleanName: '시청', line: '1·2호선', region: '서울 중구', coords: { latitude: 37.5657, longitude: 126.9772 } },
  { name: '종각역', cleanName: '종각', line: '1호선', region: '서울 종로구', coords: { latitude: 37.5702, longitude: 126.9831 } },
  { name: '종로3가역', cleanName: '종로3가', line: '1·3·5호선', region: '서울 종로구', coords: { latitude: 37.5716, longitude: 126.9918 } },
  { name: '종로5가역', cleanName: '종로5가', line: '1호선', region: '서울 종로구', coords: { latitude: 37.5709, longitude: 127.0019 } },
  { name: '동대문역', cleanName: '동대문', line: '1·4호선', region: '서울 종로구', coords: { latitude: 37.5714, longitude: 127.0097 } },
  { name: '신설동역', cleanName: '신설동', line: '1·2호선·우이신설', region: '서울 동대문구', coords: { latitude: 37.5753, longitude: 127.0248 } },
  { name: '청량리역', cleanName: '청량리', line: '1호선·경의중앙·수인분당·KTX', region: '서울 동대문구', coords: { latitude: 37.5801, longitude: 127.0468 } },
  { name: '용산역', cleanName: '용산', line: '1호선·경의중앙·KTX', region: '서울 용산구', coords: { latitude: 37.5298, longitude: 126.9647 } },
  { name: '노량진역', cleanName: '노량진', line: '1·9호선', region: '서울 동작구', coords: { latitude: 37.5135, longitude: 126.9408 } },
  { name: '대방역', cleanName: '대방', line: '1호선·신림선', region: '서울 영등포구', coords: { latitude: 37.5133, longitude: 126.9264 } },
  { name: '신길역', cleanName: '신길', line: '1·5호선', region: '서울 영등포구', coords: { latitude: 37.5171, longitude: 126.9171 } },
  { name: '영등포역', cleanName: '영등포', line: '1호선·KTX', region: '서울 영등포구', coords: { latitude: 37.5156, longitude: 126.9077 } },
  { name: '신도림역', cleanName: '신도림', line: '1·2호선', region: '서울 구로구', coords: { latitude: 37.5088, longitude: 126.8913 } },
  { name: '구로역', cleanName: '구로', line: '1호선', region: '서울 구로구', coords: { latitude: 37.5031, longitude: 126.8820 } },
  { name: '가산디지털단지역', cleanName: '가산디지털단지', line: '1·7호선', region: '서울 금천구', coords: { latitude: 37.4811, longitude: 126.8826 } },

  // === 서울 2호선 ===
  { name: '을지로입구역', cleanName: '을지로입구', line: '2호선', region: '서울 중구', coords: { latitude: 37.5660, longitude: 126.9822 } },
  { name: '을지로3가역', cleanName: '을지로3가', line: '2·3호선', region: '서울 중구', coords: { latitude: 37.5663, longitude: 126.9926 } },
  { name: '을지로4가역', cleanName: '을지로4가', line: '2·5호선', region: '서울 중구', coords: { latitude: 37.5667, longitude: 126.9981 } },
  { name: '동대문역사문화공원역', cleanName: '동대문역사문화공원', line: '2·4·5호선', region: '서울 중구', coords: { latitude: 37.5656, longitude: 127.0090 } },
  { name: '신당역', cleanName: '신당', line: '2·6호선', region: '서울 중구', coords: { latitude: 37.5658, longitude: 127.0195 } },
  { name: '상왕십리역', cleanName: '상왕십리', line: '2호선', region: '서울 성동구', coords: { latitude: 37.5644, longitude: 127.0293 } },
  { name: '왕십리역', cleanName: '왕십리', line: '2·5호선·수인분당·경의중앙', region: '서울 성동구', coords: { latitude: 37.5613, longitude: 127.0378 } },
  { name: '한양대역', cleanName: '한양대', line: '2호선', region: '서울 성동구', coords: { latitude: 37.5556, longitude: 127.0437 } },
  { name: '뚝섬역', cleanName: '뚝섬', line: '2호선', region: '서울 성동구', coords: { latitude: 37.5472, longitude: 127.0474 } },
  { name: '성수역', cleanName: '성수', line: '2호선', region: '서울 성동구', coords: { latitude: 37.5446, longitude: 127.0560 } },
  { name: '건대입구역', cleanName: '건대입구', line: '2·7호선', region: '서울 광진구', coords: { latitude: 37.5404, longitude: 127.0692 } },
  { name: '구의역', cleanName: '구의', line: '2호선', region: '서울 광진구', coords: { latitude: 37.5371, longitude: 127.0859 } },
  { name: '강변역', cleanName: '강변', line: '2호선 (동서울터미널)', region: '서울 광진구', coords: { latitude: 37.5351, longitude: 127.0947 } },
  { name: '잠실나루역', cleanName: '잠실나루', line: '2호선', region: '서울 송파구', coords: { latitude: 37.5207, longitude: 127.1038 } },
  { name: '잠실역', cleanName: '잠실', line: '2·8호선 (롯데월드몰)', region: '서울 송파구', coords: { latitude: 37.5133, longitude: 127.1001 } },
  { name: '잠실새내역', cleanName: '잠실새내', line: '2호선', region: '서울 송파구', coords: { latitude: 37.5116, longitude: 127.0862 } },
  { name: '종합운동장역', cleanName: '종합운동장', line: '2·9호선', region: '서울 송파구', coords: { latitude: 37.5110, longitude: 127.0736 } },
  { name: '삼성역', cleanName: '삼성', line: '2호선 (코엑스)', region: '서울 강남구', coords: { latitude: 37.5088, longitude: 127.0632 } },
  { name: '선릉역', cleanName: '선릉', line: '2호선·수인분당', region: '서울 강남구', coords: { latitude: 37.5045, longitude: 127.0490 } },
  { name: '역삼역', cleanName: '역삼', line: '2호선', region: '서울 강남구', coords: { latitude: 37.5006, longitude: 127.0365 } },
  { name: '강남역', cleanName: '강남', line: '2호선·신분당선', region: '서울 강남구/서초구', coords: { latitude: 37.4979, longitude: 127.0276 } },
  { name: '교대역', cleanName: '교대', line: '2·3호선', region: '서울 서초구', coords: { latitude: 37.4934, longitude: 127.0141 } },
  { name: '서초역', cleanName: '서초', line: '2호선', region: '서울 서초구', coords: { latitude: 37.4919, longitude: 127.0079 } },
  { name: '방배역', cleanName: '방배', line: '2호선', region: '서울 서초구', coords: { latitude: 37.4814, longitude: 126.9976 } },
  { name: '사당역', cleanName: '사당', line: '2·4호선', region: '서울 동작구/관악구', coords: { latitude: 37.4765, longitude: 126.9816 } },
  { name: '낙성대역', cleanName: '낙성대', line: '2호선', region: '서울 관악구', coords: { latitude: 37.4770, longitude: 126.9636 } },
  { name: '서울대입구역', cleanName: '서울대입구', line: '2호선', region: '서울 관악구', coords: { latitude: 37.4812, longitude: 126.9527 } },
  { name: '봉천역', cleanName: '봉천', line: '2호선', region: '서울 관악구', coords: { latitude: 37.4824, longitude: 126.9416 } },
  { name: '신림역', cleanName: '신림', line: '2호선·신림선', region: '서울 관악구', coords: { latitude: 37.4843, longitude: 126.9297 } },
  { name: '신대방역', cleanName: '신대방', line: '2호선', region: '서울 동작구', coords: { latitude: 37.4875, longitude: 126.9132 } },
  { name: '구로디지털단지역', cleanName: '구로디지털단지', line: '2호선', region: '서울 구로구', coords: { latitude: 37.4853, longitude: 126.9015 } },
  { name: '대림역', cleanName: '대림', line: '2·7호선', region: '서울 구로구', coords: { latitude: 37.4929, longitude: 126.8958 } },
  { name: '문래역', cleanName: '문래', line: '2호선', region: '서울 영등포구', coords: { latitude: 37.5179, longitude: 126.8948 } },
  { name: '영등포구청역', cleanName: '영등포구청', line: '2·5호선', region: '서울 영등포구', coords: { latitude: 37.5257, longitude: 126.8966 } },
  { name: '당산역', cleanName: '당산', line: '2·9호선', region: '서울 영등포구', coords: { latitude: 37.5348, longitude: 126.9026 } },
  { name: '합정역', cleanName: '합정', line: '2·6호선', region: '서울 마포구', coords: { latitude: 37.5495, longitude: 126.9137 } },
  { name: '홍대입구역', cleanName: '홍대입구', line: '2호선·경의중앙·공항철도', region: '서울 마포구', coords: { latitude: 37.5572, longitude: 126.9245 } },
  { name: '신촌역', cleanName: '신촌', line: '2호선', region: '서울 서대문구/마포구', coords: { latitude: 37.5551, longitude: 126.9369 } },
  { name: '이대역', cleanName: '이대', line: '2호선', region: '서울 서대문구', coords: { latitude: 37.5567, longitude: 126.9459 } },
  { name: '아현역', cleanName: '아현', line: '2호선', region: '서울 마포구/서대문구', coords: { latitude: 37.5573, longitude: 126.9561 } },
  { name: '충정로역', cleanName: '충정로', line: '2·5호선', region: '서울 서대문구', coords: { latitude: 37.5598, longitude: 126.9635 } },

  // === 서울 3호선 ===
  { name: '구파발역', cleanName: '구파발', line: '3호선', region: '서울 은평구', coords: { latitude: 37.6366, longitude: 126.9189 } },
  { name: '연신내역', cleanName: '연신내', line: '3·6호선', region: '서울 은평구', coords: { latitude: 37.6189, longitude: 126.9208 } },
  { name: '불광역', cleanName: '불광', line: '3·6호선', region: '서울 은평구', coords: { latitude: 37.6105, longitude: 126.9299 } },
  { name: '독립문역', cleanName: '독립문', line: '3호선', region: '서울 서대문구/종로구', coords: { latitude: 37.5744, longitude: 126.9578 } },
  { name: '경복궁역', cleanName: '경복궁', line: '3호선', region: '서울 종로구', coords: { latitude: 37.5758, longitude: 126.9736 } },
  { name: '안국역', cleanName: '안국', line: '3호선', region: '서울 종로구 (북촌/인사동)', coords: { latitude: 37.5765, longitude: 126.9855 } },
  { name: '충무로역', cleanName: '충무로', line: '3·4호선', region: '서울 중구', coords: { latitude: 37.5612, longitude: 126.9942 } },
  { name: '동대입구역', cleanName: '동대입구', line: '3호선 (장충동)', region: '서울 중구', coords: { latitude: 37.5591, longitude: 127.0054 } },
  { name: '약수역', cleanName: '약수', line: '3·6호선', region: '서울 중구', coords: { latitude: 37.5544, longitude: 127.0107 } },
  { name: '옥수역', cleanName: '옥수', line: '3호선·경의중앙', region: '서울 성동구', coords: { latitude: 37.5414, longitude: 127.0177 } },
  { name: '압구정역', cleanName: '압구정', line: '3호선', region: '서울 강남구', coords: { latitude: 37.5268, longitude: 127.0285 } },
  { name: '신사역', cleanName: '신사', line: '3호선·신분당선 (가로수길)', region: '서울 강남구/서초구', coords: { latitude: 37.5163, longitude: 127.0205 } },
  { name: '잠원역', cleanName: '잠원', line: '3호선', region: '서울 서초구', coords: { latitude: 37.5126, longitude: 127.0112 } },
  { name: '고속터미널역', cleanName: '고속터미널', line: '3·7·9호선', region: '서울 서초구', coords: { latitude: 37.5048, longitude: 127.0049 } },
  { name: '남부터미널역', cleanName: '남부터미널', line: '3호선 (예술의전당)', region: '서울 서초구', coords: { latitude: 37.4845, longitude: 127.0163 } },
  { name: '양재역', cleanName: '양재', line: '3호선·신분당선', region: '서울 서초구/강남구', coords: { latitude: 37.4841, longitude: 127.0346 } },
  { name: '매봉역', cleanName: '매봉', line: '3호선', region: '서울 강남구', coords: { latitude: 37.4868, longitude: 127.0468 } },
  { name: '도곡역', cleanName: '도곡', line: '3호선·수인분당', region: '서울 강남구', coords: { latitude: 37.4909, longitude: 127.0554 } },
  { name: '대치역', cleanName: '대치', line: '3호선', region: '서울 강남구', coords: { latitude: 37.4946, longitude: 127.0636 } },
  { name: '수서역', cleanName: '수서', line: '3호선·수인분당·SRT·GTX-A', region: '서울 강남구', coords: { latitude: 37.4874, longitude: 127.1014 } },
  { name: '가락시장역', cleanName: '가락시장', line: '3·8호선', region: '서울 송파구', coords: { latitude: 37.4925, longitude: 127.1183 } },

  // === 서울 4호선 ===
  { name: '당고개역', cleanName: '당고개', line: '4호선', region: '서울 노원구', coords: { latitude: 37.6702, longitude: 127.0791 } },
  { name: '노원역', cleanName: '노원', line: '4·7호선', region: '서울 노원구', coords: { latitude: 37.6560, longitude: 127.0632 } },
  { name: '창동역', cleanName: '창동', line: '1·4호선', region: '서울 도봉구', coords: { latitude: 37.6531, longitude: 127.0478 } },
  { name: '쌍문역', cleanName: '쌍문', line: '4호선', region: '서울 도봉구', coords: { latitude: 37.6486, longitude: 127.0347 } },
  { name: '수유역', cleanName: '수유', line: '4호선 (강북구청)', region: '서울 강북구', coords: { latitude: 37.6380, longitude: 127.0257 } },
  { name: '미아사거리역', cleanName: '미아사거리', line: '4호선', region: '서울 강북구', coords: { latitude: 37.6133, longitude: 127.0300 } },
  { name: '성신여대입구역', cleanName: '성신여대입구', line: '4호선·우이신설', region: '서울 성북구', coords: { latitude: 37.5927, longitude: 127.0165 } },
  { name: '한성대입구역', cleanName: '한성대입구', line: '4호선 (삼선교)', region: '서울 성북구', coords: { latitude: 37.5885, longitude: 127.0062 } },
  { name: '혜화역', cleanName: '혜화', line: '4호선 (대학로)', region: '서울 종로구', coords: { latitude: 37.5822, longitude: 127.0019 } },
  { name: '명동역', cleanName: '명동', line: '4호선', region: '서울 중구', coords: { latitude: 37.5609, longitude: 126.9863 } },
  { name: '회현역', cleanName: '회현', line: '4호선 (남대문시장)', region: '서울 중구', coords: { latitude: 37.5585, longitude: 126.9782 } },
  { name: '숙대입구역', cleanName: '숙대입구', line: '4호선', region: '서울 용산구', coords: { latitude: 37.5446, longitude: 126.9721 } },
  { name: '삼각지역', cleanName: '삼각지', line: '4·6호선', region: '서울 용산구 (용리단길)', coords: { latitude: 37.5348, longitude: 126.9732 } },
  { name: '신용산역', cleanName: '신용산', line: '4호선 (아모레퍼시픽)', region: '서울 용산구', coords: { latitude: 37.5292, longitude: 126.9680 } },
  { name: '이촌역', cleanName: '이촌', line: '4호선·경의중앙 (국립중앙박물관)', region: '서울 용산구', coords: { latitude: 37.5222, longitude: 126.9736 } },
  { name: '총신대입구역', cleanName: '이수', line: '4·7호선 (이수역)', region: '서울 동작구', coords: { latitude: 37.4862, longitude: 126.9818 } },
  { name: '인덕원역', cleanName: '인덕원', line: '4호선', region: '경기 안양시 동안구', coords: { latitude: 37.4018, longitude: 126.9768 } },
  { name: '범계역', cleanName: '범계', line: '4호선 (평촌 1번가)', region: '경기 안양시 동안구', coords: { latitude: 37.3898, longitude: 126.9508 } },

  // === 서울 5호선 ===
  { name: '방화역', cleanName: '방화', line: '5호선', region: '서울 강서구', coords: { latitude: 37.5775, longitude: 126.8128 } },
  { name: '김포공항역', cleanName: '김포공항', line: '5·9호선·공항철도·서해선·김포골드', region: '서울 강서구', coords: { latitude: 37.5624, longitude: 126.8015 } },
  { name: '마곡역', cleanName: '마곡', line: '5호선 (LG사이언스파크)', region: '서울 강서구', coords: { latitude: 37.5601, longitude: 126.8255 } },
  { name: '발산역', cleanName: '발산', line: '5호선', region: '서울 강서구', coords: { latitude: 37.5585, longitude: 126.8378 } },
  { name: '화곡역', cleanName: '화곡', line: '5호선', region: '서울 강서구', coords: { latitude: 37.5416, longitude: 126.8404 } },
  { name: '까치산역', cleanName: '까치산', line: '2·5호선', region: '서울 강서구', coords: { latitude: 37.5317, longitude: 126.8467 } },
  { name: '목동역', cleanName: '목동', line: '5호선', region: '서울 양천구', coords: { latitude: 37.5259, longitude: 126.8649 } },
  { name: '오목교역', cleanName: '오목교', line: '5호선 (현대목동/SBS)', region: '서울 양천구', coords: { latitude: 37.5245, longitude: 126.8752 } },
  { name: '여의도역', cleanName: '여의도', line: '5·9호선 (IFC/더현대서울)', region: '서울 영등포구', coords: { latitude: 37.5216, longitude: 126.9242 } },
  { name: '여의나루역', cleanName: '여의나루', line: '5호선 (한강공원)', region: '서울 영등포구', coords: { latitude: 37.5271, longitude: 126.9329 } },
  { name: '마포역', cleanName: '마포', line: '5호선 (용강동 음식거리)', region: '서울 마포구', coords: { latitude: 37.5396, longitude: 126.9459 } },
  { name: '공덕역', cleanName: '공덕', line: '5·6호선·경의중앙·공항철도', region: '서울 마포구', coords: { latitude: 37.5432, longitude: 126.9515 } },
  { name: '서대문역', cleanName: '서대문', line: '5호선', region: '서울 서대문구/종로구', coords: { latitude: 37.5658, longitude: 126.9667 } },
  { name: '광화문역', cleanName: '광화문', line: '5호선 (세종문화회관)', region: '서울 종로구', coords: { latitude: 37.5714, longitude: 126.9768 } },
  { name: '동대문역사문화공원역', cleanName: '동대문DDP', line: '2·4·5호선', region: '서울 중구', coords: { latitude: 37.5656, longitude: 127.0090 } },
  { name: '천호역', cleanName: '천호', line: '5·8호선 (로데오거리)', region: '서울 강동구', coords: { latitude: 37.5386, longitude: 127.1234 } },
  { name: '올림픽공원역', cleanName: '올림픽공원', line: '5·9호선', region: '서울 송파구', coords: { latitude: 37.5161, longitude: 127.1309 } },

  // === 서울 6호선 ===
  { name: '응암역', cleanName: '응암', line: '6호선', region: '서울 은평구', coords: { latitude: 37.5986, longitude: 126.9155 } },
  { name: 'DMC역', cleanName: '디지털미디어시티', line: '6호선·경의중앙·공항철도', region: '서울 은평구/마포구', coords: { latitude: 37.5768, longitude: 126.9011 } },
  { name: '월드컵경기장역', cleanName: '월드컵경기장', line: '6호선 (상암)', region: '서울 마포구', coords: { latitude: 37.5695, longitude: 126.8991 } },
  { name: '마포구청역', cleanName: '마포구청', line: '6호선', region: '서울 마포구', coords: { latitude: 37.5638, longitude: 126.9034 } },
  { name: '망원역', cleanName: '망원', line: '6호선 (망원시장/망리단길)', region: '서울 마포구', coords: { latitude: 37.5568, longitude: 126.9101 } },
  { name: '상수역', cleanName: '상수', line: '6호선 (상수동 카페거리)', region: '서울 마포구', coords: { latitude: 37.5477, longitude: 126.9229 } },
  { name: '광흥창역', cleanName: '광흥창', line: '6호선', region: '서울 마포구', coords: { latitude: 37.5474, longitude: 126.9319 } },
  { name: '대흥역', cleanName: '대흥', line: '6호선 (서강대앞)', region: '서울 마포구', coords: { latitude: 37.5477, longitude: 126.9421 } },
  { name: '효창공원앞역', cleanName: '효창공원앞', line: '6호선·경의중앙', region: '서울 용산구', coords: { latitude: 37.5392, longitude: 126.9613 } },
  { name: '녹사평역', cleanName: '녹사평', line: '6호선 (경리단길/해방촌)', region: '서울 용산구', coords: { latitude: 37.5345, longitude: 126.9868 } },
  { name: '이태원역', cleanName: '이태원', line: '6호선 (세계음식거리)', region: '서울 용산구', coords: { latitude: 37.5345, longitude: 126.9946 } },
  { name: '한강진역', cleanName: '한강진', line: '6호선 (블루스퀘어/한남동)', region: '서울 용산구', coords: { latitude: 37.5396, longitude: 127.0017 } },
  { name: '버티고개역', cleanName: '버티고개', line: '6호선', region: '서울 중구', coords: { latitude: 37.5482, longitude: 127.0070 } },
  { name: '안암역', cleanName: '안암', line: '6호선 (고려대병원)', region: '서울 성북구', coords: { latitude: 37.5862, longitude: 127.0292 } },
  { name: '고려대역', cleanName: '고려대', line: '6호선', region: '서울 성북구', coords: { latitude: 37.5904, longitude: 127.0360 } },

  // === 서울 7호선 ===
  { name: '장암역', cleanName: '장암', line: '7호선', region: '경기 의정부시', coords: { latitude: 37.7001, longitude: 127.0531 } },
  { name: '태릉입구역', cleanName: '태릉입구', line: '6·7호선', region: '서울 노원구', coords: { latitude: 37.6181, longitude: 127.0751 } },
  { name: '상봉역', cleanName: '상봉', line: '7호선·경의중앙·경춘선·KTX', region: '서울 중랑구', coords: { latitude: 37.5963, longitude: 127.0858 } },
  { name: '군자역', cleanName: '군자', line: '5·7호선', region: '서울 광진구', coords: { latitude: 37.5571, longitude: 127.0795 } },
  { name: '어린이대공원역', cleanName: '어린이대공원', line: '7호선 (세종대)', region: '서울 광진구', coords: { latitude: 37.5480, longitude: 127.0746 } },
  { name: '청담역', cleanName: '청담', line: '7호선', region: '서울 강남구', coords: { latitude: 37.5194, longitude: 127.0536 } },
  { name: '강남구청역', cleanName: '강남구청', line: '7호선·수인분당', region: '서울 강남구', coords: { latitude: 37.5172, longitude: 127.0413 } },
  { name: '학동역', cleanName: '학동', line: '7호선', region: '서울 강남구', coords: { latitude: 37.5143, longitude: 127.0316 } },
  { name: '논현역', cleanName: '논현', line: '7호선·신분당선 (영동시장)', region: '서울 강남구', coords: { latitude: 37.5111, longitude: 127.0215 } },
  { name: '반포역', cleanName: '반포', line: '7호선', region: '서울 서초구', coords: { latitude: 37.5081, longitude: 127.0118 } },
  { name: '내방역', cleanName: '내방', line: '7호선 (서래마을 인근)', region: '서울 서초구', coords: { latitude: 37.4876, longitude: 126.9926 } },
  { name: '남성역', cleanName: '남성', line: '7호선', region: '서울 동작구', coords: { latitude: 37.4846, longitude: 126.9712 } },
  { name: '숭실대입구역', cleanName: '숭실대입구', line: '7호선', region: '서울 동작구', coords: { latitude: 37.4960, longitude: 126.9536 } },
  { name: '상도역', cleanName: '상도', line: '7호선 (중앙대 후문)', region: '서울 동작구', coords: { latitude: 37.5029, longitude: 126.9479 } },
  { name: '장승배기역', cleanName: '장승배기', line: '7호선', region: '서울 동작구', coords: { latitude: 37.5048, longitude: 126.9392 } },
  { name: '보라매역', cleanName: '보라매', line: '7호선·신림선', region: '서울 동작구/영등포구', coords: { latitude: 37.4998, longitude: 126.9202 } },
  { name: '철산역', cleanName: '철산', line: '7호선 (광명시청)', region: '경기 광명시', coords: { latitude: 37.4760, longitude: 126.8680 } },
  { name: '광명사거리역', cleanName: '광명사거리', line: '7호선 (광명전통시장)', region: '경기 광명시', coords: { latitude: 37.4792, longitude: 126.8548 } },
  { name: '부천시청역', cleanName: '부천시청', line: '7호선 (현대백화점 중동)', region: '경기 부천시', coords: { latitude: 37.5046, longitude: 126.7635 } },
  { name: '상동역', cleanName: '상동', line: '7호선', region: '경기 부천시', coords: { latitude: 37.5058, longitude: 126.7532 } },
  { name: '부평구청역', cleanName: '부평구청', line: '7호선·인천1호선', region: '인천 부평구', coords: { latitude: 37.5084, longitude: 126.7218 } },
  { name: '석남역', cleanName: '석남', line: '7호선·인천2호선', region: '인천 서구', coords: { latitude: 37.5061, longitude: 126.6763 } },

  // === 서울 8호선 & 9호선 ===
  { name: '암사역', cleanName: '암사', line: '8호선', region: '서울 강동구', coords: { latitude: 37.5501, longitude: 127.1275 } },
  { name: '문정역', cleanName: '문정', line: '8호선 (법조타운)', region: '서울 송파구', coords: { latitude: 37.4859, longitude: 127.1224 } },
  { name: '장지역', cleanName: '장지', line: '8호선 (가든파이브)', region: '서울 송파구', coords: { latitude: 37.4786, longitude: 127.1262 } },
  { name: '모란역', cleanName: '모란', line: '8호선·수인분당 (모란시장)', region: '경기 성남시 중원구', coords: { latitude: 37.4321, longitude: 127.1290 } },
  { name: '개화역', cleanName: '개화', line: '9호선', region: '서울 강서구', coords: { latitude: 37.5786, longitude: 126.7975 } },
  { name: '가양역', cleanName: '가양', line: '9호선 (급행)', region: '서울 강서구', coords: { latitude: 37.5614, longitude: 126.8544 } },
  { name: '염창역', cleanName: '염창', line: '9호선 (급행)', region: '서울 강서구/양천구', coords: { latitude: 37.5469, longitude: 126.8749 } },
  { name: '선유도역', cleanName: '선유도', line: '9호선 (선유도공원)', region: '서울 영등포구', coords: { latitude: 37.5388, longitude: 126.8933 } },
  { name: '국회의사당역', cleanName: '국회의사당', line: '9호선', region: '서울 영등포구 (여의도)', coords: { latitude: 37.5281, longitude: 126.9178 } },
  { name: '샛강역', cleanName: '샛강', line: '9호선·신림선', region: '서울 영등포구 (여의도)', coords: { latitude: 37.5173, longitude: 126.9284 } },
  { name: '흑석역', cleanName: '흑석', line: '9호선 (중앙대입구)', region: '서울 동작구', coords: { latitude: 37.5088, longitude: 126.9637 } },
  { name: '동작역', cleanName: '동작', line: '4·9호선 (현충원)', region: '서울 동작구', coords: { latitude: 37.5029, longitude: 126.9778 } },
  { name: '구반포역', cleanName: '구반포', line: '9호선', region: '서울 서초구', coords: { latitude: 37.5014, longitude: 126.9873 } },
  { name: '신논현역', cleanName: '신논현', line: '9호선·신분당선 (강남대로)', region: '서울 강남구/서초구', coords: { latitude: 37.5046, longitude: 127.0250 } },
  { name: '언주역', cleanName: '언주', line: '9호선 (차병원사거리)', region: '서울 강남구', coords: { latitude: 37.5073, longitude: 127.0338 } },
  { name: '선정릉역', cleanName: '선정릉', line: '9호선·수인분당 (급행)', region: '서울 강남구', coords: { latitude: 37.5109, longitude: 127.0439 } },
  { name: '봉은사역', cleanName: '봉은사', line: '9호선 (코엑스 북문)', region: '서울 강남구', coords: { latitude: 37.5142, longitude: 127.0602 } },

  // === 신분당선 & 수인분당선 (판교, 분당, 수원) ===
  { name: '양재시민의숲역', cleanName: '양재시민의숲', line: '신분당선 (매헌)', region: '서울 서초구', coords: { latitude: 37.4700, longitude: 127.0384 } },
  { name: '청계산입구역', cleanName: '청계산입구', line: '신분당선', region: '서울 서초구', coords: { latitude: 37.4472, longitude: 127.0543 } },
  { name: '판교역', cleanName: '판교', line: '신분당선·경강선 (현대백화점 판교)', region: '경기 성남시 분당구', coords: { latitude: 37.3948, longitude: 127.1112 } },
  { name: '정자역', cleanName: '정자', line: '신분당선·수인분당 (정자동 카페거리)', region: '경기 성남시 분당구', coords: { latitude: 37.3664, longitude: 127.1082 } },
  { name: '미금역', cleanName: '미금', line: '신분당선·수인분당', region: '경기 성남시 분당구', coords: { latitude: 37.3500, longitude: 127.1089 } },
  { name: '동천역', cleanName: '동천', line: '신분당선', region: '경기 용인시 수지구', coords: { latitude: 37.3379, longitude: 127.1029 } },
  { name: '수지구청역', cleanName: '수지구청', line: '신분당선', region: '경기 용인시 수지구', coords: { latitude: 37.3201, longitude: 127.0959 } },
  { name: '성복역', cleanName: '성복', line: '신분당선 (롯데몰 수지)', region: '경기 용인시 수지구', coords: { latitude: 37.3133, longitude: 127.0801 } },
  { name: '상현역', cleanName: '상현', line: '신분당선', region: '경기 용인시 수지구', coords: { latitude: 37.2976, longitude: 127.0693 } },
  { name: '광교중앙역', cleanName: '광교중앙', line: '신분당선 (아주대/갤러리아)', region: '경기 수원시 영통구', coords: { latitude: 37.2882, longitude: 127.0514 } },
  { name: '광교역', cleanName: '광교', line: '신분당선 (경기대)', region: '경기 수원시 영통구', coords: { latitude: 37.3005, longitude: 127.0468 } },
  { name: '야탑역', cleanName: '야탑', line: '수인분당선 (성남터미널)', region: '경기 성남시 분당구', coords: { latitude: 37.4112, longitude: 127.1287 } },
  { name: '이매역', cleanName: '이매', line: '수인분당선·경강선', region: '경기 성남시 분당구', coords: { latitude: 37.4007, longitude: 127.1267 } },
  { name: '서현역', cleanName: '서현', line: '수인분당선 (AK플라자)', region: '경기 성남시 분당구', coords: { latitude: 37.3851, longitude: 127.1233 } },
  { name: '수내역', cleanName: '수내', line: '수인분당선 (롯데백화점)', region: '경기 성남시 분당구', coords: { latitude: 37.3780, longitude: 127.1143 } },
  { name: '오리역', cleanName: '오리', line: '수인분당선', region: '경기 성남시 분당구', coords: { latitude: 37.3398, longitude: 127.1093 } },
  { name: '죽전역', cleanName: '죽전', line: '수인분당선 (신세계백화점)', region: '경기 용인시 수지구', coords: { latitude: 37.3248, longitude: 127.1074 } },
  { name: '기흥역', cleanName: '기흥', line: '수인분당선·에버라인', region: '경기 용인시 기흥구', coords: { latitude: 37.2755, longitude: 127.1159 } },
  { name: '영통역', cleanName: '영통', line: '수인분당선 (수원)', region: '경기 수원시 영통구', coords: { latitude: 37.2514, longitude: 127.0713 } },
  { name: '망포역', cleanName: '망포', line: '수인분당선', region: '경기 수원시 영통구', coords: { latitude: 37.2458, longitude: 127.0573 } },
  { name: '수원시청역', cleanName: '수원시청', line: '수인분당선 (인계동 나혜석거리)', region: '경기 수원시 팔달구', coords: { latitude: 37.2618, longitude: 127.0305 } },
  { name: '수원역', cleanName: '수원', line: '1호선·수인분당·KTX', region: '경기 수원시 팔달구', coords: { latitude: 37.2660, longitude: 126.9998 } },
  { name: '고색역', cleanName: '고색', line: '수인분당선', region: '경기 수원시 권선구', coords: { latitude: 37.2450, longitude: 126.9774 } },
  { name: '안산역', cleanName: '안산', line: '4호선·수인분당 (다문화거리)', region: '경기 안산시 단원구', coords: { latitude: 37.3270, longitude: 126.7904 } },
  { name: '중앙역', cleanName: '중앙', line: '4호선·수인분당 (안산 로데오)', region: '경기 안산시 단원구', coords: { latitude: 37.3160, longitude: 126.8385 } },
  { name: '오이도역', cleanName: '오이도', line: '4호선·수인분당', region: '경기 시흥시', coords: { latitude: 37.3624, longitude: 126.7388 } },
  { name: '인천논현역', cleanName: '인천논현', line: '수인분당선', region: '인천 남동구', coords: { latitude: 37.4008, longitude: 126.7226 } },
  { name: '송도역', cleanName: '송도', line: '수인분당선', region: '인천 연수구', coords: { latitude: 37.4284, longitude: 126.6579 } },
  { name: '인하대역', cleanName: '인하대', line: '수인분당선 (용현동)', region: '인천 미추홀구', coords: { latitude: 37.4484, longitude: 126.6508 } },

  // === 인천 1·2호선 & 경인선 ===
  { name: '부평역', cleanName: '부평', line: '1호선·인천1호선 (지하상가)', region: '인천 부평구', coords: { latitude: 37.4895, longitude: 126.7241 } },
  { name: '인천시청역', cleanName: '인천시청', line: '인천1·2호선', region: '인천 남동구', coords: { latitude: 37.4578, longitude: 126.7022 } },
  { name: '예술회관역', cleanName: '예술회관', line: '인천1호선 (구월동 로데오)', region: '인천 남동구', coords: { latitude: 37.4496, longitude: 126.7013 } },
  { name: '센트럴파크역', cleanName: '송도센트럴파크', line: '인천1호선 (송도국제도시)', region: '인천 연수구', coords: { latitude: 37.3931, longitude: 126.6347 } },
  { name: '테크노파크역', cleanName: '테크노파크', line: '인천1호선 (현대프리미엄아울렛)', region: '인천 연수구', coords: { latitude: 37.3822, longitude: 126.6565 } },
  { name: '주안역', cleanName: '주안', line: '1호선·인천2호선', region: '인천 미추홀구', coords: { latitude: 37.4647, longitude: 126.6797 } },
  { name: '동인천역', cleanName: '동인천', line: '1호선 (신포국제시장)', region: '인천 중구', coords: { latitude: 37.4753, longitude: 126.6331 } },
  { name: '인천역', cleanName: '인천', line: '1호선·수인분당 (차이나타운/월미도)', region: '인천 중구', coords: { latitude: 37.4764, longitude: 126.6169 } },

  // === 일산, 파주, 의정부, 남양주 (경의중앙, 경춘) ===
  { name: '일산역', cleanName: '일산', line: '경의중앙선·서해선', region: '경기 고양시 일산서구', coords: { latitude: 37.6821, longitude: 126.7700 } },
  { name: '주엽역', cleanName: '주엽', line: '3호선 (일산)', region: '경기 고양시 일산서구', coords: { latitude: 37.6701, longitude: 126.7612 } },
  { name: '정발산역', cleanName: '정발산', line: '3호선 (일산 호수공원/웨스턴돔)', region: '경기 고양시 일산동구', coords: { latitude: 37.6596, longitude: 126.7734 } },
  { name: '백석역', cleanName: '백석', line: '3호선 (고양터미널/벨라시타)', region: '경기 고양시 일산동구', coords: { latitude: 37.6433, longitude: 126.7878 } },
  { name: '행신역', cleanName: '행신', line: '경의중앙선·KTX', region: '경기 고양시 덕양구', coords: { latitude: 37.6121, longitude: 126.8341 } },
  { name: '야당역', cleanName: '야당', line: '경의중앙선 (운정신도시)', region: '경기 파주시', coords: { latitude: 37.7123, longitude: 126.7615 } },
  { name: '문산역', cleanName: '문산', line: '경의중앙선', region: '경기 파주시', coords: { latitude: 37.8546, longitude: 126.7881 } },
  { name: '의정부역', cleanName: '의정부', line: '1호선 (신세계백화점)', region: '경기 의정부시', coords: { latitude: 37.7385, longitude: 127.0459 } },
  { name: '춘천역', cleanName: '춘천', line: '경춘선·ITX (소양강/명동닭갈비)', region: '강원 춘천시', coords: { latitude: 37.8848, longitude: 127.7169 } },
  { name: '남춘천역', cleanName: '남춘천', line: '경춘선·ITX', region: '강원 춘천시', coords: { latitude: 37.8640, longitude: 127.7238 } },

  // === 부산 도시철도 (1~4호선, 동해선) ===
  { name: '서면역', cleanName: '서면', line: '부산 1·2호선 (부산 중심가)', region: '부산 부산진구', coords: { latitude: 35.1580, longitude: 129.0594 } },
  { name: '해운대역', cleanName: '해운대', line: '부산 2호선 (해운대해수욕장/구남로)', region: '부산 해운대구', coords: { latitude: 35.1631, longitude: 129.1585 } },
  { name: '광안역', cleanName: '광안', line: '부산 2호선 (광안리해수욕장)', region: '부산 수영구', coords: { latitude: 35.1578, longitude: 129.1139 } },
  { name: '센텀시티역', cleanName: '센텀시티', line: '부산 2호선 (신세계백화점/벡스코)', region: '부산 해운대구', coords: { latitude: 35.1690, longitude: 129.1317 } },
  { name: '부산역', cleanName: '부산', line: '부산 1호선·KTX·SRT (초량)', region: '부산 동구', coords: { latitude: 35.1152, longitude: 129.0422 } },
  { name: '남포역', cleanName: '남포', line: '부산 1호선 (국제시장/자갈치)', region: '부산 중구', coords: { latitude: 35.0979, longitude: 129.0348 } },
  { name: '자갈치역', cleanName: '자갈치', line: '부산 1호선 (자갈치시장/BIFF거리)', region: '부산 중구/서구', coords: { latitude: 35.0984, longitude: 129.0264 } },
  { name: '연산역', cleanName: '연산', line: '부산 1·3호선', region: '부산 연제구', coords: { latitude: 35.1862, longitude: 129.0820 } },
  { name: '동래역', cleanName: '동래', line: '부산 1·4호선', region: '부산 동래구', coords: { latitude: 35.2057, longitude: 129.0784 } },
  { name: '부산대역', cleanName: '부산대', line: '부산 1호선 (부산대학교)', region: '부산 금정구', coords: { latitude: 35.2298, longitude: 129.0894 } },
  { name: '사상역', cleanName: '사상', line: '부산 2호선·김해경전철 (서부터미널)', region: '부산 사상구', coords: { latitude: 35.1627, longitude: 128.9850 } },
  { name: '하단역', cleanName: '하단', line: '부산 1호선 (동아대)', region: '부산 사하구', coords: { latitude: 35.1062, longitude: 128.9664 } },
  { name: '다대포해수욕장역', cleanName: '다대포', line: '부산 1호선', region: '부산 사하구', coords: { latitude: 35.0478, longitude: 128.9649 } },

  // === 대구 도시철도 (1~3호선) ===
  { name: '반월당역', cleanName: '반월당', line: '대구 1·2호선 (동성로 중심)', region: '대구 중구', coords: { latitude: 35.8655, longitude: 128.5933 } },
  { name: '중앙로역', cleanName: '중앙로', line: '대구 1호선 (대구 동성로)', region: '대구 중구', coords: { latitude: 35.8714, longitude: 128.5940 } },
  { name: '동대구역', cleanName: '동대구', line: '대구 1호선·KTX·SRT (신세계백화점)', region: '대구 동구', coords: { latitude: 35.8780, longitude: 128.6285 } },
  { name: '대구역', cleanName: '대구', line: '대구 1호선 (롯데백화점)', region: '대구 북구', coords: { latitude: 35.8763, longitude: 128.5960 } },
  { name: '범어역', cleanName: '범어', line: '대구 2호선 (수성구 중심)', region: '대구 수성구', coords: { latitude: 35.8596, longitude: 128.6250 } },
  { name: '수성못역', cleanName: '수성못', line: '대구 3호선 (수성못 카페거리)', region: '대구 수성구', coords: { latitude: 35.8276, longitude: 128.6186 } },
  { name: '두류역', cleanName: '두류', line: '대구 2호선 (이월드/광장코아)', region: '대구 달서구', coords: { latitude: 35.8569, longitude: 128.5574 } },
  { name: '영남대역', cleanName: '영남대', line: '대구 2호선', region: '경북 경산시', coords: { latitude: 35.8362, longitude: 128.7528 } },

  // === 대전 도시철도 (1호선) & 충청 ===
  { name: '대전역', cleanName: '대전', line: '대전 1호선·KTX·SRT (성심당)', region: '대전 동구', coords: { latitude: 36.3323, longitude: 127.4342 } },
  { name: '중앙로역', cleanName: '대전중앙로', line: '대전 1호선 (성심당 본점/으능정이)', region: '대전 중구', coords: { latitude: 36.3276, longitude: 127.4273 } },
  { name: '시청역', cleanName: '대전시청', line: '대전 1호선 (둔산동 중심)', region: '대전 서구', coords: { latitude: 36.3508, longitude: 127.3879 } },
  { name: '정부청사역', cleanName: '정부청사', line: '대전 1호선 (둔산)', region: '대전 서구', coords: { latitude: 36.3578, longitude: 127.3814 } },
  { name: '유성온천역', cleanName: '유성온천', line: '대전 1호선 (충남대/봉명동)', region: '대전 유성구', coords: { latitude: 36.3538, longitude: 127.3414 } },
  { name: '서대전네거리역', cleanName: '서대전', line: '대전 1호선 (서대전역 인근)', region: '대전 중구', coords: { latitude: 36.3218, longitude: 127.4086 } },
  { name: '오송역', cleanName: '오송', line: 'KTX·SRT 분기역 (충북 청주)', region: '충북 청주시 흥덕구', coords: { latitude: 36.6200, longitude: 127.3271 } },
  { name: '천안아산역', cleanName: '천안아산', line: '1호선·KTX·SRT', region: '충남 아산시/천안시', coords: { latitude: 36.7946, longitude: 127.1042 } },
  { name: '천안역', cleanName: '천안', line: '1호선 (호두과자거리)', region: '충남 천안시', coords: { latitude: 36.8099, longitude: 127.1466 } },

  // === 광주 도시철도 (1호선) & 전라 ===
  { name: '광주송정역', cleanName: '광주송정', line: '광주 1호선·KTX·SRT (송정떡갈비)', region: '광주 광산구', coords: { latitude: 35.1378, longitude: 126.7915 } },
  { name: '상무역', cleanName: '상무', line: '광주 1호선 (상무지구 중심가)', region: '광주 서구', coords: { latitude: 35.1458, longitude: 126.8524 } },
  { name: '금남로4가역', cleanName: '금남로4가', line: '광주 1호선 (충장로/대인시장)', region: '광주 동구', coords: { latitude: 35.1492, longitude: 126.9142 } },
  { name: '문화전당역', cleanName: '문화전당', line: '광주 1호선 (국립아시아문화전당/동명동)', region: '광주 동구', coords: { latitude: 35.1468, longitude: 126.9208 } },
  { name: '전주역', cleanName: '전주', line: 'KTX·전라선 (전주 한옥마을 인근)', region: '전북 전주시 덕진구', coords: { latitude: 35.8497, longitude: 127.1617 } },
  { name: '익산역', cleanName: '익산', line: 'KTX·호남선 환승역', region: '전북 익산시', coords: { latitude: 35.9406, longitude: 126.9458 } },
  { name: '순천역', cleanName: '순천', line: 'KTX·전라선 (순천만)', region: '전남 순천시', coords: { latitude: 34.9457, longitude: 127.5032 } },
  { name: '여수엑스포역', cleanName: '여수엑스포', line: 'KTX·전라선 (여수 밤바다)', region: '전남 여수시', coords: { latitude: 34.7528, longitude: 127.7459 } },
  { name: '강릉역', cleanName: '강릉', line: 'KTX·동해선 (경포대/안목커피거리)', region: '강원 강릉시', coords: { latitude: 37.7638, longitude: 128.8996 } },
];

/**
 * 역명으로 가장 잘 일치하는 전철역 단건 검색
 */
export function findSubwayStation(query: string): SubwayStation | null {
  const clean = query.trim().replace(/\s+/g, '').toLowerCase();
  if (!clean) return null;

  // 1순위: '역' 포함 또는 제외 정확 일치 (예: '서대문역' -> '서대문역' 또는 '서대문')
  const exact = SUBWAY_STATIONS.find(
    (s) =>
      s.name.toLowerCase() === clean ||
      s.cleanName.toLowerCase() === clean ||
      `${s.cleanName}역`.toLowerCase() === clean
  );
  if (exact) return exact;

  // 2순위: 검색어가 역명에 포함되거나 역명이 검색어에 포함되는 경우
  const matched = SUBWAY_STATIONS.find(
    (s) =>
      s.name.toLowerCase().includes(clean) ||
      clean.includes(s.cleanName.toLowerCase())
  );
  return matched || null;
}

/**
 * 자동완성 추천 목록 (최대 N개)
 */
export function searchSubwayStations(query: string, limit: number = 6): SubwayStation[] {
  const clean = query.trim().replace(/\s+/g, '').toLowerCase();
  if (!clean) return [];

  return SUBWAY_STATIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(clean) ||
      s.cleanName.toLowerCase().includes(clean) ||
      s.region.toLowerCase().includes(clean) ||
      s.line.toLowerCase().includes(clean)
  ).slice(0, limit);
}
