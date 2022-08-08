<template>
  <div class="test3-container">
    <p class="m20 text-center">我是测试三</p>
    <van-button type="info" @click="goToTest" class="ml20">去测试四</van-button>
  </div>
</template>

<script>
// import { Rate } from 'vant'
export default {
  name: 'test3',
  components: {
    // [Rate.name]: Rate
  },
  mounted() {
    setTimeout(() => {
      this.$jump({
        flag: 'webview_left_button',
        extra: {
          img: 'http://47.96.143.111:8000/app/images/filter.png',
          title: '试试',
          intercept: '1'
        }
      })
    }, 500)
    // 筛选按钮的点击事件
    window.appCallBack = this.appCallBack
  },
  data() {
    return {}
  },
  methods: {
    appCallBack(data) {
      if (data.trigger == 'left_button_click') {
        this.$jump({
          flag: 'goBack',
          extra: {
            refresh: '1'
          }
        })
      }
    },
    goToTest() {
      this.$jump({
        flag: 'h5',
        extra: {
          url: location.origin + '/#/test4',
          backToFirst: '1'
        },
        routerInfo: {
          path: '/test4'
        }
      })
    }
  }
}
</script>
