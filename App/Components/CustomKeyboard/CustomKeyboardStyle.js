import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Colors, Fonts } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
  },
  containerView: {
    width: wp(90),
    height: hp(25),
    backgroundColor: Colors.ghostWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountTextContainer: {
    backgroundColor: Colors.white,
    width: wp(70),
    height: hp(7),
    marginTop: hp(1),
    borderRadius: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  convertedAmount: {
    color: Colors.white,
  },
  imageContainer: {
    marginLeft: wp(2),
    marginRight: wp(2),
    justifyContent: 'center',
  },
  amountTextStyle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(16),
    textAlign: 'right',
  },
  symbolWidth: {
    width: wp(4),
  },
  amountInputText: {
    flexDirection: 'row',
    height: hp(6),
    justifyContent: 'space-between',
  },
  dollerLogo: {
    flex: 0.1,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(18),
    color: Colors.suvaGrey,
    marginTop: wp(1),
  },
  amountInput: {
    flex: 0.85,
    marginRight: wp(2),
    textAlign: 'right',
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(18),
    color: Colors.suvaGrey,
  },
  inputTextStyle: {
    width: wp(80),
    margin: wp(2),
    height: hp(7),
    fontFamily: Fonts.family.GothamRoundedMedium,
    borderRadius: wp(2.66),
    backgroundColor: Colors.white,
    color: Colors.suvaGrey,
    fontSize: fSize(Fonts.size.extraSmall),
    paddingLeft: wp(2.13),
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: hp(0.5),
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  balanceTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.small),
    color: Colors.suvaGrey,
    marginTop: wp(1),
  },
  walletTitleText: {
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(Fonts.size.medium),
    color: Colors.suvaGrey,
    marginTop: wp(2),
  },
  numberContainer: {
    alignItems: 'center',
  },
  textMargin: {
    marginTop: hp(2),
  },
  rowStyle: {
    flexDirection: 'row',
  },
  numberStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    width: wp(23),
    height: hp(10),
    textAlign: 'center',
    fontSize: fSize(45),
    color: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: wp(5),
    height: hp(5),
  },
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainerStyle: {
    justifyContent: 'space-between',
    marginBottom: hp(3),
    alignSelf: 'center',
    width: wp(65),
  },
  arrowStyle: {
    width: wp(10),
    height: hp(10),
  },
  alignPositionStart: {
    justifyContent: 'flex-start',
  },
  rightMargin: {
    marginRight: wp(0.2),
    textAlign: 'center',
  },
  convertedName: {
    flex: 0.25,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(18),
    color: Colors.white,
  },
  currencyFlex: {
    flex: 0.25,
  },
  valueFlex: {
    flex: 0.75,
  },
  alignleft: {
    textAlign: 'left',
  },
})
