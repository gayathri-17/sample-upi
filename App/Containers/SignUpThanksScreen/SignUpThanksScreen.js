import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import { PropTypes } from 'prop-types'
import { openInbox } from 'react-native-email-link'
import { Colors } from 'App/Theme'
import { connect } from 'react-redux'
import styles from './SignUpThanksScreenStyle'
import Tick from 'App/Components/Tick/Tick'
import SignUpActions from 'App/Stores/SignUp/Actions'
import I18n from 'App/Localization/I18n'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'

/**
 *  Signup thanks screen after successfully signed up.
 */

export class SignUpThanksScreen extends Component {
  // Intial Function to validate user information from from deep linking url.
  componentDidMount() {
    this.props.navigation.state.params &&
      this.userVerification(this.props.navigation.state.params.url.url)
  }

  /**
   * process user verification
   * @param {String} url refers the param to call request
   */
  userVerification(url) {
    let token = url.split('/')[5]
    this.props.userVerification(token)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.mediumTurquoise} barStyle="light-content" />
        <View style={styles.tickViewContainer}>
          <Tick />
          <Text style={styles.thanksLargeText}>{I18n.t('THANKS_FOR_REGISTERING')}</Text>
          <Text style={styles.thanksSmallText}>{I18n.t('THANKS_CONTENT')}</Text>
        </View>
        <TouchableOpacity
          testID="mail"
          onPress={() => this.onOpenMailClick()}
          style={styles.textContainer}
        >
          <Text style={styles.openTextStyle}>{I18n.t('OPEN')}</Text>
          <Text style={styles.mailAppTextStyle}>{I18n.t('MAIL_APP')}</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Button
            text={I18n.t('LOGIN')}
            withShadow={true}
            withBg={true}
            onClick={this.moveToLogin}
          />
        </View>
      </View>
    )
  }

  // Navigate user to login screen
  moveToLogin = () => {
    Navigator.navigateAndReset(NavKeys.LOGIN)
  }

  // open mail box
  onOpenMailClick = () => {
    openInbox()
  }
}

SignUpThanksScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  userVerification: PropTypes.func,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  isLoading: state.signUp.verificationIsLoading,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  userVerification: (token) => dispatch(SignUpActions.userVerification(token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpThanksScreen)
