<template>
  <div class="mineContainer">
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
  .mineContainer {
    position: relative;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>