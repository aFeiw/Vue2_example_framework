// 配置任务模块相关路由模块
const express = require("express");
const router = express.Router();
//任务操作函数
const taskHandle = require("../../router_handler/taskHandle");
//查迅全部需要派遣医生的患者
router.get("/need", taskHandle.getNeedDoctor);
// 、id-updata、
router.post("/assigned", taskHandle.assignedDoctor);
//查询全部需要诊断的患者
router.get("/diagnose", taskHandle.getNeedDiagnose);
//提交诊断结果
router.post("/result", taskHandle.diagnoseResult);
module.exports = router;
