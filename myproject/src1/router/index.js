import Vue from 'vue'
import Router from 'vue-router'

import Recommend from '@/views/recommend'
import Find from '@/views/find'
import Community from '@/views/community'
import Mine from '@/views/mine'
import Move from '@/views/move'
import LatalyList from '@/components/latalyList/latalyList'
import MusicPlayer from '@/components/musicPlayer/musicplayer'
import Secondpage from '@/components/second-page'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
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
    },
    {
      path: '/move',
      name: 'Move',
      component: Move
    },
    {
      path: '/Secondpage/:id',
      name: 'Secondpage',
      component: Secondpage
    }
    /* ,
    {
      path: '/latalyList',
      name: 'LatalyList',
      component: LatalyList
    },
    {
      path: '/musicplayer',
      name: 'MusicPlayer',
      component: MusicPlayer
    } */
  ]
})
