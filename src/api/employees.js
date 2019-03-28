import { get, remove, post, put } from '@/utils/httpHelper'

const employeesUrl = `${process.env.BASE_API}/employee`

const getEmployeesList = async(params) => {
  const result = await get(employeesUrl, params)
  return result.data
}

const deleteEmployee = async(id) => {
  const result = await remove(`${employeesUrl}/${id}`)
  return result.data
}

const updateEmployee = async(params) => {
  await put(employeesUrl, params)
}

const addEmployee = async(employee) => {
  const result = await post(employeesUrl, employee)
  return result.data
}

const searchEmployeeByCriteria = async(criteria) => {
  const result = await post(`${employeesUrl}/list`, criteria)
  return result.data.content
}

const getExcelUploadApi = process.env.BASE_API + '/employees/excelUpload'

export default {
  getEmployeesList,
  deleteEmployee,
  updateEmployee,
  addEmployee,
  searchEmployeeByCriteria,
  getExcelUploadApi
}
