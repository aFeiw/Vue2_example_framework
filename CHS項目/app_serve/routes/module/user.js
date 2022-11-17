// 配置用户相关路由模块
const express = require("express");
const router = express.Router();
//导入表单验证中间键
const validate = require("express-joi-validate");
//用户操作函数
const userHandle = require("../../router_handler/userHandle");
//用户表单验证
const { login_register } = require("../../validator/user");
router.post("/login", validate(login_register), userHandle.login);
router.post("/register", validate(login_register), userHandle.register);
module.exports = router;
