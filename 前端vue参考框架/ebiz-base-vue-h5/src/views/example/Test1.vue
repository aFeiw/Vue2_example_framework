<template>
  <div class="test1-container">
    <p class="m20 text-center">我是测试一</p>
    <van-button type="info" @click="goToTest" class="ml20" v-no-more-click="1000">go测试二</van-button>
  </div>
</template>

<script>
// import { Rate } from 'vant'
export default {
  name: 'test1',
  components: {
    // [Rate.name]: Rate
  },
  data() {
    return {}
  },
  methods: {
    goToTest() {
      console.log('测试：', Math.random())
      this.$jump({
        flag: 'h5',
        extra: {
          url: location.origin + '/#/test2',
          backToFirst: '1'
        },
        routerInfo: {
          path: '/test2'
        }
      })
    }
  }
}
</script>
