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
              <el-select v-model="department.name">
                <el-option
                  v-for="item in departments"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="copyDetail.gender">
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"/>
              </el-select>
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
              <el-date-picker
                v-model="copyDetail.birthday"
                type="date"
                class="small-input"/>
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
              <el-input v-model="copyDetail.monthlySalary" type="number"/>
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
import employeesService from '@/service/employees-service'
export default {
  name: 'DetailDialog',
  props: {
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    },
    departments: {
      type: Array,
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
      departmentsList: [],
      genderOptions: [
        { value: '男' },
        { value: '女' }
      ],
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
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          await employeesService.updateEmployee({ ...this.copyDetail })
          this.showDialog = false
          this.$emit('reloadData')
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
