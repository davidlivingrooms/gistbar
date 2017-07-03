import React from 'react'
import {inject, observer} from 'mobx-react'
import Divider from 'material-ui/Divider'
import GistHeader from './GistHeader'

import CollapsibleGistFile from './CollapsibleGistFile'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';

@inject('rootStore') @observer
export default class GistDetails extends React.Component {

  getFileCards = (files) => {
    const fileCards = []
    if (!files) {
      return fileCards
    }

    const filesNames = Object.keys(files)
    return filesNames.map((fileName) => {
      return (
        <CollapsibleGistFile fileName={fileName} file={files[fileName]}/>
      )
    })
  }

  render () {
    console.log(this.props.rootStore.gistStore.gist)

    return (
      <div>
        <GistHeader />
        {this.getFileCards(this.props.rootStore.gistStore.gist.files)}
      </div>
    )
  }
}