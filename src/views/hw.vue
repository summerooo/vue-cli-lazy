<template>
  <div class="about">
    {{c}}
  </div>
</template>

<script>
import { agreement } from '../api/what/test.js'
export default {
  data() {
    return {
      c: [{a:2},{b:3}]
    }
  },
  created() {
    this.aa()
  },
  methods: {
   async aa () {
     console.log('11111')
     let l = await agreement()
     console.log(l)
     this.c = [{c: 3}]
   }
  }
}
</script>

<style lang="scss" scoped>
.about {
  color: $red;
}
</style>

