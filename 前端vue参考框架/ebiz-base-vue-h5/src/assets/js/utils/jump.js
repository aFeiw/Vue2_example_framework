/* eslint-disable no-undef */
export default function jump(options) {
  // eslint-disable
  if (window.WebViewJavascriptBridge && options.flag) {
    if (options.flag == 'h5') {
      EWebBridge.webCallAppInJs('bridge', {
        flag: options.flag,
        extra: options.extra
      })
    } else {
      //extra 参数说明  refresh: '1', //是否返回后刷新0：否，1：是  index: '-2' //回退两级
      if (options.extra) {
        EWebBridge.webCallAppInJs(options.flag, options.extra)
      } else {
        EWebBridge.webCallAppInJs(options.flag)
      }
    }
  } else {
    // 1:replace 2:go 默认为push
    if (options.routerInfo && options.routerInfo.type == '1') {
      this.$router.replace(options.routerInfo)
    } else if (options.routerInfo && options.routerInfo.type == '2') {
      this.$router.go(options.routerInfo.index || -1)
    } else if (options.routerInfo) {
      this.$router.push(options.routerInfo)
    }
  }
}
