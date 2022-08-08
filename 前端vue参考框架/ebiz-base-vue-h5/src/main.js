import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import Filters from '@/filters'
import FastClick from 'fastclick'
import '@utils/validator' //表单校验
import '@utils/compatible' //兼容性代码
import Config from '@/config'
import Jump from '@utils/jump'
import NoMoreClick from '@/directive/no-more-click'

//全局注册vant常用组件
import { Toast, Button, Dialog } from 'vant'
Vue.use(Toast)
Vue.use(Button)
Vue.use(Dialog)

//router or bridge jump
Vue.prototype.$jump = Jump
//静态资源地址
Vue.prototype.$assetsUrl = Config.assetsUrl
// 全局 防重复点击
Vue.directive('no-more-click', NoMoreClick)

//混合开发调试工具
let envFlag = process.env.VUE_APP_FLAG
if (envFlag != 'prd') {
  // eslint-disable-next-line no-undef
  eruda.init()
  //打印当前环境相关信息
  // eslint-disable-next-line no-console
  console.table({
    当前环境: envFlag,
    api请求地址: Config.apiDomain,
    静态资源地址: Config.assetsUrl,
    url根地址: Config.rootUrl,
  })
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
  // eslint-disable-next-line no-undef
  // eruda.init() //TODO 生产环境验证，打开调试工具
}

// 注册过滤器
Object.keys(Filters).forEach(function (k) {
  Vue.filter(k, Filters[k])
})

//权限 控制
import { permission } from '@/assets/js/utils/permission'
permission()

//ios点击300毫秒时延
FastClick.attach(document.body)

Vue.config.productionTip = false
new Vue({
  router: Router,
  store: Store,
  render: (h) => h(App),
}).$mount('#app')
