import config from '@/config'
import urlMap from '@/config/urlMap'

export default function getUrl(url, api = 1, domainType = 1) {
  //api默认为1，请求接口服务； 0 mock服务  1接口服务
  //domainType 默认为1，取apiDomain；可自定义其他域名
  let domain = ''
  if (domainType == 1) {
    domain = config.apiDomain
  }

  return api === 0 ? urlMap[url] : domain + url
}
