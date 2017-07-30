const { app, ipcMain, globalShortcut, Menu } = require('electron')
const menubar = require('menubar')
const {clipboard, BrowserWindow} = require('electron')
const axios = require('axios')

let detailsWindow = null
let accessToken = null

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

ipcMain.on('copy-to-clipboard', (event, gistContent) => {
  clipboard.writeText(gistContent)
})

ipcMain.on('launch-oauth-login', (event) => {
  let gitHubAuthWindow = new BrowserWindow({width: 600, height: 700, show: false, center: true, webPreferences: {nodeIntegration: false}})
  const options = {
    client_id: '4638f668643aed61b6e4',
    client_secret: '809cf17c977526696297e9acc7cb5f31f4f69718',
    scopes: ["gist"] // Scopes limit access for OAuth tokens.
  }

  const gitHubUrl = 'https://github.com/login/oauth/authorize?'
  const authUrl = gitHubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes

  gitHubAuthWindow.toggleDevTools()
  gitHubAuthWindow.loadURL(authUrl)
  gitHubAuthWindow.show()

  function requestGithubToken(options, code) {
    axios.post('https://github.com/login/oauth/access_token', {
      client_id: options.client_id,
      client_secret: options.client_secret,
      code: code,
    }).then(function (response, error) {
      if (response && response.statusText === 'OK') {
        // Success - Received Token, now extract it
        const accessTokenString = 'access_token='
        const tokenStartPosition = response.data.indexOf(accessTokenString) + accessTokenString.length
        const tokenEndPosition = response.data.indexOf('&scope')
        accessToken = response.data.slice(tokenStartPosition, tokenEndPosition)

        // Send it to the main app window
        mb.window.webContents.send('on-github-token-received', accessToken)
        if (detailsWindow) {
          // Send to the details view if it is open. // Is this a thing? If they logout shouldn't we close out the details window?
          detailsWindow.webContents.send('on-github-token-received', accessToken)
        }
      } else {
        // Error - Show messages.
        console.log(error);
      }
    })
  }

  function handleCallback (url) {
    const raw_code = /code=([^&]*)/.exec(url) || null
    const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null
    const error = /\?error=(.+)$/.exec(url)

    if (code || error) {
      // Close the browser if code found or error
      gitHubAuthWindow.destroy()
    }

    // If there is a code, proceed to get token from github
    if (code) {
      requestGithubToken(options, code)
    } else if (error) {
      alert('Oops! Something went wrong and we couldn\'t' +
        'log you in using Github. Please try again.')
    }
  }

  // Handle the response from github
  gitHubAuthWindow.webContents.on('will-navigate', function (event, url) {
    handleCallback(url)
  })

  gitHubAuthWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
    handleCallback(newUrl)
  })

// Reset the authWindow on close
  gitHubAuthWindow.on('close', function() {
    gitHubAuthWindow = null
  }, false)

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
  detailsWindow.loadURL(`file://${__dirname}/src/gistDetails/gistDetails.html`)


  detailsWindow.toggleDevTools()
  //TODO do this as soon as it is possible to send data
  setTimeout(()=> {
    detailsWindow.webContents.send('init-gist', gist)
    detailsWindow.webContents.send('on-github-token-received', accessToken)
  }, 1000)
})

ipcMain.on('close-details-view-on-delete', (event, gistId) => {
  if (detailsWindow) {
    detailsWindow.close()
  }

  mb.window.webContents.send('gist-deleted', gistId)
})

mb.on('after-show', function () {
  mb.window.webContents.send('focusSearchBar')
  setTimeout(() => {
    // mb.window.toggleDevTools()
  }, 1000)
})
