<template>
  <div class="home-container">
    <div class="pv10 text-center">ebiz h5 standard frame</div>
    <ul class="fs14 p20">
      <li class="fs18 mb10">基础工程项目：</li>
      <li>
        <p class="fw600">app相关页面</p>
        <ul class="pl20">
          <li><router-link to="/login">登录</router-link></li>
        </ul>
      </li>
      <li class="mt10">
        <p class="fw600">示例页面</p>
        <ul class="pl20">
          <li><router-link to="/rate">评分示例</router-link></li>
          <li><router-link to="/formValidate">表单校验示例（需登录）</router-link></li>
          <li><router-link to="/test1">测试页面一</router-link></li>
          <li><router-link to="/test2">测试页面二</router-link></li>
          <li><router-link to="/test3">测试页面三</router-link></li>
        </ul>
      </li>
      <li class="mt10">
        <p class="fw600">业务页面</p>
        <ul class="pl20">
          <li><router-link to="">业务页面1</router-link></li>
        </ul>
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
  name: 'Home',
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
