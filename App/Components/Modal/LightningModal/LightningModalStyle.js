import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import AppStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...AppStyles.modalContainer,
  },
  alertContainer: {
    ...AppStyles.modalAlertContainer,
    height: hp(60),
  },
  closeView: {
    ...AppStyles.modalCloseView,
  },
  cancelImage: {
    width: wp(8),
    height: wp(8),
  },
  infoIconView: {
    alignItems: 'center',
  },
  infoIcon: {
    width: wp(40),
    height: wp(40),
  },
  message: {
    marginTop: hp(2.99),
    marginRight: wp(10.66),
    marginBottom: hp(3.69),
    marginLeft: wp(10.66),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
    lineHeight: hp(3),
  },
  absolute: {
    ...AppStyles.absolute,
  },
  lineStyle: {
    ...AppStyles.lineStyle,
    marginStart: wp(5),
  },
  shareContainer: {
    justifyContent: 'space-around',
    marginTop: hp(3),
    flex: 1,
    flexDirection: 'row',
    width: wp(78),
    height: hp(10),
  },
  socioTouch: {
    marginStart: wp(7),
    width: wp(6),
    height: wp(6),
  },
})
