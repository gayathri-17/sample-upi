import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from 'App/Theme'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  subContainer: {
    flex: 1,
  },
  selectorContainer: {
    backgroundColor: Colors.white,
    height: hp(49),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 0.3,
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  backButtonContainer: {
    ...ApplicationStyles.screen.backButtonContainer,
  },
  backTextStyle: {
    ...ApplicationStyles.screen.backTextStyle,
  },
  cardText: {
    fontSize: fSize(14),
  },
  margin: {
    marginTop: hp(4),
  },
})
