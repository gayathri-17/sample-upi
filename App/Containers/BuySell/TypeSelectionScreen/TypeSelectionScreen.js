import React from 'react'
import styles from './TypeSelectionScreenStyle'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { PropTypes } from 'prop-types'
import handleConnectivityStatus from 'App/Services/NetworkService'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import Line from 'App/Components/Line/Line'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import BitcoinLogoDisable from 'App/Assets/Images/Svg/BitcoinLogoDisable'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import DashLogoDisable from 'App/Assets/Images/Svg/DashLogoDisable'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import ETHLogoDisable from 'App/Assets/Images/Svg/ETHLogoDisable'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import I18n from 'App/Localization/I18n'
import Carousel from 'react-native-snap-carousel'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import DefaultStrings from 'App/Constants/DefaultStrings'
import { showAlert } from 'App/Components/Utils/Functions'
import { hapticVibrate } from 'App/APIs/HapticFeedback'
import { connect } from 'react-redux'
import UserActions from 'App/Stores/User/Actions'

/**
 * User can select crypto currency  buy or sell
 */
export class TypeSelectionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedType: props.navigation.state.params.type,
      carouselItems: [
        {
          title: I18n.t('TYPE_BTC'),
          label: DefaultStrings.TYPE_BTC,
        },
        {
          title: I18n.t('TYPE_ETH'),
          label: DefaultStrings.TYPE_ETH,
        },
        {
          title: I18n.t('TYPE_DASH'),
          label: DefaultStrings.TYPE_DASH,
        },
      ],
      selectedIndex: 0,
    }
  }

  render() {
    const { selectedType, carouselItems } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {/* title text */}
        <View style={styles.titleContainer}>
          <View style={styles.titleDotContainer}>
            <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
            <Text style={styles.titleTxt}>
              {selectedType === DefaultStrings.BUY_SMALL
                ? I18n.t('I_WANT_TO_BUY')
                : I18n.t('I_WANT_TO_SELL')}
            </Text>
          </View>
          <Line styleProp={styles.titleLine} />
        </View>
        {/* select conainer */}
        <View style={styles.selectViewStyle}>
          <Carousel
            ref={(c) => {
              this._carousel = c
            }}
            data={carouselItems}
            renderItem={this._renderItem}
            sliderWidth={styles.sliderStyle.width}
            itemWidth={styles.itemContainer.width}
            inactiveSlideOpacity={0.5}
            inactiveSlideScale={0.8}
            removeClippedSubviews={false}
            onSnapToItem={(index) => this.sliderChange(index)}
            layout={'default'}
          />
          {/* cancel image */}
          <TouchableOpacity onPress={this.goBack}>
            <BackArrow width={styles.cancelImage.width} height={styles.cancelImage.height} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  /**
   * navigate to buy sell select screen
   */
  goBack = () => {
    Navigator.goBack()
  }

  /**
   * render the UI based on the item
   * @param {Object} item given item by indx
   * @param {number} index current item index
   */
  _renderItem = ({ item, index }) => {
    const isSelectedIndex = this.state.selectedIndex === index
    switch (item.title) {
      case I18n.t('TYPE_BTC'):
        return (
          <View style={styles.itemContainer}>
            {isSelectedIndex ? (
              <TouchableOpacity onPress={this.onCurrencyClicked.bind(this, item.label)}>
                <BitcoinLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
              </TouchableOpacity>
            ) : (
              <BitcoinLogoDisable
                width={styles.imageStyle.width}
                height={styles.imageStyle.height}
              />
            )}
            <Text
              style={[
                styles.CurrencyText,
                isSelectedIndex ? styles.bitCoinText : styles.textDisable,
              ]}
            >
              {I18n.t('BITCOIN')}
            </Text>
          </View>
        )
      case I18n.t('TYPE_ETH'):
        return (
          <View style={styles.itemContainer}>
            {isSelectedIndex ? (
              <TouchableOpacity onPress={this.onCurrencyClicked.bind(this, item.label)}>
                <ETHLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
              </TouchableOpacity>
            ) : (
              <ETHLogoDisable width={styles.imageStyle.width} height={styles.imageStyle.height} />
            )}
            <Text
              style={[
                styles.CurrencyText,
                isSelectedIndex ? styles.etheriumText : styles.textDisable,
              ]}
            >
              {I18n.t('ETHERIUM')}
            </Text>
          </View>
        )
      case I18n.t('TYPE_DASH'):
        return (
          <View style={styles.itemContainer}>
            {isSelectedIndex ? (
              <TouchableOpacity onPress={this.onCurrencyClicked.bind(this, item.label)}>
                <DashLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
              </TouchableOpacity>
            ) : (
              <DashLogoDisable width={styles.imageStyle.width} height={styles.imageStyle.height} />
            )}
            <Text
              style={[styles.CurrencyText, isSelectedIndex ? styles.dashText : styles.textDisable]}
            >
              {I18n.t('DASH')}
            </Text>
          </View>
        )
    }
  }

  /**
   * Navigate to the action page when user click the currency
   * @param {String} currency user selected currency (USD, Bitcoin, dash, eth,euro)
   */
  onCurrencyClicked = (currency) => {
    if (!handleConnectivityStatus) {
      showAlert(I18n.t('NETWORK_ERROR'))
      return
    }

    this.props.getCommissions()
    this.props.getCurrencyValues()
    this.props.setTransfer({})
    this.props.getBalanceAndLimit(currency)

    Navigator.navigate(NavKeys.BUY_SELL_WALLET, {
      selectedCurrency: currency,
      selectedType: this.state.selectedType,
    })
  }

  /**
   * callback while user swipe the coin Carousel
   * @param {number} index current active index
   */
  sliderChange = (index) => {
    if (index !== undefined)
      this.setState({
        selectedIndex: index,
      })
    hapticVibrate()
  }
}
TypeSelectionScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  getBalanceAndLimit: PropTypes.func,
  getCommissions: PropTypes.func,
  getCurrencyValues: PropTypes.func,
  setTransfer: PropTypes.func,
}

export const mapStateToProps = (state) => ({})

export const mapDispatchToProps = (dispatch) => ({
  getBalanceAndLimit: (currency) => dispatch(UserActions.getBalanceAndTransactionLimit(currency)),
  getCommissions: () => dispatch(UserActions.getCommissions()),
  getCurrencyValues: () => dispatch(UserActions.getCurrencyValue()),
  setTransfer: (transfer) => dispatch(UserActions.setTransfer(transfer)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeSelectionScreen)
