//权限控制
import router from '@/router'
export function permission() {
  router.beforeEach((to, from, next) => {
    //修改title
    const title = to.meta && to.meta.title
    if (title) {
      document.title = title
    }
    //判断是否登录
    let token = localStorage.token
    if (!token) {
      localStorage.token = ''
      //无token，判断是否需要登录
      if (to.meta.auth) {
        if (window.WebViewJavascriptBridge) {
          //eslint-disable-next-line
          EWebBridge.webCallAppInJs('bridge', { flag: 'login' })
        } else {
          next(`/login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    } else {
      if (to.path == '/login') {
        next({ path: '/' })
      } else {
        next()
      }
    }
  })
}
