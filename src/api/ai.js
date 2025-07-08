import { useSSE } from './index'
import axios from './index'
import proxyApi from '@/dev.js'
const { api } = proxyApi
// ai发消息
export const sendMessageToAgent = ({url, data, callback, signal}) => {
	return useSSE({url, data, callback, signal})
}

// 检查是否token过期
export const userCheck = data => {
  return axios.get(`${api}/user/check`, { params: data })
}


