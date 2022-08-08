import axios from 'axios'
import { Dialog, Toast } from 'vant'

// 创建axios实例
const service = axios.create({
  timeout: 66666666 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['token'] = window.localStorage.getItem('token')
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code != 0) {
      if (res.code == 40001) {
        Dialog.confirm({
          confirmButtonText: '重新登录',
          message: '你已被登出，可以取消继续留在该页面，或者重新登录'
        }).then(() => {
          //eslint-disable-next-line
          EWebBridge.webCallAppInJs('bridge', { flag: 'login' })
        })
      } else {
        Toast.fail(res.msg)
      }
      return Promise.reject(res)
    } else {
      return response.data.content
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)

export default service
