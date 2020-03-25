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
    alignItems: 'center',
  },
  fieldTitleText: {
    fontSize: fSize(10),
    marginTop: hp(2.7),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
  },
  fieldTitleMargin: {
    marginLeft: wp(6),
    textTransform: 'uppercase',
  },
  inputTextStyle: {
    ...ApplicationStyles.screen.inputTextStyle,
    marginHorizontal: wp(3.2),
    width: wp(74),
    paddingLeft: wp(2),
  },
  textInputDangerBorder: {
    ...ApplicationStyles.screen.textInputDangerBorder,
  },
  textInputBorderNill: {
    ...ApplicationStyles.screen.textInputBorderNill,
  },
  typeParentContainer: {
    flexDirection: 'row',
    marginTop: wp(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: wp(3),
    width: wp(100),
  },
  typeContainer: {
    width: wp(39.2),
    height: hp(5.5),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBg: {
    backgroundColor: Colors.mediumTurquoise,
  },
  unSelectedBg: {
    backgroundColor: Colors.white,
    borderColor: Colors.ghostWhite,
    borderWidth: wp(0.4),
  },
  accountTypeText: {
    fontSize: fSize(12),
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  accountTypeSelectedText: {
    color: Colors.white,
  },
  accountTypeUnSelectedText: {
    color: Colors.suvaGrey,
  },
  headingStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: wp(3),
  },
  headingButton: {
    width: wp(21),
    marginLeft: wp(2),
    height: hp(3.3),
  },
  headingButtonText: {
    fontSize: fSize(8),
  },
  titleText: {
    marginTop: wp(2),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
  },
  titleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(2),
  },
  benificiryContainer: {
    borderColor: Colors.ghostWhite,
    borderWidth: wp(0.4),
    borderRadius: wp(2),
    marginTop: wp(2),
    marginHorizontal: wp(9.5),
    paddingBottom: wp(3),
  },
  containerBottom: {
    marginBottom: wp(3),
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: hp(2),
  },
  backButtonStyle: {
    marginTop: hp(2),
  },
  bottomMargin: {
    marginBottom: hp(5),
  },
})
