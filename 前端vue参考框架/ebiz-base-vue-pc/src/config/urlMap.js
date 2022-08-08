/**
 * @desc 远程接口地址和本地mock地址映射表
 * key：接口地址
 * value：本地地址
 */
const mockBaseUrl = 'http://rap2api.taobao.org/app/mock'

// const mockBaseUrl = 'http://devops.ebiz-digits.com:8083/app/mock'
export default {
  '/user/login': mockBaseUrl + '/223948/login',
  '/user/info': mockBaseUrl + '/223948/info',
  '/user/logout': mockBaseUrl + '/223948/logout',
  '/table/list': mockBaseUrl + '/223948/table-list',
  '/index/user': mockBaseUrl + '/19/index/user'
}
