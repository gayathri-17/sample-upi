import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Fonts } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListImageStyle: {
    width: wp(20),
    height: wp(20),
  },
  emptyTextios: {
    marginTop: wp(4),
  },
  emptyText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    textAlignVertical: 'center',
    fontSize: fSize(20),
    marginLeft: wp(2),
    paddingRight: wp(3),
  },
})
