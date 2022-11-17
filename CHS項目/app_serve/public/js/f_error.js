const joi = require("@hapi/joi");
//定义表单验证错误级别中间键
exports.errorMsg = (err, req, res, next) => {
  //表单验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.hint(err);
  //token认证失败导致的错误
  if (err.name === "UnauthorizedError") return res.hint("身份认证失败啦", 305);
  // 未知的错误
  res.hint(err);
};
