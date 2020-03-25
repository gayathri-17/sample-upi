import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Colors from 'App/Theme/Colors'

export default StyleSheet.create({
  lineStyle: {
    width: wp(100),
    height: hp(0.2),
    backgroundColor: Colors.whiteSmoke,
  },
})
