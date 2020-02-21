import React from 'react'
import { AppLoading, Font } from 'expo'
import AppNavigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/appRedux'
import ApiKeys from './src/constants/apiKeys'
import * as firebase from 'firebase'

import { YellowBox } from 'react-native'
import _ from 'lodash'

YellowBox.ignoreWarnings(['Setting a timer'])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message)
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    console.ignoredYellowBox = ['Setting a timer']
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig)
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigation />
          </PersistGate>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        regular: require('./assets/fonts/Ubuntu-Regular.ttf'),
        light: require('./assets/fonts/Ubuntu-Light.ttf')
      })
    ])
  }

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishLoading = () => {
    if (firebase.apps.length) this.setState({ isLoadingComplete: true })
  }
}
