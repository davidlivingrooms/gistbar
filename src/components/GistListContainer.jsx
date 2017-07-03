import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import axios from 'axios'
import GistList from './GistList'
import PropTypes from 'prop-types'

export default class GistListContainer extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      gists: [],
      isLoading: true,
    }
  }

  requestGistDetailsById (id) {
    return axios.get('https://api.github.com/gists/' + id)
  }

  componentDidMount () {
    // TODO learn how to authenticate users
    // TODO needs to work with multiple files. gists can have multiple files

    const _this = this
    axios({
      method:'get',
      url:'https://api.github.com/users/davidlivingrooms/gists',
    })
      .then((response) =>  {
        const data = response.data
        const gistDetailPromises = data.map((gist) => this.requestGistDetailsById(gist.id))
        return axios.all(gistDetailPromises)
      })
      .then((gistList) => {
        const gists = gistList.map((gistDetails) => {
          return gistDetails.data
        })

        _this.setState({
          gists,
          isLoading: false,
        })
      })
  }

  render () {
    return (
      this.state.isLoading
        ? <CircularProgress size={80} thickness={5} /> // TODO center
        : <GistList gists={this.state.gists} gistFilter={this.props.gistFilter} searchContents={this.props.searchContents}/>
    )
  }
}