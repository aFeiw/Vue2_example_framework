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
          <el-input placeholder="请输入用户名" v-model="loginForm.username">
            <template slot="prepend"><i class="el-icon-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-form-item">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model="loginForm.password"
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPassword" class="login-form-item">
          <el-input
            placeholder="请再次输入密码"
            show-password
            v-model="loginForm.checkPassword"
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-button id="st_btn" type="primary" @click="login">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userRegister } from "@/api/user/login.js";
export default {
  name: "Login",
  data() {
    let validatePass = (rule, value, callback) => {
      let passwordReg = /^[\S]{6,12}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      if (!passwordReg.test(value)) {
        callback(new Error("请输入6-12位密码"));
      } else {
        if (this.loginForm.i_password !== "") {
          this.$refs.loginFormRef.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      let passwordReg = /^[\S]{6,12}$/;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }
      if (!passwordReg.test(value)) {
        callback(new Error("请输入6-12位密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        checkPassword: "",
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
        checkPassword: [
          {
            required: true,
            validator: validatePass2,
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
    //注册
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          //表单验证通过后将数据重新处理
          let userForm = {};
          userForm["username"] = this.loginForm.username;
          userForm["password"] = this.loginForm.password;
          console.log(userForm);
          const { data: res } = await userRegister(userForm);
          if (res.status === 200) {
            this.$message.success(res.msg);
            this.$router.push({
              name: "login",
            });
          } else {
            return this.$message.error(res.msg);
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
  margin-bottom: 22px;
}
.el-button {
  width: 100%;
}
.login .register-btn {
  font-size: 14px;
  margin-left: 240px;
  cursor: pointer;
}
#st_btn {
  margin-bottom: 20px;
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
