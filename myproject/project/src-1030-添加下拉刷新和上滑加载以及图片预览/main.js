// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@/assets/css/app.css'
import '@/assets/js/shipei.js'
import '@/assets/js/base64.js'

// vue的图片懒加载插件：vue-lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/img/error.jpg',
  loading: '/static/img/loading.gif',
  attempt: 1
})

import { Previewer} from 'vux'
Vue.use(Previewer)

/* import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper); */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
