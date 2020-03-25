import React, { Component } from 'react'
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './SignUpScreenStyle'
import Logo from 'App/Assets/Images/Svg/Logo'
import TickMark from 'App/Assets/Images/Svg/TickMark'
import Location from 'App/Assets/Images/Svg/Location'
import DangerCross from 'App/Assets/Images/Svg/DangerCross'
import Button from 'App/Components/Button/Button'
import RadioButton from 'App/Components/RadioButton/RadioButton'
import DropDownArrow from 'App/Assets/Images/Svg/DropDownArrow'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import validator from 'validator'
import SignUpActions from 'App/Stores/SignUp/Actions'
import I18n from 'App/Localization/I18n'
import { Colors } from 'App/Theme'
import Dropdown from 'App/Components/DropDown'

export class SignUpScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmPassword: '',
      isValidEmail: true,
      isValidPassword: true,
      hasEightChar: false,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSpecialChar: false,
      isTermsAgree: false,
      isValidConfirmPassword: true,
      isNeedResidence: false,
      signUpData: {
        email: '',
        password: '',
        country: '',
      },
      visible: false,
      countryName: '',
    }
  }

  // Get country list from API
  componentDidMount() {
    this.props.getCountryList(() => {})
  }

  render() {
    // To access current component state with simplified field of state
    const {
      confirmPassword,
      isValidEmail,
      hasEightChar,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
      isValidPassword,
      isTermsAgree,
      isNeedResidence,
      countryName,
    } = this.state
    const { email, password } = this.state.signUpData

    const isNeedConfirmPass =
      password.length === 0 || (password.length > 0 && password === confirmPassword)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAvoidingView style={styles.container}>
            <View style={styles.container}>
              <View style={[styles.logoContainer, styles.alignCenter]}>
                <View style={styles.logo}>
                  <Logo />
                </View>
              </View>

              <View style={styles.alignCenter}>
                <TextInput
                  testID={'email'}
                  placeholder={I18n.t('EMAIL')}
                  placeholderTextColor={Colors.suvaGrey}
                  autoCompleteType="email"
                  type={'email-address'}
                  autoCapitalize="none"
                  returnKeyType="done"
                  value={email}
                  style={[
                    styles.inputTextStyle,
                    isValidEmail ? styles.textInputBorderNill : styles.textInputDangerBorder,
                  ]}
                  onChangeText={(text) => this.onChangeEmail(text)}
                />
                <TextInput
                  testID={'password'}
                  placeholder={I18n.t('PASSWORD')}
                  placeholderTextColor={Colors.suvaGrey}
                  autoCapitalize="none"
                  returnKeyType="done"
                  secureTextEntry={true}
                  ref={(input) => {
                    this.passwordField = input
                  }}
                  value={password}
                  style={[
                    styles.inputTextStyle,
                    isValidPassword ? styles.textInputBorderNill : styles.textInputDangerBorder,
                  ]}
                  onChangeText={(text) => {
                    this.onChangePassword(text)
                  }}
                />
                {/** Instructions view about password */}
                {!isValidPassword && (
                  <View style={[styles.warningContainer, styles.mt]}>
                    <Text style={[styles.warningTitle]}>
                      {I18n.t('YOUR_PASS_WORD_MUST_CONTAIN')}
                    </Text>
                    <View style={[styles.warning]}>
                      {this.renderWarningView(hasEightChar, I18n.t('PASSWORD_CHARS_LIMIT'), false)}
                      {this.renderWarningView(hasLowerCase, I18n.t('PASSWORD_UPPER_LIMIT'), false)}
                      {this.renderWarningView(hasUpperCase, I18n.t('PASSWORD_LOWER_LIMIT'), false)}
                      {this.renderWarningView(
                        hasSpecialChar,
                        I18n.t('PASSWORD_SPECIAL_CHAR_LIMIT'),
                        true
                      )}
                      {this.renderWarningView(hasNumber, I18n.t('PASSWORD_DIGIT_LIMIT'), false)}
                    </View>
                  </View>
                )}
                <TextInput
                  testID={'confirmPass'}
                  placeholder={I18n.t('CONFIRM_PASSWORD')}
                  placeholderTextColor={Colors.suvaGrey}
                  autoCapitalize="none"
                  returnKeyType="done"
                  secureTextEntry={true}
                  ref={(input) => {
                    this.confirmPasswordField = input
                  }}
                  value={confirmPassword}
                  style={[
                    styles.inputTextStyle,
                    isNeedConfirmPass ? styles.textInputBorderNill : styles.textInputDangerBorder,
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
              </View>

              <View style={styles.residenceContainer}>
                <View
                  style={[styles.residenceHeader, isValidPassword && styles.residenceHeaderMargin]}
                >
                  <View style={styles.residenceIcon}>
                    <Location
                      width={styles.locationIcon.width}
                      height={styles.locationIcon.height}
                    />
                  </View>
                  <Text style={styles.residenceTitle}>{I18n.t('WHERE_IS_YOUR_RESIDENCY')}</Text>
                </View>
                {/** country dropdown */}
                <TouchableOpacity
                  style={[
                    styles.countryDropDownInputStyle,
                    isNeedResidence ? styles.textInputDangerBorder : styles.textInputBorderNill,
                  ]}
                  onPress={() => this.setState({ visible: true })}
                >
                  <Text numberOfLines={1} style={styles.dropdownFontStyle}>
                    {countryName || I18n.t('SELECT_YOUR_RESIDENCE')}
                  </Text>
                  <Dropdown
                    testID={'countryPicker'}
                    placeholderText={'Select country'}
                    visible={this.state.visible}
                    onSelect={this.onChangeCountry}
                    onCancel={() => this.setState({ visible: false })}
                    options={this.props.countryList}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.termsContainer, isValidPassword && styles.termsContainerMargin]}>
                <View>
                  <RadioButton selected={isTermsAgree} onClick={this.onClickAgreeTerms} />
                </View>
                <View>
                  <Text style={styles.termsText}>
                    {I18n.t('BY_CONTINUING_I_AGREE')}
                    {
                      <Text
                        style={styles.clickableText}
                        testID={'terms'}
                        onPress={() => this.onClickTermsAndConditions()}
                      >
                        {I18n.t('TERMS_OF_SERVICES')}
                      </Text>
                    }
                    <Text style={styles.termsText}>{I18n.t('AND_SPACE')}</Text>
                    {
                      <Text
                        style={styles.clickableText}
                        testID={'policy'}
                        onPress={() => this.onClickPolicy()}
                      >
                        {I18n.t('PRIVACY_POLICY')}
                      </Text>
                    }
                  </Text>
                </View>
              </View>

              <View style={styles.signupView}>
                <Button
                  testID={'signup'}
                  text={I18n.t('SIGN_UP')}
                  withShadow={true}
                  withBg={true}
                  onClick={this.onClickSignUp}
                />
              </View>
              <View style={styles.signInContainer}>
                <View>
                  <Text style={styles.signInTitle}>
                    {I18n.t('ALREADY_CREATED_ACC')}
                    {
                      <Text
                        style={styles.clickableText}
                        testID={'signin'}
                        onPress={() => this.onClickSignIn()}
                      >
                        {I18n.t('SIGN_IN_SLASH')}
                      </Text>
                    }
                    <Text>{I18n.t('INSTEAD')}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   * Dropdown view function
   * @returns {DropDownArrow} returns Drop down arrow view
   */
  dropDownArrowView = () => {
    return (
      <DropDownArrow
        width={styles.dropDownImageStyle.width}
        height={styles.dropDownImageStyle.height}
      />
    )
  }
  /**
   *
   * @param {String} email - refers user enter input as an email string
   *
   * It updates state object with email
   */
  onChangeEmail(email) {
    this.setState({
      signUpData: { ...this.state.signUpData, email },
      isValidEmail: validator.isEmail(email),
    })
  }

  /**
   *
   * @param {String} text validates when user enters in the field of password
   *
   * It updates state object with password
   */
  onChangePassword(text) {
    // Validates business logics for password generation
    const password = text
    const hasEightChar = text.length >= 8
    const hasLowerCase = text.length > 0 && text.toLowerCase() !== text
    const hasUpperCase = text.length > 0 && text.toUpperCase() !== text
    const hasNumber = /\d/.test(text)
    const hasSpecialChar = /[ !@#$%^&*()\-_=+{};:,<.>]/.test(text)
    const isValidPassword =
      hasEightChar && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar

    // validates changed text to populate UI components with business logics of password
    this.setState({
      signUpData: { ...this.state.signUpData, password },
      isValidPassword,
      hasEightChar,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
    })
  }

  /**
   *
   * @param {String} country updates in state object when enters by user
   */
  onChangeCountry = (country) => {
    const isNeedResidence = country.value.length === 0
    this.setState({
      signUpData: { ...this.state.signUpData, country: country.value },
      countryName: country.label,
      isNeedResidence,
      visible: false,
    })
  }

  /**
   * Actual API service call will trigger when meets all the conditions of business logics for new user registration
   */
  onClickSignUp = () => {
    const { isValidPassword, isValidConfirmPassword, isTermsAgree, confirmPassword } = this.state
    const { email, password, country } = this.state.signUpData
    if (email.length === 0) {
      this.setState({ isValidEmail: false })
    } else if (password.length === 0) {
      this.setState({ isValidPassword: false })
    } else if (confirmPassword.length === 0) {
      this.setState({ isValidConfirmPassword: false })
    } else if (isValidPassword && isValidConfirmPassword) {
      if (country.length > 0) {
        if (!isTermsAgree) {
          Alert.alert(I18n.t('TERMS_AND_CONDITIONS'), I18n.t('CHECK_TERMS_OF_SERVICES'), [
            {
              text: I18n.t('CANCEL'),
              style: 'cancel',
            },
          ])
        } else {
          this.props.signUp(this.state.signUpData)
        }
      } else {
        this.setState({ isNeedResidence: true })
      }
    }
  }

  /**
   * Click event callback of login button
   * It Navigates to login page
   */
  onClickSignIn = () => {
    Navigator.navigateAndReset(NavKeys.LOGIN)
  }

  /**
   * Click event callback of terms & conditions to agree
   */
  onClickAgreeTerms = (isAgree) => {
    this.setState({ isTermsAgree: isAgree })
  }

  /**
   * Click event callback of terms & conditions to navigate screen to see terms of services
   */
  onClickTermsAndConditions = () => {
    Navigator.navigate(NavKeys.TERMS_OR_POLICIES, { isTerms: true })
  }

  /**
   * Click event callback of terms & conditions to navigate screen to see the policies
   */
  onClickPolicy = () => {
    Navigator.navigate(NavKeys.TERMS_OR_POLICIES, { isTerms: false })
  }

  /**
   *
   * @param {Boolean} isCorect refers the icon type either it can be TickMark or DangerCross
   * @param {String} text which has to be shown as instruction
   * @returns {View} returns instruction view for the business logics of a password
   */
  renderWarningView(isCorect, text, isNeedAutoHeight) {
    return (
      <View style={[styles.warningView, isNeedAutoHeight && styles.autoHeightWarningView]}>
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

SignUpScreen.propTypes = {
  getCountryList: PropTypes.func,
  signUp: PropTypes.func,
  countryList: PropTypes.array,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  countryList: state.signUp.countryList,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getCountryList: (successFn) => dispatch(SignUpActions.getCountryList(successFn)),
  signUp: (signUpData) => dispatch(SignUpActions.signUp(signUpData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen)
