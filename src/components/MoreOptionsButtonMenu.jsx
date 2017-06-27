import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import {observer, inject} from "mobx-react";

@inject('rootStore') @observer
export default class MoreOptionsButtonMenu extends React.Component {

  static propTypes = {

  }

  constructor (props) {
    super(props)

    this.state = {
      isSnackBarOpen: false,
    }
  }

  onQuickCopyClicked = () => {
    this.props.rootStore.uiStore.snackBarMessage = 'Gist content copied to clipboard'
    this.props.rootStore.uiStore.isSnackBarOpen = true
  }

  onQuickCopyWithDynamicReplaceClicked = () => {
  }

  onViewGistClicked= () => {
  }

  onEditGistClicked= () => {
  }

  onDeleteGistClicked = () => {

  }

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        >
          <MenuItem onTouchTap={this.onQuickCopyClicked} primaryText="Quick Copy" />
          <MenuItem onTouchTap={this.onQuickCopyWithDynamicReplaceClicked} primaryText="Quick Copy with Dynamic Replace" />
          <MenuItem onTouchTap={this.onViewGistClicked} primaryText="View" />
          <MenuItem onTouchTap={this.onEditGistClicked} primaryText="Edit" />
          <MenuItem onTouchTap={this.onDeleteGistClicked} primaryText="Delete" />
        </IconMenu>
      </div>
    )
  }
}