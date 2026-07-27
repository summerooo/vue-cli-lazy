<template>
  <div class="home-page">
    <Minesweeper />
  </div>
</template>

<script setup>
import Minesweeper from '@/components/Minesweeper.vue'
​const msg = "hello" ;
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  height: 100%;
}
</style>
