import React from 'react'
import { View } from 'react-native'
import styles from './TickStyle'
import WhiteCircle from 'App/Assets/Images/Svg/WhiteCircle'
import WhiteTick from 'App/Assets/Images/Svg/WhiteTick'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

/**
 *  common component for tick mark
 */

const Tick = (props) => {
  return (
    <View>
      <View style={styles.whiteCircleStyle}>
        <WhiteCircle width={wp(30)} height={wp(30)} />
      </View>
      <View style={styles.whiteTickStyle}>
        <WhiteTick width={wp(23)} height={wp(23)} />
      </View>
    </View>
  )
}
export default Tick
