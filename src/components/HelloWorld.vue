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

import {login} from '../api/a/a'
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
      let a = await login()
      console.log(a)
      this.$store.state.count = 1000
      // this.$store.commit('increment', {
      //   number: 10
      // })
      this.$store.dispatch('increment', {
        number: 10
      })
      console.log(this.$store.state.count)
    }
  },
  created () {
    console.log(this)
    this.a()
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
