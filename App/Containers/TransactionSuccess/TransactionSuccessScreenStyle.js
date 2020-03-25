import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import Colors from '../../Theme/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Fonts from '../../Theme/Fonts'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  parentContainer: {
    backgroundColor: Colors.mediumTurquoise,
    flex: 1,
    margin: wp(3),
    borderRadius: wp(4),
    alignItems: 'center',
    paddingTop: hp(6.1),
  },
  checkImage: {
    width: wp(37.0),
    height: hp(16.3),
  },
  successText: {
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(20),
    color: Colors.white,
    marginTop: hp(2.3),
    marginBottom: wp(6),
  },
  amountContainer: {
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountContainerSent: {
    marginBottom: hp(3.6),
  },
  amountContainerFee: {
    marginBottom: hp(1.6),
  },
  amountContainerGot: {
    marginBottom: hp(4.2),
  },
  titleTextName: {
    flex: 0.5,
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.white,
    fontSize: fSize(16),
    marginRight: wp(2),
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  titleTextValue: {
    flex: 0.5,
    fontFamily: Fonts.family.GothamRoundedBook,
    color: Colors.white,
    fontSize: fSize(15),
    marginLeft: wp(2),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  lineStyle: {
    width: wp(77),
    height: hp(0.07),
    backgroundColor: Colors.white,
    marginBottom: hp(2.8),
  },
  lineStyleAliceBlue: {
    width: wp(79.4),
    height: hp(0.1),
    backgroundColor: Colors.aliceBlue,
  },
  infoView: {
    width: wp(85.6),
    height: hp(12.9),
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  infoToContainer: {
    width: wp(85.6),
  },
  infoToTextName: {
    flex: 0.4,
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: 15,
    marginRight: wp(2),
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  infoTextValue: {
    flex: 0.6,
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.steelBlue,
    fontSize: 15,
    marginLeft: wp(2),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  infoFromValueContainer: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
  },
  infoFromValueText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.steelBlue,
    fontSize: 15,
    marginLeft: wp(2),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  fromLogo: {
    width: wp(9),
    height: hp(4),
  },
  cancelImage: {
    width: wp(13.5),
    height: hp(6),
  },
  circleStyle: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whisperColor,
  },
  acronymTextStyle: {
    color: Colors.suvaGrey,
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  rateTextStyle: {
    color: Colors.white,
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedMedium,
    marginTop: hp(0.5),
    marginBottom: hp(0.5),
  },
  subView: {
    flex: 0.5,
    width: wp(30),
    marginLeft: wp(2),
  },
  amountViewText: {
    color: Colors.white,
    fontSize: fSize(15),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  amountSubViewText: {
    color: Colors.white,
    fontSize: fSize(13),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  closeView: {
    marginTop: hp(1),
  },
})
