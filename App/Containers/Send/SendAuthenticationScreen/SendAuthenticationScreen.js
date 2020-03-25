import React from 'react'
import styles from './SendAuthenticationScreenStyle'
import { SafeAreaView, View, Text, TouchableOpacity, AppState } from 'react-native'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Line from 'App/Components/Line/Line'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInputMask } from 'react-native-masked-text'
import Button from 'App/Components/Button/Button'
import UserActions from 'App/Stores/User/Actions'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import VerifiedImage from 'App/Assets/Images/Svg/VerifiedImage'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import { getMinutes, showAlertWithBack, showAlert } from 'App/Components/Utils/Functions'
import ErrorIcon from 'App/Assets/Images/Svg/ErrorIcon'
import Colors from 'App/Theme/Colors'
import I18n from 'App/Localization/I18n'

/**
 * User can do their TFA here for money transfer
 */
export class SendAuthenticationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      verificationData: props.navigation.state.params.security,
      isValidOTP: true,
      isValidTFA: true,
      otpData: '',
      otpHiddenData: '',
      tfaData: '',
      tfaHiddenData: '',
      smsTimer: 59,
      emailTimer: 59,
      smsVerified: false,
      tfaVerification: false,
      // timer for transaction
      timeLeftForTransaction: 600,
      timerForResend: 59,
    }
  }

  // Intial Function to set the timer for OTP
  componentDidMount() {
    this.smsInterval = setInterval(
      () => this.setState((prevState) => ({ smsTimer: prevState.smsTimer - 1 })),
      1000
    )
    this.emailInterval = setInterval(
      () => this.setState((prevState) => ({ emailTimer: prevState.smsTimer - 1 })),
      1000
    )
    // otp for transaction interval
    this.transactionInterval = setInterval(this.startTimerForTransaction, 1000)
    if (this.state.verificationData.Email !== undefined) this.checkEmailTransaction()
    // add listener for app lifecycle changes
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  /**
   * method called after view mounted
   */
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (this.state.timeLeftForTransaction !== 0) {
        this.checkEmailTransaction()
      } else {
        this.stopEmailVerifyProcess()
      }
    }
    this.setState({ appState: nextAppState })
  }

  // Update method for clear the timer while the timer gets end
  componentDidUpdate() {
    if (this.state.smsTimer === 0) {
      clearInterval(this.smsInterval)
    }

    if (this.state.emailTimer === 0) {
      clearInterval(this.emailInterval)
    }
    if (this.state.timeLeftForTransaction === 0) {
      clearInterval(this.transactionInterval)
    }

    // clear email transaction when timer expired
    if (
      this.state.timeLeftForTransaction === 0 &&
      (this.state.isEmailVerification && !this.state.emailVerifyFailed)
    ) {
      this.setState({
        emailVerifyFailed: true,
        emailVerifySuccess: false,
      })
    }
  }

  // Destroy screen method for clear the timer
  componentWillUnmount() {
    // remove listener for app lifecycle changes
    AppState.removeEventListener('change', this._handleAppStateChange)
    clearInterval(this.interval)
    clearInterval(this.transactionInterval)
  }

  render() {
    // to access current state
    const { smsVerified, tfaVerification, verificationData, timeLeftForTransaction } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.infoText}>
          {I18n.t('TIME_LEFT_FOR_COMPLETING')}
          {I18n.t('THIS_TRANSACTION')}
          <Text style={styles.infoTextAppColor}>{getMinutes(timeLeftForTransaction)}</Text>
        </Text>
        <ScrollView testID={'scrollView'}>
          {verificationData.SMS !== undefined &&
            this.renderCardView(true, smsVerified, DefaultStrings.SMS)}
          {verificationData.TFA !== undefined &&
            this.renderCardView(false, tfaVerification, DefaultStrings.TFA)}
          {verificationData.Email !== undefined && this.renderEmailView()}
          <View style={styles.buttonContainer}>
            <Button
              testID={'continue'}
              text={I18n.t('CONTINUE_BUTTON')}
              withShadow={true}
              withBg={true}
              onClick={() => this.submitInformation()}
            />
            <TouchableOpacity
              testID={'backButton'}
              style={styles.backButtonContainer}
              onPress={() => this.cancelAllTransactionsAndBack()}
            >
              <Text style={styles.backTextStyle}>{I18n.t('BACK')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  // submit info with valid verifications
  submitInformation = () => {
    // to access current state
    const { verificationData, emailVerifySuccess, isValidOTP, isValidTFA } = this.state
    const isEmailPresent = verificationData.Email !== undefined
    const isSMSPresent = verificationData.SMS !== undefined
    const isTFAPresent = verificationData.TFA !== undefined
    let status = 0
    let presentStatus = 0
    presentStatus = verificationData.Email !== undefined ? presentStatus + 1 : presentStatus
    presentStatus = verificationData.SMS !== undefined ? presentStatus + 1 : presentStatus
    presentStatus = verificationData.TFA !== undefined ? presentStatus + 1 : presentStatus

    status = isEmailPresent && emailVerifySuccess ? status + 1 : status
    status = isSMSPresent && isValidOTP ? status + 1 : status
    status = isTFAPresent && isValidTFA ? status + 1 : status

    if (status === presentStatus) {
      this.completeTransaction()
    } else showAlert(I18n.t('COMPLETE_ALL_VERIFICATION'))
  }

  /**
   * render the card base on the input
   * @param {bool} isSMS positive when the view for SMS verification
   * @param {bool} verified positive when the view verified successful
   * @param {String} testId dynamic test ID for both SMS and 2FA views
   */
  renderCardView = (isSMS, verified, testId) => {
    // to access current state
    const { isValidOTP, isValidTFA, otpHiddenData, tfaHiddenData, smsTimer } = this.state

    // to access current props
    const { phoneNumber } = this.props
    return (
      <View
        style={[
          styles.authenticateMainContainer,
          isSMS ? styles.smsContainerHeight : styles.tfaContainerHeight,
        ]}
      >
        <Text testID={'titleText'} style={styles.titleText}>
          {isSMS ? I18n.t('SMS_AUTHENTICATION') : I18n.t('TFA_AUTHENTICATION')}
        </Text>
        <Line styleProp={styles.titleLine} />
        {verified ? (
          <View style={styles.verifiedContainer}>
            <Text style={styles.verifiedText}>
              {isSMS ? I18n.t('SMS_VERIFY_SUCCESS ') : I18n.t('TFA_VERIFY_SUCCESS')}
            </Text>
            <VerifiedImage
              width={styles.verifiedImage.width}
              height={styles.verifiedImage.height}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.infoText}>
              {!isSMS ? I18n.t('SEND_TFA_INFO') : I18n.t('ENTER_CODE')}
              {isSMS && <Text style={styles.infoTextAppColor}>{phoneNumber}</Text>}
              {isSMS && I18n.t('VIA_SMS')}
            </Text>
            <TextInputMask
              testID={'inputMask' + testId}
              returnKeyType="done"
              keyboardType={'numeric'}
              value={isSMS ? otpHiddenData : tfaHiddenData}
              style={[
                styles.inputTextStyle,
                isSMS
                  ? isValidOTP
                    ? styles.textInputBorderNill
                    : styles.textInputDangerBorder
                  : isValidTFA
                  ? styles.textInputBorderNill
                  : styles.textInputDangerBorder,
              ]}
              options={{ mask: '*******' }}
              maxLength={7}
              type={'custom'}
              onChangeText={(text) => this.onChangeVerification(text, isSMS)}
            />
            {isSMS && (
              <View style={styles.resendContainer}>
                <Text style={styles.infoTextResend}>
                  {DefaultStrings.BULLET_UNICODE + I18n.t('OTP_EXPIRES_IN')}
                  <Text style={styles.infoTextResendAppColor}>{I18n.t('OTP_EXPIRES_TIME')}</Text>
                </Text>
                <Text style={styles.infoTextResend}>
                  {DefaultStrings.BULLET_UNICODE + I18n.t('OTP_RESEND_TEXT')}
                  <Text
                    testID={'resend'}
                    onPress={smsTimer === 0 ? this.resendSms : () => {}}
                    style={[
                      styles.infoTextResendTimerColor,
                      smsTimer === 0 ? styles.resendActive : styles.resendinActive,
                    ]}
                  >
                    {I18n.t('RESEND')} {smsTimer !== 0 && '(' + smsTimer + ')'}{' '}
                  </Text>
                  {I18n.t('IT')}
                </Text>
              </View>
            )}
            <Button
              testID={'verify' + testId}
              text={I18n.t('VERIFY')}
              withShadow={true}
              style={styles.verifyBtnStyle}
              withBg={true}
              onClick={() => this.submitVerification(isSMS, false)}
            />
          </View>
        )}
      </View>
    )
  }

  /**
   * start timer for transaction
   */
  startTimerForTransaction = () => {
    this.setState((prevState) => ({
      timeLeftForTransaction: prevState.timeLeftForTransaction - 1,
    }))
    if (this.state.timeLeftForTransaction === 0) this.cancelAllTransactionsAndBack()
  }
  /**
   * render email view
   */
  renderEmailView = () => {
    // to access current state
    const { emailTimer, emailVerifyFailed, emailVerifySuccess } = this.state

    return (
      <View style={[styles.authenticateMainContainer, styles.emailContainerHeight]}>
        <Text />
        <Text testID={'titleText'} style={styles.modalTitleText}>
          {I18n.t('EMAIL_AUTHENTICATION_LOWER')}
        </Text>
        <Line styleProp={styles.modalTitleLine} />
        {emailVerifySuccess ? (
          <View style={styles.verifyContainerStyle}>
            <View style={styles.verifiedContainer}>
              <Text style={styles.verifiedText}>{I18n.t('EMAIL_VERIFIED_SUCCESS')}</Text>
              <VerifiedImage
                width={styles.verifiedImage.width}
                height={styles.verifiedImage.height}
              />
            </View>
          </View>
        ) : emailVerifyFailed ? (
          <View style={styles.centerStyle}>
            <View style={styles.ErrorIconView}>
              <ErrorIcon width={styles.errorIcon.width} height={styles.errorIcon.height} />
            </View>
            <Text style={[styles.verifiedText, styles.backButtonStyle]}>
              {I18n.t('EMAIL_VERIFIED_FAILURE')}
            </Text>
          </View>
        ) : (
          <View style={styles.centerStyle}>
            <Text style={styles.infoText}>{I18n.t('EMAIL_AUTHENTICATION_CONTENT')}</Text>
            {/* resend container  */}
            <View style={[styles.resendContainer]}>
              <Text style={styles.infoTextResend}>
                {DefaultStrings.BULLET_UNICODE + I18n.t('OTP_EXPIRES_IN')}
                <Text
                  style={[
                    styles.infoTextResendAppColor,
                    emailTimer === 0
                      ? { color: Colors.gradientRed }
                      : { color: Colors.mediumTurquoise },
                  ]}
                >
                  {getMinutes(emailTimer)}
                </Text>
              </Text>
              <Text style={styles.infoTextResend}>
                {DefaultStrings.BULLET_UNICODE + I18n.t('OTP_RESEND_TEXT')}
                <Text
                  testID={'resend'}
                  style={[
                    styles.infoTextResendTimerColor,
                    emailTimer === 0 ? styles.resendActive : styles.resendinActive,
                  ]}
                >
                  {I18n.t('RESEND')}
                </Text>
                {I18n.t('IT')}
              </Text>
              <Button
                text={I18n.t('RESEND')}
                withShadow={false}
                style={[
                  styles.verifyBtnStyle,
                  styles.marginForEmailButton,
                  emailTimer !== 0 && { backgroundColor: Colors.lightGrey },
                ]}
                withBg={true}
                onClick={emailTimer === 0 ? this.resendEmail : () => {}}
              />
            </View>
          </View>
        )}
      </View>
    )
  }

  /**
   * resend email
   */
  resendEmail = () => {
    this.props.resend(DefaultStrings.EMAIL.trim(), this.startEmailTimerInterval)
  }
  /**
   * resend sms
   */
  resendSms = () => {
    this.props.resend(DefaultStrings.SMS_CAPS, this.startSmsTimerInterval)
  }

  startSmsTimerInterval = () => {
    // interval for otp expiration
    this.setState({ smsTimer: this.state.timerForResend })
    this.smsInterval = setInterval(
      () => this.setState((prevState) => ({ smsTimer: prevState.smsTimer - 1 })),
      1000
    )
  }

  /**
   * start timer for sms
   */
  startEmailTimerInterval = () => {
    // interval for otp expiration
    this.setState({ emailTimer: this.state.timerForResend })
    this.emailInterval = setInterval(
      () => this.setState((prevState) => ({ emailTimer: prevState.emailTimer - 1 })),
      1000
    )
  }

  /**
   * check email process transaction continuously whether email verified or not
   */
  checkEmailTransaction = () => {
    if (this.state.timeLeftForTransaction !== 0) {
      // check transaction
      this.props.checkTx(this.processEmailTransaction, this.stopEmailVerifyProcess)
    } else {
      // if timer expires cancel transaction
      this.stopEmailVerifyProcess()
    }
  }

  /**
   * process email process transaction
   * @param {Object} data contains data to process transaction
   */
  processEmailTransaction = (data) => {
    if (data.Email.verified) {
      // process transaction if transaction verified
      // this.props.processTransaction(
      //   this.showViewForSuccessEmailTramsaction,
      //   this.stopEmailVerifyProcess
      // )
      this.showViewForSuccessEmailTramsaction()
    } else {
      // if not verified again call check email transaction
      this.checkEmailTransaction()
    }
  }

  /**
   * stop email process transaction
   */
  stopEmailVerifyProcess = () => {
    this.setState({ emailVerifySuccess: false, emailVerifyFailed: true })
    this.clearTimer()
  }

  /**
   * show view for success email transaction
   */
  showViewForSuccessEmailTramsaction = () => {
    this.setState({ emailVerifySuccess: true, emailVerifyFailed: false })
    this.clearTimer()
  }

  /**
   * clear timer
   */
  clearTimer = () => {
    if (this.state.smsTimer !== 0) {
      clearInterval(this.smsInterval)
    }

    if (this.state.emailTimer !== 0) {
      clearInterval(this.emailInterval)
    }

    if (this.state.timeLeftForTransaction !== 0) {
      clearInterval(this.transactionInterval)
    }
  }

  /**
   * callback for user input field for OTP and 2FA
   * @param {String} text user entered text
   * @param {bool} isSMS wether the callback from OTP or 2FA (true when its OTP)
   */
  onChangeVerification = (text, isSMS) => {
    if (isSMS) this.onChangeOtpText(text)
    else this.onChangeTFAText(text)
  }

  /**
   * logical method for OTP
   * @param {String} text user entered text
   *
   * this method can convert the user entered input into hidden text
   */
  onChangeOtpText = (text) => {
    if (text === DefaultStrings.OTP_DUMMY_TEXT) return

    let isIncrease = true // true when user enter text, false when user clear the text
    if (this.state.otpData.length < text.length) isIncrease = true
    else isIncrease = false

    // user currently entered text (last number of the string)
    let lastText = text.slice(-1)

    // append the last string to state value
    let actualOtp = isIncrease
      ? this.state.otpData + lastText
      : this.state.otpData.substring(0, this.state.otpData.length - 1)

    // replace the last entered value to * for populate to the user
    let hiddenOtp = isIncrease
      ? text.replace(lastText, '*')
      : this.state.otpHiddenData.substring(0, this.state.otpHiddenData.length - 1)

    this.setState({
      otpData: actualOtp,
      otpHiddenData: hiddenOtp,
    })
  }

  /**
   * logical method for 2FA
   * @param {String} text user entered text
   *
   * this method can convert the user entered input into hidden text
   */
  onChangeTFAText = (text) => {
    if (text === DefaultStrings.OTP_DUMMY_TEXT) return

    let isIncrease = true // true when user enter text, false when user clear the text
    if (this.state.tfaData.length < text.length) isIncrease = true
    else isIncrease = false

    // user currently entered text (last number of the string)
    let lastText = text.slice(-1)

    // append the last string to state value
    let actualTfa = isIncrease
      ? this.state.tfaData + lastText
      : this.state.tfaData.substring(0, this.state.tfaData.length - 1)

    // replace the last entered value to * for populate to the user
    let hiddenTfa = isIncrease
      ? text.replace(lastText, '*')
      : this.state.tfaHiddenData.substring(0, this.state.tfaHiddenData.length - 1)

    this.setState({
      tfaData: actualTfa,
      tfaHiddenData: hiddenTfa,
    })
  }

  /**
   * Submit user entered OTP or 2FA to API
   * @param {bool} isSMS wether the callback from OTP or 2FA (true when its OTP)
   * @param {bool} retry true when the user click resend OTP
   */
  submitVerification = (isSMS, retry) => {
    const { otpData, smsTimer, tfaData } = this.state

    // return when the user click resend before time ends
    if (retry && smsTimer !== 0) return

    if (isSMS) {
      if (!retry && otpData.length < 6) {
        this.setState({
          isValidOTP: false,
        })
        return
      }
      // submit OTP verification API
      this.props.submitVerification(
        DefaultStrings.SMS_CAPS,
        this.props.userID,
        otpData.replace('_', '').replace('-', ''),
        this.processSmsTransaction,
        this.cancelSmsTransaction
      )
    } else {
      if (tfaData.length < 6) {
        this.setState({
          isValidTFA: false,
        })
        return
      }
      // submit 2FA verification API
      this.props.submitVerification(
        DefaultStrings.TFA_CAPS,
        this.props.userID,
        tfaData.replace('_', '').replace('-', ''),
        this.processTfaTransaction,
        this.showViewForFailedTfa
      )
    }
  }

  /**
   * cancel current trancaction and back
   */
  cancelAllTransactionsAndBack = () => {
    showAlertWithBack(I18n.t('ALERT'), I18n.t('TRANSACTION_HAS_CANCELLED'))
    this.props.cancelTransaction()
  }

  /**
   * show view for failed tfa
   * */
  showViewForFailedTfa = () => {
    this.setState({
      tfaVerification: false,
      isValidTFA: false,
    })
  }

  /**
   * show view for failed sms
   * */
  cancelSmsTransaction = () => {
    this.setState({
      smsVerified: false,
      isValidOTP: false,
    })
  }

  /**
   * show view for success tfa
   * */
  processTfaTransaction = () => {
    this.setState({ tfaVerification: true })
  }

  /**
   * show view for success sms
   * */
  processSmsTransaction = () => {
    this.setState({ smsVerified: true })
  }

  /**
   * process complete verification
   * */
  completeTransaction = () => {
    this.props.processTransaction(this.successTransaction, this.cancelAllTransactionsAndBack)
  }

  /**
   * navigate to the success screen
   */
  successTransaction = () => {
    Navigator.navigate(NavKeys.TRANSACTION_SUCCESS)
  }
}

SendAuthenticationScreen.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  submitSMSVerification: PropTypes.func,
  submitTFAVerification: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  submitVerification: PropTypes.func,
  userID: PropTypes.string,
  resend: PropTypes.func,
  checkTx: PropTypes.func,
  processTransaction: PropTypes.func,
  cancelTransaction: PropTypes.func,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  phoneNumber: state.user.onBoardingProfile.phonecode + state.user.onBoardingProfile.phone,
  userID: state.user.onBoardingProfile.uuid,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  submitSMSVerification: (otpData, successFn) =>
    dispatch(UserActions.validateOtpWithCallback(otpData, successFn)),
  submitVerification: (method, uuid, code, successFn, failureFn) =>
    dispatch(UserActions.submitSmsVerification(method, uuid, code, successFn, failureFn)), // submit sms verification
  resend: (data, successFn) => dispatch(UserActions.resend(data, successFn)), // resend sms or email
  checkTx: (successFn, failureFn) => dispatch(UserActions.checkTx(successFn, failureFn)), // check transaction
  processTransaction: (successFn, failureFn) =>
    dispatch(UserActions.processTransaction(successFn, failureFn)), // process  transaction
  cancelTransaction: () => dispatch(UserActions.cancelTransaction()), // cancel active transaction
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendAuthenticationScreen)
