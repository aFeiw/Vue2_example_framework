// 定义相关组件
const layout = () => import('@/views/app/layout')
const login = () => import('@/views/app/login')
const notFound = () => import('@/views/app/404')
const home = () => import('@/views/app/Home')

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export default [
  {
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/404',
    component: notFound,
    hidden: true
  },
  {
    path: '/',
    component: layout,
    redirect: '/home',
    name: 'home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: home
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
