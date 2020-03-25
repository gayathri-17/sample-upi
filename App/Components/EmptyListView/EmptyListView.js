import styles from './EmptyListViewStyle'
import DefaultStrings from 'App/Constants/DefaultStrings'
import React from 'react'
import { PropTypes } from 'prop-types'
import { View, Text, Platform } from 'react-native'
import EmptyList from 'App/Assets/Images/Svg/EmptyList'
import I18n from 'App/Localization/I18n'

const EmptyListView = (props) => {
  return (
    <View style={styles.container}>
      <EmptyList width={props.width} height={props.height} color={props.color} />
      <Text
        style={[
          styles.emptyText,
          { color: props.color },
          Platform.OS !== DefaultStrings.PLATFORM_ANDROID ? styles.emptyTextiOS : {},
        ]}
      >
        {I18n.t('NO_DATA')}
      </Text>
    </View>
  )
}

EmptyListView.propTypes = {
  height: PropTypes.string.required,
  width: PropTypes.string.required,
  color: PropTypes.string.required,
}

export default EmptyListView
