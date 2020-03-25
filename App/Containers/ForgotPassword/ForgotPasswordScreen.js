import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './ForgotPasswordScreenStyle'
import Logo from 'App/Assets/Images/Svg/Logo'
import TickMark from 'App/Assets/Images/Svg/TickMark'
import DangerCross from 'App/Assets/Images/Svg/DangerCross'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import validator from 'validator'
import SignUpActions from 'App/Stores/SignUp/Actions'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import CircleChecked from 'App/Assets/Images/Svg/CircleChecked'
import ErrorIcon from 'App/Assets/Images/Svg/ErrorIcon'

/**
 * user can update their password by Deeplinking
 */
export class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: props.navigation.state.params.url,
      isValidEmail: true,
      email: '',
      password: '',
      confirmPassword: '',
      isValidConfirmPassword: true,
      isValidPassword: true,
      hasEightChar: false,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    }
  }

  render() {
    // to access current state
    const {
      isValidEmail,
      email,
      password,
      confirmPassword,
      isValidPassword,
      hasEightChar,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      url,
      isValidConfirmPassword,
      hasSpecialChar,
    } = this.state
    const isValidPasswordFields =
      hasEightChar && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar
    const isDeepLink = url.length > 0
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.container}>
            <View style={[styles.logoContainer, styles.alignCenter]}>
              <View style={styles.logo}>
                <Logo />
              </View>
            </View>
            {isDeepLink && <Text style={styles.resetTestStyle}>{I18n.t('RESET_PASSWORD')}</Text>}
            {!isDeepLink && (
              <TextInput
                testID={'email'}
                placeholder={I18n.t('EMAIL')}
                autoCompleteType="email"
                autoCapitalize="none"
                returnKeyType="done"
                value={email}
                style={[
                  styles.inputTextStyle,
                  isValidEmail ? styles.textInputBorderNill : styles.textInputDangerBorder,
                ]}
                onChangeText={(text) => this.onChangeEmail(text)}
              />
            )}
            {isDeepLink && (
              <View style={styles.rowStyle}>
                <TextInput
                  testID={'password'}
                  placeholder={I18n.t('PASSWORD')}
                  autoCapitalize="none"
                  returnKeyType="done"
                  secureTextEntry={true}
                  ref={(input) => {
                    this.passwordField = input
                  }}
                  value={password}
                  style={[
                    styles.inputTextStyle,
                    styles.textInputPassword,
                    isValidPassword ? styles.textInputBorderNill : styles.textInputDangerBorder,
                  ]}
                  onChangeText={(text) => {
                    this.onChangePassword(text)
                  }}
                />
                <View style={styles.verifyImageContainer}>
                  {isValidPasswordFields ? (
                    <CircleChecked
                      width={styles.tickImageStyle.width}
                      height={styles.tickImageStyle.height}
                    />
                  ) : (
                    <ErrorIcon
                      width={styles.tickImageStyle.width}
                      height={styles.tickImageStyle.height}
                    />
                  )}
                </View>
              </View>
            )}
            {isDeepLink && (
              <View style={styles.rowStyle}>
                <TextInput
                  testID={'confirmPass'}
                  placeholder={I18n.t('CONFIRM_PASSWORD')}
                  autoCapitalize="none"
                  returnKeyType="done"
                  secureTextEntry={true}
                  ref={(input) => {
                    this.confirmPasswordField = input
                  }}
                  value={confirmPassword}
                  style={[
                    styles.inputTextStyle,
                    styles.textInputPassword,
                    isValidConfirmPassword
                      ? styles.textInputBorderNill
                      : styles.textInputDangerBorder,
                  ]}
                  onChangeText={(text) => {
                    const confirmPassword = text
                    const isValidConfirmPassword = password === text
                    this.setState({
                      confirmPassword,
                      isValidConfirmPassword,
                    })
                  }}
                />
                <View style={styles.verifyImageContainer}>
                  {isValidPasswordFields && isValidConfirmPassword ? (
                    <CircleChecked
                      width={styles.tickImageStyle.width}
                      height={styles.tickImageStyle.height}
                    />
                  ) : (
                    <ErrorIcon
                      width={styles.tickImageStyle.width}
                      height={styles.tickImageStyle.height}
                    />
                  )}
                </View>
              </View>
            )}
            {/** Instructions view about password */}
            {isDeepLink && !isValidPassword && (
              <View style={styles.warningContainer}>
                <Text style={[styles.warningTitle]}>{I18n.t('YOUR_PASS_WORD_MUST_CONTAIN')}</Text>
                <View style={[styles.warning]}>
                  {this.renderWarningView(hasEightChar, I18n.t('PASSWORD_CHARS_LIMIT'))}
                  {this.renderWarningView(hasLowerCase, I18n.t('PASSWORD_UPPER_LIMIT'))}
                  {this.renderWarningView(hasUpperCase, I18n.t('PASSWORD_LOWER_LIMIT'))}
                  {this.renderWarningView(hasNumber, I18n.t('PASSWORD_DIGIT_LIMIT'))}
                  {this.renderWarningView(hasSpecialChar, I18n.t('PASSWORD_SPECIAL_CHAR_LIMIT'))}
                </View>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Button
                testID={'continue'}
                text={I18n.t('CONTINUE_BUTTON')}
                withShadow={true}
                withBg={true}
                onClick={() => this.submitInformation()}
              />
              <TouchableOpacity
                testID={'BackButton'}
                style={styles.backButtonContainer}
                onPress={() => this.onBackClicked()}
              >
                <Text style={styles.backTextStyle}>{I18n.t('BACK')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  // navigate to the previous page
  onBackClicked = () => {
    // to access current state
    const { url } = this.state
    const isDeepLink = url.length > 0
    if (isDeepLink) Navigator.navigateAndReset(NavKeys.LOGIN)
    else Navigator.goBack()
  }

  // check the screen type and proceed corresponding actions
  submitInformation = () => {
    // to access current state
    const { email, url } = this.state
    const isDeepLink = url.length > 0
    if (!isDeepLink) this.proceedReqEmail(email)
    else this.proceesUpdatePassword()
  }

  // chek the password type and proceed with update password
  proceesUpdatePassword = () => {
    const { isValidPassword, isValidConfirmPassword, password, url } = this.state
    const tokenArray = url.split('/')

    if (password.length === 0) {
      this.setState({ isValidPassword: false })
    } else if (isValidPassword && isValidConfirmPassword) {
      const token = tokenArray[tokenArray.length - 1]

      const reqData = {
        token: token,
        password: password,
      }
      this.props.resetPassword(reqData, (data) => {
        this.showAlert(data)
      })
    }
  }

  /** check the user email and request for Forgot password deep linking
   * @param {string} email user entered email
   */
  proceedReqEmail = (email) => {
    if (!validator.isEmail(email)) {
      this.setState({
        isValidEmail: false,
      })
      return
    }
    const reqData = {
      email: email,
    }
    this.props.reqForgotPassEmail(reqData, (data) => {
      this.showAlert(data)
    })
  }

  /**
   * show confirmation dialog
   * @param {bool} isBack wether the screen go to back or navigate to login screen
   * @param {String} message alert message
   */
  showAlert = (message) => {
    Alert.alert(
      I18n.t('SUCCESS_HEADER'),
      message,
      [
        {
          text: 'OK',
          onPress: this.onBackClicked,
        },
      ],
      { cancelable: false }
    )
  }

  /**
   *
   * @param {String} text validates when user enters in the field of password
   *
   * It updates state object with password
   */
  onChangePassword(text) {
    // Validates business logics for password generation
    const hasEightChar = text.length >= 8
    const hasLowerCase = text.length > 0 && text.toLowerCase() !== text
    const hasUpperCase = text.length > 0 && text.toUpperCase() !== text
    const hasNumber = /\d/.test(text)
    const hasSpecialChar = /[ !@#$%^&*()\-_=+{};:,<.>]/.test(text)
    const isValidPassword =
      hasEightChar && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar
    const isValidConfirmPassword = this.state.confirmPassword === text

    // validates changed text to populate UI components with business logics of password
    this.setState({
      password: text,
      isValidPassword,
      hasEightChar,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
      isValidConfirmPassword,
    })
  }

  /**
   *
   * @param {String} email - refers user enter input as an email string
   *
   * It updates state object with email
   */
  onChangeEmail(email) {
    this.setState({
      email: email,
      isValidEmail: validator.isEmail(email),
    })
  }

  /**
   *
   * @param {Boolean} isCorect refers the icon type either it can be TickMark or DangerCross
   * @param {String} text which has to be shown as instruction
   * @returns {View} returns instruction view for the business logics of a password
   */
  renderWarningView(isCorect, text) {
    return (
      <View style={styles.warningView}>
        <View style={styles.tickMarkContainer}>
          {isCorect ? (
            <TickMark />
          ) : (
            <DangerCross
              width={styles.tickMarkContainer.width}
              height={styles.tickMarkContainer.height}
            />
          )}
        </View>
        <Text style={styles.passwordContain}>{text}</Text>
      </View>
    )
  }
}
ForgotPasswordScreen.propTypes = {
  reqForgotPassEmail: PropTypes.func,
  resetPassword: PropTypes.func,
  navigation: PropTypes.object.isRequired,
}

// Get State from redux store
export const mapStateToProps = (state) => ({})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  reqForgotPassEmail: (reqData, successFn) =>
    dispatch(SignUpActions.reqForgotPassEmail(reqData, successFn)),
  resetPassword: (reqData, successFn) => dispatch(SignUpActions.resetPassword(reqData, successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen)
