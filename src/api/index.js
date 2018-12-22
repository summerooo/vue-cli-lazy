import axios from 'axios'
// import Qs from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 100000

axios.interceptors.request.use(
  config => {
    // if (config.method === 'post') {
    //   config.data = Qs.stringify(config.data)
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
