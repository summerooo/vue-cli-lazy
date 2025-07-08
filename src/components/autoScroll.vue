<template>
  <div 
    ref="scrollContainer" 
    class="scroll-container"
    @mouseenter="pauseScroll"
    @mouseleave="startScroll"
  >
    <div ref="scrollContent" class="scroll-content">
      <div class="scroll-items">
        <slot :items="items"></slot>
      </div>
      <div class="scroll-items" v-if="flag">
        <slot :items="items"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // 滚动速度（毫秒）
  speed: {
    type: Number,
    default: 50
  },
  // 每次移动距离（像素）
  step: {
    type: Number,
    default: 1
  }
})

const scrollContainer = ref(null)
const scrollContent = ref(null)
let currentPosition = 0
let scrollInterval = null
const flag = ref(false)
const startScroll = () => {
  if (scrollInterval) return
  
  scrollInterval = setInterval(() => {
    currentPosition += props.step
    
    // 获取单个列表的高度
    const singleHeight = scrollContent.value.children[0].offsetHeight
    
    // 当滚动到第一个列表的高度时，重置位置
    if (currentPosition >= singleHeight) {
      currentPosition = 0
    }
    
    scrollContent.value.style.transform = `translateY(-${currentPosition}px)`
  }, props.speed)
}

const pauseScroll = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
}

onMounted(() => {
  setTimeout(() => {
  flag.value = scrollContent.value.offsetHeight > scrollContainer.value.offsetHeight
  if (flag.value) startScroll()
  }, 1000)
})

onUnmounted(() => {
  pauseScroll()
})

defineExpose({
  startScroll,
  pauseScroll
})
</script>

<style scoped>
.scroll-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll-content {
  position: relative;
  overflow: auto;
}

</style>