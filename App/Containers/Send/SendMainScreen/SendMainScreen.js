import React from 'react'
import styles from './SendMainScreenStyle'
import { SafeAreaView, View, Text } from 'react-native'
import CancelImage from 'App/Assets/Images/Svg/CancelImage'
import Carousel from 'react-native-snap-carousel'
import Line from 'App/Components/Line/Line'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NavKeys from 'App/Constants/NavKeys'
import Navigator from 'App/Services/NavigationService'
import { PropTypes } from 'prop-types'
import I18n from 'App/Localization/I18n'
import { hapticVibrate } from 'App/APIs/HapticFeedback'
import CurrencyType from 'App/Constants/CurrencyType'
import SvgIcon from 'App/Components/SvgIcon/SvgIcon'
import Currencies from 'App/Assets/Images/Svg/Currencies'
import { connect } from 'react-redux'
import UserActions from 'App/Stores/User/Actions'

/**
 * User can see the options available for sending the money
 */

export class SendMainScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      carouselItems: [
        {
          title: I18n.t('TYPE_USD'),
          type: CurrencyType.USD,
          name: I18n.t('DOLLAR'),
          enabledIcon: Currencies.USD,
          disabledIcon: Currencies.USDDisable,
          style: styles.usdText,
        },
        {
          title: I18n.t('TYPE_EURO'),
          type: CurrencyType.EURO,
          name: I18n.t('EURO'),
          enabledIcon: Currencies.Euro,
          disabledIcon: Currencies.EuroDisable,
          style: styles.euroText,
        },
        {
          title: I18n.t('TYPE_BITCOIN'),
          type: CurrencyType.BITCOIN,
          name: I18n.t('BITCOIN'),
          enabledIcon: Currencies.BTC,
          disabledIcon: Currencies.BTCDisable,
          style: styles.bitCoinText,
        },
        {
          title: I18n.t('TYPE_DASH'),
          type: CurrencyType.DASH,
          name: I18n.t('DASH'),
          enabledIcon: Currencies.Dash,
          disabledIcon: Currencies.DashDisable,
          style: styles.dashText,
        },
        {
          title: I18n.t('TYPE_ETH'),
          type: CurrencyType.ETH,
          name: I18n.t('ETHERIUM'),
          enabledIcon: Currencies.ETH,
          disabledIcon: Currencies.ETHDisable,
          style: styles.etheriumText,
        },
      ],
    }
  }

  render() {
    // To access current component state with simplified field of state
    const { carouselItems, selectedIndex } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <View testID={'titleContainer'} style={styles.titleContainer}>
          <View style={styles.titleDotContainer}>
            <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
            <Text style={styles.titleTxt}>{' ' + I18n.t('I_WANT_TO_SEND')}</Text>
          </View>
          <Line styleProp={styles.titleLine} />
        </View>
        <View testID={'carouselContainer'} style={styles.carouselStyle}>
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
            onSnapToItem={(index) => this.sliderChange(index)}
            layout={'default'}
          />
        </View>
        <TouchableOpacity style={styles.cancelImage} onPress={this.onNavigateToFirstChoice}>
          {selectedIndex !== 0 && (
            <CancelImage
              testID={'cancelImage'}
              width={styles.cancelImage.width}
              height={styles.cancelImage.height}
            />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
  /**
   * move to the first choice
   */
  onNavigateToFirstChoice = () => {
    this.setState({ selectedIndex: 0 })
    this._carousel.snapToItem(0, true, true)
  }

  /**
   * callback while user swipe the coin Carousel
   * @param {number} index current active index
   */
  sliderChange = (index) => {
    if (index !== undefined) {
      this.setState({
        selectedIndex: index,
      })
      hapticVibrate()
    } else {
      // Do nothing. Added to cover test
    }
  }

  /**
   * render the UI based on the item
   * @param {Object} item given item by indx
   * @param {number} index current item index
   */
  _renderItem = ({ item, index }) => {
    const isSelectedIndex = this.state.selectedIndex === index
    return (
      <View style={styles.itemContainer}>
        {isSelectedIndex ? (
          <TouchableOpacity testID={item.type} onPress={this.onCurrencyClicked.bind(this, item)}>
            <SvgIcon
              width={styles.imageStyle.width}
              height={styles.imageStyle.height}
              xml={item.enabledIcon}
            />
          </TouchableOpacity>
        ) : (
          <SvgIcon
            width={styles.imageStyle.width}
            height={styles.imageStyle.height}
            xml={item.disabledIcon}
          />
        )}
        <Text style={[styles.CurrencyText, isSelectedIndex ? item.style : styles.textDisable]}>
          {item.name}
        </Text>
      </View>
    )
  }

  /**
   * Navigate to the action page when user click the currency
   * @param {String} currencyName user selected currency (USD, Bitcoin, dash, eth,euro)
   */
  onCurrencyClicked = (item) => {
    let currencyType = item.type
    let currencyName = item.title
    switch (currencyType) {
      case CurrencyType.USD:
      case CurrencyType.EURO:
        Navigator.navigate(NavKeys.SEND_TO_OPTIONS, {
          currencyType: currencyType,
          currencyName: currencyName,
        })
        break
      default:
        Navigator.navigate(NavKeys.CRYPTO_WALLET_LIST, {
          currencyType: currencyType,
          currencyName: currencyName,
        })
        break
    }
  }
}
SendMainScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  getBalanceAndLimit: PropTypes.func,
  getCommissions: PropTypes.func,
}

export const mapStateToProps = (state) => ({})

export const mapDispatchToProps = (dispatch) => ({
  getBalanceAndLimit: (currency) => dispatch(UserActions.getBalanceAndTransactionLimit(currency)),
  getCommissions: () => dispatch(UserActions.getCommissions()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMainScreen)
