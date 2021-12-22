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
      <el-table-column align="center" label="姓名" width="95">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司" width="95">
        <template slot-scope="scope">
          {{ scope.row.company }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" width="95">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式" width="95">
        <template slot-scope="scope">
          {{ scope.row.contact }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="95">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="附件" width="280">
        <template slot-scope="scope">
          <a target="_blank" :href="$rootApi + '/' + scope.row.file" v-if="scope.row.file">
            <el-link type="primary">{{ $rootApi + '/' + scope.row.file }}</el-link>
          </a>
        </template>
      </el-table-column>

      <el-table-column align="center" label="询问内容">
        <template slot-scope="scope">
          {{ scope.row.enquiry }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import EmailApi from '@/api/email'

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
      EmailApi.getEmailList().then(response => {
        this.list = response
        this.listLoading = false
      })
    }
  }
}
</script>
