<template>
  <div id="login_bgc">
    <div class="login">
      <div class="avatar">
        <img src="@/assets/images/bgc/ict.jpg" />
      </div>
      <span>健康服务管理系统</span>
      <el-form
        :rules="loginFormRules"
        ref="loginFormRef"
        class="login-form"
        :model="loginForm"
      >
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="loginForm.username">
            <template slot="prepend"><i class="el-icon-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-form-item">
          <el-input
            placeholder="密码"
            show-password
            v-model="loginForm.password"
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <span class="register-btn" @click="$router.push({ name: 'register' })"
          >立即注册?</span
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/user/login.js";
import { validatePass } from "@/assets/js/validate.js";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //登录
    login() {
      this.$refs["loginFormRef"].validate(async (valid) => {
        if (valid) {
          const { data: res } = await userLogin(this.loginForm);
          if (res.status === 200) {
            this.$message.success(res.msg);
            //把用户名存session,token-vuex
            window.sessionStorage.setItem("username", this.loginForm.username);
            this.$store.commit("set_token", res.token);
            this.$router.push({
              name: "mainBasic",
            });
          } else {
            this.$message.error(res.msg);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  width: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: hsla(0, 0%, 100%, 0.4);
  border-radius: 5px;
  text-align: center;
}
.logo {
  height: 50px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.login span {
  line-height: 50px;
  font-size: 20px;
  color: #fff;
}
.login-form {
  width: 100%;
  padding: 30px 30px 0 30px;
}
.login-form-item {
  margin-bottom: 10px;
}
.el-button {
  margin-top: 20px;
  width: 100%;
}
.login .register-btn {
  font-size: 14px;
  margin-left: 240px;
  cursor: pointer;
}

.avatar {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-190%, -55%);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
</style>
