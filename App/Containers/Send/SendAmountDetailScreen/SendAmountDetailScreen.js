import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import ForwardArrow from 'App/Assets/Images/Svg/ForwardArrow'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Navigator from 'App/Services/NavigationService'
import styles from './SendAmountDetailScreenStyle'
import Line from 'App/Components/Line/Line'
import UserActions from 'App/Stores/User/Actions'
import NavKeys from 'App/Constants/NavKeys'
import {
  getCurrencyColor,
  getImage,
  getWalletName,
  getAcronymForName,
} from 'App/Components/Utils/Functions'
import { currencyFormat, cryptocurrencyFormat } from 'App/Components/Utils/CurrencyDefinder'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'
import ErrorModal from 'App/Components/Modal/ErrorModal/ErrorModal'

/**
 * send amount details screen where user see the fee of their transfer
 */
export class SendAmountDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transfer: props.navigation.state.params.cryptoAmount,
      equalUSDAmount: props.navigation.state.params.amount,
      fee: 0.0,
      paid: 0.0,
      hash: '',
      cryptoUSD: 0.0,
      rate: 0.0,
      isNeeded: false,
      defaultCurrency: props.profile.default_currency,
      comment: '',
      isCrypto:
        props.selectedBank.currency === CurrencyType.BITCOIN ||
        props.selectedBank.currency === CurrencyType.DASH ||
        props.selectedBank.currency === CurrencyType.ETH,
      feeApiFailure: false,
      processApiFailure: false,
      apiErrMessage: '',
    }
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    this.getFeeCalculation()
  }

  render() {
    const {
      transfer,
      paid,
      fee,
      equalUSDAmount,
      cryptoUSD,
      rate,
      defaultCurrency,
      isNeeded,
      comment,
      isCrypto,
      feeApiFailure,
      processApiFailure,
      apiErrMessage,
    } = this.state
    const { selectedBank } = this.props

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          style={styles.container}
          enabled
          keyboardVerticalOffset={180}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps={'handled'}
          >
            <View style={[styles.detailContainer, styles.margin]}>
              <View style={styles.detailTransferContainer}>
                <View style={styles.detailTextContainer}>
                  <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                    {I18n.t('YOU_TRANSFER')}
                  </Text>
                  {/* from amount */}
                  <View>
                    {selectedBank.currency === CurrencyType.USD ||
                    selectedBank.currency === CurrencyType.EURO_NAME ||
                    selectedBank.currency === CurrencyType.EURO ? (
                      <Text
                        style={[
                          styles.detailTextStyle,
                          styles.titleTextStyle,
                          styles.textLeftAlign,
                        ]}
                      >
                        {currencyFormat(equalUSDAmount, selectedBank.currency)}{' '}
                        {selectedBank.currency}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.detailTextStyle,
                          styles.titleTextStyle,
                          styles.textLeftAlign,
                        ]}
                      >
                        {cryptocurrencyFormat(transfer)} {selectedBank.currency}
                      </Text>
                    )}
                    {/* fiat amount for crypto currencies */}
                    {(selectedBank.currency === CurrencyType.BITCOIN ||
                      selectedBank.currency === CurrencyType.ETH ||
                      selectedBank.currency === CurrencyType.DASH) && (
                      <Text style={[styles.detailTextStyle, styles.textLeftAlign]}>
                        {currencyFormat(cryptoUSD, defaultCurrency)}
                        {defaultCurrency}
                      </Text>
                    )}
                  </View>
                </View>
                {/* fee amount */}
                <View style={styles.detailTextContainer}>
                  <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                    {I18n.t('FEE')}
                  </Text>
                  <Text
                    style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}
                  >
                    {selectedBank.currency === CurrencyType.USD ||
                    selectedBank.currency === CurrencyType.EURO_NAME ||
                    selectedBank.currency === CurrencyType.EURO
                      ? currencyFormat(fee, selectedBank.currency)
                      : cryptocurrencyFormat(fee)}{' '}
                    {selectedBank.currency}
                  </Text>
                </View>
              </View>
              <Line styleProp={styles.lineStyle} />
              <View style={styles.detailGetContainer}>
                <View style={styles.detailTextContainer}>
                  <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                    {selectedBank.type === DefaultStrings.TYPE_BANK_ACCOUNT
                      ? I18n.t('YOU_GET')
                      : I18n.t('RECEIPENT_GETS')}
                  </Text>
                  <Text
                    style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}
                  >
                    {selectedBank.currency === CurrencyType.USD ||
                    selectedBank.currency === CurrencyType.EURO_NAME ||
                    selectedBank.currency === CurrencyType.EURO
                      ? currencyFormat(paid.toFixed(2), selectedBank.currency)
                      : cryptocurrencyFormat(paid)}{' '}
                    {selectedBank.currency}
                  </Text>
                </View>
              </View>
            </View>
            {/* from to view */}
            <View style={[styles.fromToContainer, styles.margin]}>
              <View style={styles.fromToHeaderContainer}>
                <Text style={styles.fromToTextStyle}>{I18n.t('TO')}</Text>
                <View style={styles.textLogoContainer}>
                  {selectedBank.type === DefaultStrings.TYPE_CONTACT ? (
                    <View style={styles.circleStyle}>
                      <Text style={styles.acronymTextStyle}>
                        {getAcronymForName(selectedBank.to)}
                      </Text>
                    </View>
                  ) : null}
                  <Text style={styles.fromToAddressTextStyle}>{selectedBank.to}</Text>
                </View>
              </View>
              <View style={[styles.fromToHeaderContainer, styles.amountContainerMargin]}>
                <Text style={styles.fromToTextStyle}>{I18n.t('FROM_FUND')}</Text>
                <View style={styles.textLogoContainer}>
                  {getImage(selectedBank.currency)}
                  <Text style={[styles.fromToAddressTextStyle, styles.leftMargin]}>
                    {selectedBank.currency === DefaultStrings.TYPE_USD ||
                    selectedBank.currency === CurrencyType.EURO ||
                    selectedBank.currency === CurrencyType.EURO_NAME
                      ? getWalletName(selectedBank.currency)
                      : selectedBank.wallet.alias}
                  </Text>
                </View>
              </View>
            </View>
            {(selectedBank.type === DefaultStrings.TYPE_CONTACT || isCrypto) && !isNeeded && (
              <View style={styles.descriptionContainer}>
                <TextInput
                  value={comment}
                  returnKeyType="done"
                  multiline
                  blurOnSubmit={true}
                  style={styles.descriptionTextStyle}
                  onChangeText={this.onChangeComment}
                  placeholder={I18n.t('REASON_FOR_TRANSACTION')}
                />
              </View>
            )}
            {/* rate for this transaction */}
            {isCrypto && (
              <View style={[styles.centerStyle, styles.amountContainerMargin]}>
                <Text style={styles.lightningTextStyle}>{I18n.t('RATE_FOR_THIS_TRANSACTION')}</Text>
                <Text
                  style={[
                    styles.lightningTextStyle,
                    { color: getCurrencyColor(selectedBank.currency) },
                  ]}
                >
                  1 {selectedBank.currency} = {currencyFormat(rate.toFixed(2), defaultCurrency)}
                </Text>
              </View>
            )}
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
            <ErrorModal
              isShow={feeApiFailure || processApiFailure}
              isHideClose={false}
              onCLickClose={this.goBack}
              onClickSubmit={this.retryApiRequest}
              submitButtonTitle={I18n.t('RETRY')}
              errorMessage={apiErrMessage || I18n.t('NETWORK_ERROR')}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  /**
   * retry api request
   */
  retryApiRequest = () => {
    this.setState({ feeApiFailure: false, processApiFailure: false })
    this.state.feeApiFailure ? this.getFeeCalculation() : this.onPressForward()
  }

  /**
   * back to previous screen
   */
  goBack = () => {
    Navigator.goBack()
  }

  /**
   * api request
   */
  getFeeCalculation = () => {
    const { selectedBank, usdWalletId, euroWalletId } = this.props
    const { transfer, equalUSDAmount } = this.state
    const walletID = selectedBank.currency === DefaultStrings.TYPE_USD ? usdWalletId : euroWalletId
    switch (selectedBank.currency) {
      case DefaultStrings.TYPE_USD:
      case CurrencyType.EURO:
      case CurrencyType.EURO_NAME:
        if (selectedBank.type === DefaultStrings.TYPE_CONTACT) {
          this.props.contactTransferTransactionProgress(
            {
              amount: parseFloat(equalUSDAmount).toFixed(2),
              toId: selectedBank.id_account,
              fromWallet: walletID,
            },
            this.contactFeeData,
            this.feeCalculationApiFailure
          )
        } else {
          this.props.transferTransactionProgress(
            {
              amount: parseFloat(equalUSDAmount),
              bankAccount: selectedBank.id_account,
              fiatWallet: walletID,
            },
            this.contactFeeData,
            this.feeCalculationApiFailure
          )
        }
        break
      default:
        if (this.props.selectedBank.addressSelected) {
          this.props.transferCryptoProgress(
            selectedBank.currency,
            {
              amount: transfer.toFixed(8),
              fromId: selectedBank.wallet.uuid,
              fast: false,
              address: selectedBank.id_account,
            },
            this.feeCrypto,
            this.feeCalculationApiFailure
          )
        } else {
          this.props.transferCryptoProgress(
            selectedBank.currency,
            {
              amount: transfer.toFixed(8),
              fromId: selectedBank.wallet.uuid,
              toFavoriteId: selectedBank.id_account,
              fast: selectedBank.instantSend,
            },
            this.feeCrypto,
            this.feeCalculationApiFailure
          )
        }
    }
  }

  /**
   * get fee calculation api failure
   * @param {String} error  error text
   */
  feeCalculationApiFailure = (error) => {
    this.setState({ apiErrMessage: error, feeApiFailure: true })
  }

  /**
   * on change comment text
   * @param {String} text  comment text
   */
  onChangeComment = (text) => {
    this.setState({ comment: text })
  }

  /**
   * calculated fee data from API
   * @param {*} data API fee datas
   */
  contactFeeData = (data) => {
    const total = data.total ? data.total : data.totalReceive ? data.totalReceive : 0.0
    this.setState({
      fee: data.fee === undefined ? 0.0 : data.fee,
      paid: total,
      hash: data.hash,
      isNeeded: data.support,
    })
  }

  /**
   * calculated fee data from API
   * @param {*} data API fee datas
   */
  feeCrypto = (data) => {
    this.setState({
      fee: data.fee === undefined ? 0.0 : data.fee,
      transfer: data.amountCrypto === undefined ? 0.0 : parseFloat(data.amountCrypto),
      cryptoUSD: data.amountFiat === undefined ? 0.0 : data.amountFiat,
      paid: data.totalCrypto === undefined ? 0.0 : data.totalCrypto,
      rate: data.rate === undefined ? 0.0 : parseFloat(data.rate),
      hash: data.hash,
    })
  }

  /**
   * After amount entered to move forwrd to authentication process
   * Navigate to next screen based on type of process
   */
  onPressForward = () => {
    const { transfer, fee, paid, equalUSDAmount, hash, isNeeded, rate, cryptoUSD } = this.state
    const { selectedBank } = this.props

    if (
      selectedBank.currency === DefaultStrings.TYPE_USD ||
      selectedBank.currency === DefaultStrings.TYPE_EURO ||
      selectedBank.currency === DefaultStrings.VALUE_EURO
    ) {
      this.props.setTransfer({
        type: selectedBank.type,
        currency: selectedBank.currency,
        transfer: parseFloat(equalUSDAmount),
        fee: fee,
        paid: paid,
        from: selectedBank.wallet ? selectedBank.wallet : getWalletName(selectedBank.currency),
        to: selectedBank.to,
        to_id_account: selectedBank.id_account,
        hash_key: hash,
        support: isNeeded,
        rate: rate,
        cryptoUSD: cryptoUSD,
      })
      if (this.props.selectedBank.type === DefaultStrings.TYPE_BANK_ACCOUNT) {
        this.processTransaction()
      } else {
        isNeeded ? Navigator.navigate(NavKeys.SEND_UPLOAD_DOCUMENT) : this.processTransaction()
      }
    } else {
      this.props.setTransfer({
        type: selectedBank.type,
        currency: selectedBank.currency,
        transfer: parseFloat(transfer),
        fee: fee,
        paid: paid,
        from: selectedBank.wallet ? selectedBank.wallet : getWalletName(selectedBank.currency),
        to: selectedBank.to,
        to_id_account: selectedBank.id_account,
        hash_key: hash,
        rate: rate,
        cryptoUSD: cryptoUSD,
      })
      this.processTransaction()
    }
  }

  // Proceed transaction and navigate to success page
  processTransaction = () => {
    const { selectedBank } = this.props
    const { hash, comment, isNeeded, isCrypto } = this.state
    const isCommentNeeded =
      (selectedBank.type === DefaultStrings.TYPE_CONTACT || isCrypto) && !isNeeded

    let reqData = isCommentNeeded ? { hash: hash, comment: comment } : { hash: hash }
    switch (selectedBank.currency) {
      case DefaultStrings.TYPE_USD:
      case CurrencyType.EURO:
      case CurrencyType.EURO_NAME:
        if (selectedBank.type === DefaultStrings.TYPE_CONTACT) {
          this.props.confirmContactTransfer(reqData, this.processApiFailure)
        } else {
          this.props.confirmBankTransfer(reqData, this.processApiFailure)
        }
        break
      default:
        this.props.confirmCryptoTransfer(reqData, this.processApiFailure)
    }
  }

  /**
   * process api failure
   * @param {String} error  error text
   */
  processApiFailure = (error) => {
    this.setState({ apiErrMessage: error, processApiFailure: true })
  }

  /**
   * Navigate to previous screen
   */
  onPressBackward = () => {
    Navigator.goBack()
  }
}

SendAmountDetailScreen.propTypes = {
  isLoading: PropTypes.bool,
  commissions: PropTypes.object,
  setTransfer: PropTypes.func,
  navigation: PropTypes.object,
  selectedBank: PropTypes.object,
  usdValue: PropTypes.object,
  transferDetails: PropTypes.object,
  usdWalletId: PropTypes.string,
  euroWalletId: PropTypes.string,
  transferTransactionProgress: PropTypes.func,
  contactTransferTransactionProgress: PropTypes.func,
  transferCryptoProgress: PropTypes.func,
  profile: PropTypes.object,
  confirmBankTransfer: PropTypes.func,
  confirmCryptoTransfer: PropTypes.func,
  confirmContactTransfer: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  commissions: state.user.commissions,
  isLoading: state.common.isLoading,
  selectedBank: state.user.selectedBank,
  usdValue: state.user.currentCurrency,
  transferDetails: state.user.transfer,
  usdWalletId: state.wallet.getWalletBalance.USD[0].uuid,
  euroWalletId: state.wallet.getWalletBalance.EUR[0].uuid,
  profile: state.user.onBoardingProfile,
})

export const mapDispatchToProps = (dispatch) => ({
  setTransfer: (transfer) => dispatch(UserActions.setTransfer(transfer)),
  transferTransactionProgress: (data, successFn, failureFn) =>
    dispatch(UserActions.transferTransactionProgress(data, successFn, failureFn)),
  transferCryptoProgress: (currency, data, successFn, failureFn) =>
    dispatch(UserActions.transferCryptoProgress(currency, data, successFn, failureFn)),
  contactTransferTransactionProgress: (data, successFn, failureFn) =>
    dispatch(UserActions.contactTransferTransactionProgress(data, successFn, failureFn)),
  confirmBankTransfer: (data, failureFn) =>
    dispatch(UserActions.confirmBankTransfer(data, failureFn)),
  confirmCryptoTransfer: (data, failureFn) =>
    dispatch(UserActions.confirmCryptoTransfer(data, failureFn)),
  confirmContactTransfer: (data, failureFn) =>
    dispatch(UserActions.confirmContactTransfer(data, failureFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendAmountDetailScreen)
