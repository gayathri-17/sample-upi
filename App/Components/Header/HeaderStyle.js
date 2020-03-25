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
    alignItems: 'center',
  },
  cashText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
    marginTop: hp(2),
    color: Colors.mediumTurquoise,
    ...ApplicationStyles.screen.mediumTurquoise,
  },
  descriptionText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    textAlign: 'center',
  },
  borderLineStyle: {
    width: wp(100),
    height: hp(1.4),
    marginTop: hp(2.5),
  },
})
