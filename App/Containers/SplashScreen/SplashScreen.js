import React from 'react'
import { View, Linking, Image, Platform } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './SplashScreenStyle'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import AsyncStorage from '@react-native-community/async-storage'
import LocalStoreKey from 'App/Constants/LocalStoreKey'

/**
 * It contains the brand icon until get loads the app components
 */
export class SplashScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      faceIdEnabled: false,
      touchIdEnabled: false,
      passCodeEnabled: false,
    }
  }

  /**
   * Intial Function to navigate Entry screen or sign up thanks screen based on deep linking
   */
  componentDidMount() {
    this.getAsyncData(LocalStoreKey.FACE_ID)
    this.getAsyncData(LocalStoreKey.TOUCH_ID)
    this.getAsyncData(LocalStoreKey.PASSCODE)
    // Set default language
    I18n.locale = this.props.language // get user default language from store
    // Add Listeners for deep linking
    Linking.addEventListener('url', this.handleOpenURL)
    //  Check conditon to open entry screen or sign up thanks screen based on deep link response
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url })
      } else {
        this.navigateTimer()
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* {<Logo /> } */}
            <Image
              style={styles.logo}
              source={require('App/Assets/Images/Mercury_Animated_Logo.gif')}
            />
          </View>
        </View>
      </View>
    )
  }

  /**
   * @param {Object} urlObj refers the url from deep link to be passed to signup thanks screen
   */
  handleOpenURL(urlObj) {
    if (urlObj.url.indexOf('reset-password') > -1)
      Navigator.navigateAndReset(NavKeys.FORGOT_PASSWORD, {
        url: urlObj.url,
      })
    else
      Navigator.navigateAndReset(NavKeys.LOGIN, {
        url: urlObj,
      })
  }
  /**
   * Navigate to screen based on the condition
   */
  navigateTimer() {
    setTimeout(
      () => {
        this.navigateToScreen()
      },
      Platform.OS === 'android' ? 2900 : 4200
    )
  }
  navigateToScreen() {
    const { faceIdEnabled, touchIdEnabled, passCodeEnabled } = this.state
    if (this.props.token) {
      if (faceIdEnabled === true || touchIdEnabled === true || passCodeEnabled === true) {
        Navigator.navigateAndReset(NavKeys.LOCAL_AUTH, {
          passCodeEnabled: passCodeEnabled,
          touchIdEnabled: touchIdEnabled,
          faceIdEnabled: faceIdEnabled,
        })
      } else {
        Navigator.navigateAndReset(NavKeys.SUCCESS_MESSAGE_SCREEN)
      }
    } else {
      Navigator.navigateAndReset(NavKeys.ENTRY)
    }
  }

  /**
   * get value based on key
   * @param {string} key to get local value
   */
  async getAsyncData(key) {
    let value = await AsyncStorage.getItem(key)
    switch (key) {
      case LocalStoreKey.FACE_ID:
        this.setState({ faceIdEnabled: value === 'true' })
        break

      case LocalStoreKey.TOUCH_ID:
        this.setState({ touchIdEnabled: value === 'true' })
        break

      case LocalStoreKey.PASSCODE:
        this.setState({ passCodeEnabled: value === 'true' })
        break
    }
  }
}

SplashScreen.propTypes = {
  token: PropTypes.string,
  language: PropTypes.string,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  token: state.user.token,
  language: state.user.language,
})

export default connect(
  mapStateToProps,
  null
)(SplashScreen)
