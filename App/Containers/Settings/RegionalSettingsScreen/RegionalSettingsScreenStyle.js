import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
  },

  // header container view style
  headerContainer: {
    height: hp(5.92),
    flexDirection: 'column',
  },
  headerView: {
    height: hp(5.9),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    ...ApplicationStyles.screen.greenSmallTextStyle,
    marginLeft: wp(1.33),
  },

  // content container
  contentView: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: wp(16),
  },

  // Button View styles
  buttonView: {
    height: hp(15.87),
    width: wp(100),
    marginTop: hp(1),
  },
  changeView: {
    alignItems: 'center',
  },
  backView: {
    marginTop: hp(2.5),
    alignItems: 'center',
  },
})
