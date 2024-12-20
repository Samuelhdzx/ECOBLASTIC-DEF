import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 3000,
    host: true,
    strictPort: true
  },
  assetsInclude: ['**/*.svg', '**/*.png'],
  preview: {
    port: Number(process.env.PORT) || 3000,
    host: true,
    strictPort: true
  },
  plugins: [react()],
  resolve: {
    alias: [{find: "@", replacement: path.resolve(__dirname, "src")}]
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true
  }
})
