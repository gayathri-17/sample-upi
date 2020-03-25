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
  subContainer: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: Colors.white,
    flex: 0.77,
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
  fieldTitle: {
    marginTop: hp(2.8),
    marginLeft: wp(10.53),
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  dateFieldTitle: {
    marginTop: hp(2.8),
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  inputTextStyle: {
    marginLeft: wp(10.53),
    paddingLeft: wp(0),
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
  dropDownContainer: {
    flexDirection: 'row',
  },
  genderAndDateContainer: {
    flex: 0.5,
  },
  dropDownStyle: {
    height: hp(5.78),
    fontFamily: Fonts.family.GothamRoundedMedium,
    borderRadius: wp(2),
    backgroundColor: Colors.ghostWhite,
    color: Colors.suvaGrey,
    fontSize: fSize(Fonts.size.medium),
    marginTop: hp(1.72),
    marginRight: wp(8.53),
  },
  dropDownStyleMargin: {
    marginLeft: wp(10.53),
    marginRight: wp(10.53),
    height: hp(5.78),
    marginTop: hp(1.72),
    borderRadius: wp(2),
    justifyContent: 'center',
    backgroundColor: Colors.ghostWhite,
  },
  dateContainer: {
    height: hp(5.78),
    borderRadius: wp(2),
    backgroundColor: Colors.ghostWhite,
    marginTop: hp(1.72),
    marginRight: wp(8.53),
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.medium),
    color: Colors.suvaGrey,
    marginLeft: wp(2),
  },
  dropDownInputStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(30.46),
    marginTop: wp(1),
    height: hp(4.3),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  dropDownDocumentSelection: {
    ...ApplicationStyles.screen.dropDownStyles,
    marginTop: wp(1),
    height: hp(4.3),
    width: wp(78.84),
    marginRight: wp(10),
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  dropdownIconStyle: {
    top: hp(2),
    right: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  dropDownImageStyle: {
    width: wp(3.2),
    height: hp(0.73),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})
