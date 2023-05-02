import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://47.120.37.7:3000',
                // target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/uploads/': {
                // target: 'http://127.0.0.1:3000',
                target: 'http://47.120.37.7:3000',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/image/, ''),
            },
        },
    },
    build: {
        outDir: 'fzpadmin_dist',
        emptyOutDir: true,
    },
})
