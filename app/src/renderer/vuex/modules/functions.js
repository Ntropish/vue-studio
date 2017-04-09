import Vue from 'vue'

import Function from '../schemas/Function'

let state = {
    items: {}
}

const mutations = {
    _ADD(state, newFunction) {
        Vue.set(state.items, newFunction.id, newFunction)
    },
    REMOVE(state, {id}) {
        Vue.set(state.items, id, null)
    },
    ADD_ARGUMENT(state, {id, value}) {
        state.items[id].arguments.push(value)
    },
    REMOVE_ARGUMENT(state, {id, index}) {
        state.items[id].arguments.splice(index, 1)
    },
    SET_BODY(state, {id, body}) {
        state.items[id].body = body
    },
    SET_NAME(state, {id, name}) {
        state.items[id].name = name
    }
}

const actions = {
    GET_MULTIPLE({state, commit, rootState}, {ids}) {
        return ids.map(id=>state.items[id])
    },
    ADD({state, commit}, {name} = {}) {
        let newFunction = new Function({name})
        commit('_ADD', newFunction)
        return newFunction
    }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
