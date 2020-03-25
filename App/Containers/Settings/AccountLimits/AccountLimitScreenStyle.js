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
  titleContainer: {
    height: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderLineStyle: {
    width: wp(100),
    height: hp(1.4),
    backgroundColor: Colors.ghostWhite,
  },
  titleitleText: {
    fontSize: fSize(20),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    flex: 0.9,
  },
  imageStyle: {
    width: wp(7),
    height: hp(3),
  },

  itemContainer: {
    borderColor: Colors.hawkesBlue,
    width: wp(85.4),
    borderRadius: wp(3),
    borderWidth: wp(0.2),
    marginVertical: wp(3),
  },
  itemHeaderContainer: {
    flexDirection: 'row',
    height: hp(3.7),
    borderBottomColor: Colors.hawkesBlue,
    borderBottomWidth: wp(0.2),
    alignItems: 'center',
    width: wp(85.4),
  },
  itemProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(85.4),
    marginTop: wp(3.5),
  },
  itemTitle: {
    flex: 0.65,
    marginLeft: hp(2.5),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    fontSize: fSize(10),
  },
  usedTextStyle: {
    flex: 0.5,
    marginLeft: hp(2.5),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(10),
  },
  itemSubTitle: {
    flex: 0.35,
    color: Colors.textLightGray,
    textAlign: 'right',
    marginRight: hp(3),
  },
  itemAmount: {
    flex: 0.35,
    textAlign: 'right',
    marginRight: hp(3),
  },
  progressParent: {
    height: hp(0.7),
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(4),
    alignSelf: 'center',
    width: wp(75),
    marginTop: wp(2),
    flexDirection: 'row',
  },
  fillProgress: {
    height: hp(0.7),
    backgroundColor: Colors.mediumTurquoise,
    borderRadius: wp(0.8),
  },
  itemPercentContainer: {
    marginTop: wp(1.5),
  },
  leftPercentText: {
    textAlign: 'right',
    marginRight: hp(3),
  },
  requestLimitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: hp(2),
    marginVertical: wp(2),
  },
  txtRequestLimit: {
    color: Colors.mediumTurquoise,
    fontSize: fSize(10),
    marginRight: wp(1),
  },
  limitImageStyle: {
    width: wp(4),
    height: hp(2),
  },
  scrollContainer: {
    width: wp(100),
    alignItems: 'center',
  },
  backButtonStyle: {
    marginTop: hp(2),
  },
  bottomMargin: {
    marginBottom: hp(5),
  },
})
