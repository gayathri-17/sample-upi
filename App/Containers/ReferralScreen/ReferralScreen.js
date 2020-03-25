import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { Colors } from 'App/Theme'
import ReferralSVG from 'App/Assets/Images/Svg/ReferralGroupPeople'
import I18n from 'App/Localization/I18n'
import Button from 'App/Components/Button/Button'
import InputField from 'App/Components/InputField/InputField'
import UserActions from 'App/Stores/User/Actions'
import isEmail from 'validator/lib/isEmail'
import styles from './ReferralScreenStyle'

/**
 * Referral screen shown in the tab navigator.
 * Has an option to enter email address and
 * user can send the link to entered email address.
 * @export
 * @class ReferralScreen
 * @extends {Component}
 */
export class ReferralScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      isValidEmail: false,
    }
  }

  /**
   * Sets the email and checks whether the email is valid or not.
   * @param {String} email - entered email address
   * @memberof ReferralScreen
   */
  onEmailChangeText = (email) => {
    this.setState({
      email: email,
      isValidEmail: isEmail(email),
    })
  }

  /**
   * Api call for the referral link with entered email address.
   * @memberof ReferralScreen
   */
  onSendReferral = async () => {
    this.props.sendReferralLink(this.state.email)
  }

  render() {
    const { email, isValidEmail } = this.state
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.topViewHolder}
          colors={[Colors.referralGradientStart, Colors.referralGradientStop]}
        >
          <View style={styles.referralSVGHolder}>
            <ReferralSVG />
          </View>
          <View style={styles.referralTextHolder}>
            <Text style={styles.titleStyle}>{I18n.t('REFER_FRIEND')}</Text>
          </View>
          <View style={styles.emailAddressHolder}>
            <InputField
              testID={'email'}
              isValid={true}
              textStyle={styles.inputTextStyle}
              placeholder={I18n.t('ENTER_EMAIL_ADDRESS')}
              type={'email-address'}
              text={email}
              onChangeText={(text) => this.onEmailChangeText(text)}
            />
          </View>
        </LinearGradient>
        <View style={styles.bottomViewHolder}>
          <Button
            testID={'continue'}
            text={I18n.t('SEND_INVITE')}
            withShadow={true}
            withBg={true}
            onClick={() => this.onSendReferral()}
            disabled={!isValidEmail}
          />
        </View>
      </View>
    )
  }
}

ReferralScreen.propTypes = {
  sendReferralLink: PropTypes.func,
}

// Get State from redux store
export const mapStateToProps = (state) => ({})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  sendReferralLink: (email) => dispatch(UserActions.sendReferralLink(email)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferralScreen)
