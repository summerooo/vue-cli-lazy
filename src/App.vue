<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapState, mapMutations } from './store'
export default {
  data() {
    return {}
  },
  setup() {
    return { ...mapState(['info', 'token']) }
  },
  created() {
    this.getState(['info', 'token'])
  },
  methods: {
    ...mapMutations(['getState']),
  },
}
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app,
html,
body {
  height: 100%;
  width: 100%;
  min-width: 1400px;
  min-height: 720px;
  box-sizing: border-box;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  display: block;
}
</style>
