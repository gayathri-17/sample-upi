import { StyleSheet } from 'react-native'
import { Colors, Fonts, ApplicationStyles } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  logoContainer: {
    width: wp(100),
    height: hp(42.83),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: wp(28),
    height: hp(12.94),
  },
  logoTextView: {
    width: wp(50),
    height: hp(5.89),
    marginLeft: wp(24.13),
    marginRight: wp(25.87),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(26),
  },
  mercuryText: {
    ...ApplicationStyles.screen.mercuryText,
  },
  cashText: {
    ...ApplicationStyles.screen.cashText,
  },
  wecomeDashboardTextView: {
    height: hp(33.5),
    marginHorizontal: wp(17.86),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wecomeDashboardText: {
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(16),
    lineHeight: fSize(19),
    color: Colors.suvaGrey,
  },
})
