import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import Colors from '../../../Theme/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Fonts from '../../../Theme/Fonts'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
  },
  authenticateMainContainer: {
    width: wp(89.0),
    borderRadius: hp(1),
    margin: wp(5),
    shadowColor: Colors.lightGrey,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  smsContainerHeight: {
    height: hp(32.3),
  },
  tfaContainerHeight: {
    height: hp(30.3),
  },
  titleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    fontSize: fSize(16),
    marginTop: hp(2.5),
  },
  titleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(1.8),
    width: wp(75.7),
  },
  infoTextAppColor: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    fontSize: fSize(10),
    textAlign: 'center',
    marginTop: hp(1.8),
  },
  infoTextResendAppColor: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    fontSize: fSize(10),
    textAlign: 'center',
    marginTop: hp(1.8),
  },
  infoTextResendTimerColor: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(10),
    textAlign: 'center',
    marginTop: hp(1.8),
  },
  resendinActive: {
    color: Colors.tabsGrey,
  },
  resendActive: {
    color: Colors.mediumTurquoise,
  },
  infoText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
    textAlign: 'center',
    marginVertical: hp(2),
  },
  infoTextResend: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
  },
  inputTextStyle: {
    ...ApplicationStyles.screen.inputTextStyle,
    width: wp(56.9),
    height: hp(4.6),
    paddingLeft: wp(0),
    textAlign: 'center',
    color: Colors.mediumTurquoise,
    fontSize: fSize(12),
    textAlignVertical: 'center',
  },
  textInputDangerBorder: {
    borderColor: Colors.coralRed,
    borderWidth: 1,
  },
  textInputBorderNill: {
    borderColor: Colors.transparent,
    borderWidth: 0,
  },
  resendContainer: {
    alignItems: 'flex-start',
    marginTop: hp(1.8),
  },
  verifyBtnStyle: {
    width: wp(54.9),
    height: hp(3.9),
    marginVertical: wp(3),
  },
  verifiedContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(75.0),
    marginVertical: hp(3),
  },
  verifiedText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(14),
    alignSelf: 'center',
  },
  verifiedImage: {
    width: wp(14.4),
    height: hp(6.3),
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp(4.43),
  },
  backButtonContainer: {
    ...ApplicationStyles.screen.backButtonContainer,
  },
  modalTitleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    fontSize: fSize(16),
    marginTop: hp(2.5),
  },
  modalTitleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(1.8),
    width: wp(75.7),
  },
  verifyContainerStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  centerStyle: {
    alignItems: 'center',
  },
  ErrorIconView: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  errorIcon: {
    width: wp(20),
    height: wp(20),
  },
  backButtonStyle: {
    marginVertical: hp(2),
  },
  marginForEmailButton: {
    marginVertical: hp(3),
  },
  backTextStyle: {
    ...ApplicationStyles.screen.backTextStyle,
  },
})
