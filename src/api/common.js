

import axios from './index'

// 格式为formData
export const formData = data => {
  let body = new FormData()
  for (let i in data) {
    body.append(i, data[i])
  }
  return body
}
// formData给 post 请求包一个 params: {}
export const postParams = data => {
  let body = new URLSearchParams()
  body.append('params',JSON.stringify(data))
  return body
}
// 将 {a: 1, b: 1} 格式为 ?a=1&b=1
export const getParams = data => {
  let url = '?'
  for (let i in data) data[i] ? url += `${i}=${data[i] || ''}&` : ''
  return url
}
// 将need字段为 ['a', 'b'] 的 根据 data {a:1,b:1,c:1} 中的数据 格式为  {a:1, b:1}
export const getNeedData = (need = [], data = {}) => {
  let obj = {}
  for (let i of need) {
    // console.log(i, data[i])
    obj[i] = data[i]
  }
  return obj
}
