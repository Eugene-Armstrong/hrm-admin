import { get, remove } from '@/utils/httpHelper'
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

export default {
  getEmployeesList,
  deleteEmployee
}
