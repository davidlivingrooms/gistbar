const { app, ipcMain, globalShortcut, Menu } = require('electron')
const menubar = require('menubar')
const {clipboard} = require('electron')

const mb = menubar({
  // dir: path.join(__dirname, '/app'),
  width: 1000,
  height: 800,
  // icon: path.join(__dirname, '//app/Icon-Template.png'),
  preloadWindow: true,
  windowPosition: 'topRight',
})

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

ipcMain.on('copy-contents-to-clipboard', (event, gistContent) => {
  console.log(gistContent)
  clipboard.writeText(gistContent)
  // event.sender.send('asynchronous-reply', 'pong')
})
