import { StyleSheet } from 'react-native'
import { Fonts, Colors } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  listItemStyle: {
    flexDirection: 'row',
    marginBottom: hp(1),
    marginTop: hp(1),
    paddingTop: hp(0.5),
    flex: 1,
  },
  listDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listAmountContainer: {
    flexDirection: 'column',
    width: '40%',
  },
  firstRowTextStyle: {
    color: Colors.cyanBlue,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12.5),
  },
  secondRowStyle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  thirdRowStyle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedLight,
    marginRight: wp(16),
    fontSize: fSize(11),
  },
  imageContainerStyle: {
    justifyContent: 'center',
    flex: 0.2,
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: wp(2),
    flex: 0.8,
  },
  imageStyle: {
    width: wp(9),
    height: hp(4.5),
  },
  cardContainer: {
    marginLeft: wp(6),
    marginRight: wp(6),
  },
  extraDetailTextStyle: {
    backgroundColor: Colors.snowGrey,
    color: Colors.suvaGrey,
    fontSize: fSize(12),
    paddingTop: hp(0.3),
    paddingLeft: wp(1.5),
    fontFamily: Fonts.family.GothamRoundedLight,
  },
  extraHeaderTextStyle: {
    backgroundColor: Colors.white,
    color: Colors.suvaGrey,
    fontSize: fSize(12),
    marginTop: hp(0.5),
    paddingLeft: wp(0.8),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  containerStyle: {
    marginBottom: hp(2),
    marginRight: wp(2),
    backgroundColor: Colors.white,
    shadowColor: Colors.CrayolaCrysta,
  },
  borderStyle: {
    shadowOffset: { width: wp(0.1), height: wp(0.1) },
    shadowOpacity: 0.2,
    borderRadius: wp(1.5),
    elevation: wp(1),
    borderWidth: 0.5,
    borderColor: Colors.CrayolaCrystal,
  },
  hashTextContainer: {
    backgroundColor: Colors.mediumTurquoise,
    borderRadius: wp(5),
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: hp(2),
    marginBottom: hp(2),
    paddingTop: hp(0.8),
    paddingBottom: hp(0.8),
  },
  hashTextStyle: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(10),
  },
  hashTokenStyle: {
    color: Colors.white,
    textAlign: 'center',
    marginLeft: wp(1),
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(9),
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp(2),
  },
  sendButtonStyle: {
    width: wp(32),
    height: hp(4),
    backgroundColor: Colors.mediumTurquoise,
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyViewStyle: {
    width: wp(32),
    height: hp(4),
    backgroundColor: 'transparent',
  },
  sendButtonTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedMedium,
    padding: wp(0.5),
    fontSize: fSize(10),
  },
  saveButtonTextStyle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(10),
  },
  saveButtonStyle: {
    width: wp(32),
    height: hp(4),
    borderRadius: wp(2),
    backgroundColor: Colors.hawkesBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexForFirstText: {
    flex: 0.7,
  },
  flexForSecondText: {
    flex: 0.3,
    textAlign: 'right',
  },
  viewShotBackground: {
    backgroundColor: Colors.white,
  },
})
