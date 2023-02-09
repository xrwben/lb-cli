import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('>>>>', command, mode, env)
  return {
    root: path.resolve(__dirname, ''),
    // base: '/exam-mob/',
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [VantResolver()],
      }),
      // legacy({
      //   targets: ['defaults', 'not IE 11']
      // }),
      createHtmlPlugin() // 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
    ],
    publicDir: 'public', // 静态资源服务，里面的资源可直接访问
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] // 默认
    },
    // clearScreen: false,
    // envDir: 'root',
    // envPrefix: 'LB_', // 默认 VITE_
    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://dev.ntsapps.oa.com/exam/',
          changeOrigin: true
        },
        '/training-portal-common': {
          target: 'http://dev.ntsapps.oa.com',
          changeOrigin: true
        }
      }
    },
    build: {
      target: 'modules',
      outDir: path.resolve(__dirname, './dist'),
      sourcemap: true,
      // minify: false, // esbuild tester 当设置为'terser'时必须先安装terser
      // assetsInlineLimit: 4096, // 默认4096 (4kb)
      chunkSizeWarningLimit: 2000, // 500 chunk大小警告的限制（以 kbs 为单位）
      // rollupOptions: {
      //   output: {
      //     chunkFileNames: 'static/js/[name].[hash].js',
      //     entryFileNames: 'static/js/[name].[hash].js',
      //     assetFileNames: 'static/[ext]/[name].[hash].[ext]'
      //   }
      // }
    }
  }
})
