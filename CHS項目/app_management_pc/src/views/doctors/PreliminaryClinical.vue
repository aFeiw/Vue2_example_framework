<template>
  <div id="content">
    <el-steps
      class="hujmh"
      align-center
      :active="active"
      finish-status="success"
    >
      <el-step title="就诊患者" description="在线就诊用户列表一览"></el-step>
      <el-step title="病情描述" description="请医生仔细浏览病情描述"></el-step>
      <el-step title="医生诊断" description="医生的诊断记录可不填写"></el-step>
    </el-steps>
    <div class="table-op">
      <el-table
        :data="tableData"
        v-show="change"
        height="360"
        border
        style="width: 80%"
      >
        <el-table-column prop="sick_name" label="患者姓名" width="180">
        </el-table-column>
        <el-table-column prop="sick_sex" label="性别" width="180">
        </el-table-column>
        <el-table-column prop="sick_medical_cards" label="医保描述" width="180">
        </el-table-column>
        <el-table-column prop="sick_anamnesis" label="既往病史" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row.id)"
              type="text"
              size="small"
              >查看诊断信息</el-button
            >
          </template></el-table-column
        >
      </el-table>
      <!-- ---------------- -->
      <el-page-header
        style="padding: 2vh 0"
        v-show="change_des"
        @back="goBack"
        content="患者自述"
      >
      </el-page-header>
      <el-descriptions
        v-show="change_des"
        style="width: 80%"
        :column="1"
        border
      >
        <el-descriptions-item
          label="患者性名"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ sick_form.sick_name }}</el-descriptions-item
        >
        <el-descriptions-item label="家族遗传">{{
          sick_form.sick_family_genetic
        }}</el-descriptions-item>
        <el-descriptions-item label="既往病史">{{
          sick_form.sick_anamnesis
        }}</el-descriptions-item>
        <el-descriptions-item label="过敏情况">{{
          sick_form.sick_drug_allergy
        }}</el-descriptions-item>
        <el-descriptions-item label="个人症状">
          {{ sick_form.sick_describe }}</el-descriptions-item
        >
        <el-descriptions-item label="操作">
          <el-tag size="small" class="zhen-btn" @click="zhenDuan()"
            >立即初步诊断</el-tag
          >
        </el-descriptions-item>
      </el-descriptions>
      <!-- ....... -->
      <el-dialog title="填写就诊信息" :visible.sync="change_form">
        <el-form :model="sick_form">
          <el-form-item label="就诊记录：" label-width="120px">
            <el-input
              type="textarea"
              v-model="sick_form.sick_record"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="就诊结果：" label-width="120px">
            <el-input
              :rows="8"
              type="textarea"
              v-model="sick_form.sick_result"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="change_form = false">取 消</el-button>
          <el-button type="primary" @click="diaCommit()">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { diagnoseNeed } from "@/api/task/index.js";
import { getSickByid } from "@/api/sick/index.js";
import { diagnoseCommit } from "@/api/task/index.js";

export default {
  //在线预诊
  components: {},
  props: {},
  data() {
    return {
      active: 1,
      change: true,
      change_des: false,
      change_form: false,
      labelPosition: "top",

      sick_form: {
        id: "",
        sick_name: "",
        sick_family_genetic: "",
        sick_anamnesis: "",
        sick_drug_allergy: "",
        sick_describe: "",
        sick_sex: "",
        sick_id_card: "",
        sick_phone: "",
        sick_adress: "",
        //诊断记录
        sick_record: "",
        //诊断结果
        sick_result: "",
        doctor_src: "",
      },

      tableData: [],
    };
  },
  created() {},
  mounted() {
    this.getDiagnoseNeed();
  },

  methods: {
    //获取待诊用户列表
    getDiagnoseNeed() {
      diagnoseNeed().then((res) => {
        if (res.status === 200) {
          res.data.data.map((item) => {
            if (item.sick_sex === 1) item.sick_sex = "男";
            if (item.sick_sex === 0) item.sick_sex = "女";
          });
          this.tableData = [...res.data.data];
        } else {
          this.$message("参数错误");
        }
      });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    //查看就诊诊断信息
    handleClick(id) {
      this.change = false;
      this.change_des = true;
      this.active = 2;
      getSickByid(id).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.sick_form = res.data.data;
        }
      });
    },
    //点击诊断
    zhenDuan() {
      this.change = false;
      this.change_form = true;
      this.active = 3;
    },
    //提交诊断结果
    diaCommit() {
      if (
        this.sick_form.sick_result == "" ||
        this.sick_form.sick_result == null
      ) {
        this.$message("诊断结果不能为空！！！");
      } else {
        this.sick_form.doctor_src = this.$route.query.mName;
        console.log(this.sick_form.doctor_src);
        diagnoseCommit(this.sick_form).then((res) => {
          if (res.status === 200) {
            this.$message.success("诊断已完成");
            this.$router.push({
              name: "TaskDoctor",
            });
          } else {
            this.$message.success("请退出后重新尝试");
          }
        });
      }
    },
    goBack() {
      this.$router.push({
        name: "TaskDoctor",
      });
    },
  },
};
</script>
<style scoped lang="less">
.zhen-btn {
  cursor: pointer;
}
.table-op {
  padding: 10vh 0;
  padding-left: 12vw;
}
.my-label {
  background: #e1f3d8;
}

.my-content {
  background: #fde2e2;
}
</style>
