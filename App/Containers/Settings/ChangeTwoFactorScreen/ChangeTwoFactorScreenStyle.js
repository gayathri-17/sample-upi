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
  //  title text
  titleText: {
    marginTop: wp(2),
    fontSize: fSize(14),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
  },
  titleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(2),
    marginLeft: wp(2),
    marginRight: wp(2),
  },
  numberTextStyle: {
    ...ApplicationStyles.screen.blackSmallTextStyle,
    width: 100,
    paddingLeft: wp(1),
    paddingRight: wp(1),
    fontSize: fSize(13),
    height: 50,
  },
  authContent: {
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    marginTop: hp(2),
    textAlign: 'center',
  },
  centerStyle: {
    alignItems: 'center',
  },
  //   qrcode container
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: wp(0.2),
    borderBottomColor: Colors.suvaGrey,
    marginTop: hp(2),
  },
  copyImage: {
    width: wp(3),
    height: hp(3),
  },
  addressText: {
    marginTop: wp(2),
    fontSize: fSize(12),
    marginRight: wp(2),
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
  },
  // button style
  buttonContainer: {
    marginTop: hp(2),
    marginBottom: hp(5),
  },
  backButtonStyle: {
    marginTop: hp(2),
  },
  // verification container
  infoText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
    textAlign: 'center',
    marginTop: hp(1.8),
  },
  inputContainer: {
    marginTop: hp(2),
  },
  inputStyle: {
    width: wp(60),
    height: hp(7.5),
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(1),
    fontSize: fSize(27),
    borderWidth: 1,
    marginTop: hp(1),
    color: Colors.mediumTurquoise,
    borderColor: Colors.dropDownBorder,
    letterSpacing: 5,
    fontFamily: Fonts.family.GothamRoundedLight,
  },
})
