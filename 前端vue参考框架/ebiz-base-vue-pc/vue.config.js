'use strict'
const path = require('path')
const defaultSettings = require('./src/assets/js/utils/settings.js')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = defaultSettings.title || 'basic-pc' // 页面标题
//如果您的端口设置为80，
//使用管理员权限执行命令行。
//例如，Mac：sudo npm run
//您可以通过以下方法更改端口：
// port = 9527 npm run dev或npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9530 //开发端口
//所有配置项说明都可以在https://cli.vuejs.org/config/ 中找到
module.exports = {
  /*如果您打算在子路径下部署站点，则需要设置publicPath，
   例如GitHub Pages。如果您打算将网站部署到https://foo.github.io/bar/，
   然后publicPath应该设置为“ / bar /”。
   在大多数情况下，请使用'/'！
   详细信息：https://cli.vuejs.org/config/#publicpath
  */
  publicPath: process.env.NODE_ENV === 'production' ? '/base-pc/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    //在webpack的名称字段中提供应用程序的标题，以便
    //可以在index.html中对其进行访问以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: 需要测试
    config.plugins.delete('prefetch') // TODO: 需要测试

    //设置svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    //设置preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))
    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            //`runtime`必须与runtimeChunk名称相同。默认是“运行时”
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' //仅打包最初依赖的第三方
          },
          elementUI: {
            name: 'chunk-elementUI', //将elementUI拆分为一个包
            priority: 20, //权重必须大于libs和app，否则将打包到libs或app中
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ //为了适应cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), //可以自定义规则
            minChunks: 3, //最小公用数
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
