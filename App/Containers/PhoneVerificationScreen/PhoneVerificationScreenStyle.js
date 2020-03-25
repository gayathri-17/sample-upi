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
  titleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
    color: Colors.mediumTurquoise,
    textAlign: 'center',
    padding: hp(2.3),
    ...ApplicationStyles.screen.mediumTurquoise,
  },
  smallTextStyle: {
    ...ApplicationStyles.screen.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
    color: Colors.mediumTurquoise,
  },
  mainViewStyle: {
    height: '60%',
    marginLeft: wp(10),
    marginRight: wp(10),
    marginTop: hp(5),
    flexDirection: 'column',
  },
  continueBtnContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: '30%',
    marginBottom: hp(1),
    position: 'absolute',
    bottom: 0,
  },
  pickerStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(84),
    height: hp(6.4),
    backgroundColor: Colors.ghostWhite,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: hp(1),
    borderColor: Colors.dropDownBorder,
    borderRadius: wp(1),
  },
  numberDetailContainerStyle: {
    width: wp(74),
    height: hp(6.4),
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: hp(1),
    alignItems: 'center',
  },
  numberDetailStyle: {
    borderColor: Colors.dropDownBorder,
    borderRadius: wp(1),
    backgroundColor: Colors.ghostWhite,
    borderWidth: 1,
    width: wp(50),
    height: hp(6.4),
  },
  numberTextStyle: {
    ...ApplicationStyles.screen.blackSmallTextStyle,
    paddingLeft: wp(1),
    paddingRight: wp(1),
    fontSize: fSize(13),
  },
  textInputDangerBorder: {
    ...ApplicationStyles.screen.textInputDangerBorder,
  },
  textInputBorderNill: {
    ...ApplicationStyles.screen.textInputBorderNill,
  },
  inputHeight: {
    height: hp(6.4),
  },
  viewMargin: {
    marginTop: hp(3),
  },
  tickImageStyle: {
    height: hp(3.3),
    width: wp(6.7),
  },
  backButtonContainer: {
    ...ApplicationStyles.screen.backButtonContainer,
  },
  backTextStyle: {
    ...ApplicationStyles.screen.backTextStyle,
  },
  dropDownInputStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(60),
    marginRight: wp(20),
    height: hp(6),
    alignItems: 'center',
    borderRadius: wp(2),
    backgroundColor: Colors.ghostWhite,
  },
  dropDownInputAndroidStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(80),
    height: hp(6),
    alignItems: 'center',
    borderRadius: wp(2),
  },
  dropDownTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
    color: Colors.suvaGrey,
  },
  dropdownIconStyle: {
    top: hp(2.83),
    right: wp(6),
  },
  dropDownStyle: {
    width: wp(3.2),
    height: hp(0.73),
  },
})
