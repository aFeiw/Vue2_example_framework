<template>
  <div class="jobBox">
    <!-- 数据展示频道 -->
    <div>
      <div class="messageBox">
        <ul @click="itemList('全部')">
          <li class="firstLi">全部医生</li>
          <p>{{ numTotal }}</p>
        </ul>
        <ul @click="itemList('内科')">
          <li>内科</li>
          <p>{{ neesToal }}</p>
        </ul>
        <ul @click="itemList('外科')">
          <li>外科</li>
          <p>{{ preToal }}</p>
        </ul>
        <ul @click="itemList('理疗')">
          <li>理疗</li>
          <p>{{ tender }}</p>
        </ul>
        <ul @click="itemList('家庭医生')">
          <li>家庭医生</li>
          <p>{{ startTender }}</p>
        </ul>
      </div>
    </div>
    <el-table :data="allData" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="doctor_worker_number" label="工号">
      </el-table-column>
      <el-table-column prop="doctor_name" label="姓名"> </el-table-column>
      <el-table-column prop="doctor_phone" label="联系方式"> </el-table-column>
      <el-table-column prop="doctor_deaparment" label="科室"> </el-table-column>
      <el-table-column prop="doctor_education" label="毕业学院">
      </el-table-column>
      <el-table-column prop="doctor_deaparment" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.doctor_deaparment === '家庭医生'"
            type="primary"
            class="the-detail-p"
            @click="detachDoctor(scope.row.id)"
            >派遣</el-button
          >
          <el-button
            v-else
            size="mini"
            type="success"
            @click="PreliminaryClinical(scope.row.doctor_name)"
            class="the-detail"
            >在线预诊</el-button
          ></template
        >
      </el-table-column>
    </el-table>
    <el-drawer title="派遣任务" :visible.sync="drawer" size="38%">
      <span>
        <el-transfer
          v-model="value"
          @right-check-change="handleChange"
          :data="data"
          :titles="['备选患者', '确定患者名单']"
        >
        </el-transfer>
        <el-button class="iii-ctn" type="primary" @click="submitAssagned()"
          >一键指派</el-button
        >
      </span>
    </el-drawer>
  </div>
</template>

<script>
import { getDoctorAll } from "@/api/doctor/index.js";
import { getSickNeed } from "@/api/task/index.js";
import { assignedDoctor } from "@/api/task/index.js";
import getArray from "@/assets/js/getArray.js";
export default {
  data() {
    return {
      data: null,
      value: [],
      allData: [],
      assignedId: {
        id: [],
        //记录医生id
        tid: 0,
      },
      // 总数据
      numTotal: 0,
      //外科
      neesToal: 0,
      //内科
      preToal: 0,
      //理疗
      tender: 0,
      //家庭医生
      startTender: 0,
      page: {
        pagenum: 1,
        pagesize: 10,
        doctor_deaparment: "",
      },
      drawer: false,
    };
  },
  async mounted() {
    await this.getList();
    //  按照项目状态0-6过滤数组
    this.neesToal = getArray.getToalNum(this.allData, "内科");
    this.preToal = getArray.getToalNum(this.allData, "外科");
    this.tender = getArray.getToalNum(this.allData, "理疗");
    this.startTender = getArray.getToalNum(this.allData, "家庭医生");
  },
  methods: {
    async getList() {
      // 发送请求，获取列表数据
      const { data: res } = await getDoctorAll(this.page);
      if (res.status === 200) {
        res.data.filter((item) => {
          if (item.doctor_deaparment === 0)
            return (item.doctor_deaparment = "内科");
          if (item.doctor_deaparment === 1)
            return (item.doctor_deaparment = "外科");
          if (item.doctor_deaparment === 2)
            return (item.doctor_deaparment = "理疗");
          if (item.doctor_deaparment === 3);
          return (item.doctor_deaparment = "家庭医生");
        });
        this.allData = res.data;
      }
      // 获取医生的总数
      this.numTotal = this.allData.length;
    },
    //单个切换
    async itemList(name) {
      console.log(name);
      if (name == "全部") {
        return this.getList();
      }
      await this.getList();
      let newDate = this.allData.filter((item) => {
        return item.doctor_deaparment == name;
      });
      this.allData = [];
      this.allData = [...newDate];
    },
    //派遣医生
    async detachDoctor(id) {
      console.log(id);
      this.assignedId.tid = id;
      //获取待派遣用户
      console.log("this is a test");
      const { data: res } = await getSickNeed();
      console.log(res);
      if (res.status === 200) {
        let list = [];
        let data = [...res.data];
        console.log(data);
        for (let i = 0; i <= data.length - 1; i++) {
          list.push({
            key: data[i].id,
            label: `患者:${data[i].sick_name}`,
          });
        }
        // console.log(list);
        this.data = list;
      }
      this.drawer = true;
    },
    //检测穿梭框右侧数据变化，遍历取得id
    handleChange() {
      for (const id of this.value) {
        //收集患者id
        this.assignedId.id.push(id);
      }
    },
    //点击提交待派遣用户
    async submitAssagned() {
      console.log(this.assignedId.id.length);
      if (this.assignedId.id.length === 0) {
        this.$message("请确定备选人");
      } else {
        const { data: res } = await assignedDoctor(this.assignedId);
        if (res.status === 200) {
          this.$message.success(res.msg);
          return (this.drawer = false);
        }
      }
    },
    //在线预诊
    PreliminaryClinical(mName) {
      console.log(mName);
      this.$router.push({
        name: "Diagnose",
        query: {
          mName,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/button.el-button.iii-ctn.el-button--primary {
  position: absolute;
  bottom: 8vh;
  right: 10vh;
}
/deep/th.is-leaf.el-table__cell {
  background-color: #f1f1f1;
}
.the-detail {
  margin-left: 30%;
}
.the-detail-p {
  margin-left: 36%;
}
.messageBox {
  width: 100%;
  height: 15vh;
  float: left;
  list-style: none;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  ul:first-child {
    position: relative;
    display: inline-block;
    width: 16vw;
    height: 12vh;
    background-color: #81d3f8;
    margin-right: 2vw;
    list-style: none;
    overflow: hidden;
    .firstLi {
      position: absolute;
      left: 1vw;
      color: #fff;
      font-weight: 500;
    }
  }
  ul {
    position: relative;
    display: inline-block;
    width: 10vw;
    height: 12vh;
    background-color: #81d3f8;
    margin: 0 2vw;
    list-style: none;
    overflow: hidden;
    border-radius: 10px;
    li {
      position: absolute;
      left: 1vw;
      color: #fff;
      font-weight: 500;
      margin-top: 2px;
    }
    p {
      position: absolute;
      right: 0;
      bottom: 0px;
      color: #fff;
      font-weight: 800;
      font-size: 25px;
      margin-right: 10px;
    }
  }
}
</style>




