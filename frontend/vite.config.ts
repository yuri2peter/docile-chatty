/* eslint-disable node/no-unpublished-import */
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'FRONTEND_', // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中
  resolve: {
    alias: {
      'src/': `${path.resolve(__dirname, 'src')}/`, // 别名，指向 src 目录
    },
  },
  define: {
    'process.env': {}, // 一些包需要此全局变量
  },
  server: {
    port: 8000, // 开发服务器端口
    host: true, // 监听所有地址，包括局域网和公网地址
    strictPort: true, // 端口被占用时，抛出错误
  },
  preview: {
    port: 8000, // 预览服务器端口
    host: true, // 监听所有地址，包括局域网和公网地址
    strictPort: true, // 端口被占用时，抛出错误
  },
  envDir: '.',
});
