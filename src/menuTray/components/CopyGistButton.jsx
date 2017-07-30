import React from 'react'
import IconButton from 'material-ui/IconButton'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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

    this.state = {
      isDialogOpen: false,
    }
  }

  onQuickCopyClicked = () => {
    const content = Object.values(this.props.gist.files)[0].content
    ipcRenderer.send('copy-to-clipboard', content)
    this.props.rootStore.uiStore.snackBarMessage = 'Gist content copied to clipboard'
    this.props.rootStore.uiStore.isSnackBarOpen = true
  }

  onQuickCopyWithDynamicReplaceClicked = () => {
    // const content = Object.values(this.props.gist.files)[0].content
    // const modifiedContent = content.replace(new RegExp('{{gist_replace}}', 'g'), 'testingReplace')
    // ipcRenderer.send('copy-to-clipboard', modifiedContent)
    // this.props.rootStore.uiStore.snackBarMessage = 'Gist content copied to clipboard'
    // this.props.rootStore.uiStore.isSnackBarOpen = true
    this.setState({
      isDialogOpen: true,
    })
    //TODO move dialog up to the menuaapp level. This failes because setState gets called on this component after it has unmounted
  }

  onViewGistClicked= () => {
    ipcRenderer.send('view-gist', this.props.gist)
  }

  onEditGistClicked= () => {
  }

  onDeleteGistClicked = () => {

  }

  handleDialogClose = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  render () {
    const containerDivStyle = {
      display: 'flex',
      flexDirection: 'column'
    }

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogClose}
      />,
    ]

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

        <Dialog
          title="Replace all instances of {{gist_replace}} with: "
          actions={actions}
          modal={false}
          open={this.state.isDialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          Open a Date Picker dialog from within a dialog.
          <TextField
            hintText="Enter replacement text"
          />
        </Dialog>
      </div>
    )
  }
}