const db = require("../db/mySql");

//查询全部待诊医生信息
exports.getDoctorInfo = (req, res) => {
  var params = req.query || req.params;
  let sql = "SELECT *  FROM  doctors"; //查询列表所有的数据
  let content = [];
  let isMore = false; //是否有多个查询参数
  //排除is_delete=1
  if (params.doctor_worker_number) {
    sql += " WHERE doctor_worker_number LIKE ? ";
    content.push("%" + params.doctor_worker_number + "%");
    isMore = true;
  }
  if (params.doctor_deparment) {
    if (isMore) {
      sql += "and doctor_deparment like ?  ";
    } else {
      sql += " WHERE doctor_deparment LIKE ? ";
      isMore = true;
    }
    content.push("%" + params.doctor_deparment + "%");
  }
  if (params.doctor_name) {
    if (isMore) {
      //true代表有多个参数
      sql += "and doctor_name like ?  ";
    } else {
      sql += " WHERE doctor_name LIKE ?  ";
      isMore = true;
    }
    content.push("%" + params.doctor_name + "%");
  }
  if (isMore) {
    sql += " and is_delete = 0";
  } else {
    sql += " where is_delete = 0";
  }
  //查询全部总数
  let sqlTotal = "select count(*) as total from doctors WHERE is_delete = 0";
  db.query(sqlTotal, (err, among) => {
    if (err) return res.hint(err);
    let total = among[0]["total"]; //查询表中的数量
    //返回数据结果
    db.query(sql, content, function (err, result) {
      if (err) return res.hint(err);
      //当存在参数查询时,total重新赋值
      if (isMore) total = result.length;
      res.send({
        status: 200,
        msg: "查询成功",
        data: result,
        total: total,
      });
    });
  });
};
//根据id获取医生信息
exports.getDoctorInfoById = (req, res) => {
  const sqlStr = `select * from doctors where id =?`;
  const params = req.params.id || req.query.id;
  db.query(sqlStr, params, (err, result) => {
    if (err) return res.hint("获取失败");
    if (result.length !== 1) res.hint("获取医生信息失败");
    res.send({
      status: 200,
      msg: "获取医生信息成功",
      data: result[0],
    });
  });
};
//新增医生用户信息
exports.insertDoctorInfo = (req, res) => {
  const sql = `insert into doctors set ?`;
  db.query(sql, req.body, (err, result) => {
    if (err) return res.hint(err);
    if (result.affectedRows !== 1) return res.hint("新增待诊医生信息失败");
    res.hint("新增待诊医生信息成功", 200);
  });
};

//修改待诊用户信息
exports.updateDoctorInfoById = (req, res) => {
  const sqlStr = `update doctors set ? where Id=?`;
  db.query(sqlStr, [req.body, req.body.id], (err, result) => {
    // 执行 SQL 语句失败
    if (err) return res.hint(err);
    // SQL 语句执行成功，但是影响行数不等于 1
    if (result.affectedRows !== 1) return res.hint("医生信息修改失败！");
    // 更新文章分类成功
    res.hint("医生信息修改成功！", 200);
  });
};

//根据id删除待诊用户信息
exports.deleteDoctorInfoById = (req, res) => {
  const sqlStr = `update doctors set is_delete=1 where id =?`;

  db.query(sqlStr, req.params.id, (err, result) => {
    if (err) return res.hint("删除失败");
    if (result.affectedRows !== 1) return res.hint("删除待诊医生信息失败");
    res.hint("移除该医生成功", 200);
  });
};
