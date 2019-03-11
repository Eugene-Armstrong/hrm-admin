import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/employee/list',
    method: 'get',
    params
  })
}

export function getExcelUploadApi() {
  return 'api/employee/excelUpload'
}
