import axios from '../index'
import proxyApi from '/@/dev.js'
const { api } = proxyApi
// login
export const login = data => {
  return axios.post(`${api}/mail_list`, data)
}
