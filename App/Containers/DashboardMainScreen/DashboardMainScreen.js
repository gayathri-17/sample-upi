import React from 'react'
import { connect } from 'react-redux'
import styles from './DashboardMainScreenStyle'
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
  NativeModules,
} from 'react-native'
import DefaultStrings from 'App/Constants/DefaultStrings'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import WalletActions from 'App/Stores/WalletBalance/Actions'
import UserActions from 'App/Stores/User/Actions'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import Swiper from 'App/Components/Swiper/Swiper'
import LinearGradient from 'react-native-linear-gradient'
import Colors from 'App/Theme/Colors'
import { PropTypes } from 'prop-types'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import TransListItem from 'App/Components/TransListItem/TransListItem'
import NavKeys from 'App/Constants/NavKeys'
import Navigator from 'App/Services/NavigationService'
import I18n from 'App/Localization/I18n'
import { getFontSize } from 'App/Components/Utils/Functions'
import { hapticVibrate } from 'App/APIs/HapticFeedback'
import {
  getDashboardBalanceByType,
  getDashboardDefaultLogo,
  getDefaultCurrency,
} from 'App/Components/Utils/CurrencyDefinder'
import CurrencyType from 'App/Constants/CurrencyType'
import EmptyListView from 'App/Components/EmptyListView/EmptyListView'
import { TABS } from 'App/Constants/TransactionStatus'
import ErrorModal from 'App/Components/Modal/ErrorModal/ErrorModal'
import { Config } from 'App/Config'

/**
 * User can see there balance by their type and transaction list
 */

export class DashboardMainScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      walletDots: [
        I18n.t('TYPE_ALL'),
        I18n.t('TYPE_BTC'),
        I18n.t('TYPE_DASH'),
        I18n.t('TYPE_ETH'),
        I18n.t('TYPE_USD'),
        I18n.t('TYPE_EURO'),
      ],
      walletTitle: [
        I18n.t('TOTAL_HOLDINGS'),
        I18n.t('BITCOIN_BALANCE'),
        I18n.t('DASH_BALANCE'),
        I18n.t('ETHEREUM_BALANCE'),
        I18n.t('USD_BALANCE'),
        I18n.t('EURO_BALANCE'),
      ],
      selectedListType: I18n.t('ALL'),
      transactionList: [],
      isOpen: false,
      selectedIndex: -1,
      totalBalance: {},
      profileFailure: false,
      walletListFailure: false,
      errorMessage: '',
    }
  }
  // Intial Function to get the wallet balance and transaction list
  componentDidMount() {
    this.props.getProfile(this.getValueAndBalance, this.ProfileNetworkFailure)
  }

  // update the state value for showing the error model
  ProfileNetworkFailure = () => {
    this.setState({ profileFailure: true })
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    if (prevProps.transactionList !== this.props.transactionList) {
      this.setState({ transactionList: this.props.transactionList })
    } else if (prevProps.transactionDetail !== this.props.transactionDetail) {
      this.setState({ isOpen: true })
      this.flatListRef.scrollToIndex({ animated: true, index: this.state.selectedIndex })
    } else if (prevProps.totalBalance !== this.props.totalBalance)
      this.setState({ totalBalance: this.props.totalBalance })
  }

  render() {
    // To access current component state with simplified field of state
    const {
      walletDots,
      walletTitle,
      selectedListType,
      transactionList,
      totalBalance,
      profileFailure,
      walletListFailure,
      errorMessage,
    } = this.state
    // To access Props datas
    const { profile } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* Two way warning alert */}
          {profile && profile.tfaActive === 0 && (
            <View style={styles.gradientContainer}>
              <LinearGradient
                colors={[Colors.gradientRed, Colors.pink]}
                style={styles.gradientStyle}
                start={{ x: 0.5, y: -1 }}
                end={{ x: 1, y: -0.4 }}
              >
                <Text style={styles.twoway_title_text}>{I18n.t('TWO_WAY_TITLE')}</Text>
                <Text style={styles.twoway_content_text}>{I18n.t('TWO_WAY_CONTENT')}</Text>
                <TouchableOpacity
                  style={[styles.centerContent, styles.secureButtonContainer]}
                  onPress={this.requestTfa}
                >
                  <Text style={styles.buttonText}>{I18n.t('SECURE_ACCOUNT')}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
          {/* Balance view container */}
          <View style={styles.walletBalanceMainContainer}>
            <View style={styles.walletBalanceContainer}>
              <Swiper
                testID={'walletBalanceSwiper'}
                loop={false}
                dots={walletDots}
                style={styles.balanceSwiperStyle}
                height={styles.swiperStyle.height}
                viewTitles={walletTitle}
                onIndexChanged={() => this.startVibrate()}
              >
                {this.getBalanceSwipeContainerByType(
                  I18n.t('TYPE_ALL'),
                  totalBalance ? getDashboardBalanceByType(CurrencyType.ALL) : '0'
                )}
                {this.getBalanceSwipeContainerByType(
                  I18n.t('TYPE_BTC'),
                  totalBalance ? getDashboardBalanceByType(CurrencyType.BITCOIN) : '0'
                )}
                {this.getBalanceSwipeContainerByType(
                  I18n.t('TYPE_DASH'),
                  totalBalance ? getDashboardBalanceByType(CurrencyType.DASH) : '0'
                )}
                {this.getBalanceSwipeContainerByType(
                  I18n.t('TYPE_ETH'),
                  totalBalance ? getDashboardBalanceByType(CurrencyType.ETH) : '0'
                )}
                {this.getBalanceSwipeContainerByType(
                  I18n.t('TYPE_USD'),
                  totalBalance ? getDashboardBalanceByType(CurrencyType.USD) : '0'
                )}
                {this.getBalanceSwipeContainerByType(
                  I18n.t('TYPE_EURO'),
                  totalBalance ? getDashboardBalanceByType(CurrencyType.EURO) : '0'
                )}
              </Swiper>
            </View>
            <LinearGradient
              colors={[Colors.ghostWhite, Colors.white]}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 0, y: 1 }}
              style={styles.borderLineStyle}
            />
          </View>
          {/* Transaction list type select container */}
          {this.renderWalletTitle()}
          <View style={[styles.listContainer, styles.rowStyle]}>
            {/* All type select button */}
            <TouchableOpacity
              testID={'AllSelect'}
              style={Platform.OS === 'android' ? styles.margins : {}}
              onPress={() => this.onListSelect(I18n.t('ALL'))}
            >
              <View
                style={
                  selectedListType === I18n.t('ALL')
                    ? styles.dotActiveContainer
                    : styles.dotNormalContainer
                }
              >
                <Text
                  style={
                    selectedListType === I18n.t('ALL') ? styles.activeDotText : styles.normalDotText
                  }
                >
                  {I18n.t('ALL')}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Sent type select button */}
            <TouchableOpacity
              testID={'SentSelect'}
              style={Platform.OS === 'android' ? styles.margins : {}}
              onPress={() => this.onListSelect(I18n.t('SENT'))}
            >
              <View
                style={
                  selectedListType === I18n.t('SENT')
                    ? styles.dotActiveContainer
                    : styles.dotNormalContainer
                }
              >
                <Text
                  style={
                    selectedListType === I18n.t('SENT')
                      ? styles.activeDotText
                      : styles.normalDotText
                  }
                >
                  {I18n.t('SENT')}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Received type select button */}
            <TouchableOpacity
              testID={'ReceivedSelect'}
              style={Platform.OS === 'android' ? styles.margins : {}}
              onPress={() => this.onListSelect(I18n.t('RECEIVED'))}
            >
              <View
                style={
                  selectedListType === I18n.t('RECEIVED')
                    ? styles.dotActiveContainer
                    : styles.dotNormalContainer
                }
              >
                <Text
                  style={
                    selectedListType === I18n.t('RECEIVED')
                      ? styles.activeDotText
                      : styles.normalDotText
                  }
                >
                  {I18n.t('RECEIVED')}
                </Text>
              </View>
            </TouchableOpacity>
            {/* buy type select button */}
            <TouchableOpacity
              testID={'BuySelect'}
              style={Platform.OS === 'android' ? styles.margins : {}}
              onPress={() => this.onListSelect(I18n.t('BOUGHT'))}
            >
              <View
                style={
                  selectedListType === I18n.t('BOUGHT')
                    ? styles.dotActiveContainer
                    : styles.dotNormalContainer
                }
              >
                <Text
                  style={
                    selectedListType === I18n.t('BOUGHT')
                      ? styles.activeDotText
                      : styles.normalDotText
                  }
                >
                  {I18n.t('BOUGHT')}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Sold type select button */}
            <TouchableOpacity
              testID={'SoldSelect'}
              style={Platform.OS === 'android' ? styles.margins : {}}
              onPress={() => this.onListSelect(I18n.t('SOLD'))}
            >
              <View
                style={
                  selectedListType === I18n.t('SOLD')
                    ? styles.dotActiveContainer
                    : styles.dotNormalContainer
                }
              >
                <Text
                  style={
                    selectedListType === I18n.t('SOLD')
                      ? styles.activeDotText
                      : styles.normalDotText
                  }
                >
                  {I18n.t('SOLD')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Transaction list */}
          <FlatList
            ref={(ref) => {
              this.flatListRef = ref
            }}
            style={styles.listContainer}
            contentContainerStyle={transactionList.length === 0 ? styles.listContentContainer : {}}
            data={transactionList}
            ListEmptyComponent={
              <EmptyListView
                height={styles.emptyListImageStyle.height}
                width={styles.emptyListImageStyle.width}
                color={Colors.mediumTurquoise}
                testID={'emptyList'}
              />
            }
            ListFooterComponent={
              transactionList.length > 0 && (
                <View style={styles.centerStyle}>
                  <Text style={styles.seeMoreTextStyle} onPress={this.openStatements}>
                    {I18n.t('SEE_MORE')}
                  </Text>
                </View>
              )
            }
            renderItem={this.renderData}
            extraData={this.state.isOpen}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <ErrorModal
          isShow={profileFailure || walletListFailure}
          isHideClose={true}
          onClickSubmit={this.onErrorModalSubmit}
          submitButtonTitle={I18n.t('RETRY')}
          errorMessage={walletListFailure ? errorMessage : I18n.t('NETWORK_ERROR')}
        />
      </SafeAreaView>
    )
  }

  onErrorModalSubmit = () => {
    if (this.state.profileFailure)
      this.props.getProfile(this.getValueAndBalance, this.ProfileNetworkFailure)
    else this.getValueAndBalance()
    this.setState({ profileFailure: false, walletListFailure: false })
  }

  /**
   * open statements page
   */
  openStatements = () => {
    Navigator.navigate(TABS.TAB_STATEMENTS)
  }

  /**
   * request tfa secret by api request
   */
  requestTfa = () => {
    this.props.getTfaVerificationToken(this.navigateToAddTfa)
  }

  /**
   * navigate to change
   */
  navigateToAddTfa = (data) => {
    Navigator.navigate(NavKeys.CHANGE_TFA, {
      address: data.data.secret,
      token: null,
      refreshProfile: this.refreshProfile,
    })
  }

  /**
   * refresh profile after tfa update
   */
  refreshProfile = () => {
    this.props.getProfile()
  }

  /**
   * render flatlist data
   * @param {Object} item refers list itearation object
   * @returns {TransListItem} returns list iteration view
   */
  renderData = ({ item, index }) => {
    return (
      <TransListItem
        type={item.operationType}
        currency={item.currency}
        source={item.source}
        amountUSD={item.amountUsd}
        amountCrypo={item.amountCrypto}
        inVoice={item.address}
        detailData={this.props.transactionDetail}
        showExtraData={index === this.state.selectedIndex && this.state.isOpen}
        rate={item.rate}
        date={item.date}
        transaction={item}
        transactionId={item.transactionId}
        onPress={() => this.onPressListItem(item, index)}
      />
    )
  }

  /**
   * get currency value and balance
   */
  getValueAndBalance = () => {
    NativeModules.SharedStorage.set(
      JSON.stringify({
        url: Config.API_URL,
        defaultCurrency: getDefaultCurrency(),
        userToken: this.props.token,
      })
    )
    this.props.getWalletBalance(this.balanceNetwordFailure)
  }

  /** update the state value for showing the error model
   * @param {String} message error message
   * */
  balanceNetwordFailure = (message) => {
    this.setState({
      walletListFailure: true,
      errorMessage: message,
    })
  }

  /**
   * renders transaction title
   * @returns {View} returns text title
   */
  onPressListItem(item, index) {
    if (this.state.selectedIndex === index && this.state.isOpen) {
      this.setState({ selectedIndex: -1, isOpen: !this.state.isOpen })
      return
    }
    if (item.operationType.includes(DefaultStrings.FIAT)) {
      this.props.getTransactionDetail(DefaultStrings.FIAT_TRANSFER_TRANSACTIONS, item.transactionId)
    } else if (item.operationType === DefaultStrings.CRYPTO_IN) {
      this.props.getTransactionDetail(DefaultStrings.CRYPTO_IN_CAPS, item.transactionId)
    } else if (item.operationType === DefaultStrings.CRYPTO_OUT) {
      this.props.getTransactionDetail(DefaultStrings.CRYPTO_OUT_CAPS, item.transactionId)
    } else {
      this.props.getTransactionDetail(item.operationType, item.transactionId)
    }
    this.setState({ selectedIndex: index })
  }

  /**
   * renders transaction title
   * @returns {View} returns text title
   */
  renderWalletTitle = () => {
    return (
      <View style={styles.walletTitleContainer}>
        <View style={styles.walletTitleImageContainer}>
          <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
        </View>
        <Text style={styles.walletTitleText}>{I18n.t('RECENT_TRANSACTIONS')}</Text>
      </View>
    )
  }

  /**
   * Change selected list type
   * @param {String} text refers selected list type
   */
  onListSelect = (text) => {
    this.setState({
      selectedListType: text,
      transactionList: [],
      selectedIndex: -1,
      isOpen: !this.state.isOpen,
    })
    const { transactionList } = this.props
    // change list data based on text value
    switch (text) {
      case I18n.t('SENT'): {
        return this.setState({
          transactionList: transactionList.filter((it) =>
            [
              DefaultStrings.WITHDRAW_SMALL,
              DefaultStrings.SENT_SMALL,
              DefaultStrings.FIAT_OUT,
              DefaultStrings.CRYPTO_OUT,
            ].includes(it.operationType)
          ),
        })
      }
      case I18n.t('RECEIVED'): {
        return this.setState({
          transactionList: transactionList.filter((it) =>
            [
              DefaultStrings.RECEIVED_SMALL,
              DefaultStrings.DEPOSIT_LOWER,
              DefaultStrings.FIAT_IN,
              DefaultStrings.CRYPTO_IN,
            ].includes(it.operationType)
          ),
        })
      }
      case I18n.t('BOUGHT'): {
        return this.setState({
          transactionList: transactionList.filter(
            (it) => it.operationType === DefaultStrings.BUY_SMALL
          ),
        })
      }
      case I18n.t('SOLD'): {
        return this.setState({
          transactionList: transactionList.filter(
            (it) => it.operationType === DefaultStrings.SELL_SMALL
          ),
        })
      }
      case I18n.t('ALL'): {
        return this.setState({ transactionList: transactionList })
      }
    }
  }

  /**
   * start vibration while scroll changed
   */
  startVibrate = () => {
    hapticVibrate()
  }

  /**
   * render swipe View depending on their type
   *
   * @param {String} type currency Type (BITCOIN, DASH, ETH, USD, EURO)
   * @param {String} balance balance amount
   * @returns {View} return rendered view by their input
   */
  getBalanceSwipeContainerByType = (type, balance) => {
    const fontSize = getFontSize(
      balance.toString(),
      styles.balanceText.width,
      styles.balanceText.fontSize,
      1.3
    )
    switch (type) {
      // render Defauld and USD scroll container
      case I18n.t('TYPE_ALL'):
      case I18n.t('TYPE_USD'):
        return (
          <View testID={'USD'} style={[styles.swipeContainer]}>
            {type === I18n.t('TYPE_USD') ? (
              <USDLogo
                width={styles.balanceImageStyle.width}
                height={styles.balanceImageStyle.height}
              />
            ) : (
              getDashboardDefaultLogo(styles.balanceImageStyle)
            )}
            <Text
              numberOfLines={1}
              style={[
                styles.balanceText,
                Platform.OS !== DefaultStrings.PLATFORM_ANDROID ? styles.balanceTextiOS : {},
                { fontSize: fontSize },
              ]}
            >
              {balance}
            </Text>
          </View>
        )
      // render Defauld and Bitcoin scroll container
      case I18n.t('TYPE_BTC'):
        return (
          <View testID={'Bitcoin'} style={[styles.swipeContainer]}>
            <BitcoinLogo
              width={styles.balanceImageStyle.width}
              height={styles.balanceImageStyle.height}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.balanceText,
                Platform.OS !== DefaultStrings.PLATFORM_ANDROID ? styles.balanceTextiOS : {},
                { fontSize: fontSize },
              ]}
            >
              {balance}
            </Text>
          </View>
        )
      // render Defauld and Dash scroll container
      case I18n.t('TYPE_DASH'):
        return (
          <View testID={'Dash'} style={[styles.swipeContainer]}>
            <DashLogo
              width={styles.balanceImageStyle.width}
              height={styles.balanceImageStyle.height}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.balanceText,
                Platform.OS !== DefaultStrings.PLATFORM_ANDROID ? styles.balanceTextiOS : {},
                { fontSize: fontSize },
              ]}
            >
              {balance}
            </Text>
          </View>
        )
      // render Defauld and ETH scroll container
      case I18n.t('TYPE_ETH'):
        return (
          <View testID={'Eth'} style={[styles.swipeContainer]}>
            <ETHLogo
              width={styles.balanceImageStyle.width}
              height={styles.balanceImageStyle.height}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.balanceText,
                Platform.OS !== DefaultStrings.PLATFORM_ANDROID ? styles.balanceTextiOS : {},
                { fontSize: fontSize },
              ]}
            >
              {balance}
            </Text>
          </View>
        )
      // render Defauld and Euro scroll container
      case I18n.t('TYPE_EURO'):
        return (
          <View testID={'Euro'} style={[styles.swipeContainer]}>
            <EuroLogo
              width={styles.balanceImageStyle.width}
              height={styles.balanceImageStyle.height}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.balanceText,
                Platform.OS !== DefaultStrings.PLATFORM_ANDROID ? styles.balanceTextiOS : {},
                { fontSize: fontSize },
              ]}
            >
              {balance}
            </Text>
          </View>
        )
    }
  }
}

DashboardMainScreen.propTypes = {
  getWalletBalance: PropTypes.func,
  isLoading: PropTypes.bool,
  walletBalance: PropTypes.object,
  transactionList: PropTypes.array,
  getProfile: PropTypes.func,
  getTransactionDetail: PropTypes.func,
  transactionDetail: PropTypes.object,
  profile: PropTypes.object,
  totalBalance: PropTypes.object,
  getTfaVerificationToken: PropTypes.object,
  token: PropTypes.String,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  isLoading: state.wallet.dashboardIsLoading,
  walletBalance: state.wallet.getWalletBalance,
  transactionList: state.wallet.transactionList,
  transactionDetail: state.wallet.transactionDetail,
  profile: state.user.onBoardingProfile,
  totalBalance: state.user.getTotalBalance,
  token: state.user.token,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getWalletBalance: (failureFn) => dispatch(WalletActions.getWalletBalance(failureFn)),
  getProfile: (successFn, failureFn) => dispatch(UserActions.getProfile(successFn, failureFn)),
  getTransactionDetail: (operationType, id) =>
    dispatch(WalletActions.getTransactionDetail(operationType, id)),
  getTfaVerificationToken: (successFn) => dispatch(UserActions.getTfaVerificationToken(successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardMainScreen)
