import React from 'react'
import styles from './ChangeTwoFactorScreenStyle'
import {
  ScrollView,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Clipboard,
  KeyboardAvoidingView,
  Linking,
} from 'react-native'
import { Colors } from 'App/Theme'
import { QRCode } from 'react-native-custom-qr-codes'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from 'App/Components/Button/Button'
import DefaultStrings from 'App/Constants/DefaultStrings'
import { TextInputMask } from 'react-native-masked-text'
import Line from 'App/Components/Line/Line'
import Navigator from 'App/Services/NavigationService'
import UserActions from 'App/Stores/User/Actions'
import Copy from 'App/Assets/Images/Svg/Copy'
import I18n from 'App/Localization/I18n'
import { AlertMessage } from 'App/Components/Utils/Functions'
import { GOOGLE_AUTH_APP_URL } from 'App/Constants/TransactionStatus.js'

/**
 * change 2fa code using qr code
 */
export class ChangeTwoFactorScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: props.navigation.state.params.address,
      addressForQrcode:
        DefaultStrings.OTP_AUTH +
        this.props.email +
        DefaultStrings.SECRET +
        props.navigation.state.params.address +
        DefaultStrings.QRCODE_ISSUER,
      authCode: '',
      token: props.navigation.state.params.token,
    }
  }

  componentDidMount() {
    AlertMessage(I18n.t('HEADER'), I18n.t('OPEN_GOOGLE_AUTH_CONTENT'), this.openGoogleTwoFactorApp)
  }

  render() {
    const { address, authCode, addressForQrcode, token } = this.state
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        enabled
        keyboardVerticalOffset={150}
      >
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.centerStyle}
          >
            <Text style={styles.titleText}>{I18n.t('GOOGLE_AUTHENTICATOR')}</Text>
            <Line styleProp={styles.titleLine} />
            <Text style={styles.authContent}>{I18n.t('GOOGLE_AUTH_CONTENT')}</Text>
            <QRCode
              codeStyle="square"
              logo={DefaultStrings.QR_CODE_LOGO_PATH}
              logoSize={50}
              content={addressForQrcode}
            />
            <View>
              <TouchableOpacity style={styles.rowStyle} onPress={this.copyClipBoard}>
                <Text style={styles.addressText}>{address}</Text>
                <Copy width={styles.copyImage.width} height={styles.copyImage.height} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.infoText}>{I18n.t('SEND_TFA_INFO')}</Text>
              <TextInputMask
                type={'custom'}
                returnKeyType="done"
                keyboardType={'numeric'}
                style={[styles.inputStyle]}
                options={{ mask: '999-999' }}
                maxLength={7}
                value={authCode}
                textAlign={'center'}
                onChangeText={this.onChangeAuthCode}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                style={authCode.length <= 6 && { backgroundColor: Colors.lightGrey }}
                text={I18n.t('CONFIRM')}
                withShadow={false}
                withBg={true}
                onClick={token ? this.tfaChangeConfirm : this.addTfa}
              />
              <Button
                style={styles.backButtonStyle}
                text={I18n.t('BACK')}
                withBorder={true}
                onClick={this.onClickBack}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  }

  /**
   * on change auth code
   */
  onChangeAuthCode = (text) => {
    this.setState({ authCode: text })
  }

  /**
   * on click back navigation
   */
  onClickBack = () => {
    !this.state.token && this.props.navigation.state.params.refreshProfile()
    Navigator.goBack()
  }

  /**
   * copy address to clipboard
   */
  copyClipBoard = () => {
    Clipboard.setString(this.state.address)
  }

  /**
   * tfa change confimation functionn
   */
  tfaChangeConfirm = () => {
    let data = { token: this.state.token, code: this.state.authCode.replace('-', '') }
    this.props.tfaChangeConfirm(data, this.showAlertForSuccessResponse)
  }

  /**
   * add tfa api request function
   */
  addTfa = () => {
    let data = { secret: this.state.address, code: this.state.authCode.replace('-', '') }
    this.props.postTfaVerification(data, this.showAlertForSuccessResponse)
  }

  /**
   * show alert for success tfa
   */
  showAlertForSuccessResponse = (data) => {
    Alert.alert(
      I18n.t('HEADER'),
      data.message,
      [{ text: DefaultStrings.OK, onPress: this.onClickBack }],
      { cancelable: false }
    )
  }

  /**
   * open two factor app if app installed
   */
  openGoogleTwoFactorApp = () => {
    const { addressForQrcode } = this.state

    Linking.canOpenURL(addressForQrcode)
      .then(this.openAppCallback)
      .catch(this.showAlert)
  }

  /**
   * open two factor success callback
   * @param {Boolean} supported whether url is supported or not
   * @returns open app if url is supported
   */
  openAppCallback = (supported) => {
    if (!supported) {
      AlertMessage(I18n.t('HEADER'), I18n.t('OPEN_GOOGLE_AUTH_ERROR'), this.installGoogleAuthApp)
    } else {
      return Linking.openURL(this.state.addressForQrcode)
    }
  }

  /**
   * open two factor failure callback
   */
  showAlert = () => {
    AlertMessage(I18n.t('HEADER'), I18n.t('OPEN_GOOGLE_AUTH_ERROR'), this.installGoogleAuthApp)
  }

  /**
   * open app store url if two factor app not installed
   */
  installGoogleAuthApp = () => {
    Linking.openURL(GOOGLE_AUTH_APP_URL.APP_STORE_URL)
  }
}

ChangeTwoFactorScreen.propTypes = {
  changePassword: PropTypes.func,
  tfaChangeRequest: PropTypes.func,
  tfaChangeConfirm: PropTypes.func,
  email: PropTypes.string,
  navigation: PropTypes.object,
  postTfaVerification: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  email: state.user.onBoardingProfile.email,
})

export const mapDispatchToProps = (dispatch) => ({
  tfaChangeConfirm: (data, successFn) => dispatch(UserActions.tfaChangeConfirm(data, successFn)),
  postTfaVerification: (data, successFn) =>
    dispatch(UserActions.postTfaVerification(data, successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeTwoFactorScreen)
