<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="层" width="95">
        <template slot-scope="scope">
          {{ scope.row.wall }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="纸张" width="95">
        <template slot-scope="scope">
          {{ scope.row.paper }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="颜色" width="95">
        <template slot-scope="scope">
          {{ scope.row.color }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="长" width="95">
        <template slot-scope="scope">
          {{ scope.row.length }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="宽" width="95">
        <template slot-scope="scope">
          {{ scope.row.width }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="高" width="95">
        <template slot-scope="scope">
          {{ scope.row.height }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="数量" width="95">
        <template slot-scope="scope">
          {{ scope.row.quantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="总价" width="95">
        <template slot-scope="scope">
          {{ scope.row.totalPrice }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名" width="95">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话" width="125">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="125">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteOrder(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import OrderApi from '@/api/order'

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
      OrderApi.getOrderList().then(response => {
        this.list = response
        this.listLoading = false
      })
    },

    // 删除
    deleteOrder(item) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        OrderApi.deleteOrder({
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
