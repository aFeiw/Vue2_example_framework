<template>
  <div class="jump-container" @click="jump">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'jump',
  props: {
    flag: {
      type: String,
      default: 'h5'
    },
    routerInfo: Object,
    extra: Object
  },
  methods: {
    jump() {
      // eslint-disable-next-line
      if (window.WebViewJavascriptBridge) {
        // eslint-disable-next-line
        EWebBridge.webCallAppInJs('bridge', {
          flag: this.flag,
          extra: this.extra
        })
      } else {
        this.$router.push(this.routerInfo)
      }
    }
  }
}
</script>
