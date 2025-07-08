
import { ref, computed } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enUS from 'element-plus/es/locale/lang/en'
import { userLanguage, i18nMessageJson } from '@/api/i18n'
export const lang = ref()
export const supportLangs = ref({
  'zh-cn': {
    locale: zhCn,
    name: '中文',
    data: {},
    acceptLanguage: 'zh-CN,zh;q=0.9',
    lang: 'zh_CN',
  },
  'en-us': {
    locale: enUS,
    name: 'English',
    data: {},
    acceptLanguage: 'en-US,en;q=0.9',
    lang: 'en_US',
  },
})
// 获取浏览器首选语言
const getBrowserLang = () => {
  const browserLang = navigator.language || navigator.browserLanguage
  return browserLang.toLowerCase()
}
// 检测语言是否为中文
export const detectLanguage = () => {
  const browserLang = getBrowserLang()
  // 支持的语言列表 匹配支持的语言
  const matched = Object.keys(supportLangs.value).find(lang => browserLang.includes(lang))
  // 返回匹配到的语言或默认语言
  return matched || 'zh-cn'
}

lang.value = localStorage.getItem('language') || detectLanguage() || ''
const show = async () => {
  let res = await i18nMessageJson(supportLangs.value[lang.value].lang)
  supportLangs.value[lang.value].data = res.data
}
show()
export const locale = computed(() => {
  return supportLangs.value[lang.value].locale
})

export const t = (groupKey, key) => {
  let groupObj = supportLangs.value[lang.value].data[groupKey] || {}
  return groupObj[key] || key
}
export const getAcceptLanguage = () => {
  return supportLangs.value[lang.value].acceptLanguage
}

export const changeLang = async value => {
  lang.value = value
  localStorage.setItem('language', value)
  await userLanguage({language: value})
  await show()
  location.reload()
}
export const changeLangNoRefresh = value => {
  if (!value) return
  lang.value = value
  localStorage.setItem('language', value)
  show()
}
