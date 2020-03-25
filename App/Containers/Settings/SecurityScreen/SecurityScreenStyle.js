import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  // title text
  titleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
  },
  titleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  // change password button
  changePasswordButtonStyle: {
    marginTop: hp(2),
  },
  // reset 2FA button
  buttonStyle: {
    width: wp(78),
    height: hp(6),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  textStyle: {
    fontSize: fSize(14),
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  backButtonStyle: {
    marginTop: hp(2),
  },
  bottomMargin: {
    marginBottom: hp(5),
  },
  // sms modal
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
    height: hp(55),
    alignItems: 'center',
  },
  tfaContainerHeight: {
    height: hp(55),
    alignItems: 'center',
  },
  emailContainerHeight: {
    height: hp(55),
    alignItems: 'center',
  },
  tfaChangeContainerHeight: {
    height: hp(45),
    alignItems: 'center',
  },
  modalTitleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    fontSize: fSize(16),
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
  },
  modalTitleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(1.8),
    width: wp(75.7),
  },
  verifyCaontainerStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(75.0),
  },
  verifiedText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(14),
    textAlign: 'center',
    alignSelf: 'center',
  },
  verifiedImage: {
    width: wp(14.4),
    height: hp(6.3),
  },
  infoTextAppColor: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    fontSize: fSize(10),
    textAlign: 'center',
    marginTop: hp(1),
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
  infoText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
    textAlign: 'center',
    marginTop: hp(1.8),
  },
  infoTextResend: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
  },
  textInputDangerBorder: {
    borderColor: Colors.coralRed,
    borderWidth: 1,
  },
  textInputBorderNill: {
    borderColor: Colors.transparent,
    borderWidth: 0,
  },
  modalStyle: {
    width: wp(100),
    height: hp(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dimBackground,
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
  centerStyle: {
    alignItems: 'center',
  },
  verifyBtnStyle: {
    width: wp(54.9),
    height: hp(3.9),
    marginTop: wp(3),
  },
  closeView: {
    ...ApplicationStyles.modalCloseView,
    alignSelf: 'flex-end',
    margin: wp(1),
  },
  cancelImage: {
    width: wp(5),
    height: wp(5),
  },
  ErrorIconView: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  errorIcon: {
    width: wp(20),
    height: wp(20),
  },
  backButtonModalStyle: {
    width: wp(54.9),
    height: hp(3.9),
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  resendContainer: {
    alignItems: 'flex-start',
    marginTop: hp(1.8),
  },
  resendinActive: {
    color: Colors.tabsGrey,
  },
  resendActive: {
    color: Colors.mediumTurquoise,
  },
  marginForEmailButton: {
    marginTop: hp(4),
  },
  passcodemodel: {
    backgroundColor: Colors.white,
  },
  imageStyle: {
    width: wp(5),
    height: hp(5),
  },
  picCodeContainer: {
    height: hp(100),
    flex: 1,
  },
  pinCodeCloseText: {
    alignSelf: 'flex-end',
    margin: hp(3),
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
  },
  pincodeTitle: {
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
  },
  centerContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: wp(-5),
  },
  backButtonContainer: {
    padding: wp(2),
  },
  backTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
  },
})
