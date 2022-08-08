<template>
  <div class="rate-container p50">
    <p>基础用法</p>
    <van-rate v-model="value1" />
    <p class="mt20">自定义图标</p>
    <van-rate v-model="value2" icon="like" void-icon="like-o" />
    <p class="mt20">半星</p>
    <van-rate v-model="value3" :size="25" allow-half void-icon="star" void-color="#eee" />
  </div>
</template>

<script>
import { Rate } from 'vant'
export default {
  name: 'rate',
  components: {
    [Rate.name]: Rate
  },
  data() {
    return {
      value1: 3,
      value2: 3,
      value3: 2.5
    }
  }
}
</script>
