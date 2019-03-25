<template>
  <div class="app-container">
    <el-form
      :model="searchCriteria"
      label-position="top"
      label-width="80px"
      size="small"
      class="hrm-search-form"
      inline>
      <el-form-item label="员工编号">
        <el-input
          v-model="searchCriteria.id"
          class="small-input"
          clearable/>
      </el-form-item>
      <el-form-item label="姓名/英文名">
        <el-input
          v-model="searchCriteria.name"
          class="small-input"
          clearable/>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select v-model="department.id" clearable>
          <el-option
            v-for="item in departmentsList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="searchCriteria.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          class="small-input"/>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input
          v-model="searchCriteria.mobilePhone"
          class="small-input"
          clearable/>
      </el-form-item>
      <el-form-item class="search-button-group">
        <el-button type="primary" size="small" @click="searchByCriteria">查询</el-button>
        <el-button size="small" @click="resetFilter">重置</el-button>
        <el-button type="success" @click="addNewEmployee">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :data="employeeList"
      element-loading-text="加载中"
      tooltip-effect="dark"
      border
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection" width="40" align="center"/>
      <el-table-column fixed label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tooltip content="编辑" effect="dark" placement="top">
            <el-button circle plain size="mini" icon="el-icon-edit" @click="updateEmployee(scope.row)"/>
          </el-tooltip>
          <el-tooltip content="删除" effect="dark" placement="top">
            <el-button
              type="danger"
              circle
              plain
              size="mini"
              icon="el-icon-delete"
              @click="deleteEmployee(scope.row.id, scope.row.name)"/>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="员工编号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="英文名" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.englishName }}
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column label="所属部门" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.department.name }}
        </template>
      </el-table-column>
      <el-table-column label="身份证" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.idCard }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="birthday" label="出生日期" min-width="140">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          {{ scope.row.birthday }}
        </template>
      </el-table-column>
      <el-table-column label="民族" min-width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.nationality }}
        </template>
      </el-table-column>
      <el-table-column label="籍贯" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.birthplace }}
        </template>
      </el-table-column>
      <el-table-column label="电话" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobilePhone }}
        </template>
      </el-table-column>
      <el-table-column label="月薪" min-width="110" align="center">
        <template slot-scope="scope">
          {{ toThousandslsFilter(scope.row.monthlySalary) }}
        </template>
      </el-table-column>
    </el-table>
    <update-dialog v-model="showDialog" :detail="employeeDetail" :departments="departmentsList" @reloadData="fetchEmployeeList"/>
    <create-dialog v-model="showCreateDialog" :departments="departmentsList" @reloadData="fetchEmployeeList"/>
    <pagination :total="total" :limit.sync="size" :page.sync="page" class="pagination" @pagination="fetchEmployeeList"/>
    <el-row type="flex" justify="end" class="button-panel" align="middle">
      <el-button
        :loading="downloadLoading"
        :disabled="multipleSelection.length === 0"
        type="primary"
        size="small"
        @click="exportSelectedItems(multipleSelection)">导出数据</el-button>
        <!--<el-button size="small" @click="exportSelectedItems([])">模板下载</el-button>-->
    </el-row>
  </div>
</template>

<script>
import UpdateDialog from './updateDialog'
import CreateDialog from '@/views/employee/createDialog'
import Pagination from '@/components/Pagination'
import employeesService from '@/api/employees'
import departmentsService from '@/api/departments'
export default {
  components: { Pagination, UpdateDialog, CreateDialog },
  data() {
    return {
      employeeList: [],
      employeeDetail: {},
      departmentsList: [],
      total: 0,
      page: 1,
      size: 10,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      showDialog: false,
      showCreateDialog: false,
      searchCriteria: {
        id: '',
        name: '',
        birthday: '',
        mobilePhone: ''
      },
      department: {
        id: ''
      }
    }
  },
  created() {
    this.fetchEmployeeList()
    this.getDepartmentList()
  },
  methods: {
    async searchByCriteria() {
      console.log('searchByCriteria', this.searchCriteria)
      if (this.department.id) {
        this.searchCriteria.department = this.department
      } else {
        delete this.searchCriteria.department
      }
      this.employeeList = await employeesService.searchEmployeeByCriteria(this.searchCriteria)
    },
    addNewEmployee() {
      this.showCreateDialog = true
    },
    async getDepartmentList() {
      this.departmentsList = await departmentsService.getDepartmentsList()
    },
    updateEmployee(employee) {
      this.employeeDetail = employee
      this.showDialog = true
    },
    async deleteEmployee(id) {
      this.$confirm('将永久删除该员工信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await employeesService.deleteEmployee(id)
        this.fetchEmployeeList()
        this.$message.success('删除成功')
      })
    },
    handleSelectionChange(multiSelection) {
      this.multipleSelection = multiSelection
      console.log('multiSelection', multiSelection)
    },
    resetFilter() {
      this.searchCriteria.id = ''
      this.searchCriteria.name = ''
      this.searchCriteria.department = { id: '' }
      this.searchCriteria.birthday = ''
      this.searchCriteria.mobilePhone = ''
    },
    uploadExcelSuccess({ results }) {
      this.employeeList = results
    },
    exportSelectedItems(multipleSelection) {
      const isExported = multipleSelection.length
      const fileName = isExported ? '导出员工信息' : '员工信息填写模板'
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = isExported
          ? ['员工编号', '姓名', '英文名', '性别', '所属部门', '身份证', '出生日期',
            '民族', '籍贯', '手机', '月薪']
          : ['姓名', '英文名', '性别', '所属部门', '身份证', '出生日期',
            '民族', '籍贯', '手机', '月薪']
        const filterVal = isExported
          ? ['id', 'name', 'englishName', 'gender', 'department', 'idCard', 'birthday',
            'nationality', 'birthplace', 'mobilePhone', 'monthlySalary']
          : ['name', 'englishName', 'gender', 'department', 'idCard', 'birthday',
            'nationality', 'birthplace', 'mobilePhone', 'monthlySalary']
        const data = this.formatJson(filterVal, multipleSelection)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: fileName
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => j === 'department' ? v[j].name : v[j]))
    },
    toThousandslsFilter(num) {
      return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    },
    async fetchEmployeeList() {
      this.listLoading = true
      this.employeeList = await employeesService.getEmployeesList()
      this.total = this.employeeList.length
      this.listLoading = false
    }
  }
}
</script>

<style lang="scss">
  .app-container {
    .hrm-search-form{
      .el-form-item__label{
        line-height: 19px;
        font-size: 13px;
        padding-bottom: 3px;
      }
    }
    .search-button-group {
      padding-top: 22px;
    }
    .small-input{
      width: 160px;
    }
    .pagination-container{
      margin-bottom: 30px;
    }
    .button-panel {
      position:fixed;
      z-index: 10;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      padding-right: 15px;
      border-top: 1px solid #cccccc;
      background-color: rgba(255,255,255,1);
      .el-button {
        margin-left: 10px;
      }
    }
  }
</style>
