import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { deepOrange500 } from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
})

import { app_background } from '../config'

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  }

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={this.props.store}>
          <div style={{ height: '100%', backgroundColor: app_background }}>
            {this.content}
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
