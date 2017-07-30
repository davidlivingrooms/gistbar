import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import {observer, inject} from 'mobx-react'
import GistList from './GistList'
import PropTypes from 'prop-types'

@inject('rootStore') @observer
export default class GistListContainer extends React.Component {

  constructor (props) {
    super(props)
    this.gistStore = props.rootStore.gistStore
  }

  render () {
    return (
      this.gistStore.isLoading
        ? <CircularProgress size={80} thickness={5} />
        : <GistList gists={this.gistStore.gists} gistFilter={this.props.gistFilter} searchContents={this.props.searchContents}/>
    )
  }
}