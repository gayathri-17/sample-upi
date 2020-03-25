import React from 'react'
import { View, Text } from 'react-native'
import { PropTypes } from 'prop-types'
import styles from './SecurityOptionStyle'
import { Switch } from 'App/Components/Switch/Switch'
import { Colors } from 'App/Theme'
import I18n from 'App/Localization/I18n'

/**
 * Common component for security option
 */
class SecurityOption extends React.Component {
  render() {
    const { headerText, contentText, switchEnabled, onToggleSwitch } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.headerTextStyle}>{headerText}</Text>
        <Text style={styles.contentTextStyle}>{contentText}</Text>
        <Switch
          value={switchEnabled}
          onValueChange={onToggleSwitch}
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
          renderActiveText={switchEnabled}
          renderInActiveText={!switchEnabled}
          switchLeftPx={styles.switchStyle.margin}
          switchRightPx={styles.switchStyle.margin}
          switchWidthMultiplier={styles.switchStyle.margin}
        />
      </View>
    )
  }
}
SecurityOption.propTypes = {
  headerText: PropTypes.string,
  contentText: PropTypes.string,
  switchEnabled: PropTypes.bool,
  onToggleSwitch: PropTypes.func,
}

export default SecurityOption
