import axios from '../index'
import {api} from '@/dev'
export const login = data => {
  return axios.post(api + '/login/verify', data)
}

export const hotMapData = data => {
  return axios.get('/hot/data/asset/data/hangzhou-tracks.json', data)
}
