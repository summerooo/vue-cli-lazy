import axios from '../index'

export const login = data => {
  return axios.get('/api/auth/login', data)
}
