import { get } from '@/utils/httpHelper'

const getDepartmentsList = async(params) => {
  const result = await get(`${process.env.BASE_API}/departments`)
  return result.data
}

export default {
  getDepartmentsList
}
