import {observable} from 'mobx'
import {ipcRenderer} from 'electron'
import {apiRequestAuth} from '../../utils/requestUtils'
import axios from 'axios'

export default class GistStore {

  @observable gists = []
  @observable isLoading = true
  @observable isLoggedIn = false
  @observable accessToken = null

  constructor () {
    ipcRenderer.on('on-github-token-received', (event, accessToken) => {
      this.accessToken = accessToken
      this.isLoggedIn = true

      this.loadGists()
    })

    ipcRenderer.on('gist-deleted', (event, gistId) => {
      this.gists = this.gists.filter((gist) => {
        return gist.id !== gistId
      })
    })

    ipcRenderer.on('focusSearchBar', (events, args) => {
      if (this.isLoggedIn && this.refs && this.refs.gistFilter) {
        this.refs.gistFilter.focus()
      }
    })
  }

  loadGists = () => {
    const _this = this
    const url = 'https://api.github.com/users/davidlivingrooms/gists'
    apiRequestAuth(url, 'get', this.accessToken)
    .then((response) =>  {
      const data = response.data
      const gistDetailPromises = data.map((gist) => apiRequestAuth('https://api.github.com/gists/' + gist.id, 'get', this.accessToken))
      return axios.all(gistDetailPromises)
    })
    .then((gistList) => {
      const gists = gistList.map((gistDetails) => {
        return gistDetails.data
      })

      _this.isLoading = false
      _this.gists = gists
    })
  }

  launchGitHubOAuthLogin = () => {
    ipcRenderer.send('launch-oauth-login')
  }
}