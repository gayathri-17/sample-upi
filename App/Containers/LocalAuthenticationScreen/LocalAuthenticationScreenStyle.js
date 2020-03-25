import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pincodeTitle: {
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
  },
})
