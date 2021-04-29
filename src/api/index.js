import axios from 'axios'
// import { Message } from 'element-ui'
// import Router from '../router'
import { state } from '../store'
import { nextTick } from 'vue'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 100000

axios.interceptors.request.use(
  config => {
    //强行中断请求
    config.cancelToken = axios.CancelToken(cancel => state.requestList.push(cancel))
    // console.log(state.requestList)
    return config
  },
  err => Promise.reject(err)
)

let antiShake = async message => {
  await nextTick()
  let currentTime = new Date().getTime()
  let timer = +sessionStorage.getItem('timer')
  if (!timer || (currentTime - timer >= 1500)) {
    // Message({
    //   showClose: true,
    //   message: message
    // })
    // console.log(message)
    sessionStorage.setItem('timer', currentTime)
  }
}
axios.interceptors.response.use(
  response => {
    try {
      if (response.data || response.code === 0 || response.data.code === 0) {
          antiShake(response.msg || response.data.msg)
          return response
        } else {
        antiShake(response.msg || response.data.msg)
        return false
      }
    } catch (error) {
      // console.log(error)
      antiShake(response.data.errmsg)
      return false
    }
  },
  error => {
    antiShake(error.toString())
    Promise.reject(error)
    return false
  }
)
export default axios
