import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from "mobx-react"
import GistDetails from './components/GistDetails'
import GistDetailsStore from './stores/GistDetailsStore'

injectTapEventPlugin() // Needed for material-ui. See https://github.com/callemall/material-ui#react-tap-event-plugin

const App = () => (
  <MuiThemeProvider>
    <GistDetails />
  </MuiThemeProvider>
)

const rootStore = new GistDetailsStore()

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
