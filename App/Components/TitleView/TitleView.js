import React from 'react'
import { PropTypes } from 'prop-types'
import { Text, View } from 'react-native'
import Style from '../TitleView/TitleViewStyle'
import Line from 'App/Components/Line/Line'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../../Theme/Colors'

/*
 * Common Title Component
 */
export default class TitleView extends React.Component {
  render() {
    const { testID, titleText } = this.props
    return (
      <View style={Style.container} testID={testID}>
        <Text style={Style.cashText}>{titleText}</Text>
        <Line styleProp={Style.lineStyle} />
        <LinearGradient
          colors={[Colors.ghostWhite, Colors.white]}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
          style={Style.borderLineStyle}
        />
      </View>
    )
  }
}

TitleView.propTypes = {
  testID: PropTypes.string,
  titleText: PropTypes.string.isRequired,
}
