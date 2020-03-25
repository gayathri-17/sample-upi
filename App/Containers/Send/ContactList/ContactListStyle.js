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
  // Header style
  walletTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(0.5),
    marginLeft: wp(15),
    marginRight: wp(5),
  },
  walletTitleImageContainer: {
    justifyContent: 'center',
  },
  dotIconSize: {
    height: hp(0.8),
    width: wp(1.8),
  },
  imageStyle: {
    width: wp(9),
    height: hp(4.5),
  },
  textLowerCase: {
    textTransform: 'lowercase',
  },
  bankAccountTextStyle: {
    color: Colors.steelBlue,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(16),
    textAlign: 'center',
    marginLeft: wp(1),
    marginTop: wp(0.6),
  },
  walletTitleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(15),
    textAlignVertical: 'center',
    marginLeft: wp(1),
    marginRight: wp(1),
  },
  lineStyle: {
    height: hp(0.2),
    width: wp(78),
  },
  lineStyleForSeparotor: {
    height: hp(0.2),
    width: wp(90),
  },
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Input Style
  inputStyle: {
    width: wp(34),
    marginLeft: wp(2),
    borderRadius: wp(2),
    color: Colors.greySuit,
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 1.5,
    height: 40,
    width: wp(55),
    backgroundColor: Colors.searchInputColor,
    borderRadius: 5,
    margin: 10,
  },
  searchIconStyle: {
    padding: wp(2),
    height: wp(10),
    width: wp(8),
    marginLeft: wp(1),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  mikeIconStyle: {
    padding: wp(2),
    height: wp(10),
    width: wp(8),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  plusCircleIcon: {
    width: wp(10.6),
    height: hp(5.5),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderLineStyle: {
    width: wp(100),
    height: hp(1.4),
    marginTop: hp(1),
    backgroundColor: Colors.ghostWhite,
  },
})
