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

let init = [
  store=>store.dispatch('components/ADD', {name: 'Hello From Component Menu'}),
  store=>store.commit('select/ASSET', {from: 'components', id: 0}),
  store=>{
    let selectedId = store.state.select.asset.id
    store.commit('select/PROPERTY', {from: 'template', id: selectedId})
  }
]

quickStart(init)

function quickStart(init) {
  init.reduce((p, fn)=>p.then(fn.bind(null, vueInstance.$store)), Promise.resolve())
}

import menuMaker from './menus'
menuMaker({router})