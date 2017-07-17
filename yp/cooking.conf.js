var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  dist: './dist',
  template: './index.tpl',

  devServer: {
      enable: true,
      log: true,
      publicPath: '/',
      port: 8080,
      hostname: 'localhost',
      protocol: 'http:',
  },
  resolve: {
      alias: {vue: 'vue/dist/vue.js'}
  },
  // production
  clean: true,
  hash: true,
  sourceMap: true,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src'),
      'static': path.join(__dirname, 'static')
  },
  extends: ['vue2', 'less', 'autoprefixer']
});

module.exports = cooking.resolve();
