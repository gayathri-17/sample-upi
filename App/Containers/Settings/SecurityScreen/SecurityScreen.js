import React from 'react'
import styles from './SecurityScreenStyle'
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  AppState,
  SafeAreaView,
} from 'react-native'
import { connect } from 'react-redux'
import { TextInputMask } from 'react-native-masked-text'
import Line from 'App/Components/Line/Line'
import PropTypes from 'prop-types'
import Button from 'App/Components/Button/Button'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import LinearGradient from 'react-native-linear-gradient'
import Colors from 'App/Theme/Colors'
import ProfileHeader from 'App/Components/ProfileHeader/ProfileHeader'
import SecurityOption from 'App/Components/SecurityOption/SecurityOption'
import UserActions from 'App/Stores/User/Actions'
import VerifiedImage from 'App/Assets/Images/Svg/VerifiedImage'
import { getMinutes, getUserFullName, getUserAddress } from 'App/Components/Utils/Functions'
import CancelImage from 'App/Assets/Images/Svg/CancelImage'
import ErrorIcon from 'App/Assets/Images/Svg/ErrorIcon'
import AsyncStorage from '@react-native-community/async-storage'
import LocalStoreKey from 'App/Constants/LocalStoreKey'
import I18n from 'App/Localization/I18n'
import PINCode from '@haskkor/react-native-pincode'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import Header from 'App/Components/Header/Header'
import TouchID from 'react-native-touch-id'
/**
 * security screen where user can enable disbale security options
 */
export class SecurityScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      // states all security switches
      emailAuthenticationEnabled: false,
      smsAuthenticationEnabled: false,
      primaryGoogleAuthEnabled: false,
      faceIdEnabled: false,
      touchIdEnabled: false,
      passCodeEnabled: false,
      pushNotificationEnabled: false,
      isTouchIdSupport: false,
      isFaceIdSupport: false,

      // change tfa
      changeTfaData: '',
      changeTFAFailed: false,
      isChangeTfa: false,

      // timer for transaction
      timeLeftForTransaction: 0,
      timer: 0,

      // sms authentication
      isSmsVerification: false,
      isValidOTP: true,
      isSmsFailed: false,
      otpData: '',
      smsVerified: false,

      // tfa authentication
      isTfaVerification: false,
      isValidTFA: false,
      tfaData: '',
      tfaVerification: false,
      TFAVerified: false,
      TFAFailed: false,

      // email verification
      isEmailVerification: false,
      emailVerifyFailed: false,
      emailVerifySuccess: false,

      // passcode
      isPasscodeVisible: false,
      resendTimer: 30,
    }
  }

  /**
   * Intialize component to render
   */
  componentDidMount() {
    this.getAsyncData(LocalStoreKey.FACE_ID)
    this.getAsyncData(LocalStoreKey.TOUCH_ID)
    this.getAsyncData(LocalStoreKey.PASSCODE)
    this.checkLocalAuthendicationIsEnabled()
    this.props.getSecurityMethods(this.enableSwitchBasedOnMethods)
    // add listener for app lifecycle changes
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  /**
   * Lifecycle method after component unmounted
   */
  componentWillUnmount() {
    // remove listener for app lifecycle changes
    AppState.removeEventListener('change', this._handleAppStateChange)
    // clear timer if enabled
    clearInterval(this.interval)
    clearInterval(this.transactionInterval)
  }

  /**
   * method called after view mounted
   */
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (this.state.isEmailVerification) {
        if (this.state.timeLeftForTransaction !== 0) {
          this.checkEmailTransaction()
        } else {
          this.stopEmailVerifyProcess()
        }
      }
    }
    this.setState({ appState: nextAppState })
  }

  /**
   * update component state
   */
  componentDidUpdate() {
    // clear timer when reached zero time
    if (this.state.timer === 0) {
      clearInterval(this.interval)
    }
    if (this.state.timeLeftForTransaction === 0) {
      clearInterval(this.transactionInterval)
    }

    // clear sms transaction when timer expired
    if (
      this.state.timeLeftForTransaction === 0 &&
      (this.state.isSmsVerification && !this.state.isSmsFailed)
    ) {
      this.setState({
        isSmsFailed: true,
        verified: false,
      })
      this.props.cancelTransaction()

      // clear tfa transaction when timer expired
    } else if (
      this.state.timeLeftForTransaction === 0 &&
      (this.state.isTfaVerification && !this.state.TFAFailed)
    ) {
      this.setState({
        TFAFailed: true,
        TFAVerified: false,
      })

      // clear email transaction when timer expired
    } else if (
      this.state.timeLeftForTransaction === 0 &&
      (this.state.isEmailVerification && !this.state.emailVerifyFailed)
    ) {
      this.setState({
        emailVerifyFailed: true,
        emailVerifySuccess: false,
      })
    }
  }

  render() {
    const {
      emailAuthenticationEnabled,
      smsAuthenticationEnabled,
      primaryGoogleAuthEnabled,
      faceIdEnabled,
      touchIdEnabled,
      passCodeEnabled,
      pushNotificationEnabled,
      isSmsVerification,
      isTfaVerification,
      isChangeTfa,
      isEmailVerification,
      isPasscodeVisible,
      isTouchIdSupport,
      isFaceIdSupport,
    } = this.state
    const { onBoardingProfile, profilePhoto, dispatch } = this.props
    const { isFromOnBoarding } = this.props.navigation.state.params || {}
    return (
      <SafeAreaView style={styles.container}>
        {/* if it is from onboarding */}
        {isFromOnBoarding ? (
          <View>
            <ToolBar testID={'ToolBar'} />
            <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
          </View>
        ) : (
          <>
            {/* Profile header component */}
            <ProfileHeader
              fullName={getUserFullName(onBoardingProfile)}
              address={getUserAddress(onBoardingProfile)}
              profilePhoto={profilePhoto}
              dispatch={dispatch}
              icon={CommonIcons.security}
            />
          </>
        )}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {isFromOnBoarding ? (
            <>
              <Header
                testID={'Header'}
                titleText={I18n.t('SECURE_YOUR_ACCOUNT')}
                description={I18n.t('SECURE_YOUR_ACCOUNT_DESCRIPTION')}
              />
            </>
          ) : (
            <>
              <Text style={[styles.titleText, styles.changePasswordButtonStyle]}>
                {I18n.t('SECURITY_OPTIONS')}
              </Text>
              <Line styleProp={styles.titleLine} />
              <Text style={styles.titleText}>{I18n.t('ACCOUNT_SECURITY')}</Text>
              {/* change password button */}
              <Button
                style={styles.changePasswordButtonStyle}
                text={I18n.t('CHANGE_PASSWORD_LOWER')}
                withShadow={false}
                withBg={true}
                onClick={this.onClickChangePassword}
              />
              {/* reset 2FA button */}
              <TouchableOpacity onPress={this.onNavigateTfa}>
                <LinearGradient
                  colors={[Colors.gradientRed, Colors.pink]}
                  start={{ x: 0.2, y: 0.2 }}
                  end={{ x: 1.2, y: 1 }}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.textStyle}>{I18n.t('RESET_LOGIN_2FA')}</Text>
                </LinearGradient>
              </TouchableOpacity>
              <Line styleProp={styles.titleLine} />
              <Text style={styles.titleText}>{I18n.t('WITHDRAW_SECURITY')}</Text>
              <View style={styles.changePasswordButtonStyle} />
            </>
          )}
          {/* email authentication */}
          <SecurityOption
            headerText={I18n.t('EMAIL_AUTHENTICATION')}
            contentText={I18n.t('EMAIL_SECURITY_CONTENT')}
            switchEnabled={emailAuthenticationEnabled}
            onToggleSwitch={this.onToggleEmail}
          />
          {/* 2FA authentication */}
          <SecurityOption
            headerText={I18n.t('PRIMARY_GOOGLE_AUTH')}
            contentText={I18n.t('EMAIL_SECURITY_CONTENT')}
            switchEnabled={primaryGoogleAuthEnabled}
            onToggleSwitch={this.onTogglePrimaryGoogleAuth}
          />
          {/* sms authentication */}
          <SecurityOption
            headerText={I18n.t('SMS_AUTH')}
            contentText={I18n.t('EMAIL_SECURITY_CONTENT')}
            switchEnabled={smsAuthenticationEnabled}
            onToggleSwitch={this.onToggleSms}
          />
          {/* push notifications */}
          <SecurityOption
            headerText={I18n.t('PUSH_NOTIFICATION')}
            contentText={I18n.t('PUSH_CONTENT')}
            switchEnabled={pushNotificationEnabled}
            onToggleSwitch={this.onTogglePush}
          />
          {/* face id */}
          {isFaceIdSupport && (
            <SecurityOption
              headerText={I18n.t('FACE_ID')}
              contentText={I18n.t('FACE_ID_CONTENT')}
              switchEnabled={faceIdEnabled}
              onToggleSwitch={this.onToggleFace}
            />
          )}
          {/* touch id */}
          {isTouchIdSupport && (
            <SecurityOption
              headerText={I18n.t('TOUCH_ID')}
              contentText={I18n.t('TOUCH_ID_CONTENT')}
              switchEnabled={touchIdEnabled}
              onToggleSwitch={this.onToggleTouch}
            />
          )}
          {/* configure passcode */}
          <SecurityOption
            headerText={I18n.t('CONFIGURE_PASSCODE')}
            contentText={I18n.t('PASSCODE_CONTENT')}
            switchEnabled={passCodeEnabled}
            onToggleSwitch={this.onTogglePasscode}
          />
          {isFromOnBoarding ? (
            <>
              <Button
                testID={'continue'}
                style={[styles.backButtonStyle]}
                text={I18n.t('CONTINUE_BUTTON')}
                withShadow={true}
                withBg={true}
                onClick={() => this.onClickContinue()}
              />
              <TouchableOpacity
                testID={'BackButton'}
                style={[styles.backButtonContainer, styles.bottomMargin]}
                onPress={() => this.onBackClicked()}
              >
                <Text style={styles.backTextStyle}>{I18n.t('BACK')}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* back button */}
              <Button
                style={[styles.backButtonStyle, styles.bottomMargin]}
                text={I18n.t('BACK')}
                withBorder={true}
                onClick={this.onClickBack}
              />
            </>
          )}
          {/* sms view modal */}
          <Modal transparent={true} visible={isSmsVerification && !this.props.isLoading}>
            {this.renderCardView(true)}
          </Modal>
          {/* 2FA view modal */}
          <Modal transparent={true} visible={isTfaVerification && !this.props.isLoading}>
            {this.render2FAView(this.state.TFAVerified, this.state.TFAFailed)}
          </Modal>
          {/* change 2FA modal */}
          <Modal transparent={true} visible={isChangeTfa && !this.props.isLoading}>
            {this.renderChange2FAView()}
          </Modal>
          {/* change email modal */}
          <Modal transparent={true} visible={isEmailVerification && !this.props.isLoading}>
            {this.renderEmailView()}
          </Modal>
          {/* change email modal */}
          <Modal visible={isPasscodeVisible}>
            <SafeAreaView style={styles.picCodeContainer}>
              <View style={styles.picCodeContainer}>
                <TouchableOpacity onPress={this.onPinCodeClosePressed}>
                  <Text style={styles.pinCodeCloseText}>{I18n.t('CLOSE')}</Text>
                </TouchableOpacity>
                <PINCode
                  status={'choose'}
                  titleChoose={I18n.t('ENTER_PIN_CODE')}
                  titleConfirm={I18n.t('CONFIRM_PIN_CODE')}
                  finishProcess={this.finishProcess}
                  stylePinCodeTextTitle={styles.pincodeTitle}
                  stylePinCodeColorTitle={styles.pincodeTitle.color}
                  stylePinCodeColorSubtitle={styles.pincodeTitle.color}
                  buttonDeleteText={I18n.t('DELETE')}
                  touchIDDisabled={true}
                  iconButtonDeleteDisabled={true}
                />
              </View>
            </SafeAreaView>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   * trigger when the user click close button in the PinCode model
   */
  onPinCodeClosePressed = () => {
    this.setState({
      passCodeEnabled: false,
      isPasscodeVisible: false,
    })
  }

  /**
   * trigger when user set the Passcode successfully
   */
  finishProcess = () => {
    this.setState({
      isPasscodeVisible: false,
      passCodeEnabled: true,
    })
    this.storeInLocal(LocalStoreKey.PASSCODE, true.toString())
  }

  /**
   * render the card base on the input sms verification
   * @param {bool} isSMS positive when the view for SMS verification
   */
  renderCardView = (isSMS) => {
    // to access current state
    const {
      otpData,
      timer,
      timeLeftForTransaction,
      isSmsFailed,
      smsVerified,
      isSmsVerification,
    } = this.state

    return (
      <View style={styles.modalStyle}>
        <View style={[styles.authenticateMainContainer, styles.smsContainerHeight]}>
          {/* cancel transaction button  */}
          {!smsVerified ? (
            <View style={styles.closeView}>
              <TouchableOpacity onPress={this.cancelTransaction}>
                <CancelImage width={styles.cancelImage.width} height={styles.cancelImage.height} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cancelImage} />
          )}
          <View style={styles.centerContainerStyle}>
            {/* timer for transaction */}
            {!smsVerified && timeLeftForTransaction !== 0 && (
              <Text style={styles.infoText}>
                {I18n.t('TIME_LEFT_FOR_COMPLETING')}
                {I18n.t('THIS_TRANSACTION')}
                <Text style={styles.infoTextAppColor}>{getMinutes(timeLeftForTransaction)}</Text>
              </Text>
            )}
            <Text />
            <Text testID={'titleText'} style={styles.modalTitleText}>
              {I18n.t('SMS_AUTHENTICATION')}
            </Text>
            <Line styleProp={styles.modalTitleLine} />
            {/* view to show when verified or failed */}
            {smsVerified ? (
              <View style={styles.verifyCaontainerStyle}>
                <View style={styles.verifiedContainer}>
                  <Text style={styles.verifiedText}>{I18n.t('SMS_VERIFY_SUCCESS')}</Text>
                  <VerifiedImage
                    width={styles.verifiedImage.width}
                    height={styles.verifiedImage.height}
                  />
                </View>
                <Button
                  text={I18n.t('CLOSE')}
                  withShadow={false}
                  style={styles.backButtonModalStyle}
                  withBg={true}
                  onClick={this.closeSmsModal}
                />
              </View>
            ) : isSmsFailed ? (
              <View style={styles.centerStyle}>
                <View style={styles.ErrorIconView}>
                  <ErrorIcon width={styles.errorIcon.width} height={styles.errorIcon.height} />
                </View>
                <Text style={[styles.verifiedText, styles.backButtonStyle]}>
                  {I18n.t('SMS_NOT_VERIFIED')}
                </Text>
                {timeLeftForTransaction !== 0 && (
                  <Button
                    text={I18n.t('BACK')}
                    withShadow={false}
                    style={styles.backButtonModalStyle}
                    withBg={true}
                    onClick={this.smsBack}
                  />
                )}
              </View>
            ) : (
              <View style={styles.centerStyle}>
                <Text style={styles.infoText}>{I18n.t('ENTER_CODE')}</Text>
                <TextInputMask
                  returnKeyType="done"
                  value={otpData}
                  style={[
                    styles.inputTextStyle,
                    styles.changePasswordButtonStyle,
                    styles.textInputBorderNill,
                  ]}
                  options={{ mask: 'A-999-999' }}
                  maxLength={9}
                  type={'custom'}
                  onChangeText={(text) => this.setState({ otpData: text })}
                />
                {isSMS && (
                  <View style={styles.resendContainer}>
                    <Text style={styles.infoTextResend}>
                      {I18n.t('BULLET_UNICODE') + I18n.t('OTP_EXPIRES_IN')}
                      <Text
                        style={[
                          styles.infoTextResendAppColor,
                          timer === 0
                            ? { color: Colors.gradientRed }
                            : { color: Colors.mediumTurquoise },
                        ]}
                      >
                        {getMinutes(timer)}
                      </Text>
                    </Text>
                    <Text style={styles.infoTextResend}>
                      {I18n.t('BULLET_UNICODE') + I18n.t('OTP_RESEND_TEXT')}
                      <Text
                        testID={'resend'}
                        onPress={() =>
                          timer === 0 &&
                          isSmsVerification &&
                          this.resendOTP(DefaultStrings.SMS_CAPS)
                        }
                        style={[
                          styles.infoTextResendTimerColor,
                          timer === 0 ? styles.resendActive : styles.resendinActive,
                        ]}
                      >
                        {I18n.t('RESEND')}
                      </Text>
                      {I18n.t('IT')}
                    </Text>
                  </View>
                )}
                <Button
                  text={I18n.t('VERIFY')}
                  withShadow={false}
                  style={[
                    styles.verifyBtnStyle,
                    otpData.length <= 8 && { backgroundColor: Colors.lightGrey },
                  ]}
                  withBg={true}
                  onClick={this.submitSmsVerify}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }

  /**
   * close sms modal
   */
  closeSmsModal = () => {
    this.setState({ isSmsVerification: false })
    this.props.cancelTransaction()
    this.clearTimer()
  }

  /**
   * submit sms verify
   */
  submitSmsVerify = () => {
    if (this.state.otpData.length >= 8) {
      this.state.smsAuthenticationEnabled
        ? this.submitVerification(DefaultStrings.ACTIVATE)
        : this.submitVerification(DefaultStrings.DELETE)
    }
  }

  /**
   * back button for sms transaction modal
   */
  smsBack = () => {
    this.setState({ verified: false, isSmsFailed: false, TFAFailed: false, TFAVerified: false })
    if (this.state.timeLeftForTransaction === 0) {
      this.props.cancelTransaction()
      this.setState({ isSmsVerification: false, isTfaVerification: false })
    }
  }

  /**
   * cancel sms transaction
   */
  cancelTransaction = () => {
    this.clearTimer()
    this.props.cancelTransaction()
    this.setState({
      isSmsVerification: false,
      smsAuthenticationEnabled: !this.state.smsAuthenticationEnabled,
    })
  }

  /**
   * start timer for sms
   */
  startTimerInterval = () => {
    // interval for otp expiration
    this.setState({ timer: this.state.resendTimer })
    this.interval = setInterval(this.startTimerForResend, 1000)
  }

  /**
   * submit sms verification
   */
  submitVerification = (method) => {
    this.props.submitVerification(
      method,
      this.props.uuid,
      this.state.otpData.replace('-', '').replace('-', ''),
      this.processSmsTransaction,
      this.cancelSmsTransaction
    )
  }

  /**
   * show view for failed sms transaction
   */
  cancelSmsTransaction = () => {
    this.setState({
      isSmsFailed: true,
      smsVerified: false,
    })
  }

  /**
   * show view for success sms transaction
   */
  successSmsTransaction = () => {
    this.setState({
      isSmsFailed: false,
      smsVerified: true,
    })
  }

  /**
   * process sms verification
   * */
  processSmsTransaction = () => {
    this.props.processTransaction(this.successSmsTransaction, this.cancelSmsTransaction)
  }

  /**
   * render email view
   */
  renderEmailView = () => {
    // to access current state
    const {
      timer,
      timeLeftForTransaction,
      emailVerifyFailed,
      emailVerifySuccess,
      isEmailVerification,
    } = this.state

    return (
      <View style={styles.modalStyle}>
        <View style={[styles.authenticateMainContainer, styles.emailContainerHeight]}>
          {!emailVerifySuccess ? (
            <View style={styles.closeView}>
              <TouchableOpacity onPress={this.cancelEmailTransaction}>
                <CancelImage width={styles.cancelImage.width} height={styles.cancelImage.height} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cancelImage} />
          )}
          <View style={styles.centerContainerStyle}>
            {!emailVerifySuccess && timeLeftForTransaction !== 0 && (
              <Text style={styles.infoText}>
                {I18n.t('TIME_LEFT_FOR_COMPLETING')}
                {I18n.t('THIS_TRANSACTION')}
                <Text style={styles.infoTextAppColor}>{getMinutes(timeLeftForTransaction)}</Text>
              </Text>
            )}
            <Text />
            <Text testID={'titleText'} style={styles.modalTitleText}>
              {I18n.t('EMAIL_AUTHENTICATION_LOWER')}
            </Text>
            <Line styleProp={styles.modalTitleLine} />
            {emailVerifySuccess ? (
              <View style={styles.verifyCaontainerStyle}>
                <View style={styles.verifiedContainer}>
                  <Text style={styles.verifiedText}>{I18n.t('EMAIL_VERIFIED_SUCCESS')}</Text>
                  <VerifiedImage
                    width={styles.verifiedImage.width}
                    height={styles.verifiedImage.height}
                  />
                </View>
                <Button
                  text={I18n.t('CLOSE')}
                  withShadow={false}
                  style={styles.backButtonModalStyle}
                  withBg={true}
                  onClick={this.closeEmailModal}
                />
              </View>
            ) : emailVerifyFailed ? (
              <View style={styles.centerStyle}>
                <View style={styles.ErrorIconView}>
                  <ErrorIcon width={styles.errorIcon.width} height={styles.errorIcon.height} />
                </View>
                <Text style={[styles.verifiedText, styles.backButtonStyle]}>
                  {I18n.t('EMAIL_VERIFIED_FAILURE')}
                </Text>
                {timeLeftForTransaction !== 0 && (
                  <Button
                    text={I18n.t('BACK')}
                    withShadow={false}
                    style={styles.backButtonModalStyle}
                    withBg={true}
                    onClick={this.emailBack}
                  />
                )}
              </View>
            ) : (
              <View style={styles.centerStyle}>
                <Text style={styles.infoText}>{I18n.t('EMAIL_AUTHENTICATION_CONTENT')}</Text>
                {/* resend container  */}
                <View style={[styles.resendContainer]}>
                  <Text style={styles.infoTextResend}>
                    {I18n.t('BULLET_UNICODE') + I18n.t('EMAIL_EXPIRES_IN')}
                    <Text
                      style={[
                        styles.infoTextResendAppColor,
                        timer === 0
                          ? { color: Colors.gradientRed }
                          : { color: Colors.mediumTurquoise },
                      ]}
                    >
                      {getMinutes(timer)}
                    </Text>
                  </Text>
                  <Text style={styles.infoTextResend}>
                    {I18n.t('BULLET_UNICODE') + I18n.t('EMAIL_RESEND_TEXT')}
                    <Text
                      testID={'resend'}
                      style={[
                        styles.infoTextResendTimerColor,
                        timer === 0 ? styles.resendActive : styles.resendinActive,
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
                      timer !== 0 && { backgroundColor: Colors.lightGrey },
                    ]}
                    withBg={true}
                    onClick={() =>
                      timer === 0 &&
                      isEmailVerification &&
                      this.resendOTP(DefaultStrings.EMAIL.trim())
                    }
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }

  /**
   * close email modal
   */
  closeEmailModal = () => {
    this.setState({ isEmailVerification: false })
    this.props.cancelTransaction()
    this.clearTimer()
  }

  /**
   * resend email
   */
  resendOTP = (to) => {
    this.props.resend(to, this.startTimerInterval)
  }

  /**
   * back button email modal
   */
  emailBack = () => {
    this.setState({
      emailVerifyFailed: false,
      emailVerifySuccess: false,
      emailAuthenticationEnabled: !this.state.emailAuthenticationEnabled,
    })
    this.props.cancelTransaction()
    this.setState({ isEmailVerification: false })
  }

  /**
   * cancel email transaction
   */
  cancelEmailTransaction = () => {
    this.clearTimer()
    this.props.cancelTransaction()
    this.setState({
      isEmailVerification: false,
      emailAuthenticationEnabled: !this.state.emailAuthenticationEnabled,
    })
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
      this.props.processTransaction(
        this.showViewForSuccessEmailTramsaction,
        this.stopEmailVerifyProcess
      )
    } else {
      // if not verified again call check email transaction
      this.checkEmailTransaction()
    }
  }

  /**
   * show view for success email transaction
   */
  showViewForSuccessEmailTramsaction = () => {
    this.setState({ emailVerifySuccess: true, emailVerifyFailed: false })
    this.clearTimer()
  }

  /**
   * stop email process transaction
   */
  stopEmailVerifyProcess = () => {
    this.setState({ emailVerifySuccess: false, emailVerifyFailed: true })
    this.clearTimer()
  }

  /**
   * render 2FA view
   * @param {bool} TFAVerified positive when the view for 2FA verification
   * @param {bool} TFAFailed positive when the view verified failed
   */
  render2FAView = (TFAVerified, TFAFailed) => {
    // to access current state
    const { tfaData, timeLeftForTransaction } = this.state

    return (
      <View style={styles.modalStyle}>
        <View style={[styles.authenticateMainContainer, styles.tfaContainerHeight]}>
          {/* cancel transaction  */}
          {!TFAVerified ? (
            <View style={styles.closeView}>
              <TouchableOpacity onPress={this.cancelTfaransaction}>
                <CancelImage width={styles.cancelImage.width} height={styles.cancelImage.height} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cancelImage} />
          )}
          <View style={styles.centerContainerStyle}>
            {/* timer  */}
            {!TFAVerified && timeLeftForTransaction !== 0 && (
              <Text style={styles.infoText}>
                {I18n.t('TIME_LEFT_FOR_COMPLETING')}
                {I18n.t('THIS_TRANSACTION')}
                <Text style={styles.infoTextAppColor}>{getMinutes(timeLeftForTransaction)}</Text>
              </Text>
            )}
            <Text />
            <Text style={styles.modalTitleText}>{I18n.t('TFA_AUTHENTICATION')}</Text>
            <Line styleProp={styles.modalTitleLine} />
            {/* show view based on 2FA transaction verifed or not */}
            {TFAVerified ? (
              <View style={styles.verifyCaontainerStyle}>
                <View style={styles.verifiedContainer}>
                  <Text style={styles.verifiedText}>{I18n.t('TFA_VERIFY_SUCCESS')}</Text>
                  <VerifiedImage
                    width={styles.verifiedImage.width}
                    height={styles.verifiedImage.height}
                  />
                </View>
                <Button
                  text={I18n.t('CLOSE')}
                  withShadow={false}
                  style={styles.backButtonModalStyle}
                  withBg={true}
                  onClick={this.closeTfaTransaction}
                />
              </View>
            ) : TFAFailed ? (
              <View style={styles.centerStyle}>
                <View style={styles.ErrorIconView}>
                  <ErrorIcon width={styles.errorIcon.width} height={styles.errorIcon.height} />
                </View>
                <Text style={[styles.verifiedText, styles.backButtonStyle]}>
                  {I18n.t('TFA_NOT_VERIFIED')}
                </Text>
                {timeLeftForTransaction !== 0 && (
                  <Button
                    text={I18n.t('BACK')}
                    withShadow={false}
                    style={styles.backButtonModalStyle}
                    withBg={true}
                    onClick={this.smsBack}
                  />
                )}
              </View>
            ) : (
              <View style={styles.centerStyle}>
                <Text style={[styles.infoText, styles.marginForEmailButton]}>
                  {I18n.t('SEND_TFA_INFO')}
                </Text>
                <TextInputMask
                  returnKeyType="done"
                  value={tfaData}
                  style={[styles.inputTextStyle, styles.marginForEmailButton]}
                  options={{ mask: '999-999' }}
                  maxLength={9}
                  type={'custom'}
                  onChangeText={(text) => this.setState({ tfaData: text })}
                />
                <Button
                  text={I18n.t('VERIFY')}
                  withShadow={false}
                  style={[
                    styles.verifyBtnStyle,
                    styles.marginForEmailButton,
                    tfaData.length <= 6 && { backgroundColor: Colors.lightGrey },
                  ]}
                  withBg={true}
                  onClick={this.submit2FaVerify}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }

  /**
   * close tfa transaction
   */
  closeTfaTransaction = () => {
    this.setState({ isTfaVerification: false })
    this.props.cancelTransaction()
    this.clearTimer()
  }

  /**
   * submit 2FA verify
   */
  submit2FaVerify = () => {
    if (this.state.tfaData.length >= 6) {
      this.state.primaryGoogleAuthEnabled
        ? this.submitTfaVerification(DefaultStrings.ACTIVATE)
        : this.submitTfaVerification(DefaultStrings.DELETE)
    }
  }

  /**
   * submit tfa verification
   * @param {String} method contains method to submit transaction
   * */
  submitTfaVerification = (method) => {
    this.props.submitVerification(
      method,
      this.props.uuid,
      this.state.tfaData.replace('_', '').replace('-', ''),
      this.processTfaTransaction,
      this.showViewForFailedTfa
    )
  }

  /**
   * show view for failed tfa
   * */
  showViewForFailedTfa = () => {
    this.setState({
      TFAFailed: true,
      TFAVerified: false,
    })
  }

  /**
   * show view for success tfa
   * */
  showViewForSuccessTfa = () => {
    this.setState({ TFAFailed: false, TFAVerified: true })
    this.clearTimer()
  }

  /**
   * process tfa verification
   * */
  processTfaTransaction = () => {
    this.props.processTransaction(this.showViewForSuccessTfa, this.showViewForFailedTfa)
  }

  /**
   * cancel tfa security transaction
   */
  cancelTfaransaction = () => {
    this.clearTimer()
    this.props.cancelTransaction()
    this.setState({
      isTfaVerification: false,
      primaryGoogleAuthEnabled: !this.state.primaryGoogleAuthEnabled,
    })
  }

  /**
   * render Change 2FA view
   */
  renderChange2FAView = () => {
    // to access current state
    const { changeTfaData, changeTFAFailed } = this.state

    return (
      <View style={styles.modalStyle}>
        <View style={[styles.authenticateMainContainer, styles.tfaChangeContainerHeight]}>
          <View style={styles.closeView}>
            {/* change tfa transaction cancel image */}
            <TouchableOpacity onPress={this.cancelChangeTfa}>
              <CancelImage width={styles.cancelImage.width} height={styles.cancelImage.height} />
            </TouchableOpacity>
          </View>
          <View style={styles.centerContainerStyle}>
            <Text style={styles.modalTitleText}>{I18n.t('TFA_AUTHENTICATION')}</Text>
            <Line styleProp={styles.modalTitleLine} />
            {/* show view based change tfa success or failure */}
            {changeTFAFailed ? (
              <View style={styles.centerStyle}>
                <View style={styles.ErrorIconView}>
                  <ErrorIcon width={styles.errorIcon.width} height={styles.errorIcon.height} />
                </View>
                <Text style={[styles.verifiedText, styles.backButtonStyle]}>
                  {I18n.t('TFA_NOT_VERIFIED')}
                </Text>
                <Button
                  text={I18n.t('BACK')}
                  withShadow={false}
                  style={styles.backButtonModalStyle}
                  withBg={true}
                  onClick={this.backChangeTfa}
                />
              </View>
            ) : (
              <View style={[styles.centerStyle, styles.changePasswordButtonStyle]}>
                <Text style={[styles.infoText, styles.changePasswordButtonStyle]}>
                  {I18n.t('SEND_TFA_INFO')}
                </Text>
                <TextInputMask
                  returnKeyType="done"
                  value={changeTfaData}
                  style={[styles.inputTextStyle, styles.changePasswordButtonStyle]}
                  options={{ mask: '999-999' }}
                  maxLength={9}
                  type={'custom'}
                  onChangeText={(text) => this.setState({ changeTfaData: text })}
                />
                <Button
                  text={I18n.t('VERIFY')}
                  withShadow={false}
                  style={[
                    styles.verifyBtnStyle,
                    styles.changePasswordButtonStyle,
                    changeTfaData.length <= 6 && { backgroundColor: Colors.lightGrey },
                  ]}
                  withBg={true}
                  onClick={() => changeTfaData.length >= 6 && this.submitChangeTfaVerification()}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }

  /**
   * back tfa change
   */
  backChangeTfa = () => {
    this.setState({ changeTFAFailed: false })
  }

  /**
   * cancel change tfa transaction
   * */
  cancelChangeTfa = () => {
    this.setState({ isChangeTfa: false })
  }

  /**
   * submit change tfa transaction
   */
  submitChangeTfaVerification = () => {
    let data = { code: this.state.changeTfaData.replace('-', '') }
    this.props.tfaChangeRequest(data, this.navigateToChangeTfa, this.showViewForFaildChangeTfa)
  }

  /**
   * Navigate to change tfa screen
   */
  navigateToChangeTfa = (data) => {
    this.setState({ isChangeTfa: false })
    Navigator.navigate(NavKeys.CHANGE_TFA, {
      address: data.data.secret,
      token: data.data.token,
    })
  }

  /**
   * show failure change tfa modal
   */
  showViewForFaildChangeTfa = () => {
    this.setState({ changeTFAFailed: true })
  }

  /**
   * on toggle change for email authentication
   * @param {Boolean} value refers value to change state
   */
  onToggleEmail = (value) => {
    this.setState({
      emailAuthenticationEnabled: value,
      emailVerifyFailed: false,
      emailVerifySuccess: false,
    })
    // if true post security method
    if (value) {
      this.props.postSecurityMethods(
        { method: DefaultStrings.EMAIL.trim() },
        this.startTimerForEmailAuthentication,
        this.stopEmailAuthentication.bind(this, value)
      )
      // if false delete security method
    } else {
      this.props.deleteSecurityMethods(
        { method: DefaultStrings.EMAIL.trim() },
        this.startTimerForEmailAuthentication,
        this.stopEmailAuthentication.bind(this, value)
      )
    }
  }

  /**
   * start timer for sms authentiation
   */
  startTimerForEmailAuthentication = () => {
    this.setState({
      isEmailVerification: true,
      timeLeftForTransaction: 600,
      timer: this.state.resendTimer,
      iemailVerifyFailed: false,
      emailVerifySuccess: false,
    })
    this.interval = setInterval(this.startTimerForResend, 1000)

    // otp for transaction interval
    this.transactionInterval = setInterval(this.startTimerForTransaction, 1000)

    // check email transaction
    this.checkEmailTransaction()
  }

  /**
   * show failed view for email transaction
   * @param {Boolean} value refers value to change state
   */
  stopEmailAuthentication = (value) => {
    this.setState({ emailAuthenticationEnabled: !value })
  }

  /**
   * Enable switch option based on methods
   * @param {Array} data includes data to enable or disable security option
   */
  enableSwitchBasedOnMethods = (data) => {
    this.setState({
      primaryGoogleAuthEnabled: data.includes(DefaultStrings.TFA_CAPS),
      smsAuthenticationEnabled: data.includes(DefaultStrings.SMS_CAPS),
      emailAuthenticationEnabled: data.includes(DefaultStrings.EMAIL.trim()),
    })
  }

  /**
   * show change tfa modal
   */
  onNavigateTfa = () => {
    this.setState({ isChangeTfa: true })
  }

  /**
   * on toggle change for push notifications
   * @param {Boolean} value refers value to change state
   */
  onTogglePush = (value) => {
    this.setState({ pushNotificationEnabled: value })
  }

  /**
   * on toggle change for primary google authentication
   * @param {Boolean} value refers value to change state
   */
  onTogglePrimaryGoogleAuth = (value) => {
    this.setState({ primaryGoogleAuthEnabled: value })
    this.setState({
      TFAFailed: false,
      TFAVerified: false,
      tfaData: '',
    })
    // if true post google security method
    if (value) {
      this.props.postSecurityMethods(
        { method: DefaultStrings.TFA_CAPS.trim() },
        this.startTimerForGoogleAuthentication,
        this.stopGoogleAuthentication.bind(this, value)
      )
    } else {
      // if false delete google security method
      this.props.deleteSecurityMethods(
        { method: DefaultStrings.TFA_CAPS.trim() },
        this.startTimerForGoogleAuthentication,
        this.stopGoogleAuthentication.bind(this, value)
      )
    }
  }

  /**
   * start timer for sms authentiation
   */
  startTimerForGoogleAuthentication = () => {
    this.setState({
      isTfaVerification: true,
      tfaData: '',
      timeLeftForTransaction: 600,
      isValidTFA: false,
      tfaVerification: false,
    })

    // otp for transaction interval
    this.transactionInterval = setInterval(this.startTimerForTransaction, 1000)
  }

  /**
   * show failed view for google transaction
   * @param {Boolean} value refers value to change state
   */
  stopGoogleAuthentication = (value) => {
    this.setState({ primaryGoogleAuthEnabled: !value })
  }

  /**
   * on toggle change for sms authentication
   * @param {Boolean} value refers value to change state
   */
  onToggleSms = (value) => {
    this.setState({ smsAuthenticationEnabled: value })
    // send sms verification otp
    this.setState({
      smsVerified: false,
      isSmsFailed: false,
      verified: false,
      otpData: '',
    })
    if (value) {
      // post sms security method
      this.props.postSecurityMethods(
        { method: DefaultStrings.SMS_CAPS },
        this.startTimerForSmsAuthentication,
        this.stopSmsAuthentication.bind(this, value)
      )
    } else {
      // if false delete google security method
      this.props.deleteSecurityMethods(
        { method: DefaultStrings.SMS_CAPS.trim() },
        this.startTimerForSmsAuthentication,
        this.stopSmsAuthentication.bind(this, value)
      )
    }
  }

  /**
   * start timer for sms authentiation
   */
  startTimerForSmsAuthentication = () => {
    this.setState({
      timer: this.state.resendTimer,
      timeLeftForTransaction: 600,
      isSmsVerification: true,
    })

    this.interval = setInterval(this.startTimerForResend, 1000)

    // otp for transaction interval
    this.transactionInterval = setInterval(this.startTimerForTransaction, 1000)
  }

  /**
   * show failed view for sms transaction
   * @param {Boolean} value refers value to change state
   */
  stopSmsAuthentication = (value) => {
    this.setState({ smsAuthenticationEnabled: !value })
  }

  /**
   * start timer for resend
   */
  startTimerForResend = () => {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }))
  }

  /**
   * start timer for transaction
   */
  startTimerForTransaction = () => {
    this.setState((prevState) => ({
      timeLeftForTransaction: prevState.timeLeftForTransaction - 1,
    }))
  }

  /**
   * on toggle change for face id
   * @param {Boolean} value refers value to change state
   */
  onToggleFace = (value) => {
    this.setState({ faceIdEnabled: value })
    this.storeInLocal(LocalStoreKey.FACE_ID, value.toString())
  }

  /**
   * on toggle change for touch id
   * @param {Boolean} value refers value to change state
   */
  onToggleTouch = (value) => {
    this.setState({ touchIdEnabled: value })
    this.storeInLocal(LocalStoreKey.TOUCH_ID, value.toString())
  }

  /**
   * Check Local Authendiction support
   */
  checkLocalAuthendicationIsEnabled() {
    TouchID.isSupported()
      .then((biometryType) => {
        // Success code
        if (biometryType === DefaultStrings.FACEID) {
          this.setState({ isFaceIdSupport: true })
        } else {
          this.setState({ isTouchIdSupport: true })
        }
      })
      .catch(() => {
        // Failure code
      })
  }
  /**
   * on toggle change for passcode
   * @param {Boolean} value refers value to change state
   */
  onTogglePasscode = (value) => {
    this.setState({ passCodeEnabled: value })
    if (!value) {
      this.storeInLocal(LocalStoreKey.PASSCODE, false.toString())
      return
    }
    this.setState({ isPasscodeVisible: true })
  }

  /** Async Storage
   * store given value in given key
   */
  async storeInLocal(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
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

  /**
   * on click change password function
   */
  onClickChangePassword = () => {
    Navigator.navigate(NavKeys.CHANGE_PASSWORD)
  }

  /**
   * on click back function
   */
  onClickBack = () => {
    Navigator.goBack()
  }

  /**
   * clear timer
   */
  clearTimer = () => {
    if (this.state.timer !== 0) {
      clearInterval(this.interval)
    }
    if (this.state.timeLeftForTransaction !== 0) {
      clearInterval(this.transactionInterval)
    }
  }

  /**
   * Back button click to go back to previous view
   */
  onBackClicked = () => {
    Navigator.goBack()
  }

  /**
   * Continue button action to navigate to next screen
   */
  onClickContinue() {
    Navigator.navigate(NavKeys.ADD_BANK_ACCOUNT_TYPE_FROM_ONBOARD, { isFromOnBoarding: true })
  }
}

SecurityScreen.propTypes = {
  isLoading: PropTypes.bool,
  phoneNumber: PropTypes.string,
  changePassword: PropTypes.func,
  getSecurityMethods: PropTypes.func,
  postSecurityMethods: PropTypes.func,
  checkTx: PropTypes.func,
  submitVerification: PropTypes.func,
  cancelTransaction: PropTypes.func,
  resend: PropTypes.func,
  tfaChangeRequest: PropTypes.func,
  processTransaction: PropTypes.func,
  deleteSecurityMethods: PropTypes.func,
  uuid: PropTypes.string,
  dispatch: PropTypes.func,
  profilePhoto: PropTypes.string,
  onBoardingProfile: PropTypes.object,
  navigation: PropTypes.object,
}

export const mapStateToProps = (state) => ({
  phoneNumber: state.user.onBoardingProfile.phonecode + state.user.onBoardingProfile.phone,
  uuid: state.user.onBoardingProfile.uuid,
  isLoading: state.common.isLoading,
  onBoardingProfile: state.user.onBoardingProfile,
  profilePhoto: state.user.profilePhoto,
})

export const mapDispatchToProps = (dispatch) => ({
  getSecurityMethods: (successFn) => dispatch(UserActions.getSecurityMethods(successFn)), // get all security methods
  postSecurityMethods: (data, successFn, failureFn) =>
    dispatch(UserActions.postSecurityMethods(data, successFn, failureFn)), // post new security methods
  deleteSecurityMethods: (data, successFn, failureFn) =>
    dispatch(UserActions.deleteSecurityMethods(data, successFn, failureFn)), // delete security methods

  checkTx: (successFn, failureFn) => dispatch(UserActions.checkTx(successFn, failureFn)), // check transaction
  processTransaction: (successFn, failureFn) =>
    dispatch(UserActions.processTransaction(successFn, failureFn)), // process  transaction

  submitVerification: (method, uuid, code, successFn, failureFn) =>
    dispatch(UserActions.submitSmsVerification(method, uuid, code, successFn, failureFn)), // submit sms verification

  tfaChangeRequest: (data, successFn, failureFn) =>
    dispatch(UserActions.tfaChangeRequest(data, successFn, failureFn)), // tfa change request

  resend: (data, successFn) => dispatch(UserActions.resend(data, successFn)), // resend sms or email

  cancelTransaction: () => dispatch(UserActions.cancelTransaction()), // cancel active transaction
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecurityScreen)
