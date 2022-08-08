/**
 * 配置编译环境和线上环境之间的切换
 * 默认三套环境dev、uat、prd，可以增添
 * 参考https://cli.vuejs.org/zh/guide/mode-and-env.html
 *
 */

// 可以多个接口域名，按需添加
let envInfo = process.env
let [apiDomain, assetsUrl, rootUrl] = [envInfo.VUE_APP_APIDOMAIN, envInfo.VUE_APP_ASSETSURL, envInfo.VUE_APP_ROOTURL]
/**
 * 配置文件
 * apiDomain: // 接口域名
 * upLoadDomain: // 存储上传文件域名
 * imgDomain: // 存储图片域名
 *
 */
export default {
  apiDomain, // 主域名
  assetsUrl, //静态资源地址
  rootUrl, //前端页面路径根地址
  uploadDomain: '', // 存储上传文件域名
  imgDomain: '' // 存储图片域名
}
