- Vue 文件命名： 大驼峰式命名法，即每个单词的首字母大写 CamelCase.vue，2-3 个单词用具体意义，不要过于简写。

- 定义变量使用 let ，定义常量使用 const，使用 export，import 模块化。

- 基于模块方式开发，每个 Vue 文件等同于一个模块，模块应该专注于解决单一问题，是独立的可服用的。

- 行内表达式尽量简化，太复杂了不宜阅读和维护，可以考虑使用 method 或是 computed 属性来替代其功能；如获取年：(new Date()).getFullYear()，不要写在行内，使用 computed 来实现。

- 组件 props 尽量使用原始类型（字符串、数字、布尔值），这样清晰直观，便于理解。尽量避免使用复杂的对象。使用 prop 验证，代码更严谨。具体请参考：prop 验证

- 使用 ES6 的箭头函数，这样就不用切换上下文，不用编写类似 let self = this 这样的代码。

- 组件自定义事件命名使用中横岗，对应组件外的一组意义操作。

- 避免使用：this.\$parent

- 谨慎使用：this.\$refs

- 样式作用域空间：<style scoped></style>

- 代码校验：[ESLint](https://eslint.org/)

- 其他请参考：[官方风格指南](https://cn.vuejs.org/v2/style-guide/)
