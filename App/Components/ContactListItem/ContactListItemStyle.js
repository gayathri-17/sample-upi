import { StyleSheet } from 'react-native'
import { Fonts, Colors } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  containerStyle: {
    marginRight: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(5),
    height: hp(6),
    backgroundColor: Colors.white,
    shadowColor: Colors.CrayolaCrysta,
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  touchableContainer: {
    flexDirection: 'row',
    marginLeft: wp(5),
    alignItems: 'center',
  },
  circleStyle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mediumTurquoise,
  },
  textStyle: {
    fontSize: fSize(12),
    color: Colors.black,
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  searchTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  acronymTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  imageStyle: {
    width: wp(8),
    height: hp(4.5),
  },
  currencyStyle: {
    marginLeft: wp(5),
    marginRight: wp(3),
  },
  contactWidth: {
    width: wp(55),
  },
})
