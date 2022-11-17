const express = require("express");
const router = express.Router();

//登录用户相关路由
router.use("/user", require("./module/user"));
//待诊用户相关路由
router.use("/sick", require("./module/sick"));
//医生相关路由
router.use("/doctor", require("./module/doctor"));
// 任务相关路由
router.use("/task", require("./module/task"));
module.exports = router;
