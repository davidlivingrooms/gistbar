import React from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import GistListContainer from './GistListContainer'

export default class MenuApp extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      gistFilter: '',
      searchContents: false
    }
  }

  onTextFieldChange = (event, newValue) => {
    this.setState({
      gistFilter: newValue
    })
  }

  onSearchContentChange = (event, newValue) => {
    this.setState({
      searchContents: newValue
    })
  }

  render () {
   return (
     <div>
       <TextField
         onChange={this.onTextFieldChange}
         hintText='Search by label, title, or language'
         fullWidth={true}
       />
       <Checkbox
         label="Search Contents"
         onCheck={this.onSearchContentChange}
       />
       <GistListContainer
         gistFilter={this.state.gistFilter}
         searchContents={this.state.searchContents}
       />
     </div>
   )
  }
}