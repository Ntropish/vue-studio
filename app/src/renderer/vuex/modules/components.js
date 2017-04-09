import Vue from 'vue'

import Component from '../schemas/Component'

let count = 0
let state = {
    items: {}
}

const mutations = {
  _ADD(state, newComponent) {
    Vue.set(state.items, newComponent.id, newComponent)
  },
  REMOVE(state, {id}) {
    Vue.set(state.items, id, null)
  },
  _ADD_PROPERTY(state, {to, id, newFunction}) {
    state.items[id][to].push(newFunction.id)
  },
  REMOVE_PROPERTY(state, {type, id, propertyId}) {
    let props = state.items[id][type]
    let index = props.indexOf(propertyId)
    props.splice(index, 1)
  },
  SET_PROPERTY(state, {id, name, value}) {
    state.items[id][name] = value
  }
}

const actions = {
  ADD_PROPERTY({dispatch, commit}, {id, to, construct}) {
    return dispatch('functions/ADD', construct, {root: true})
    .then(
      function applyNewFunctionToComponent(newFunction) {
        return commit('_ADD_PROPERTY', {to, id, newFunction})
      })
  },

  ADD({dispatch, commit}, {name}) {
    let newComponent = new Component({name})
    return dispatch('functions/ADD', {name: 'data'}, {root: true}).then(
      function(newFunction) {
        newComponent.data = newFunction.id
        commit('_ADD', newComponent)
      }
    )
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
