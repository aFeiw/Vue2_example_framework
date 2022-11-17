//配置解析token中间键
const expressJwt = require("express-jwt");
const config = require("../../utils/config");

//登录注册不需要token认证
const tokenConfig = expressJwt({ secret: config.jwtSecretKey }).unless({
  path: ["/api/user/login", "/api/user/register"],
});

module.exports = tokenConfig;
