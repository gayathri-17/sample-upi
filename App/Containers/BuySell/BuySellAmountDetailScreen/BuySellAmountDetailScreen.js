import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Modal, Alert } from 'react-native'
import handleConnectivityStatus from 'App/Services/NetworkService'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import ForwardArrow from 'App/Assets/Images/Svg/ForwardArrow'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Navigator from 'App/Services/NavigationService'
import styles from './BuySellAmountDetailScreenStyle'
import Line from 'App/Components/Line/Line'
import TransactionProgress from 'App/Assets/Images/Svg/TransactionProgress'
import {
  getCurrencyColor,
  getImage,
  getWalletName,
  showAlert,
  getMinutes,
} from 'App/Components/Utils/Functions'
import I18n from 'App/Localization/I18n'
import NavKeys from 'App/Constants/NavKeys'
import UserActions from 'App/Stores/User/Actions'
import { currencyFormat, cryptocurrencyFormat } from 'App/Components/Utils/CurrencyDefinder'

/**
 * crypto currency buy sell details screen where user see the fee of their transfer
 */
export class BuySellAmountDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoaderModal: false,
      expireTime: '',
    }
  }

  intervalCounter // used for cancelling timeout.

  componentDidMount() {
    this.startInterval()
  }

  /**
   * Called in component did mount to initilize the timer counter
   */
  startInterval = () => {
    const { expireTime } = this.props.navigation.state.params || {}
    this.setState({ expireTime })
    this.intervalCounter = setInterval(() => this.reduceTimer(), 1000)
  }

  /**
   * Reduce the timer shown in guarantee rate.
   * At last second the timer is cleared and
   * modal is shown to the user stating the rates have been changed.
   */
  reduceTimer = () => {
    if (this.state.expireTime < 2) {
      clearInterval(this.intervalCounter)
      Alert.alert(
        I18n.t('HEADER'),
        I18n.t('EXCHANGE_UPDATED'),
        [{ text: I18n.t('OK'), onPress: this.onPressBackward }],
        { cancelable: false }
      )
    }
    this.setState((prevState) => ({ expireTime: prevState.expireTime - 1 }))
  }

  /**
   * The counter is cleared if the user navigates back to some other page.
   */
  componentWillUnmount() {
    clearInterval(this.intervalCounter)
  }

  render() {
    const { transferDetails } = this.props
    return (
      <SafeAreaView style={styles.container}>
        {/* amount detail container */}
        <View style={[styles.detailContainer, styles.margin]}>
          <View style={styles.detailTransferContainer}>
            <View style={styles.detailTextContainer}>
              <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                {transferDetails.selectedType === DefaultStrings.BUY_SMALL
                  ? I18n.t('YOU_BUY')
                  : I18n.t('YOU_SELL')}
              </Text>
              {/* send amount */}
              <View>
                <Text style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}>
                  {currencyFormat(transferDetails.transfer, transferDetails.coin)}{' '}
                  {transferDetails.coin}
                </Text>
                {/* equal usd send amount */}
                <Text style={[styles.detailTextStyle, styles.textLeftAlign, styles.cryptoFontSize]}>
                  {cryptocurrencyFormat(this.calculateCryptoValue(transferDetails.transfer))}{' '}
                  {transferDetails.currency}
                </Text>
              </View>
            </View>
            {/* fee amount */}
            <View style={styles.detailTextContainer}>
              <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>{I18n.t('FEE')}</Text>
              <Text style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}>
                {currencyFormat(transferDetails.fee, transferDetails.coin)} {transferDetails.coin}
              </Text>
            </View>
          </View>
          <Line styleProp={styles.lineStyle} />
          <View style={styles.detailGetContainer}>
            <View style={styles.detailTextContainer}>
              <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                {I18n.t('YOU_PAY')}
              </Text>
              {/* pay amount */}
              <View>
                <Text style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}>
                  {currencyFormat(transferDetails.paid, transferDetails.coin)}{' '}
                  {transferDetails.coin}
                </Text>
                {/* equal crypto amount amount */}
                <Text style={[styles.detailTextStyle, styles.textLeftAlign, styles.cryptoFontSize]}>
                  {cryptocurrencyFormat(this.calculateCryptoValue(transferDetails.paid))}{' '}
                  {transferDetails.currency}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* rate for this transaction */}
        <View style={styles.rateContainer}>
          <Text style={styles.guarantyText}>
            {I18n.t('GURANTEED')} ({this.state.expireTime > 0 && getMinutes(this.state.expireTime)})
          </Text>
          <Text style={styles.rateCompareText}>
            1{' '}
            {transferDetails.currency +
              ' =  ' +
              currencyFormat(transferDetails.rate, transferDetails.coin)}
          </Text>
        </View>
        {/* from to view */}
        <View style={[styles.fromToContainer, styles.margin]}>
          <View style={styles.fromToHeaderContainer}>
            <Text style={styles.fromToTextStyle}>
              {transferDetails.selectedType === DefaultStrings.BUY_SMALL
                ? I18n.t('FROM_FUND')
                : I18n.t('TO')}
            </Text>
            <View style={styles.textLogoContainer}>
              {getImage(transferDetails.defaultCurrency)}
              <Text style={[styles.fromToAddressTextStyle, styles.leftMargin]}>
                {getWalletName(transferDetails.defaultCurrency)}
              </Text>
            </View>
          </View>
          <View style={styles.fromToHeaderContainer}>
            <Text style={styles.fromToTextStyle}>
              {transferDetails.selectedType === DefaultStrings.BUY_SMALL
                ? I18n.t('TO')
                : I18n.t('FROM_FUND')}
            </Text>
            <View style={styles.textLogoContainer}>
              {getImage(transferDetails.currency)}
              <Text style={[styles.fromToAddressTextStyle, styles.leftMargin]}>
                {transferDetails.to}
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
        <Modal transparent={true} visible={this.state.showLoaderModal}>
          {/* progress style */}
          <View
            style={[
              styles.parentContainer,
              { backgroundColor: getCurrencyColor(transferDetails.currency) },
            ]}
          >
            <View>
              <TransactionProgress
                width={styles.progressLogoStyle.width}
                height={styles.progressLogoStyle.height}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.transactionTextStyle}>{I18n.t('TRANSACTION')}</Text>
              <Text style={styles.inProgressTextStyle}>{I18n.t('IN_PROGRESS')}</Text>
            </View>
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
    const { transferDetails } = this.props
    return amount / transferDetails.rate
  }

  /**
   * After amount entered to move forwrd to authentication process
   * Navigate to next screen based on type of process
   */
  onPressForward = () => {
    const { transferDetails } = this.props
    if (!handleConnectivityStatus) {
      showAlert(I18n.t('NETWORK_ERROR'))
      return
    }
    this.props.confirmBuySell(
      transferDetails.selectedType,
      transferDetails.hash,
      this.confirmBuySellSuccess,
      this.confirmBuySellFailure
    )
  }

  /**
   * confirm buy sell success function
   * @param {Object} data success response from confirm buy sell api
   */
  confirmBuySellSuccess = (data) => {
    const { transferDetails } = this.props
    this.setState({ showLoaderModal: false })
    if (data.message.toUpperCase().includes(DefaultStrings.INCLUDES_SECURITY)) {
      Navigator.navigate(NavKeys.BUY_SELL_AUTHENTICATION, {
        security: data.data.methods,
        hashKey: transferDetails.hash,
      })
    } else {
      Navigator.navigate(NavKeys.BUY_SELL_TRANSACTION_SUCCESS)
    }
  }

  /**
   * confirm buy sell failure function
   */
  confirmBuySellFailure = (response) => {
    this.setState({ showLoaderModal: false })
    setTimeout(this.showErrorAlert.bind(this, response), 1000)
  }

  /**
   * show error alert
   */
  showErrorAlert = (response) => {
    response && response.data && response.data.message
      ? showAlert(response.data.message)
      : response.message
      ? showAlert(response.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }

  /**
   * Navigate to previous screen
   */
  onPressBackward = () => {
    Navigator.goBack()
  }
}

BuySellAmountDetailScreen.propTypes = {
  navigation: PropTypes.object,
  usdValue: PropTypes.object,
  transferDetails: PropTypes.object,
  confirmBuySell: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  usdValue: state.user.currentCurrency,
  transferDetails: state.user.transfer,
})

export const mapDispatchToProps = (dispatch) => ({
  confirmBuySell: (selectedType, hash, successFn, failureFn) =>
    dispatch(UserActions.confirmBuySell(selectedType, hash, successFn, failureFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuySellAmountDetailScreen)
