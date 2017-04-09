import Vue from 'vue'

import Function from '../schemas/Function'

let state = {
    asset: {
        from: '',
        id: ''
    },
    property: {
        from: '',
        id: ''
    }
}

const mutations = {
    ASSET(state, {from, id}) {
        state.asset.from = from
        state.asset.id = id
        state.property.from = ''
        state.property.id = ''
    },
    PROPERTY(state, {from, id}) {
        state.property.from = from
        state.property.id = id
    },
}

const getters = {
    GET_ASSET(state, getters, rootState) {
        if (!rootState[state.asset.from]) return null
        return rootState[state.asset.from].items[state.asset.id]
    },
    GET_PROPERTY(state, getters, rootState) {
        let properties = rootState[state.property.from]
        if (!properties) return null
        return properties.items[state.property.id]
    }
}

const actions = {

}

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
}
