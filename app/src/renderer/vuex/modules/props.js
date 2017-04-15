import Vue from 'vue'

import Prop from '../schemas/Prop'

let state = {
    items: {}
}

const mutations = {
    _ADD(state, newProp) {
        Vue.set(state.items, newProp.id, newProp)
    },
    REMOVE(state, {id}) {
        Vue.set(state.items, id, null)
    },
    SET_PROPERTY(state, {id, property, value}) {
        state.items[id][property] = value
    },
}

const actions = {
    ADD({state, commit}, {name} = {}) {
        let newProp = new Prop({name})
        commit('_ADD', newProp)
        return newProp
    }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
