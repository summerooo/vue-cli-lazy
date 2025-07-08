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
    width:100%;
    height:100%;
    min-height: calc(100vh - @header-height);
    position: relative;
    flex-grow: 1;
    overflow-y: hidden;
    overflow-x: hidden;
    min-height: 0;
    min-width: 0;
  }
</style>
