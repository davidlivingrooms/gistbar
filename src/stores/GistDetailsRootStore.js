import GistDetailsStore from './GistDetailsStore'
import GistDetailsUIStore from './GistDetailsUIStore'

export default class GistDetailsRootStore {
  constructor () {
    this.gistStore = new GistDetailsStore()
    this.uiStore = new GistDetailsUIStore()
  }
}