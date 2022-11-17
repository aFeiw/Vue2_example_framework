//导入定义验证规则的包-joinpm install express-joi-validate --save
const joi = require("@hapi/joi");

const id = joi.number().integer().min(0).required();
exports.id_c = {
  params: {
    id,
  },
};
