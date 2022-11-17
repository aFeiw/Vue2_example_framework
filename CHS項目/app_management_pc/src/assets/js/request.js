import axios from "axios";
import { Message } from "element-ui";
const request = axios.create({
  // 后台api基准路径
  baseURL: "http://127.0.0.1:5020/api",
  timeout: 5000,
});

// 请求拦截器;
request.interceptors.request.use(function (config) {
  let token = window.sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  // 处理完之后一定将config返回
  return config;
});

// 响应拦截器;
request.interceptors.response.use(function (res) {
  // 浏览器的status=200 才进入程序
  if (res.status === 200) {
    const code = res.data.status;
    // 当code为500时，弹出系统异常
    if (code === 500) {
      return Message.error("系统异常");
    } else if (code === 305) {
      return Message.error("无权限访问");
    } else {
      return res;
    }
  } else {
    return Promise.reject("error");
  }
});
export default request;
