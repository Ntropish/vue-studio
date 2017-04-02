
import {remote} from 'electron'

import * as types from './mutation-types'

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER)
}

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER)
}

export const select = ({commit}, data) => {
  if (data.stats.isFile()) {
    data.read().then(function(fileContents) {
      commit(types.SET_FILE_CONTENTS, {file: data, fileContents})
      commit(types.SET_SELECTED, data)
    }).catch(function(e) {
      console.log('error reading file:', e)
    })
  } else {
      commit(types.SET_SELECTED, data)
  }
}



