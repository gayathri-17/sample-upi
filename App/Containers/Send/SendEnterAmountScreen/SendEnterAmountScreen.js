import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, findNodeHandle } from 'react-native'
import styles from './SendEnterAmountScreenStyle'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import Line from 'App/Components/Line/Line'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import ForwardArrow from 'App/Assets/Images/Svg/ForwardArrow'
import EnterAmount from 'App/Components/EnterAmount/EnterAmount'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import ProgressCircle from 'react-native-progress-circle'
import {
  getCurrencyColor,
  showValidatonAlert,
  getImage,
  getAcronymForName,
} from 'App/Components/Utils/Functions'
import UserActions from 'App/Stores/User/Actions'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'
import ErrorModal from 'App/Components/Modal/ErrorModal/ErrorModal'
import LimitModel from 'App/Components/Limits/LimitModel'

/**
 *  Send amount screen where user enter amount to send
 */

export class SendEnterAmountScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      keyboardVisible: false,
      usedLimit: '0',
      balance: '0',
      currencyType: props.navigation.state.params.currencyType,
      apiRequestFailure: false,
      requestErrMessage: '',
      totalLimit: '',
      availabeLimit: '',
      viewRef: null,
      sendlimitModal: false,
    }
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    this.props.getBalanceAndLimit(this.state.currencyType, this.handleApiFailure)
    this.setState({ viewRef: findNodeHandle(this.scrollView) })
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    const { transactionLimit, balanceForCoin } = this.props
    if (prevProps.transactionLimit !== transactionLimit) {
      this.calculateUserLimitPercentage(transactionLimit)
      this.getBalanceBasedOnCurrency(balanceForCoin)
    }
  }

  render() {
    const {
      amount,
      currencyType,
      balance,
      usedLimit,
      apiRequestFailure,
      requestErrMessage,
      totalLimit,
      availabeLimit,
      sendlimitModal,
    } = this.state
    const { selectedBank } = this.props
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        ref={(view) => {
          this.scrollView = view
        }}
      >
        {/* Header container */}
        <View style={styles.walletTitleContainer}>
          <View style={styles.walletTitleImageContainer}>
            <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
          </View>
          <Text style={styles.walletTitleText}>{I18n.t('SEND_SMALL')}</Text>
          {getImage(currencyType)}
          <Text style={[styles.walletTitleText, styles.textLowerCase]}>{I18n.t('TO')}</Text>
          {selectedBank.type === DefaultStrings.TYPE_CONTACT ? (
            <View style={styles.circleStyle}>
              <Text style={styles.acronymTextStyle}>{getAcronymForName(selectedBank.to)}</Text>
            </View>
          ) : null}
          <Text style={styles.bankAccountTextStyle}>{selectedBank.to}</Text>
        </View>
        {/* check condition whether to show a keyboard or not */}
        <View style={styles.container}>
          <View style={[styles.centerStyle, styles.textMargin]}>
            <Line styleProp={styles.lineStyle} />
          </View>
          {/* amount view to show amount */}
          <View style={[styles.centerStyle, styles.amountContainerMargin]}>
            <EnterAmount
              onPressForward={this.updateAmount}
              currency={currencyType}
              amount={amount}
              balance={balance}
            />
            {/* send everthing view */}
            <View style={styles.containerView}>
              <TouchableOpacity style={styles.rowStyle} onPress={this.showLimitModal}>
                <Text style={styles.smallTextStyle}>{I18n.t('USED_LIMIT')}</Text>
                <View style={styles.progressViewStyle}>
                  <ProgressCircle
                    percent={parseInt(usedLimit)}
                    radius={styles.progressStyle.width}
                    borderWidth={styles.progressStyle.borderWidth}
                    color={getCurrencyColor(currencyType)}
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
                  { borderColor: getCurrencyColor(currencyType) },
                ]}
              >
                <Text
                  testID="send"
                  style={[
                    styles.smallTextStyle,
                    styles.sendTextStyle,
                    {
                      color: getCurrencyColor(currencyType),
                    },
                  ]}
                  onPress={this.sendEverything}
                >
                  {I18n.t('SEND_EVERYTHING')}
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
              <TouchableOpacity onPress={this.onPressForward} testID="backwardArrow">
                <ForwardArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* api error modal */}
        <ErrorModal
          isShow={apiRequestFailure}
          isHideClose={false}
          onCLickClose={this.onPressBackward}
          onClickSubmit={this.retryApiRequest}
          submitButtonTitle={I18n.t('RETRY')}
          errorMessage={requestErrMessage || I18n.t('NETWORK_ERROR')}
        />
        {/* limit modal */}
        <LimitModel
          isShow={sendlimitModal}
          onClickClose={this.onClickClose}
          usedLimit={usedLimit}
          currencyName={currencyType}
          totalLimit={totalLimit}
          defaultCurrency={currencyType}
          availabeLimit={availabeLimit}
          viewRef={this.state.viewRef}
          limitText={I18n.t('YOUR_SEND_LIMITS')}
        />
      </ScrollView>
    )
  }

  /**
   * show limit modal
   */
  showLimitModal = () => {
    this.setState({ sendlimitModal: true })
  }

  /**
   * close send limit modal
   */
  onClickClose = () => {
    this.setState({ sendlimitModal: false })
  }

  /**
   * retry api request
   * @param {String} error - api request error message.
   */
  retryApiRequest = () => {
    this.setState({ apiRequestFailure: false })
    this.props.getBalanceAndLimit(this.state.currencyType, this.handleApiFailure)
  }

  /**
   * handle api failure callback
   * @param {String} error - api request error message.
   */
  handleApiFailure = (error) => {
    this.setState({ apiRequestFailure: true, requestErrMessage: error })
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {object} transactionLimit - refers limit available in your wallet.
   * Here we calculate used linit percentage based on limit available in your weekly limit
   */
  calculateUserLimitPercentage(transactionLimit) {
    const type = this.props.selectedBank.type // selected type whether bank account or contact
    if (type === DefaultStrings.TYPE_CONTACT) {
      let total = transactionLimit[this.state.currencyType].fiat_transfer.total
      let balance = transactionLimit[this.state.currencyType].fiat_transfer.available
      let used = total - balance
      let usedLimit = (used / total) * 100
      this.setState({ usedLimit, totalLimit: total, availabeLimit: balance })
    } else {
      let total = transactionLimit[this.state.currencyType].withdraw.total
      let balance = transactionLimit[this.state.currencyType].withdraw.available
      let used = total - balance
      let usedLimit = (used / total) * 100
      this.setState({ usedLimit, totalLimit: total, availabeLimit: balance })
    }
  }

  /**
   * set balance to current state
   * @param {object} balance - refers balance available in your wallet.
   * Here we set balance state from balance object
   */
  getBalanceBasedOnCurrency(balance) {
    balance &&
      balance[this.state.currencyType] &&
      this.setState({ balance: balance[this.state.currencyType][0].balance })
  }

  /**
   * send available ballance in your wallet
   */
  sendEverything = () => {
    const { balance } = this.state
    let amount = balance - this.getCommissionBasedOnCurrency(balance, this.props.commissions)

    if (balance > 0) {
      this.setState({ amount: amount })
    } else {
      showValidatonAlert(I18n.t('NO_BALANCE'))
    }
  }

  /**
   * After amount entered to move forwrd to further process
   */
  onPressForward = () => {
    const { balance, amount, currencyType } = this.state
    const { transactionLimit } = this.props
    let availabeLimit = transactionLimit ? transactionLimit[currencyType].withdraw.available : 0
    // amount should be greater than 0
    let enteredAmount = parseFloat(amount.toString().replace(/,/g, ''))
    let balanceWithCommission =
      parseFloat(balance) +
      parseFloat(this.getCommissionBasedOnCurrency(enteredAmount, this.props.commissions))
    let commission = this.getCommissionBasedOnCurrency(enteredAmount, this.props.commissions)
    if (enteredAmount > 0) {
      // amount should be greater than availabe balance
      if (
        enteredAmount <= balanceWithCommission &&
        enteredAmount <= availabeLimit &&
        enteredAmount > commission
      ) {
        Navigator.navigate(NavKeys.SEND_AMOUNT_DETAIL, {
          amount: enteredAmount,
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
    switch (this.props.selectedBank.type) {
      case DefaultStrings.TYPE_CONTACT: {
        return amount / 100
      }
      case DefaultStrings.TYPE_BANK_ACCOUNT: {
        if (this.state.currencyType === CurrencyType.EURO) {
          return commissions.withdraw_wire_transfer_international
        } else {
          return commissions.withdraw_wire_transfer_domestic
        }
      }
    }
  }

  /**
   * update amount state change
   * @param {String} value user entered amount
   */
  updateAmount = (value) => {
    this.setState({ amount: value })
  }

  /**
   * Navigate to previus screen
   */
  onPressBackward = () => {
    Navigator.goBack()
  }
}

SendEnterAmountScreen.propTypes = {
  getBalanceAndLimit: PropTypes.func,
  isLoading: PropTypes.bool,
  balanceForCoin: PropTypes.object,
  transactionLimit: PropTypes.object,
  selectedBank: PropTypes.object,
  navigation: PropTypes.object,
  getCommissions: PropTypes.func,
  commissions: PropTypes.object,
}

export const mapStateToProps = (state) => ({
  balanceForCoin: state.user.balanceBasedOnCoinSelected,
  transactionLimit: state.user.transactionLimit,
  selectedBank: state.user.selectedBank,
  commissions: state.user.commissions,
})

export const mapDispatchToProps = (dispatch) => ({
  getBalanceAndLimit: (currency, failureFn) =>
    dispatch(UserActions.getBalanceAndTransactionLimit(currency, failureFn)),
  getCommissions: () => dispatch(UserActions.getCommissions()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendEnterAmountScreen)
