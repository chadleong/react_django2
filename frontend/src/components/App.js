import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Header from './layout/Header'
import Dashboard from './leads/Dashboard'
import Alerts from './layout/Alerts'

import { Provider } from 'react-redux'
import store from '../store'

const alertOptions = {
  timeout: 3000,
  position: 'top center',
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loaded: false,
      placeholder: 'Loading biatch..',
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Fragment>
            <Header />
            <Alerts />
            <div className="container">
              <Dashboard />
            </div>{' '}
          </Fragment>{' '}
        </AlertProvider>{' '}
      </Provider>
    )
  }
}

export default App
const container = document.getElementById('app')
render(<App />, container)
