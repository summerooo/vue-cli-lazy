// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api'
import store from './store'

import gc from './components/globalComponents'
// 引入svg组件
import iconSvg from './components/icon.vue'
// 全局注册icon-svg
Vue.component('iconSvg', iconSvg)
Vue.config.productionTip = false
Vue.use(gc)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
