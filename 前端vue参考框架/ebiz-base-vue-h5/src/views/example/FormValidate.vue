<template>
  <div class="form-validate-container">
    <van-cell-group>
      <van-field v-model="username" label="用户名" placeholder="请输入用户名" v-validate="'required'" name="用户名" />
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" v-validate="'required|mobile'" name="手机号" type="number" />
    </van-cell-group>
    <van-button type="info" class="mt20" size="large" v-no-more-click="1000" @click="submit">提交</van-button>
  </div>
</template>

<script>
import { CellGroup, Field } from 'vant'
export default {
  name: 'formValidate',
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field
  },
  data() {
    return {
      username: '',
      phone: ''
    }
  },
  methods: {
    //登录
    submit() {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$toast('校验通过！')
        } else {
          this.$toast(this.$validator.errors.all()[0])
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
