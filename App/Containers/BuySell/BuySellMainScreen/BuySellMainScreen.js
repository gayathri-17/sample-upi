import React from 'react'
import styles from './BuySellMainScreenStyle'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import Line from 'App/Components/Line/Line'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import SvgIcon from 'App/Components/SvgIcon/SvgIcon'
import CancelImage from 'App/Assets/Images/Svg/CancelImage'
import I18n from 'App/Localization/I18n'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import DefaultStrings from 'App/Constants/DefaultStrings'

/**
 * User can buy or sell crypto currencies
 */
export default class BuySellMainScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showBuyPressImage: false,
      showSellPressImage: false,
    }
  }

  render() {
    const { showBuyPressImage, showSellPressImage } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {/* title text */}
        <View style={styles.titleContainer}>
          <View style={styles.titleDotContainer}>
            <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
            <Text style={styles.titleTxt}> {I18n.t('I_WANT_TO')}</Text>
          </View>
          <Line styleProp={styles.titleLine} />
        </View>
        {/* select conainer */}
        <View style={styles.selectViewStyle}>
          <TouchableOpacity onPress={this.onPressBuy}>
            {/* show buy selected image when selected */}
            {showBuyPressImage ? (
              <View style={styles.viewContainer}>
                <SvgIcon
                  xml={CommonIcons.buySelected}
                  width={styles.iconSize.width}
                  height={styles.iconSize.height}
                />
                <Text style={styles.textStyleSelected}>{I18n.t('BUY')}</Text>
              </View>
            ) : (
              <View style={styles.viewContainer}>
                <SvgIcon
                  xml={CommonIcons.buyNormal}
                  width={styles.iconSize.width}
                  height={styles.iconSize.height}
                />
                <Text style={styles.textStyleNormal}>{I18n.t('BUY')}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressSell}>
            {/* show sell selected image when selected */}
            {showSellPressImage ? (
              <View style={styles.viewContainer}>
                <SvgIcon
                  xml={CommonIcons.sellSelected}
                  width={styles.iconSize.width}
                  height={styles.iconSize.height}
                />
                <Text style={styles.textStyleSelected}>{I18n.t('SELL')}</Text>
              </View>
            ) : (
              <View style={styles.viewContainer}>
                <SvgIcon
                  xml={CommonIcons.sellNormal}
                  width={styles.iconSize.width}
                  height={styles.iconSize.height}
                />
                <Text style={styles.textStyleNormal}>{I18n.t('SELL')}</Text>
              </View>
            )}
          </TouchableOpacity>
          {/* cancel image */}
          <TouchableOpacity onPress={this.goBack}>
            <CancelImage width={styles.cancelImage.width} height={styles.cancelImage.height} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  /**
   * navigate to tab screen
   */
  goBack = () => {
    Navigator.navigate(NavKeys.TAB)
  }

  /**
   * on press buy image
   */
  onPressBuy = () => {
    this.setState({
      showBuyPressImage: true,
    })
    setTimeout(this.changeImageSelectedState.bind(this, DefaultStrings.BUY_SMALL), 100)
  }

  /**
   * on press sell image
   */
  onPressSell = () => {
    this.setState({
      showSellPressImage: true,
    })
    setTimeout(this.changeImageSelectedState.bind(this, DefaultStrings.SELL_SMALL), 100)
  }

  /**
   * execution function after certain timeout
   * @param {String} type refers to pass type selection screen
   */
  changeImageSelectedState = (value) => {
    this.navigationToTypeSelection(value)
  }

  /**
   * navigate to type selection screen
   * @param {String} type refers to pass type selection screen
   */
  navigationToTypeSelection = (type) => {
    Navigator.navigate(NavKeys.BUY_SELL_TYPE_SELECTION, {
      type: type,
    })
    this.setState({ showSellPressImage: false, showBuyPressImage: false })
  }
}
