import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/dictionary-new/",
  build: {
    outDir: 'build', // Change 'build' to your desired folder name
  },
  plugins: [react()],
})
