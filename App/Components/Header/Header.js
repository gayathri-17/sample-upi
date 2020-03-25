import React from 'react'
import { PropTypes } from 'prop-types'
import { Text, View } from 'react-native'
import Style from '../Header/HeaderStyle'
import LinearGradient from 'react-native-linear-gradient'
import Colors from 'App/Theme/Colors'

/*
 * Common Header Component (Title with Description)
 */
export default class Header extends React.Component {
  render() {
    const { testID, titleText, description, isSeparatorHidden } = this.props
    return (
      <View style={Style.container} testID={testID}>
        <Text style={Style.cashText}>{titleText}</Text>
        <Text style={Style.descriptionText}>{description}</Text>
        {!isSeparatorHidden && (
          <LinearGradient
            colors={[Colors.ghostWhite, Colors.white]}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            style={Style.borderLineStyle}
          />
        )}
      </View>
    )
  }
}
Header.propTypes = {
  testID: PropTypes.string,
  titleText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isSeparatorHidden: PropTypes.bool,
}
