import { get, remove, post, put } from '@/utils/httpHelper'
import * as api from '@/api/interface'

const getEmployeesList = async(params) => {
  console.log(api.getEmployeesURL)
  const result = await get(api.getEmployeesURL, params)
  console.log(result.data)
  return result.data
}

const deleteEmployee = async(id) => {
  console.log(api.deleteEmployeesURL)
  const result = await remove(`${api.getEmployeesURL}/${id}`)
  console.log(result.data)
  return result.data
}

const updateEmployee = async(params) => {
  console.log(api.updateEmployeesURL)
  await put(api.updateEmployeesURL, params)
}
const addEmployee = async(employee) => {
  const result = await post(api.getEmployeesURL, employee)
  return result.data
}

export default {
  getEmployeesList,
  deleteEmployee,
  updateEmployee,
  addEmployee
}
