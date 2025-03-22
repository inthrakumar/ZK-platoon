import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: { target: "esnext" },
    exclude: ['@noir-lang/noirc_abi', '@noir-lang/acvm_js','buffer']
    
  },
  resolve: {
    alias: {
      buffer: resolve(__dirname, 'node_modules', 'buffer'),
    },
  },
  plugins: [react()],
  build: {
    target: "esnext" // <--------- ✅✅✅✅✅✅
  },
})
