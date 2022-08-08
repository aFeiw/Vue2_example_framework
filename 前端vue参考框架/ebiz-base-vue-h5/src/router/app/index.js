//定义相关组件
const home = () => import('@/views/app/Home')
const login = () => import('@/views/app/Login')
const notFound = () => import('@/views/app/404')
const functionList = () => import('@/views/app/FunctionList')

export default [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: '首页',
      index: 0
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/functionList',
    name: 'functionList',
    component: functionList,
    meta: {
      title: '基础功能清单',
      index: 1
    }
  },
  {
    path: '/404',
    component: notFound,
    meta: {
      title: '404'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]
