import {observable} from 'mobx'

export default class GistStore {

  @observable gists = []
  @observable isLoading = true

  constructor () {
    this.loadGists()
  }

  loadGists = () => {

  }
}