/**
 * @desc 远程接口地址和本地mock地址映射表
 * key：接口地址
 * value：本地地址
 */
const mockBaseUrl = 'http://rap2api.taobao.org/app/mock'
export default {
  '/user/login': mockBaseUrl + '/223948/login',
  '/user/info': mockBaseUrl + '/223948/info',
  '/user/logout': mockBaseUrl + '/223948/logout'
}
