import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import Colors from '../../Theme/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Fonts from '../../Theme/Fonts'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  walletBalanceMainContainer: {
    alignItems: 'center',
  },
  walletBalanceContainer: {
    width: wp(84),
    marginLeft: wp(5),
    paddingTop: hp(2.7),
  },
  swiperStyle: {
    height: hp(18),
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
  },
  balanceImageStyle: {
    width: wp(13.2),
    height: hp(7.17),
  },
  balanceText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    textAlignVertical: 'center',
    fontSize: fSize(40),
    marginLeft: wp(2),
    width: wp(70),
  },
  balanceTextiOS: {
    // marginTop: wp(4),
  },
  balanceSwiperStyle: {
    marginTop: wp(1),
  },
  sample: {
    textAlign: 'center',
    fontSize: fSize(9),
    color: Colors.white,
  },
  dotContainer: {
    borderRadius: 12,
    width: wp(11.9),
    height: hp(2.8),
    alignItems: 'center',
    backgroundColor: Colors.mediumTurquoise,
    justifyContent: 'center',
  },
  borderLineStyle: {
    width: wp(100),
    height: hp(1.4),
    backgroundColor: Colors.ghostWhite,
  },
  gradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientStyle: {
    width: wp(75),
    height: hp(29),
    borderRadius: wp(2),
    paddingLeft: wp(2),
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secureButtonContainer: {
    backgroundColor: Colors.white,
    borderRadius: wp(1),
    width: wp(40),
    height: hp(6),
  },
  twoway_title_text: {
    color: Colors.white,
    fontSize: fSize(14),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  twoway_content_text: {
    color: Colors.white,
    fontSize: fSize(11),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  buttonText: {
    color: Colors.red,
    fontSize: fSize(13),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  listContainer: {
    marginHorizontal: wp(3),
    marginTop: hp(2),
  },
  walletTitleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(15),
    textAlignVertical: 'center',
    marginLeft: wp(1),
    marginTop: wp(0.6),
  },
  walletTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
  },
  walletTitleImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotIconSize: {
    height: hp(0.8),
    width: wp(1.8),
  },
  dotNormalContainer: {
    height: hp(2.8),
    width: wp(18),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  dotActiveContainer: {
    width: wp(18),
    height: hp(2.8),
    padding: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mediumTurquoise,
    borderRadius: 12,
  },
  normalDotText: {
    textAlign: 'center',
    fontSize: fSize(8.5),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
  },
  activeDotText: {
    textAlign: 'center',
    fontSize: fSize(7.5),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.white,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMoreTextStyle: {
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
    padding: wp(2),
  },
})
