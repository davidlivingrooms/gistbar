import GistStore from './GistStore'
import UIStore from './UIStore'
export default class RootStore {

  constructor () {
    this.gistStore = new GistStore()
    this.uiStore = new UIStore()
  }
}