<template>
  <div class="app-container">
    <el-form
      ref="dataForm"
      :model="copyDetail"
      :rules="rules"
      label-position="right"
      label-width="80px"
      size="small"
      status-icon>
      <el-form-item label="姓名" prop="name" class="formStyle">
        <el-input v-model="copyDetail.name"/>
      </el-form-item>
      <el-form-item label="英文名" prop="englishName" class="formStyle">
        <el-input v-model="copyDetail.englishName"/>
      </el-form-item>
      <el-form-item label="所属部门" prop="department" class="formStyle">
        <el-select v-model="copyDetail.department.name">
          <el-option
            v-for="item in depOptions"
            :key="item.depNo"
            :label="item.depName"
            :value="item.depName"/>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="copyDetail.gender">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.value"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="民族" prop="nationality" class="formStyle">
        <el-input v-model="copyDetail.nationality"/>
      </el-form-item>
      <el-form-item label="籍贯" prop="birthplace" class="formStyle">
        <el-input v-model="copyDetail.birthplace"/>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="copyDetail.birthday"
          type="date"
          class="small-input"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard" class="formStyle">
        <el-input v-model="copyDetail.idCard"/>
      </el-form-item>
      <el-form-item label="手机" prop="mobilePhone" class="formStyle">
        <el-input v-model="copyDetail.mobilePhone"/>
      </el-form-item>
      <el-form-item label="月薪" prop="monthlySalary" class="formStyle">
        <el-input v-model="copyDetail.monthlySalary" type="number"/>
      </el-form-item>
    </el-form>
    <div class="formBtns">
      <el-button type="primary" class="formBtn" @click="onSubmit('copyDetail')">提交</el-button>
      <router-link :to="'/employee/index'">
        <el-button type="info" class="formBtn" >取消</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { getEmployeeById, updateEmployeeById, saveEmployee } from '../../api/employee'

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
      copyDetail: {
        name: '',
        birthday: '',
        mobilePhone: '',
        idCard: '',
        englishName: '',
        nationality: '',
        birthplace: '',
        monthlySalary: '',
        gender: '',
        department: {
          id: '',
          name: ''
        }

      },
      department: {},
      depOptions: [
        { depNo: 1, depName: 'CargoSmart' },
        { depNo: 2, depName: 'Iris4' },
        { depNo: 3, depName: 'GDSC' }
      ],
      id: this.$route.params.id,
      isEditAPIGroup: false,
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
  created() {
    if (this.id) {
      this.init()
    }
  },
  methods: {
    init() {
      this.listLoading = true
      getEmployeeById(this.id).then(response => {
        this.copyDetail = response.data
        this.listLoading = false
      }).catch(e => { console.log(e) })
    },
    onSubmit() {
      this.listLoading = true
      if (this.copyDetail.department.name === 'CargoSmart') {
        this.copyDetail.department.id = 1
      } else if (this.copyDetail.department.name === 'Iris4') {
        this.copyDetail.department.id = 2
      } else {
        this.copyDetail.department.id = 3
      }
      this.copyDetail.birthday = this.copyDetail.birthday.substr(0, 10)
      if (this.id) {
        console.log(this.copyDetail)
        updateEmployeeById(this.copyDetail).then(response => {
          this.listLoading = false
        }).catch(e => { console.log(e) })
      } else {
        console.log(this.copyDetail)
        saveEmployee(this.copyDetail).then(response => {
          this.listLoading = false
        }).catch(e => { console.log(e) })
      }
      this.$router.push({ path: '/employee/index' })
    },
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
  .formStyle {
    max-width: 600px;
  }
</style>
