import {observable} from 'mobx'
import {ipcRenderer, shell} from 'electron'
import {apiRequestAuth} from '../../utils/requestUtils'
import UIStore from '../../menuTray/stores/UIStore'
export default class GistDetailsStore {

  @observable gist = {}
  @observable isLoading = true
  uiStore = new UIStore()

  constructor () {
    ipcRenderer.on('init-gist', (events, gist) => {
      // debugger
      this.gist = gist
      this.isLoading = false
    })

    ipcRenderer.on('on-github-token-received', (event, accessToken) => {
      this.accessToken = accessToken
      // this.isLoggedIn = true
    })
  }

  copyToClipBoard = (content, message) => {
    ipcRenderer.send('copy-to-clipboard', content)

    if (message) {
      this.uiStore.snackBarMessage = message
      this.uiStore.isSnackBarOpen = true
    }
  }

  openInDefaultBrowser = (url) => {
    shell.openExternal(url)
  }

  openConfirmGistDelete = () => {
    //TODO after oAuth
  }

  editGist = () => {
    //TODO after oAuth
  }

  deleteGist= () => {
    apiRequestAuth('https://api.github.com/gists/' + this.gist.id, 'delete', this.accessToken)
      .then((response) => {
        if (response.statusText === 'No Content') {
          // close the window
          ipcRenderer.send('close-details-view-on-delete', this.gist.id)
        }
      })
  }
}