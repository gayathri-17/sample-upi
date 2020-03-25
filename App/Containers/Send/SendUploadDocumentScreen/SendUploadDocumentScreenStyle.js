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
  detailTransferContainer: {
    width: wp(70),
    height: hp(10),
    justifyContent: 'space-around',
  },
  detailGetContainer: {
    height: hp(7),
    width: wp(70),
    justifyContent: 'center',
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
  // from to style
  fromToContainer: {
    width: wp(70),
    height: hp(13),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  margin: {
    marginTop: hp(2),
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
    marginLeft: wp(1),
    marginRight: wp(3),
    backgroundColor: Colors.whisperColor,
  },
  acronymTextStyle: {
    color: Colors.suvaGrey,
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  // arrow container style
  arrowStyle: {
    width: wp(10),
    height: hp(10),
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
  // upload document container
  uploadDocumentContainer: {
    flexDirection: 'column',
    width: wp(75),
    marginTop: hp(3),
  },
  invoiceTextContainer: {
    width: wp(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoiceTextStyle: {
    width: wp(50),
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  // upload document
  documentContainer: {
    width: wp(75),
    height: hp(6.6),
    borderRadius: wp(2),
    marginTop: hp(3.2),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.mediumTurquoise,
    justifyContent: 'space-evenly',
  },
  documentText: {
    flex: 0.8,
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  uploadImageStyle: {
    height: hp(2.9),
    width: wp(6.4),
  },
  // description container
  descriptionContainer: {
    width: wp(75),
    height: hp(4),
    marginTop: hp(2),
  },
  descriptionTextStyle: {
    width: wp(75),
    height: hp(10),
    padding: wp(0.5),
    borderRadius: wp(2),
    borderWidth: wp(0.4),
    borderColor: Colors.lightGrey,
    fontFamily: Fonts.family.GothamRoundedBook,
    color: Colors.suvaGrey,
    fontSize: fSize(12),
  },
  switchStyle: {
    width: wp(5),
    height: hp(3),
    margin: 3,
  },
})
