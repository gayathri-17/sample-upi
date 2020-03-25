import React from 'react'
import { PropTypes } from 'prop-types'
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import styles from './TransListItemStyle'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import DefaultStrings from 'App/Constants/DefaultStrings'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import Moment from 'moment'
import I18n from 'App/Localization/I18n'
import CurrencySeperatorType from 'App/Constants/CurrencySeperatorType'
import CurrencyType from 'App/Constants/CurrencyType'
import {
  getTransactionTotal,
  getDefaultCurrency,
  currencyFormat,
  cryptocurrencyFormat,
} from 'App/Components/Utils/CurrencyDefinder'
import ViewShot from 'react-native-view-shot'
import Share from 'react-native-share'
import ActionSheet from 'App/Components/ActionSheet'

/**
 *  common list item component
 */
export default class TransListItem extends React.Component {
  render() {
    const {
      source,
      amountUSD,
      amountCrypo,
      currency,
      onPress,
      showExtraData,
      detailData,
      transaction,
      rate,
    } = this.props
    return (
      <View style={[styles.containerStyle, showExtraData ? styles.borderStyle : null]}>
        {/* transaction row view */}
        <ViewShot ref={(ref) => (this.viewShot = ref)} style={styles.viewShotBackground}>
          <TouchableOpacity style={styles.listItemStyle} onPress={onPress}>
            <View style={styles.imageContainerStyle}>{this.getImage(currency)}</View>
            <View style={styles.detailsContainer}>
              <View style={styles.listDataContainer}>
                <Text style={styles.firstRowTextStyle}>
                  {I18n.t(transaction.operationType)} {currency.toUpperCase()}
                </Text>

                <Text style={styles.firstRowTextStyle}>
                  {amountCrypo
                    ? cryptocurrencyFormat(parseFloat(amountCrypo)) + ' ' + currency.toUpperCase()
                    : currencyFormat(parseFloat(amountUSD), currency)}
                </Text>
              </View>
              <View style={styles.listDataContainer}>
                <Text numberOfLines={1} style={[styles.secondRowStyle, styles.flexForFirstText]}>
                  {source && source}
                </Text>
                {rate && rate.USD && (
                  <Text style={[styles.secondRowStyle, styles.flexForSecondText]}>
                    {getDefaultCurrency() === CurrencyType.USD
                      ? currencyFormat(parseFloat(amountCrypo * rate.USD))
                      : currencyFormat(parseFloat(amountCrypo * rate.EUR))}
                  </Text>
                )}
              </View>
              <View style={styles.listDataContainer}>
                <Text numberOfLines={1} style={styles.thirdRowStyle}>
                  {/* {transaction.transactionId && transaction.transactionId} */}
                </Text>
              </View>
            </View>
            {/* transaction list  detail view */}
          </TouchableOpacity>
          {showExtraData && (
            <View style={styles.cardContainer}>
              <Text style={styles.extraHeaderTextStyle}>{I18n.t('TYPE')}</Text>
              <Text style={styles.extraDetailTextStyle}>{I18n.t(transaction.operationType)}</Text>
              {detailData && detailData.from && detailData.from.name && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('FROM_FUND')}</Text>
                  <Text style={styles.extraDetailTextStyle}>{detailData.from.name}</Text>
                </View>
              )}

              {detailData && detailData.crypto_wallet && detailData.crypto_wallet.alias && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('FROM_FUND')}</Text>
                  <Text style={styles.extraDetailTextStyle}>{detailData.crypto_wallet.alias}</Text>
                </View>
              )}

              {detailData && detailData.wallet && detailData.wallet.alias && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('FROM_FUND')}</Text>
                  <Text style={styles.extraDetailTextStyle}>{detailData.wallet.alias}</Text>
                </View>
              )}

              {detailData && detailData.from_wallet && detailData.from_wallet.alias && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('FROM_FUND')}</Text>
                  <Text style={styles.extraDetailTextStyle}>{detailData.from_wallet.alias}</Text>
                </View>
              )}

              {detailData && detailData.fromWallet && detailData.fromWallet.name && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('FROM_FUND')}</Text>
                  <Text style={styles.extraDetailTextStyle}>{detailData.fromWallet.name}</Text>
                </View>
              )}

              {detailData && detailData.to && detailData.to.name && (
                <Text style={styles.extraHeaderTextStyle}>{I18n.t('TO')}</Text>
              )}
              {detailData && detailData.to && detailData.to.name && (
                <Text style={styles.extraDetailTextStyle}>{detailData.to.name}</Text>
              )}

              {detailData && detailData.bank_account && detailData.bank_account.name && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('TO')}</Text>
                  <Text style={styles.extraDetailTextStyle}>{detailData.bank_account.name}</Text>
                </View>
              )}

              {detailData && detailData.fiat_wallet && detailData.fiat_wallet.alias && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('TO')}</Text>
                  <Text style={styles.extraDetailTextStyle}>{detailData.fiat_wallet.alias}</Text>
                </View>
              )}

              {detailData && detailData.toWallet && detailData.toWallet.alias && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('TO')}</Text>
                  <Text style={styles.extraDetailTextStyle}>{detailData.toWallet.alias}</Text>
                </View>
              )}
              {detailData &&
                detailData.toWallet &&
                detailData.toWallet.address &&
                !detailData.toWallet.alias && (
                  <View>
                    <Text style={styles.extraHeaderTextStyle}>{I18n.t('TO')}</Text>
                    <Text numberOfLines={1} style={styles.extraDetailTextStyle}>
                      {detailData.toWallet.address}
                    </Text>
                  </View>
                )}

              {detailData && detailData.wire_code && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('WIRE_CODE')}</Text>
                  <Text style={styles.extraDetailTextStyle}>{detailData.wire_code}</Text>
                </View>
              )}
              {/* fiat amount */}
              {detailData && detailData.amount && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('AMOUNT')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {!detailData.rate
                      ? detailData.amount &&
                        currencyFormat(parseFloat(detailData.amount), currency.toUpperCase())
                      : detailData.amount}{' '}
                    {currency}
                  </Text>
                </View>
              )}
              {/* crypto amount */}
              {detailData && detailData.crypto_amount && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('AMOUNT')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {detailData.crypto_amount && detailData.crypto_amount} {currency}
                  </Text>
                </View>
              )}

              {/* rate for crypto currency */}
              {detailData && detailData.rate && detailData.fiat_wallet && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('RATE')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {detailData.rate[detailData.fiat_wallet.currency]}{' '}
                    {detailData.fiat_wallet.currency}
                  </Text>
                </View>
              )}
              {/* value for crypto currency */}
              {detailData &&
                detailData.fiat &&
                detailData.fiat_wallet &&
                detailData.rate &&
                detailData.fiat_wallet.currency && (
                  <View>
                    <Text style={styles.extraHeaderTextStyle}>{I18n.t('VALUE')}</Text>
                    <Text style={styles.extraDetailTextStyle}>
                      {parseFloat(detailData.fiat).toFixed(2)} {detailData.fiat_wallet.currency}
                    </Text>
                    <Text style={styles.extraDetailTextStyle}>
                      {detailData.crypto_amount && detailData.crypto_amount} {currency} {'='}{' '}
                      {currencyFormat(
                        detailData.crypto_amount * detailData.rate[detailData.fiat_wallet.currency],
                        detailData.fiat_wallet.currency
                      )}{' '}
                      {detailData.fiat_wallet.currency}
                    </Text>
                  </View>
                )}
              {/* fee for fiat currencies */}

              {/* value for crypto currency */}
              {detailData && detailData.currency && detailData.amount && detailData.rate && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('VALUE')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {parseFloat(detailData.amount)} {detailData.currency}
                  </Text>
                  {detailData.currency !== CurrencyType.USD &&
                    detailData.currency !== CurrencyType.EURO_NAME &&
                    detailData.currency !== CurrencyType.EURO && (
                      <Text style={styles.extraDetailTextStyle}>
                        {detailData.amount && detailData.amount} {currency} {'='}{' '}
                        {currencyFormat(detailData.amount * detailData.rate[getDefaultCurrency()])}{' '}
                      </Text>
                    )}
                </View>
              )}
              {/* fee for fiat currencies */}
              {detailData && detailData.fee_percent && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('FEE')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {this.getCalculatedFee(
                      detailData.fee_percent,
                      detailData.totalFiat ? detailData.totalFiat : detailData.total,
                      detailData.fiat_wallet && detailData.fiat_wallet.currency
                        ? detailData.fiat_wallet.currency
                        : currency
                    )}
                  </Text>
                </View>
              )}
              {/* fee for crytpo currencies */}
              {detailData && detailData.commission && detailData.wallet && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('FEE')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {currencyFormat(
                      parseFloat(detailData.commission).toFixed(2),
                      detailData.wallet
                        ? detailData.wallet.currency
                        : detailData.fiat_wallet
                        ? detailData.fiat_wallet.currency
                        : CurrencySeperatorType.USD
                    )}{' '}
                    {detailData.wallet
                      ? detailData.wallet.currency
                      : detailData.fiat_wallet
                      ? detailData.fiat_wallet.currency
                      : CurrencySeperatorType.USD}
                  </Text>
                </View>
              )}
              {/* value for fiat currencies */}
              {detailData && detailData.value && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('FEE')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {currencyFormat(parseFloat(detailData.value).toFixed(2), currency)} {currency}
                  </Text>
                </View>
              )}
              {detailData && detailData.total && !detailData.total.hasOwnProperty('USD') && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('TOTAL')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {currencyFormat(parseFloat(detailData.total).toFixed(2), currency)} {currency}
                  </Text>
                </View>
              )}

              {detailData && detailData.total && detailData.total.hasOwnProperty('USD') && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('TOTAL')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {getTransactionTotal(true, detailData)}
                  </Text>
                </View>
              )}
              {detailData && detailData.fiat_wallet && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('TOTAL')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {currencyFormat(
                      parseFloat(detailData.totalFiat ? detailData.totalFiat : 0).toFixed(2),
                      detailData.fiat_wallet.currency ? detailData.fiat_wallet.currency : currency
                    )}{' '}
                    {detailData.fiat_wallet.currency}
                  </Text>
                </View>
              )}
              {/* show date */}
              {detailData.date && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('DATE')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {Moment(detailData.date).format(DefaultStrings.DATE_FORMATTOR)}
                  </Text>
                </View>
              )}
              {detailData.created_at && (
                <View>
                  <Text style={styles.extraHeaderTextStyle}>{I18n.t('DATE')}</Text>
                  <Text style={styles.extraDetailTextStyle}>
                    {Moment(detailData.created_at).format(DefaultStrings.DATE_FORMATTOR)}
                  </Text>
                </View>
              )}
              {/* show comment */}
              <View>
                <Text style={styles.extraHeaderTextStyle}>{I18n.t('COMMENT')}</Text>
                <Text style={styles.extraDetailTextStyle}>{detailData.comment}</Text>
              </View>

              <View style={styles.hashTextContainer}>
                <Text style={styles.hashTextStyle}>{I18n.t('HASH')}</Text>
                <Text style={styles.hashTokenStyle}>{detailData.uuid && detailData.uuid}</Text>
              </View>
            </View>
          )}
        </ViewShot>
        {showExtraData && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.sendButtonStyle} onPress={this.takeScreeShot}>
              <Text style={styles.sendButtonTextStyle}>{I18n.t('SEND')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButtonStyle}>
              <Text style={styles.saveButtonTextStyle}>{I18n.t('SAVE_PDF')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  /**
   * take screen shot
   */
  takeScreeShot = () => {
    this.viewShot.capture().then(this.shareImage)
  }

  /**
   * share image for android and ios
   * @param {String} uri to share image
   */
  shareImage = (uri) => {
    if (Platform.OS === 'ios') {
      const url = 'file:/' + uri
      ActionSheet.showShareActionSheetWithOptions({ url: url }, () => {}, () => {})
    } else {
      const shareOptions = {
        title: I18n.t('SHARE_IMAGE'),
        type: 'png',
        url: uri, // path to local file
      }
      Share.open(shareOptions)
    }
  }

  /**
   * get calculated fee based on that percentage
   */
  getCalculatedFee = (percent, total, currency) => {
    return (
      currencyFormat(parseFloat(total) * (parseFloat(percent) / 100), currency) +
      ' (' +
      parseFloat(percent).toFixed(2) +
      '%)'
    )
  }

  /**
   * get image based on the currency
   * @param {String} currency Type (BITCOIN, DASH, ETH, USD, EURO)
   * @returns {View} return rendered based on the text
   */
  getImage = (currency) => {
    if (currency === DefaultStrings.ETHERIUM || currency === DefaultStrings.TYPE_ETH) {
      return <ETHLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    } else if (currency === DefaultStrings.DOLLAR || currency === DefaultStrings.TYPE_USD) {
      return <USDLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    } else if (currency === DefaultStrings.BITCOIN || currency === DefaultStrings.TYPE_BTC) {
      return <BitcoinLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    } else if (currency === DefaultStrings.DASH || currency === DefaultStrings.TYPE_DASH) {
      return <DashLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    } else {
      return <EuroLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    }
  }

  /**
   * get cuurency type based on operation type
   * @param {String} type Type (Buy, sold, received, sent)
   * @returns {String} return string based type
   */
  getType = (type) => {
    switch (type) {
      case DefaultStrings.BUY_SMALL:
        return DefaultStrings.BOUGHT
      case DefaultStrings.SOLD_SMALL:
        return DefaultStrings.SOLD
      case DefaultStrings.RECEIVED_SMALL:
        return DefaultStrings.RECEIVED
      case DefaultStrings.WITHDRAW:
        return DefaultStrings.SENT
      case DefaultStrings.DEPOSIT_LOWER:
        return DefaultStrings.DEPOSIT
    }
  }
}

TransListItem.propTypes = {
  type: PropTypes.string,
  source: PropTypes.string,
  amountUSD: PropTypes.number,
  amountCrypo: PropTypes.number,
  inVoice: PropTypes.string,
  currency: PropTypes.string,
  onPress: PropTypes.func,
  detailData: PropTypes.object,
  index: PropTypes.number,
  showExtraData: PropTypes.bool,
  rate: PropTypes.number,
  date: PropTypes.string,
  transactionId: PropTypes.string,
  transaction: PropTypes.object,
}
