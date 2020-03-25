/* istanbul ignore file */
import { StyleSheet } from 'react-native'
import Colors from '../../Theme/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import Fonts from '../../Theme/Fonts'

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },

  wrapperIOS: {
    backgroundColor: 'transparent',
  },

  wrapperAndroid: {
    backgroundColor: 'transparent',
    flex: 1,
  },

  slide: {
    backgroundColor: 'transparent',
  },

  pagination_x: {
    position: 'absolute',
    bottom: hp(2.7),
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  pagination_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  title: {
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 10,
    bottom: -30,
    left: 0,
    flexWrap: 'nowrap',
    width: 250,
    backgroundColor: 'transparent',
  },

  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 50,
    color: '#007aff',
  },
  dotNormalContainer: {
    height: hp(2.8),
    width: wp(13),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  dotActiveContainer: {
    width: wp(14),
    height: hp(2.8),
    padding: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mediumTurquoise,
    borderRadius: 12,
    marginHorizontal: wp(2.5),
  },
  normalDotText: {
    textAlign: 'center',
    fontSize: fSize(8.8),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
  },
  activeDotText: {
    textAlign: 'center',
    fontSize: fSize(8.5),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.white,
  },
  dotMainContainerStyle: {
    justifyContent: 'space-evenly',
    marginLeft: wp(1),
    marginRight: wp(10),
  },
  walletTitleContainer: {
    flexDirection: 'row',
    marginLeft: wp(5),
  },
  walletTitleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(16),
    textAlignVertical: 'center',
    marginLeft: wp(1),
    marginTop: wp(1),
  },
  walletTitleImageContainer: {
    justifyContent: 'center',
  },
  dotIconSize: {
    height: hp(0.8),
    width: wp(1.8),
  },
  margins: {
    marginTop: wp(4),
  },
})
