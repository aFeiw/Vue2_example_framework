<template>
  <div >
    <el-page-header class="form-title" @back="goBack" content="修改页面">
    </el-page-header>
    <el-form
      label-width="80px"
      class="form"
      :model="sickList"
      :rules="sickListRules"
      ref="sickListForm"
    >
      <el-row :gutter="20">
        <el-col :lg="8" :xl="8">
          <el-form-item label="患者姓名:" label-width="83px" prop="sick_name">
            <el-input
              v-model="sickList.sick_name"
              class="input-text"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="性别:" prop="sick_sex">
            <el-radio-group
              size="medium"
              v-model="sickList.sick_sex"
              class="input-text"
            >
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item
            label-width="83px"
            label="身份证号:"
            prop="sick_id_card"
          >
            <el-input
              class="input-text"
              v-model="sickList.sick_id_card"
              placeholder="请输入身份证号"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :lg="8" :xl="8">
          <el-form-item label="手机号:" label-width="83px" prop="sick_phone">
            <el-input
              class="input-text"
              v-model="sickList.sick_phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="家庭住址:" label-width="83px" prop="sick_adress">
            <el-input
              class="input-text"
              v-model="sickList.sick_adress"
              placeholder="请输入家庭住址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="邮箱:" prop="sick_email">
            <el-input
              class="input-text"
              v-model="sickList.sick_email"
              placeholder="请输入所学专业"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="既往病史:" prop="sick_anamnesis">
            <el-input
              :rows="8"
              type="textarea"
              v-model="sickList.sick_anamnesis"
              placeholder="请输入病史"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="医保情况:" prop="sick_medical_cards">
            <el-input
              class="input-text"
              v-model="sickList.sick_medical_cards"
              placeholder="是否有医保外的保险信息"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="家族遗传:" prop="sick_family_genetic">
            <el-input
              class="input-text"
              v-model="sickList.sick_family_genetic"
              placeholder="家族遗传史"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :lg="8" :xl="8">
          <el-form-item
            label="个人症状:"
            label-width="83px"
            prop="sick_describe"
          >
            <el-input
              type="textarea"
              v-model="sickList.sick_describe"
              placeholder="个人症状描述"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item
            label="过敏情况:"
            label-width="83px"
            prop="sick_drug_allergy"
          >
            <el-input
              v-model="sickList.sick_drug_allergy"
              type="textarea"
              placeholder="请输入药品或其他过敏禁忌"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :lg="8" :xl="8">
          <el-form-item
            label="是否医生派遣 :"
            prop="sick_family_need"
            label-width="105px"
          >
            <el-radio-group
              size="medium"
              v-model="sickList.sick_family_need"
              class="input-text"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="22" :xl="22">
          <el-form-item
            prop="sick_status"
            label="是否修改当前用户就诊状态： "
            label-width="200px"
          >
            <el-radio-group size="medium" v-model="sickList.sick_status">
              <el-radio border :label="0">已完成</el-radio>
              <el-radio border :label="1">待就诊</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="诊断结果:" prop="sick_result">
            <el-input
              v-model="sickList.sick_result"
              :rows="5"
              style="width: 300px"
              type="textarea"
              placeholder="请输入诊断结果"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xl="10">
          <el-form-item label="所属医生:" prop="doctor_src">
            <el-input
              v-model="sickList.doctor_src"
              style="width: 300px"
              :rows="2"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div id="btn-s">
      <el-button type="primary" @click="updateCommit()" size="medium "
        >提交修改信息</el-button
      >
    </div>
  </div>
</template>

<script>
import { getSickByid } from "@/api/sick/index.js";
import { updateSick } from "@/api/sick/index.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      sickList: {
        id: this.$route.query.id,
        sick_name: "",
        sick_sex: 1,
        sick_id_card: " ",
        sick_phone: " ",
        sick_adress: "",
        sick_email: " ",
        sick_medical_cards: "",
        //既往病史
        sick_anamnesis: "",
        sick_family_genetic: "",
        //禁忌
        sick_drug_allergy: "",
        // 个人描述
        sick_describe: "",
        //家庭医生01
        sick_family_need: 0,
        sick_status: 1,
        //就诊结果
        sick_result: "",
        doctor_src: "",
      },

      sickListRules: {
        sick_name: [
          { required: true, message: "请输入患者姓名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        sick_id_card: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern:
              /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "请检查你的身份证号码",
          },
        ],
        sick_phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请检查你的手机号码",
          },
        ],
        sick_adress: [
          { required: true, message: "请输入家庭住址", trigger: "blur" },
        ],
        sick_drug_allergy: [
          { required: true, message: "请输入药品及其他禁忌", trigger: "blur" },
        ],
        sick_describe: [
          { required: true, message: "请输入个人病情描述", trigger: "blur" },
        ],
        sick_email: [
          {
            pattern: /^\w+@[a-z0-9]+.[a-z]{2,4}$/,
            message: "请检查你的邮箱格式",
          },
        ],
      },
    };
  },
  mounted() {
    this.getSickById();
  },
  methods: {
    async getSickById() {
      const { data: res } = await getSickByid(this.sickList.id);
      console.log(res);
      if (res.status === 200) {
        return (this.sickList = res.data);
      } else {
        return console.log(res.msg);
      }
    },
    updateCommit() {
      this.$refs["sickListForm"].validate(async (valid) => {
        if (valid) {
          const { data: res } = await updateSick(this.sickList);
          if (res.status === 200) {
            this.$message.success(res.msg);
            return this.$router.push({
              name: "sickList",
            });
          } else {
            this.$message.error(res.msg);
          }
          console.log(res);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goBack() {
      this.$router.push({
        name: "sickList",
      });
    },
  },
};
</script>
<style scoped lang="less">
.form-title {
  font-weight: 520;
  color: #920000;
  margin-left: 2vw;
  margin-bottom: 5vh;
}
#btn-s {
  position: relative;
  bottom: 4vh;
  left: 50vw;
}
/deep/.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
 
.el-col-lg-12 {
   width: 100%; 
}
</style>
