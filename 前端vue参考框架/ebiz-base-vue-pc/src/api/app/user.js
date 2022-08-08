import request from "@/assets/js/utils/request";
import getUrl from "@/assets/js/utils/get-url";

// 登录
export function login(data) {
  return request({
    url: getUrl("/user/login", 0),
    method: "post",
    data,
  });
}

// 获取个人信息
export function getInfo(token) {
  return request({
    url: getUrl("/user/info", 0),
    method: "get",
    params: { token },
  });
}

// 登出
export function logout() {
  return request({
    url: getUrl("/user/logout", 0),
    method: "post",
  });
}
// 测试示例
export function indexUser() {
  return request({
    url: getUrl("/index/user", 0),
    method: "get",
  });
}
