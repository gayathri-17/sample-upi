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
  // Header container
  currencySelectContainer: {
    width: wp(94),
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: hp(10),
    alignItems: 'center',
  },
  currencyView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyImageContainer: {
    marginLeft: wp(0.8),
    marginRight: wp(0.8),
  },
  curencyIconSize: {
    height: wp(9),
    width: wp(9),
  },
  borderLineStyle: {
    width: wp(100),
    height: hp(1.4),
    backgroundColor: Colors.ghostWhite,
  },
  titleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(2),
    width: wp(100),
  },
  // wallet scroll container
  scrollContainer: {
    flex: 1,
    width: wp(100),
  },
  walletTitleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(15),
    textAlignVertical: 'center',
    marginRight: wp(2),
  },
  headerTitleContaoner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: wp(3.3),
    height: hp(1.3),
  },
  lineStyle: {
    height: hp(0.2),
    width: wp(78),
    marginTop: wp(6),
  },
  headerContainer: {
    marginTop: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftMarginForCurrency: {
    marginLeft: wp(3),
  },
  itemContainer: {
    width: wp(89.6),
    height: hp(16),
    paddingLeft: wp(2),
  },
  gradientContainer: {
    width: wp(89.6),
    height: hp(5.5),
    marginTop: hp(1.1),
    borderRadius: wp(2),
  },
  gradientSelectedContainer: {
    width: wp(89.6),
    height: hp(12),
    marginTop: hp(1.1),
    borderRadius: wp(2),
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    flex: 0.7,
    marginLeft: wp(1),
  },
  amountText: {
    flex: 0.35,
    marginLeft: wp(1.5),
    textAlign: 'left',
  },
  unselectedItemName: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  unselectednameBTC: {
    color: Colors.gradientRed,
  },
  unselectednameETH: {
    color: Colors.etheriumCurrency,
  },
  unselectednameDASH: {
    color: Colors.dashCurrency,
  },
  unselectedItemAddress: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(8),
    textTransform: 'uppercase',
  },
  selectedNameText: {
    color: Colors.white,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(75.7),
    marginTop: wp(4),
  },
  currencyContainer: {
    marginTop: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
  },
  buttonViewContainer: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
    marginTop: hp(1.5),
  },
  buttonStyle: {
    width: wp(25),
    height: hp(3.5),
    borderWidth: wp(0.3),
    borderRadius: wp(1),
    borderColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    justifyContent: 'space-around',
  },
  imageStyle: {
    width: wp(4),
    height: hp(4),
  },
  textStyle: {
    fontSize: fSize(7.5),
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputStyle: {
    width: wp(80),
    borderRadius: wp(1),
    paddingLeft: wp(0.5),
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
    paddingRight: wp(0.5),
    fontSize: fSize(11),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    backgroundColor: Colors.white,
  },
  androidInputStyle: {
    height: hp(0),
  },
  iOSInputStyle: {
    height: hp(3),
  },
  editButtonContainer: {
    zIndex: 1000,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  nameContinerMargin: {
    marginTop: hp(1),
  },
  editWalletItemHeight: {
    height: hp(16),
  },
  editWalletItemAndroidHeight: {
    height: hp(20),
  },
  // modal style
  modalContainer: {
    ...ApplicationStyles.modalContainer,
    backgroundColor: Colors.dimBackground,
  },
  modalInnerContiner: {
    ...ApplicationStyles.modalAlertContainer,
    paddingVertical: wp(5),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modeliOSHeight: {
    height: hp(50),
  },
  modelAndroidHeight: {
    height: hp(60),
  },
  walletAddress: {
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(8),
    padding: wp(3),
    borderRadius: wp(3),
    textAlign: 'center',
    borderColor: Colors.boxBorder,
    borderWidth: wp(0.2),
  },
  qrModalButtonConainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  qrHideButtonStyle: {
    backgroundColor: Colors.whisperColor,
    height: hp(4),
    marginRight: wp(2),
    borderRadius: wp(2),
  },
  qrCopyButtonStyle: {
    backgroundColor: Colors.mediumTurquoise,
    height: hp(4),
    marginLeft: wp(2),
    borderRadius: wp(2),
  },
  qrHideTextStyle: {
    fontSize: fSize(8),
    textAlign: 'center',
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  qrCopyTextStyle: {
    fontSize: fSize(8),
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fiatGradientContainer: {
    width: wp(86.6),
    height: hp(9.3),
    borderRadius: wp(2),
    justifyContent: 'center',
    marginBottom: wp(4),
  },
  fiatMainContainer: {
    alignItems: 'center',
    marginTop: wp(3),
    justifyContent: 'center',
  },
  selectedWalletText: {
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
    textAlign: 'center',
    marginLeft: wp(1.5),
    textTransform: 'uppercase',
    flex: 0.4,
  },
  fiatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: wp(85.6),
  },
  fiatWalletBalanceText: {
    flex: 0.55,
    textAlign: 'right',
  },
  fiatWalletDescText: {
    fontFamily: Fonts.family.GothamRoundedLight,
    color: Colors.suvaGrey,
    fontSize: fSize(14),
    textAlign: 'center',
  },
  mercuryCashText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  walletText: {
    textTransform: 'lowercase',
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  listContentContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  emptyListImageStyle: {
    width: wp(20),
    height: wp(20),
  },
  emptyListHolder: {
    width: wp(100),
    height: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
