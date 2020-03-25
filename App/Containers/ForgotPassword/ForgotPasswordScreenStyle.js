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
  resetTestStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    fontSize: fSize(20),
  },
  warningContainer: {
    height: hp(9.35),
    marginHorizontal: wp(12.53),
    borderRadius: wp(1.33),
    borderColor: Colors.ghostWhite,
    borderWidth: 1,
    paddingHorizontal: wp(2),
    marginTop: hp(2),
  },
  warningTitle: {
    marginTop: hp(1.23),
    marginLeft: wp(3.46),
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(11),
  },
  warningView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: wp(26),
    height: 13,
  },
  tickMarkContainer: {
    height: hp(1.33),
    width: wp(2.66),
  },
  passwordContain: {
    marginLeft: wp(2.4),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(8),
  },
  warning: {
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    flex: 1,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
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
})
