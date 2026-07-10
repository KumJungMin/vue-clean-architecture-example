import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/domain': resolve(__dirname, 'src/features/domain'),
      '@/data': resolve(__dirname, 'src/features/data'),
      '@/presentation': resolve(__dirname, 'src/features/presentation'),
      '@/shared': resolve(__dirname, 'src/shared')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
