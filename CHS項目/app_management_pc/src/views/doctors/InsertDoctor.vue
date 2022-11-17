<template>
  <div>
    <el-card style="height: 500px">
      <el-form
        :model="doctorList"
        :rules="doctorListRules"
        ref="doctorListForm"
        label-width="80px"
        class="form"
      >
        <p class="form-title"><span> | </span> 医生信息</p>
        <el-row :gutter="28">
          <el-col :lg="8" :xl="8">
            <el-form-item
              label="医生工号:"
              label-width="83px"
              prop="doctor_worker_number"
            >
              <el-input
                v-model="doctorList.doctor_worker_number"
                class="input-text"
                placeholder="请输入工号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="8">
            <el-form-item
              label="医生姓名:"
              label-width="83px"
              prop="doctor_name"
            >
              <el-input
                v-model="doctorList.doctor_name"
                class="input-text"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="8">
            <el-form-item label="性别:" prop="doctor_sex">
              <el-radio-group
                v-model="doctorList.doctor_sex"
                size="medium"
                class="input-text"
                label-width="90px"
              >
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="8">
            <el-form-item
              label="身份证号:"
              label-width="83px"
              prop="doctor_id_card"
            >
              <el-input
                v-model="doctorList.doctor_id_card"
                class="input-text"
                placeholder="请输入身份证号"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :lg="8" :xl="8">
            <el-form-item label="手机号:" prop="doctor_phone">
              <el-input
                v-model="doctorList.doctor_phone"
                class="input-text"
                placeholder="请输入手机号"
                label-width="100px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="8">
            <el-form-item
              label="现居地址:"
              label-width="90px"
              prop="doctor_adress"
            >
              <el-input
                v-model="doctorList.doctor_adress"
                class="input-text"
                placeholder="请输入现居地址"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="8">
            <el-form-item label="邮箱:" prop="doctor_email">
              <el-input
                v-model="doctorList.doctor_email"
                class="input-text"
                label-width="90px"
                placeholder="请输入邮箱"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="8">
            <el-form-item label="毕业院校:" prop="doctor_education">
              <el-input
                v-model="doctorList.doctor_education"
                class="input-text"
                placeholder="请输入所属毕业院校"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="8">
            <el-form-item
              label="选择科室"
              prop="doctor_deaparment"
              label-width="90px"
            >
              <el-select
                placeholder="请选择科室信息"
                v-model="doctorList.doctor_deaparment"
              >
                <el-option label="内科" :value="0"></el-option>
                <el-option label="外科" :value="1"></el-option>
                <el-option label="理疗" :value="2"></el-option>
                <el-option label="家庭医生" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="22" :xl="22">
            <el-form-item
              label="是否更新注册为家庭医生： "
              label-width="200px"
              prop="doctor_family"
            >
              <el-radio-group v-model="doctorList.doctor_family" size="medium">
                <el-radio border :label="1">是</el-radio>
                <el-radio border :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div id="btn-s">
      <el-button type="success" size="medium " @click="newDoctor()"
        >新增医生</el-button
      >
      <el-button type="info" size="medium " @click="goDoctorList()"
        >返回</el-button
      >
    </div>
  </div>
</template>
 <script>
import { insertDoctor } from "@/api/doctor/index.js";
export default {
  data() {
    return {
      activeName: "1",
      doctorList: {
        doctor_name: "",
        doctor_worker_number: "",
        doctor_sex: 1,
        doctor_id_card: "622202200103014569",
        doctor_phone: "15523652213",
        doctor_adress: "",
        doctor_email: "123@qq.com",
        //毕业院校
        doctor_education: "",
        //科室
        doctor_deaparment: "",

        doctor_family: "",
      },
      doctorListRules: {
        doctor_name: [
          { required: true, message: "请输入医生姓名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        doctor_id_card: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern:
              /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "请检查你的身份证号码",
          },
        ],
        doctor_phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请检查你的手机号码",
          },
        ],
        doctor_adress: [
          { required: true, message: "请输入现居住地址", trigger: "blur" },
        ],
        doctor_email: [
          {
            pattern: /^\w+@[a-z0-9]+.[a-z]{2,4}$/,
            message: "请检查你的邮箱格式",
          },
        ],
        doctor_worker_number: [
          { required: true, message: "请输入医生工号", trigger: "blur" },
          {
            pattern: /^[0-9]{8}$/,
            message: "请输入8位数字",
          },
        ],
        doctor_family: [
          { required: true, message: "请至少选择一项", trigger: "change" },
        ],
        doctor_deaparment: [
          { required: true, message: "请至少选择一项", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //提交用户按钮
    newDoctor() {
      this.$refs["doctorListForm"].validate(async (valid) => {
        if (valid) {
          const { data: res } = await insertDoctor(this.doctorList);
          console.log(res);
          if (res.status === 200) {
            this.$message.success(res.msg);
            this.$router.push({
              name: "doctorList",
            });
          }
        } else {
          return false;
        }
      });
    },
    goDoctorList() {
      this.$router.push({ name: "doctorList" });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-tabs__nav-scroll {
  padding: 0 2%;
}
.form-title {
  padding-right: 90%;
  padding-bottom: 1.5vh;
  font-weight: 600;
  padding-bottom: 2%;
  color: #920000;
}
#btn-s {
  position: absolute;
  bottom: 0vh;
  left: 40%;
  .el-button:nth-child(2) {
    margin-left: 66px;
  }
}
</style>
 
