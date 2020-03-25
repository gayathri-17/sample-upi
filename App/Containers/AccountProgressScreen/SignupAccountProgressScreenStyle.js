import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  titleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
    color: Colors.mediumTurquoise,
    textAlign: 'center',
    padding: hp(2.3),
    ...ApplicationStyles.screen.mediumTurquoise,
  },
  cardContainer: {
    backgroundColor: Colors.disableViewColor,
  },
})
