var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

const precss       = require('precss')
const autoprefixer = require('autoprefixer')({
  browsers: ['last 2 versions', 'Android >= 4.0', 'ie >= 9.0'],
  cascade: false, //是否美化属性值 默认：true 像这样：
                  //-webkit-transform: rotate(45deg);
                  //        transform: rotate(45deg);
  remove:true     //是否去掉不必要的前缀 默认：true
})

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.scss'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'lib': path.resolve(__dirname, '../src/lib'),
            'pages': path.resolve(__dirname, '../src/pages'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'actions':path.resolve(__dirname, '../src/vuex/actions'),
            'api':path.resolve(__dirname, '../src/vuex/api'),
            // 'vue':path.resolve(__dirname, '../node_modules/vue/dist/vue.js')
            'vuex':path.resolve(__dirname, '../node_modules/vuex/dist/vuex.min.js')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }],
        // 设置不需要webpack解析的模块(比如直接加载某些已经压缩的文件.min.js), 加快编译速度
        noParse: [
          /vue.min.js/,
          /vuex.min.js/,
          /vue-router.min.js/,
          /es6-promise\.js$/,
        ]
    },
    vue: {
        loaders: utils.cssLoaders(),
        postcss: [
          require('autoprefixer')({
            browsers: ['ie >= 9', 'Android >= 4.0'],
            cascade: false, //是否美化属性值 默认：true 像这样：
                            //-webkit-transform: rotate(45deg);
                            //        transform: rotate(45deg);
            remove:false     //是否去掉不必要的前缀 默认：true
          }) 
        ]
    },

    postcss: [precss, autoprefixer],

    // http://webpack.github.io/docs/configuration.html#externals
    externals: {
      "jquery": "jQuery",
      "es6-promise": "Promise",
      "vue": "Vue",
      "vuex": "Vuex",
      "vue-router": "VueRouter"
    }
}
