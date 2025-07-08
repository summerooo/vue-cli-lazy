

import axios from './index'
import proxyApi from '@/dev.js'
const { api } = proxyApi

// 原型1-登录人数和项目个数
export const quantitiesOfPage1 = data => {
  return axios.get(`${api}/open/display/base/quantitiesOfPage1`, { params: data })
}

// 原型2-项目轮播接口
export const findProjectWithMisc = data => {
  return axios.get(`${api}/open/display/base/findProjectWithMisc`, { params: data })
}
// 任务列表查询
export const findDisplayTask = data => {
  return axios.get(`${api}/open/display/base/findDisplayTask`, { params: data })
}






