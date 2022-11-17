import Vue from "vue";
import Router from "vue-router";
import Home from "./home/index";
import SickUser from "@/router/sick_users/index";
import Doctor from "@/router/doctors/index";
Vue.use(Router);

// 防止路由重复点击报错，
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const constantRouterMap = [...Home, ...SickUser, ...Doctor]; // 后续可以删减模块

export default new Router({
  mode: "history", //路由模式
  base: process.env.BASE_URL,
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 }),
});
