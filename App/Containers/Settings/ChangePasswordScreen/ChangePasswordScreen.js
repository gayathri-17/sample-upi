import React from 'react'
import styles from './ChangePasswordScreenStyle'
import { KeyboardAvoidingView, Text, View, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Navigator from 'App/Services/NavigationService'
import UserActions from 'App/Stores/User/Actions'
import ProfileHeader from 'App/Components/ProfileHeader/ProfileHeader'
import Lock from 'App/Assets/Images/Svg/Lock'
import CircleChecked from 'App/Assets/Images/Svg/CircleChecked'
import ErrorIcon from 'App/Assets/Images/Svg/ErrorIcon'
import Button from 'App/Components/Button/Button'
import {
  showValidatonAlert,
  isValidPassword,
  getUserFullName,
  getUserAddress,
} from 'App/Components/Utils/Functions'
import I18n from 'App/Localization/I18n'

/**
 * Settings main screen where user can navigate to other settings page
 */

export class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      oldPasswordValidation: false,
      newPasswordValidation: false,
    }
  }

  render() {
    const {
      oldPassword,
      newPassword,
      oldPasswordValidation,
      newPasswordValidation,
      confirmPassword,
    } = this.state
    const { onBoardingProfile, profilePhoto, dispatch } = this.props
    return (
      <KeyboardAvoidingView style={styles.container}>
        {/* Profile header component */}
        <ProfileHeader
          fullName={getUserFullName(onBoardingProfile)}
          address={getUserAddress(onBoardingProfile)}
          profilePhoto={profilePhoto}
          dispatch={dispatch}
        />
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleTextStyle}>{I18n.t('CHANGE_PASSWORD')}</Text>
          <Lock width={styles.lockIconStyle.width} height={styles.lockIconStyle.height} />
        </View>
        {/** current password */}
        <View style={[styles.numberDetailContainerStyle, styles.viewMargin]}>
          <Text style={styles.passwordTitleText}>{I18n.t('CURRENT_PASSWORD')}</Text>
          <View style={styles.rowStyle}>
            <View style={styles.numberDetailStyle}>
              <TextInput
                returnKeyType={'next'}
                style={[styles.numberTextStyle, styles.inputHeight]}
                value={oldPassword}
                secureTextEntry={true}
                onSubmitEditing={() => {
                  this.newPassword.focus()
                }}
                onChangeText={this.onChangeOldPassword}
              />
            </View>
            {/** validation here to show tick view */}
            {oldPassword.length > 0 ? (
              oldPasswordValidation ? (
                <CircleChecked
                  width={styles.tickImageStyle.width}
                  height={styles.tickImageStyle.height}
                />
              ) : (
                <ErrorIcon
                  width={styles.tickImageStyle.width}
                  height={styles.tickImageStyle.height}
                />
              )
            ) : (
              <View width={styles.tickImageStyle.width} height={styles.tickImageStyle.height} />
            )}
          </View>
        </View>
        {/** new password */}
        <View style={styles.numberDetailContainerStyle}>
          <Text style={styles.passwordTitleText}>{I18n.t('NEW_PASSWORD')}</Text>
          <View style={styles.rowStyle}>
            <View style={styles.numberDetailStyle}>
              <TextInput
                ref={(input) => {
                  this.newPassword = input
                }}
                returnKeyType={'next'}
                style={styles.numberTextStyle}
                value={newPassword}
                secureTextEntry={true}
                onSubmitEditing={() => {
                  this.confirmPassword.focus()
                }}
                onChangeText={this.onChangeNewPassword}
              />
            </View>
            {/** validation here to show tick view */}
            {newPassword.length > 0 ? (
              newPasswordValidation && oldPassword !== newPassword ? (
                <CircleChecked
                  width={styles.tickImageStyle.width}
                  height={styles.tickImageStyle.height}
                />
              ) : (
                <ErrorIcon
                  width={styles.tickImageStyle.width}
                  height={styles.tickImageStyle.height}
                />
              )
            ) : (
              <View width={styles.tickImageStyle.width} height={styles.tickImageStyle.height} />
            )}
          </View>
        </View>
        {/** confirm password */}
        <View style={styles.numberDetailContainerStyle}>
          <Text style={styles.passwordTitleText}>{I18n.t('RETYPE_PASSWORD')}</Text>
          <View style={styles.rowStyle}>
            <View style={styles.numberDetailStyle}>
              <TextInput
                ref={(input) => {
                  this.confirmPassword = input
                }}
                returnKeyType="done"
                style={[styles.numberTextStyle, styles.inputHeight]}
                value={confirmPassword}
                secureTextEntry={true}
                onChangeText={this.onChangeConfirmPassword}
              />
            </View>
            {/** validation here to show tick view */}
            {confirmPassword.length > 0 ? (
              <View>
                {newPassword === confirmPassword ? (
                  <CircleChecked
                    width={styles.tickImageStyle.width}
                    height={styles.tickImageStyle.height}
                  />
                ) : (
                  <ErrorIcon
                    width={styles.tickImageStyle.width}
                    height={styles.tickImageStyle.height}
                  />
                )}
              </View>
            ) : (
              <View width={styles.tickImageStyle.width} height={styles.tickImageStyle.height} />
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={I18n.t('CHANGE_PASSWORD_LOWER')}
            withShadow={true}
            withBg={true}
            onClick={this.onClickChangePassword}
          />
          <Button
            style={styles.backButtonStyle}
            text={I18n.t('BACK')}
            withBorder={true}
            onClick={this.onClickBack}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }

  /**
   * on change old password
   * @param {String} text - refers old password text
   */
  onChangeOldPassword = (text) => {
    this.setState({ oldPassword: text, oldPasswordValidation: isValidPassword(text) })
  }

  /**
   * on change new password
   * @param {String} text - refers new password text
   */
  onChangeNewPassword = (text) => {
    this.setState({ newPassword: text, newPasswordValidation: isValidPassword(text) })
  }

  /**
   * on change confirm password
   * @param {String} text - refers confirm password text
   */
  onChangeConfirmPassword = (text) => {
    this.setState({ confirmPassword: text })
  }

  /**
   * on click change password function
   */
  onClickChangePassword = () => {
    const { oldPassword, newPassword, confirmPassword } = this.state
    if (
      isValidPassword(oldPassword) &&
      isValidPassword(newPassword) &&
      newPassword === confirmPassword
    ) {
      this.props.changePassword({ oldPassword: oldPassword, newPassword: newPassword }, (data) => {
        Alert.alert(
          I18n.t('HEADER'),
          data.message,
          [{ text: I18n.t('OK'), onPress: this.onClickBack }],
          { cancelable: false }
        )
      })
    } else {
      showValidatonAlert(I18n.t('PLEASE_ENTER_VALID_PASSWORD'))
    }
  }

  /**
   * on click back function
   */
  onClickBack = () => {
    Navigator.goBack()
  }
}

ChangePasswordScreen.propTypes = {
  changePassword: PropTypes.func,
  onBoardingProfile: PropTypes.object,
  profilePhoto: PropTypes.string,
  dispatch: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  onBoardingProfile: state.user.onBoardingProfile,
  profilePhoto: state.user.profilePhoto,
})

export const mapDispatchToProps = (dispatch) => ({
  changePassword: (data, successFn) => dispatch(UserActions.changePassword(data, successFn)),
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordScreen)
