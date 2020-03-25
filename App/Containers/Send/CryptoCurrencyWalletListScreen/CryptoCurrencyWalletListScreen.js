import React, { Component } from 'react'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import styles from './CryptoCurrencyWalletListScreenStyle'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import { getGradientArrayByType } from 'App/Components/Utils/Functions'
import DashboardTitle from 'App/Components/DashboardTitle/DashboardTitle'
import WalletActions from 'App/Stores/WalletBalance/Actions'
import DownArrow from 'App/Assets/Images/Svg/DownArrow'
import UpArrow from 'App/Assets/Images/Svg/UpArrow'
import Line from 'App/Components/Line/Line'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from 'App/Theme'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import {
  cryptocurrencyFormat,
  getMergedCryptoBalanceByType,
} from 'App/Components/Utils/CurrencyDefinder'
import EmptyListView from 'App/Components/EmptyListView/EmptyListView'
import ErrorModal from 'App/Components/Modal/ErrorModal/ErrorModal'

/**
 *  user can see their Crypto currency wallet list here
 */

export class CryptoCurrencyWalletListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedType: props.navigation.state.params.currencyName,
      currencyName: props.navigation.state.params.currencyType,
      walletData: {},
      currencyWallet: [],
      selectedWalletItem: {},
      selectedHeaderName: '',
      contact: props.navigation.state.params.contact ? props.navigation.state.params.contact : null,
      apiRequestFailure: false,
      apiErrMessage: '',
    }
  }

  // Intial Function to get the wallet balance and transaction list
  componentDidMount() {
    this.getWalletList()
  }

  render() {
    // access current state
    const {
      walletData,
      currencyName,
      currencyWallet,
      apiRequestFailure,
      apiErrMessage,
    } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <DashboardTitle
          testID={'titleView'}
          title={I18n.t('SEND_SMALL')}
          currency={currencyName}
          subTitle={I18n.t('FROM').toLowerCase()}
        />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {currencyName === DefaultStrings.TYPE_BTC ? (
            <View>
              {walletData[1] !== undefined &&
                this.renderHeader(walletData[1], I18n.t('SEGWIT_ADDRESS'))}
              {walletData[2] !== undefined &&
                this.renderHeader(walletData[2], I18n.t('LEGASY_ADDRESS'))}
            </View>
          ) : (
            <View
              style={[
                styles.currencyContainer,
                currencyWallet.length === 0 ? styles.listContentContainer : {},
              ]}
            >
              {currencyWallet.length > 0 ? (
                currencyWallet.map((walletItem, index) => this.renderWalletItem(walletItem, index))
              ) : (
                <EmptyListView
                  height={styles.emptyListImageStyle.height}
                  width={styles.emptyListImageStyle.width}
                  color={
                    currencyName === DefaultStrings.TYPE_DASH
                      ? Colors.dashCurrency
                      : currencyName === DefaultStrings.TYPE_ETH
                      ? Colors.etheriumCurrency
                      : Colors.mediumTurquoise
                  }
                  testID={'emptyList'}
                />
              )}
            </View>
          )}
          {/* api request failure modal */}
          <ErrorModal
            isShow={apiRequestFailure}
            isHideClose={false}
            onCLickClose={this.goBack}
            onClickSubmit={this.getWalletList}
            submitButtonTitle={I18n.t('RETRY')}
            errorMessage={apiErrMessage || I18n.t('NETWORK_ERROR')}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   * handle api failure response
   * @param {String} error failure response text
   */
  handleApiFailure = (error) => {
    this.setState({ apiErrMessage: error, apiRequestFailure: true })
  }

  /**
   * navigate to previous screen
   */
  goBack = () => {
    Navigator.goBack()
  }

  /**
   * get selected currency wallet list
   */
  getWalletList = () => {
    this.setState({ apiRequestFailure: false })
    this.props.getBalance(this.state.currencyName, this.getBallance, this.handleApiFailure)
  }

  /**
   * get crypto balance by type
   * @param {*} data balance list based on type
   */
  getBallance = (data) => {
    const balanceData = getMergedCryptoBalanceByType(data, this.state.currencyName)
    this.setState({
      walletData: balanceData.groupedData,
      currencyWallet: balanceData.mergedData,
    })
  }

  /**
   * render header view by the Type
   * @param {Object} item
   * @param {String} name
   * @returns rendered HeaderView
   */
  renderHeader = (item, name) => {
    // access current state
    const { selectedHeaderName } = this.state

    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={this.onHeaderClicked.bind(this, name)}
          style={styles.headerTitleContaoner}
        >
          <Text style={styles.walletTitleText}>{name}</Text>
          {selectedHeaderName === name ? (
            <UpArrow width={styles.arrowIcon.width} height={styles.arrowIcon.height} />
          ) : (
            <DownArrow width={styles.arrowIcon.width} height={styles.arrowIcon.height} />
          )}
        </TouchableOpacity>
        {selectedHeaderName === name &&
          (item.length > 0 ? (
            item.map((walletItem, index) => this.renderWalletItem(walletItem, index))
          ) : (
            <View style={styles.emptyListHolder}>
              <EmptyListView
                height={styles.emptyListImageStyle.height}
                width={styles.emptyListImageStyle.width}
                color={Colors.bitcoinCurrency}
                testIS={'bitcoinEmptyList'}
              />
            </View>
          ))}
        <Line styleProp={styles.lineStyle} />
      </View>
    )
  }

  /**
   * render item view
   * @param {Object} item
   * @param {number} index
   * @returns rendered wallet item
   */
  renderWalletItem = (item, index) => {
    // to access current state
    const { selectedWalletItem, currencyName } = this.state

    // to access current props
    const isSelectedItem = selectedWalletItem.address === item.address
    const selectedGradientColor = getGradientArrayByType(currencyName)
    return (
      <LinearGradient
        colors={
          isSelectedItem
            ? [selectedGradientColor[0], selectedGradientColor[1]]
            : [Colors.ghostWhite, Colors.ghostWhite]
        }
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.8, y: 1 }}
        style={isSelectedItem ? styles.gradientSelectedContainer : styles.gradientContainer}
      >
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onWalletItemClicked.bind(this, item)}
        >
          <View style={styles.nameContainer}>
            <Text
              style={[
                styles.nameText,
                styles.unselectedItemName,
                currencyName === DefaultStrings.TYPE_BTC
                  ? styles.unselectednameBTC
                  : currencyName === DefaultStrings.TYPE_ETH
                  ? styles.unselectednameETH
                  : styles.unselectednameDASH,
                isSelectedItem ? styles.selectedNameText : {},
              ]}
            >
              {item.alias}
            </Text>
            <Text
              style={[
                styles.amountText,
                styles.unselectedItemName,
                currencyName === DefaultStrings.TYPE_BTC
                  ? styles.unselectednameBTC
                  : currencyName === DefaultStrings.TYPE_ETH
                  ? styles.unselectednameETH
                  : styles.unselectednameDASH,
                isSelectedItem ? styles.selectedNameText : {},
              ]}
            >
              {cryptocurrencyFormat(item.balance) + ' ' + currencyName}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text
              style={[
                styles.nameText,
                styles.unselectedItemAddress,
                isSelectedItem ? styles.selectedNameText : {},
              ]}
              numberOfLines={1}
            >
              {item.address}
            </Text>
            <Text
              style={[
                styles.amountText,
                styles.unselectedItemAddress,
                isSelectedItem ? styles.selectedNameText : {},
              ]}
            >
              {item.fiatBalance}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    )
  }

  /**
   * user clicked wallet item
   * @param {Object} item
   */
  onWalletItemClicked = (item) => {
    this.setState({
      selectedWalletItem: item,
    })
    Navigator.navigate(NavKeys.CRYPTO_AMOUNT_VIEW, {
      currencyName: this.state.currencyName,
      wallet: item,
      contact: this.state.contact,
    })
  }

  /**
   * user clicked header item
   * @param {String} name selected header name
   */
  onHeaderClicked = (name) => {
    const isSameDataSelected = this.state.selectedHeaderName === name
    this.setState({
      selectedHeaderName: isSameDataSelected ? '' : name,
    })
  }
}
CryptoCurrencyWalletListScreen.propTypes = {
  isLoading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  getBalance: PropTypes.func,
  balance: PropTypes.object,
  btcUsdValue: PropTypes.number,
  ethUsdValue: PropTypes.number,
  dashUsdValue: PropTypes.number,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  isLoading: state.common.isLoading,
  balance: state.wallet.getWalletBalance,
  btcUsdValue: state.user.currentCurrency.BTC.base,
  ethUsdValue: state.user.currentCurrency.ETH.base,
  dashUsdValue: state.user.currentCurrency.DASH.base,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getBalance: (coin, successFn, failureFn) =>
    dispatch(WalletActions.getBitcoinBalance(coin, successFn, failureFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CryptoCurrencyWalletListScreen)
