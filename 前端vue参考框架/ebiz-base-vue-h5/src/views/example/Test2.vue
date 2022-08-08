<template>
  <div class="test2-container">
    <p class="m20 text-center">我是测试二</p>
    <van-button type="info" @click="goToTest" class="ml20">go测试三</van-button>
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
      this.$jump({
        flag: 'h5',
        extra: {
          url: location.origin + '/#/test3'
        },
        routerInfo: {
          path: '/test3'
        }
      })
    }
  }
}
</script>
