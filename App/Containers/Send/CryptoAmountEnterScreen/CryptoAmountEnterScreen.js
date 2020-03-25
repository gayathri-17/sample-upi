import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import styles from './CryptoAmountEnterScreenStyle'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import MyKeyboard from 'App/Components/CustomKeyboard/CustomKeyboard'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import UserActions from 'App/Stores/User/Actions'
import { showValidatonAlert, getImage, getAcronymForName } from 'App/Components/Utils/Functions'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'

/**
 *  Send amount screen where user enter amount to send
 */

export class CryptoAmountEnterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currency: props.navigation.state.params.currency,
      addressSelected: props.navigation.state.params.addressSelected,
      address: props.navigation.state.params.address,
      contact: props.navigation.state.params.contact,
      wallet: props.navigation.state.params.wallet,
      amount: props.navigation.state.params.amount,
      cryptoAmount: props.navigation.state.params.cryptoAmount,
      instantSend: props.navigation.state.params.instantSend,
      defaultCurrency: props.profile.default_currency,
      currencyValue:
        props.profile.default_currency === CurrencyType.USD ? props.usdValue : props.euroValue,
    }
  }

  /**
   *  Initial component to render
   */
  componentDidMount() {
    this.props.getCommissions()
  }

  render() {
    const {
      wallet,
      currency,
      addressSelected,
      address,
      contact,
      amount,
      cryptoAmount,
      currencyValue,
      defaultCurrency,
    } = this.state
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container} enabled>
        <View style={styles.container}>
          {/* Header container */}
          <View style={styles.walletTitleContainer}>
            <View style={styles.walletTitleImageContainer}>
              <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
            </View>
            <Text style={styles.walletTitleText}>{I18n.t('SEND_SMALL')}</Text>
            {getImage(currency)}
            <Text style={[styles.walletTitleText, styles.textLowerCase]}>{I18n.t('TO')}</Text>
            {!addressSelected ? (
              <View style={styles.viewStyle}>
                <View style={styles.circleStyle}>
                  <Text style={styles.acronymTextStyle}>
                    {getAcronymForName(contact.description)}
                  </Text>
                </View>
                <Text numberOfLines={1} style={styles.bankAccountTextStyle}>
                  {contact.description}
                </Text>
              </View>
            ) : (
              <Text numberOfLines={1} style={styles.bankAccountTextStyle}>
                {address.substring(0, 37) + '...'}
              </Text>
            )}
          </View>
          {/* keyboard view */}
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
            onPressBackward={this.onPressBackward}
          />
        </View>
      </KeyboardAvoidingView>
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
   * After amount entered to move forwrd to further process
   * @param {String} amount referes to entered amount
   * @param {String} cryptoAmount referes to crypto amount
   */
  onPressForward = (amount, cryptoAmount) => {
    const { transactionLimit } = this.props
    const {
      contact,
      addressSelected,
      address,
      currency,
      wallet,
      instantSend,
      defaultCurrency,
    } = this.state
    let availabeLimit = addressSelected
      ? transactionLimit[defaultCurrency].transfer_external.available
      : transactionLimit[defaultCurrency].transfer_internal.available
    let availableBalance = this.state.wallet.fiatBalances[defaultCurrency]
    // amount should be greater than 0
    let amountEntered = parseFloat(amount.toString().replace(/,/g, ''))
    let cryptoEntered = parseFloat(cryptoAmount.toString().replace(/,/g, ''))
    let commission = addressSelected
      ? this.getCommissionBasedOnCurrency(currency, this.props.commissions)
      : 0
    if (amountEntered > 0) {
      // amount should be greater than availabe balance
      if (
        amountEntered <= availableBalance &&
        amountEntered <= availabeLimit &&
        cryptoEntered > commission
      ) {
        this.props.setSelectedBank({
          id_account: addressSelected ? address : contact.id,
          to: addressSelected ? address : contact.description,
          type: addressSelected ? DefaultStrings.TYPE_BANK_ACCOUNT : DefaultStrings.TYPE_CONTACT,
          wallet: wallet,
          currency: currency,
          addressSelected: addressSelected,
          instantSend: instantSend,
        })
        Navigator.navigate(NavKeys.SEND_AMOUNT_DETAIL, {
          amount: amountEntered,
          cryptoAmount: cryptoEntered,
        })
      } else if (amountEntered > availabeLimit) {
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
}

CryptoAmountEnterScreen.propTypes = {
  isLoading: PropTypes.bool,
  transactionLimit: PropTypes.object,
  navigation: PropTypes.object,
  usdValue: PropTypes.object,
  setSelectedBank: PropTypes.func,
  commissions: PropTypes.object,
  getCommissions: PropTypes.func,
  profile: PropTypes.object,
  euroValue: PropTypes.object,
}

export const mapStateToProps = (state) => ({
  transactionLimit: state.user.transactionLimit,
  isLoading: state.common.isLoading,
  usdValue: state.user.currentCurrency,
  commissions: state.user.commissions,
  profile: state.user.onBoardingProfile,
  euroValue: state.user.euroCurrencyValue,
})

export const mapDispatchToProps = (dispatch) => ({
  setSelectedBank: (bankData) => dispatch(UserActions.setSelectedBank(bankData)),
  getCommissions: () => dispatch(UserActions.getCommissions()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CryptoAmountEnterScreen)
