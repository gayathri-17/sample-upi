import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from 'App/Stores'
import RootScreen from './Containers/Root/RootScreen'
import OneSignal from 'react-native-onesignal'

export const { store, persistor } = createStore()

export default class App extends Component {
  constructor(props) {
    super(props)
    // ONESIGNAL
    OneSignal.init('931cc0c1-1413-4e5a-af87-76c644449326', { kOSSettingsKeyAutoPrompt: true }) // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS
  }

  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md
       */
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={null} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    )
  }
}
