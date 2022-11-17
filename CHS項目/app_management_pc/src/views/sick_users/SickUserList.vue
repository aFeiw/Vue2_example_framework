<template>
  <div id="content">
    <el-card class="user-info">
      <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
        <el-form-item label="患者姓名:" class="screen" prop="sick_name">
          <el-input
            class="input-text"
            v-model="ruleForm.sick_name"
            placeholder="请输入患者姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户状态:" class="screen" prop="sick_status">
          <el-select
            v-model="ruleForm.sick_status"
            placeholder="请选择用户状态"
          >
            <el-option label="待就诊" :value="1"></el-option>
            <el-option label="已完成" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <div class="search-button">
          <el-button type="success" @click="searchForm">查询</el-button>
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="success" plain @click="newCharts" icon="el-icon-plus"
            >添加用户</el-button
          >
        </div>
      </el-form>
    </el-card>
    <el-table
      :data="sickList"
      style="width: 100%; margin: 20px 0"
      border
      stripe
    >
      <el-table-column prop="sick_name" label="患者姓名"> </el-table-column>
      <el-table-column prop="sick_id_card" label="身份证号"> </el-table-column>
      <el-table-column prop="sick_adress" label="居住地址"> </el-table-column>
      <el-table-column
        prop="sick_family_genetic"
        label="家庭遗传史"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="sick_describe"
        label="个人症状描述"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="sick_status" label="当前状态"> </el-table-column>

      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定要将此项数据删除吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <el-button
              class="delete-btn"
              size="mini"
              type="danger"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-dig"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
      :page-sizes="[3, 5, 6]"
      :current-page="ruleForm.pagenum"
      :page-size="ruleForm.pagesize"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
import { getSick } from "@/api/sick/index.js";
import { deleteSick } from "@/api/sick/index.js";
export default {
  props: {},
  data() {
    return {
      sickList: [],
      total: 0,
      ruleForm: {
        sick_name: "",
        sick_status: "",
        pagenum: 1,
        pagesize: 5,
      },
    };
  },
  created() {},
  mounted() {
    this.getSickList();
  },
  methods: {
    async getSickList() {
      const { data: res } = await getSick(this.ruleForm);
      console.log(res);
      res.data.filter((item) => {
        if (item.sick_status === 0) return (item.sick_status = "已完成");
        if (item.sick_status === 1) return (item.sick_status = "待就诊");
      });
      this.sickList = [...res.data];

      this.total = res.total;
    },
    handleSizeChange(size) {
      this.ruleForm.pagesize = size;
      this.getSickList();
    },
    handleCurrentChange(currentPage) {
      this.ruleForm.pagenum = currentPage;
      this.getSickList();
    },
    //编辑页面
    handleEdit(id) {
      console.log(id);
      this.$router.push({
        name: "updatesick",
        query: {
          id,
        },
      });
    },
    //新增页面
    newCharts() {
      //携带当前患者id
      this.$router.push({
        name: "insertsick",
      });
    },
    //删除
    async handleDelete(id) {
      const { data: res } = await deleteSick(id);
      console.log(res);
      if (res.status === 200) {
        this.$message.success(res.msg);
        this.pagenum = 1;
        this.getSickList();
      }
    },
    //查询操作
    searchForm() {
      console.log(this.ruleForm.sick_status);
      this.getSickList(this.ruleForm);
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交
    fromSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.achievementShow = true;
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.user-info {
  height: 16%;
  margin: 0 2% 0 2%;
  background: white;
  position: relative;

  .screen {
    float: left;
    width: 30%;
  }
}
.page-dig.el-pagination.is-background {
  position: absolute;
  bottom: 10%;
  left: 35%;
}
.search-button {
  position: absolute;
  top: 20%;
  right: 5%;
}

.input-text {
  width: 85%;
  float: left;
}
.four {
  padding-top: 1%;
}
.user-choose-inner {
  width: 80%;
  float: left;
}
.info-box {
  height: 55%;
  margin: 2%;
  background: white;
}
.el-card.user-info.is-always-shadow {
  position: relative;
}
.el-card.info-box.is-always-shadow {
  position: relative;
}

.page {
  position: absolute;
}
.delete-btn {
  margin-left: 1vw;
}
.btn {
  margin-bottom: 1vh;
  float: right;
  margin-right: 2vw;
}
</style>
