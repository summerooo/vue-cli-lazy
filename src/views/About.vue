<template>
  <div class="about">
    {{c}}
  </div>
</template>

<script>
import { login } from '../api/what/test.js'
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
     let l = await login()
     console.log(l)
     this.c = [{c: 3}]
   }
  }
}
</script>

