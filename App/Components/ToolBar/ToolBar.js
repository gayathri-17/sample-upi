import React from 'react'
import { PropTypes } from 'prop-types'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import Messaging from 'App/Assets/Images/Svg/Messaging'
import Notification from 'App/Assets/Images/Svg/Notification'
import Style from './ToolBarStyle'
import I18n from 'App/Localization/I18n'

/**
 *  common Toolbar component
 */
export default class ToolBar extends React.Component {
  render() {
    const { testID } = this.props
    return (
      <View style={Style.mainContainer} testID={testID}>
        <View style={Style.messagingContainer}>
          <TouchableWithoutFeedback>
            <Messaging />
          </TouchableWithoutFeedback>
        </View>
        <View style={Style.headerTextContainer}>
          <Text style={Style.headerText}>
            <Text style={Style.mercuryText}>{I18n.t('HEADER_MERCURY')}</Text>
            <Text style={Style.cashText}>{I18n.t('CASH')}</Text>
          </Text>
        </View>
        <View style={Style.notificationContainer}>
          <TouchableWithoutFeedback>
            <Notification
              width={Style.notificationIconSize.width}
              height={Style.notificationIconSize.height}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

ToolBar.propTypes = {
  testID: PropTypes.string,
}
