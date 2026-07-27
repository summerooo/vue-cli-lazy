/**
 * 数据格式化与转换工具函数
 */

// 接收：对象 { a: 1 } ➔ 转成：FormData 对象
export function toFormData(data = {}) {
  const body = new FormData()
  for (const key in data) {
    if (Object.hasOwn(data, key) && data[key] !== undefined) {
      body.append(key, data[key])
    }
  }
  return body
}

// 接收：对象 { a: 1, b: 2 } ➔ 转成：URL 查询字符串 "?a=1&b=2"
export function toQueryString(data = {}) {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
      params.append(key, data[key])
    }
  }
  const str = params.toString()
  return str ? `?${str}` : ''
}

// 接收：需要保留的 key 数组与原对象 ➔ 转成：过滤后的新对象
export function pickFields(keys = [], data = {}) {
  const result = {}
  for (const key of keys) {
    if (key in data) result[key] = data[key]
  }
  return result
}

// 接收：Date 对象或时间戳 ➔ 转成：格式化字符串 "YYYY-MM-DD HH:mm:ss"
export function formatDate(targetDate = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  const date = new Date(targetDate)
  if (isNaN(date.getTime())) return ''

  const opt = {
    'Y+': date.getFullYear().toString(),
    'M+': (date.getMonth() + 1).toString(),
    'D+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'm+': date.getMinutes().toString(),
    's+': date.getSeconds().toString(),
  }

  let result = format
  for (const k in opt) {
    const ret = new RegExp(`(${k})`).exec(result)
    if (ret) {
      const val = opt[k]
      result = result.replace(ret[1], ret[1].length === 1 ? val : val.padStart(ret[1].length, '0'))
    }
  }
  return result
}

// 接收：数字或数字字符串 1234567.89 ➔ 转成：千分位格式化字符串 "1,234,567.89"
export function formatMoney(amount = 0, decimals = 2) {
  const num = Number(amount)
  if (isNaN(num)) return '0.00'
  return num.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
