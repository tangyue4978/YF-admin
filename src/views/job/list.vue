<template>
  <div class="app-container">
    <el-button style="margin-bottom: 20px;" type="primary" @click="toAddJob">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="职位">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="级别">
        <template slot-scope="scope">
          {{ scope.row.executive }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="全职">
        <template slot-scope="scope">
          {{ scope.row.fullTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="地址">
        <template slot-scope="scope">
          {{ scope.row.locale }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工作内容">
        <template slot-scope="scope">
          {{ scope.row.subTitle }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="资格">
        <template slot-scope="scope">
          {{ scope.row.qualification }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="经验">
        <template slot-scope="scope">
          {{ scope.row.experience }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="年龄">
        <template slot-scope="scope">
          {{ scope.row.candidate }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="月薪">
        <template slot-scope="scope">
          {{ scope.row.monthlySalary }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="职责" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <template v-if="scope.row.responsibilities">
            <span v-html="JSON.parse(scope.row.responsibilities).join('<br/>')"></span>
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" label="要求" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <template v-if="scope.row.requirements">
            <span v-html="JSON.parse(scope.row.requirements).join('<br/>')"></span>
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteJob(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import JobApi from '@/api/job'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      JobApi.getJobList().then(response => {
        this.list = response
        this.listLoading = false
      })
    },

    // 新建招聘
    toAddJob() {
      this.$router.push('/job/add')
    },

    // 删除
    deleteJob(item) {
      this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        JobApi.deleteJob({
          id: item.id
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.el-tooltip__popper {
  max-width: 800px;
}
</style>

