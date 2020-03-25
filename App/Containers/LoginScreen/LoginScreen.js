/**
 *  User can do login to get auth token by enter email, password and twoFactorAuth(if enabled)
 */
import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  NativeModules,
} from 'react-native'
import styles from './LoginScreenStyle'
import Logo from 'App/Assets/Images/Svg/Logo'
import InputField from 'App/Components/InputField/InputField'
import Line from 'App/Components/Line/Line'
import Button from 'App/Components/Button/Button'
import UserActions from 'App/Stores/User/Actions'
import { isValidPassword, showAlert } from 'App/Components/Utils/Functions'
import isEmail from 'validator/lib/isEmail'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import OneSignal from 'react-native-onesignal'

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isValidEmail: true,
      isValidPassword: true,
      loginData: {
        email: '',
        password: '',
        version: 1,
        os: Platform.OS === 'ios' ? 2 : 1,
        tfa: '',
        playerId: '',
      },
    }
    // ONESIGNAL
    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onReceived(notification) {
    console.log('Notification received: ', notification)
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)
  }

  componentDidMount() {
    if (Platform.OS === 'android') NativeModules.SharedStorage.disableTotalHoldings()
  }

  onIds = (device) => {
    this.setState({ loginData: { ...this.state.loginData, playerId: device.userId } })
    console.log('Device info: ', device)
  }

  render() {
    // To access current component state
    const { isValidEmail } = this.state
    const { email, password, tfa } = this.state.loginData
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}
            enabled
            keyboardVerticalOffset={150}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logoStyle}>
                <Logo />
              </View>
            </View>

            <View style={styles.fieldContainer}>
              <InputField
                testID={'email'}
                isValid={isValidEmail}
                textStyle={styles.inputTextStyle}
                placeholder={I18n.t('EMAIL')}
                type={'email-address'}
                text={email}
                onChangeText={(text) => this.onEmailChangeText(text)}
              />
              <InputField
                testID={'password'}
                isValid={true}
                textStyle={styles.inputTextStyle}
                placeholder={I18n.t('PASSWORD')}
                type={'default'}
                obscureText={true}
                text={password}
                onChangeText={(text) => this.onPasswordChangeText(text)}
              />
              <View style={styles.forgotContainer}>
                <Text style={styles.blackSmallTextStyle}>{I18n.t('FORGOT')} </Text>
                <TouchableOpacity>
                  <Text style={styles.greenSmallTextStyle}>{I18n.t('EMAIL')}</Text>
                </TouchableOpacity>
                <Text style={styles.blackSmallTextStyle}>{I18n.t('OR')}</Text>
                <TouchableOpacity
                  onPress={this.onForgotPasswordClicked}
                  style={styles.rowContainer}
                >
                  <Text style={styles.greenSmallTextStyle}>{I18n.t('PASSWORD')}</Text>
                  <Text style={styles.blackSmallTextStyle}>{I18n.t('QUESTION_MARK')}</Text>
                </TouchableOpacity>
              </View>
              <Line styleProp={styles.lineStyle} />
              <InputField
                testID={'twoFactorAuth'}
                isValid={true}
                textStyle={styles.inputTextStyle}
                placeholder={I18n.t('FA_ENABLED')}
                maxLength={6}
                type={'number-pad'}
                password={false}
                text={tfa}
                onChangeText={(text) => this.onTwoWayAuthChangeText(text)}
              />
              <View style={styles.bottomContainer}>
                <Text style={styles.blackSmallTextStyle}>{I18n.t('WHAT_IS')} </Text>
                <TouchableOpacity style={styles.rowContainer}>
                  <Text style={styles.greenSmallTextStyle}>{I18n.t('TWO_WAY_AUTHENTICATION')}</Text>
                  <Text style={styles.blackSmallTextStyle}>{I18n.t('QUESTION_MARK')}</Text>
                </TouchableOpacity>
              </View>
              <Line styleProp={styles.lineStyle} />
              <Button
                testID={'login'}
                withBg={true}
                withShadow={true}
                text={I18n.t('LOGIN')}
                style={styles.submitButtonStyle}
                onClick={this.onLoginClick}
              />
              <View style={styles.bottomContainer}>
                <Text style={styles.blackSmallTextStyle}>{I18n.t('DONT_HAVE_ACCOUNT')} </Text>
                <TouchableOpacity onPress={this.onClickSignUp}>
                  <Text style={styles.greenSmallTextStyle}>{I18n.t('SIGN_UP')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   *
   * @param {String} email updates in state object when enters by user
   */
  onEmailChangeText(email) {
    this.setState({
      loginData: { ...this.state.loginData, email: email },
      isValidEmail: isEmail(email),
    })
  }

  /**
   * navigate to the forgot password screen
   */
  onForgotPasswordClicked = () => {
    Navigator.navigate(NavKeys.FORGOT_PASSWORD, { url: '' })
  }
  /**
   *
   * @param {String} password updates in state object when enters by user
   */
  onPasswordChangeText(password) {
    this.setState({
      loginData: { ...this.state.loginData, password },
      isValidPassword: isValidPassword(password),
    })
  }

  /**
   *
   * @param {String} tfa updates in state object when enters two factor authentication code
   */
  onTwoWayAuthChangeText(tfa) {
    this.setState({ loginData: { ...this.state.loginData, tfa } })
  }

  // Login submit function.
  onLoginClick = () => {
    const { email, password } = this.state.loginData
    if (email.length === 0) {
      this.setState({ isValidEmail: false })
    } else if (password.length === 0) {
      this.setState({ isValidPassword: false })
    } else if (isEmail(email)) {
      this.props.fetchUserLogin(this.state.loginData, showAlert)
    }
  }

  // Click event for the navigation to Signup screen
  onClickSignUp = () => {
    return Navigator.navigate(NavKeys.SIGN_UP)
  }
}

LoginScreen.propTypes = {
  fetchUserLogin: PropTypes.func,
}

// Get State from redux store
export const mapStateToProps = (state) => ({})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  fetchUserLogin: (loginData, failureFn) => dispatch(UserActions.login(loginData, failureFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
