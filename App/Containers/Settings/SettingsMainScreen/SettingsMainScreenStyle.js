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
  },
  settingsViewContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: hp(7),
    marginLeft: wp(28),
  },
  imageStyle: {
    width: wp(6),
    height: hp(6),
  },
  settingsTextStyle: {
    color: Colors.suvaGrey,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(13),
    marginLeft: wp(4),
  },
  lineStyle: {
    ...ApplicationStyles.lineStyle,
    width: wp(100),
  },
  marginStyle: {
    marginTop: hp(5),
  },
  // switch view style
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: hp(7),
    marginLeft: wp(24),
  },
  switchStyle: {
    width: wp(4.5),
    height: hp(3.4),
    margin: 3.2,
  },
  rightMargin: {
    marginRight: wp(2),
  },
  // button style
  centerStyle: {
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
