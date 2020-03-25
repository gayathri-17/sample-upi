import React from 'react'
import { PropTypes } from 'prop-types'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import {
  Style,
  shadowSelectedOpt,
  shadowunSelectOpt,
} from '../AccountTypeOption/AccountTypeOptionsStyle'
import Personal from 'App/Assets/Images/Svg/AccountTypePersonal'
import Business from 'App/Assets/Images/Svg/AccountTypeBusiness'
import Passport from 'App/Assets/Images/Svg/DocTypePassport'
import License from 'App/Assets/Images/Svg/DocTypeLicense'
import IdCard from 'App/Assets/Images/Svg/DocTypeIdCard'
import CircleChecked from 'App/Assets/Images/Svg/CircleChecked'
import { BoxShadow } from 'react-native-shadow'
import I18n from 'App/Localization/I18n'

/*
 * Common Accoount Option Component
 */
export default class AccountTypeOptions extends React.Component {
  render() {
    const { text, selectedText, onClick, testID, textStyle } = this.props
    const isSelected = text === selectedText
    return (
      <BoxShadow setting={isSelected ? shadowSelectedOpt : shadowunSelectOpt}>
        <TouchableWithoutFeedback onPress={onClick}>
          <View style={[Style.container, !isSelected && Style.mainContainerBorder]} testID={testID}>
            {text === I18n.t('PERSONAL') ? (
              <Personal
                width={Style.personalImageStyle.width}
                height={Style.personalImageStyle.height}
              />
            ) : text === I18n.t('BUSINESS') ? (
              <Business
                width={Style.personalImageStyle.width}
                height={Style.personalImageStyle.height}
              />
            ) : text === I18n.t('PASSPORT') ? (
              <Passport
                width={Style.personalImageStyle.width}
                height={Style.personalImageStyle.height}
              />
            ) : text === I18n.t('LICENSE') ? (
              <License
                width={Style.personalImageStyle.width}
                height={Style.personalImageStyle.height}
              />
            ) : (
              <IdCard
                width={Style.personalImageStyle.width}
                height={Style.personalImageStyle.height}
              />
            )}
            <Text
              style={[
                Style.titleText,
                textStyle,
                isSelected ? Style.titleTextSelected : Style.titleTextUnSelected,
              ]}
            >
              {text}
            </Text>
            {isSelected && (
              <View style={Style.checkedImageContaner}>
                <CircleChecked
                  width={Style.tickImageStyle.width}
                  height={Style.tickImageStyle.height}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </BoxShadow>
    )
  }
}
AccountTypeOptions.propTypes = {
  testID: PropTypes.string,
  text: PropTypes.string.isRequired,
  selectedText: PropTypes.string,
  onClick: PropTypes.func,
  textStyle: PropTypes.object,
}
