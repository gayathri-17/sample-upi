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
  titleContainer: {
    marginTop: hp(1),
  },
  // arrowStyle
  arrowContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(7),
    width: wp(65),
  },
  arrowStyle: {
    width: wp(10),
    height: hp(10),
  },
  arrowContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
  },
  rowStyle: {
    flexDirection: 'row',
  },
  // currency selection container
  currencyContainer: {
    justifyContent: 'space-around',
    flex: 1,
    marginBottom: hp(20),
    marginTop: hp(5),
    alignItems: 'center',
  },
  regionalContainer: {
    height: hp(9.85),
    width: wp(48.8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTitle: {
    ...ApplicationStyles.screen.blackSmallTextStyle,
    textAlign: 'center',
  },
  optionIcon: {
    width: wp(8),
    height: wp(8),
  },
  textStyle: {
    fontSize: fSize(16),
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    marginLeft: wp(4),
    textAlign: 'center',
  },

  optionContainer: {
    height: hp(9.85),
    width: wp(48.85),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2.66),
    backgroundColor: Colors.white,
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: hp(0.5),
  },
  optionIconContainer: {
    marginLeft: wp(0),
  },
})
