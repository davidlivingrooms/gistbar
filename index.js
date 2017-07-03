const { app, ipcMain, globalShortcut, Menu } = require('electron')
const menubar = require('menubar')
const {clipboard, BrowserWindow} = require('electron')

const mb = menubar({
  // dir: path.join(__dirname, '/app'),
  width: 1000,
  height: 800,
  // icon: path.join(__dirname, '//app/Icon-Template.png'),
  preloadWindow: true,
  windowPosition: 'topRight',
})

let detailsWindow = null

const template = [
  {
    label: 'Gistbar',
    submenu: [
      {
        label: 'Quit App',
        accelerator: 'CommandOrControl+Q',
        selector: 'terminate:'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CommandOrControl+I',
        click: function () { mb.window.toggleDevTools() }
      }
    ]
  }
]

mb.on('ready', function ready () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // register the global wakeup shortcut
  globalShortcut.register('CommandOrControl+Shift+Space', () => {

    if (mb.window.isVisible()) {
      return mb.hideWindow()
    }

    mb.showWindow()
    mb.window.focus()
  })
})

mb.app.on('will-quit', function () {
  globalShortcut.unregisterAll()
})

ipcMain.on('copy-to-clipboard', (event, gistContent) => {
  clipboard.writeText(gistContent)
})

ipcMain.on('view-gist', (event, gist) => {
  if (detailsWindow === null) {
    detailsWindow = new BrowserWindow({width: 1600, height: 1200, show: false, center: true, })
    detailsWindow.on('closed', () => {
      detailsWindow = null
    })

    detailsWindow.once('ready-to-show', () => {
      detailsWindow.show()
    })
  }

  // Or load a local HTML file
  detailsWindow.loadURL(`file://${__dirname}/src/gistDetails.html`)

  detailsWindow.toggleDevTools()
  //TODO do this as soon as it is possible to send data
  setTimeout(()=> {
    detailsWindow.webContents.send('init-gist', gist)
  }, 1000)
})

mb.on('after-show', function () {
  mb.window.webContents.send('focusSearchBar')
  mb.window.toggleDevTools()
})
