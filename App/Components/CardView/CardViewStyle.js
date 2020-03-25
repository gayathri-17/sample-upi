import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Colors, Fonts } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: hp(0.5),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: hp(1),
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    height: hp(20),
    elevation: 5,
  },
  containetColorEnable: {
    backgroundColor: Colors.white,
  },
  containerColorDisable: {
    backgroundColor: Colors.disableViewColor,
  },
  gradientCircleStyle: {
    height: hp(8),
    width: hp(8),
    borderRadius: hp(4),
    justifyContent: 'center',
  },
  circleTextContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountTypeTitle: {
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
  },
  accountTypeTitleDisable: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
  },
  accountTypeDescription: {
    color: Colors.primaryGrey,
    fontFamily: Fonts.family.GothamRoundedLight,
    fontSize: fSize(12),
  },
  accountTypeDescriptionDisable: {
    color: Colors.textGray,
    fontFamily: Fonts.family.GothamRoundedLight,
    fontSize: fSize(12),
  },
  accountTypeCount: {
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
    textAlign: 'center',
  },
  accountTypeCountDisable: {
    color: Colors.ghostWhite,
    fontFamily: Fonts.family.GothamRoundedMedium,
    textAlign: 'center',
  },

  androidText: {
    fontSize: fSize(25),
    alignSelf: 'center',
  },
  iOSText: {
    fontSize: fSize(30),
    height: hp(4),
  },
  titleText: {
    width: wp(60),
    marginLeft: wp(5),
  },
})
