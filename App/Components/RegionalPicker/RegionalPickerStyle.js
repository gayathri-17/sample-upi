import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { ApplicationStyles, Colors } from 'App/Theme'

export default StyleSheet.create({
  // options container
  regionalContainer: {
    height: hp(9.85),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  optionTitle: {
    ...ApplicationStyles.screen.blackSmallTextStyle,
    textAlign: 'center',
  },

  optionContainer: {
    height: hp(6.28),
    width: wp(48.8),
    flexDirection: 'row',
    alignItems: 'center',
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

  // option Icon
  optionIconContainer: {
    marginLeft: wp(3.7),
  },
  optionIcon: {
    width: wp(6.66),
    height: wp(6.66),
  },

  // picker style
  pickerStyle: {
    ...ApplicationStyles.screen.blackSmallTextStyle,
    color: Colors.steelBlue,
    width: wp(38.8),
    height: hp(6.28),
    paddingLeft: wp(2.36),
  },

  // dropdownIconStyle
  dropdownIconStyle: {
    top: hp(2.54),
    right: wp(2.5),
  },
  downArrowIcon: {
    width: wp(3.46),
    height: wp(2.4),
  },
})
