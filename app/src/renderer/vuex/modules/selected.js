import * as types from '../mutation-types'

import Vue from 'Vue'

const state = {
    item: null,
    property: {},
}

const mutations = {
    [types.SET_SELECTED] (state, newSelectedThing) {
        console.log('SET SELECTED:', newSelectedThing)

        state.item = newSelectedThing
        Vue.set(state, 'item', newSelectedThing)
    },
    UPDATE_SELECTED(state, {type, name, value}) {
        console.log('UPDATE SELECTED:', type, name, value)

        if (!state.item) throw new Error(`No item selected while trying to update`)
        if (!state.item[type]) throw new Error(`Missing property type: ${type}`)

        let key = name || type
        let object = state.item
        if (name) object = object[type]

        Vue.set(object, key, value)

    },
    SELECT_PROPERTY(state, property) {
        console.log('SELECTED PROPERTY', property)

        Vue.set(state, 'property', property)
    }
}

export default {
  state,
  mutations
}
