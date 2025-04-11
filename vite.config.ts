import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@app',
        replacement: path.resolve(__dirname, 'src/app'),
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, 'src/shared'),
      },
      {
        find: '@icon',
        replacement: path.resolve(__dirname, 'src/shared/assets/icon'),
      },
      {
        find: '@img',
        replacement: path.resolve(__dirname, 'src/shared/assets/img'),
      },
      {
        find: '@home',
        replacement: path.resolve(__dirname, 'src/pages/home'),
      },
      {
        find: '@onboarding',
        replacement: path.resolve(__dirname, 'src/pages/onboarding'),
      },
      {
        find: '@mission',
        replacement: path.resolve(__dirname, 'src/pages/mission'),
      },
      {
        find: '@community',
        replacement: path.resolve(__dirname, 'src/pages/community'),
      },
      {
        find: '@my',
        replacement: path.resolve(__dirname, 'src/pages/my'),
      },
    ],
  },
});
