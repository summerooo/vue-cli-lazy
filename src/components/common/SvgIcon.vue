<template>
  <i class="app-icon" :style="iconStyle">
    <!-- 1. 自动识别 src/assets/svg/ 目录下的本地 SVG 或显式图片 URL / 路径 -->
    <img v-if="realImageSrc" :src="realImageSrc" alt="icon" class="icon-img" />

    <!-- 2. Iconfont Symbol 多色矢量模式 (如 #icon-xxx) -->
    <svg v-else-if="isSvgSymbol" class="icon-svg" aria-hidden="true">
      <use :xlink:href="symbolName" />
    </svg>

    <!-- 3. 阿里 Iconfont Font-class 字体图标模式 (如 icon-user) -->
    <i v-else-if="isIconFontClass" :class="['iconfont', name]" />

    <!-- 4. 兜底内置 SVG 矢量图形 -->
    <svg v-else-if="builtinSvgPath" class="icon-svg" viewBox="0 0 24 24" fill="currentColor">
      <path :d="builtinSvgPath" />
    </svg>

    <!-- 5. 兜底文本 -->
    <span v-else class="icon-text">{{ name }}</span>
  </i>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * 图标标识：
   * 1. 本地 assets/svg/ 目录文件名 (如 "logo", "user", "logout"，无需写路径和 .svg 后缀)
   * 2. 阿里 Iconfont Class (如 "icon-user") 或 Symbol (如 "#icon-user")
   * 3. 完整图片 URL 或 路径
   */
  name: {
    type: String,
    required: true,
  },
  /** 图标大小 */
  size: {
    type: [Number, String],
    default: 16,
  },
  /** 图标颜色 */
  color: {
    type: String,
    default: '',
  },
  /** 旋转角度 */
  rotate: {
    type: Number,
    default: 0,
  },
})

// 利用 Vite 的 import.meta.glob 自动扫描并批量导入 src/assets/svg/ 目录下的所有 svg 文件
const svgFiles = import.meta.glob('/src/assets/svg/*.svg', { eager: true, import: 'default' })

// 将 /src/assets/svg/xxx.svg 映射为纯文件名 key (如 logo: '/src/assets/svg/logo.svg')
const localSvgMap = {}
for (const path in svgFiles) {
  const fileName = path.replace(/^\/src\/assets\/svg\//, '').replace(/\.svg$/, '')
  localSvgMap[fileName] = svgFiles[path]
}

// 常用内置 SVG 矢量 Path 库
const BUILTIN_ICONS = {
  mine: 'M12 2a1 1 0 0 1 1 1v1.055A9.001 9.001 0 0 1 21 13a9 9 0 1 1-18 0 9 9 0 0 1 8-8.945V3a1 1 0 0 1 1-1zm0 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12z',
  flag: 'M5.25 3A.75.75 0 0 1 6 3.75v.443c1.78-.63 3.864-.47 5.518.435 1.956 1.07 4.316.92 6.136-.39a.75.75 0 0 1 1.196.602v8.82c0 .542-.375 1.008-.9.117-1.78.63-3.864.47-5.518-.435-1.956-1.07-4.316-.92-6.136.39V20.25a.75.75 0 0 1-1.5 0V3.75A.75.75 0 0 1 5.25 3z',
  reset:
    'M16.023 9.348h4.992v-.001M21 4.1v4.8h-4.8M5.006 14.352a8.956 8.956 0 0 1-.958-3.952c0-4.97 4.03-9 9-9 3.53 0 6.58 2.036 8.04 4.992m-.008 8.26a8.956 8.956 0 0 1 .958 3.952c0 4.97-4.03 9-9 9-3.53 0-6.58-2.036-8.04-4.992',
  win: 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.464 3.5a5 5 0 0 0 7.928 0 .75.75 0 1 0-1.128-.988 3.5 3.5 0 0 1-5.672 0 .75.75 0 1 0-1.128.988z',
  lost: 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM8 11l2-2m-2 0l2 2m4-2l2 2m-2 0l2-2m-6 6a4 4 0 0 1 8 0',
}

// 解析出真实的图片/SVG路径
const realImageSrc = computed(() => {
  // 1. 如果传递的是文件名且在 assets/svg/ 目录下匹配到了 (如 name="logo")
  if (localSvgMap[props.name]) {
    return localSvgMap[props.name]
  }

  // 2. 如果是完整 URL 或 路径
  if (
    props.name.startsWith('http://') ||
    props.name.startsWith('https://') ||
    props.name.startsWith('data:image/') ||
    props.name.startsWith('/') ||
    /\.(png|jpe?g|gif|svg|webp)$/i.test(props.name)
  ) {
    return props.name
  }

  return ''
})

const isSvgSymbol = computed(() => props.name.startsWith('#icon-'))
const isIconFontClass = computed(() => props.name.startsWith('icon-'))
const symbolName = computed(() => props.name)
const builtinSvgPath = computed(() => BUILTIN_ICONS[props.name.toLowerCase()])

const iconStyle = computed(() => {
  const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size

  return {
    fontSize: sizeValue,
    width: sizeValue,
    height: sizeValue,
    color: props.color || 'inherit',
    transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
  }
})
</script>

<style lang="scss" scoped>
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  fill: currentColor;
  vertical-align: -0.125em;
  transition: transform 0.2s ease;

  .icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .icon-svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    overflow: hidden;
  }

  .icon-text {
    line-height: 1;
    font-style: normal;
  }
}
</style>
