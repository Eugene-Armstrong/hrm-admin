import axios from 'axios'

export async function getEmployeeList() {
  return await axios.get('http://localhost:9090/employees')
}

export function getExcelUploadApi() {
  return 'api/employees/excelUpload'
}
