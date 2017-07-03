import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

export default class GistDescription extends React.Component{
  render () {
    return (
      <Card expanded={false} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title="Gist Title"
          subtitle="Subtitle"
        />
      </Card>
    )
  }
}