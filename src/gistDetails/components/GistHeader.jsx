import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {inject, observer} from 'mobx-react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

@inject('rootStore') @observer
export default class GistHeader extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      deleteDialogOpen: false,
    }
  }

  getHeaderContent = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <div>
          <FlatButton onTouchTap={this.props.rootStore.editGist} label="Edit" primary={true} />
          <FlatButton onTouchTap={this.props.rootStore.openInDefaultBrowser.bind(this, this.props.rootStore.gist.html_url + '/revisions')} label="Revisions" primary={true} />
          <FlatButton onTouchTap={this.props.rootStore.copyToClipBoard.bind(this, this.props.rootStore.gist.html_url, 'The gist share link has been copied to the clipboard.')} label="Share" primary={true} />
          <FlatButton onTouchTap={this.handleDeleteDialogOpen} label="Delete" secondary={true} />
        </div>
      </div>
    )
  }

  handleDeleteDialogOpen = () => {
    this.setState({deleteDialogOpen: true});
  }

  handleDeleteDialogClose = () => {
    this.setState({deleteDialogOpen: false});
  }

  handleDeleteConfirmed = () => {
    this.handleDeleteDialogClose()
    this.props.rootStore.deleteGist()
  }

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleDeleteDialogClose}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        onTouchTap={this.handleDeleteConfirmed}
      />,
    ]

    return (
      <div>
        <Card expanded={false} style={{marginBottom: 10}} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title={this.props.rootStore.gist.description}
            children={this.getHeaderContent()}
          />
       </Card>
        <Dialog
          title="Delete this gist?"
          actions={actions}
          modal={false}
          open={this.state.deleteDialogOpen}
          onRequestClose={this.handleDeleteDialogClose}
        >
        </Dialog>
      </div>
    )
  }
}