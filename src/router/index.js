import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Banner from '@/components/banner/Banner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/b',
      component:Banner
    }
  ]
})
