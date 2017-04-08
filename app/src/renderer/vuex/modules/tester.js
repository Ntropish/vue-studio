import * as types from '../mutation-types'

import Vue from 'Vue'

const state = {
    item: {}
}

const mutations = {
    UPDATE_SELECTED(state, {path, value}) {

        // Dereference the selected item for each thing in the path
        let reference = path.slice(0, -1).reduce((reference, key)=>{
            if (checkReference(reference, key)) {
                return reference[key]
            }

            Vue.set(reference, key, {})

            return reference[key]

        }, state.item)

        let lastProperty = path.slice(-1)[0]
        
        Vue.set(reference, lastProperty, value) 

        function checkReference(reference, key) {
            if (typeof reference !== 'object') throw new Error(`Invalid key ${key} at path: ${path.join('->')}`)
            if (reference.hasOwnProperty(key)) return true
        }
    }
}

export default {
  state,
  mutations
}
