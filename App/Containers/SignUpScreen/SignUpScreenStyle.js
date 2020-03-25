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
  logoContainer: {
    width: wp(100),
    height: hp(26.09),
  },
  logo: {
    width: wp(28),
    height: hp(12.94),
    marginTop: hp(8.8),
  },
  alignCenter: {
    alignItems: 'center',
  },
  inputTextStyle: {
    ...ApplicationStyles.screen.inputTextStyle,
  },
  textInputDangerBorder: {
    borderColor: Colors.coralRed,
    borderWidth: 1,
  },
  textInputBorderNill: {
    borderColor: Colors.transparent,
    borderWidth: 0,
  },
  warningContainer: {
    height: hp(12.35),
    width: wp(80),
    marginTop: hp(2),
    borderRadius: wp(1.33),
    borderColor: Colors.ghostWhite,
    borderWidth: 1,
  },
  warning: {
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    flex: 1,
  },
  warningView: {
    marginLeft: wp(5),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // width: wp(26),
    height: 20,
  },
  autoHeightWarningView: {
    height: 25,
  },
  warningTitle: {
    marginTop: hp(1.23),
    marginLeft: wp(3.46),
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(11),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(6),
  },
  tickImageStyle: {
    height: hp(2.7),
    width: wp(6),
  },
  textInputPassword: {
    marginRight: wp(2),
  },
  verifyImageContainer: {
    marginTop: wp(3),
  },
  passwordContain: {
    marginLeft: wp(2.4),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(8),
  },
  tickMarkContainer: {
    height: hp(1.33),
    width: wp(2.66),
  },
  // Country picker styles
  locationIcon: {
    width: wp(3.0),
    height: hp(1.8),
  },
  residenceContainer: {
    height: hp(10.46),
    marginHorizontal: wp(12.53),
  },
  residenceHeader: {
    marginLeft: wp(3.46),
    marginTop: hp(1.5),
    flexDirection: 'row',
  },
  residenceHeaderMargin: {
    marginTop: hp(6.77),
  },
  residenceIcon: {
    alignSelf: 'center',
  },
  residenceTitle: {
    marginLeft: wp(0.9),
    marginBottom: hp(0.14),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.small),
  },

  countryDropDownInputStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(74.93),
    height: hp(5.9),
    paddingLeft: wp(3.7),
    paddingRight: wp(3.7),
    backgroundColor: Colors.ghostWhite,
    marginTop: wp(2),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  dropdownFontStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
    color: Colors.suvaGrey,
  },
  dropdownIconStyle: {
    top: hp(2.5),
    right: wp(4),
  },
  dropDownImageStyle: {
    width: wp(3.2),
    height: hp(0.73),
  },
  // Terms and policy styles
  termsContainer: {
    marginTop: hp(2.95),
    marginBottom: hp(1.72),
    marginHorizontal: wp(13.53),
    flexDirection: 'row',
  },
  termsContainerMargin: {
    marginTop: hp(14.4),
  },
  termsText: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    marginLeft: wp(4),
    fontSize: fSize(Fonts.size.extraSmall),
  },
  signInContainer: {
    marginHorizontal: wp(12.53),
    height: hp(16.87),
  },
  signInTitle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.medium),
    textAlign: 'center',
    marginTop: hp(2.96),
  },
  signupView: {
    height: hp(5.91),
    alignItems: 'center',
  },
  clickableText: {
    color: Colors.mediumTurquoise,
  },
})
