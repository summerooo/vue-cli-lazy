<template>
  <div class="hello">
    <iconSvg icon-class="ts" style="color: red; font-size: 20px;"></iconSvg>
    <h1>{{ msg }}</h1>
    123123123
    {{count}}
    <gc>
      <p>这是一些初始内容</p>
      <p>{{msg}}</p>
    </gc>
  </div>
</template>

<script>
import '../assets/icons/ts.svg'

import { login, hotMapData } from '../api/a/a.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    async a () {
      this.msg = this.msg + '000000'
      this.$store.state.count = 1000
      // this.$store.commit('increment', {
      //   number: 10
      // })
      this.$store.dispatch('increment', {
        number: 10
      })
      console.log(this.$store.state.count)
    },
    async hotMap () {
      let lo = await login({})
      console.log(lo)
      let hpd = await hotMapData()
      console.log(hpd)
    }
  },
  created () {
    console.log(this)
    this.a()
    this.hotMap()
  }
}
</script>
<style lang="scss" scoped>
.hello{
  color: red;
  h1 {
    color: yellow;
  }
}
</style>
