import React from 'react'
import styles from 'App/Containers/TransactionSuccess/TransactionSuccessScreenStyle'
import { SafeAreaView, View, Text } from 'react-native'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import DefaultStrings from '../../Constants/DefaultStrings'
import CircleCheckedWhite from 'App/Assets/Images/Svg/CircleCheckedWhite'
import Line from 'App/Components/Line/Line'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import CloseWhite from 'App/Assets/Images/Svg/CloseWhite'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import { currencyFormat, cryptocurrencyFormat } from 'App/Components/Utils/CurrencyDefinder'
import {
  getWalletName,
  getAcronymForName,
  showRateAlert,
  RateApp,
} from 'App/Components/Utils/Functions'
import CurrencyType from 'App/Constants/CurrencyType'
import UserActions from 'App/Stores/User/Actions'

/*
 * User can see their transaction success status here
 */
export class TransactionSuccessScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultCurrency: props.profile.default_currency,
    }
  }
  render() {
    // to access current props
    const { defaultCurrency } = this.state
    const { currency, transfer, fee, to, paid } = this.props
    const isCrypto =
      currency === CurrencyType.BITCOIN ||
      currency === CurrencyType.ETH ||
      currency === CurrencyType.DASH
    return (
      <SafeAreaView style={styles.container}>
        <ToolBar testID={'ToolBar'} />
        <View style={styles.parentContainer}>
          <CircleCheckedWhite width={styles.checkImage.width} height={styles.checkImage.height} />
          <Text style={styles.successText}>{I18n.t('SUCCESS_CAPS')}</Text>
          <View style={[styles.amountContainer, styles.amountContainerSent]}>
            <Text style={styles.titleTextName}>{I18n.t('YOU_SENT')}</Text>
            {isCrypto ? (
              <View style={styles.subView}>
                <Text style={styles.amountViewText}>
                  {cryptocurrencyFormat(transfer.transfer)} {currency}
                </Text>
                <Text style={styles.amountSubViewText}>
                  {currencyFormat(transfer.cryptoUSD, defaultCurrency)}
                  {defaultCurrency}
                </Text>
              </View>
            ) : (
              <Text style={styles.titleTextValue}>
                {currencyFormat(transfer.transfer, transfer.currency)} {currency}
              </Text>
            )}
          </View>
          <View style={[styles.amountContainer, styles.amountContainerFee]}>
            <Text style={styles.titleTextName}>{I18n.t('FEE')}</Text>
            <Text style={styles.titleTextValue}>
              {isCrypto ? cryptocurrencyFormat(fee) : currencyFormat(fee, transfer.currency)}{' '}
              {currency}
            </Text>
          </View>
          <Line styleProp={styles.lineStyle} />
          <View style={[styles.amountContainer, styles.amountContainerGot]}>
            <Text style={styles.titleTextName}>
              {transfer.type === DefaultStrings.TYPE_BANK_ACCOUNT
                ? I18n.t('YOU_GOT')
                : I18n.t('RECEIPENT_GOT')}
            </Text>
            <Text style={styles.titleTextValue}>
              {isCrypto ? cryptocurrencyFormat(paid) : currencyFormat(paid, transfer.currency)}{' '}
              {currency}
            </Text>
          </View>
          <View style={styles.infoView}>
            <View style={[styles.amountContainer, styles.infoToContainer]}>
              <Text style={styles.infoToTextName}>{I18n.t('TO')}</Text>
              {transfer.type === DefaultStrings.TYPE_CONTACT ? (
                <View style={styles.infoFromValueContainer}>
                  <View style={styles.circleStyle}>
                    <Text style={styles.acronymTextStyle}>{getAcronymForName(to)}</Text>
                  </View>
                  <Text style={styles.infoFromValueText}>{to}</Text>
                </View>
              ) : (
                <Text style={styles.infoTextValue}>{to}</Text>
              )}
            </View>
            <Line styleProp={styles.lineStyleAliceBlue} />
            <View style={[styles.amountContainer, styles.infoToContainer]}>
              <Text style={styles.infoToTextName}>{I18n.t('FROM_FUND')}</Text>
              <View style={styles.infoFromValueContainer}>
                {this.getLogoByType(currency)}
                <Text style={styles.infoFromValueText}>{getWalletName(currency)}</Text>
              </View>
            </View>
          </View>
          {(transfer.currency === CurrencyType.BITCOIN ||
            transfer.currency === CurrencyType.ETH ||
            transfer.currency === CurrencyType.DASH) && (
            <Text style={styles.rateTextStyle}>
              {I18n.t('RATE_FOR_THIS_TRANSACTION')} 1{' '}
              {transfer.currency + ' = ' + currencyFormat(transfer.rate, defaultCurrency)}
            </Text>
          )}

          <TouchableOpacity style={styles.closeView} onPress={this.onCloseClicked.bind(this)}>
            <CloseWhite width={styles.cancelImage.width} height={styles.cancelImage.height} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  /**
   * get currency logo by country type
   * @returns currency image
   */
  getLogoByType = (currency) => {
    switch (currency) {
      case DefaultStrings.TYPE_USD:
        return <USDLogo width={styles.fromLogo.width} height={styles.fromLogo.height} />
      case DefaultStrings.TYPE_BTC:
        return <BitcoinLogo width={styles.fromLogo.width} height={styles.fromLogo.height} />
      case DefaultStrings.TYPE_DASH:
        return <DashLogo width={styles.fromLogo.width} height={styles.fromLogo.height} />
      case DefaultStrings.TYPE_ETH:
        return <ETHLogo width={styles.fromLogo.width} height={styles.fromLogo.height} />
      default:
        return <EuroLogo width={styles.fromLogo.width} height={styles.fromLogo.height} />
    }
  }

  /**
   * navigate to Dashboard Page
   */
  onCloseClicked = () => {
    if (this.props.appRating) Navigator.navigateAndReset(NavKeys.TAB)
    else {
      showRateAlert(this.setAppRating)
    }
  }

  /**
   * set app rating to true
   */
  setAppRating = () => {
    this.props.setAppRating(true)
    RateApp()
  }
}

TransactionSuccessScreen.propTypes = {
  bankName: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  fee: PropTypes.number.isRequired,
  paid: PropTypes.number.isRequired,
  transfer: PropTypes.number.isRequired,
  profile: PropTypes.object,
  appRating: PropTypes.bool,
  setAppRating: PropTypes.func,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  bankName: state.user.selectedBank.bankName,
  currency: state.user.transfer.currency,
  fee: state.user.transfer.fee,
  paid: state.user.transfer.paid,
  to: state.user.transfer.to,
  transfer: state.user.transfer,
  profile: state.user.onBoardingProfile,
  appRating: state.user.appRating,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  setAppRating: (data) => dispatch(UserActions.setAppRating(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionSuccessScreen)
