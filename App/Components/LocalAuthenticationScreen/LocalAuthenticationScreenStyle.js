import { StyleSheet } from 'react-native'
import { ApplicationStyles } from './node_modules/App/Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
