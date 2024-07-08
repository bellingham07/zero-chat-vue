import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    //修改启动的
    server: {
        host: '0.0.0.0', // 这个用于启动
        port: '14100', // 指定启动端口
        open: true //启动后是否自动打开浏览器
    }
})
