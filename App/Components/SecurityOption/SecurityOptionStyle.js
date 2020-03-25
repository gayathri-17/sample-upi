import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(18),
    backgroundColor: Colors.ghostWhite,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: hp(2),
    paddingBottom: hp(2),
    marginBottom: hp(2),
  },
  headerTextStyle: {
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(13),
    textAlign: 'center',
    letterSpacing: 4,
  },
  contentTextStyle: {
    color: Colors.suvaGrey,
    fontSize: fSize(12),
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedMedium,
    marginLeft: wp(6),
    marginRight: wp(6),
  },
  switchStyle: {
    width: wp(4.6),
    height: hp(3.2),
    margin: 3.2,
  },
})
