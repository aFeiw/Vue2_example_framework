<template>
  <div id="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户信息" name="1">
        <el-card>
          <el-form
            :model="sickList"
            :rules="sickListRules"
            ref="sickListForm"
            label-width="80px"
            class="form"
          >
            <p class="form-title"><span> | </span> 基本信息</p>
            <el-row :gutter="28">
              <el-col :lg="8" :xl="8">
                <el-form-item
                  label="患者姓名:"
                  label-width="83px"
                  prop="sick_name"
                >
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
                    v-model="sickList.sick_sex"
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
                  prop="sick_id_card"
                >
                  <el-input
                    v-model="sickList.sick_id_card"
                    class="input-text"
                    placeholder="请输入身份证号"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :xl="8">
                <el-form-item label="手机号:" prop="sick_phone">
                  <el-input
                    v-model="sickList.sick_phone"
                    class="input-text"
                    placeholder="请输入手机号"
                    label-width="100px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :xl="8">
                <el-form-item
                  label="家庭住址:"
                  label-width="90px"
                  prop="sick_adress"
                >
                  <el-input
                    v-model="sickList.sick_adress"
                    class="input-text"
                    placeholder="请输入家庭住址"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :xl="8">
                <el-form-item label="邮箱:" prop="sick_email">
                  <el-input
                    v-model="sickList.sick_email"
                    class="input-text"
                    label-width="90px"
                    placeholder="请输入邮箱"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :xl="8">
                <el-form-item label="既往病史:" prop="sick_anamnesis">
                  <el-input
                    v-model="sickList.sick_anamnesis"
                    type="textarea"
                    placeholder="请输入病史"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :xl="8">
                <el-form-item label="家族遗传:" prop="sick_family_genetic">
                  <el-input
                    v-model="sickList.sick_family_genetic"
                    class="input-text"
                    placeholder="家族遗传史"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :xl="9">
                <el-form-item
                  label="个人症状:"
                  label-width="83px"
                  prop="sick_describe"
                >
                  <el-input
                    v-model="sickList.sick_describe"
                    type="textarea"
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
                <el-form-item label="医保情况:" prop="sick_medical_cards">
                  <el-input
                    v-model="sickList.sick_medical_cards"
                    class="input-text"
                    placeholder="是否有医保外的保险信息"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :xl="8">
                <el-form-item
                  label="是否医生派遣 :"
                  label-width="120px"
                  prop="sick_family_need"
                >
                  <el-radio-group
                    v-model="sickList.sick_family_need"
                    size="medium"
                    class="input-text"
                  >
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :lg="22" :xl="22">
                <el-form-item
                  label="是否更新当前用户就诊状态： "
                  label-width="200px"
                  prop="sick_status"
                >
                  <el-radio-group v-model="sickList.sick_status" size="medium">
                    <el-radio border :label="0">已完成</el-radio>
                    <el-radio border :label="1">待就诊</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card></el-tab-pane
      >
      <el-tab-pane label="诊断记录" name="2">
        <el-card>
          <el-form label-width="120px" class="form">
            <p class="form-title"><span> | </span> 诊断记录信息</p>
            <el-row :gutter="30">
              <el-col :lg="8" :xl="8">
                <el-form-item label="诊断情况:" prop="sick_record">
                  <el-input
                    v-model="sickList.sick_record"
                    :rows="16"
                    style="width: 600px"
                    type="textarea"
                    placeholder="请输入检查事项以及诊断病例"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="诊断结果" name="3">
        <el-card>
          <el-form label-width="120px" class="form">
            <p class="form-title"><span> | </span> 诊断结果</p>
            <el-row :gutter="30">
              <el-col :lg="8" :xl="8">
                <el-form-item label="诊断结果:" prop="sick_result">
                  <el-input
                    v-model="sickList.sick_result"
                    :rows="10"
                    style="width: 600px"
                    type="textarea"
                    placeholder="请输入诊断结果"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="投诉以及建议" disabled name="4"
        >投诉以及建议</el-tab-pane
      >
    </el-tabs>
    <div id="btn-s">
      <el-button type="primary" size="medium " @click="newSick()"
        >创建用户</el-button
      >
      <el-button type="info" size="medium " @click="goSickList()"
        >返回</el-button
      >
    </div>
  </div>
</template>
<script>
import { insertSick } from "@/api/sick/index.js";
export default {
  data() {
    return {
      activeName: "1",
      sickList: {
        sick_name: "",
        sick_sex: 1,
        sick_id_card: "",
        sick_phone: "",
        sick_adress: "",
        sick_email: "",
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
        //就诊记录
        sick_record: "",
        //就诊结果
        sick_result: "",
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
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //提交用户按钮
    newSick() {
      this.$refs["sickListForm"].validate(async (valid) => {
        if (valid) {
          const { data: res } = await insertSick(this.sickList);
          console.log(res);
          if (res.status === 200) {
            this.$message.success(res.msg);
            this.$router.push({
              name: "sickList",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goSickList() {
      this.$router.push({ name: "sickList" });
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
  bottom: 4vh;
  left: 60vw;
  .el-button:nth-child(2) {
    margin-left: 66px;
  }
}
</style>