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
  titleText: {
    marginTop: wp(2),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
  },
  titleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(2),
  },
  bankDetail: {
    width: wp(37.6),
    margin: wp(3),
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(2),
    alignItems: 'center',
  },
  addBankDetail: {
    width: wp(37.6),
    height: hp(25.9),
    margin: wp(3),
    backgroundColor: Colors.mediumTurquoise,
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  flatlist: {
    marginTop: wp(2),
    justifyContent: 'space-evenly',
  },
  bankText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    textAlign: 'center',
    fontSize: fSize(10),
    color: Colors.suvaGrey,
    marginTop: wp(3),
  },
  statusText: {
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedMedium,
    marginVertical: wp(1),
  },
  statusVefified: {
    color: Colors.mediumTurquoise,
  },
  statusPending: {
    color: Colors.suvaGrey,
  },
  statusRejected: {
    color: Colors.pink,
  },
  addBankText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.white,
    fontSize: fSize(12),
    textAlign: 'center',
  },
  addImage: {
    width: wp(15),
    height: hp(8),
  },
  statusBtn: {
    width: wp(28),
    height: hp(2.5),
    backgroundColor: Colors.mediumTurquoise,
    borderRadius: wp(1),
    marginTop: wp(3),
    textAlign: 'center',
    fontSize: fSize(10),
    color: Colors.white,
    paddingTop: wp(1),
  },
  backButtonStyle: {
    marginTop: hp(2),
  },
  bottomMargin: {
    marginBottom: hp(5),
  },
})
