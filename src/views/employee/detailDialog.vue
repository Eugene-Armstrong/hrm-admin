<template>
  <div>
    <el-dialog
      :visible.sync="showDialog"
      title="编辑员工信息"
      width="600px"
      class="hrm-detail-dialog"
      @close="resetVisible">
      <el-form
        ref="dataForm"
        :model="copyDetail"
        :rules="rules"
        label-position="right"
        label-width="80px"
        size="small"
        status-icon>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="copyDetail.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名" prop="englishName">
              <el-input v-model="copyDetail.englishName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="department">
              <el-input v-model="department.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-input v-model="copyDetail.gender"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族" prop="nationality">
              <el-input v-model="copyDetail.nationality"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="籍贯" prop="birthplace">
              <el-input v-model="copyDetail.birthplace"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-input v-model="copyDetail.birthday"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="copyDetail.idCard"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机" prop="mobilePhone">
              <el-input v-model="copyDetail.mobilePhone"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月薪" prop="monthlySalary">
              <el-input v-model="copyDetail.monthlySalary" type="tel"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="showDialog = false">取消</el-button>
        <el-button type="primary" size="small" @click="confirm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'DetailDialog',
  props: {
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: Boolean,
      default: false
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // const validFacilityCode = (rule, value, callback) => {
    //   if (value) {
    //     if (value.length !== 5) {
    //       callback(new Error('请填写长度为5位码头代码'))
    //     }
    //   }
    //   callback()
    // }
    return {
      showDialog: false,
      copyDetail: {},
      department: {},
      rules: {
      }
    }
  },
  watch: {
    async value(newValue) {
      if (newValue) {
        this.copyDetail = _.cloneDeep(this.detail)
        this.department = _.cloneDeep(this.copyDetail.department)
        console.log('copyDetail', this.copyDetail)
        this.showDialog = newValue
      }
    }
  },
  methods: {
    resetVisible() {
      this.$refs['dataForm'].clearValidate()
      this.$emit('reloadData')
      this.$emit('input', false)
    },
    confirm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          //
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .hrm-detail-dialog{
    .el-input__inner{
      width: 168px;
    }
  }
</style>
