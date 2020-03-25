import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { PropTypes } from 'prop-types'
import styles from './ButtonStyle'

/**
 *  common submit button component
 */

export default class Button extends React.Component {
  render() {
    const { onClick, text, style, textStyle, testID, withBg, withBorder, disabled } = this.props
    return (
      <View style={[styles.container, this.props.withShadow && styles.shadow]}>
        <TouchableOpacity
          testID={testID}
          style={[
            styles.buttonStyle,
            withBg ? styles.greenBg : styles.whiteBg,
            withBorder && styles.border,
            style,
          ]}
          disabled={disabled}
          onPress={onClick}
        >
          <Text
            style={[
              styles.textStyle,
              disabled && styles.disabledText,
              withBg ? styles.withBgTextColor : styles.withoutBgTextColor,
              textStyle,
            ]}
          >
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  withShadow: PropTypes.bool,
  withBg: PropTypes.bool,
  withBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  testID: PropTypes.string,
}
