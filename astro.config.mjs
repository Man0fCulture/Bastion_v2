import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/variables" as *;`
        }
      }
    }
  },
  security: {
    checkOrigin: true
  }
});
