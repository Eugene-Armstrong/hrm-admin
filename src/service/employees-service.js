import { get } from '@/utils/httpHelper'
import * as api from '@/api/interface'

const getEmployeesList = async(params) => {
  console.log(api.getEmployeesURL)
  const result = await get(api.getEmployeesURL, params)
  console.log(result.data)
  return result.data
}

export default {
  getEmployeesList: getEmployeesList
}
