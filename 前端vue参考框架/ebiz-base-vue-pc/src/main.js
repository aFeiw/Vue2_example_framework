import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n

import App from "./App";
import store from "./store";
import router from "./router";
import Filters from "./filters";

// 注册过滤器

Object.keys(Filters).forEach((k) => Vue.filter(k, Filters[k]));

import "@/icons"; // icon
import "@/assets/js/utils/permission"; // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
