import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    // React Compiler is applied via @vitejs/plugin-react's babel option
    // Do NOT also use @rolldown/plugin-babel — it double-applies the compiler
    react({
      babel: {
        presets: [reactCompilerPreset()],
      },
    }),
  ],

  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-dom'))       return 'vendor-react';
          if (id.includes('react'))           return 'vendor-react';
          if (id.includes('react-router'))    return 'vendor-router';
          if (id.includes('zustand'))         return 'vendor-zustand';
          return 'vendor';
        },
      },
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
    },
  },
})
