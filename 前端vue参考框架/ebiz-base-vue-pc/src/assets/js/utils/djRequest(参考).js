import axios from 'axios'
import $router from '../router/index'
import layer from '@/utils/layer'
import { Toast } from 'vant'
import * as util from '@/utils/utils'
import store from '../store'
import { isInEwechat } from '@/utils/qywx'
Toast.allowMultiple() // 允许多个Toast实例

// 创建 axios 实例
const service = axios.create({
  baseURL: '/', // api 的 base_url
  timeout: 60000, // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // 新建议书后端url
    let newpropsalUrlList = 'product/queryProductDetailList.json'
    if (config.url.indexOf(newpropsalUrlList) > -1) {
      config.headers['token'] = store.getters.userInfo.utoken
        ? store.getters.userInfo.utoken
        : localStorage.getItem('utoken')
        ? localStorage.getItem('utoken')
        : '' // 没有取本地调试token
      config.headers['source'] = '2'
    } else {
      // 如果用戶信息存在
      config.headers['utoken'] = store.getters.userInfo.utoken
        ? store.getters.userInfo.utoken
        : localStorage.getItem('utoken')
        ? localStorage.getItem('utoken')
        : '' // 没有取本地调试token
    }
    // 缓存sourceCode&&menuCode
    if (
      $router.history.current.query.sourceCode &&
      $router.history.current.query.menuCode
    ) {
      localStorage.setItem(
        'sourceCode',
        $router.history.current.query.sourceCode
      )
      localStorage.setItem('menuCode', $router.history.current.query.menuCode)
    } else if ($router.history.current.query.sourceCode) {
      localStorage.setItem(
        'sourceCode',
        $router.history.current.query.sourceCode
      )
    } else if ($router.history.current.query.menuCode) {
      localStorage.setItem('menuCode', $router.history.current.query.menuCode)
    }
    const sourceFlag = $router.history.current.query.sourceCode || ''
    if (sourceFlag) {
      if (sourceFlag == 'cdetail' || sourceFlag == 'cclient') {
        const openId = $router.history.current.query.wechatOpen || null
        const unionid = $router.history.current.query.wechatUnion || null
        if (openId) {
          localStorage.setItem('openId', openId.split(',')[0])
        }
        if (unionid) {
          localStorage.setItem('unionid', unionid.split(',')[0])
        }
      } else if (sourceFlag == 'wechat' && !isInEwechat()) {
        console.log('是否为企业微信:', isInEwechat())
        let shareUri = window.location.href
        if ($router.history.current.query.openId) {
          sessionStorage.setItem('firstOauthSessionFlag', '1')
        }
        const firstOauthSessionFlag = sessionStorage.getItem(
          'firstOauthSessionFlag'
        ) //每次启动第一次都要删除本地openId进行授权
        if (firstOauthSessionFlag != '1') {
          localStorage.removeItem('openId')
        }
        const openId =
          $router.history.current.query.openId ||
          localStorage.getItem('openId') ||
          ''
        if (!openId) {
          if (
            !shareUri.includes('wechat/index') &&
            !shareUri.includes('insured/productDetail')
          ) {
            window.location.href =
              window.location.origin +
              '/security-service/api/wechat/oauth2/authorize?returnUrl=' +
              encodeURIComponent(shareUri)
          }
        } else {
          localStorage.setItem('openId', '')
          localStorage.setItem('openId', openId.split(',')[0])
        }
      }
    } else {
      if ($router.history.current.query.wechatOpen) {
        console.log('访问来源:微信小程序', 'openId:', openId)
        const openId = $router.history.current.query.wechatOpen
        localStorage.setItem('openId', openId.split(',')[0])
        // TODO 增加微信小程序跳转我的订单 不展示人核函件按钮判断
        sessionStorage.setItem('wechatOpen', openId.split(',')[0])
      }
      if ($router.history.current.query.wechatUnion) {
        console.log('访问来源:微信小程序', 'unionid:', unionid)
        const unionid = $router.history.current.query.wechatUnion
        localStorage.setItem('unionid', unionid.split(',')[0])
      }
    }

    config.headers['openId'] = localStorage.getItem('openId') || ''
    config.headers['unionid'] = localStorage.getItem('unionid') || ''
    let agentCodeArr = []
    if (localStorage.getItem('newplfWhite')) {
      let newplfWhite = JSON.parse(localStorage.getItem('newplfWhite'))
      if (newplfWhite[0] && newplfWhite[0].name) {
        agentCodeArr = JSON.parse(
          localStorage.getItem('newplfWhite')
        )[0].name.split(',')
      }
    }
    let userCode = localStorage.getItem('isWhiteAgentCode') || ''
    if (agentCodeArr.indexOf(userCode) > -1) {
      config.headers['grayRange'] = 'newplf'
    }

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response) => {
    let res = response.data
    if (!res.code) {
      return res
    }
    if (
      res.code === 0 ||
      res.code === '0' ||
      res.code === '000' ||
      res.code === '1' ||
      parseInt(res.current) == 0 ||
      res.code == '105' ||
      res.code === 210220
    ) {
      // console.log(res, '9999')
      // 处理无意义数据，null undefined 为 空串
      if (response.config.url.includes('apply/agentBaseInfo/select')) {
        localStorage.setItem('isWhiteAgentCode', res.data.agentCode)
      }
      res = util.toEmptyStr(res)
      return res
    } else if (parseInt(res.code) === 402) {
      // 登录超时
      layer.toast(res.msg)
      setTimeout(function () {
        $router.push('/')
      }, 3000)
    } else {
      if (
        !response.config.url.includes('updateDraft') &&
        !response.config.url.includes('addDraft')
      ) {
        if (
          response.config.url.includes('moreProductfaceRecognition') ||
          response.config.url.includes('faceRecRecognition') ||
          (response.config.url.includes('info/sendRealNameAuth') &&
            res.message &&
            res.message == 'fail')
        ) {
          return res
        } else {
          layer.toast(res.msg || res.message || '网络异常，请稍后重试！')
        }
      }
      if (
        response.config.url.includes('activityCheckIn') ||
        response.config.url.includes('addCustomerManagement') ||
        response.config.url.includes('sendSmsCode')
      ) {
        return res
      }
      // 企业微信登录无权限访问返回
      if (parseInt(res.code) === 100 && !store.getters.userInfo.utoken) {
        $router.replace('/')
      }
      return Promise.reject(res) // 请求code返回-1当错误处理
    }
  },
  (err) => {
    // 接口错误提示
    if (err.response && err.response.status) {
      let msg = '出错了'
      switch (err.response.status) {
        case 400:
          msg = '请求错误'
          break
        case 401:
          msg = '未授权，请登录'
          break
        case 403:
          msg = '拒绝访问'
          break
        case 404:
          msg = `请求地址出错: ${err.response.config.url}`
          break
        case 408:
          msg = '请求超时'
          break
        case 500:
          msg = '服务器错误'
          break
        case 501:
          msg = '服务未实现'
          break
        case 502:
          msg = '网关错误'
          break
        case 503:
          msg = '服务不可用'
          break
        case 504:
          msg = '网关超时'
          break
        case 505:
          msg = 'HTTP版本不受支持'
          break
        default:
      }
      layer.toast(msg)
    }
    return Promise.reject(err)
  }
)

export default function (
  option,
  //hwq: 是否开启 api 请求 loading，默认不开启
  {
    loading = false,
    message = '加载中',
    forbidClick = true,
    loadingType = 'spinner',
  } = {}
) {
  if (loading)
    var loadingInstance = Toast.loading({
      duration: 0,
      forbidClick,
      loadingType,
      message,
    })
  return new Promise((resolve, reject) => {
    service(option)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        if (loading) loadingInstance.clear()
      })
  })
}
