import { get } from '@/utils/httpHelper'
import * as api from '@/api/interface'

const getDepartmentsList = async(params) => {
  console.log(api.updateDepartments)
  const result = await get(api.updateDepartments)
  console.log(result)
  return result.data
}

export default {
  getDepartmentsList
}
