import React from 'react'
import { PropTypes } from 'prop-types'
import { Text, View } from 'react-native'
import styles from '../RegionalPicker/RegionalPickerStyle'
import SvgIcon from 'App/Components/SvgIcon/SvgIcon'
import RNPickerSelect from 'react-native-picker-select'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'

/*
 * User settings Regional component
 */
export default class RegionalPicker extends React.Component {
  render() {
    const { title, selectedOption, options, icon, onChange } = this.props
    return (
      <View style={styles.regionalContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        <View style={styles.optionContainer}>
          <View style={styles.optionIconContainer}>
            <SvgIcon xml={icon} width={styles.optionIcon.width} height={styles.optionIcon.height} />
          </View>
          <RNPickerSelect
            testID={'RegionalPicker'}
            style={{
              inputIOS: styles.pickerStyle,
              inputAndroid: styles.pickerStyle,
              iconContainer: styles.dropdownIconStyle,
            }}
            placeholder={{}}
            onValueChange={(itemValue) => {
              onChange(itemValue)
            }}
            value={selectedOption}
            items={options}
            Icon={this.dropDownArrowView}
          />
        </View>
      </View>
    )
  }

  dropDownArrowView = () => {
    return (
      <SvgIcon
        xml={CommonIcons.DownArrowLine}
        width={styles.downArrowIcon.width}
        height={styles.downArrowIcon.height}
      />
    )
  }
}
RegionalPicker.propTypes = {
  testID: PropTypes.string,
  title: PropTypes.string,
  selectedOption: PropTypes.string,
  options: PropTypes.array,
  icon: PropTypes.string,
  onChange: PropTypes.func,
}
