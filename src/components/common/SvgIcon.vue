<template>
  <i class="app-icon" :style="iconStyle">
    <!-- 1. 图片类型图标 (传递 URL / 图片路径) -->
    <img v-if="isImage" :src="name" alt="icon" class="icon-img" />

    <!-- 2. Iconfont Symbol (传递 #icon-xxx) -->
    <svg v-else-if="isSvgSymbol" class="icon-svg" aria-hidden="true">
      <use :xlink:href="symbolName" />
    </svg>

    <!-- 3. 内置 SVG 矢量图形 (内置常用系统图标) -->
    <svg v-else-if="builtinSvgPath" class="icon-svg" viewBox="0 0 24 24" fill="currentColor">
      <path :d="builtinSvgPath" />
    </svg>

    <!-- 4. 兜底文本 -->
    <span v-else class="icon-text">{{ name }}</span>
  </i>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 图标名称：支持内置图标 (logo, logout, mine, flag, reset, win, lost) 或 Iconfont Symbol 或 图片URL */
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

// 常用内置 SVG Path 路径库（无需加载外部字体/图片即可使用）
const BUILTIN_ICONS = {
  // 🚀 Rocket Logo
  logo: 'M13.13 2.21a.75.75 0 0 0-1.1 0C10.13 4.14 7.6 8.35 8.04 12.83c.08.78-.17 1.56-.7 2.15l-1.92 2.14a.75.75 0 0 0 .15 1.13l1.88 1.25a.75.75 0 0 0 .97-.13l1.7-1.89c.56-.63 1.37-.97 2.21-.93 4.48.22 8.52-2.58 10.33-4.48a.75.75 0 0 0 0-1.1c-1.34-1.34-4.83-4.66-9.57-8.76zm-1.88 7.04a1.5 1.5 0 1 1 2.12-2.12 1.5 1.5 0 0 1-2.12 2.12zM3 18.75a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75z',
  // 🚪 Logout
  logout:
    'M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H9',
  // 💣 Mine
  mine: 'M12 2a1 1 0 0 1 1 1v1.055A9.001 9.001 0 0 1 21 13a9 9 0 1 1-18 0 9 9 0 0 1 8-8.945V3a1 1 0 0 1 1-1zm0 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12z',
  // 🚩 Flag
  flag: 'M5.25 3A.75.75 0 0 1 6 3.75v.443c1.78-.63 3.864-.47 5.518.435 1.956 1.07 4.316.92 6.136-.39a.75.75 0 0 1 1.196.602v8.82c0 .542-.375 1.008-.9.117-1.78.63-3.864.47-5.518-.435-1.956-1.07-4.316-.92-6.136.39V20.25a.75.75 0 0 1-1.5 0V3.75A.75.75 0 0 1 5.25 3z',
  // 🔄 Reset / Refresh
  reset:
    'M16.023 9.348h4.992v-.001M21 4.1v4.8h-4.8M5.006 14.352a8.956 8.956 0 0 1-.958-3.952c0-4.97 4.03-9 9-9 3.53 0 6.58 2.036 8.04 4.992m-.008 8.26a8.956 8.956 0 0 1 .958 3.952c0 4.97-4.03 9-9 9-3.53 0-6.58-2.036-8.04-4.992',
  // 😎 Win / Smile
  win: 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.464 3.5a5 5 0 0 0 7.928 0 .75.75 0 1 0-1.128-.988 3.5 3.5 0 0 1-5.672 0 .75.75 0 1 0-1.128.988z',
  // 😵 Lost / Frown
  lost: 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM8 11l2-2m-2 0l2 2m4-2l2 2m-2 0l2-2m-6 6a4 4 0 0 1 8 0',
}

const isImage = computed(() => {
  return (
    props.name.startsWith('http://') ||
    props.name.startsWith('https://') ||
    props.name.startsWith('data:image/') ||
    /\.(png|jpe?g|gif|svg|webp)$/i.test(props.name)
  )
})

const isSvgSymbol = computed(() => {
  return props.name.startsWith('icon-') || props.name.startsWith('#icon-')
})

const symbolName = computed(() => {
  return props.name.startsWith('#') ? props.name : `#${props.name}`
})

const builtinSvgPath = computed(() => {
  return BUILTIN_ICONS[props.name.toLowerCase()]
})

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
