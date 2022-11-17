//导入数据库操作文件
const db = require("../db/mySql");

//查询全部待诊用户信息
exports.getSickInfo = (req, res) => {
  var total2 = 0;
  //模糊查询的sql  SELECT * FROM  bloginformation WHERE blogTitle LIKE ? OR blogContent LIKE ? OR blogLable LIKE ?
  var params = req.query || req.params;
  let sql = "SELECT *  FROM  sick_users"; //查询列表所有的数据
  let content = [];
  let isMore = false; //是否有多个查询参数
  //排除is_delete=1
  // sql += " WHERE is_delete = 0 ";
  if (params.sick_id_card) {
    // 模糊查询两种方法直接在SQL语句后加 mysql.escape("%"+req.body.name+"%")
    // sql += " WHERE product_name LIKE "+mysql.escape("%"+req.body.name+"%")
    sql += " WHERE sick_id_card LIKE ? ";
    content.push("%" + params.sick_id_card + "%");
    isMore = true;
  }
  if (params.sick_status) {
    if (isMore) {
      //true代表有多个参数
      sql += "and sick_status like ?  "; //and是两个条件都必须满足，or是或的关系
    } else {
      sql += " WHERE sick_status LIKE ? ";
      isMore = true;
    }
    content.push("%" + params.sick_status + "%");
  }
  if (params.sick_name) {
    if (isMore) {
      //true代表有多个参数
      sql += "and sick_name like ?  "; //and是两个条件都必须满足，or是或的关系
    } else {
      sql += " WHERE sick_name LIKE ?  ";
      isMore = true;
    }
    content.push("%" + params.sick_name + "%");
  }
  if (params.pagenum || params.pagesize) {
    if (isMore) {
      sql += " and is_delete = 0";
    } else {
      sql += " where is_delete = 0";
    }
    //
    sql += "";
    db.query(sql, content, (err, result) => {
      if (err) return res.hint(err);
      total2 = result.length; //查询表中的数量
    });
    //开启分页
    let pagenum = params.pagenum; //当前页码
    let pagesize = params.pagesize; //一页展示多少条数据
    sql += " limit ?,? ";
    content.push((pagenum - 1) * pagesize, parseInt(pagesize));
  }
  //查询全部总数
  let sqlTotal = "select count(*) as total from sick_users WHERE is_delete = 0";
  db.query(sqlTotal, (err, among) => {
    if (err) return res.hint(err);
    let total = among[0]["total"]; //查询表中的数量
    //返回数据结果
    db.query(sql, content, function (err, result) {
      if (err) return res.hint(err);
      //当存在参数查询时,total重新赋值
      if (isMore) total = total2;
      res.send({
        status: 200,
        msg: "查询成功",
        data: result,
        total: total,
      });
    });
  });
};

//根据id获取待诊用户信息
exports.getSickInfoById = (req, res) => {
  const sqlStr = `select * from sick_users where id =?`;
  const params = req.params.id || req.query.id;
  db.query(sqlStr, params, (err, result) => {
    if (err) return res.hint("获取失败");
    if (result.length !== 1) res.hint("获取待诊用户信息失败");
    res.send({
      status: 200,
      msg: "获取用户信息成功",
      data: result[0],
    });
  });
};
//新增待诊用户信息
exports.insertSickInfo = (req, res) => {
  const sql = `insert into sick_users set ?`;
  db.query(sql, req.body, (err, result) => {
    if (err) return res.hint(err);
    if (result.affectedRows !== 1) return res.hint("新增待诊用户信息失败");
    res.hint("新增待诊用户信息成功", 200);
  });
};

//修改待诊用户信息
exports.updateSickInfoById = (req, res) => {
  const sqlStr = `update sick_users set ? where Id=?`;
  db.query(sqlStr, [req.body, req.body.id], (err, result) => {
    // 执行 SQL 语句失败
    if (err) return res.hint(err);
    // SQL 语句执行成功，但是影响行数不等于 1
    if (result.affectedRows !== 1) return res.hint("待诊用户信息修改失败！");
    // 更新文章分类成功
    res.hint("用户信息修改成功！", 200);
  });
};

//根据id删除待诊用户信息
exports.deleteSickInfoById = (req, res) => {
  const sqlStr = `update sick_users set is_delete=1 where id =?`;

  db.query(sqlStr, req.params.id, (err, result) => {
    if (err) return res.hint("删除失败");
    if (result.affectedRows !== 1) return res.hint("删除待诊用户信息失败");
    res.hint("删除用户成功", 200);
  });
};
