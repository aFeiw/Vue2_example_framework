<template>
  <div id="content">
    <p class="form-title"><span> | </span> 在职医生一览表:</p>
    <el-card style="padding: 0 1%">
      <el-table :data="doctorData" border style="width: 100%" max-height="396">
        <el-table-column
          fixed
          prop="doctor_worker_number"
          label="医生工号"
          width="130"
        >
        </el-table-column>
        <el-table-column prop="doctor_name" label="医生姓名" width="130">
        </el-table-column>
        <el-table-column prop="doctor_phone" label="联系方式" width="130">
        </el-table-column>
        <el-table-column prop="doctor_email" label="邮箱" width="130">
        </el-table-column>
        <el-table-column prop="doctor_adress" label="现居住地址" width="300">
        </el-table-column>
        <el-table-column prop="doctor_education" label="毕业院校" width="130">
        </el-table-column>

        <el-table-column prop="doctor_family" label="家庭医生" width="100">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="uodataRow(scope.row.id, doctorData)"
              type="success"
              size="mini"
            >
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row.id, doctorData)"
              size="mini"
              type="danger"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table></el-card
    >
    <div class="re-er">
      <el-form label-width="200px" @submit.native.prevent>
        <el-form-item
          :model="ruleForm"
          class="screen"
          label="您可在此输入工号查询医生:"
        >
          <el-input
            style="width: 300px"
            v-model="ruleForm.doctor_worker_number"
            class="input-text"
            placeholder="请输入工号，按回车键结束～"
            @keyup.enter.native="submit()"
          ></el-input></el-form-item
        >
        </el-form>
        <span class="sss">   或者</span>
        <el-button type="success" size="medium " @click="newDoctor"
          >+ 添加新医生</el-button>
    </div>
    <div id="new_ms">
      <el-dialog
        title="修改当前医生信息:"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <span>
          <el-form
            :model="doctorList"
            :rules="doctorListRules"
            ref="doctorForm"
            label-width="80px"
            class="form"
          >
            <el-row :gutter="28">
              <el-col :lg="8" :xl="8">
                <el-form-item
                  label="医生工号:"
                  label-width="83px"
                  prop="doctor_worker_number"
                >
                  <el-input
                    v-model.number="doctorList.doctor_worker_number"
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
                  <el-radio-group
                    v-model="doctorList.doctor_family"
                    size="medium"
                  >
                    <el-radio border :label="1">是</el-radio>
                    <el-radio border :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updataDoctor()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getDoctorAll } from "@/api/doctor/index.js";
import { deleteDoctor } from "@/api/doctor/index.js";
import { getDoctorByid } from "@/api/doctor/index.js";
import { updateDoctor } from "@/api/doctor/index.js";

export default {
  data() {
    return {
      dialogVisible: false,
      doctorData: [],
      ruleForm: {
        doctor_worker_number: "",
      },
      doctorList: {
        id: 0,
        doctor_name: "",
        doctor_worker_number: "",
        doctor_sex: 1,
        doctor_id_card: " ",
        doctor_phone: " ",
        doctor_adress: "",
        doctor_email: " ",
        //毕业院校
        doctor_education: "",
        //科室
        doctor_deaparment: "",

        doctor_family: "",
      },
      doctorListRules: {
        doctor_name: [
          { required: true, message: "请输入医生姓名", trigger: "blur" },
          {
            min: 1,
            max: 5,
            message: "长度在 3 到 6 个字符",
            trigger: "blur",
          },
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

  mounted() {
    this.getDoctorList();
  },
  methods: {
    async getDoctorList() {
      //渲染从数据
      const { data: res } = await getDoctorAll(this.ruleForm);
      console.log(res);
      if (res.status == 200) {
        res.data.filter((item) => {
          if (item.doctor_family === 0) return (item.doctor_family = "未注册");
          if (item.doctor_family === 1) return (item.doctor_family = "已注册");
        });
        this.doctorData = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    //移除医生
    async deleteRow(id) {
      const { data: res } = await deleteDoctor(id);
      console.log(res);
      if (res.status === 200) {
        this.$message.success(res.msg);
        this.getDoctorList();
      } else {
        return this.$message.error(res.msg);
      }
    },
    submit() {
      this.getDoctorList(this.ruleForm);
    },
    //新增医生
    newDoctor() {
      this.$router.push({
        name: "insertdoctor",
      });
    },
    //根据id查询当前医生信息
    async uodataRow(id) {
      this.dialogVisible = true;
      this.doctorList.id = id;
      const { data: res } = await getDoctorByid(id);
      console.log(res);
      if (res.status == 200) {
        this.doctorList = res.data;
      }
    },
    // 提交修改信息
    updataDoctor() {
      this.$refs["doctorForm"].validate(async (valid) => {
        if (valid) {
          const { data: res } = await updateDoctor(this.doctorList);
          console.log(res);
          if (res.status === 200) {
            this.$message.success(res.msg);
            this.getDoctorList();
            this.dialogVisible = false;
          } else {
            this.$message.error(res.msg);
            this.dialogVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.label {
  width: 100%;
  margin: auto;
}
.choose-box {
  float: left;
}
.block {
  float: left;
}
.form-title {
  padding-right: 90%;
  font-weight: 600;
  padding: 0 0 2.2% 2.2%;
  color: #920000;
}
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  // color: #920000;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
#new_ms {
  position: absolute;
  bottom: 6vh;

  .sss {
    font-weight: 600;
    color: #920000;
    font-size: 14px;
    margin: 3px 10px;
  }
}
.re-er{
  margin-top: 8vh;
  margin-bottom: 8vh;
}
</style>