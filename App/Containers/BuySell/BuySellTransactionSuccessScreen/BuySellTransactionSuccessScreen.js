import React from 'react'
import styles from './BuySellTransactionSuccessScreenStyle'
import { SafeAreaView, View, Text, Modal, TouchableOpacity } from 'react-native'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import DefaultStrings from 'App/Constants/DefaultStrings'
import CircleCheckedWhite from 'App/Assets/Images/Svg/CircleCheckedWhite'
import Line from 'App/Components/Line/Line'
import CloseWhite from 'App/Assets/Images/Svg/CloseWhite'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import { getWalletName, getImage, showRateAlert, RateApp } from 'App/Components/Utils/Functions'
import { currencyFormat, cryptocurrencyFormat } from 'App/Components/Utils/CurrencyDefinder'
import UserActions from 'App/Stores/User/Actions'

/*
 * User can see their transaction success status here
 */
export class BuySellTransactionSuccessScreen extends React.Component {
  render() {
    // to access current props
    const { transfer } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Modal transparent={false} visible={true}>
          <ToolBar testID={'ToolBar'} />
          <View style={styles.parentContainer}>
            <CircleCheckedWhite width={styles.checkImage.width} height={styles.checkImage.height} />
            <View style={styles.centerAlign}>
              <Text style={styles.successText}>{DefaultStrings.SUCCESS_CAPS}</Text>
              <View style={[styles.amountContainer, styles.amountContainerSent]}>
                <Text style={styles.titleTextName}>
                  {transfer.selectedType === DefaultStrings.BUY_SMALL
                    ? I18n.t('YOU_BOUGHT')
                    : I18n.t('YOU_SOLD')}
                </Text>

                {transfer.selectedType === DefaultStrings.SELL_SMALL ? (
                  <View style={styles.subView}>
                    <Text style={styles.amountViewText}>
                      {currencyFormat(transfer.paid, transfer.coin)}
                      {transfer.coin}
                    </Text>
                    <Text style={styles.amountSubViewText}>
                      {cryptocurrencyFormat(this.calculateCryptoValue(transfer.paid))}{' '}
                      {transfer.currency}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.subView}>
                    <Text style={styles.amountViewText}>
                      {currencyFormat(transfer.transfer, transfer.coin)} {transfer.coin}
                    </Text>
                    <Text style={styles.amountSubViewText}>
                      {cryptocurrencyFormat(this.calculateCryptoValue(transfer.transfer))}{' '}
                      {transfer.currency}
                    </Text>
                  </View>
                )}
              </View>
              <View style={[styles.amountContainer, styles.amountContainerFee]}>
                <Text style={styles.titleTextName}>{DefaultStrings.FEE}</Text>
                <Text style={styles.titleTextValue}>
                  {currencyFormat(transfer.fee.toFixed(2), transfer.coin)} {transfer.coin}
                </Text>
              </View>
              <Line styleProp={styles.lineStyle} />
              <View style={[styles.amountContainer, styles.amountContainerGot]}>
                <Text style={styles.titleTextName}>
                  {transfer.selectedType === DefaultStrings.BUY_SMALL
                    ? I18n.t('YOU_PAID')
                    : I18n.t('YOU_GOT')}
                </Text>

                {transfer.selectedType === DefaultStrings.SELL_SMALL ? (
                  <View style={styles.subView}>
                    <Text style={styles.amountViewText}>
                      {currencyFormat(transfer.transfer, transfer.coin)} {transfer.coin}
                    </Text>
                    <Text style={styles.amountSubViewText}>
                      {cryptocurrencyFormat(this.calculateCryptoValue(transfer.transfer))}{' '}
                      {transfer.currency}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.subView}>
                    <Text style={styles.amountViewText}>
                      {currencyFormat(transfer.paid, transfer.coin)}
                      {transfer.coin}
                    </Text>
                    <Text style={styles.amountSubViewText}>
                      {cryptocurrencyFormat(this.calculateCryptoValue(transfer.paid))}{' '}
                      {transfer.currency}
                    </Text>
                  </View>
                )}
              </View>
              {/* rate for this transaction */}
              <View style={styles.rateContainer}>
                <Text style={styles.guarantyText}>{I18n.t('GURANTEED')} </Text>
                <Text style={styles.rateTextStyle}>
                  1 {transfer.currency + ' =  ' + currencyFormat(transfer.rate, transfer.coin)}{' '}
                </Text>
              </View>
              <View style={styles.infoView}>
                <View style={[styles.amountContainer, styles.infoToContainer]}>
                  <Text style={styles.infoToTextName}>
                    {transfer.selectedType === DefaultStrings.BUY_SMALL
                      ? I18n.t('FROM_FUND')
                      : I18n.t('TO')}
                  </Text>
                  <View style={styles.infoFromValueContainer}>
                    {getImage(transfer.defaultCurrency)}
                    <Text style={styles.infoFromValueText}>
                      {getWalletName(transfer.defaultCurrency)}
                    </Text>
                  </View>
                </View>
                <Line styleProp={styles.lineStyleAliceBlue} />
                <View style={[styles.amountContainer, styles.infoToContainer]}>
                  <Text style={styles.infoToTextName}>
                    {transfer.selectedType === DefaultStrings.BUY_SMALL
                      ? I18n.t('TO')
                      : I18n.t('FROM_FUND')}
                  </Text>
                  <View style={styles.infoFromValueContainer}>
                    {getImage(transfer.currency)}
                    <Text style={styles.infoFromValueText}>{transfer.to}</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={this.onCloseClicked}>
              <CloseWhite width={styles.cancelImage.width} height={styles.cancelImage.height} />
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    )
  }

  /**
   * calculate crypto value based on usd value
   * @param {String} amount to calculate value
   * @returns {Number} converted amount
   */
  calculateCryptoValue = (amount) => {
    const { transfer } = this.props
    return amount / transfer.rate
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

BuySellTransactionSuccessScreen.propTypes = {
  transfer: PropTypes.object,
  appRating: PropTypes.bool,
  setAppRating: PropTypes.func,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  transfer: state.user.transfer,
  appRating: state.user.appRating,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  setAppRating: (data) => dispatch(UserActions.setAppRating(data)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuySellTransactionSuccessScreen)
