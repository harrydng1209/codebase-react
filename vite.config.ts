import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import autoImports from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/root/variables";
          @import "@/assets/styles/root/mixins";
        `,
      },
    },
  },

  plugins: [
    react(),
    svgr(),

    autoImports({
      dirs: [
        'src/apis/**',
        'src/constants/**',
        'src/hooks/shared/**',
        'src/utils/**',
      ],

      dts: 'src/@types/auto-imports.d.ts',

      eslintrc: {
        enabled: true,
        filepath: './.globalsrc.json',
        globalsPropValue: true,
      },

      imports: ['react', 'react-router', 'react-i18next'],
    }),
  ],

  preview: {
    host: '0.0.0.0',
    port: Number(process.env.VITE_PORT_PREVIEW) || 3030,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    host: '0.0.0.0',
    port: Number(process.env.VITE_PORT) || 3000,
  },
});
