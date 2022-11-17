import request from "@/assets/js/request";

//查询全部患者待派遣列表
export function getSickNeed() {
  return request({
    url: "/task/need",
    method: "get",
  });
}
//指派
export function assignedDoctor(data) {
  return request({
    url: "/task/assigned",
    method: "post",
    data,
  });
}
//查询全部患者待就诊列表
export function diagnoseNeed() {
  return request({
    url: "/task/diagnose",
    method: "get",
  });
}
//提交就诊结果
export function diagnoseCommit(data) {
  return request({
    url: "/task/result",
    method: "post",
    data,
  });
}
