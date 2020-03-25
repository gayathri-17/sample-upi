import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from 'App/Theme'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  tickViewContainer: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mediumTurquoise,
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
  },
  textViewContainer: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textViewStyle: {
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(20),
    color: Colors.suvaGrey,
    textAlign: 'center',
  },
  continueBtnContainer: {
    alignItems: 'center',
    flex: 0.12,
  },
})
