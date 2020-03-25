/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */

import { Colors, Fonts } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default {
  screen: {
    container: {
      flex: 1,
    },
    mercuryText: {
      color: Colors.suvaGrey,
    },
    cashText: {
      color: Colors.mediumTurquoise,
    },
    blackSmallTextStyle: {
      color: Colors.suvaGrey,
      fontSize: fSize(Fonts.size.medium),
      fontFamily: Fonts.family.GothamRoundedMedium,
    },
    greenSmallTextStyle: {
      color: Colors.mediumTurquoise,
      fontSize: fSize(Fonts.size.medium),
      fontFamily: Fonts.family.GothamRoundedMedium,
    },
    fieldContainer: {
      flex: 0.7,
    },
    inputTextStyle: {
      width: wp(80),
      height: hp(5.78),
      fontFamily: Fonts.family.GothamRoundedMedium,
      borderRadius: wp(2),
      backgroundColor: Colors.ghostWhite,
      color: Colors.suvaGrey,
      fontSize: fSize(Fonts.size.medium),
      paddingLeft: wp(3.7),
      marginTop: hp(1.72),
    },
    backButtonContainer: {
      marginTop: hp(1.2),
      height: hp(4.92),
      padding: wp(2),
    },
    backTextStyle: {
      fontFamily: Fonts.family.GothamRoundedMedium,
      color: Colors.suvaGrey,
    },
    dropDownStyles: {
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: wp(2),
      borderWidth: wp(0),
      paddingLeft: wp(2),
      borderColor: Colors.dropDownBorder,
      fontFamily: Fonts.family.GothamRoundedMedium,
      fontSize: fSize(Fonts.size.medium),
      color: Colors.suvaGrey,
    },
    inputFieldTitle: {
      marginTop: hp(2.8),
      marginLeft: wp(10.53),
      color: Colors.mediumTurquoise,
      fontFamily: Fonts.family.GothamRoundedMedium,
      fontSize: fSize(12),
    },
    textInputDangerBorder: {
      borderColor: Colors.coralRed,
      borderWidth: 1,
    },
    textInputBorderNill: {
      borderColor: Colors.transparent,
      borderWidth: 0,
    },
    buttonGreyShadow: {
      shadowColor: Colors.suvaGrey,
      shadowOffset: {
        width: 0,
        height: hp(0.25),
      },
      shadowOpacity: 0.2,
      elevation: 1,
      shadowRadius: hp(0.5),
    },
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    width: wp(100),
    height: hp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalAlertContainer: {
    width: wp(88),
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
  modalCloseView: {
    marginTop: hp(1.23),
    marginLeft: wp(3),
    height: 30,
    flexDirection: 'row-reverse',
  },
  lineStyle: {
    height: hp(0.2),
    width: wp(78),
  },
}
