import React from 'react'
import { Text, View } from 'react-native'
import styles from './EnterAmountStyle'
import { PropTypes } from 'prop-types'
import { TextInput } from 'react-native-gesture-handler'
import { getCurrencyColor, getCurrencySymbol, getFontSize } from 'App/Components/Utils/Functions'
import I18n from 'App/Localization/I18n'
import CurrencySeperatorType from 'App/Constants/CurrencySeperatorType'
import { currencyFormatWithoutSymbol, currencyFormat } from 'App/Components/Utils/CurrencyDefinder'
/*
 * Common component for enter amount
 */
export default class EnterAmount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAmountFocused: false,
      amount: '',
    }
  }

  /*
   * Intial callback to set state
   */
  componentDidMount() {
    this.setState({
      amount: this.props.amount,
    })
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    if (prevProps.amount !== this.props.amount) this.setState({ amount: this.props.amount })
  }

  render() {
    const { currency, balance } = this.props
    const { amount, isAmountFocused } = this.state
    const fontSize = getFontSize(
      currencyFormat(amount, CurrencySeperatorType.USD),
      styles.amountWidth.width,
      styles.amountTextStyle.fontSize,
      1.6
    )
    return (
      <View style={styles.centerStyle}>
        <Text style={[styles.walletTitleText, styles.textMargin]}>{I18n.t('AMOUNT_OF')}</Text>
        <View style={[styles.amountContainer, { backgroundColor: getCurrencyColor(currency) }]}>
          <View style={styles.amountTextContainer}>
            <View style={styles.imageContainer}>
              <Text style={[styles.amountTextStyle, styles.symbolWidth]}>
                {getCurrencySymbol(currency)}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              {!isAmountFocused ? (
                <Text
                  style={[styles.amountTextStyle, styles.amountWidth, { fontSize: fontSize }]}
                  onPress={this.onKeyBoardFocused}
                  numberOfLines={1}
                >
                  {currencyFormatWithoutSymbol(amount, currency)}
                </Text>
              ) : (
                <TextInput
                  ref={(ref) => (this.amount = ref)}
                  style={[styles.amountTextStyle, styles.amountWidth, { fontSize: fontSize }]}
                  numberOfLines={1}
                  returnKeyType={'done'}
                  value={amount.toString()}
                  keyboardType={'numeric'}
                  onChangeText={this.amountChange}
                  onSubmitEditing={this.submitKeyboard}
                />
              )}
            </View>
          </View>
          <Text style={styles.balanceTextStyle} numberOfLines={1}>
            ({getCurrencySymbol(currency)}
            {currencyFormatWithoutSymbol(balance, CurrencySeperatorType.USD)} {I18n.t('AVAILABLE')}{' '}
            {currency + ' '} {I18n.t('WALLET')})
          </Text>
        </View>
      </View>
    )
  }

  /**
   * update state amount by entered value
   * @param {string} value user entered value
   */
  amountChange = (value) => {
    this.setState({ amount: value })
    this.props.onPressForward(value)
  }

  /**
   *update into currency format of the amount
   */
  submitKeyboard = () => {
    this.setState({ isAmountFocused: false })
  }

  /**
   *focusing the amount Input field
   */
  onKeyBoardFocused = () => {
    this.setState({ isAmountFocused: true }, () => {
      this.amount.focus()
    })
  }
}

EnterAmount.propTypes = {
  onPressKeyboard: PropTypes.func,
  onPressForward: PropTypes.func,
  currency: PropTypes.string,
  amount: PropTypes.string,
  balance: PropTypes.string,
}
