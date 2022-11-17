// // 导入数据库操作文件
const db = require("../db/mySql");
//导入加密bcrypt包
const bcrypt = require("bcryptjs");
//导入jwt，生成token令牌
const jwt = require("jsonwebtoken");
//配置token
const config = require("../utils/config");
//登录模块处理程序
exports.login = (req, res) => {
  const userInfor = req.body;
  //1.判断数据库是否存在该用户
  const sqlStr = `select * from user where username=?`;
  db.query(sqlStr, userInfor.username, (err, result) => {
    if (err) return res.hint(err);
    if (result.length !== 1) return res.hint("请检查用户名是否正确");
    // 2.对输入密码与数据库进行对比判断
    const compareResult = bcrypt.compareSync(
      userInfor.password,
      result[0].password
    );
    if (!compareResult) return res.hint("请检查密码是否正确");
    //3.生成token,成功返回
    const user = { ...result[0], password: "" };
    const token = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    res.send({
      status: 200,
      msg: "登录成功",
      roles: result[0].roles,
      token: "Bearer " + token,
    });
  });
};

exports.register = (req, res) => {
  //获取用户提交到的服务器用户信息
  const userInfor = req.body;
  //定义sql语句查询用户名是否被占用
  const sqlStr = `select * from user where username=?`;
  db.query(sqlStr, userInfor.username, (err, result) => {
    //执行sql语句失败
    if (err) {
      return res.hint(err);
    }
    //判断用户名是否被占用
    if (result.length > 0) {
      return res.hint("此用户已被占用,请更换其他用户名");
    }
    //用户名加密bcrypt.hashSync()
    userInfor.password = bcrypt.hashSync(userInfor.password, 12);
    //插入新用户
    const sqlStrInsert = `insert into user set ?`;
    db.query(
      sqlStrInsert,
      {
        username: userInfor.username,
        password: userInfor.password,
        roles: userInfor.roles,
      },
      (err, result) => {
        //执行sql语句失败
        if (err) {
          return res.hint(err);
        }
        //插入新用户失败
        if (result.affectedRows !== 1) {
          return res.hint("注册用户失败，请稍后再试");
        }
        res.hint("注册成功", 200);
      }
    );
  });
};
