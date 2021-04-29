<template>
  <div class="layoutContainer">
    <!-- <div class="layoutWrapper">
      <div class="layoutContent"></div>
    </div> -->
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
    init() {
      // console.log(this.$router)
    },
    routeInit() {
      this.currentBreadcrumb = []
      for (let item of this.$route.matched) {
        if (item.meta && item.meta.title) this.currentBreadcrumb.push(item)
      }
      // let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // console.log(matched)
    }
  },
}
</script>

<style lang="scss" scoped>
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
  // min-width: 0;
  // min-height: 0;
}

</style>

