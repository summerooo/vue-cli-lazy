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
    const nu = navigator.userAgent
    const models = [ 'Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod' ]
    // 设备
    if (!sessionStorage.getItem('device')) for (let d of models) {
      if (nu.includes(d)) {
        sessionStorage.setItem('device', d)
        this.device = d
        break
      }
    }
    // 内核
    for (let i of ['chrome', 'firefox', 'webkit']) {
      if (nu.toLowerCase().includes(i)) {
        this.kernel = i
        break
      }
    }
    if (nu.toLowerCase().match(/MicroMessenger/i)) console.log('in wx')
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
