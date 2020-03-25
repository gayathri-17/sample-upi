import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import AppStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  walletTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
    marginLeft: wp(13),
    marginRight: wp(5),
  },
  walletTitleImageContainer: {
    justifyContent: 'center',
  },
  dotIconSize: {
    height: hp(0.8),
    width: wp(1.8),
  },
  walletTitleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(15),
    textAlignVertical: 'center',
    marginLeft: wp(1),
    marginTop: hp(0.6),
  },
  bankAccountTextStyle: {
    color: Colors.steelBlue,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
    textAlignVertical: 'center',
    marginLeft: wp(1),
    marginTop: wp(1.5),
  },
  lineStyle: {
    ...AppStyles.lineStyle,
    marginLeft: wp(10),
  },
  typeViewStyle: {
    width: wp(40),
    height: hp(3.5),
    marginLeft: wp(2),
    flexDirection: 'row',
  },
  addressContainer: {
    width: wp(19.8),
    height: hp(3.5),
    borderTopLeftRadius: wp(2),
    borderBottomLeftRadius: wp(2),
    borderTopWidth: wp(0.3),
    borderBottomWidth: wp(0.3),
    borderLeftWidth: wp(0.3),
    borderColor: Colors.suvaGrey,
  },
  addressSelectedContainer: {
    width: wp(19.8),
    height: hp(3.5),
    borderTopLeftRadius: wp(2),
    borderBottomLeftRadius: wp(2),
  },
  contactContainer: {
    width: wp(19.8),
    height: hp(3.5),
    borderTopRightRadius: wp(2),
    borderBottomRightRadius: wp(2),
    borderTopWidth: wp(0.3),
    borderBottomWidth: wp(0.3),
    borderRightWidth: wp(0.3),
    borderColor: Colors.suvaGrey,
  },
  contactSelectedContainer: {
    width: wp(19.8),
    height: hp(3.5),
    borderTopRightRadius: wp(2),
    borderBottomRightRadius: wp(2),
  },
  typeSelectedText: {
    color: Colors.white,
    fontSize: fSize(11),
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  typeNormalText: {
    color: Colors.suvaGrey,
    fontSize: fSize(11),
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
