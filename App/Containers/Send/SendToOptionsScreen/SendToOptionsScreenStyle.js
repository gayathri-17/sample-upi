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
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: wp(76.8),
  },
  titleDotContainer: {
    marginLeft: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotIconSize: {
    height: hp(0.8),
    width: wp(1.8),
  },
  curencyIconSize: {
    height: wp(8.8),
    width: wp(8.8),
  },
  titleTxt: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(16),
    marginLeft: wp(2),
    marginRight: wp(1),
  },
  titleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(2),
    width: wp(76.8),
  },
  contentContainerView: {
    height: hp(57.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  myBankAccountView: {
    marginTop: hp(13.3),
    height: hp(5.91),
    alignItems: 'center',
  },
  contactView: {
    flex: 1,
    marginTop: hp(2.5),
    alignItems: 'center',
  },
  cancelImage: {
    width: wp(13.3),
    height: hp(6.15),
  },
  textowerCase: {
    textTransform: 'lowercase',
  },

  // overwrite button shadow style
  buttonStyle: {
    borderRadius: wp(2.6),
    ...ApplicationStyles.screen.buttonGreyShadow,
  },
  selectedButtonStyle: {
    borderRadius: wp(2.6),
  },
  buttonText: {
    color: Colors.curiousBlue,
  },
  dropDownInputStyle: {
    ...ApplicationStyles.screen.dropDownStyles,
    width: wp(73),
    height: hp(6),
    alignItems: 'center',
    backgroundColor: Colors.white,
    color: Colors.curiousBlue,
    textTransform: 'capitalize',
    ...ApplicationStyles.screen.buttonGreyShadow,
  },
  dropdownIconStyle: {
    top: hp(2.5),
    right: wp(3),
  },
  dropDownStyle: {
    width: wp(3.5),
    height: hp(1),
  },
  addAccountContainer: {
    width: wp(73),
    height: hp(6),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addAccountText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.lightGrey,
    fontSize: fSize(Fonts.size.medium),
    paddingTop: hp(0.8),
    textTransform: 'capitalize',
  },
  plusCircleIcon: {
    width: wp(10.6),
    height: hp(5.5),
  },
  arrowContainer: {
    justifyContent: 'center',
    position: 'absolute',
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
  arrowStyle: {
    width: wp(10),
    height: hp(10),
  },
  rowStyle: {
    flexDirection: 'row',
  },
})
