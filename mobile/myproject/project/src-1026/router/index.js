import Vue from 'vue'
import Router from 'vue-router'

import Recommend from '@/views/recommend/recommend'
import Find from '@/views/find/find'
import Community from '@/views/community/community'
import Mine from '@/views/mine/mine'
import Movie from '@/views/recommend/movie/movie'
import Books from '@/views/recommend/books/books'
import Music from '@/views/recommend/music/music'
import LatalyList from '@/components/latalyList/latalyList'
import MusicPlayer from '@/views/musicPlayer/musicPlayer'
import Secondpage from '@/components/second-page/second-page'

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
