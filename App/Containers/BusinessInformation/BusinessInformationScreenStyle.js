import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import Colors from '../../Theme/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Fonts from '../../Theme/Fonts'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  fieldTitle: {
    ...ApplicationStyles.screen.inputFieldTitle,
  },
  inputTextStyle: {
    marginLeft: wp(10.53),
    paddingLeft: wp(0),
    ...ApplicationStyles.screen.inputTextStyle,
  },
  categoryDropDownInputStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(80),
    marginHorizontal: wp(10.53),
    height: hp(5.78),
    backgroundColor: Colors.ghostWhite,
    marginTop: wp(4),
  },
  dropdownIconStyle: {
    top: hp(2.83),
    right: wp(3),
  },
  cityInputStyle: {
    ...ApplicationStyles.screen.inputTextStyle,
    width: wp(42.46),
    marginLeft: wp(10.53),
  },
  textInputDangerBorder: {
    ...ApplicationStyles.screen.textInputDangerBorder,
  },
  textInputBorderNill: {
    ...ApplicationStyles.screen.textInputBorderNill,
  },
  dropDownContainer: {
    flexDirection: 'row',
  },
  countryContainer: {
    flex: 0.55,
  },
  stateContainer: {
    flex: 0.45,
  },
  dropDownStyleMargin: {
    marginLeft: wp(10.53),
    width: wp(42.46),
    height: hp(5.78),
    marginTop: hp(1.72),
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.ghostWhite,
  },
  dropDownStyle: {
    width: wp(32.9),
    height: hp(5.78),
    marginTop: hp(1.72),
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.ghostWhite,
  },
  zipCodeTextStyle: {
    ...ApplicationStyles.screen.inputTextStyle,
    width: wp(32.9),
  },
  stateFieldTitle: {
    marginTop: hp(2.8),
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  countryDropDownInputStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(42.46),
    marginTop: wp(1),
    height: hp(4.3),
    paddingRight: wp(6),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  stateDropDownInputStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(31.9),
    marginTop: wp(1),
    height: hp(4.3),
    paddingRight: wp(5),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  categoryIconStyle: {
    top: hp(4.3),
    right: wp(14),
  },
  dropDownImageStyle: {
    width: wp(3.2),
    height: hp(0.73),
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp(4.43),
  },
  backButtonContainer: {
    ...ApplicationStyles.screen.backButtonContainer,
  },
  backTextStyle: {
    ...ApplicationStyles.screen.backTextStyle,
  },
})
