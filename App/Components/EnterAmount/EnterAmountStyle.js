import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Colors, Fonts } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  walletTitleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(15),
    textAlignVertical: 'center',
    marginLeft: wp(1),
    marginTop: hp(0.6),
  },
  textMargin: {
    marginTop: hp(2),
  },
  amountContainer: {
    width: wp(80),
    height: hp(18),
    borderRadius: wp(2),
    marginTop: hp(2),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  amountTextContainer: {
    backgroundColor: Colors.white,
    width: wp(67),
    height: hp(7),
    marginTop: hp(2),
    borderRadius: wp(2),
    flexDirection: 'row',
  },
  imageContainer: {
    marginLeft: wp(2),
    marginRight: wp(2),
    justifyContent: 'center',
  },
  symbolWidth: {
    width: wp(4),
  },
  amountTextStyle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(25),
    textAlign: 'right',
  },
  amountWidth: {
    width: wp(55),
  },
  balanceTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(12),
    textAlign: 'center',
    marginBottom: hp(1),
  },
  centerStyle: {
    alignItems: 'center',
  },
})
