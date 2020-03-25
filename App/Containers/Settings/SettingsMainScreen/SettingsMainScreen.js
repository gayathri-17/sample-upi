import React from 'react'
import styles from './SettingsMainScreenStyle'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Line from 'App/Components/Line/Line'
import NavKeys from 'App/Constants/NavKeys'
import Navigator from 'App/Services/NavigationService'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Cash from 'App/Assets/Images/Svg/Cash'
import Document from 'App/Assets/Images/Svg/Document'
import Security from 'App/Assets/Images/Svg/Security'
import Limits from 'App/Assets/Images/Svg/Limits'
import RegionalSettings from 'App/Assets/Images/Svg/RegionalSettings'
import Logout from 'App/Assets/Images/Svg/Logout'
import Profile from 'App/Assets/Images/Svg/Profile'
import { Colors } from 'App/Theme'
import { Switch } from 'App/Components/Switch/Switch'
import Button from 'App/Components/Button/Button'
import CommonActions from 'App/Stores/Common/Actions'
import UserActions from 'App/Stores/User/Actions'
import I18n from 'App/Localization/I18n'

/**
 * Settings main screen where user can navigate to other settings page
 */

export class SettingsMainScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      switchForNotification: this.props.notificationEnabled,
    }
  }

  componentDidMount() {
    this.props.getProfilePhoto(() => {})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* profile view */}
        <TouchableOpacity
          style={[styles.settingsViewContainer, styles.marginStyle]}
          onPress={this.onPressSettingsList.bind(this, NavKeys.PROFILE_SETTINGS)}
        >
          <Profile width={styles.imageStyle.width} height={styles.imageStyle.height} />
          <Text style={styles.settingsTextStyle}>{I18n.t('PROFILE')}</Text>
        </TouchableOpacity>
        <Line styleProp={styles.lineStyle} />

        {/* document view */}
        <TouchableOpacity
          style={styles.settingsViewContainer}
          onPress={this.onPressSettingsList.bind(this, NavKeys.TAB)}
        >
          <Document width={styles.imageStyle.width} height={styles.imageStyle.height} />
          <Text style={styles.settingsTextStyle}>{I18n.t('DOCUMENTS')}</Text>
        </TouchableOpacity>
        <Line styleProp={styles.lineStyle} />

        {/* bank account view */}
        <TouchableOpacity
          style={styles.settingsViewContainer}
          onPress={this.onPressSettingsList.bind(this, NavKeys.BANK_ACCOUNT)}
        >
          <Cash width={styles.imageStyle.width} height={styles.imageStyle.height} />
          <Text style={styles.settingsTextStyle}>{I18n.t('BANK_ACCOUNTS')}</Text>
        </TouchableOpacity>
        <Line styleProp={styles.lineStyle} />

        {/* security view */}
        <TouchableOpacity
          style={styles.settingsViewContainer}
          onPress={this.onPressSettingsList.bind(this, NavKeys.SECURITY_OPTIONS)}
        >
          <Security width={styles.imageStyle.width} height={styles.imageStyle.height} />
          <Text style={styles.settingsTextStyle}>{I18n.t('SECURITY')}</Text>
        </TouchableOpacity>
        <Line styleProp={styles.lineStyle} />

        {/* limits view */}
        <TouchableOpacity
          style={styles.settingsViewContainer}
          onPress={this.onPressSettingsList.bind(this, NavKeys.ACCOUNT_LIMITS)}
        >
          <Limits width={styles.imageStyle.width} height={styles.imageStyle.height} />
          <Text style={styles.settingsTextStyle}>{I18n.t('LIMITS')}</Text>
        </TouchableOpacity>
        <Line styleProp={styles.lineStyle} />

        {/* regional settings view */}
        <TouchableOpacity
          style={styles.settingsViewContainer}
          onPress={this.onPressSettingsList.bind(this, NavKeys.REGIONAL_SETTINGS)}
        >
          <RegionalSettings width={styles.imageStyle.width} height={styles.imageStyle.height} />
          <Text style={styles.settingsTextStyle}>{I18n.t('REGIONAL_SETTINGS')}</Text>
        </TouchableOpacity>
        <Line styleProp={styles.lineStyle} />

        {/* logout view */}
        <TouchableOpacity
          style={styles.settingsViewContainer}
          onPress={this.onPressLogout.bind(this)}
        >
          <Logout width={styles.imageStyle.width} height={styles.imageStyle.height} />
          <Text style={styles.settingsTextStyle}>{I18n.t('LOGOUT')}</Text>
        </TouchableOpacity>
        <Line styleProp={styles.lineStyle} />

        {/* notification toggle */}
        <View style={styles.switchContainer}>
          <Text style={[styles.settingsTextStyle, styles.rightMargin]}>
            {I18n.t('NOTIFICATIONS')}
          </Text>
          <Switch
            value={this.state.switchForNotification}
            onValueChange={this.toggleSwitch}
            activeText={I18n.t('ON')}
            inActiveText={I18n.t('OFF')}
            circleSize={styles.switchStyle.width}
            barHeight={styles.switchStyle.height}
            circleBorderWidth={0}
            backgroundActive={Colors.mediumTurquoise}
            backgroundInactive={Colors.lightGrey}
            circleActiveColor={Colors.white}
            circleInActiveColor={Colors.white}
            changeValueImmediately={true}
            renderActiveText={this.state.switchForNotification}
            renderInActiveText={!this.state.switchForNotification}
            switchLeftPx={styles.switchStyle.margin}
            switchRightPx={styles.switchStyle.margin}
            switchWidthMultiplier={styles.switchStyle.margin}
          />
        </View>

        {/* back to dashboard button */}
        <View style={styles.centerStyle}>
          <Button
            text={I18n.t('BACK_TO_DASHBOARD')}
            withBorder={true}
            withShadow={false}
            withBg={false}
            onClick={this.onClickDashboard}
          />
        </View>
      </SafeAreaView>
    )
  }

  /**
   * on press logout
   */
  onPressLogout = () => {
    this.props.logout()
    Navigator.navigateAndReset(NavKeys.LOGIN)
  }

  /**
   * navigate to Dashboard Page
   */
  onClickDashboard = () => {
    Navigator.navigateAndReset(NavKeys.TAB)
  }

  /**
   * Navigate to prefered screen
   * @param {String} key - refers page to navigate
   */
  onPressSettingsList(key) {
    Navigator.navigate(key)
  }

  /**
   * change toggle switch value for notification
   * @param {Object} value - refers param to set switch value for notification
   */
  toggleSwitch = (value) => {
    this.setState({ switchForNotification: value })
    this.props.enableDisableNotification(value)
  }
}

SettingsMainScreen.propTypes = {
  logout: PropTypes.func,
  notificationEnabled: PropTypes.bool,
  enableDisableNotification: PropTypes.func,
  getProfilePhoto: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  notificationEnabled: state.common.notificationEnabled,
})

export const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({ type: DefaultStrings.LOG_OUT }),
  enableDisableNotification: (value) => dispatch(CommonActions.enableDisableNotification(value)),
  getProfilePhoto: (successFn) => dispatch(UserActions.getProfilePhoto(successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMainScreen)
