
import axios from 'axios'
import proxyApi from '@/dev.js'
const { api } = proxyApi
// 国际化
export const userLanguage = data => {
  return axios.post(`${api}/user/language?language=${data.language}`, data)
}

// 国际化
export const i18nMessageJson = locale => {
  return axios.get(`${api}/open/i18n/message/json?locale=${locale}`)
}

