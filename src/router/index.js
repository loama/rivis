import Vue from 'vue'
import Router from 'vue-router'

import Explore from '@/components/explore'
import Publish from '@/components/publish'
import MyAccount from '@/components/myaccount'
import Campaign from '@/components/campaign'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      component: MyAccount
    },
    {
      path: '/campaign/:id',
      name: 'campaign',
      component: Campaign
    },
    { path: '*', redirect: '/explore' }
  ]
})
