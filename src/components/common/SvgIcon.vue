<template>
  <i class="app-icon" :style="iconStyle">
    <!-- 1. 图片类型图标 (传递 img 地址 / URL) -->
    <img v-if="isImage" :src="name" alt="icon" class="icon-img" />

    <!-- 2. Iconfont SVG Symbol 类型图标 (如 name="#icon-user") -->
    <svg v-else-if="isSvgSymbol" class="icon-svg" aria-hidden="true">
      <use :xlink:href="symbolName" />
    </svg>

    <!-- 3. 内联 SVG 或 Emoji / 文本图标 -->
    <span v-else class="icon-text">{{ name }}</span>
  </i>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 图标标识：可以是 Emoji/文本、Iconfont symbol 名字(如 icon-user) 或 图片URL */
  name: {
    type: String,
    required: true,
  },
  /** 图标大小 (数字自动带 px，或支持 '1.5rem', '24px' 等) */
  size: {
    type: [Number, String],
    default: 16,
  },
  /** 图标颜色 (仅对 Iconfont SVG / 文本生效) */
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

// 是否为图片
const isImage = computed(() => {
  return (
    props.name.startsWith('http://') ||
    props.name.startsWith('https://') ||
    props.name.startsWith('data:image/') ||
    /\.(png|jpe?g|gif|svg|webp)$/i.test(props.name)
  )
})

// 是否为 Iconfont SVG Symbol 格式
const isSvgSymbol = computed(() => {
  return props.name.startsWith('icon-') || props.name.startsWith('#icon-')
})

const symbolName = computed(() => {
  return props.name.startsWith('#') ? props.name : `#${props.name}`
})

// 计算图标内联样式
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
    fill: currentColor;
    overflow: hidden;
  }

  .icon-text {
    line-height: 1;
    font-style: normal;
  }
}
</style>
