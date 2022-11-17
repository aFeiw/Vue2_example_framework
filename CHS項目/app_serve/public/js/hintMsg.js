//信息状态与提示(挂载上游中间键)
const hintHandle = (req, res, next) => {
  res.hint = function (err, status = 301) {
    //status默认301,表述失败的情况
    //err的值可能是一个错误对象，也可能是一个错误描述
    res.send({
      status,
      msg: err instanceof Error ? err.message : err,
    });
  };
  next();
};

module.exports = hintHandle;
