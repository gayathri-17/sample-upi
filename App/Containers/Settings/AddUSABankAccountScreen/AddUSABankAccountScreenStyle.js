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

  containerTitle: {
    marginLeft: wp(9.3),
  },
  mainContainer: {
    flex: 1,
    width: wp(100),
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
  countryDropDownInputStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(74),
    marginTop: wp(1),
    height: hp(5.78),
    fontFamily: Fonts.family.GothamRoundedMedium,
    backgroundColor: Colors.ghostWhite,
  },
  dropdownIconStyle: {
    top: hp(3),
    right: wp(6),
  },
  stateDropdownIconStyle: {
    top: hp(4),
    right: wp(4),
  },
  dropDownImageStyle: {
    width: wp(3.2),
    height: hp(0.73),
  },
  dropDownContainer: {
    flexDirection: 'row',
  },
  countryContainer: {
    flex: 0.5,
    marginHorizontal: wp(3.2),
  },
  cityInputTextStyle: {
    paddingLeft: wp(0),
    ...ApplicationStyles.screen.inputTextStyle,
    width: wp(35),
  },
  stateContainer: {
    flex: 0.45,
  },
  dropdownFieldTitleMargin: {
    marginLeft: wp(2.5),
    textTransform: 'uppercase',
  },
  stateDropDownInputStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(31.9),
    marginTop: wp(3.6),
    height: hp(5.78),
    fontFamily: Fonts.family.GothamRoundedMedium,
    backgroundColor: Colors.ghostWhite,
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
  typeParentContainer: {
    flexDirection: 'row',
    marginTop: wp(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: wp(3),
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
