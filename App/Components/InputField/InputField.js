/**
 *  common  TextInput component
 */

import React from 'react'
import { View, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import styles from './InputFieldStyle'
import { Colors } from 'App/Theme'

export default class InputField extends React.Component {
  render() {
    const {
      placeholder,
      text,
      onChangeText,
      textStyle,
      type,
      obscureText,
      testID,
      isValid,
      maxLength,
    } = this.props
    return (
      <View>
        <TextInput
          testID={testID}
          obscureText={false}
          autoCapitalize="none"
          placeholderTextColor={Colors.suvaGrey}
          secureTextEntry={obscureText}
          style={[styles.inputStyle, textStyle, !isValid ? styles.errorBackground : null]}
          placeholder={placeholder}
          text={text}
          returnKeyType={'done'}
          keyboardType={type}
          maxLength={maxLength || null}
          onChangeText={onChangeText}
        />
      </View>
    )
  }
}

InputField.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  obscureText: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  textStyle: PropTypes.object,
  testID: PropTypes.string,
  maxLength: PropTypes.number,
}
