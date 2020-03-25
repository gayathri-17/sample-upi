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
  titleTextContainer: {
    flexDirection: 'row',
    marginRight: wp(2),
    alignItems: 'center',
    marginTop: hp(4),
  },
  titleTextStyle: {
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(13),
    textAlign: 'center',
    marginRight: wp(4),
  },
  lockIconStyle: {
    width: wp(4),
    height: hp(4),
  },
  passwordTitleText: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(11),
    textAlign: 'left',
    marginLeft: wp(6),
    marginRight: wp(2),
    letterSpacing: 3,
  },
  numberDetailContainerStyle: {
    height: hp(8),
    justifyContent: 'space-around',
    marginTop: hp(1.5),
  },
  numberDetailStyle: {
    borderColor: Colors.dropDownBorder,
    borderRadius: wp(1.5),
    justifyContent: 'center',
    backgroundColor: Colors.ghostWhite,
    width: wp(65),
    height: hp(5.4),
    marginRight: wp(3),
  },
  numberTextStyle: {
    ...ApplicationStyles.screen.blackSmallTextStyle,
    paddingLeft: wp(1),
    paddingRight: wp(1),
    fontSize: fSize(13),
  },
  viewMargin: {
    marginTop: hp(4),
  },
  tickImageStyle: {
    height: hp(2.7),
    width: wp(6),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(6),
  },
  buttonContainer: {
    bottom: 0,
    position: 'absolute',
    marginBottom: hp(5),
  },
  backButtonStyle: {
    marginTop: hp(2),
  },
})
