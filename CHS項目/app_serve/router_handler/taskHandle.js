//导入数据库操作文件
const db = require("../db/mySql");

exports.getNeedDoctor = (req, res) => {
  const sqlStr = `select sick_name,id from sick_users where sick_family_need = 1 and sick_status=1`;
  db.query(sqlStr, (err, result) => {
    if (err) return res.hint("获取失败");
    res.send({
      status: 200,
      msg: "获取待派遣用户信息成功",
      data: result,
    });
  });
};
//批量指派待派遣用户
exports.assignedDoctor = (req, res) => {
  doctorId = req.body.tid;
  for (let id of req.body.id) {
    //const sqlStr = `update sick_users set sick_status=0 where id =?`;
    const sqlStr = `update sick_users t set t.sick_status = 0 ,t.doctor_src =(select doctor_name from doctors where id = ?) where id = ?`;
    db.query(sqlStr, [doctorId, id], (err, result) => {
      if (err) return res.hint("获取失败");
      if (result.affectedRows !== 1) res.hint("指派失败");
    });
  }
  res.send({
    status: 200,
    msg: "指派成功",
  });
};
//获取全部待预诊用户列表
exports.getNeedDiagnose = (req, res) => {
  //不需要家庭医生,状态为待就诊的用户
  const sqlStr = `select * from sick_users where sick_family_need = 0 and sick_status=1`;
  db.query(sqlStr, (err, result) => {
    if (err) return res.hint("获取失败");
    res.send({
      status: 200,
      msg: "获取待诊断用户信息成功",
      data: result,
    });
  });
};
//提交诊断结果
exports.diagnoseResult = (req, res) => {
  // const sqlStr = `update sick_users t set t.sick_status = 0 ,t.doctor_src =(select doctor_name from doctors where id = ?) where id = ?`;
  const sqlStr = `update sick_users set ?, sick_status = 0 where Id=?`;
  db.query(sqlStr, [req.body, req.body.id], (err, result) => {
    // 执行 SQL 语句失败
    if (err) return res.hint(err);
    // SQL 语句执行成功，但是影响行数不等于 1
    if (result.affectedRows !== 1) return res.hint("待诊失败！");
    // 更新文章分类成功
    res.hint("诊断结果提交成功！", 200);
  });
};
