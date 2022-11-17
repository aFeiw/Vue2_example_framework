import request from "@/assets/js/request";

//查询全部医生列表
export function getDoctorAll(data) {
  return request({
    url: "/doctor/getinfo",
    method: "get",
    params: data,
  });
}
//新增医生
export function insertDoctor(data) {
  return request({
    url: "/doctor/insertinfo",
    method: "post",
    data,
  });
}
//通过id删除医生
export function deleteDoctor(id) {
  return request({
    url: "/doctor/deleteinfo/" + id,
    method: "get",
  });
}
//通过id查询医生
export function getDoctorByid(id) {
  return request({
    url: "/doctor/info/" + id,
    method: "get",
  });
}
//修改查询医生
export function updateDoctor(data) {
  return request({
    url: "doctor/updateinfo",
    method: "post",
    data,
  });
}
