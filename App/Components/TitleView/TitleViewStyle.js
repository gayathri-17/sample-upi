import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { ApplicationStyles } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'

export default StyleSheet.create({
  container: {
    width: wp(100),
    marginTop: hp(3),
    alignItems: 'center',
  },
  cashText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
    color: Colors.mediumTurquoise,
    ...ApplicationStyles.screen.mediumTurquoise,
  },
  lineStyle: {
    marginTop: hp(3),
    width: wp(62.6),
    height: hp(0.4),
    backgroundColor: Colors.mediumTurquoise,
  },
  borderLineStyle: {
    width: wp(100),
    height: hp(1.4),
    backgroundColor: Colors.ghostWhite,
  },
})
