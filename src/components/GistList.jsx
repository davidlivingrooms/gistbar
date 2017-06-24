import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import CopyGistButton from './CopyGistButton'

export default class GistList extends React.Component {

  static propTypes = {
    gists: PropTypes.array, // The list of gists
    gistFilter: PropTypes.string, // The gist filter value
    searchContents: PropTypes.bool, // Whether or not to search the contents of the gist in addition to the description
  }

  // returns true is stringA is a substring of stringB. Won't work for i18n because of german, turkish, etc
  isSubstring = (stringA, stringB) => {
    return stringB.toLowerCase().indexOf(stringA.toLowerCase()) !== -1
  }

  isTextInGistFiles = (text, files) => {
    let isTextInGistFiles = false
    files.forEach((file) => {
      if (this.isSubstring(text, file.content)) {
        isTextInGistFiles = true
      }
    })

    return isTextInGistFiles
  }

  render() {
    return (
      <List>
        { // TODO we should have a recent section at the top if there is no gist filter
          // results should be sorted by label first, then title, then description
          this.props.gists
            .filter((gist) => {
              if (!this.props.gistFilter) {
                return true // if there is no filter then return all results
              }

              const isSearchTextInDescription = this.isSubstring(this.props.gistFilter, gist.description)
              if (this.props.searchContents) {
                return isSearchTextInDescription || this.isTextInGistFiles(this.props.gistFilter, Object.values(gist.files))
              }
              else if (this.props.gistFilter) {
                return isSearchTextInDescription
              }
            })
            .map((gist) => {
              return (
                <div>
                  <ListItem
                    primaryText={gist.description}
                    rightIconButton={(new CopyGistButton({content: Object.values(gist.files)[0].content})).render()}
                    secondaryText={
                      <p> {Object.values(gist.files)[0].content} </p> // We only show the first file preview
                    }
                    secondaryTextLines={2}
                  />
                  <Divider inset={false} />
                </div>
              )
            })
        }
      </List>
    )
  }
}