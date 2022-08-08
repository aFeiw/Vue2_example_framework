<template>
  <div class="function-list-container">
    <ul class="fs14 p20">
      <li class="fs18 mb10">基础功能清单：</li>
      <li>
        1、api、router、store等模块划分
      </li>
      <li>
        2、mock方案：rap2，登录、我的信息接口mock
      </li>
      <li>
        3、权限控制、路由拦截器、http拦截器
      </li>
      <li>
        4、表单验证
      </li>
      <li>
        5、常用sass
      </li>
      <li>
        6、路由页面切换动画
      </li>
      <li>
        7、多环境打包配置
      </li>
      <li>
        8、eslint + prettier
      </li>
      <li>9、移动端适配方案，vw</li>
      <li>10、主题定制</li>
      <li>
        11、过滤器注册、移动端300ms延时、调试工具eruda
      </li>
    </ul>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" @click="$toast('暂未开发……')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'functionList',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>
<style lang="scss" scoped></style>
