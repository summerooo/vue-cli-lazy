/**
 * 动态加载 Iconfont Symbol 多色矢量脚本 (开发在线调试/本地资源引入)
 * @param {string} url - Iconfont Symbol JS 地址 (例如: '//at.alicdn.com/t/font_1014539_qgm9beagfyk.js')
 */
export function loadIconfontSymbol(url) {
  if (!url || typeof document === 'undefined') return
  const script = document.createElement('script')
  script.src = url.startsWith('//') ? `https:${url}` : url
  script.async = true
  document.head.appendChild(script)
}

// 默认载入 Iconfont 在线 Symbol 脚本（生产环境可替换为本地引入）
loadIconfontSymbol('//at.alicdn.com/t/font_1014539_qgm9beagfyk.js')
