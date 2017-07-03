import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {inject, observer} from 'mobx-react'
import GistDescription from './GistDescription'
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
          <FlatButton onTouchTap={()=>{}} label="Edit" primary={true} />
          <FlatButton onTouchTap={()=>{}} label="Revisions" primary={true} />
          <FlatButton onTouchTap={()=>{}} label="Share" primary={true} />
          <FlatButton onTouchTap={()=>{}} label="Delete" secondary={true} />
        </div>
      </div>
    )
  }

  render () {

    return (
      <Card expanded={false} style={{marginBottom: 10}}onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.rootStore.gistStore.gist.description}
          children={this.getHeaderContent()}
        />
     </Card>
    )
  }
}