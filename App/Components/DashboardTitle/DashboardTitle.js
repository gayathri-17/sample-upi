import React from 'react'
import { View, Text } from 'react-native'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import styles from './DashboardTitleStyle'
import { getImage } from 'App/Components/Utils/Functions'
import { PropTypes } from 'prop-types'
import Line from 'App/Components/Line/Line'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getCurrencyColor } from '../Utils/Functions'
import I18n from 'App/Localization/I18n'

/**
 * Dashboard title View Component
 */
export default class DashboardTitle extends React.Component {
  render() {
    const {
      title,
      testID,
      currency,
      subTitle,
      name,
      viewStyle,
      typeView,
      addressSelected,
      contactSelected,
      onAddressPress,
      onContactPress,
    } = this.props
    return (
      <View testID={testID}>
        <View style={[styles.walletTitleContainer, viewStyle]}>
          <View style={styles.walletTitleImageContainer}>
            <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
          </View>
          <Text style={styles.walletTitleText}>{title}</Text>
          {getImage(currency)}
          <Text style={[styles.walletTitleText, styles.textLowerCase]}>{subTitle}</Text>
          <Text style={styles.bankAccountTextStyle}>{name}</Text>
          {typeView && (
            <View style={styles.typeViewStyle}>
              <TouchableOpacity
                style={[
                  addressSelected ? styles.addressSelectedContainer : styles.addressContainer,
                  addressSelected && { backgroundColor: getCurrencyColor(currency) },
                  styles.centerView,
                ]}
                onPress={onAddressPress}
              >
                <Text style={addressSelected ? styles.typeSelectedText : styles.typeNormalText}>
                  {I18n.t('ADDRESS')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  contactSelected ? styles.contactSelectedContainer : styles.contactContainer,
                  contactSelected && { backgroundColor: getCurrencyColor(currency) },
                  styles.centerView,
                ]}
                onPress={onContactPress}
              >
                <Text style={contactSelected ? styles.typeSelectedText : styles.typeNormalText}>
                  {I18n.t('TYPE_CONTACT')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Line styleProp={styles.lineStyle} />
      </View>
    )
  }
}
DashboardTitle.propTypes = {
  testID: PropTypes.string,
  title: PropTypes.string,
  currency: PropTypes.string,
  subTitle: PropTypes.string,
  name: PropTypes.string,
  viewStyle: PropTypes.object,
  typeView: PropTypes.bool,
  addressSelected: PropTypes.bool,
  contactSelected: PropTypes.bool,
  onAddressPress: PropTypes.func,
  onContactPress: PropTypes.func,
}
