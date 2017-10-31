import Vue from 'vue'
import Router from 'vue-router'

import Recommend from '@/views/recommend'
import Find from '@/views/find'
import Community from '@/views/community'
import Mine from '@/views/mine'
import Movie from '@/views/movie'
import Music from '@/views/music'
import Books from '@/views/books'
import LatalyList from '@/components/latalyList/latalyList'
import MusicPlayer from '@/components/musicPlayer/musicplayer'

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
      path: '/movie',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    }/* ,
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
