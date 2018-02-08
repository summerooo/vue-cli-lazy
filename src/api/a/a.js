import axios from '../index'

export const login = data => {
  return axios.post('/login/verify', data)
}
