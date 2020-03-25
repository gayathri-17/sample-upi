import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

/**
 * This file handle the application's Haptic vibration.
 */
export function hapticVibrate() {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  }
  ReactNativeHapticFeedback.trigger('impactHeavy', options)
}
