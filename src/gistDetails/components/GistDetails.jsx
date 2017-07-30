import React from 'react'
import {inject, observer} from 'mobx-react'
import Divider from 'material-ui/Divider'
import GistHeader from './GistHeader'
import CollapsibleGistFile from './CollapsibleGistFile'
import Snackbar from 'material-ui/Snackbar'
@inject('rootStore') @observer
export default class GistDetails extends React.Component {

  getFileCards = (files) => {
    const fileCards = []
    if (!files) {
      return fileCards
    }

    const filesNames = Object.keys(files)
    return filesNames.map((fileName) => {
      return (
        <CollapsibleGistFile fileName={fileName} file={files[fileName]}/>
      )
    })
  }

  render () {
    return (
      <div>
        <GistHeader />
        {this.getFileCards(this.props.rootStore.gist.files)}
        <Snackbar
          open={this.props.rootStore.uiStore.isSnackBarOpen}
          message={this.props.rootStore.uiStore.snackBarMessage}
          onRequestClose={this.props.rootStore.uiStore.onSnackBarRequestClosed}
          autoHideDuration={2000}
        />
      </div>
    )
  }
}