import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './', // Relative paths for Yandex.Games
  build: {
    assetsDir: 'assets',
  }
})
