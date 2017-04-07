import * as types from '../mutation-types'

import Vue from 'Vue'

const state = {
    item: null,
    property: null,
}

const mutations = {
    SET_SELECTED(state, newSelectedThing) {
        state.item = newSelectedThing
    },
    UPDATE_SELECTED(state, {path, value}) {
        if (!state.item) throw new Error(`No item selected while trying to update`)

        // Track this so the selected item observer can be walked over again
        let newProp = false

        // Dereference the selected item for each thing in the path
        let reference = path.slice(0, -1).reduce((reference, key)=>{
            if (checkReference(reference, key)) {
                return reference[key]
            }

            // newProp = true
            Vue.set(reference, key, {})
            // reference[key] = {}

            return reference[key]

        }, state.item)

        let lastProperty = path.slice(-1)[0]
        
        if (!checkReference(reference, lastProperty)) {
            // newProp = true
            Vue.set(reference, lastProperty, value)
        } else {
            reference[lastProperty] = value
        }
        // reference[lastProperty] = value
        // Vue.set(reference, lastProperty, value)

        // if (newProp) {
        //     state.item = Object.assign({}, state.item)
        // }

        function checkReference(reference, key) {
            if (typeof reference !== 'object') throw new Error(`Invalid key ${key} at path: ${path.join('->')}`)
            if (reference.hasOwnProperty(key)) return true
        }
    },
    SELECT_PROPERTY(state, {type, name}) {
        state.property = {type, name}
    }
}

export default {
  state,
  mutations
}
