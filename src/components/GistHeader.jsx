import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {inject, observer} from 'mobx-react'
import FlatButton from 'material-ui/FlatButton'

@inject('rootStore') @observer
export default class GistHeader extends React.Component {

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
          <FlatButton onTouchTap={this.props.rootStore.openConfirmGistDelete} label="Delete" secondary={true} />
        </div>
      </div>
    )
  }

  render () {

    return (
      <Card expanded={false} style={{marginBottom: 10}}onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.rootStore.gist.description}
          children={this.getHeaderContent()}
        />
     </Card>
    )
  }
}