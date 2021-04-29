<template>
  <div>
    login
    register
    forget
  </div>
</template>
<script>
import { login } from '@/api/what/test'
export default {
  methods: {
  },
  async mounted() {
    await login()
  }
}
</script>
