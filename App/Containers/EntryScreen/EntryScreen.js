/**
 * This file contains the UI/UX for the entry screen which has two major options such as "Log In" and "Sign Up"
 * Log In - It navigates user to Log in screen
 * Sign Up - It navigates user to do them new registration with the app
 *
 * This screen will appear while opening the application until user gets into login with them credentials
 */
import React from 'react'
import { View, Text } from 'react-native'
import styles from './EntryScreenStyle'
import Logo from 'App/Assets/Images/Svg/Logo'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'

export default class EntryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} testID={'logo'}>
            <Logo />
          </View>
          <Text style={styles.logoText}>
            <Text style={styles.mercuryText}>{I18n.t('MERCURY_DOT')}</Text>
            <Text style={styles.cashText}>{I18n.t('CASH')}</Text>
          </Text>
        </View>

        <View style={styles.infoTextView}>
          <Text style={styles.infoText} testID={'infoText'}>
            {I18n.t('BUY_SEND_AND_EXCHANGE_FIAT_CURRENCY_WITH_CRYPTO')}
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.signupView}>
            <Button
              text={I18n.t('SIGN_UP')}
              withShadow={true}
              withBg={true}
              testID={'signup'}
              onClick={() => this.onClickSignUp()}
            />
          </View>

          <View style={styles.loginView}>
            <Button
              text={I18n.t('LOGIN')}
              withBorder={true}
              testID={'login'}
              onClick={() => this.onClickLogin()}
            />
          </View>
        </View>
      </View>
    )
  }

  /**
   * Click event for the navigation to Signup screen
   */
  onClickSignUp = () => {
    return Navigator.navigate(NavKeys.SIGN_UP)
  }

  /**
   * Click event for the navigation to login screen
   */
  onClickLogin = () => {
    return Navigator.navigate(NavKeys.LOGIN)
  }
}
