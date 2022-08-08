import Vue from 'vue'
import Router from 'vue-router'
import App from './app/index'
import Example from './example'

Vue.use(Router)

const constantRouterMap = [...App, ...Example] //后续可以删减模块

export default new Router({
  // mode: "history", //路由模式
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 })
})
