<template>
  <div class="test3-container">
    <p class="m20 text-center">我是测试四</p>
    <van-button type="info" @click="goToTest" class="ml20">返回测试一</van-button>
  </div>
</template>

<script>
// import { Rate } from 'vant'
export default {
  name: 'test4',
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
        flag: 'goBack',
        extra: {
          refresh: '1'
        },
        routerInfo: {
          type: 2,
          index: -2
        }
      })
    }
  }
}
</script>
