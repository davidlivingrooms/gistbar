import React from 'react'
import IconButton from 'material-ui/IconButton'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
const {ipcRenderer} = require('electron')


export default class CopyGistButton extends React.Component {

  constructor (props) {
    super(props)
  }

  copyGistContentsToClipboard = (event) => {
    ipcRenderer.send('copy-contents-to-clipboard', this.props.content)
  }

  render () {
    return (
      <IconButton
        touch={true}
        tooltip="Copy"
        tooltipPosition="bottom-left"
        onTouchTap={this.copyGistContentsToClipboard}
      >
        <CopyIcon color={grey400} />
      </IconButton>
    )
  }
}