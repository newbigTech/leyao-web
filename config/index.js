// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
// const API_SERVER   = 'http://192.168.100.55:8101'
const API_SERVER   = 'http://192.168.1.215:8082'
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 1234,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/login':API_SERVER,
        '/getcode':API_SERVER,
        '/logout':API_SERVER,
        '/pub/**':API_SERVER,
        '/sso':API_SERVER,
        '/shop/**':API_SERVER,
        '/mall/**':API_SERVER,
        '/userMng/**':API_SERVER,
        '/roleMng/**':API_SERVER,
        '/pay/**':API_SERVER,
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
