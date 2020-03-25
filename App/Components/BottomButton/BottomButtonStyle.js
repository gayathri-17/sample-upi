import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import { Colors } from 'App/Theme'

export default StyleSheet.create({
  buttonStyle: {
    width: wp(78),
    height: hp(6),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBg: {
    backgroundColor: Colors.mediumTurquoise,
    color: Colors.white,
    borderRadius: wp(6),
  },
  withBgTextColor: {
    color: Colors.white,
  },
  withoutBgTextColor: {
    color: Colors.black,
  },
  textStyle: {
    fontSize: fSize(14)
  },
  shadow: {
    shadowColor: Colors.mediumTurquoise,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: hp(0.5),
  },
  border: {
    borderWidth: 2,
    borderColor: Colors.mediumTurquoise,
    borderStyle: 'solid',
  }
})
