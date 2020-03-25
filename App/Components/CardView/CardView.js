import React from 'react'
import { Text, View, TouchableWithoutFeedback, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../../Theme/Colors'
import Style from '../CardView/CardViewStyle'
import { PropTypes } from 'prop-types'

/*
 * Common cardView component
 */
export default class CardView extends React.Component {
  render() {
    const { testID, isEnable, circleValue, heading, description, onClick } = this.props
    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <View
          style={[
            Style.container,
            isEnable ? Style.containetColorEnable : Style.containerColorDisable,
          ]}
          testID={testID}
        >
          <LinearGradient
            colors={
              isEnable
                ? [Colors.gradientStartColor, Colors.gradientEndColor]
                : [Colors.white, Colors.white]
            }
            start={{ x: 0.8, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={Style.gradientCircleStyle}
          >
            <View style={Style.circleTextContainerStyle}>
              <Text
                style={[
                  isEnable ? Style.accountTypeCount : Style.accountTypeCountDisable,
                  Platform.OS === 'android' ? Style.androidText : Style.iOSText,
                ]}
              >
                {circleValue}
              </Text>
            </View>
          </LinearGradient>
          <View style={Style.titleText}>
            <Text style={isEnable ? Style.accountTypeTitle : Style.accountTypeTitleDisable}>
              {heading}
            </Text>
            <Text
              style={isEnable ? Style.accountTypeDescription : Style.accountTypeDescriptionDisable}
            >
              {description}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
CardView.propTypes = {
  testID: PropTypes.string,
  isEnable: PropTypes.bool.isRequired,
  circleValue: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
