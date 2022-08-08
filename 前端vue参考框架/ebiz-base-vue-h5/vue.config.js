const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  lintOnSave: true, //是否开启代码检查
  outputDir: 'dist', //打包输出目录
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375,
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    //设置路径别名
    config.resolve.alias.set('@utils', resolve('./src/assets/js/utils'))
  },
  configureWebpack: {
    // 警告 webpack 的性能提示
    performance: {
      hints: 'error',
      //入口起点的最大体积 700kb
      maxEntrypointSize: 716800,
      //生成文件的最大体积 700kb
      maxAssetSize: 716800,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  }
}
