<template>
  <div class="commonContainer">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath"  v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" :key="$route.fullPath"  v-if="!$route.meta.keepAlive"/>
    </router-view>
  </div>
</template>
<style lang="less" scoped>
  .commonContainer {
    position: relative;
    flex: 1;
    overflow-y: hidden;
    overflow-x: hidden;
  }
</style>
