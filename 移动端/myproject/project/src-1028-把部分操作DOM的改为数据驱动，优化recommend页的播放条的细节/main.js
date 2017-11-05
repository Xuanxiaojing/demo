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

// import vuexI18n from 'vuex-i18n';  
// Vue.use(VueResource);
// Vue.use(vuexI18n.plugin);
// const translationsEn = {  
//   "content": "This is some {type} content"  
// };  

// // translations can be kept in separate files for each language  
// // i.e. resources/i18n/de.json.  
// // add translations directly to the application  
// Vue.i18n.add('en', translationsEn);  

// // set the start locale to use  
// Vue.i18n.set('en'); 

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
