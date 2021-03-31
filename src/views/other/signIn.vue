<template>
  <div>
    login
    register forget
  </div>
</template>
<script>
import { login } from '/@/api/what/test'
export default {
  async created() {
    await login()
  }
}
</script>
