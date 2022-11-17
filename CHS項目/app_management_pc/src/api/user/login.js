import request from "@/assets/js/request";

// 登录
export function userLogin(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

// 注册
export function userRegister(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}
