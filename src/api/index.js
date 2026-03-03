import axios from 'axios';
import { useAppStore } from '../store/app'

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 添加请求取消逻辑
    const appStore = useAppStore()
    const source = axios.CancelToken.source()
    config.cancelToken = source.token
    appStore.addCancel(() => source.cancel('Route change'))

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else if (error.response && error.response.status === 401) {
      // 处理未授权错误
    }
    return Promise.reject(error);
  }
);

export default axios