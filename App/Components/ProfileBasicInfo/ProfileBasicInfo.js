import React from 'react'
import { PropTypes } from 'prop-types'
import { View, ScrollView, Text, TextInput } from 'react-native'
import styles from './ProfileBasicInfoStyle'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import { getValueByAttribute, openEmail } from 'App/Components/Utils/Functions'
import DefaultStrings from 'App/Constants/DefaultStrings'
import I18n from 'App/Localization/I18n'

export default class ProfileBasicInfo extends React.Component {
  constructor(props) {
    super(props)
    let profile = this.props.onBoardingProfile
    this.state = {
      firstName: getValueByAttribute(profile, 'name'),
      lastName: getValueByAttribute(profile, 'lastName'),
      address: getValueByAttribute(profile, 'address'),
      city: getValueByAttribute(profile, 'city'),
      province: this.props.province,
      zip: getValueByAttribute(profile, 'zip_code'),
      country: this.props.country,
      phone:
        getValueByAttribute(profile, 'phonecode') + ' ' + getValueByAttribute(profile, 'phone'),
      document: getValueByAttribute(profile, 'ndocument'),
      isEditable: false,
      isValidFirstName: true,
      isValidAddress: true,
    }
  }
  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    const { country, province } = this.props
    if (prevProps.country !== country) {
      this.setState({ country })
    }
    if (prevProps.province !== province) {
      this.setState({ province })
    }
  }

  render() {
    const {
      firstName,
      lastName,
      address,
      city,
      province,
      zip,
      country,
      phone,
      document,
      isEditable,
    } = this.state
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Name container */}
          <View style={styles.twoRowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('FIRST_NAME')}</Text>
              <TextInput
                testID={'firstName'}
                returnKeyType="done"
                value={firstName}
                editable={isEditable}
                style={[
                  styles.inputTextStyle,
                  styles.inputTextWidth,
                  !isEditable && styles.inputDisabled,
                ]}
                onChangeText={(text) => this.onChangeFirstName(text)}
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('LAST_NAME')}</Text>
              <TextInput
                testID={'lastName'}
                returnKeyType="done"
                value={lastName}
                editable={isEditable}
                style={[
                  styles.inputTextStyle,
                  styles.inputTextWidth,
                  !isEditable && styles.inputDisabled,
                ]}
                onChangeText={(text) => this.onChangeLastName(text)}
              />
            </View>
          </View>
          {/* Address info */}
          <Text style={styles.fieldTitle}>{I18n.t('ADDRESS')}</Text>
          <TextInput
            testID={'address'}
            returnKeyType="done"
            value={address}
            editable={isEditable}
            style={[styles.inputTextStyle, !isEditable && styles.inputDisabled]}
            onChangeText={(text) => this.onChangeAddress(text)}
          />
          {/** City and province  */}
          <View style={styles.twoRowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('CITY')}</Text>
              <TextInput
                testID={'citty'}
                returnKeyType="done"
                value={city}
                editable={isEditable}
                style={[
                  styles.inputTextStyle,
                  styles.inputTextWidth,
                  !isEditable && styles.inputDisabled,
                ]}
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('STATE')}</Text>
              <TextInput
                testID={'state'}
                returnKeyType="done"
                value={province}
                editable={isEditable}
                style={[
                  styles.inputTextStyle,
                  styles.inputTextWidth,
                  !isEditable && styles.inputDisabled,
                ]}
              />
            </View>
          </View>

          {/* ZIP Code and Country */}
          <View style={styles.twoRowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('ZIP_CODE')}</Text>
              <TextInput
                testID={'zipCode'}
                returnKeyType="done"
                value={zip}
                editable={isEditable}
                style={[
                  styles.inputTextStyle,
                  styles.inputTextWidth,
                  !isEditable && styles.inputDisabled,
                ]}
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('COUNTRY')}</Text>
              <TextInput
                testID={'country'}
                returnKeyType="done"
                value={country}
                editable={isEditable}
                style={[
                  styles.inputTextStyle,
                  styles.inputTextWidth,
                  !isEditable && styles.inputDisabled,
                ]}
              />
            </View>
          </View>

          {/* Phone number and Document number */}
          <View style={styles.twoRowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('PHONE_NUMBER')}</Text>
              <TextInput
                testID={'phoneNumber'}
                returnKeyType="done"
                value={phone}
                editable={isEditable}
                style={[
                  styles.inputTextStyle,
                  styles.inputTextWidth,
                  !isEditable && styles.inputDisabled,
                ]}
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('DOCUMENT_HASS')}</Text>
              <TextInput
                testID={'document'}
                returnKeyType="done"
                value={document}
                editable={isEditable}
                style={[
                  styles.inputTextStyle,
                  styles.inputTextWidth,
                  !isEditable && styles.inputDisabled,
                ]}
              />
            </View>
          </View>
        </ScrollView>
        <View style={[styles.buttonView]}>
          <View style={styles.changeView}>
            <Button
              text={I18n.t('REQUEST_CHANGES')}
              withShadow={true}
              withBg={true}
              testID={'requestChange'}
              onClick={() => this.onClickChangeRequest()}
            />
          </View>
          <View style={styles.backView}>
            <Button
              text={I18n.t('BACK_BUTTON')}
              withBorder={true}
              testID={'back'}
              onClick={() => Navigator.goBack()}
            />
          </View>
        </View>
      </View>
    )
  }

  /**
   * on change first name
   * @param {String} firstName - refers user enter input as an firstName string
   * It updates state object with firstName
   */
  onChangeFirstName(firstName) {
    const validFirstName = firstName.trim().length > 2
    this.setState({
      firstName: firstName,
      isValidFirstName: validFirstName,
    })
  }
  /**
   * on change last name
   * @param {String} lastName - refers user enter input as an lastName string
   * It updates state object with lastName
   */
  onChangeLastName(lastName) {
    this.setState({
      lastName: lastName.trim().length === 0 ? '' : lastName,
    })
  }
  /**
   * on change address
   * @param {String} address - refers user enter input as an address string
   * It updates state object with addressLineOne
   */
  onChangeAddress(address) {
    const isValidAddress = address.length > 2
    this.setState({
      addressLineOne: address,
      isValidAddress,
    })
  }

  /**
   * On Change Request button action
   */
  onClickChangeRequest() {
    openEmail(
      DefaultStrings.SUPPORT_EMAIL,
      I18n.t('PROFILE_CHANGE_MAIL_SUBJECT') + this.props.onBoardingProfile.email,
      I18n.t('PROFILE_CHANGE_DESCRIPTION_1'),
      I18n.t('PROFILE_CHANGE_DESCRIPTION_2')
    )
  }
}
ProfileBasicInfo.propTypes = {
  testID: PropTypes.string,
  onBoardingProfile: PropTypes.object,
  country: PropTypes.string,
  province: PropTypes.string,
}
