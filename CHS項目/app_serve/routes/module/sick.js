// 配置待诊用户相关路由模块
const express = require("express");
const router = express.Router();
//导入表单验证中间键
const validate = require("express-joi-validate");
//导入待诊用户处理函数
const sickUserHandle = require("../../router_handler/sickUserHandle");
//表单验证
const { id_c } = require("../../validator/id");
//查(all)
router.get("/getinfo", sickUserHandle.getSickInfo);
//查(id)
router.get("/info/:id", validate(id_c), sickUserHandle.getSickInfoById);
//增
router.post("/insertinfo", sickUserHandle.insertSickInfo);
//修改
router.post("/updateinfo", sickUserHandle.updateSickInfoById);
//删(id)
router.get("/deleteinfo/:id", sickUserHandle.deleteSickInfoById);
module.exports = router;
