import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Colors } from 'App/Theme'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import Button from 'App/Components/Button/Button'
import styles from './PhoneVerificationSuccessScreenStyle'
import Tick from 'App/Components/Tick/Tick'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import UserActions from 'App/Stores/User/Actions'
import I18n from 'App/Localization/I18n'

/**
 *  Phone Verification success after successfully signed up.
 */

export class PhoneVerificationSuccessScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.mediumTurquoise} barStyle="light-content" />
        <View style={styles.tickViewContainer}>
          <Tick />
        </View>
        <View style={styles.textViewContainer}>
          <Text style={styles.textViewStyle}>{I18n.t('VERIFIED_TEXT')}</Text>
        </View>
        <View style={styles.continueBtnContainer}>
          <Button
            testID={'Continue'}
            text={I18n.t('CONTINUE_BUTTON')}
            withShadow={true}
            withBg={true}
            onClick={() => {
              Navigator.navigate(NavKeys.DOCUMENT_SELECTION)
            }}
          />
        </View>
      </View>
    )
  }
}

PhoneVerificationSuccessScreen.propTypes = {
  updateUserInformation: PropTypes.func,
  countryList: PropTypes.array,
  onBoardingProfile: PropTypes.object,
  setOnBoardingProfile: PropTypes.func,
}

// Get State from redux store
export const mapStateToProps = (state) => ({})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  setOnBoardingProfile: (data) => dispatch(UserActions.setOnBoardingProfile(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneVerificationSuccessScreen)
