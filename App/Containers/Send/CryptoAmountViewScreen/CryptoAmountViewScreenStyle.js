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
  // address and contact input container
  addressContainer: {
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressViewStyle: {
    width: wp(80),
    height: hp(7.5),
    borderRadius: wp(2),
    alignItems: 'center',
    flexDirection: 'row',
  },
  addressInputStyle: {
    width: wp(65),
    height: hp(4.5),
    backgroundColor: Colors.white,
    marginLeft: wp(2.5),
    borderRadius: wp(2),
    color: Colors.suvaGrey,
    fontSize: fSize(11),
    padding: wp(1),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  qrCodeContainer: {
    width: wp(10),
    height: hp(5),
    marginLeft: wp(2.5),
  },
  qrCodeStyle: {
    width: wp(6.5),
    height: hp(3.5),
  },
  scanTextStyle: {
    fontSize: fSize(7),
    marginTop: hp(0.2),
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  // contact container
  contactContainer: {
    width: wp(80),
    height: hp(7.5),
    borderRadius: wp(2),
    alignItems: 'center',
    flexDirection: 'row',
  },
  contactViewStyle: {
    width: wp(75),
    height: hp(4.5),
    marginLeft: wp(2.5),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  searchIconStyle: {
    padding: wp(2),
    height: wp(8),
    width: wp(8),
    marginLeft: wp(1),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  contactInputStyle: {
    width: wp(67),
    color: Colors.suvaGrey,
    fontSize: fSize(13),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  // amount container view
  amountContainerMargin: {
    marginTop: hp(3),
  },
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderSendStyle: {
    borderWidth: 3,
    height: hp(5),
    borderRadius: hp(2.5),
  },
  containerView: {
    width: wp(80),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: hp(3),
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
  },
  smallTextStyle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(14),
    textAlign: 'center',
  },
  sendTextStyle: {
    paddingRight: wp(4),
    paddingLeft: wp(4),
    paddingTop: hp(0.5),
    paddingBottom: hp(0.5),
  },
  progressViewStyle: {
    marginLeft: wp(2),
  },
  progressStyle: {
    borderWidth: wp(0.6),
    width: wp(5),
    shadowColor: Colors.LightGrayishBlue,
    color: Colors.white,
  },
  percentTextStyle: {
    fontSize: fSize(10),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  amountHeader: {
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(Fonts.size.medium),
    color: Colors.suvaGrey,
  },
  amountInputText: {
    flexDirection: 'row',
    height: hp(6),
    justifyContent: 'space-between',
  },
  dollerLogo: {
    flex: 0.1,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(18),
    color: Colors.suvaGrey,
    marginTop: wp(1),
  },
  amountInput: {
    flex: 0.85,
    marginRight: wp(2),
    textAlign: 'right',
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(18),
    color: Colors.suvaGrey,
  },
  convertedName: {
    flex: 0.25,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(18),
    color: Colors.white,
  },
  convertedAmount: {
    color: Colors.white,
  },
  usdBalance: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.small),
    color: Colors.suvaGrey,
    marginTop: wp(2),
  },
  inputTextStyle: {
    width: wp(74.6),
    marginTop: wp(3),
    height: hp(4.43),
    fontFamily: Fonts.family.GothamRoundedMedium,
    borderRadius: wp(2.66),
    backgroundColor: Colors.white,
    color: Colors.suvaGrey,
    fontSize: fSize(Fonts.size.extraSmall),
    paddingLeft: wp(2.13),
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: hp(0.5),
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    width: wp(80),
    height: hp(23),
    backgroundColor: Colors.ghostWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  lightningStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lightningTextStyle: {
    marginRight: wp(2),
    color: Colors.suvaGrey,
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  switchStyle: {
    width: wp(4),
    height: hp(2.5),
    margin: 3.4,
  },
  // arrow container style
  arrowStyle: {
    width: wp(10),
    height: hp(10),
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
    width: '100%',
  },
  arrowContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
    width: wp(65),
  },
  circleStyle: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(7) / 2,
    alignItems: 'center',
    marginLeft: wp(1),
    justifyContent: 'center',
    backgroundColor: Colors.whisperColor,
  },
  acronymTextStyle: {
    color: Colors.suvaGrey,
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  addressTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(11),
    textAlign: 'left',
  },
  nameTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.steelBlue,
    fontSize: fSize(11),
    textAlign: 'left',
  },
  profileContainer: {
    width: wp(10),
    height: hp(4.5),
    marginLeft: wp(2),
    justifyContent: 'center',
  },
  nameContainer: {
    width: wp(55),
    height: hp(4.5),
    marginLeft: wp(2),
    justifyContent: 'center',
  },
  closeContainer: {
    justifyContent: 'flex-start',
    marginTop: hp(0.8),
    marginBottom: hp(2.5),
  },
  closeView: {
    width: wp(3),
    height: wp(3),
  },
  closeTextStyle: {
    fontSize: fSize(2),
    color: Colors.white,
  },
  // send limit modal
  modalContainer: {
    width: wp(100),
    height: hp(100),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  alertContainer: {
    width: wp(84),
    borderRadius: wp(2.66),
    backgroundColor: Colors.white,
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: hp(0.5),
  },
  closeViewForModal: {
    marginTop: hp(1.23),
    marginLeft: wp(3),
    height: hp(5),
    flexDirection: 'row-reverse',
  },
  cancelImage: {
    width: wp(5),
    height: wp(5),
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  ErrorIconView: {
    alignItems: 'center',
  },
  progressStyleModal: {
    borderWidth: wp(2),
    width: wp(20),
    shadowColor: Colors.LightGrayishBlue,
    color: Colors.white,
  },
  progressPercentTextStyle: {
    fontSize: fSize(30),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  sendLimitText: {
    fontSize: fSize(18),
    marginTop: hp(3),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  limitTextrowStyle: {
    flexDirection: 'row',
    marginTop: hp(2),
    height: hp(4),
    marginLeft: wp(6),
    marginRight: wp(4),
    alignItems: 'center',
  },
  marginForView: {
    marginTop: hp(3),
  },
  limitTextStyle: {
    fontSize: fSize(12),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  usedTextStyle: {
    fontSize: fSize(12),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  widthForTitle: {
    width: wp(31),
    textAlign: 'right',
  },
  widthForText: {
    width: wp(18),
    textAlign: 'left',
    marginLeft: wp(5),
  },
  textSizeForLimit: {
    fontSize: fSize(14),
  },
  bottomMargin: {
    marginBottom: hp(3),
  },
})
