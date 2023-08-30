import { defineConfig } from 'vite'
import path from 'path'; // 正确导入 path
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  alias: {
    '@': path.resolve(__dirname, 'node_modules'),
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
  ],
})
