import React from 'react'
import styles from './AddNewContactScreenStyle'
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
} from 'react-native'
import Line from 'App/Components/Line/Line'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import APIKeys from 'App/Constants/APIKeys'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import USDLogoDisable from 'App/Assets/Images/Svg/USDLogoDisable'
import BitcoinLogoDisable from 'App/Assets/Images/Svg/BitcoinLogoDisable'
import DashLogoDisable from 'App/Assets/Images/Svg/DashLogoDisable'
import ETHLogoDisable from 'App/Assets/Images/Svg/ETHLogoDisable'
import EuroLogoDisable from 'App/Assets/Images/Svg/EuroLogoDisable'
import QRCode from 'App/Assets/Images/Svg/QRCode'
import Question from 'App/Assets/Images/Svg/Question'
import CheckboxBlank from 'App/Assets/Images/Svg/CheckboxBlank'
import CheckboxChecked from 'App/Assets/Images/Svg/CheckboxChecked'
import UserActions from 'App/Stores/User/Actions'
import Button from 'App/Components/Button/Button'
import validator from 'validator'
import { Colors } from 'App/Theme'
import Tick from 'App/Components/Tick/Tick'
import { showValidatonAlert } from 'App/Components/Utils/Functions'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Navigator from 'App/Services/NavigationService'
import I18n from 'App/Localization/I18n'

/**
 * Add new contact screen where User can add new contact
 */
export class AddNewContactScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isValidEmail: true,
      name: '',
      curency: props.navigation.state.params.currency,
      contactAdded: false,
      scanQRCode: false,
      curencyAddressOREmail: props.navigation.state.params.address
        ? props.navigation.state.params.address
        : '',
      isCrypto: false,
      isAddEmail: true,
      email: '',
      isFromContactTab: props.navigation.state.params.isFromContactTab
        ? props.navigation.state.params.isFromContactTab
        : false,
    }
  }
  componentDidMount() {
    this.onPressCurrency(this.state.curency, true)
  }

  render() {
    const {
      contactAdded,
      curency,
      scanQRCode,
      curencyAddressOREmail,
      isAddEmail,
      isCrypto,
      email,
      isFromContactTab,
    } = this.state
    const placeholder = isCrypto === true ? I18n.t('ADDRESS_COLON') : I18n.t('E_MAIL')
    const inputPlaceholder = isCrypto === true ? I18n.t('ADDRESS') : I18n.t('EMAIL')
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View testID={'titleContainer'} style={styles.titleContainer}>
            <View style={styles.titleTextContainer}>
              <Text testID={'currency'} style={styles.titleTxt}>
                {I18n.t('CURRENCY')}
              </Text>
            </View>
            <View style={styles.currencyView}>
              <TouchableOpacity onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_EUR)}>
                {curency === DefaultStrings.TYPE_EURO || curency === DefaultStrings.TYPE_EUR ? (
                  <EuroLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <EuroLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_USD)}>
                {curency === DefaultStrings.TYPE_USD ? (
                  <USDLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <USDLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_BTC)}>
                {curency === DefaultStrings.TYPE_BTC ? (
                  <BitcoinLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <BitcoinLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_ETH)}>
                {curency === DefaultStrings.TYPE_ETH ? (
                  <ETHLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <ETHLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_DASH)}>
                {curency === DefaultStrings.TYPE_DASH ? (
                  <DashLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <DashLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Line styleProp={styles.titleLine} />
          </View>

          {/* Add contact card view  */}
          <View style={styles.inputCardContainer}>
            {/* Name input view */}
            <View style={styles.inputViwe}>
              <Text style={[styles.placeholderText, styles.alignTextRight]}>{I18n.t('NAME')}</Text>
              <TextInput
                testID={'name'}
                placeholder={I18n.t('NAME_PLACEHOLDER')}
                placeholderTextColor={Colors.suvaGrey}
                autoCapitalize="none"
                returnKeyType="done"
                value={this.state.name}
                style={[styles.inputTextStyle, styles.alignRight]}
                onChangeText={(text) => this.onChangeName(text)}
              />
            </View>

            {/* Email input view */}
            <View style={styles.inputViwe}>
              <Text style={[styles.placeholderText, styles.alignTextRight]}>{placeholder}</Text>
              <TextInput
                testID={'email'}
                placeholder={inputPlaceholder}
                placeholderTextColor={Colors.suvaGrey}
                autoCompleteType="email"
                autoCapitalize="none"
                returnKeyType="done"
                value={curencyAddressOREmail}
                style={[styles.inputTextStyle, styles.alignRight]}
                onChangeText={(text) => this.onChangeEmailORAddress(text)}
              />
            </View>

            {/* Scan QR code View */}
            {isCrypto && (
              <View style={styles.scanQRCodeView}>
                <Text style={[styles.placeholderText, styles.scanQRText]}>
                  {I18n.t('SCAN_QR_CODE')}
                </Text>
                <TouchableOpacity testID={'scanQR'} onPress={() => this.onClickScanQRCode()}>
                  <QRCode width={styles.qrCodeIcon.width} height={styles.qrCodeIcon.height} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Identify contact with email view */}
          {isCrypto && (
            <View style={styles.identifyWIthEmailView}>
              <View style={styles.textWithIconView}>
                <Text style={[styles.placeholderText, styles.addEmail]}>
                  {I18n.t('IDENTIFY_CONTACT_WITH_EMAIL')}
                </Text>
                <View style={styles.questionview}>
                  <Question width={styles.qrCodeIcon.width} height={styles.qrCodeIcon.height} />
                </View>
              </View>
              <View style={styles.checkboxView}>
                {this.renderCheckbox(isAddEmail, I18n.t('YES'))}
                {this.renderCheckbox(!isAddEmail, I18n.t('NO'))}
              </View>

              {isAddEmail && (
                <View style={[styles.identifyEmailInput]}>
                  <Text style={styles.placeholderText}> {I18n.t('E_MAIL')}</Text>
                  <TextInput
                    testID={'identifyEmail'}
                    placeholder={I18n.t('EMAIL')}
                    placeholderTextColor={Colors.suvaGrey}
                    autoCompleteType="email"
                    autoCapitalize="none"
                    returnKeyType="done"
                    value={email}
                    style={[styles.inputTextStyle]}
                    onChangeText={(text) => this.onChangeEmail(text)}
                  />
                </View>
              )}
            </View>
          )}

          {/* Add new contact button View */}
          <View style={styles.addNewContactView}>
            <Button
              testID={'addNewContact'}
              text={I18n.t('ADD_NEW_CONTACT')}
              withShadow={true}
              withBg={true}
              onClick={this.onClickAddNewContact}
            />
          </View>
          {/* Contact added success screen */}
          <Modal animationType="slide" transparent={false} visible={contactAdded}>
            <View style={styles.modalContainer}>
              <StatusBar backgroundColor={Colors.mediumTurquoise} barStyle="light-content" />
              <View style={styles.tickViewContainer}>
                <Tick />
              </View>
              <View style={styles.sendMoneyContainer}>
                <Text style={styles.contactAddedTextStyle}>{I18n.t('CONTACT_ADDED')}</Text>
                <Button
                  testID={'back'}
                  withBg={!isFromContactTab}
                  withShadow={!isFromContactTab}
                  withBorder={isFromContactTab}
                  text={isFromContactTab === true ? I18n.t('BACK_BUTTON') : I18n.t('SEND_MONEY')}
                  onClick={this.onSendMoney}
                />
              </View>
            </View>
          </Modal>

          {/* QR code scaneer */}
          <Modal animationType="slide" transparent={false} visible={scanQRCode}>
            <QRCodeScanner
              onRead={this.onSuccess.bind(this)}
              bottomContent={
                <Button
                  testID={'QRCodeSuccess'}
                  style={styles.margin}
                  text={I18n.t('DONE')}
                  withShadow={true}
                  withBg={true}
                  onClick={this.onClickConfirmQRCode}
                />
              }
            />
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  /**
   * Checkbox View
   */
  renderCheckbox = (isAddEmail, text) => {
    return (
      <TouchableOpacity style={styles.checkbox} onPress={this.onClickEmailYesOrNo.bind(this)}>
        {isAddEmail === true ? (
          <CheckboxChecked width={styles.checkboxIcon.width} height={styles.checkboxIcon.height} />
        ) : (
          <CheckboxBlank width={styles.checkboxIcon.width} height={styles.checkboxIcon.height} />
        )}
        <Text style={[styles.placeholderText, styles.checkboxText]}>{text} </Text>
      </TouchableOpacity>
    )
  }
  /**
   * change currency type for add contact
   * @param {String} type - refers currency string
   */
  onPressCurrency = (type, onDidMount) => {
    let isCrypto
    switch (type) {
      case DefaultStrings.TYPE_EURO:
      case DefaultStrings.TYPE_EUR:
      case DefaultStrings.TYPE_USD:
        isCrypto = false
        break
      default:
        isCrypto = true
        break
    }
    this.setState({
      curency: type,
      isCrypto,
      curencyAddressOREmail: onDidMount === true ? this.state.curencyAddressOREmail : '',
    })
  }

  /**
   * On change Name TextFiel
   * @param {String} name - refers user enter input as name string
   * It updates state object with name
   */
  onChangeName(name) {
    this.setState({ name })
  }

  /**
   * On change Email OR Address TextFiel
   * @param {String} text - refers user enter input as an email string or Address string
   *
   * It updates state object with email or Address
   */
  onChangeEmailORAddress(text) {
    this.state.isCrypto === true
      ? this.setState({ curencyAddressOREmail: text })
      : this.setState({ curencyAddressOREmail: text, isValidEmail: validator.isEmail(text) })
  }

  /**
   * On change Email TextFiel
   * @param {String} email - refers user enter input as an email string
   * It updates state object with email
   */
  onChangeEmail(email) {
    this.setState({ email, isValidEmail: validator.isEmail(email) })
  }

  /**
   * Send money to added contact navigate contact list with updated list
   */
  onSendMoney = () => {
    const { navigation } = this.props
    if (navigation.state.params.address === undefined) {
      navigation.state.params.getContactList()
    }
    Navigator.goBack()
  }

  // Scan QR code instead press
  onClickScanQRCode = () => {
    this.setState({ scanQRCode: true })
  }

  onClickEmailYesOrNo = () => {
    this.setState({ isAddEmail: !this.state.isAddEmail })
  }

  // on click add new contact
  onClickAddNewContact = () => {
    const { name, email, curency, curencyAddressOREmail, isCrypto, isAddEmail } = this.state
    let coin = { coin: curency, data: { description: name.trim() } } // email: email.trim()
    if (
      (isCrypto &&
        (curencyAddressOREmail.trim().length === 0 ||
          (isAddEmail && !validator.isEmail(email.trim())))) ||
      name.trim().length === 0 ||
      (!isCrypto && !validator.isEmail(curencyAddressOREmail.trim()))
    ) {
      showValidatonAlert(I18n.t('VALID_ALERT'))
      return
    }
    if (isCrypto) {
      coin.data[APIKeys.ADDRESS] = curencyAddressOREmail.trim()
      if (isAddEmail) {
        coin.data[APIKeys.EMAIL] = email.trim()
      }
    } else {
      coin.data[APIKeys.EMAIL] = curencyAddressOREmail.trim()
    }

    this.props.addContact(coin, () => {
      // showing success modal
      this.setState({ contactAdded: true })
    })
  }
  /**
   * On QR Code scan sucess
   * @param {*} e - event
   */
  onSuccess = (e) => {
    if (e.data.length !== 0) {
      if (
        e.data.includes(DefaultStrings.BITCOIN_COLON) ||
        e.data.includes(DefaultStrings.ETHERIUM_COLON) ||
        e.data.includes(DefaultStrings.DASH_COLON)
      ) {
        let arr = e.data.split(':')
        if (arr.length === 2) {
          this.setState({ scanQRCode: false, curencyAddressOREmail: arr[1] })
        } else {
          showValidatonAlert(I18n.t('INVALID_QR_CODE'))
        }
      }
    }
  }

  onClickConfirmQRCode = () => {
    this.setState({ scanQRCode: false })
  }
}

AddNewContactScreen.propTypes = {
  addContact: PropTypes.func,
  navigation: PropTypes.object,
}

export const mapStateToProps = (state) => ({})

export const mapDispatchToProps = (dispatch) => ({
  addContact: (coin, successFn) => dispatch(UserActions.addContact(coin, successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewContactScreen)
