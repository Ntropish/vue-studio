import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import Vuetify from 'vuetify'

import App from './App'
import routes from './routes'

import drag from './directives/drag'
import follow from './directives/follow'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

Vue.directive('drag', drag)
Vue.directive('follow', follow)
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

let init = [
  store=>store.dispatch('components/ADD', {name: 'Hello From Component Menu'}),
  store=>store.commit('select/ASSET', {from: 'components', id: 0}),
  store=>{
    let selectedId = store.getters['select/GET_ASSET'].templateRootNodeId
    store.commit('select/PROPERTY', {from: 'templateNodes', id: selectedId})
  }
]

quickStart(init)

function quickStart(init) {
  init.reduce((p, fn)=>p.then(fn.bind(null, vueInstance.$store)), Promise.resolve())
}

import menuMaker from './menus'
menuMaker({router})
