<template>
  <div class="hello">
    666666666666666666666666666
    <slot>
      只有在没有要分发的内容时才会显示。
    </slot>
    {{count}}
  </div>
</template>

<script>
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
    a () {
      console.log(this.count + '----')
      this.$store.state.count = 100
    }
  },
  created () {
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
