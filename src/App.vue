<template>
  <div id="app">
    {{device}}
    {{kernel}}
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    // 设备
    for (let d of ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']) {
      if (navigator.userAgent.includes(d)) {
        this.device = d
        break
      }
    }
    // 内核
    for (let i of ['chrome', 'firefox', 'webkit']) {
      if (navigator.userAgent.toLowerCase().includes(i)) {
        this.kernel = i
        break
      }
    }
  },
  data () {
    return {
      device: null,
      kernel: null
    }
  }
}
</script>

<style lang="scss">
</style>
