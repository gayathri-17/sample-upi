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
  },
  inputCardContainer: {
    backgroundColor: Colors.ghostWhite,
    marginTop: hp(1.59),
    height: hp(38),
    width: wp(86),
    borderRadius: wp(3.2),
    alignItems: 'center',
    marginBottom: hp(3),
  },
  contactPicker: {
    width: wp(74.6),
    height: hp(5.4),
  },
  inputTextStyle: {
    width: wp(74.6),
    marginTop: wp(3),
    fontFamily: Fonts.family.GothamRoundedMedium,
    borderRadius: wp(2.66),
    backgroundColor: Colors.white,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
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
  imputHeight: {
    height: hp(5),
  },
  emailText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.extraSmall),
    color: Colors.suvaGrey,
  },
  amountHeader: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.medium),
    color: Colors.suvaGrey,
    marginTop: hp(3.4),
  },
  amountInputText: {
    flexDirection: 'row',
  },
  dollerLogo: {
    flex: 0.1,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.input),
    color: Colors.suvaGrey,
  },
  convertedAmountContainer: {
    height: hp(5.4),
  },
  amountInput: {
    flex: 0.8,
    marginRight: wp(2),
    textAlign: 'right',
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.input),
    color: Colors.suvaGrey,
  },
  textInputDangerBorder: {
    ...ApplicationStyles.screen.textInputDangerBorder,
  },
  textInputBorderNill: {
    ...ApplicationStyles.screen.textInputBorderNill,
  },
  BTCinput: {
    backgroundColor: Colors.gradientRed,
  },
  ETHinput: {
    backgroundColor: Colors.etheriumCurrency,
  },
  DASHinput: {
    backgroundColor: Colors.dashCurrency,
  },
  convertedName: {
    flex: 0.2,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.medium),
    color: Colors.white,
  },
  convertedAmount: {
    color: Colors.white,
  },
  usdBalance: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.small),
    color: Colors.suvaGrey,
    marginVertical: wp(4),
  },
  cancelImage: {
    width: wp(13.3),
    height: hp(6.15),
  },
  cancelImageContainer: {
    marginTop: hp(2),
  },
})
