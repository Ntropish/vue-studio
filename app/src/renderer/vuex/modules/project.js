import path from 'path'

import * as types from '../mutation-types'
import Vue from 'vue'

import FileWrapper from '../models/FileWrapper'

const state = {
    base: {
        stats: null,
        dirs: {},
        files: {},
    },
    components: null
}

const mutations = {
    [types.CLEAR_PROJECT] (state) {
        state.base = {
        stats: null,
        dirs: {},
        files: {},
    }
    },
    [types.ADD_PROJECT_DIR] (state, data) {
        let place = state.base
        data.path.forEach(function(pathItem) {
            place = place.dirs[pathItem]
        })
        Vue.set(place.dirs, data.name, {stats: data.stats, dirs: {}, files: {}})
        
        if (data.name === 'components') {
            Vue.set(state, 'components',  place.dirs.components)
        }
    },
    [types.ADD_PROJECT_FILE] (state, data) {
        let place = state.base
        data.path.forEach(function(pathItem) {
            place = place.dirs[pathItem]
        })
        let fileWrapper = new FileWrapper({name: data.name, stats: data.stats, path: path.resolve(data.root, ...(data.path), data.name)})
        
        Vue.set(place.files, data.name, fileWrapper)

    },
    [types.SET_FILE_CONTENTS] (state, data) {
        data.file.fileContents = data.fileContents
    }
}

export default {
  state,
  mutations
}
