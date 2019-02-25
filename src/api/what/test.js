import axios from '../index'
const { api } = require('@/dev')

// 获取各种协议
export const agreement = data => {
  return axios.post(`${api}/agreement`, data)
}
