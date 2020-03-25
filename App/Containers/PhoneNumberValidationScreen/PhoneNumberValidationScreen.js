import React, { Component } from 'react'
import { Text, View, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { TextInputMask } from 'react-native-masked-text'
import UserActions from 'App/Stores/User/Actions'
import styles from './PhoneNumberValidationScreenStyle'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import Header from 'App/Components/Header/Header'
import Line from 'App/Components/Line/Line'
import Button from 'App/Components/Button/Button'
import Colors from 'App/Theme/Colors'
import Navigator from 'App/Services/NavigationService'
import I18n from 'App/Localization/I18n'
import Checkpoints from 'App/Constants/Checkpoints'

/**
 *  Phone validation screen to get otp number.
 */

export class PhoneNumberValidationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passCode: '',
      extension: '',
      country: '',
      phoneNumber: '',
      validPassCode: true,
      timer: 30,
      isFromCheckpoint: false,
    }
  }

  /**
   * change country and passcode from props
   */
  componentDidMount() {
    let isFromCheckpoint = false
    if (this.props.onBoardingProfile.checkpoint) {
      isFromCheckpoint = this.props.onBoardingProfile.checkpoint === Checkpoints.POINT_THREE
    }
    this.setState(
      {
        country:
          this.props.onBoardingProfile.country +
          ' ( ' +
          this.props.onBoardingProfile.phonecode +
          ' )',

        phoneNumber: this.props.onBoardingProfile.phone,
        isFromCheckpoint,
      },
      () => {
        if (isFromCheckpoint) {
          this.sendOTP(true)
        } else {
          this.startTimer()
        }
      }
    )
  }

  /**
   * resend action timer starts
   */
  startTimer = () => {
    this.interval = setInterval(this.startTimerForResend, 1000)
  }

  /**
   * start timer for resend
   */
  startTimerForResend = () => {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }))
  }

  // Update method for clear the timer while the timer gets end
  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval)
    }
  }

  // Destroy screen method for clear the timer
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { country, phoneNumber, validPassCode, passCode, timer, isFromCheckpoint } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={-100}
          behavior="position"
        >
          <ToolBar testID={'ToolBar'} />
          <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
          <Header
            testID={'Header'}
            titleText={I18n.t('PHONE_VERIFICATION')}
            description={I18n.t('PLEASE_ENTER_PHONE_NUMNER')}
          />
          {/** number view container */}
          <View style={styles.numberChangeContainer}>
            <View style={[styles.changeNumberViewContainer]}>
              <Text style={styles.smallTextStyle}>{I18n.t('COUNTRY')}</Text>
              <Text style={styles.smallTextStyle}>{country}</Text>
              <Text style={[styles.smallTextStyle, styles.textMargin]}>
                {I18n.t('PHONE_NUMBER')}
              </Text>
              <Text style={styles.smallTextStyle}>{phoneNumber}</Text>
            </View>
            {isFromCheckpoint === false && (
              <View style={[styles.changeNumberViewContainer, styles.centerView]}>
                <TouchableOpacity
                  testID="changeButton"
                  style={styles.changeButtonStyle}
                  onPress={() => Navigator.goBack()}
                >
                  <Text style={styles.smallTextStyle}>{I18n.t('CHANGE')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Line styleProp={styles.lineStyle} />
          {/** pass code container */}
          <View style={[styles.passCodeContainer]}>
            <View style={styles.inputContainer}>
              <Text style={[styles.smallTextStyle, styles.textCenterAlign]}>
                {I18n.t('ENTER_CODE')}
              </Text>
              <TextInputMask
                testID={'passCodeInput'}
                type={'custom'}
                returnKeyType="done"
                style={[
                  styles.inputStyle,
                  {
                    color: validPassCode ? Colors.mediumTurquoise : Colors.coralRed,
                    borderColor: validPassCode ? Colors.dropDownBorder : Colors.coralRed,
                  },
                ]}
                options={{ mask: 'A-999-999' }}
                maxLength={9}
                value={passCode}
                textAlign={'center'}
                textContentType={'oneTimeCode'} // iOS OTP auto fill
                onChangeText={(text) => this.onChangePassCode(text)}
              />
            </View>
            <View style={styles.resendTextContainer}>
              <Text style={[styles.smallTextStyle, styles.textCenterAlign, styles.textMargin]}>
                {I18n.t('DID_NOT_GET_CODE')}
                <Text
                  testID={'resend'}
                  style={[
                    styles.appThemeTextStyle,
                    timer === 0 ? styles.resendActive : styles.resendinActive,
                  ]}
                  onPress={() => this.verifyPasscode(true)}
                >
                  {I18n.t('CLICK_HERE')} {timer !== 0 && '(' + timer + ') '}
                </Text>
                <Text style={[styles.smallTextStyle, styles.textCenterAlign]}>
                  {I18n.t('TO_SEND_CODE')}
                </Text>
              </Text>
            </View>
          </View>
          {/** Continue button container */}
          <View style={styles.continueBtnContainer}>
            <Button
              testID={'Continue'}
              text={I18n.t('CONTINUE_BUTTON')}
              withShadow={true}
              withBg={true}
              onClick={() => this.verifyPasscode(false)}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  /**
   * Change pass code state
   * @param {String} passCode - refers user enter input as an pass code string
   * It updates pass code state object with passcode
   */
  onChangePassCode(passCode) {
    this.setState({ passCode })
    // validating passcode based on length
    this.checkPassCodeValidation(passCode)
  }

  /**
   * Change pass code valid state
   * @param {String} passCode - refers user enter input as an pass code string
   * It updates pass code valid boolean based on length of passcode
   */
  checkPassCodeValidation(passCode) {
    if (passCode.length < 9) {
      this.setState({ validPassCode: false })
    } else {
      this.setState({ validPassCode: true })
    }
  }

  /**
   * verify passcode callback
   */
  verifyPasscodeCallback = () => {}

  /**
   * verify passcode callback
   */
  sendOTPCallback = () => {
    this.setState({
      timer: 30,
    })
    this.startTimer()
  }

  /**
   * Verify passcode function
   * It verifies passcode by hitting api call
   */
  verifyPasscode(resend) {
    const { phoneNumber, passCode, timer } = this.state

    if (resend) {
      // return when the user click resend before time ends
      if (timer !== 0) return
      this.sendOTP(resend)
      return
    }
    if (passCode.length >= 8) {
      this.props.validateOtp(
        {
          resend,
          phone_number: phoneNumber,
          isSignup: true,
          code: passCode.replace('-', '').replace('-', ''),
          phone_code: this.props.onBoardingProfile.phonecode,
        },
        this.verifyPasscodeCallback
      )
    } else {
      this.setState({ validPassCode: false })
    }
  }
  sendOTP(resend) {
    const { phoneNumber } = this.state
    this.props.validateOtp(
      {
        resend,
        phone_number: phoneNumber,
        code: '',
        phone_code: this.props.onBoardingProfile.phonecode,
      },
      this.sendOTPCallback
    )
  }
}

PhoneNumberValidationScreen.propTypes = {
  validateOtp: PropTypes.func,
  navigation: PropTypes.object,
  onBoardingProfile: PropTypes.object,
  countryList: PropTypes.array,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  isLoading: state.onBoarding.userInfoRequestIsLoading,
  onBoardingProfile: state.user.onBoardingProfile,
  countryList: state.signUp.countryList,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  validateOtp: (otpData, successFn) =>
    dispatch(UserActions.validateOtpWithCallback(otpData, successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumberValidationScreen)
