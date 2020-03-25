import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  button: {
    height: wp(5.33),
    width: wp(5.33),
    borderRadius: wp(2.66),
    borderWidth: 2,
    borderColor: Colors.mediumTurquoise,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelection: {
    height: wp(3.2),
    width: wp(3.2),
    borderRadius: wp(1.6),
    backgroundColor: Colors.mediumTurquoise,
  },
})
