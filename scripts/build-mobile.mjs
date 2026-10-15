import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const apiDir = path.join(rootDir, 'src', 'app', 'api');
const v2Dir = path.join(rootDir, 'src', 'app', 'v2');

const backupApiDir = path.join(rootDir, '.temp_server_routes', 'api');
const backupV2Dir = path.join(rootDir, '.temp_server_routes', 'v2');

function prepare() {
  const nextCacheDir = path.join(rootDir, '.next');
  if (fs.existsSync(nextCacheDir)) {
    fs.rmSync(nextCacheDir, { recursive: true, force: true });
  }
  fs.mkdirSync(path.join(rootDir, '.temp_server_routes'), { recursive: true });
  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, backupApiDir);
  }
  if (fs.existsSync(v2Dir)) {
    fs.renameSync(v2Dir, backupV2Dir);
  }
}

function restore() {
  try {
    if (fs.existsSync(backupApiDir) && !fs.existsSync(apiDir)) {
      fs.renameSync(backupApiDir, apiDir);
    }
    if (fs.existsSync(backupV2Dir) && !fs.existsSync(v2Dir)) {
      fs.renameSync(backupV2Dir, v2Dir);
    }
    if (fs.existsSync(path.join(rootDir, '.temp_server_routes'))) {
      fs.rmSync(path.join(rootDir, '.temp_server_routes'), { recursive: true, force: true });
    }
  } catch (e) {
    console.error('Failed to restore server routes:', e);
  }
}

try {
  console.log('📱 [Mobile Build] 모바일 SPA 정적 빌드를 준비합니다...');
  prepare();

  execSync('npx next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_PUBLIC_IS_MOBILE_APP: 'true',
      NEXT_PUBLIC_API_BASE_URL: 'https://geuncheomasjib.vercel.app',
    },
  });
  console.log('✅ [Mobile Build] out/ 디렉터리에 모바일 정적 번들이 생성되었습니다.');
} catch (error) {
  console.error('❌ [Mobile Build] 빌드 실패:', error.message);
  process.exitCode = 1;
} finally {
  restore();
  console.log('🔄 [Mobile Build] 서버 라우트가 정상 복원되었습니다.');
}
