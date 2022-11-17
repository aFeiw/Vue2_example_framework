//配置路由守卫
import router from "@/router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false }); // 进度条默认配置

//不需要验证路由的白名单
const whiteList = ["/login", "/register"];

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();

  if (whiteList.indexOf(to.path) !== -1) {
    // 在白名单里的路径，直接跳转
    NProgress.done();
    return next();
  } else {
    //检测token
    const tokenStr = window.sessionStorage.getItem("token");
    // console.log(tokenStr);
    if (!tokenStr) {
      return next("/login");
    } else {
      next();
    }
    NProgress.done();
    next();
  }
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
