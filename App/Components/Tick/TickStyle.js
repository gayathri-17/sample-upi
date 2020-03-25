import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  whiteCircleStyle: {
    alignItems: 'center',
    position: 'absolute',
    marginTop: hp(2),
  },
  whiteTickStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(10),
    marginTop: hp(1),
  },
})
