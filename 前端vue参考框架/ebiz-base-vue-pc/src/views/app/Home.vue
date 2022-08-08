<template>
  <div class="home-container pl50 pr50 pb50 pt90">
    <p>易商阜极管理系统模版，欢迎您的登入！@王方波</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped></style>
