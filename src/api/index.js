import axios from 'axios'
// import Qs from 'qs'
// axios.defaults.baseURL = apiUrl
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
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       if (sessionStorage.getItem('token')) {
    //         alert('该账号在其他地方登陆请重新登录')
    //       }
    //               // 401 清除token信息并跳转到登录页面
    //       store.commit(types.LOGOUT)
    //       router.replace({
    //         path: '/',
    //         query: {redirect: router.currentRoute.fullPath}
    //       })
    //   }
    // }
    // console.log(JSON.stringify(error))// console : Error: Request failed with status code 402
    return Promise.reject(error)
  }
)
export default axios
