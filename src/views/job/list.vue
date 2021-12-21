<template>
  <div class="app-container">
    <el-button style="margin-bottom: 20px;" type="primary" @click="dialogVisible = true">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
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

      <el-table-column align="center" label="职责">
        <template slot-scope="scope">
          {{ scope.row.responsibilities }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="要求">
        <template slot-scope="scope">
          {{ scope.row.requirements }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteJob(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="画廊添加"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="500"
      center
    >
      <el-form ref="gallery" :model="jobObj" label-position="right" label-width="80px">
        <el-form-item label="资格">
          <el-input v-model="jobObj.qualification" placeholder="资格" />
        </el-form-item>
        <el-form-item label="经验">
          <el-input v-model="jobObj.experience" placeholder="经验" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="jobObj.candidate" placeholder="年龄" />
        </el-form-item>
        <el-form-item label="月薪">
          <el-input v-model="jobObj.monthlySalary" placeholder="月薪" />
        </el-form-item>
        <el-form-item label="职责">
          <el-input v-model="jobObj.responsibilities" type="textarea" placeholder="职责" />
        </el-form-item>
        <el-form-item label="要求">
          <el-input v-model="jobObj.requirements" type="textarea" placeholder="要求" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addJob">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import JobApi from '@/api/job'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      jobObj: {},
      categoryList: ['Diecut box', 'Rsc box', 'Osc box', 'Tray box', 'Artcard box'],
      file: null
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

    // 文件
    fileChange(e) {
      const files = e.target.files
      if (!files.length) return

      for (let i = 0; i < files.length; i++) {
        this.file = files[i]
      }
    },

    // 添加画廊
    addJob() {
      JobApi.addJob(this.jobObj).then((res) => {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.fetchData()
      })
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

