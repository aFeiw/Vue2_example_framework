<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
@import 'src/assets/sass/common.scss';
</style>
