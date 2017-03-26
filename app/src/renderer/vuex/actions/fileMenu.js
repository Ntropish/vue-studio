import path from 'path'
import fs from 'fs'

import * as types from '../mutation-types'

import {remote} from 'electron'


export const loadProject = ({ commit }, projectDirectory=remote.getGlobal('store').project) => {
  commit(types.CLEAR_PROJECT)

  function walkFile(root, tail = []) {
    fs.readdir(path.resolve(root, ...tail), function(err, data) {
      data.forEach(function(dirOrFile) {
        fs.stat(path.resolve(root, ...tail, dirOrFile), function(err, stats) {
          if (err) console.log(err)

          if (stats.isFile()) {
            commit(types.ADD_PROJECT_FILE, {stats, root: root, path: tail, name: dirOrFile})
          }

          if (stats.isDirectory()) {

            // Ignore node modules
            if (dirOrFile === 'node_modules') return
            
            commit(types.ADD_PROJECT_DIR, {stats, root: root, path: tail, name: dirOrFile})
            walkFile(root, tail.concat(dirOrFile))
          }
        })
      })
    })
  }

  if (projectDirectory) walkFile(projectDirectory)
}