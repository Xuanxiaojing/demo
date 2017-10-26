import Vue from 'vue'
import Router from 'vue-router'

import Recommend from '@/views/recommend'
import Find from '@/views/find'
import Community from '@/views/community'
import Mine from '@/views/mine'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/Recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    }
  ]
})
