import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  findNodeHandle,
} from 'react-native'
import styles from './CryptoAmountViewScreenStyle'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Search from 'App/Assets/Images/Svg/Search'
import {
  getCurrencyColor,
  showValidatonAlert,
  getAcronymForName,
} from 'App/Components/Utils/Functions'
import { currencyFormat } from 'App/Components/Utils/CurrencyDefinder'
import DashboardTitle from 'App/Components/DashboardTitle/DashboardTitle'
import { Colors } from 'App/Theme'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import QRCodeWhite from 'App/Assets/Images/Svg/QRCodeWhite'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Button from 'App/Components/Button/Button'
import ProgressCircle from 'react-native-progress-circle'
import UserActions from 'App/Stores/User/Actions'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import ForwardArrow from 'App/Assets/Images/Svg/ForwardArrow'
import { Switch } from 'App/Components/Switch/Switch'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ErrorModal from 'App/Components/Modal/ErrorModal/ErrorModal'
import I18n from 'App/Localization/I18n'
import LightningModal from 'App/Components/Modal/LightningModal/LightningModal'
import SvgIcon from 'App/Components/SvgIcon/SvgIcon'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import CurrencyType from 'App/Constants/CurrencyType'
import LimitModel from 'App/Components/Limits/LimitModel'
import MyKeyboard from 'App/Components/CustomKeyboard/CustomKeyboard'

/**
 *  user can see their Crypto currency wallet list here
 */

export class CryptoAmountViewScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currencyName: props.navigation.state.params.currencyName,
      wallet: props.navigation.state.params.wallet,
      addressSelected: !props.navigation.state.params.contact,
      address: '',
      searchContact: '',
      scanQRCode: false,
      usedLimit: 0.0,
      amountInUSD: '',
      switchValueForLightning: false,
      switchValueForinstaSend: false,
      switchValueForContact: false,
      searchText: '',
      filteredList: [],
      contactAdded: props.navigation.state.params.contact,
      contact: props.navigation.state.params.contact,
      showAlert: false,
      sendlimitModal: false,
      viewRef: null,
      totalLimit: '',
      availabeLimit: '',
      amount: 0.0,
      cryptoAmount: 0.0,
      defaultCurrency: props.profile.default_currency,
      currencyValue:
        props.profile.default_currency === CurrencyType.USD ? props.usdValue : props.euroValue,
      apiRequestFailure: false,
      apiErrMessage: '',
    }
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    this.props.getBalanceAndLimit(this.state.currencyName, this.handleApiFailure)
    this.setState({ viewRef: findNodeHandle(this.scrollView) })
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    const { transactionLimit } = this.props
    if (prevProps.transactionLimit !== transactionLimit) {
      this.calculateUserLimitPercentage(transactionLimit)
    }
  }

  render() {
    // access current state
    const {
      currencyName,
      addressSelected,
      address,
      scanQRCode,
      usedLimit,
      switchValueForLightning,
      switchValueForinstaSend,
      switchValueForContact,
      wallet,
      contactAdded,
      contact,
      showAlert,
      sendlimitModal,
      totalLimit,
      availabeLimit,
      amount,
      cryptoAmount,
      defaultCurrency,
      currencyValue,
      apiRequestFailure,
      apiErrMessage,
    } = this.state

    // access current state
    return (
      <ScrollView
        style={styles.container}
        ref={(view) => {
          this.scrollView = view
        }}
      >
        <DashboardTitle
          testID={'titleView'}
          title={I18n.t('SEND_SMALL')}
          currency={currencyName}
          subTitle={I18n.t('TO').toLowerCase()}
          typeView={true}
          addressSelected={addressSelected}
          contactSelected={!addressSelected}
          onAddressPress={this.onAddressPress.bind(this, true)}
          onContactPress={this.onAddressPress.bind(this, false)}
        />
        <View style={styles.addressContainer}>
          {addressSelected ? (
            <View
              style={[styles.addressViewStyle, { backgroundColor: getCurrencyColor(currencyName) }]}
            >
              <TextInput
                style={styles.addressInputStyle}
                placeholderTextColor={Colors.suvaGrey}
                value={address}
                placeholder={I18n.t('ADDRESS_PLACEHOLDER')}
                onChangeText={this.onChangeAddress}
              />
              <TouchableOpacity style={styles.qrCodeContainer} onPress={this.onClickScanQRCode}>
                <QRCodeWhite width={styles.qrCodeStyle.width} height={styles.qrCodeStyle.height} />
                <Text style={styles.scanTextStyle}>{I18n.t('SCAN')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[styles.contactContainer, { backgroundColor: getCurrencyColor(currencyName) }]}
            >
              {!contactAdded ? (
                <View style={styles.contactViewStyle}>
                  <TouchableOpacity
                    width={styles.searchIconStyle.width}
                    height={styles.searchIconStyle.height}
                    style={styles.searchIconStyle}
                  >
                    <Search />
                  </TouchableOpacity>
                  <Text onPress={this.navigateToContactList} style={styles.contactInputStyle}>
                    {I18n.t('SEARCH')}
                  </Text>
                </View>
              ) : (
                <View style={styles.contactViewStyle}>
                  <View style={styles.profileContainer}>
                    <View style={styles.circleStyle}>
                      <Text style={styles.acronymTextStyle}>
                        {getAcronymForName(contact.description)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTextStyle}>{contact.description}</Text>
                    <Text style={styles.addressTextStyle} numberOfLines={1}>
                      {contact.address}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.closeContainer} onPress={this.removeContact}>
                    <SvgIcon
                      width={styles.closeView.width}
                      height={styles.closeView.height}
                      xml={CommonIcons.closeIcon}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
        {/* use lightning network */}
        {addressSelected && (
          <View style={[styles.centerStyle, styles.amountContainerMargin, styles.lightningStyle]}>
            <Text style={styles.lightningTextStyle}>{I18n.t('SAVE_ADDRESS_AS_CONTACT')}</Text>
            <Switch
              value={switchValueForContact}
              onValueChange={this.toggleSwitchForContact}
              activeText={I18n.t('YES')}
              inActiveText={I18n.t('NO')}
              circleSize={styles.switchStyle.width}
              barHeight={styles.switchStyle.height}
              circleBorderWidth={0}
              backgroundActive={Colors.mediumTurquoise}
              backgroundInactive={Colors.lightGrey}
              circleActiveColor={Colors.white}
              circleInActiveColor={Colors.white}
              changeValueImmediately={true}
              renderActiveText={switchValueForContact}
              renderInActiveText={!switchValueForContact}
              switchLeftPx={styles.switchStyle.margin}
              switchRightPx={styles.switchStyle.margin}
              switchWidthMultiplier={styles.switchStyle.margin}
            />
          </View>
        )}
        {!addressSelected && contactAdded && currencyName === DefaultStrings.TYPE_BTC && (
          <View style={[styles.centerStyle, styles.amountContainerMargin, styles.lightningStyle]}>
            <Text style={styles.lightningTextStyle}>{I18n.t('USE_LIGHTING_NETWORK')}</Text>
            <Switch
              value={switchValueForLightning}
              onValueChange={this.toggleSwitchForLightining}
              activeText={I18n.t('YES')}
              inActiveText={I18n.t('NO')}
              circleSize={styles.switchStyle.width}
              barHeight={styles.switchStyle.height}
              circleBorderWidth={0}
              backgroundActive={Colors.mediumTurquoise}
              backgroundInactive={Colors.lightGrey}
              circleActiveColor={Colors.white}
              circleInActiveColor={Colors.white}
              changeValueImmediately={true}
              renderActiveText={switchValueForLightning}
              renderInActiveText={!switchValueForLightning}
              switchLeftPx={styles.switchStyle.margin}
              switchRightPx={styles.switchStyle.margin}
              switchWidthMultiplier={styles.switchStyle.margin}
            />
          </View>
        )}
        {!addressSelected && contactAdded && currencyName === DefaultStrings.TYPE_DASH && (
          <View style={[styles.centerStyle, styles.amountContainerMargin, styles.lightningStyle]}>
            <Text style={styles.lightningTextStyle}>{I18n.t('INSTANT_SEND')}</Text>
            <Switch
              value={switchValueForinstaSend}
              onValueChange={this.toggleSwitchForInstaSend}
              activeText={I18n.t('YES')}
              inActiveText={I18n.t('NO')}
              circleSize={styles.switchStyle.width}
              barHeight={styles.switchStyle.height}
              circleBorderWidth={0}
              backgroundActive={Colors.mediumTurquoise}
              backgroundInactive={Colors.lightGrey}
              circleActiveColor={Colors.white}
              circleInActiveColor={Colors.white}
              changeValueImmediately={true}
              renderActiveText={switchValueForinstaSend}
              renderInActiveText={!switchValueForinstaSend}
              switchLeftPx={styles.switchStyle.margin}
              switchRightPx={styles.switchStyle.margin}
              switchWidthMultiplier={styles.switchStyle.margin}
            />
          </View>
        )}
        {/* amount view to show amount */}
        <View style={[styles.centerStyle, styles.amountContainerMargin]}>
          <MyKeyboard
            amount={amount || ''}
            cryptoAmount={cryptoAmount || ''}
            usdValue={currencyValue}
            currency={currencyName}
            defaultCurrency={defaultCurrency}
            multipleInput={true}
            balance={wallet.balance}
            onAmountUpdate={(amount, cryptoAmount) => {
              this.updateAmount(amount, cryptoAmount)
            }}
            onPressBackward={this.onPressBackward}
          />

          {/* send everthing view */}
          <View style={styles.containerView}>
            <TouchableWithoutFeedback style={styles.rowStyle} onPress={this.onPressSendLimit}>
              <Text style={styles.smallTextStyle}>{I18n.t('USED_LIMIT')}</Text>
              <View style={styles.progressViewStyle}>
                <ProgressCircle
                  percent={parseFloat(usedLimit)}
                  radius={styles.progressStyle.width}
                  borderWidth={styles.progressStyle.borderWidth}
                  color={getCurrencyColor(currencyName)}
                  shadowColor={styles.progressStyle.shadowColor}
                  bgColor={styles.progressStyle.color}
                >
                  <Text style={styles.percentTextStyle}>{parseInt(usedLimit)}%</Text>
                </ProgressCircle>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={[
                styles.centerStyle,
                styles.borderSendStyle,
                { borderColor: getCurrencyColor(currencyName) },
              ]}
            >
              <Text
                testID="send"
                style={[
                  styles.smallTextStyle,
                  styles.sendTextStyle,
                  {
                    color: getCurrencyColor(currencyName),
                  },
                ]}
                onPress={this.sendEverything}
              >
                {I18n.t('SEND_EVERYTHING')}
              </Text>
            </View>
          </View>
        </View>
        {/* rate for this transaction */}
        <View style={[styles.centerStyle, styles.amountContainerMargin]}>
          <Text style={styles.lightningTextStyle}>{I18n.t('RATE_FOR_THIS_TRANSACTION')}</Text>
          <Text style={[styles.lightningTextStyle, { color: getCurrencyColor(currencyName) }]}>
            1 {currencyName} = {currencyFormat(currencyValue[currencyName].base, defaultCurrency)}
          </Text>
        </View>
        {/* Forward and backward view */}
        <View style={styles.arrowContainer}>
          <View style={[styles.rowStyle, styles.arrowContainerStyle]}>
            <TouchableOpacity onPress={this.onPressBackward} testID="forwardArrow">
              <BackArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressForward} testID="backwardArrow">
              <ForwardArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
            </TouchableOpacity>
          </View>
        </View>
        {/* QR code scaneer */}
        <Modal animationType="slide" transparent={false} visible={scanQRCode}>
          <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            bottomContent={
              <Button
                testID={'QRCodeSuccess'}
                text={I18n.t('DONE')}
                withShadow={true}
                withBg={true}
                onClick={this.onClickConfirmQRCode}
              />
            }
          />
        </Modal>
        {/* Error Message Modal */}
        <ErrorModal
          isShow={showAlert}
          onCLickClose={this.onErrorMessageClose}
          onClickSubmit={this.onErrorModalSubmit}
          submitButtonTitle={I18n.t('OK')}
          errorMessage={I18n.t('PLEASE_ENTER_ADDRESS')}
        />
        <LimitModel
          isShow={sendlimitModal}
          onClickClose={this.onClickClose}
          usedLimit={usedLimit}
          currencyName={currencyName}
          totalLimit={totalLimit}
          defaultCurrency={defaultCurrency}
          availabeLimit={availabeLimit}
          viewRef={this.state.viewRef}
          limitText={I18n.t('YOUR_SEND_LIMITS')}
        />
        <LightningModal
          isShow={switchValueForLightning}
          onCLickClose={this.toggleSwitchForLightining.bind(this, false)}
        />
        {/* api request failure modal */}
        <ErrorModal
          isShow={apiRequestFailure}
          isHideClose={false}
          onCLickClose={this.onPressBackward}
          onClickSubmit={this.retryApiRequest}
          submitButtonTitle={I18n.t('RETRY')}
          errorMessage={apiErrMessage || I18n.t('NETWORK_ERROR')}
        />
      </ScrollView>
    )
  }

  /**
   * handle api failure
   * @param {String} error api error message
   */
  handleApiFailure = (error) => {
    this.setState({ apiErrMessage: error, apiRequestFailure: true })
  }

  /**
   * retry api request
   */
  retryApiRequest = () => {
    this.setState({ apiRequestFailure: false })
    this.props.getBalanceAndLimit(this.state.currencyName, this.handleApiFailure)
  }

  /**
   * update amount state change
   * @param {String} fiatAmount user entered fiat amount
   * @param {String} cryptoAmount user entered fiat amount
   */
  updateAmount = (amount, cryptoAmount) => {
    this.setState({ amount: amount, cryptoAmount: cryptoAmount })
  }

  /**
   * open send limit modal
   */
  onPressSendLimit = () => {
    this.setState({ sendlimitModal: true })
  }

  /**
   * close send limit modal
   */
  onClickClose = () => {
    this.setState({ sendlimitModal: false })
  }

  /**
   * send available ballance in your wallet
   */
  sendEverything = () => {
    const { commissions } = this.props
    const { addressSelected, address, contactAdded, currencyName, wallet } = this.state
    if (addressSelected) {
      if (address.length === 0) {
        showValidatonAlert(I18n.t('PLEASE_SELECT_VALID_ADDRESS'))
        return
      }
    } else {
      if (!contactAdded) {
        showValidatonAlert(I18n.t('PLEASE_SELECT_VALID_CONTACT'))
        return
      }
    }
    let availableBalance = addressSelected
      ? wallet.balance - this.getCommissionBasedOnCurrency(currencyName, commissions)
      : wallet.balance
    if (availableBalance > 0) {
      this.setState({
        amount: this.calculateFiatValue(availableBalance, currencyName),
        cryptoAmount: availableBalance,
      })
    } else {
      showValidatonAlert(I18n.t('NO_BALANCE'))
    }
  }

  /**
   * calculate fiat value based on crypto value
   * @param {Number} amount user entered amount
   * @param {String} currency user default currency
   * @returns converted amount
   */
  calculateFiatValue = (amount, currency) => {
    return amount * this.state.currencyValue[currency].base
  }

  /**
   * calculate available limit
   */
  getAvailableLimit = () => {
    const { transactionLimit } = this.props
    const { addressSelected, defaultCurrency } = this.state
    if (addressSelected) {
      return transactionLimit[defaultCurrency].transfer_internal.available
    } else {
      return transactionLimit[defaultCurrency].transfer_external.available
    }
  }

  /**
   * set scan qr code to false
   */
  onClickConfirmQRCode = () => {
    this.setState({ scanQRCode: false })
  }

  /**
   * navigate to contact list
   */
  navigateSendAmountEnter = () => {
    Navigator.navigate(NavKeys.SEND_ENTER_AMOUNT_DETAIL, {
      currency: this.state.currencyName,
    })
  }

  /**
   * remove selected contact
   */
  removeContact = () => {
    this.setState({ contactAdded: false, contact: {} })
  }

  /**
   * navigate to contact list
   */
  navigateToContactList = () => {
    Navigator.navigate(NavKeys.CONTACT_LIST, {
      currency: this.state.currencyName,
      addContact: this.addContact,
    })
  }

  /**
   * change state based on selected contact
   * @param {Object} Contact refers selected contact
   */
  addContact = (contact) => {
    if (contact != null) {
      this.setState({ contactAdded: true, contact })
    }
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {object} transactionLimit - refers limit available in your wallet.
   * Here we calculate used linit percentage based on limit available in your weekly limit
   */
  calculateUserLimitPercentage(transactionLimit) {
    const { addressSelected, defaultCurrency, currencyName } = this.state
    if (addressSelected) {
      let total = transactionLimit[defaultCurrency].transfer_external.detail[currencyName].total
      let balance =
        transactionLimit[defaultCurrency].transfer_external.detail[currencyName].available
      let used = total - balance
      let usedLimit = (used / total) * 100
      this.setState({ usedLimit, totalLimit: total, availabeLimit: balance })
    } else {
      let total = transactionLimit[defaultCurrency].transfer_internal.total
      let balance = transactionLimit[defaultCurrency].transfer_internal.available
      let used = total - balance
      let usedLimit = (used / total) * 100
      this.setState({ usedLimit, totalLimit: total, availabeLimit: balance })
    }
  }

  /**
   * get correct commission amount based on currency
   * @param {Object} commissions - refers commissions for all currencies
   * @param {String} currency - refers currencies of the user selected
   */
  getCommissionBasedOnCurrency(currency, commissions) {
    switch (currency) {
      case DefaultStrings.TYPE_BTC: {
        return commissions.crypto_out_btc
      }
      case DefaultStrings.TYPE_ETH: {
        return commissions.crypto_out_eth
      }
      case DefaultStrings.TYPE_DASH: {
        return commissions.crypto_out_dash
      }
    }
  }

  /**
   * change state based on address or contact selected
   * @param {String} address is updated address to set state
   */
  onChangeAddress = (address) => {
    this.setState({ address })
  }

  /**
   * change search input state based input text change
   * @param {String} contact is updated address to set state
   */
  onSearch = (contact) => {
    this.setState({ searchContact: contact })
  }

  /**
   * change state based on address or contact selected
   *  @param {String} boolean is booleam whether address or contact selected
   */
  onAddressPress = (boolean) => {
    this.setState({ addressSelected: boolean }, () => {
      this.calculateUserLimitPercentage(this.props.transactionLimit)
    })
  }

  /**
   * change toggle switch value for contact
   * @param {Object} value - refers param to set switch value for lightning
   */
  toggleSwitchForContact = (value) => {
    this.setState({ switchValueForContact: value })

    if (this.state.address.trim().length === 0) {
      this.setState({ showAlert: true })
      return
    }
    if (value) {
      const { address, currencyName } = this.state
      Navigator.navigate(NavKeys.ADD_NEW_CONTACT, {
        address: address,
        currency: currencyName,
      })
    }
  }

  /**
   * Error Message Close action
   */
  onErrorMessageClose = () => {
    this.setState({ showAlert: false, switchValueForContact: false })
  }

  /**
   * Error message sucess button action
   */
  onErrorModalSubmit = () => {
    this.onErrorMessageClose()
  }

  /**
   * change toggle switch value ligntning
   * @param {Object} value - refers param to set switch value for contact
   */
  toggleSwitchForLightining = (value) => {
    this.setState({ switchValueForLightning: value })
  }

  /**
   * change toggle switch value instasend
   * @param {Object} value - refers param to set switch value for contact
   */
  toggleSwitchForInstaSend = (value) => {
    this.setState({ switchValueForinstaSend: value })
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
          this.setState({ scanQRCode: false, address: arr[1] })
        } else {
          showValidatonAlert(I18n.t('INVALID_QR_CODE'))
        }
      }
    }
  }

  /**
   *on click scan qrcode
   */
  onClickScanQRCode = () => {
    this.setState({ scanQRCode: true })
  }

  /**
   * Navigate to previus screen
   */
  onPressBackward = () => {
    Navigator.goBack()
  }

  /**
   * Navigate to keyboard screen
   */
  openKeyboard = () => {
    const {
      addressSelected,
      address,
      contact,
      currencyName,
      wallet,
      amount,
      cryptoAmount,
      contactAdded,
    } = this.state
    if (addressSelected) {
      if (address.length === 0) {
        showValidatonAlert(I18n.t('PLEASE_SELECT_VALID_ADDRESS'))
        return
      }
    } else {
      if (!contactAdded) {
        showValidatonAlert(I18n.t('PLEASE_SELECT_VALID_CONTACT'))
        return
      }
    }
    Navigator.navigate(NavKeys.CRYPTO_AMOUNT_ENTER, {
      currency: currencyName,
      addressSelected: addressSelected,
      address: address,
      contact: contact,
      wallet: wallet,
      amount: amount,
      cryptoAmount: cryptoAmount,
    })
  }

  /**
   * Navigate to previus screen
   */
  onPressForward = () => {
    const { transactionLimit } = this.props
    const {
      addressSelected,
      address,
      contact,
      currencyName,
      wallet,
      contactAdded,
      amount,
      cryptoAmount,
      switchValueForinstaSend,
    } = this.state
    let availabeLimit = transactionLimit ? this.getAvailableLimit() : 0
    if (addressSelected) {
      if (address.length === 0) {
        showValidatonAlert(I18n.t('PLEASE_SELECT_VALID_ADDRESS'))
        return
      }
    } else {
      if (!contactAdded) {
        showValidatonAlert(I18n.t('PLEASE_SELECT_VALID_CONTACT'))
        return
      }
    }
    // amount should be greater than availabe balance
    if (amount <= availabeLimit) {
      this.props.setSelectedBank({
        id_account: addressSelected ? address : contact.id,
        to: addressSelected ? address : contact.description,
        type: addressSelected ? DefaultStrings.TYPE_BANK_ACCOUNT : DefaultStrings.TYPE_CONTACT,
        currency: currencyName,
        wallet: wallet,
        instantSend: switchValueForinstaSend,
        addressSelected: addressSelected,
      })
      Navigator.navigate(NavKeys.SEND_AMOUNT_DETAIL, {
        amount: parseFloat(amount.toString().replace(/,/g, '')),
        cryptoAmount: parseFloat(cryptoAmount.toString().replace(/,/g, '')),
      })
    } else {
      showValidatonAlert(I18n.t('AMOUNT_LESS_THAN_BALANCE'))
    }
  }
}
CryptoAmountViewScreen.propTypes = {
  isLoading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  balance: PropTypes.object,
  usdValue: PropTypes.object,
  euroValue: PropTypes.object,
  getBalanceAndLimit: PropTypes.func,
  transactionLimit: PropTypes.object,
  setSelectedBank: PropTypes.func,
  commissions: PropTypes.object,
  profile: PropTypes.object,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  isLoading: state.common.isLoading,
  balance: state.wallet.getWalletBalance,
  usdValue: state.user.currentCurrency,
  transactionLimit: state.user.transactionLimit,
  commissions: state.user.commissions,
  profile: state.user.onBoardingProfile,
  euroValue: state.user.euroCurrencyValue,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getBalanceAndLimit: (currency, failureFn) =>
    dispatch(UserActions.getBalanceAndTransactionLimit(currency, failureFn)),
  setSelectedBank: (bankData) => dispatch(UserActions.setSelectedBank(bankData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CryptoAmountViewScreen)
