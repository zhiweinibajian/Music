import Vue from 'vue'
import Router from 'vue-router'

import NewSong from '@/components/new-song/new-song'
import Singer from '@/components/singer/singer'
import SingerDetail from '@/components/singer-detail/singer-detail'
import Rank from '@/components/rank/rank'
import RankDetail from '@/components/rank-detail/rank-detail'
import Search from '@/components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/newsong'
    },
    {
      path: '/newsong',
      name: 'NewSong',
      component: NewSong
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children: [{
        path: ':id',
        component: RankDetail
      }]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
