/* eslint-disable no-undef */
import axios from 'axios'
// const addAuthenticationHeader = async () => {
//   asyncconst userInfo = getUserInfo()
//   let authorization = ''
//
//   if (userInfo) {
//     authorization = 'Bearer ' + userInfo.token
//   }
//
//   return {
//     Authorization: authorization
//   }
// }

export const get = async(url, params) => {
  return await axios.get(url, {
    // headers: await addAuthenticationHeader(),
    params: {
      ...params
    }
  })
}

export const post = async(url, params) => {
  return await axios.request({
    // headers: await addAuthenticationHeader(),
    url: url,
    method: 'POST',
    data: params
  })
}

export const remove = async(url) => {
  return await axios.request({
    url: url,
    method: 'DELETE'
  })
}
