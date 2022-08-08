# basic-h5

## 介绍

- UI 框架使用[Vant](https://youzan.github.io/vant/#/zh-CN/intro)，它是轻量、可靠的移动端 Vue 组件库
- 组件导入方式和 viewport 适配参考：[快速上手](https://youzan.github.io/vant/#/zh-CN/quickstart)

### 技术栈

Vue2 + Vue-Router + Axios + Vuex + Vant + Vue-Loader + Vue-Cli3.0 + ...

### 命名规范

- 组件名：大驼峰
- 方法名：小驼峰
- class 类名：连字符(a-b)
- 常量(const)：全大写
- 变量(let)：小驼峰
- 文件夹命名： 一律小写(只允许小写字母、中横杠-，如：a-b)
- Vue 文件命名： 大驼峰式命名法，即每个单词的首字母大写 CamelCase.vue
- css,js,image 等文件命名：一律小写(css/js 文件使用中横杆-，image 使用下划线\_)第三方除外
- 如条件允许： import 进来的变量名及 export 都采用大驼峰形式命名，如 import VueRouter from 'vue-router' 及 export default Common

```javascript
//什么叫“如条件允许”：比如我们需要
import routes from './routers/router'
const router = new VueRouter({
  routes
})
//这种情况下，routes可以用小写，事实上，上面的范例可以换一种写法：
import Routes from './routers/router'
const router = new VueRouter({
  routes: Routes
})
```

## wiki 文档

[wiki 参考文档](http://114.215.252.122:8090/pages/viewpage.action?pageId=13960243)

## 目录结构

```
.
├── node_modules                                // npm/yarn安装的项目依赖模块
├── public                                      // 静态资源目录
├── src                                         // 源码目录
│   ├── api                                     // 网络请求文件
│   │   ├── app                                 // 基础工程网络请求文件
│   │   │   ├── user.js                         // 用户模块api请求
│   │   ├── example
│   │   │   └── ***                             // 示例模块api请求
│   ├── assets                                  // 资源目录
│   │   ├── fonts                               // 字体文件
│   │   ├── images                              // 图片文件
│   │   |   ├── app                             // 基础工程图片
│   │   |   ├── 404_img                         // 404图片
│   │   ├── js
│   │   |   ├── utils                           //工具类js
│   │   |   |   ├── get-url.js                  //根据设置获取请求url
│   │   |   |   ├── jump.js                     //跳转文件 bridge or router
│   │   |   |   ├── premission.js               //权限控制
│   │   |   |   ├── request.js                  //拦截器
│   │   |   |   ├── validate.js                 //表单校验
│   │   |   ├── vendor                          //第三方js
│   │   |   ├── common.js                       //全局js方法
│   │   |   ├── business-common.js              //业务相关全局js方法
│   │   ├── sass
│   │   |   └── common.scss                     // 样式出口文件
│   │   |   └── vant-ui.scss                    // vant样式
│   │   |   └── minix.scss                      // 样式配置
│   │   |   └── transition.scss                 // 动画样式
│   │   |   └── utils.scss                      // 工具样式
│   │   |   └── variables.scss                  // 变量文件
│   ├── components                              // 全局组件
│   |   ├── common                              //公共组件
│   │   |   └── Jump                            // 跳转组件
│   ├── config                                  // 配置文件
│   |   ├── index.js                            // 环境配置
│   |   ├── urlMap.js                           // api url配置
│   ├── filters
│   |   ├── index.js                            // 过滤器
│   ├── router
│   |   ├── app                                 // 基础工程路由
│   |   ├── example                             // 示例路由
│   |   ├── index.js                            // 路由配置
│   ├── store
│   |   ├── modules                             // 状态模块
│   |   ├── getters.js                          // 配置getters
│   |   ├── index.js                            // 引用vuex，创建store
│   ├── views
│   |   ├── app                                 // 基础工程页面
│   |   |   ├── layout                          // layout：导航栏、侧边栏、主窗口等
│   |   |   ├── login                           // 登录页面
│   |   |   ├── 404.vue                         // 404页面
│   |   |   ├── home.vue                        // 首页
│   |   ├── example                             // 示例页面，不一一列举
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── tests                                       // 测试相关文件
├── .env.development                            // 开发环境配置
├── .env.production                             // 生产环境配置
├── .env.staging                                // staging环境配置
├── .eslintrc.js                                // eslint配置
├── babel.config.js                             // 转码配置
├── .prettierrc                                 // prettier配置
├── jest.config.js                              // 测试配置
├── package.json                                // 安装包列表文件
├── postcss.config.js                           // 样式配置
├── vue.config.js                               // vue工程配置
.
```

## 项目运行

```bash
git clone http://112.124.100.131/base/ebiz-base-vue-h5.git

cd ebiz-base-vue-h5

yarn install（推荐使用yarn）

yarn serve（开发环境）

```

## 项目打包

```bash
# 测试环境打包
yarn run build:envName（测试环境打包）

# 线上环境打包
yarn run build:prd（线上环境打包）
```

## 预发环境打包预览、文件检查等

```bash
# 代码检查
yarn run lint

# 代码检查修复
yarn run lint:fix

#代码格式化
yarn run format
```

## 快速开始项目

1、src>>api 目录下创建项目所需 http 请求文件夹  
2、src>>assets 目录下创建项目所需的 js image 文件夹，以及 scss 文件  
3、src>>router 目录下创建所需路由文件夹  
4、src>>store>>modules 目录下创建所需状态管理文件

##### [注：项目开始前请先配置 vscode 代码检查、格式化](http://115.29.19.195:8090/pages/viewpage.action?pageId=13960404)

## 主要功能点介绍

- http 请求文件
  - 模块划分：app 为基础工程模块、其他项目需另建文件夹
  - 拦截器：超时设置、请求头加 token、统一处理异常、token 异常重新登录等
- mock 数据
  - [工具 rap2](http://rap2.taobao.org/) 、[参考链接](http://115.29.19.195:8090/display/VUE/mock)
  - 通过 config 文件夹下 urlMap.js，配置 mock 接口请求
- 环境配置
  - 在 config 文件夹下 index.js，通过 process.env.NODE_ENV 对环境进行配置
  - 跨域问题可通过后台解决，也可设置前端代理 proxy
- router
  - 模块划分
  - 路由拦截
  - 路由懒加载
- 权限控制
  - 可在 permission.js 里设置黑白名单
