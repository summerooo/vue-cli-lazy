import axios from '../index'
const {api, hot} = require('@/dev').proxyTableApi
console.log(api, hot)

export const login = data => {
  return axios.post(api + '/login/verify', data)
}

export const hotMapData = data => {
  return axios.get(hot + '/data/asset/data/hangzhou-tracks.json', data)
}
