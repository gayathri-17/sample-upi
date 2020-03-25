import React from 'react'
import { PropTypes } from 'prop-types'
import { View, ScrollView, Text, TextInput } from 'react-native'
import styles from './ProfileBusinessInfoStyle'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import { getValueByAttribute, openEmail } from 'App/Components/Utils/Functions'
import DefaultStrings from 'App/Constants/DefaultStrings'
import I18n from 'App/Localization/I18n'

export default class ProfileBusinessInfo extends React.Component {
  constructor(props) {
    super(props)
    let profile = this.props.onBoardingProfile
    this.state = {
      address: getValueByAttribute(profile, 'address'),
      city: getValueByAttribute(profile, 'city'),
      province: this.props.province,
      country: this.props.country,
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
    const { address, city, province, country } = this.state
    let profile = this.props.onBoardingProfile
    let business = profile.business ? profile.business : {}
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Company Name  & DBA */}

          <View style={styles.twoRowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('COMPANY_NAME')}</Text>
              <Text style={[styles.inputTextStyle, styles.inputDisabled, styles.inputTextWidth]}>
                {getValueByAttribute(business, 'name')}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('DBA_OPTIONAL')}</Text>
              <Text style={[styles.inputTextStyle, styles.inputDisabled, styles.inputTextWidth]}>
                {getValueByAttribute(business, 'dba')}
              </Text>
            </View>
          </View>

          {/** Tax and Phone number */}
          <View style={styles.twoRowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('TAX_ID')}</Text>
              <TextInput
                testID={'tax'}
                editable={false}
                value={getValueByAttribute(business, 'tax')}
                style={[styles.inputTextStyle, styles.inputTextWidth, styles.inputDisabled]}
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('PHONE_NUMBER')}</Text>
              <TextInput
                testID={'phone'}
                editable={false}
                value={getValueByAttribute(business, 'phone')}
                style={[styles.inputTextStyle, styles.inputTextWidth, styles.inputDisabled]}
              />
            </View>
          </View>

          {/* Address info */}
          <Text style={styles.fieldTitle}>{I18n.t('ADDRESS')}</Text>
          <Text style={[styles.inputTextStyle, styles.inputDisabled]}>{address}</Text>

          {/** City and province  */}
          <View style={styles.twoRowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('CITY')}</Text>
              <TextInput
                testID={'city'}
                editable={false}
                value={city}
                style={[styles.inputTextStyle, styles.inputTextWidth, styles.inputDisabled]}
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('STATE')}</Text>
              <TextInput
                testID={'province'}
                editable={false}
                value={province}
                style={[styles.inputTextStyle, styles.inputTextWidth, styles.inputDisabled]}
              />
            </View>
          </View>

          {/* Zipcode  and Country */}
          <View style={styles.twoRowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('ZIP_CODE')}</Text>
              <TextInput
                testID={'zipCode'}
                editable={false}
                value={getValueByAttribute(business, 'zip_code')}
                style={[styles.inputTextStyle, styles.inputTextWidth, styles.inputDisabled]}
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldTitle}>{I18n.t('COUNTRY')}</Text>
              <TextInput
                testID={'country'}
                editable={false}
                value={country}
                style={[styles.inputTextStyle, styles.inputTextWidth, styles.inputDisabled]}
              />
            </View>
          </View>

          {/* Category */}
          <Text style={styles.fieldTitle}>{I18n.t('CATEGORY')}</Text>
          <Text style={[styles.inputTextStyle, styles.inputDisabled]}>
            {getValueByAttribute(business, 'category')}
          </Text>
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
ProfileBusinessInfo.propTypes = {
  testID: PropTypes.string,
  onBoardingProfile: PropTypes.object,
  country: PropTypes.string,
  province: PropTypes.string,
}
