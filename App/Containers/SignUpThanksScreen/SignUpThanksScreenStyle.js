import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  tickViewContainer: {
    flex: 0.75,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.mediumTurquoise,
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
  },
  textContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  mailAppTextStyle: {
    ...ApplicationStyles.screen.cashText,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
  },
  openTextStyle: {
    ...ApplicationStyles.screen.mercuryText,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
  },
  thanksLargeText: {
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(48),
    textAlign: 'center',
  },
  thanksSmallText: {
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
    lineHeight: hp(4),
    textAlign: 'center',
  },
  loginContainer: {
    flex: 0.15,
    alignItems: 'center',
    marginBottom: hp(1),
    justifyContent: 'center',
  },
})
