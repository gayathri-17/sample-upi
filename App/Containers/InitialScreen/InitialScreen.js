import React from 'react'
import { View, Text } from 'react-native'
import styles from './InitialScreenStyle'
import Logo from 'App/Assets/Images/Svg/Logo'
import DefaultStrings from 'App/Constants/DefaultStrings'

/**
 * This file contains the UI/UX for the Initial screen
 */

export default class InitialScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} testID={'logo'}>
            <Logo />
          </View>
          <View style={styles.logoTextView}>
            <Text style={styles.logoText}>
              <Text style={styles.mercuryText}>{DefaultStrings.MERCURY_DOT}</Text>
              <Text style={styles.cashText}>{DefaultStrings.CASH}</Text>
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
