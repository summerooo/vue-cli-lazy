<template>
  <div class="commonContainer">
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
  .commonContainer {
    position: relative;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>