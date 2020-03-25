import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: wp(100),
    height: hp(42.83),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp(60),
    height: hp(30),
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
    fontSize: fSize(20),
  },
  mercuryText: {
    ...ApplicationStyles.screen.mercuryText,
  },
  cashText: {
    ...ApplicationStyles.screen.cashText,
  },
})
