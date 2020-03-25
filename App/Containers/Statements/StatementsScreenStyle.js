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
    marginLeft: wp(2),
    marginRight: wp(2),
  },
  // filter by style
  filterByContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterByTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(15),
    marginTop: wp(4),
    color: Colors.suvaGrey,
    width: wp(20),
    textAlign: 'center',
  },
  filterByPickerStyle: {
    marginLeft: wp(3),
    marginTop: wp(4),
    width: wp(70),
    height: hp(5),
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(2.66),
    fontSize: fSize(Fonts.size.small),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    paddingLeft: wp(2.13),
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
  },
  dropdownIconStyle: {
    top: hp(4.2),
    right: wp(4),
  },
  dropDownImageStyle: {
    width: wp(3.2),
    height: hp(1),
  },
  // from to container
  fromToContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fromTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(15),
    marginTop: wp(4),
    color: Colors.suvaGrey,
    width: wp(15),
    textAlign: 'center',
  },
  toTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(15),
    marginTop: wp(4),
    color: Colors.suvaGrey,
    width: wp(10),
    textAlign: 'center',
  },
  dateContainer: {
    height: hp(5),
    width: wp(35),
    borderRadius: wp(2),
    backgroundColor: Colors.ghostWhite,
    marginTop: hp(1.72),
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.small),
    color: Colors.suvaGrey,
    marginLeft: wp(2),
  },
  // status container
  rowStyle: {
    flexDirection: 'row',
  },
  containerMargin: {
    marginTop: wp(4),
  },
  statusText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(15),
    color: Colors.suvaGrey,
    textAlign: 'center',
  },
  radioButtonStyle: {
    height: wp(4),
    width: wp(4),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: Colors.suvaGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(2),
  },
  radioButtonSelection: {
    height: wp(2.5),
    width: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: Colors.suvaGrey,
  },
  radionButtonContainer: {
    flexDirection: 'row',
  },
  marginForRadioButton: {
    marginTop: wp(6),
  },
  statusStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.small),
    color: Colors.suvaGrey,
    marginLeft: wp(2),
  },
  lineStyle: {
    width: wp(0.3),
    height: hp(9),
    marginLeft: wp(2),
    marginRight: wp(1.5),
    backgroundColor: Colors.suvaGrey,
  },
  spaceAroundStyle: {
    justifyContent: 'space-around',
  },
  columnStyle: {
    flexDirection: 'column',
  },
  widthForRadoGroupRow: {
    width: wp(30),
    height: hp(9),
  },
  marginForStatusContainer: {
    marginLeft: wp(2),
  },
  // border line style
  borderLineStyle: {
    width: wp(100),
    height: hp(1.4),
    marginTop: hp(2),
    marginBottom: hp(2),
    backgroundColor: Colors.ghostWhite,
  },
  // list header style
  listHeaderStyle: {
    borderRadius: wp(5),
    backgroundColor: Colors.whiteSmoke,
    padding: wp(1),
  },
  dotNormalContainer: {
    height: hp(2.8),
    width: wp(18.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActiveContainer: {
    width: wp(18.3),
    height: hp(2.8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mediumTurquoise,
    borderRadius: wp(5),
  },
  normalDotText: {
    textAlign: 'center',
    fontSize: fSize(7.8),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
  },
  activeDotText: {
    textAlign: 'center',
    fontSize: fSize(7.8),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.white,
  },
  // loader style
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // filter by year style
  filterByYearTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(13),
    marginTop: wp(4),
    color: Colors.suvaGrey,
    width: wp(35),
  },
  filterByYearPickerStyle: {
    marginLeft: wp(3),
    marginTop: wp(4),
    width: wp(30),
    height: hp(5),
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(2.66),
    fontSize: fSize(Fonts.size.small),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    paddingLeft: wp(2.13),
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
  },
  dateMonthText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(13),
    color: Colors.suvaGrey,
    marginLeft: wp(2),
  },
  monthContainer: {
    marginLeft: wp(5.2),
    marginRight: wp(4),
    flexDirection: 'row',
  },
  arrowImageStyle: {
    width: wp(3.2),
    height: wp(4),
  },
  downloadView: {
    width: wp(80),
    marginTop: wp(2),
    marginLeft: wp(10.4),
    borderRadius: wp(1),
    borderColor: Colors.ghostWhite,
    borderWidth: wp(0.3),
    height: hp(4.8),
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  downloadTextContainer: {
    height: hp(4.8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(0.5),
    width: wp(30),
  },
  downloadText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
    color: Colors.suvaGrey,
    marginLeft: wp(2),
    textAlign: 'center',
  },
  downloadbuttonStyle: {
    height: hp(3),
    width: wp(13),
    backgroundColor: Colors.mediumTurquoise,
    borderRadius: wp(0.7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(11),
    color: Colors.white,
    marginLeft: wp(0.5),
  },
  flatlistStyle: {
    height: hp(50),
    marginTop: wp(2),
  },
  scrollViewStyle: {
    height: hp(60),
  },
  listContentContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  emptyListImageStyle: {
    width: wp(20),
    height: wp(20),
  },
})
