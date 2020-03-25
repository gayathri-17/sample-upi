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
    backgroundColor: Colors.dimBackground,
  },
  alertContainer: {
    ...AppStyles.modalAlertContainer,
  },
  closeView: {
    ...AppStyles.modalCloseView,
  },
  cancelImage: {
    width: wp(8),
    height: wp(8),
  },
  ErrorIconView: {
    alignItems: 'center',
  },
  errorIcon: {
    width: wp(40),
    height: wp(40),
  },
  errorMessage: {
    marginTop: hp(6.15),
    marginRight: wp(10.66),
    marginBottom: hp(3.69),
    marginLeft: wp(10.66),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(15),
    textAlign: 'center',
  },
  buttonView: {
    height: hp(5.9),
    alignItems: 'center',
    marginBottom: hp(4.06),
  },
  button: {
    width: wp(38.4),
  },
  absolute: {
    ...AppStyles.absolute,
  },
})
