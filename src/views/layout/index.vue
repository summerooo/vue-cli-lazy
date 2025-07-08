<template>
  <div class="layoutContainer">
    <div class="layoutContent">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router'

</script>

<style lang="less" scoped>
.layoutContainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.layoutContent {
  overflow: hidden;
  flex-grow: 1;
  min-height: 0;
  display: flex;
}
</style>
