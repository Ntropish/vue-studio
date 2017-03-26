import * as types from '../mutation-types'

const state = {
    item: null
}

const mutations = {
    [types.SET_SELECTED] (state, newSelectedThing) {
        state.item = newSelectedThing
    }
}

export default {
  state,
  mutations
}
