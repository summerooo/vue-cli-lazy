
<template>
 <el-switch v-model="value2" class="ml-2" @change="switchchange" />
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script setup>
import { locale } from '@/i18n'

import { ref } from 'vue'
 
const value2 = ref(true)
 
const switchchange = (val) => {
 
 let html = document.documentElement  //获取html根元素

 val ? html.className = 'dark' : html.className = '' //判断开关打开添加dark 否则不添加
} 

</script>
<style lang="less">
#app,
html,
body {
  height: 100%;
  width: 100%;
  min-width: 1400px;
  min-height: 700px;
  position: relative;
  box-sizing: border-box;
}
</style>
