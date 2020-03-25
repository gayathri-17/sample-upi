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
  // carousel style
  selectViewStyle: {
    height: hp(65),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderStyle: {
    width: wp(100),
  },
  imageStyle: {
    width: wp(44.8),
    height: hp(20.6),
  },
  itemContainer: {
    width: wp(50.8),
    height: hp(57.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  CurrencyText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
    marginTop: wp(5),
  },
  bitCoinText: {
    color: Colors.bitcoinCurrency,
  },
  dashText: {
    color: Colors.dashCurrency,
  },
  etheriumText: {
    color: Colors.etheriumCurrency,
  },
  textDisable: {
    color: Colors.suvaGrey,
  },
})
