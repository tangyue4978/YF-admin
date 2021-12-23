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
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="图片">
        <template slot-scope="scope">
          <el-image style="height: 100px;" :src="$rootApi + '/' + scope.row.url"></el-image>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteOrder(scope.row)">删除</el-button>
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

      <el-form ref="gallery" :model="galleryObj" label-position="right" label-width="80px">
        <el-form-item label="画廊类型">
          <el-select v-model="galleryObj.category" placeholder="请选择画廊类型">
            <el-option v-for="item in categoryList" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="画廊图片">
          <div class="file_input_box">
            <input class="file_input" type="file" @change="fileChange">
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGallery">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GalleryApi from '@/api/gallery'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      galleryObj: {},
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
      GalleryApi.getGalleryList().then(response => {
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
    addGallery() {
      const _formData = new FormData()
      const obj = this.galleryObj

      Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Array) {
          obj[key].forEach((item) => {
            _formData.append(key, item)
          })
          return
        }
        _formData.append(key, obj[key])
      })

      if (this.file) {
        _formData.append('file', this.file, this.file.name)
      }

      GalleryApi.addGallery(_formData).then((res) => {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.fetchData()
        this.file = null
        this.galleryObj = {}
      })
    },

    // 删除
    deleteOrder(item) {
      this.$confirm('此操作将永久删除该画廊, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        GalleryApi.deleteGallery({
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
.el-select {
  width: 100%;
}

.file_input_box {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
}
</style>

