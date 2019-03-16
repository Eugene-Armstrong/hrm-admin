<template>
  <div style="display: inline-block;margin-left: 10px;">
    <el-upload
      ref="upload"
      :before-upload="beforeFileUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadFail"
      :show-file-list="false"
      :action="uploadApi"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
      <el-button type="primary" size="small">上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import employeesApi from '@/api/employees'
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: undefined,
      excelData: {
        header: null,
        results: null
      },
      uploadApi: employeesApi.getExcelUploadApi
    }
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleRemove(file, fileList) {
      console.log('remove: ', file, fileList)
    },
    handlePreview(file) {
      console.log('preview: ', file)
    },
    handleProgress() {
      this.loading = this.$loading({
        lock: true,
        text: 'Excel文件上传并解析中，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    beforeFileUpload(file) {
      const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isXls = file.type === 'application/vnd.ms-excel'
      const isSizeLimited = file.size / 1024 / 1024 < 8

      if (!isXlsx && !isXls) {
        this.$message.error('文件后缀必须为 .xlsx 或 .xls')
      }
      if (!isSizeLimited) {
        this.$message.error('文件大小不能超过8MB')
      }
      console.log('文件对象： ', file)
      return (isXlsx || isXls) && isSizeLimited
    },
    handleUploadSuccess(res, files) {
      this.loading.close()
      this.$message.close()
      if (!res) {
        this.$message.error('系统内部错误')
        return
      }
      console.log('upload success response: ', res)
      this.$message({
        message: '文件上传成功',
        type: 'success'
      })
      const header = ''
      this.generateData({ header, res })
    },
    handleUploadFail(err, file, fileList) {
      this.loading.close()
      this.$message.close()
      console.log('upload fail response', err)
      this.$message.error(err)
    }
  }
}
</script>

<style>
  .ect-excel-upload-file-tip{
    line-height: 22px;
    max-height: 300px;
    overflow-y: auto;
  }
</style>
