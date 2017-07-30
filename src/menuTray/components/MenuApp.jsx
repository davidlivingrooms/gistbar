import React from 'react'
import {ipcRenderer} from 'electron'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {observer, inject, Provider} from "mobx-react"
import RaisedButton from 'material-ui/RaisedButton';
import GistListContainer from './GistListContainer'
import Snackbar from 'material-ui/Snackbar'
import Paper from 'material-ui/Paper';

@inject('rootStore') @observer
export default class MenuApp extends React.Component {

  constructor (props) {
    super(props)

    this.uiStore = props.rootStore.uiStore

    this.state = {
      gistFilter: '',
      isSearchBarFocused: true,
      searchContents: false,
      isSnackBarOpen: false,
      snackBarMessage: '',
    }

    ipcRenderer.on('focusSearchBar', (events, args) => {
      if (this.props.rootStore.gistStore.isLoggedIn) {
        this.refs.gistFilter.focus()
      }
    })
  }

  updateHtmlBodyStylesBasedOnView = () => {
    if (this.props.rootStore.gistStore.isLoggedIn) {
      // Undo the styles added from the login view
      document.body.className = ''
      document.getElementsByTagName('html')[0].className = ''
      document.getElementById('root').className = ''
    }
    else {
      document.body.className = 'loginPageBody'
      document.getElementsByTagName('html')[0].className = 'loginPageHtml'
      document.getElementById('root').className = 'loginPageRoot'
    }
  }

  componentDidMount () {
    this.updateHtmlBodyStylesBasedOnView()
  }

  componentDidUpdate () {
    this.updateHtmlBodyStylesBasedOnView()
  }

  onTextFieldChange = (event, newValue) => {
    this.setState({
      gistFilter: newValue
    })
  }

  onSearchContentChange = (event, newValue) => {
    this.setState({
      searchContents: newValue
    })
  }

  getMainView = () => {

    return (
      <div>
        <TextField
          onChange={this.onTextFieldChange}
          ref="gistFilter"
          hintText='Search by label, title, or language'
          fullWidth={true}
        />
        <Checkbox
          label="Search Contents"
          onCheck={this.onSearchContentChange}
        />
        <GistListContainer
          gistFilter={this.state.gistFilter}
          searchContents={this.state.searchContents}
        />
        <Snackbar
          open={this.uiStore.isSnackBarOpen}
          message={this.uiStore.snackBarMessage}
          onRequestClose={this.uiStore.onSnackBarRequestClosed}
          autoHideDuration={2000}
        />
      </div>
    )
  }

  getGitHubLoginView = () => {
    const divStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }

    const style = {
      height: 400,
      width: 300,
      margin: 20,
      display: 'flex',
    }

    const imgStyle = {
      height: 250,
      width: 300,
    }

    const contentWrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    }

    const gitHubLoginContents = (
      <div style={contentWrapperStyle}>
        <img style={imgStyle} src="./dist/img/Octocat.jpg"></img>
        <RaisedButton label="GitHub Login" onTouchTap={this.props.rootStore.gistStore.launchGitHubOAuthLogin} primary={true}/>
      </div>
    )

    return (
      <div style={divStyle}>
        <Paper style={style} zDepth={5} children={gitHubLoginContents} />
      </div>
    )
  }

  render () {
    return this.props.rootStore.gistStore.isLoggedIn ? this.getMainView() : this.getGitHubLoginView()
  }
}