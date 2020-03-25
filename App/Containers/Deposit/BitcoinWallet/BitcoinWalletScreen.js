import React, { Component } from 'react'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import styles from './BitcoinWalletScreenStyle'
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
  getMergedCryptoBalanceByType,
  cryptocurrencyFormat,
} from 'App/Components/Utils/CurrencyDefinder'
import EmptyListView from 'App/Components/EmptyListView/EmptyListView'

/**
 *  user can see their Bitcoin walletBalance here
 */

export class BitcoinWalletScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedType: props.navigation.state.params.selectedType,
      screenType: props.navigation.state.params.screenType,
      walletData: {},
      selectedWalletItem: {},
      selectedHeaderName: '',
      currencyWallet: [],
    }
  }

  // Intial Function to get the wallet balance and transaction list
  componentDidMount() {
    this.props.getBTCBalance(this.state.screenType, this.getBallance)
  }

  render() {
    // access current state
    const { selectedType, walletData, screenType, currencyWallet } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <DashboardTitle
          testID={'titleView'}
          title={I18n.t('DEPOSIT')}
          currency={screenType}
          subTitle={I18n.t('FROM')}
          name={selectedType}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{I18n.t('WALLET_NAME')}</Text>
          <Text style={styles.titleStyle}>{I18n.t('BALANCE')}</Text>
        </View>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {screenType === DefaultStrings.TYPE_BTC ? (
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
                    screenType === DefaultStrings.TYPE_DASH
                      ? Colors.dashCurrency
                      : screenType === DefaultStrings.TYPE_ETH
                      ? Colors.etheriumCurrency
                      : Colors.mediumTurquoise
                  }
                  testID={'emptyList'}
                />
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
  /**
   * get crypto balance by type
   * @param {*} data balance list based on type
   */
  getBallance = (data) => {
    const balanceData = getMergedCryptoBalanceByType(data, this.state.screenType)
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
                testID={'bitcoinEmptyList'}
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
    const { selectedWalletItem, screenType } = this.state

    // to access current props
    const isSelectedItem = selectedWalletItem.address === item.address
    const selectedGradientColor = getGradientArrayByType(screenType)
    return (
      <LinearGradient
        key={index}
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
                screenType === DefaultStrings.TYPE_BTC
                  ? styles.unselectednameBTC
                  : screenType === DefaultStrings.TYPE_ETH
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
                screenType === DefaultStrings.TYPE_BTC
                  ? styles.unselectednameBTC
                  : screenType === DefaultStrings.TYPE_ETH
                  ? styles.unselectednameETH
                  : styles.unselectednameDASH,
                isSelectedItem ? styles.selectedNameText : {},
              ]}
            >
              {cryptocurrencyFormat(item.balance) + ' ' + screenType}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text
              numberOfLines={1}
              style={[
                styles.nameText,
                styles.unselectedItemAddress,
                isSelectedItem ? styles.selectedNameText : {},
              ]}
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
              {' ' + item.fiatBalance}
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
    // to access current state
    const { selectedType, screenType } = this.state

    if (selectedType === DefaultStrings.OUTSIDE_MERCURY_CASH)
      Navigator.navigate(NavKeys.DEPOSIT_QRCODE_SCREEN, {
        selectedType: selectedType,
        walletAaddress: item.address,
        screenType: screenType,
      })
    else
      Navigator.navigate(NavKeys.REQUEST_TO_CONTACT_SCREEN, {
        screenType: screenType,
        selectedType: selectedType,
        walletAaddress: item.address,
        cryptoBalance: item.balance,
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
BitcoinWalletScreen.propTypes = {
  isLoading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  getBTCBalance: PropTypes.func,
  etheriuBalance: PropTypes.array,
  bitCoinBalance: PropTypes.array,
  dashBalance: PropTypes.array,
  btcUsdValue: PropTypes.number,
  ethUsdValue: PropTypes.number,
  dashUsdValue: PropTypes.number,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  isLoading: state.common.isLoading,
  bitCoinBalance: state.wallet.getWalletBalance.BTC,
  etheriuBalance: state.wallet.getWalletBalance.ETH,
  dashBalance: state.wallet.getWalletBalance.DASH,
  btcUsdValue: state.user.currentCurrency.BTC.base,
  ethUsdValue: state.user.currentCurrency.ETH.base,
  dashUsdValue: state.user.currentCurrency.DASH.base,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getBTCBalance: (screenType, successFn) =>
    dispatch(WalletActions.getBitcoinBalance(screenType, successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BitcoinWalletScreen)
