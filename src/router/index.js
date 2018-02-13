import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Auth from '@/components/Auth'
import Crud from '@/components/Crud'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/crud',
      name: 'Crud',
      component: Crud
    }
  ]
})
