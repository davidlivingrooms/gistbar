import {observable} from 'mobx'
import {ipcRenderer} from 'electron'

export default class GistDetailsStore {

  @observable gist = {}
  @observable isLoading = true

  constructor () {
    ipcRenderer.on('init-gist', (events, gist) => {
      // debugger
      this.gist = gist
      this.isLoading = false
    })
  }
}