import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Keyboard, ScrollView, SafeAreaView } from 'react-native'
import styles from './BuySellEnterAmountStyle'
import handleConnectivityStatus from 'App/Services/NetworkService'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import DashboardTitle from 'App/Components/DashboardTitle/DashboardTitle'
import MyKeyboard from 'App/Components/CustomKeyboard/CustomKeyboard'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import ForwardArrow from 'App/Assets/Images/Svg/ForwardArrow'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import ProgressCircle from 'react-native-progress-circle'
import {
  getCurrencyColor,
  showValidatonAlert,
  showAlert,
  getFiatCurrencySymbol,
  getMinutes,
} from 'App/Components/Utils/Functions'
import {
  currencyFormat,
  currencyFormatWithoutSymbol,
  cryptocurrencyFormat,
} from 'App/Components/Utils/CurrencyDefinder'
import UserActions from 'App/Stores/User/Actions'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'
import LimitModel from 'App/Components/Limits/LimitModel'

/**
 *  Buy sell enter amount screen
 */

export class BuySellEnterAmount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      cryptoAmount: '',
      keyboardVisible: false,
      selectedType: props.navigation.state.params.selectedType,
      wallet: props.navigation.state.params.wallet,
      currency: props.navigation.state.params.currency,
      defaultCurrency: props.navigation.state.params.coin,
      usedLimit: '0',
      balance: '',
      showFeeView: false,
      currencyValue:
        props.navigation.state.params.coin === CurrencyType.USD ? props.usdValue : props.euroValue,
      limitBalance: '0',
      limitTotal: '0',
      limitModal: false,
      expireTime: '',
    }
  }

  intervalCounter // used for cancelling timeout.

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    this.calculateUserLimitPercentage(this.props.transactionLimit)
    this.getBalanceBasedOnCurrency(this.props.balanceForCoin)
    this.props.getCurrencyValues()
    this.props.getBalanceAndLimit(this.state.currency)
    this.props.getCommissions()
    this.props.setTransfer({})
  }

  componentWillMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  // callback for keyboard hide
  _keyboardDidHide = () => {
    const { amount, cryptoAmount } = this.state
    if (amount !== '' && !this.props.isLoading) this.onPressForward(amount, cryptoAmount)
  }

  /**
   * The state is initialized with the expire time
   * and counter is started.
   */
  startInterval = () => {
    this.setState({
      expireTime: Math.floor(
        (new Date(this.props.currencyExpirationDetails.expireTime * 1000) - new Date().getTime()) /
          1000
      ),
    })
    this.intervalCounter = setInterval(() => this.reduceTimer(), 1000)
  }

  /**
   * The counter is reduced here.
   * and for the final seconds counter is cleared and
   * new values for the rate are fetching here.
   */
  reduceTimer = () => {
    if (this.state.expireTime < 1) {
      clearInterval(this.intervalCounter)
      this.props.getCurrencyValues()
    }
    this.setState((prevState) => ({ expireTime: prevState.expireTime - 1 }))
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    const { transactionLimit, balanceForCoin, currencyExpirationDetails } = this.props
    if (prevProps.transactionLimit !== transactionLimit) {
      this.calculateUserLimitPercentage(transactionLimit)
      this.getBalanceBasedOnCurrency(balanceForCoin)
    }
    // starts the interval after the api for current exchange rate has been fetched.
    if (prevProps.currencyExpirationDetails !== currencyExpirationDetails) {
      this.startInterval()
      this.updateLatestCurrency()
    }
  }

  /**
   * New values for the crypto are careated based on the latest exchange rate values
   */
  updateLatestCurrency = () => {
    if (this.props.navigation.state.params.coin === CurrencyType.USD) {
      this.setState({ currencyValue: this.props.usdValue })
    } else {
      this.setState({ currencyValue: this.props.euroValue })
    }
    if (this.props.transferDetails.fee) {
      if (this.state.selectedType === DefaultStrings.BUY_SMALL) {
        this.onPressForward(this.state.amount, this.calculateCryptoValue(this.state.amount))
      } else {
        this.onPressForward(
          this.calculateUsdValue(this.state.cryptoAmount),
          this.state.cryptoAmount
        )
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalCounter)
    this.keyboardDidHideListener.remove()
  }

  render() {
    const {
      keyboardVisible,
      currency,
      usedLimit,
      wallet,
      selectedType,
      amount,
      cryptoAmount,
      defaultCurrency,
      currencyValue,
      limitModal,
      limitTotal,
      limitBalance,
    } = this.state
    const { transferDetails } = this.props

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header container */}
          <DashboardTitle
            title={I18n.t(selectedType.toUpperCase()) + ' '}
            currency={currency}
            subTitle={' ' + I18n.t('TO').toLowerCase()}
            name={wallet.alias}
          />
          {/* check condition whether to show a keyboard or not */}
          <View style={[styles.centerStyle, styles.amountContainerMargin]}>
            <MyKeyboard
              amount={amount || ''}
              cryptoAmount={cryptoAmount || ''}
              usdValue={currencyValue}
              currency={currency}
              defaultCurrency={defaultCurrency}
              multipleInput={true}
              balance={wallet.balance}
              onAmountUpdate={(amount, cryptoAmount) => {
                this.onAmountUpdate(amount, cryptoAmount)
              }}
            />
          </View>
          {!keyboardVisible && (
            <View style={[styles.container]}>
              <View style={styles.detailContainer}>
                {/* line view */}
                <View style={styles.horizontalLineStyle} />
                {/* fee rate container view */}
                <View style={styles.feeRateContainer}>
                  <View style={styles.feeRateStyle}>
                    <View style={styles.circleView} />
                    <Text style={styles.guarantyText}>{I18n.t('FEE_SMALL')}</Text>
                    <Text style={styles.rateCompareText}>
                      {transferDetails.fee
                        ? currencyFormat(transferDetails.fee, transferDetails.coin)
                        : currencyFormat(0.0, defaultCurrency)}{' '}
                      {transferDetails.coin}
                      <Text style={styles.rateCompareText}>
                        {transferDetails.fee
                          ? ' (' +
                            cryptocurrencyFormat(this.calculateCryptoValue(transferDetails.fee))
                          : '(' +
                            cryptocurrencyFormat(
                              this.calculateCryptoValue(cryptocurrencyFormat(0))
                            )}{' '}
                        {currency}
                        {') '}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.feeRateStyle}>
                    <View style={styles.circleView} />
                    <Text style={styles.guarantyText}>
                      {I18n.t('GURANTEED')} (
                      {this.state.expireTime > 0 && getMinutes(this.state.expireTime)})
                    </Text>
                    <Text style={styles.rateCompareText}>
                      1 {currency + ' =  '}
                      {transferDetails.rate
                        ? currencyFormat(transferDetails.rate, transferDetails.coin)
                        : currencyFormat(currencyValue[currency][selectedType], defaultCurrency)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.receivedAmountContainer}>
                <Text style={styles.getTextStyle}>{I18n.t('YOU_WILL_GET')}</Text>
                <View style={styles.receivedAmountView}>
                  <View
                    style={[
                      styles.inputTextStyle,
                      styles.amountInputText,
                      styles.receivedInputText,
                    ]}
                  >
                    <Text style={styles.dollerLogo}>{getFiatCurrencySymbol(defaultCurrency)}</Text>
                    <Text style={styles.amountInput} numberOfLines={1}>
                      {transferDetails.paid
                        ? currencyFormatWithoutSymbol(transferDetails.paid, defaultCurrency)
                        : parseFloat(0).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.centerStyle, styles.amountContainerMargin]}>
                {/* send everthing view */}
                <View style={styles.containerView}>
                  <TouchableOpacity style={styles.rowStyle} onPress={this.onPressLimit}>
                    <Text style={styles.smallTextStyle}>{I18n.t('USED_LIMIT')}</Text>
                    <View style={styles.progressViewStyle}>
                      <ProgressCircle
                        percent={parseInt(usedLimit)}
                        radius={styles.progressStyle.width}
                        borderWidth={styles.progressStyle.borderWidth}
                        color={getCurrencyColor(currency)}
                        shadowColor={styles.progressStyle.shadowColor}
                        bgColor={styles.progressStyle.color}
                      >
                        <Text style={styles.percentTextStyle}>{parseInt(usedLimit)}%</Text>
                      </ProgressCircle>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.centerStyle,
                      styles.borderSendStyle,
                      { borderColor: getCurrencyColor(currency) },
                    ]}
                  >
                    <Text
                      style={[
                        styles.smallTextStyle,
                        styles.sendTextStyle,
                        {
                          color: getCurrencyColor(currency),
                        },
                      ]}
                      onPress={this.sendEverything}
                    >
                      {I18n.t(selectedType.toUpperCase()) + ' ' + I18n.t('EVERYTHING')}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Forward and backward view */}
              <View style={styles.arrowContainer}>
                <View style={[styles.rowStyle, styles.arrowContainerStyle]}>
                  <TouchableOpacity onPress={this.onPressBackward} testID="forwardArrow">
                    <BackArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.navigateToAmountDetail} testID="backwardArrow">
                    <ForwardArrow
                      width={styles.arrowStyle.width}
                      height={styles.arrowStyle.height}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          <LimitModel
            isShow={limitModal}
            onClickClose={this.onClickClose}
            usedLimit={usedLimit}
            currencyName={currency}
            totalLimit={limitTotal}
            defaultCurrency={defaultCurrency}
            availabeLimit={limitBalance}
            viewRef={this.state.viewRef}
            limitText={I18n.t('YOUR_WEEKLY_LIMITS')}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   * update amount state change
   * @param {String} fiatAmount user entered fiat amount
   * @param {String} cryptoAmount user entered crypto amount
   */
  onAmountUpdate = (fiatAmount, cryptoAmount) => {
    this.setState({ amount: fiatAmount, cryptoAmount: cryptoAmount })
  }

  /**
   * open send limit modal
   */
  onPressLimit = () => {
    this.setState({ limitModal: true })
  }

  /**
   * close send limit modal
   */
  onClickClose = () => {
    this.setState({ limitModal: false })
  }

  /**
   * navigate to amount detail screen
   */
  navigateToAmountDetail = () => {
    this.props.transferDetails && this.props.transferDetails.rate
      ? Navigator.navigate(NavKeys.BUY_SELL_AMOUNT_DETAIL, { expireTime: this.state.expireTime })
      : showValidatonAlert(I18n.t('VALID_AMOUNT'))
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {object} transactionLimit - refers limit available in your wallet.
   * Here we calculate used linit percentage based on limit available in your weekly limit
   */
  calculateUserLimitPercentage(transactionLimit) {
    const { defaultCurrency, selectedType, currency } = this.state
    let total = transactionLimit[defaultCurrency][selectedType].detail[currency].total
    let balance = transactionLimit[defaultCurrency][selectedType].detail[currency].available
    let used = total - balance
    let usedLimit = (used / total) * 100
    this.setState({ usedLimit, limitBalance: balance, limitTotal: total })
  }

  /**
   * set balance to current state
   * @param {object} balance - refers balance available in your wallet.
   * Here we set balance state from balance object
   */
  getBalanceBasedOnCurrency(balance) {
    balance &&
      balance[this.state.currency] &&
      this.setState({ balance: balance[this.state.currency][0].balance })
  }

  /**
   * send available ballance in your wallet
   */
  sendEverything = () => {
    const { selectedType, wallet, defaultCurrency } = this.state
    const { walletBalance } = this.props
    const balance =
      selectedType === DefaultStrings.BUY_SMALL
        ? walletBalance[defaultCurrency][0].balance
        : wallet.fiatBalances[defaultCurrency]
    const availableToSend =
      selectedType === DefaultStrings.BUY_SMALL
        ? this.getCalculatedBalance(balance)
        : this.getCalculatedBalance(wallet.balance)
    if (balance <= 0) {
      showValidatonAlert(I18n.t('DONT_HAVE_ENOUGH_FUND'))
    } else {
      if (selectedType === DefaultStrings.BUY_SMALL) {
        this.onPressForward(availableToSend, this.calculateCryptoValue(availableToSend))
      } else {
        this.onPressForward(this.calculateUsdValue(availableToSend), availableToSend)
      }
    }
  }

  /**
   * calculate crypto value based on usd value
   * @param {String} amount to calculate value
   * @returns {Number} converted amount
   */
  calculateCryptoValue = (amount) => {
    const { currencyValue } = this.state
    const { currency, selectedType } = this.state
    if (selectedType === DefaultStrings.BUY_SMALL) {
      return amount / currencyValue[currency].buy
    } else {
      return amount / currencyValue[currency].sell
    }
  }

  /**
   * calculate usd value based on usd value
   * @param {String} amount to calculate value
   */
  calculateUsdValue = (amount) => {
    const { currencyValue } = this.state
    const { currency, selectedType } = this.state
    if (selectedType === DefaultStrings.BUY_SMALL) {
      return amount * currencyValue[currency].buy
    } else {
      return amount * currencyValue[currency].sell
    }
  }

  /**
   * After amount entered to move forwrd to further process
   */
  onPressForward = (amount, cryptoAmount) => {
    this.setState({ amount, cryptoAmount })
    const { wallet, defaultCurrency, selectedType, currency } = this.state
    const { transactionLimit, usdWalletId, walletBalance, euroWalletId } = this.props
    let availabeLimit = transactionLimit
      ? transactionLimit[defaultCurrency][selectedType].available
      : 0

    if (!handleConnectivityStatus) {
      showAlert(I18n.t('NETWORK_ERROR'))
      return
    }
    let balanceInWallet =
      selectedType === DefaultStrings.BUY_SMALL
        ? walletBalance[defaultCurrency][0].balance
        : wallet.fiatBalances[defaultCurrency]
    // amount should be greater than 0
    let removeSpaceAmount = parseFloat(amount.toString().replace(/,/g, ''))
    let enteredAmount = this.getCalculatedBalance(removeSpaceAmount)

    if (enteredAmount > 0) {
      // amount should be greater than availabe balance
      if (
        enteredAmount <= balanceInWallet &&
        enteredAmount <= availabeLimit &&
        enteredAmount > this.getCommissionBasedOnCurrency(enteredAmount, this.props.commissions)
      ) {
        let data = {
          amount: parseFloat(removeSpaceAmount).toFixed(2),
          cryptoWallet: wallet.uuid,
          fiatWallet: defaultCurrency === CurrencyType.USD ? usdWalletId : euroWalletId,
        }

        this.props.getBuySellHash(data, selectedType, currency, (data) => {
          this.props.setTransfer({
            selectedType: selectedType,
            transfer: data.amountFiat,
            usdAmount: data.amountCrypto,
            fee: data.fee,
            paid: data.totalFiat,
            currency: currency,
            rate: data.rate,
            defaultCurrency: defaultCurrency,
            hash: data.hash,
            to: wallet.alias,
            coin: defaultCurrency,
          })
          this.setState({ keyboardVisible: false, showFeeView: true })
        })
      } else if (enteredAmount > availabeLimit) {
        showValidatonAlert(I18n.t('HIGHER_THAN_LIMIT'))
      } else {
        showValidatonAlert(I18n.t('AMOUNT_LESS_THAN_BALANCE'))
      }
    } else {
      showValidatonAlert(I18n.t('VALID_AMOUNT'))
    }
  }

  /**
   * get correct commission amount based on currency
   * @param {String} currency - refers currencies of the user selected
   */
  getCommissionBasedOnCurrency(amount, commissions) {
    switch (this.state.selectedType) {
      case DefaultStrings.BUY_SMALL: {
        return amount * (commissions.buy_usdwallet / 100)
      }
      case DefaultStrings.SELL_SMALL: {
        return amount * (commissions.sell_usdwallet / 100)
      }
    }
  }

  getCalculatedBalance = (balance) => {
    return (
      balance /
      ((balance + this.getCommissionBasedOnCurrency(balance, this.props.commissions)) / balance)
    )
  }

  /**
   * keyboad visible state change
   */
  enableKeyboardVisible = () => {
    this.setState({ keyboardVisible: true })
  }

  /**
   * Navigate to previus screen
   */
  onPressBackward = () => {
    Navigator.goBack()
  }

  /**
   * keyboard backpress function
   * @param {String} amount entered fiat amount
   * @param {String} cryptoAmount entered crypto amount
   */
  onPressKeyBoardBackward = (amount, cryptoAmount) => {
    this.setState({ keyboardVisible: false, amount: amount, cryptoAmount: cryptoAmount })
  }
}

BuySellEnterAmount.propTypes = {
  getBalanceAndLimit: PropTypes.func,
  isLoading: PropTypes.bool,
  balanceForCoin: PropTypes.string,
  transactionLimit: PropTypes.object,
  selectedBank: PropTypes.object,
  navigation: PropTypes.object,
  getCommissions: PropTypes.func,
  usdValue: PropTypes.object,
  euroValue: PropTypes.object,
  commissions: PropTypes.object,
  getCurrencyValues: PropTypes.func,
  getBuySellHash: PropTypes.func,
  usdWalletId: PropTypes.string,
  euroWalletId: PropTypes.string,
  setTransfer: PropTypes.func,
  walletBalance: PropTypes.array,
  transferDetails: PropTypes.object,
  currencyExpirationDetails: PropTypes.object,
}

export const mapStateToProps = (state) => ({
  balanceForCoin: state.user.balanceBasedOnCoinSelected,
  transactionLimit: state.user.transactionLimit,
  selectedBank: state.user.selectedBank,
  usdValue: state.user.currentCurrency,
  usdWalletId: state.wallet.getWalletBalance.USD[0].uuid,
  euroWalletId: state.wallet.getWalletBalance.EUR[0].uuid,
  commissions: state.user.commissions,
  walletBalance: state.wallet.getWalletBalance,
  euroValue: state.user.euroCurrencyValue,
  transferDetails: state.user.transfer,
  currencyExpirationDetails: state.user.currencyExpirationDetails,
  isLoading: state.common.isLoading,
})

export const mapDispatchToProps = (dispatch) => ({
  getBalanceAndLimit: (currency) => dispatch(UserActions.getBalanceAndTransactionLimit(currency)),
  getCommissions: () => dispatch(UserActions.getCommissions()),
  getCurrencyValues: () => dispatch(UserActions.getCurrencyValue()),
  setTransfer: (transfer) => dispatch(UserActions.setTransfer(transfer)),
  getBuySellHash: (data, selectedType, currency, successFn) =>
    dispatch(UserActions.getBuySellHash(data, selectedType, currency, successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuySellEnterAmount)
