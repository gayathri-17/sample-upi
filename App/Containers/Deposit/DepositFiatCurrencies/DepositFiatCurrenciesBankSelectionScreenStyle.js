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
  parentContainer: {
    flex: 1,
    width: wp(100),
    alignItems: 'center',
  },
  sourceText: {
    marginTop: hp(3.5),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(12),
  },
  requiredFieldText: {
    width: wp(72.2),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
    marginTop: wp(2),
    textAlign: 'right',
  },
  bankPickerStyle: {
    marginLeft: wp(3),
    marginTop: wp(4),
    width: wp(72.2),
    height: hp(5.7),
    borderRadius: wp(2.66),
    backgroundColor: Colors.white,
    fontSize: fSize(Fonts.size.medium),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.steelBlue,
    paddingLeft: wp(2.13),
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: hp(0.5),
  },
  dropDownStyleMargin: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  manditoryStar: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    height: hp(1),
    fontSize: fSize(14),
    alignSelf: 'center',
    marginLeft: wp(2),
    marginTop: wp(4),
  },
  dropdownIconStyle: {
    top: hp(4.2),
    right: wp(4),
  },
  dropDownImageStyle: {
    width: wp(3.2),
    height: hp(1),
  },
  rowStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: hp(5),
    marginTop: wp(3),
  },
  smallTextStyle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(14),
    textAlign: 'center',
    alignSelf: 'center',
  },
  progressViewStyle: {
    marginLeft: wp(2),
  },
  progressStyle: {
    borderWidth: wp(0.6),
    width: wp(4),
    shadowColor: Colors.LightGrayishBlue,
    color: Colors.white,
  },
  percentTextStyle: {
    fontSize: fSize(8),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  arrowStyle: {
    width: wp(10),
    height: hp(10),
  },
  backContainer: {
    marginTop: hp(3),
  },
  fundPickerNillBg: {
    width: wp(72.2),
    height: hp(5.7),
    backgroundColor: Colors.snowGrey,
    marginLeft: wp(3),
    marginTop: wp(4),
    borderRadius: wp(2.66),
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.medium),
    color: Colors.steelBlue,
    paddingLeft: wp(2.13),
    marginRight: wp(2.1),
  },
  fundPickerStyle: {
    marginLeft: wp(3),
    marginTop: wp(4),
    width: wp(72.2),
    height: hp(5.7),
    borderRadius: wp(2.66),
    backgroundColor: Colors.white,
    fontSize: fSize(Fonts.size.medium),
    color: Colors.steelBlue,
    paddingLeft: wp(2.13),
    fontFamily: Fonts.family.GothamRoundedMedium,
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: hp(0.5),
  },
  validOtherText: {
    color: Colors.coralRed,
  },
  textInputDangerBorder: {
    borderColor: Colors.coralRed,
    borderWidth: 1,
  },
  arrowContainer: {
    justifyContent: 'center',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
  },
  arrowContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
    width: wp(65),
  },
  arrowRowStyle: {
    flexDirection: 'row',
    marginTop: wp(3),
  },
})
