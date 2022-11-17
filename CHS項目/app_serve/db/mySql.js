const mysql = require("mysql");

const db = mysql.createPool({
  //ip本机地址
  host: "127.0.0.1",
  // 数据库连接用户名
  user: "root",
  // 数据库密码
  password: "root",
  //数据库名
  database: "app_1",
});

module.exports = db;
