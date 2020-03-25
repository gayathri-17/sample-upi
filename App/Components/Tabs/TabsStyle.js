import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Colors, Fonts } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export const Style = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'flex-end',
    flexGrow: 1,
    justifyContent: 'center',
  },
  paddingLeft: {
    paddingLeft: wp(33.53),
  },
  paddingRight: {
    marginRight: wp(33.53),
  },
  tab: {
    alignItems: 'center',
    height: hp(7.24),
    justifyContent: 'flex-end',
    marginHorizontal: wp(1.5),
    width: 'auto',
  },
  tabBar: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomColor: Colors.whiteSmoke,
    borderBottomWidth: hp(0.1),
    elevation: 1,
    flexDirection: 'row',
    height: hp(7.24),
    justifyContent: 'space-evenly',
  },
  tabContainer: {
    height: hp(7.24),
  },
  tabIndicator: {
    alignSelf: 'center',
    borderRadius: wp(2.67),
    height: hp(0.7),
    width: 'auto',
  },
  tabIndicatorContainer: {
    height: hp(0.4),
    marginTop: hp(1),
    width: 'auto',
  },
  tabLabel: {
    flexDirection: 'row',
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
    letterSpacing: 0.05,
    lineHeight: fSize(22),
    textAlign: 'center',
    textTransform: 'lowercase',
  },
})

export const contentContainerStyle = {
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'flex-end',
}
