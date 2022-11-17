import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
//引入elementui
import ElementUI from "element-ui";
//全局注册element-css
import "element-ui/lib/theme-chalk/index.css";
//全局注册
Vue.use(ElementUI);
//引入全局css
import "@/assets/css/common.less";
// //引入路由导航守卫以及权限控制
import "@/assets/js/permission";
// 阻止显示生产模式的消息
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
