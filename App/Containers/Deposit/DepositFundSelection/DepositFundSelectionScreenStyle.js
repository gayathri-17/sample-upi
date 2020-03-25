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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  // amount detail container
  detailContainer: {
    width: wp(70),
    height: hp(20),
    margin: wp(5),
    backgroundColor: Colors.snowGrey,
    borderRadius: wp(2),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  margin: {
    marginTop: hp(2),
  },

  detailTransferContainer: {
    width: wp(70),
    height: hp(10),
    justifyContent: 'space-around',
  },
  detailTextContainer: {
    width: wp(70),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  detailTextStyle: {
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedBook,
    color: Colors.suvaGrey,
    textAlign: 'right',
  },
  titleTextStyle: {
    width: wp(30),
    textAlign: 'right',
  },
  textLeftAlign: {
    width: wp(30),
    textAlign: 'left',
  },
  lineStyle: {
    width: wp(70),
    height: wp(0.5),
    color: Colors.aliceBlue,
  },
  detailGetContainer: {
    height: hp(7),
    width: wp(70),
    justifyContent: 'center',
  },
  // from to style
  fromToContainer: {
    height: hp(13),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  fromToHeaderContainer: {
    width: wp(70),
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromToTextStyle: {
    textAlign: 'right',
    flex: 0.3,
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  fromToAddressTextStyle: {
    textAlign: 'left',
    width: wp(30),
    marginLeft: wp(2),
    color: Colors.curiousBlue,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
    alignSelf: 'center',
  },
  textLogoContainer: {
    flexDirection: 'row',
    marginLeft: wp(5),
    flex: 0.7,
  },
  toTextFlex: {
    flex: 0.7,
    marginLeft: wp(5),
  },
  sourceText: {
    marginTop: hp(3.5),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(12),
    textAlign: 'center',
  },
  requiredFieldText: {
    width: wp(72.2),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
    marginTop: wp(2),
    textAlign: 'right',
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
  textInputDangerBorder: {
    borderColor: Colors.coralRed,
    borderWidth: 1,
  },
  validOtherText: {
    color: Colors.coralRed,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(6),
    width: '100%',
  },
  rowStyle: {
    flexDirection: 'row',
  },
  arrowContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
    width: wp(65),
  },
  arrowStyle: {
    width: wp(10),
    height: hp(10),
  },
})
