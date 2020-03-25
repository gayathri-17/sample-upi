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
    width: wp(89.0),
    height: hp(30),
    borderRadius: hp(1),
    margin: wp(5),
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0.5,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  detailTextContainer: {
    width: wp(92),
    paddingLeft: wp(8),
    paddingRight: wp(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  detailTextStyle: {
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedBook,
    color: Colors.suvaGrey,
    textAlign: 'right',
  },
  lineStyle: {
    width: wp(89),
    height: wp(0.5),
    color: Colors.aliceBlue,
  },
  detailTransferContainer: {
    width: wp(89),
    height: hp(19),
    justifyContent: 'space-around',
  },
  detailGetContainer: {
    height: hp(9),
    width: wp(89),
    justifyContent: 'center',
  },
  titleTextStyle: {
    width: wp(25),
    textAlign: 'right',
  },
  textLeftAlign: {
    width: wp(30),
    textAlign: 'left',
  },
  // from to style
  fromToContainer: {
    width: wp(80),
    height: hp(14),
    justifyContent: 'space-around',
  },
  margin: {
    marginTop: hp(6),
  },
  fromToHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromToTextStyle: {
    textAlign: 'right',
    width: wp(23),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(14),
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
    justifyContent: 'center',
    marginLeft: wp(10),
  },
  leftMargin: {
    marginLeft: wp(4),
  },
  circleStyle: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2),
    backgroundColor: Colors.whisperColor,
  },
  acronymTextStyle: {
    color: Colors.suvaGrey,
    textAlign: 'left',
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  // arrow container style
  arrowStyle: {
    width: wp(10),
    height: hp(10),
  },
  arrowContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
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
  // rate for currency
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountContainerMargin: {
    marginTop: hp(3),
  },
  lightningTextStyle: {
    marginRight: wp(2),
    color: Colors.suvaGrey,
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  // loader modal
  parentContainer: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
    marginLeft: wp(1),
    marginRight: wp(1),
    marginBottom: wp(3),
    marginTop: wp(23),
    borderRadius: wp(4),
    justifyContent: 'space-around',
  },
  progressLogoStyle: {
    width: wp(75),
    height: hp(50),
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionTextStyle: {
    color: Colors.white,
    fontSize: fSize(35),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  inProgressTextStyle: {
    color: Colors.white,
    fontSize: fSize(18),
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  backTextStyle: {
    ...ApplicationStyles.screen.backTextStyle,
  },
  cryptoFontSize: {
    fontSize: fSize(10),
  },
  rateText: {
    color: Colors.btcInput,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
    marginRight: wp(1),
  },
  guarantyText: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(12),
    marginRight: wp(1),
  },
  rateCompareText: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
    marginRight: wp(1),
  },
  rateContainer: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
})
