<template>
  <div class="login-container ph10">
    <h3 class="text-center pv30">欢迎登录</h3>
    <van-cell-group cl>
      <van-field v-model="username" clearable label="用户名" placeholder="请输入用户名" left-icon="contact" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" left-icon="bag-o" />
    </van-cell-group>
    <van-button type="info" size="large" class="mt30" @click="login" :loading="loading" loading-text="登录中...">登录</van-button>
  </div>
</template>

<script>
import { Field, CellGroup } from 'vant'
import { login } from '@/api/app/user'
export default {
  name: 'login',
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      username: 'admin',
      password: '123456',
      loading: false,
      redirect: this.$route.query.redirect
    }
  },
  methods: {
    login() {
      if (this.username == '' || this.password == '') {
        this.$toast('账号或密码不能为空')
        return
      }
      this.loading = true
      //登录
      login()
        .then(res => {
          localStorage.token = res.token
          this.$router.push({ path: this.redirect || '/' })
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped></style>
