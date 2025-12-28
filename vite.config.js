import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 설정
  // 방법 1: username.github.io 사용 시 (아래 주석 처리)
  // base: '/',
  // 방법 2: username.github.io/myBlog 사용 시
  base: '/myBlog/',
})
