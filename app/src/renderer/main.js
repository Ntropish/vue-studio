import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import Vuetify from 'vuetify'

import App from './App'
import routes from './routes'

import drag from './directives/drag'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

Vue.directive('drag', drag)
Vue.use(Vuetify)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
let vueInstance = new Vue({
  router,
  ...App
}).$mount('#app')


import menuMaker from './menus'
menuMaker({router})