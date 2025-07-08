import axios from 'axios'
import { userCheck } from './ai'
import { ElMessage } from 'element-plus'

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(r => { 
  const code = r.data?.code 
  switch (code) {
    case 500:
      ElMessage.error(r?.data?.message || r) 
      break 
    case 401: 
      // message.error(r?.data?.message || '登录失效') 
      return false
    case 201:
      return r.data
      // return router.push({ name: 'FirstChange' }) 
    case 403:
      // message.error(r?.data?.message || '登录失效')
      return false
    case 200: 
      return r.data
    default: 
      return r
  }
}, err => { 
  // message.error(err?.response?.data?.message || err.message || err)
  return Promise.reject(err) 
})

//  建立流式请求
export const useSSE = ({url, data = {}, callback, signal}) => {
  let body = {
    conversationId: data?.conversation_id || data?.conversationId,
    query: data?.query,
    inputs: {
      // languagePreference: 'zh_CN',
      languagePreference: lang.value,
      ...data?.inputs,
    }
  }
  let req = {
    method: data?.method?.toLowerCase() || 'post',
    body: JSON.stringify(body),
    signal,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      'Accept-Language': getAcceptLanguage(),
      ...data.headers,
      'token': getToken(),
    },
    openWhenHidden: true
  }
  let timeDelay = 0
  console.log(signal.aborted, 'signal.aborted')

  return fetchEventSource(BASE_URL + url, {
    ...req,
    async onopen(response) {
      if (response.ok && response.headers.get('content-type').includes('text/event-stream')) return
      else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        throw new Error(t('request', '参数错误'))
      }
      else {
        throw new Error(t('request', '服务器错误'))
      }
    },
    onmessage(msg) {
      setTimeout(() => {
        if (signal.aborted) return callback(false)
        callback && callback(JSON.parse(msg.data))
      },  (++timeDelay) * 40)
    },
    onclose() {
      // callback(false)
    },
    onerror(err) {
      callback(false, `${t('request', '停止重连,请稍后重试')},${err}`)
      userCheck()
      signal.aborted = true
      throw new Error()
    }
  })
}

export default axios
