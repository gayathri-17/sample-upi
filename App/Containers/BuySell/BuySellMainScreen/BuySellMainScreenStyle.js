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
    marginTop: hp(6),
  },
  // title container style
  titleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(2),
    width: wp(76.8),
  },
  titleContainer: {
    width: wp(76.8),
  },
  cancelImage: {
    width: wp(13.3),
    height: hp(6.15),
  },
  dotIconSize: {
    height: hp(0.8),
    width: wp(1.8),
  },
  titleDotContainer: {
    marginLeft: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTxt: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(16),
    marginLeft: wp(2),
  },
  // buy sell continer
  selectViewStyle: {
    height: hp(65),
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  // icon size
  iconSize: {
    width: wp(28),
    height: wp(28),
  },
  textStyleSelected: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
    marginTop: wp(5),
    color: Colors.mediumTurquoise,
  },
  textStyleNormal: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
    marginTop: wp(5),
    color: Colors.boxBorder,
  },
  viewContainer: {
    width: wp(100),
    alignItems: 'center',
  },
})
