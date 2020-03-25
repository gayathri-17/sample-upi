import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { ApplicationStyles, Fonts, Colors } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  mainContainer: {
    height: hp(8.6),
    width: wp(100),
    paddingLeft: wp(4.8),
    paddingRight: wp(6.73),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  messagingContainer: {
    height: hp(4.06),
    width: wp(10.13),
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: hp(0.16),
  },
  mercuryText: {
    ...ApplicationStyles.screen.mercuryText,
  },
  cashText: {
    ...ApplicationStyles.screen.mediumTurquoise,
    color: Colors.mediumTurquoise,
  },
  headerText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(24),
  },
  notificationContainer: {
    height: hp(3.44),
    width: wp(6.08),
    paddingBottom: hp(0.75),
    marginBottom: hp(1),
  },
  notificationIconSize: {
    width: wp(10),
    height: hp(4),
  },
})
