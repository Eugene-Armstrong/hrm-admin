<template>
  <div class="app-container">
    <el-form :model="searchCriteria" label-position="top" label-width="80px" size="small" inline>
      <el-form-item label="员工编号">
        <el-input
          v-model="searchCriteria.empNo"
          class="small-input"
          clearable/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input
          v-model="searchCriteria.name"
          class="small-input"
          clearable/>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-input
          v-model="searchCriteria.department"
          class="small-input"
          clearable/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="searchCriteria.birthDate"
          type="date"
          class="small-input"/>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input
          v-model="searchCriteria.phone"
          class="small-input"
          clearable/>
      </el-form-item>
      <el-form-item class="search-button-group">
        <el-button type="primary" size="small">查询</el-button>
        <el-button size="small" @click="resetFilter">重置</el-button>
        <el-button type="success">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :data="list"
      element-loading-text="加载中"
      tooltip-effect="dark"
      border
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection" min-width="15%" align="left"/>
      <el-table-column fixed label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tooltip content="编辑" effect="dark" placement="top">
            <el-button circle plain size="mini" icon="el-icon-edit"/>
          </el-tooltip>
          <el-tooltip content="删除" effect="dark" placement="top">
            <el-button type="danger" circle plain size="mini" icon="el-icon-delete"/>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编号">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="英文名" min-width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nameEn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column label="所属部门" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.department }}
        </template>
      </el-table-column>
      <el-table-column label="身份证" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.idCard }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="出生日期" min-width="140">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.birthDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="民族" min-width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.nationality }}
        </template>
      </el-table-column>
      <el-table-column label="籍贯" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.nativePlace }}
        </template>
      </el-table-column>
      <el-table-column label="电话" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="月薪" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.salary }}
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :limit.sync="size" :page.sync="page" class="pagination" @pagination="fetchData"/>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employee'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      page: 1,
      size: 20,
      listLoading: true,
      searchCriteria: {
        empNo: '',
        name: '',
        department: '',
        birthDate: '',
        phone: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSelectionChange(multiSelection) {
      console.log('multiSelection', multiSelection)
    },
    resetFilter() {
      this.searchCriteria.empNo = ''
      this.searchCriteria.name = ''
      this.searchCriteria.department = ''
      this.searchCriteria.birthDate = ''
      this.searchCriteria.phone = ''
    },
    async fetchData() {
      this.listLoading = true
      await getEmployeeList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
  .app-container {
    .el-form-item__label{
      line-height: 19px;
      font-size: 13px;
      padding-bottom: 0;
    }
    .search-button-group {
      padding-top: 19px;
    }
    .small-input{
      width: 160px;
    }
  }
</style>
