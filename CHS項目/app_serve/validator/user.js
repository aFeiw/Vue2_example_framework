//导入定义验证规则的包-joinpm install express-joi-validate --save
const joi = require("@hapi/joi");

//定义用户名和密码表单验证规则
const username = joi.string().min(1).max(10).required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();
const roles = joi.number();
exports.login_register = {
  body: {
    username,
    password,
    roles,
  },
};
