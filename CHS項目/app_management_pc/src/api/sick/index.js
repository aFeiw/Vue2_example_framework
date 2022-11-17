import request from "@/assets/js/request";

//查询全部患者列表
export function getSick(data) {
  return request({
    url: "/sick/getinfo",
    method: "get",
    params: data,
  });
}
//新增用户
export function insertSick(data) {
  return request({
    url: "/sick/insertinfo",
    method: "post",
    data,
  });
}
//通过id删除用户
export function deleteSick(id) {
  return request({
    url: "/sick/deleteinfo/" + id,
    method: "get",
  });
}
//通过id查询用户
export function getSickByid(id) {
  return request({
    url: "/sick/info/" + id,
    method: "get",
  });
}
//修改查询用户
export function updateSick(data) {
  return request({
    url: "sick/updateinfo",
    method: "post",
    data,
  });
}
