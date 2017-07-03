import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import {observer, inject} from "mobx-react";
import {ipcRenderer} from 'electron'

@inject('rootStore') @observer
export default class MoreOptionsButtonMenu extends React.Component {

  static propTypes = {
    onQuickCopyClicked: React.PropTypes.func,
    onQuickCopyWithDynamicReplaceClicked: React.PropTypes.func,
    onViewGistClicked: React.PropTypes.func,
    onEditGistClicked: React.PropTypes.func,
    onDeleteGistClicked: React.PropTypes.func,
  }

  constructor (props) {
    super(props)

    this.state = {
      isSnackBarOpen: false,
    }
  }

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        >
          <MenuItem onTouchTap={this.props.onQuickCopyClicked} primaryText="Quick Copy" />
          <MenuItem onTouchTap={this.props.onQuickCopyWithDynamicReplaceClicked} primaryText="Quick Copy with Dynamic Replace" />
          <MenuItem onTouchTap={this.props.onViewGistClicked} primaryText="View" />
          <MenuItem onTouchTap={this.props.onEditGistClicked} primaryText="Edit" />
          <MenuItem onTouchTap={this.props.onDeleteGistClicked} primaryText="Delete" />
        </IconMenu>
      </div>
    )
  }
}