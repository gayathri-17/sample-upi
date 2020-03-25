/**
 *  common component for static line
 */

import React from 'react'
import { View } from 'react-native'
import { PropTypes } from 'prop-types'
import styles from './LineStyle'

const Line = (props) => {
  return <View style={[styles.lineStyle, props.styleProp]} />
}
export default Line

Line.propTypes = {
  styleProp: PropTypes.object,
}
