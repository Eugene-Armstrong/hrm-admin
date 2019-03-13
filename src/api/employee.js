import axios from 'axios'

export async function getEmployeeList() {
  return await axios.get('http://luje-w10:9090/employees')
}

export async function deleteEmployeeById(id) {
  return await axios.delete('http://luje-w10:9090/employees/' + id)
}

export async function getEmployeeById(id) {
  return await axios.get('http://luje-w10:9090/employees/' + id)
}

export async function updateEmployeeById(data) {
  return await axios.put('http://luje-w10:9090/employees/' + data.id, data)
}

export async function saveEmployee(data) {
  return await axios.post('http://luje-w10:9090/employees', data)
}

export function getExcelUploadApi() {
  return 'api/employees/excelUpload'
}
