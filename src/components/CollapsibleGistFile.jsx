import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {inject, observer} from 'mobx-react'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import CodeMirror from 'react-codemirror'

import 'codemirror/lib/codemirror.css'

@inject('rootStore') @observer
export default class CollapsibleGistFile extends React.Component{

  static PropTypes = {
    gist: React.PropTypes.object,
    file: React.PropTypes.object,
    fileName: React.PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      expanded: props.expanded ? props.expanded : false
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded})
  }

  handleCopy = (e) => {
    e.stopPropagation()
  }

  handleDisplayRaw = (e) => {
    e.stopPropagation()
  }

  getHeaderContent = () => {
    const inlineBlock = {
      display: 'inline-block'
    }

    return (
      <div style={inlineBlock}>
        <p style={inlineBlock}>{this.props.fileName}</p>
        <div style={inlineBlock}>
          <FlatButton onTouchTap={this.handleCopy} label="Copy" primary={true} />
          <FlatButton onTouchTap={this.handleDisplayRaw} label="Raw" primary={true} />
        </div>
      </div>
    )
  }

  getGistContent = () => {
   const options = {
      lineNumbers: true,
      readOnly: true,
    }

    return (
      <Paper zDepth={1} >
        <CodeMirror value={this.props.file.content} options={options} />
      </Paper>
    )
  }
  
  render () {
    const cardHeaderStyle = {
      padding: 0,
      marginBottom: 10,
    }

    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          style={cardHeaderStyle}
          actAsExpander={true}
          showExpandableButton={true}
          children={this.getHeaderContent()}
        />
        <CardText
          expandable={true}
          children={this.getGistContent()}
        >
        </CardText>
      </Card>
    )
  }
}