<template>
  <i class="app-icon" :style="iconStyle">
    <!-- 1. 自动读取 src/assets/svg/ 目录下的本地 SVG 或显式图片 URL / 路径 -->
    <img v-if="realImageSrc" :src="realImageSrc" alt="icon" class="icon-img" />

    <!-- 2. Iconfont Symbol 多色矢量模式 (如 #icon-xxx) -->
    <svg v-else-if="isSvgSymbol" class="icon-svg" aria-hidden="true">
      <use :xlink:href="symbolName" />
    </svg>

    <!-- 3. 阿里 Iconfont Font-class 字体图标模式 (如 icon-user) -->
    <i v-else-if="isIconFontClass" :class="['iconfont', name]" />

    <!-- 4. 兜底文本 -->
    <span v-else class="icon-text">{{ name }}</span>
  </i>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * 图标标识：
   * 1. 本地 src/assets/svg/ 目录下的文件名 (如 "logo", "user", "mine", "flag"，自动解析)
   * 2. 阿里 Iconfont Class (如 "icon-user") 或 Symbol (如 "#icon-user")
   * 3. 完整图片 URL 或 相对/绝对路径
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

// 解析出真实的图片/SVG路径
const realImageSrc = computed(() => {
  // 1. 如果传递的是文件名且在 src/assets/svg/ 目录下匹配到了 (如 name="logo")
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
