<template>
  <div class="layoutContainer">
    <div class="layoutContent">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      activeMenu: '',
      currentBreadcrumb: [],
    }
  },
  watch: {
    $route() {
      this.routeInit()
    },
  },
  created() {
    this.init()
    this.routeInit()
  },
  methods: {
    init() {},
    routeInit() {
      this.currentBreadcrumb = []
      for (let item of this.$route.matched) {
        if (item.meta && item.meta.title) this.currentBreadcrumb.push(item)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.layoutContainer {
  width: 100%;
  min-height: 100vh;
  position: relative;
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
.layoutContent {
  flex: 1;
  display: flex;
}

</style>

