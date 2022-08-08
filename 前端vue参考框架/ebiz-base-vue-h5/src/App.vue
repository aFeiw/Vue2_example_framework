<template>
  <div id="app">
    <!--实现路由切换动画-->
    <transition :name="transitionName">
      <RouterView />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route(to, from) {
      //首次加载去除动画
      if (!from.name) return
      //动画方式
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else if (to.meta.index === from.meta.index) {
        this.transitionName = ''
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.slide-left-leave-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-right-enter-active {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  transition: all 0.2s ease;
}
.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-left-enter-to,
.slide-left-leave,
.slide-right-enter-to,
.slide-right-leave {
  transform: translateX(0);
}
.slide-left-leave-to,
.slide-right-enter {
  transform: translateX(-100%);
}
</style>
