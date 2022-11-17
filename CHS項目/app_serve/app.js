const express = require("express");
const cors = require("cors");
// 日志打印中间件
// const morgan = require("morgan");
const app = new express();
app.use(cors());
// app.use(morgan("dev"));
//配置解析application的格式数据内置中间键
app.use(express.json());
//配置解析表单数据的内置中间键(x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));
//自定义信息提示函数
const hintHandle = require("./public/js/hintMsg");
app.use(hintHandle);
//自定义token权限中间键
const tokenConfig = require("./public/js/token.js");
app.use(tokenConfig);

//注册全局路由
const theRouter = require("./routes/index");
app.use("/api", theRouter);
// //自定义表单及token权限错误拦截中间键
const errorMsg = require("./public/js/f_error");
app.use(errorMsg.errorMsg);

app.listen(5020, () => {
  console.log(`http://127.0.0.1:5020 is running`);
});
