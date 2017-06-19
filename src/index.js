import React from 'react'
import ReactDOM from 'react-dom'
import MenuApp from './components/MenuApp'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin() // Needed for material-ui. See https://github.com/callemall/material-ui#react-tap-event-plugin

const App = () => (
  <MuiThemeProvider>
    <MenuApp />
  </MuiThemeProvider>
)

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
