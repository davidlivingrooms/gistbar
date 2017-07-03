import React from 'react'
import {ipcRenderer} from 'electron'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {observer, inject, Provider} from "mobx-react"
import GistListContainer from './GistListContainer'
import Snackbar from 'material-ui/Snackbar'

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
      this.refs.gistFilter.focus()
    })
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

  render () {
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
}