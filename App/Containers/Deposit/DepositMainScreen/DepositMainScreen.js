import React from 'react'
import styles from './DepositMainScreenStyle'
import { SafeAreaView, View, Text } from 'react-native'
import DefaultStrings from 'App/Constants/DefaultStrings'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import USDLogoDisable from 'App/Assets/Images/Svg/USDLogoDisable'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import BitcoinLogoDisable from 'App/Assets/Images/Svg/BitcoinLogoDisable'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import DashLogoDisable from 'App/Assets/Images/Svg/DashLogoDisable'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import ETHLogoDisable from 'App/Assets/Images/Svg/ETHLogoDisable'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import EuroLogoDisable from 'App/Assets/Images/Svg/EuroLogoDisable'
import CancelImage from 'App/Assets/Images/Svg/CancelImage'
import Carousel from 'react-native-snap-carousel'
import Line from 'App/Components/Line/Line'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NavKeys from 'App/Constants/NavKeys'
import Navigator from 'App/Services/NavigationService'
import { PropTypes } from 'prop-types'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'
import { hapticVibrate } from 'App/APIs/HapticFeedback'

/**
 * User can see the currency available for deposit the money
 */

export default class DepositMainScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      carouselItems: [
        {
          title: I18n.t('TYPE_USD'),
          type: CurrencyType.USD,
        },
        {
          title: I18n.t('TYPE_EURO'),
          type: CurrencyType.EURO,
        },
        {
          title: I18n.t('TYPE_BITCOIN'),
          type: CurrencyType.BITCOIN,
        },
        {
          title: I18n.t('TYPE_DASH'),
          type: CurrencyType.DASH,
        },
        {
          title: I18n.t('TYPE_ETH'),
          type: CurrencyType.ETH,
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
            <Text style={styles.titleTxt}> {I18n.t('I_WANT_TO_DEPOSIT')}</Text>
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
      // Do nothing
    }
  }

  /**
   * render the UI based on the item
   * @param {Object} item given item by indx
   * @param {number} index current item index
   */
  _renderItem = ({ item, index }) => {
    const isSelectedIndex = this.state.selectedIndex === index
    switch (item.type) {
      case CurrencyType.USD:
        return (
          <View style={styles.itemContainer}>
            {isSelectedIndex ? (
              <TouchableOpacity testID={'USD'} onPress={this.onCurrencyClicked.bind(this, item)}>
                <USDLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
              </TouchableOpacity>
            ) : (
              <USDLogoDisable width={styles.imageStyle.width} height={styles.imageStyle.height} />
            )}
            <Text
              style={[styles.CurrencyText, isSelectedIndex ? styles.usdText : styles.textDisable]}
            >
              {I18n.t('DOLLAR')}
            </Text>
          </View>
        )
      case CurrencyType.BITCOIN:
        return (
          <View style={styles.itemContainer}>
            {isSelectedIndex ? (
              <TouchableOpacity
                testID={'bitcoin'}
                onPress={this.onCurrencyClicked.bind(this, item)}
              >
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
      case CurrencyType.DASH:
        return (
          <View style={styles.itemContainer}>
            {isSelectedIndex ? (
              <TouchableOpacity testID={'dash'} onPress={this.onCurrencyClicked.bind(this, item)}>
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
      case CurrencyType.ETH:
        return (
          <View style={styles.itemContainer}>
            {isSelectedIndex ? (
              <TouchableOpacity
                testID={'etherium'}
                onPress={this.onCurrencyClicked.bind(this, item)}
              >
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
      case CurrencyType.EURO:
        return (
          <View style={styles.itemContainer}>
            {isSelectedIndex ? (
              <TouchableOpacity testID={'euro'} onPress={this.onCurrencyClicked.bind(this, item)}>
                <EuroLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
              </TouchableOpacity>
            ) : (
              <EuroLogoDisable width={styles.imageStyle.width} height={styles.imageStyle.height} />
            )}
            <Text
              style={[styles.CurrencyText, isSelectedIndex ? styles.euroText : styles.textDisable]}
            >
              {I18n.t('EURO')}
            </Text>
          </View>
        )
    }
  }

  /**
   * Navigate to deposit screen By Currency
   * @param {*} currencyItem user selected currency (USD, Bitcoin, dash, eth,euro)
   */
  onCurrencyClicked = (currencyItem) => {
    let screenType = currencyItem.type
    let screenName = currencyItem.title
    switch (currencyItem.type) {
      case CurrencyType.USD:
      case CurrencyType.EURO:
        Navigator.navigate(NavKeys.DEPOSIT_FIAT_BANK_ACCOUNT, {
          screenType: screenType,
          screenName: screenName,
        })
        break
      case CurrencyType.BITCOIN:
      case DefaultStrings.TYPE_ETH:
      case DefaultStrings.TYPE_DASH:
        Navigator.navigate(NavKeys.BITCOIN_DEPOSIT_TYPE_SELECTION_SCREEN, {
          screenType: screenType,
          screenName: screenName,
        })
        break
    }
  }
}
DepositMainScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
