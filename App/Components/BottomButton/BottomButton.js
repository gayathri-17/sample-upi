import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { PropTypes } from 'prop-types'
import styles from './BottomButtonStyle'

/**
 *  common submit button component
 */

export default class BottomButton extends React.Component {
  render() {
    const { continueBtnText, closeBtnText, onContinueBtnClick, onCloseBtnClick, continueBtnStyle, closeBtnStyle } = this.props
    return (
      <View>
        <View style={[styles.container, styles.shadow]}>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              styles.greenBg,
              styles.border,
              continueBtnStyle,
            ]}
            onPress={onContinueBtnClick}>
            <Text
              style={[
                styles.textStyle,
                styles.withBgTextColor,
              ]}>
              {continueBtnText}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              closeBtnStyle
            ]}
            onPress={onCloseBtnClick}>
            <Text
              style={[
                styles.textStyle,
                styles.withoutBgTextColor,
              ]}>
              {closeBtnText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

BottomButton.propTypes = {
  continueBtnText: PropTypes.string.isRequired,
  closeBtnText: PropTypes.string.isRequired,
  onContinueBtnClick: PropTypes.func,
  onCloseBtnClick: PropTypes.func,
  continueBtnStyle: PropTypes.object,
  closeBtnStyle: PropTypes.object,
}
