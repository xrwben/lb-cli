import terser from '@rollup/plugin-terser';
import clear from 'rollup-plugin-clear';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.mjs',
		format: 'es'
  },
  plugins: [
    clear({
			targets: ['dist']} //清除dist目录
		),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true
      },
    })
  ],
  watch: {
    exclude: 'node_modules/**',
    // clearScreen: false
  }
}