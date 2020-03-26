import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Colors } from 'App/Theme'

export default StyleSheet.create({
  
  withoutBgTextColor: {
    color: Colors.black,
  },

  withBgMargin: {
    marginTop: hp(2),
  },

  withoutBgMargin: {
    marginTop: hp(1),
  },

  greyBgColor: {
    backgroundColor: Colors.lightGrey,
    color: Colors.white,
  }
})
