import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'
import styles from './CustomKeyboardStyle'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import { getCurrencyColor, getCurrencySymbol } from 'App/Components/Utils/Functions'
import {
  currencyFormat,
  cryptocurrencyFormat,
  currencyFormatWithoutSymbol,
} from 'App/Components/Utils/CurrencyDefinder'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'

/*
 * Custom keyboard component
 */
export default class MyKeyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      cryptoAmount: '',
      cryptoSelected: 0, // 0:none focused, 1: Fiat field focused, 2: crypto field focsed
    }
  }

  /*
   * Intial callback to set state
   */
  componentDidMount() {
    if (this.props.multipleInput) {
      this.setState({
        amount: this.props.amount,
        cryptoAmount: this.props.cryptoAmount,
      })
    } else {
      this.setState({
        amount: this.props.amount,
      })
    }
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    if (
      prevProps.amount !== this.props.amount ||
      prevProps.cryptoAmount !== this.props.cryptoAmount
    )
      this.setState({ amount: this.props.amount, cryptoAmount: this.props.cryptoAmount })
  }

  render() {
    const { currency, balance, multipleInput, type, defaultCurrency } = this.props
    const { amount, cryptoSelected, cryptoAmount } = this.state
    return (
      <View style={[styles.containerView]}>
        {/* amount view container */}
        <View style={styles.amountContainer}>
          <Text style={styles.walletTitleText}>{I18n.t('AMOUNT_OF')}</Text>
          <View>
            <View style={[styles.inputTextStyle, styles.amountInputText]}>
              <Text style={styles.dollerLogo}>
                {multipleInput ? getCurrencySymbol(defaultCurrency) : getCurrencySymbol(currency)}
              </Text>
              {cryptoSelected === 1 ? (
                <TextInput
                  ref={(ref) => (this.amount = ref)}
                  style={[styles.amountInput]}
                  numberOfLines={1}
                  value={amount.toString()}
                  returnKeyType={'done'}
                  keyboardType={'numeric'}
                  onChangeText={this.calculateCryptoValue}
                  onSubmitEditing={this.submitKeyboard}
                />
              ) : (
                <Text
                  style={[styles.amountInput]}
                  numberOfLines={1}
                  editable={false}
                  value={amount}
                  onPress={this.amountTextClicked}
                  // onChangeText={this.calculateCryptoValue}
                >
                  {currencyFormatWithoutSymbol(amount)}
                </Text>
              )}
            </View>
          </View>
          {multipleInput ? (
            <View>
              <View
                style={[
                  styles.inputTextStyle,
                  styles.amountInputText,
                  { backgroundColor: getCurrencyColor(currency) },
                ]}
              >
                <Text style={[styles.convertedName]}>{getCurrencySymbol(currency)}</Text>
                {cryptoSelected === 2 ? (
                  <TextInput
                    ref={(ref) => (this.cryptoAmount = ref)}
                    style={[styles.amountInput, styles.convertedAmount]}
                    numberOfLines={1}
                    returnKeyType={'done'}
                    keyboardType={'numeric'}
                    onChangeText={this.calculateUsdValue}
                    value={cryptoAmount.toString()}
                    onSubmitEditing={this.submitKeyboard}
                  />
                ) : (
                  <Text
                    style={[styles.amountInput, styles.convertedAmount]}
                    numberOfLines={1}
                    editable={false}
                    onPress={this.cryptoTextClicked}
                    // onChangeText={this.calculateUsdValue}
                  >
                    {cryptoAmount ? cryptocurrencyFormat(parseFloat(cryptoAmount)) : ''}
                  </Text>
                )}
              </View>
            </View>
          ) : null}
          <Text style={styles.balanceTextStyle} numberOfLines={1}>
            {type === DefaultStrings.BUY_SMALL
              ? currencyFormat(balance || 0.0, defaultCurrency)
              : type === DefaultStrings.SELL_SMALL
              ? cryptocurrencyFormat(balance || 0.0)
              : currency === CurrencyType.USD ||
                currency === CurrencyType.EURO_NAME ||
                currency === CurrencyType.EURO
              ? currencyFormat(balance, currency)
              : cryptocurrencyFormat(balance)}{' '}
            {type === DefaultStrings.BUY_SMALL || type === DefaultStrings.SELL_SMALL
              ? I18n.t('AVAILABLE_TO') + I18n.t(type.toUpperCase()) // type.toUpperCase() gives the correct value as BUY/SELL to get the correct language
              : I18n.t('AVAILABLE_IN_YOUR') + ' ' + currency + ' ' + I18n.t('WALLET')}
          </Text>
        </View>
      </View>
    )
  }
  /**
   *focusing the amount Input field
   */
  amountTextClicked = () => {
    this.setState({ cryptoSelected: 1 }, () => {
      this.amount.focus()
    })
  }

  /**
   *focusing the crypto Input field
   */
  cryptoTextClicked = () => {
    this.setState(
      {
        cryptoSelected: 2,
        cryptoAmount: this.state.cryptoAmount === '0' ? '' : this.state.cryptoAmount,
      },
      () => {
        this.cryptoAmount.focus()
      }
    )
  }

  /**
   *update into currency format of the amount
   */
  submitKeyboard = () => {
    const { doneClicked } = this.props
    this.setState({ cryptoSelected: 3 })
    if (doneClicked) doneClicked(this.state.amount, this.state.cryptoAmount)
  }

  noExponents(string) {
    var data = string.toString().split(/[eE]/)
    if (data.length === 1) return data[0]

    var z = ''
    var sign = this < 0 ? '-' : ''
    var str = data[0].replace('.', '')
    var mag = Number(data[1]) + 1

    if (mag < 0) {
      z = sign + '0.'
      while (mag++) z += '0'
      return z + str.replace(/^-/, '')
    }
    mag -= str.length
    while (mag--) z += '0'
    return str + z
  }

  /**
   * calculate usd value based on crypto value
   * @param {String} amount to calculate value
   */
  calculateCryptoValue = (amount) => {
    if (amount !== '0' || amount !== '') {
      const { currency, usdValue, type } = this.props
      let cryptoAmount
      if (type === DefaultStrings.BUY_SMALL) {
        cryptoAmount = amount / usdValue[currency].buy
      } else if (type === DefaultStrings.SELL_SMALL) {
        cryptoAmount = amount / usdValue[currency].sell
      } else {
        cryptoAmount = amount / usdValue[currency].base
      }

      this.setState({
        cryptoAmount: cryptoAmount === 0 ? '' : this.noExponents(cryptoAmount),
        amount: amount,
      })
      this.props.onAmountUpdate(amount, this.noExponents(cryptoAmount))
    }
  }

  /**
   * calculate crypto value based on usd value
   * @param {String} amount to calculate value
   */
  calculateUsdValue = (amount) => {
    if (amount !== '0' || amount !== '') {
      const { currency, usdValue, type } = this.props
      let usdAmount
      if (type === DefaultStrings.BUY_SMALL) {
        usdAmount = amount * usdValue[currency].buy
      } else if (type === DefaultStrings.SELL_SMALL) {
        usdAmount = amount * usdValue[currency].sell
      } else {
        usdAmount = amount * usdValue[currency].base
      }
      this.setState({ amount: usdAmount === 0 ? '' : usdAmount, cryptoAmount: amount })
      this.props.onAmountUpdate(usdAmount, amount)
    }
  }
}

MyKeyboard.propTypes = {
  onAmountUpdate: PropTypes.func,
  amount: PropTypes.string,
  currency: PropTypes.string,
  balance: PropTypes.string,
  multipleInput: PropTypes.bool,
  cryptoAmount: PropTypes.string,
  usdValue: PropTypes.object,
  type: PropTypes.string,
  defaultCurrency: PropTypes.string,
  doneClicked: PropTypes.func,
}
