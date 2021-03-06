import fs from 'fs'
import path from 'path'
import store from '../vuex/store'

import {remote} from 'electron'

let {app} = remote

import * as types from '../vuex/mutation-types'

export default function linkMenu({router}) {
  app.on('project-was-set', function() {
    // store.dispatch('loadProject')
  })

  app.on('go-home', function() {
    router.push('/')
  })
}
