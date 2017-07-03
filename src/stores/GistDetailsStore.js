import {observable} from 'mobx'
import {ipcRenderer, shell} from 'electron'
import UIStore from './UIStore'
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
}