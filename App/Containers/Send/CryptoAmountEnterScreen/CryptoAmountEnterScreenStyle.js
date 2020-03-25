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
  // header style
  walletTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3),
    marginBottom: hp(3),
    marginLeft: wp(8),
    marginRight: wp(5),
  },
  walletTitleImageContainer: {
    justifyContent: 'center',
  },
  dotIconSize: {
    height: hp(0.8),
    width: wp(1.8),
  },
  textLowerCase: {
    textTransform: 'lowercase',
  },
  bankAccountTextStyle: {
    color: Colors.steelBlue,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(16),
    textAlignVertical: 'center',
    width: wp(20),
    marginLeft: wp(1),
    marginRight: wp(1),
    marginTop: wp(1),
  },
  rowStyle: {
    flexDirection: 'row',
  },
  walletTitleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(15),
    textAlignVertical: 'center',
    marginLeft: wp(1),
    marginTop: hp(0.6),
    marginRight: wp(1),
  },
  // arrow container style
  arrowContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
    width: wp(65),
  },
  arrowStyle: {
    width: wp(10),
    height: hp(10),
  },
  arrowContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
  },
  progressStyle: {
    borderWidth: wp(0.6),
    width: wp(5),
    shadowColor: Colors.LightGrayishBlue,
    color: Colors.white,
  },
  progressViewStyle: {
    marginLeft: wp(2),
  },
  percentTextStyle: {
    fontSize: fSize(10),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  circleStyle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10) / 2,
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
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
