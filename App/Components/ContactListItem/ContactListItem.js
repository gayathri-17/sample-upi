import React from 'react'
import { PropTypes } from 'prop-types'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './ContactListItemStyle'
import Highlighter from 'react-native-highlight-words'
import DefaultStrings from 'App/Constants/DefaultStrings'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import { getAcronymForName } from 'App/Components/Utils/Functions'

/**
 *  Contact list item component
 */
export default class ContactListItem extends React.Component {
  render() {
    const { contact, onPress, searchText, isAllContacts } = this.props
    return (
      <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
        <View style={styles.circleStyle}>
          <Text testID={'description'} style={styles.acronymTextStyle}>
            {getAcronymForName(contact.description)}
          </Text>
        </View>
        <View style={[styles.touchableContainer, styles.contactWidth]}>
          <Highlighter
            highlightStyle={styles.searchTextStyle}
            searchWords={[searchText]}
            numOfLines={1}
            style={styles.textStyle}
            textToHighlight={contact.description}
          />
        </View>
        {isAllContacts && (
          <View style={styles.currencyStyle}>{this.getImage(contact.currency)}</View>
        )}
      </TouchableOpacity>
    )
  }

  /**
   * get image based on the currency
   * @param {String} currency Type (BITCOIN, DASH, ETH, USD, EURO)
   * @returns {View} return rendered based on the text
   */
  getImage(currency) {
    switch (currency) {
      case DefaultStrings.TYPE_ETH:
        return <ETHLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
      case DefaultStrings.TYPE_USD:
        return <USDLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
      case DefaultStrings.TYPE_BTC:
        return <BitcoinLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
      case DefaultStrings.TYPE_DASH:
        return <DashLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
      default:
        return <EuroLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    }
  }
}

ContactListItem.propTypes = {
  contact: PropTypes.object,
  onPress: PropTypes.func,
  searchText: PropTypes.string,
  isAllContacts: PropTypes.bool,
}
