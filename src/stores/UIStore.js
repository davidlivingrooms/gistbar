import {observable} from 'mobx'

export default class UIStore{

  @observable snackBarMessage = ''
  @observable isSnackBarOpen = false

  displaySnackBarMessage (message) {
    this.isSnackBarOpen = true
    this.snackBarMessage = message
  }
}