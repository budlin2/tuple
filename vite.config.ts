import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';
import * as path from 'path';

export default defineConfig({
  plugins: [
    react(),
    libCss(),
    dts({
      insertTypesEntry: true,
      include: ['./src/lib/**', './src/components/**', './src/utils/**'],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'index',
      fileName: (format) => `tuple.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        format: 'es',
      },
    },
  },
})
