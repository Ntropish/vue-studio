import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  menuConfiguration: []
}

const mutations = {
  [types.SET_EDITOR_MENU] (state, menuConfiguration) {
    console.log('setting to', menuConfiguration)
    Vue.set(state, 'menuConfiguration', menuConfiguration)
  },
}

export default {
  state,
  mutations
}
