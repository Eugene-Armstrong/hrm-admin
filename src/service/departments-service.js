import { get } from '@/utils/httpHelper'
import * as api from '@/api/interface'

const getDepartmentsList = async(params) => {
  const result = await get(api.updateDepartments)
  return result.data
}

export default {
  getDepartmentsList
}
