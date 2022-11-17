<template>
  <!-- 渲染home页面模板 -->
  <div id="content">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#content {
  background: url("../../../assets/images/bgc/bg.jpg") no-repeat center;
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
}
</style>