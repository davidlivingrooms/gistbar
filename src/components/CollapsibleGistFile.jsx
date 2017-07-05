import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {inject, observer} from 'mobx-react'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/swift/swift'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/ruby/ruby'
import 'codemirror/mode/python/python'
import 'codemirror/mode/php/php'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/elm/elm'
import 'codemirror/mode/css/css'
import 'codemirror/mode/r/r'

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

  handleCopy = (content, e) => {
    e.stopPropagation()
    this.props.rootStore.copyToClipBoard(content, 'The gist content was copied to the clipboard.')
  }

  handleDisplayRaw = (e) => {
    e.stopPropagation()
    this.props.rootStore.openInDefaultBrowser(this.props.file.raw_url)
  }

  getHeaderContent = () => {
    const inlineBlock = {
      display: 'inline-block'
    }

    return (
      <div style={inlineBlock}>
        <p style={inlineBlock}>{this.props.fileName}</p>
        <div style={inlineBlock}>
          <FlatButton onTouchTap={this.handleCopy.bind(this, this.props.file.content)} label="Copy" primary={true} />
          <FlatButton onTouchTap={this.handleDisplayRaw} label="Raw" primary={true} />
        </div>
      </div>
    )
  }

  getCodeMirrorModeByFileExtension = (language = 'text') => {
    let codeMirrorMode
    switch (language.toLowerCase()) {
      case 'javascript':
        codeMirrorMode = 'javascript'
        break
      case 'css':
        codeMirrorMode = 'css'
        break
      case 'xml':
        codeMirrorMode = 'xml'
        break
      case 'markdown':
        codeMirrorMode = 'markdown'
        break
      case 'swift':
        codeMirrorMode = 'swift'
        break
      case 'sql':
        codeMirrorMode = 'sql'
        break
      case 'ruby':
        codeMirrorMode = 'ruby'
        break
      case 'python':
        codeMirrorMode = 'python'
        break
      case 'php':
        codeMirrorMode = 'php'
        break
      case 'jsx':
        codeMirrorMode = 'jsx'
        break
      case 'elm':
        codeMirrorMode = 'elm'
        break
      case 'r':
        codeMirrorMode = 'r'
        break
      default:
        codeMirrorMode = 'text'
        break
    }

    return codeMirrorMode
  }

  getGistContent = () => {
    const language = this.props.file.language ? this.props.file.language : 'text'
    const options = {
      lineNumbers: true,
      readOnly: true,
      mode: this.getCodeMirrorModeByFileExtension(language)
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