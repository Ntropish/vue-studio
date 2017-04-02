import path from 'path'

import * as types from '../mutation-types'
import Vue from 'vue'

import Component from 'renderer/classes/Component'

function defaultState() {
    return {
        component: [],
        directive: [],
        filter: [],
    }
}

const mutations = {
    CLEAR_PROJECT(state) {
        let newState = defaultState()

        Object.keys(newState).forEach((key) =>{
            Vue.set(state, key, newState[key])
        })
    },
    ADD_ASSET(state, data) {
        if (data.constructor === Component) {
            state.component.push(data)
        }
    },
}

export default {
  state: defaultState(),
  mutations
}
