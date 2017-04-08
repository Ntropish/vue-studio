import path from 'path'

import * as types from '../mutation-types'
import Vue from 'vue'

import Component from 'renderer/classes/Component'

function defaultState() {
    return {
        component: [{name: 'Hey'}],
        directive: [],
        filter: [],
        selected: null,
        selectedProperty: null
    }
}

const mutations = {
    CLEAR_PROJECT(state) {
        let newState = defaultState()

        Object.keys(newState).forEach((key) =>{
            Vue.set(state, key, newState[key])
        })
    },
    ADD_ASSET(state, data) {
        if (data.constructor === Component) {
            state.component.push(data)
        }
    },
    SELECT_ASSET(state, asset) {
        state.selected = asset
        state.selectedProperty = null
    },
    SELECT_PROPERTY(state, path) {
        state.selectedProperty = path
    },
    MODIFY_SELECTED(state, {path, value, rename}) {
        // console.log('setting', value, 'at', path.join('->'))
        
        let {type, index} = getLocation(state, state.selected)||{}

        if (!type || index === -1) throw new Error(`Selected item not found`)

        // Dereference the selected item for each thing in the path
        let reference = path.slice(0, -1).reduce((reference, key)=>{
            if (checkReference(reference, key)) {
                return reference[key]
            }

            reference[key] = {}

            return reference[key]

        }, state[type][index])

        let lastProperty = path.slice(-1)[0]
        checkReference(reference, lastProperty)

        reference[rename || lastProperty] = value || reference[lastProperty]        

        if (rename) {
            delete reference[lastProperty]
        }
        
        state[type][index] = Object.assign({}, state[type][index])
        state.selected = state[type][index]

        function checkReference(reference, key) {
            if (typeof reference !== 'object') throw new Error(`Invalid key ${key} at path: ${path.join('->')}`)
            if (reference.hasOwnProperty(key)) return true
        }
    }
}

function getLocation(state, asset) {
    let result = null
    let types = ['component', 'directive', 'filter']
    types.some(type=>{
        let index = state[type].indexOf(asset)
        if (index !== -1) {
            result = {type, index}
            return true
        }
    })
    return result
}

export default {
  state: defaultState(),
  mutations
}
