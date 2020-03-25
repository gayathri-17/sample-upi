import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import TouchID from 'react-native-touch-id'
import styles from './LocalAuthenticationScreenStyle'
import { connect } from 'react-redux'
import ErrorModal from 'App/Components/Modal/ErrorModal/ErrorModal'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import PINCode from '@haskkor/react-native-pincode'
import DefaultStrings from 'App/Constants/DefaultStrings'

/**
 * Local Authentication to enter the application
 */
export class LocalAuthenticationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      showAlert: false,
      passCodeEnabled: props.navigation.state.params.passCodeEnabled,
      faceIdEnabled: props.navigation.state.params.faceIdEnabled,
      touchIdEnabled: props.navigation.state.params.touchIdEnabled,
    }
    this.showTouchIDAlert = this.showTouchIDAlert.bind(this)
    this.authenticate = this.authenticate.bind(this)
  }

  componentDidMount() {
    const { touchIdEnabled, faceIdEnabled } = this.state
    if (touchIdEnabled || faceIdEnabled)
      TouchID.isSupported().then(() => {
        setTimeout(() => {
          this.showTouchIDAlert()
        }, 200)
      })
  }

  render() {
    const { showAlert, errorMessage, passCodeEnabled } = this.state
    return (
      <View style={styles.container}>
        {passCodeEnabled && (
          <PINCode
            status={'enter'}
            titleChoose={I18n.t('ENTER_PIN_CODE')}
            finishProcess={this.finishProcess}
            stylePinCodeTextTitle={styles.pincodeTitle}
            stylePinCodeColorTitle={styles.pincodeTitle.color}
            buttonDeleteText={I18n.t('DELETE')}
            touchIDDisabled={true}
            iconButtonDeleteDisabled={true}
          />
        )}
        <ErrorModal
          isShow={showAlert}
          onCLickClose={this.onErrorMessageClose}
          onClickSubmit={this.onErrorModalSubmit}
          submitButtonTitle={I18n.t('OK')}
          errorMessage={errorMessage}
        />
      </View>
    )
  }

  showTouchIDAlert() {
    TouchID.isSupported()
      .then(this.authenticate)
      .catch(() => {
        // Authendication error
        // showValidatonAlert('TouchID not supported') we can use it later
      })
  }

  /**
   * trigger when user enter the Passcode successfully
   */
  finishProcess = () => {
    Navigator.navigateAndReset(NavKeys.TAB)
  }

  // check user authendication is sucess or failed
  authenticate() {
    const optionalConfigObject = {
      title: DefaultStrings.AUTH_REQUIRED, // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: '', // 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    }
    TouchID.authenticate(DefaultStrings.UNLOCK_MERCURY, optionalConfigObject)
      .then((success) => {
        Navigator.navigateAndReset(NavKeys.TAB)
      })
      .catch(() => {
        this.setState({
          showAlert: !this.state.passCodeEnabled,
          errorMessage: DefaultStrings.LOCAL_AUTHENDICATION,
        })
      })
  }

  /**
   * Error Message Close action
   */
  onErrorMessageClose = () => {
    this.setState({ showAlert: false })
    this.showTouchIDAlert()
  }

  /**
   * Error message sucess button action
   */
  onErrorModalSubmit = () => {
    this.onErrorMessageClose()
  }
}

LocalAuthenticationScreen.propTypes = {
  token: PropTypes.string,
  navigation: PropTypes.object.isRequired,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  token: state.user.token,
  // language: state.user.language,
})

export default connect(
  mapStateToProps,
  null
)(LocalAuthenticationScreen)
