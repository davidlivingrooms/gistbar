import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from "mobx-react"
import MenuApp from './menuTray/components/MenuApp'
import RootStore from './menuTray/stores/RootStore'

injectTapEventPlugin() // Needed for material-ui. See https://github.com/callemall/material-ui#react-tap-event-plugin

const App = () => (
  <MuiThemeProvider>
    <MenuApp />
  </MuiThemeProvider>
)

const rootStore = new RootStore();

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
