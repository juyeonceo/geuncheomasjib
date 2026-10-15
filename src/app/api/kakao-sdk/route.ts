import { NextResponse } from 'next/server';


export async function GET() {
  const KAKAO_KEY =
    process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || 'e30478df18a03cf2bafd4226d420d4ad';

  const upstreamUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`;

  try {
    const res = await fetch(upstreamUrl, {
      headers: {
        Referer: 'http://localhost:3000/',
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return new NextResponse(`console.error("Kakao SDK upstream error: ${res.status}");`, {
        status: 200,
        headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
      });
    }

    let code = await res.text();

    // 1. 스크립트 태그 자가 탐색 정규식에 /api/kakao-sdk 포함
    code = code.replace(
      '\\/(beta-)?dapi\\.kakao\\.com\\/v2\\/maps\\/sdk\\.js\\b',
      '(\\/api\\/kakao-sdk|\\/(beta-)?dapi\\.kakao\\.com\\/v2\\/maps\\/sdk\\.js)\\b'
    );

    // 2. services 라이브러리 요청을 내부 프록시(/api/kakao-services)로 라우팅
    code = code.replace(
      /services:o\+"(\/\/t1\.kakaocdn\.net\/mapjsapi\/js\/libs\/services\/[^\/]+\/services\.js)"/,
      'services:"/api/kakao-services"'
    );

    return new NextResponse(code, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (err) {
    console.error('Failed to proxy Kakao SDK:', err);
    return new NextResponse(`console.error("Kakao SDK proxy error");`, {
      status: 200,
      headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
    });
  }
}
