import React from 'react'
import styles from './CurrencySelectionStyle'
import { PropTypes } from 'prop-types'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import DashboardTitle from 'App/Components/DashboardTitle/DashboardTitle'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import I18n from 'App/Localization/I18n'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import CurrencyType from 'App/Constants/CurrencyType'

/**
 * coin selection for buy and sell
 */
export default class CurrencySelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedType: props.navigation.state.params.selectedType,
      currency: props.navigation.state.params.currency,
      wallet: props.navigation.state.params.wallet,
    }
  }

  render() {
    const { selectedType, currency } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <DashboardTitle
          title={I18n.t(selectedType.toUpperCase()) + ' '}
          currency={currency}
          style={styles.titleContainer}
          subTitle={' ' + I18n.t('TO').toLowerCase()}
          name={''}
        />
        <View style={styles.currencyContainer}>
          <TouchableOpacity
            style={styles.regionalContainer}
            onPress={this.onClickCurrency.bind(this, CurrencyType.EURO)}
          >
            <View style={styles.optionContainer}>
              <View style={styles.optionIconContainer}>
                <EuroLogo width={styles.optionIcon.width} height={styles.optionIcon.height} />
              </View>
              <Text style={styles.textStyle}>{I18n.t('TYPE_EURO')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.regionalContainer}
            onPress={this.onClickCurrency.bind(this, CurrencyType.USD)}
          >
            <View style={styles.optionContainer}>
              <View style={styles.optionIconContainer}>
                <USDLogo width={styles.optionIcon.width} height={styles.optionIcon.height} />
              </View>
              <Text style={styles.textStyle}>{I18n.t('TYPE_USD')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Forward and backward view */}
        <View style={styles.arrowContainer}>
          <View style={[styles.rowStyle, styles.arrowContainerStyle]}>
            <TouchableOpacity onPress={this.goback} testID="forwardArrow">
              <BackArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  /**
   *  go back to previous screen
   */
  goback = () => {
    Navigator.goBack()
  }

  /**
   *  on click coin
   * @param {String} coin selected coin
   */
  onClickCurrency = (coin) => {
    const { selectedType, currency, wallet } = this.state
    Navigator.navigate(NavKeys.BUY_SELL_ENTER_AMOUNT, {
      selectedType: selectedType,
      currency: currency,
      wallet: wallet,
      coin: coin,
    })
  }
}
CurrencySelection.propTypes = {
  navigation: PropTypes.object.isRequired,
}
