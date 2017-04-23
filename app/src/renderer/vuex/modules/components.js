import Vue from 'vue'

import Component from '../schemas/Component'
import TemplateNode from '../schemas/TemplateNode'

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
  _ADD_PROPERTY(state, {to, id, value}) {
    state.items[id][to].push(value.id)
  },
  REMOVE_PROPERTY(state, {type, id, propertyId}) {
    let props = state.items[id][type]
    let index = props.indexOf(propertyId)
    props.splice(index, 1)
  },
  SET_PROPERTY(state, {id, name, value}) {
    state.items[id][name] = value
  },
  SET_TEMPLATE(state, {id, value}) {
    state.items[id].template.text = value
  }
}

const actions = {
  ADD_PROPERTY({dispatch, commit}, {id, to, construct}) {
    return dispatch('functions/ADD', construct, {root: true})
    .then(
      function applyNewFunctionToComponent(newFunction) {
        return commit('_ADD_PROPERTY', {to, id, value: newFunction})
      })
  },

  ADD_PROP({dispatch, commit}, {id, construct}) {
    return dispatch('props/ADD', construct, {root: true})
    .then(
      function applyNewFunctionToComponent(newProp) {
        console.log(newProp)
        return commit('_ADD_PROPERTY', {to: 'props', id, value: newProp})
      })
  },

  ADD({dispatch, commit}, {name}) {
    let templateRootNode = new TemplateNode({type: 'tag', tagName: 'div'});

    let newComponent = new Component({name, templateRootNode})

    commit('templateNodes/ADD', templateRootNode, {root: true} )
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
