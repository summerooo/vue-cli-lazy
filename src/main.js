import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api'

// import {swiper, swiperSlide} from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
