'use strict'

import { app, BrowserWindow, Menu, MenuItem, dialog  } from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  let menu = Menu.getApplicationMenu()

  // Item 0 is file menu
  let fileMenu = menu.items[0]

  let loadProjectItem = new MenuItem({label: 'Load Project', click() {
      dialog.showOpenDialog({properties: ['openDirectory']}, function(result) {
        global.store.project = result[0]
        app.emit('project-was-set')
      })
  }})

  let goHome = new MenuItem({label: 'Home', click() {
      app.emit('go-home')
  }})
  
  fileMenu.submenu.append(goHome);
  fileMenu.submenu.append(loadProjectItem);
  

  global.store = {
    project: ''
  }
}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
