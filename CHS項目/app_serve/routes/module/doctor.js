// 配置待诊医师相关路由模块
const express = require("express");
const router = express.Router();

const doctorHandle = require("../../router_handler/doctorHandle");
//查
router.get("/getinfo", doctorHandle.getDoctorInfo);
//查(id)
router.get("/info/:id", doctorHandle.getDoctorInfoById);
//增
router.post("/insertinfo", doctorHandle.insertDoctorInfo);
//修改
router.post("/updateinfo", doctorHandle.updateDoctorInfoById);
//删(id)
router.get("/deleteinfo/:id", doctorHandle.deleteDoctorInfoById);
module.exports = router;
