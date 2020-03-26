import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { PropTypes } from 'prop-types'
import styles from './CustomButtonStyle'
import Button from 'App/Components/Button/Button'


export default class CustomButton extends React.Component {
  render() {
    const { 
      primaryBtnText, 
      secondaryBtnText, 
      onPrimaryBtnClick, 
      onSecondaryBtnClick, 
      primaryBtnStyle, 
      secondaryBtnStyle, 
      withPrimaryBtnGreyBg, 
      withSecondaryBtnBorder,
      primaryBtnTestId,
      secondaryBtnTestId
    } = this.props
    return (
      <View>
        <Button
                testID={primaryBtnTestId}
                withBg={true}
                withShadow={withPrimaryBtnGreyBg ? false : true}
                text={primaryBtnText}
                onClick={onPrimaryBtnClick}
                style = {[withPrimaryBtnGreyBg && styles.greyBgColor, primaryBtnStyle]}
              />
        <Button
                testID={secondaryBtnTestId}
                withBg={false}
                withBorder = {withSecondaryBtnBorder ? true : false}
                style={[withSecondaryBtnBorder ? styles.withBgMargin : styles.withoutBgMargin, secondaryBtnStyle]}
                textStyle={!withSecondaryBtnBorder && styles.withoutBgTextColor}
                withShadow={false}
                text={secondaryBtnText}
                onClick={onSecondaryBtnClick}
              />
      </View>
    )
  }
}

CustomButton.propTypes = {
  primaryBtnText: PropTypes.string.isRequired,
  secondaryBtnText: PropTypes.string.isRequired,
  onPrimaryBtnClick: PropTypes.func,
  onSecondaryBtnClick: PropTypes.func,
  primaryBtnStyle: PropTypes.object,
  secondaryBtnStyle: PropTypes.object,
  withPrimaryBtnGreyBg: PropTypes.bool,
  withSecondaryBtnBorder: PropTypes.bool,
  primaryBtnTestId: PropTypes.string,
  secondaryBtnTestId: PropTypes.string
}
