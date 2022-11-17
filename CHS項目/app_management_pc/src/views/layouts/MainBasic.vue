<template>
  <div id="content">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu index="/mainBasic/sick">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>患者管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/mainBasic/sick">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>患者列表</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-circle-plus"></i>
              <span>医生管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/doctor">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>医生列表</span>
                </template></el-menu-item
              >
              <el-menu-item index="/taskdoctor">
                <template slot="title">
                  <i class="el-icon-help"></i>
                  <span>任务派遣</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-share"></i>
              <span>数据列表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" disabled>
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>用户情况</span>
                </template></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5" disabled>
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统管理</span>
            </template>
          </el-submenu>
          <el-submenu index="6" disabled>
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>其他管理</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-dropdown placement="bottom">
            <i class="el-icon-s-custom">
              <span class="el-de">欢迎您, {{ uname }}</span></i
            >
            <el-dropdown-menu>
              <el-dropdown-item disabled icon="el-icon-set-up">
                个人中心
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="loginOut"
                icon="el-icon-arrow-left"
              >
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- //渲染子组件 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      uname: window.sessionStorage.getItem("username"),
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //退出登录
    loginOut() {
      //清除token，并跳转
      this.$store.commit("remove_token");
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>
<style scoped lang="less">
.el-header {
  background-color: #8a9eba;
  color: #333;
  text-align: center;
  line-height: 60px;
  position: relative;
  margin-bottom: 2%;
}

.el-aside {
  height: 100%;
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  line-height: 200px;
}
section.el-container {
  height: 100%;
}
.el-main {
  color: #333;

  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
ul.el-menu-vertical-demo.el-menu {
  height: 100%;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 100%;
}
/deep/.el-menu-item-group__title {
  display: none;
}
li.el-menu-item {
  text-align: center;
}

/deep/.el-menu {
  border-right: 0;
}
.el-dropdown {
  display: inline-block;
  position: absolute;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  max-width: 150px;
  white-space: nowrap;
  right: 5%;
}
.el-de {
  margin-left: 10px;
}
img {
  width: 12%;
  height: 20%;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
