import Vue from 'vue' // 引入vue
import Router from 'vue-router' // 引入vue-router
import ShopList from '@/views/shop-list/shop-list' // 引入shop-list组件

Vue.use(Router) // 把vue-router作为Vue的插件使用

export default new Router({
  // 配置组件和路径，使其一一对应
  routes: [
    {
      path: '/',
      name: 'ShopList',
      component: ShopList
    }
  ]
})
