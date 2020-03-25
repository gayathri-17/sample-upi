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
    color: Colors.suvaGrey,
  },
  appThemeTextStyle: {
    ...ApplicationStyles.screen.mercuryText,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  resendinActive: {
    color: Colors.tabsGrey,
  },
  resendActive: {
    color: Colors.mediumTurquoise,
  },
  textMargin: {
    marginTop: hp(2),
  },
  mainViewStyle: {
    flexDirection: 'column',
  },
  continueBtnContainer: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  numberChangeContainer: {
    height: '15%',
    flexDirection: 'row',
    marginLeft: wp(10),
    marginRight: wp(10),
  },
  passCodeContainer: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendTextContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeNumberViewContainer: {
    width: '50%',
    justifyContent: 'center',
  },
  changeButtonStyle: {
    borderColor: Colors.lightGrey,
    borderRadius: wp(6),
    width: wp(29),
    height: hp(4.5),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: wp(87),
    height: hp(22),
    borderRadius: wp(1),
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: hp(0.5),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    borderColor: Colors.passCodeBorder,
  },
  textCenterAlign: {
    textAlign: 'center',
  },
  inputStyle: {
    width: wp(60),
    height: hp(7.5),
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(1),
    fontSize: fSize(27),
    borderWidth: 1,
    letterSpacing: 5,
    fontFamily: Fonts.family.GothamRoundedLight,
  },
  borderLineStyle: {
    borderRadius: wp(1),
  },
  backTextStyle: {
    ...ApplicationStyles.screen.backTextStyle,
  },
  lineStyle: {
    marginBottom: '3%',
  },
})
