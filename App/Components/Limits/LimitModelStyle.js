import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  modalContainer: {
    width: wp(100),
    height: hp(100),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: Colors.dimBackground,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  ErrorIconView: {
    alignItems: 'center',
  },
  progressStyleModal: {
    borderWidth: wp(2),
    width: wp(20),
    shadowColor: Colors.LightGrayishBlue,
    color: Colors.white,
  },
  progressStyle: {
    borderWidth: wp(0.6),
    width: wp(5),
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
  marginForView: {
    marginTop: hp(3),
  },
  limitTextrowStyle: {
    flexDirection: 'row',
    marginTop: hp(2),
    height: hp(4),
    marginLeft: wp(3),
    marginRight: wp(4),
    alignItems: 'center',
  },
  limitTextStyle: {
    fontSize: fSize(12),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  widthForTitle: {
    width: wp(31),
    textAlign: 'right',
  },
  textSizeForLimit: {
    fontSize: fSize(14),
  },
  widthForText: {
    textAlign: 'left',
    marginLeft: wp(5),
  },
  borderSendStyle: {
    borderWidth: 2,
    height: hp(4),
    width: wp(57),
    alignSelf: 'center',
    borderRadius: hp(2.5),
    paddingRight: wp(4),
    paddingLeft: wp(4),
  },
  usedTextStyle: {
    fontSize: fSize(12),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomMargin: {
    marginBottom: hp(3),
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
})
