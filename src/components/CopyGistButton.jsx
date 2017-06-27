import React from 'react'
import IconButton from 'material-ui/IconButton'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
const {ipcRenderer} = require('electron')
import {observer, inject} from "mobx-react";
import MoreOptionsButtonMenu from './MoreOptionsButtonMenu'

@observer
export default class CopyGistButton extends React.Component {

  constructor (props) {
    super(props)
  }

  copyGistContentsToClipboard = (event) => {
    ipcRenderer.send('copy-contents-to-clipboard', this.props.content)
    this.props.rootStore.uiStore.snackBarMessage = 'Gist content copied to clipboard'
    this.props.rootStore.uiStore.isSnackBarOpen = true
  }

  render () {

    const containerDivStyle = {
      display: 'flex',
      flexDirection: 'column'
    }

    return (
      <div style={containerDivStyle}>
        <IconButton
          touch={true}
          tooltip="Quick Copy"
          tooltipPosition="bottom-left"
          onTouchTap={this.copyGistContentsToClipboard}
        >
          <CopyIcon color={grey400} />
        </IconButton>

        <MoreOptionsButtonMenu />
      </div>
    )
  }
}