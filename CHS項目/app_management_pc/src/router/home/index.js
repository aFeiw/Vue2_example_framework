// 定义相关组件
const mainBasic = () => import("@/views/home/layout/HomeBasic.vue");
const login = () => import("@/views/home/login/Login.vue");
const register = () => import("@/views/home/registered/Register.vue");
const noFound = () => import("@/views/no_found/404.vue");

export default [
  //渲染父组件
  {
    path: "/",
    name: "homeBasic",
    component: mainBasic,
    redirect: "/login",
    //登录
    children: [
      {
        path: "login",
        name: "login",
        component: login,
      },
      //注册
      {
        path: "register",
        name: "register",
        component: register,
      },
    ],
  },
  //输入路由不在路由表中：
  {
    path: "*",
    component: noFound,
  },
];
