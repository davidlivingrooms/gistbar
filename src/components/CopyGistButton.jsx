import React from 'react'
import IconButton from 'material-ui/IconButton'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import {ipcRenderer} from 'electron'
import {observer, inject} from "mobx-react";
import MoreOptionsButtonMenu from './MoreOptionsButtonMenu'

@observer
export default class CopyGistButton extends React.Component {

  static propTypes = {
    gist: React.PropTypes.object,
    moreOptionsButtonMenuProps: React.PropTypes.object,
  }

  constructor (props) {
    super(props)
  }

  onQuickCopyClicked = () => {
    const content = Object.values(this.props.gist.files)[0].content
    ipcRenderer.send('copy-contents-to-clipboard', content)
    this.props.rootStore.uiStore.snackBarMessage = 'Gist content copied to clipboard'
    this.props.rootStore.uiStore.isSnackBarOpen = true
  }

  onQuickCopyWithDynamicReplaceClicked = () => {
  }

  onViewGistClicked= () => {
    ipcRenderer.send('view-gist', this.props.gist)
  }

  onEditGistClicked= () => {
  }

  onDeleteGistClicked = () => {

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
          onTouchTap={this.onQuickCopyClicked}
        >
          <CopyIcon color={grey400} />
        </IconButton>

        <MoreOptionsButtonMenu
          onQuickCopyClicked={this.onQuickCopyClicked}
          onQuickCopyWithDynamicReplaceClicked={this.onQuickCopyWithDynamicReplaceClicked}
          onViewGistClicked={this.onViewGistClicked}
          onEditGistClicked={this.onEditGistClicked}
          onDeleteGistClicked={this.onDeleteGistClicked}
        />
      </div>
    )
  }
}