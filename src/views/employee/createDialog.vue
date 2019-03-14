<template>
  <div>
    <el-dialog
      :visible.sync="showDialog"
      title="新增员工信息"
      width="600px"
      class="hrm-detail-dialog"
      @close="resetVisible">
      <el-form
        ref="dataForm"
        :model="newEmployee"
        :rules="rules"
        label-position="right"
        label-width="80px"
        size="small"
        status-icon>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="newEmployee.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名" prop="englishName">
              <el-input v-model="newEmployee.englishName"/>
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
              <el-select v-model="newEmployee.gender">
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
              <el-input v-model="newEmployee.nationality"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="籍贯" prop="birthplace">
              <el-input v-model="newEmployee.birthplace"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                v-model="newEmployee.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                class="small-input"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="newEmployee.idCard"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机" prop="mobilePhone">
              <el-input v-model="newEmployee.mobilePhone"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月薪" prop="monthlySalary">
              <el-input v-model="newEmployee.monthlySalary" type="number"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="showDialog = false">取消</el-button>
        <el-button type="success" size="small" @click="confirm">新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import employeesService from '@/service/employees-service'

export default {
  name: 'CreateDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    departments: {
      type: Array,
      default: () => {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: false,
      newEmployee: {
        name: '',
        englishName: '',
        gender: '男',
        nationality: '',
        department: {
          id: 1
        },
        birthplace: '',
        birthday: '',
        idCard: '',
        mobilePhone: '',
        monthlySalary: 8000
      },
      department: {
        name: ''
      },
      genderOptions: [
        { value: '男' },
        { value: '女' }
      ],
      rules: {
        name: [{ required: true, message: '请填写姓名', trigger: ['change', 'blur'] }],
        englishName: [{ required: true, message: '请填写英文名', trigger: ['change', 'blur'] }],
        nationality: [{ required: true, message: '请填写民族', trigger: ['change', 'blur'] }],
        birthplace: [{ required: true, message: '请填写籍贯', trigger: ['change', 'blur'] }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: ['change', 'blur'] }],
        idCard: [{ required: true, message: '请选择出生日期', trigger: ['change', 'blur'] }],
        mobilePhone: [{ required: true, message: '请填写手机号', trigger: ['change', 'blur'] }],
        monthlySalary: [{ required: true, message: '请填写月薪', trigger: ['change', 'blur'] }]
      }
    }
  },
  watch: {
    async value(newValue) {
      if (newValue) {
        this.showDialog = newValue
        this.department.name = this.departments[0].name
      }
    }
  },
  methods: {
    resetVisible() {
      this.showDialog = false
      this.newEmployee.name = ''
      this.newEmployee.englishName = ''
      this.newEmployee.gender = '男'
      this.newEmployee.nationality = ''
      this.newEmployee.department.id = 1
      this.newEmployee.birthplace = ''
      this.newEmployee.birthday = ''
      this.newEmployee.idCard = ''
      this.newEmployee.mobilePhone = ''
      this.newEmployee.monthlySalary = 8000
      this.$refs['dataForm'].clearValidate()
      this.$emit('reloadData')
      this.$emit('input', false)
    },
    confirm() {
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          this.newEmployee.department.id = this.department.name === 'CargoSmart'
            ? 1 : this.department.name
          console.log('newEmployee', this.newEmployee)
          await employeesService.addEmployee(this.newEmployee)
          this.$message.success('员工新增成功')
          this.resetVisible()
        }
      })
    }
  }
}
</script>
