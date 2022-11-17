// ------------校验密码-------------
export function validatePass(rule, value, callback) {
  // 密码
  let passwordReg = /^[\S]{6,12}$/;
  if (!value) {
    return callback(new Error("请输入密码"));
  }
  if (!passwordReg.test(value)) {
    callback(new Error("请输入6-12位密码"));
  } else {
    callback();
  }
}
