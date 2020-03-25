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
    marginLeft: wp(8),
    marginRight: wp(8),
  },
  // header style
  headerContainer: {
    flexDirection: 'row',
    height: hp(15),
    borderBottomColor: Colors.aliceBlue,
    borderBottomWidth: hp(0.2),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleStyle: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(16) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whisperColor,
  },
  acronymTextStyle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  editContactView: {
    width: wp(5.5),
    height: wp(5.5),
  },
  firstNameStyle: {
    color: Colors.black,
    fontSize: fSize(16),
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  lastNameStyle: {
    color: Colors.black,
    fontSize: fSize(16),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  nameContainer: {
    flexDirection: 'row',
    marginLeft: wp(5),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // body style
  bodyContainer: {
    flexDirection: 'column',
  },
  headerNameContainer: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(10),
  },
  valueNameContainer: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
    marginTop: wp(1),
  },
  marginForView: {
    marginTop: hp(5),
  },
  curencyIconSize: {
    height: wp(10),
    width: wp(10),
  },
  currencyView: {
    marginLeft: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currencyContainer: {
    marginLeft: wp(1.5),
  },
  buttonContainer: {
    position: 'absolute',
    width: wp(84),
    marginBottom: hp(8),
    justifyContent: 'space-around',
    flexDirection: 'row',
    bottom: 0,
  },
  buttonStyle: {
    width: wp(37),
    height: hp(6),
  },
})
