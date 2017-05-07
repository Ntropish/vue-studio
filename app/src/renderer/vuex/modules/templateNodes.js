import Vue from 'vue'

import TemplateNode from '../schemas/TemplateNode'

let count = 0
let state = {
    items: {}
}

const mutations = {
  ADD(state, newNode) {
    Vue.set(state.items, newNode.id, newNode)
  },
  REMOVE(state, {id}) {
    Vue.set(state.items, id, null)
  },
  SET_TEXT(state, {id, value}) {
    console.log('setting:', id, value)
    Vue.set(state.items[id], 'text', value)
  },
  REMOVE_CHILD(state, {id, child, index, childId}) {
    if (index !== 0 && !index || index === -1) {
      index = state.items[id].children.indexOf(childId || child.id)
    }
    if (index === -1) throw new Error('Child doesn\'t exist on this node')

    state.items[id].children.splice(index, 1)
  },
  ADD_CHILD(state, {id, child, index, childId}) {
    console.log(id, child, index, childId)
    if (!index && index !== 0) {
      index = state.items[id].children.length
      console.log('new index:', index)
    }
    console.log(state.items[id].children)
    state.items[id].children.splice(index, 0, childId || child.id)
    console.log(state.items[id].children)
  }
}

const actions = {
  ADD_CHILD({dispatch, commit}, {id, construct, index}) {
    let child = new TemplateNode(construct)
    commit('ADD', child)
    commit('ADD_CHILD', {id, child, index})
  },

  MOVE_CHILD({dispatch, commit, state}, {id, child, index}) {
    commit('REMOVE_CHILD', {id, child})
    commit('ADD_CHILD', {id, child, index})
  },
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
