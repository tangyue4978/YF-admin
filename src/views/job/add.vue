<template>
  <div class="container">
    <el-form ref="gallery" :model="jobObj" label-position="right" label-width="100px">
      <el-form-item label="职位">
        <el-input v-model="jobObj.title" placeholder="职位" />
      </el-form-item>
      <el-form-item label="级别">
        <el-input v-model="jobObj.executive" placeholder="级别" />
      </el-form-item>
      <el-form-item label="全职">
        <el-input v-model="jobObj.fullTime" placeholder="全职" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="jobObj.locale" placeholder="地址" />
      </el-form-item>
      <el-form-item label="工作内容">
        <el-input v-model="jobObj.subTitle" placeholder="工作内容" />
      </el-form-item>
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
      <template v-for="(item, index) in responsibilitiesJson">
        <el-form-item :key="'responsibilities' + index" :label="index ? '' : '职责'">
          <el-input v-model="responsibilitiesJson[index]" class="extra_input" placeholder="职责" />
          <div class="extra_box">
            <i v-if="index === responsibilitiesJson.length - 1" class="el-icon-circle-plus" @click="addJson('responsibilitiesJson')" />
            <i class="el-icon-remove" @click="deleteJson('responsibilitiesJson', index)" />
          </div>
        </el-form-item>
      </template>
      <template v-for="(item, index) in requirementsJson">
        <el-form-item :key="'requirements' + index" :label="index ? '' : '要求'">
          <el-input v-model="requirementsJson[index]" class="extra_input" placeholder="要求" />
          <div class="extra_box">
            <i v-if="index === requirementsJson.length - 1" class="el-icon-circle-plus" @click="addJson('requirementsJson')" />
            <i class="el-icon-remove" @click="deleteJson('requirementsJson', index)" />
          </div>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button @click="$router.go(-1)">取 消</el-button>
        <el-button type="primary" @click="addJob">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import JobApi from '@/api/job'

export default {
  name: 'JobAdd',

  data() {
    return {
      jobObj: {},
      categoryList: ['Diecut box', 'Rsc box', 'Osc box', 'Tray box', 'Artcard box'],
      file: null,
      responsibilitiesJson: [''], // 职责
      requirementsJson: [''] // 要求
    }
  },

  methods: {
    // 添加职责、要求
    addJson(param) {
      this[param].push('')
    },

    // 删除职责、要求
    deleteJson(param, index) {
      this[param].splice(index, 1)
    },

    // 添加招聘
    addJob() {
      const responsibilitiesJson = JSON.stringify(this.responsibilitiesJson)
      const requirementsJson = JSON.stringify(this.requirementsJson)
      this.jobObj.responsibilities = responsibilitiesJson
      this.jobObj.requirements = requirementsJson

      JobApi.addJob(this.jobObj).then((res) => {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 1500)
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 500px;
  margin-top: 20px;
}

.extra_input {
  position: relative;
}

.extra_box {
  height: 40px;
  position: absolute;
  top: 0;
  left: 450px;
  display: flex;
  align-items: center;
}

.extra_box i {
  font-size: 24px;
  cursor: pointer;
}

.extra_box i:first-child {
  margin-right: 10px;
}
</style>
