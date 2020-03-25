import React from 'react'
import { PropTypes } from 'prop-types'
import { View, ScrollView, Text, TextInput } from 'react-native'
import styles from './ProfileAditionalInfoStyle'
import Button from 'App/Components/Button/Button'
import moment from 'moment'
import Navigator from 'App/Services/NavigationService'
import { getValueByAttribute } from 'App/Components/Utils/Functions'
import TextFormats from 'App/Constants/TextFormats'
import I18n from 'App/Localization/I18n'

export default class ProfileAditionalInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateOfBirth: '',
      profile: this.props.onBoardingProfile,
      occupation: getValueByAttribute(this.props.onBoardingProfile, 'occupation'),
      profession: getValueByAttribute(this.props.onBoardingProfile, 'profession'),
      changedOccupation: getValueByAttribute(this.props.onBoardingProfile, 'occupation'),
      changedProfession: getValueByAttribute(this.props.onBoardingProfile, 'profession'),
      isEditable: true,
    }
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    const { onBoardingProfile } = this.props
    if (prevProps.onBoardingProfile !== onBoardingProfile) {
      this.setState({
        profile: onBoardingProfile,
        occupation: getValueByAttribute(onBoardingProfile, 'occupation'),
        profession: getValueByAttribute(onBoardingProfile, 'profession'),
        changedOccupation: getValueByAttribute(onBoardingProfile, 'occupation'),
        changedProfession: getValueByAttribute(onBoardingProfile, 'profession'),
      })
    }
  }

  componentDidMount() {
    this.handleDatePicked(getValueByAttribute(this.props.onBoardingProfile, 'birthdate'))
  }
  render() {
    const {
      testID,
      dateOfBirth,
      occupation,
      profession,
      isEditable,
      changedOccupation,
      changedProfession,
    } = this.state

    const isChanged = occupation !== changedOccupation || profession !== changedProfession
    return (
      <View testID={testID} style={styles.container}>
        <ScrollView scrollEnabled={false} style={styles.scrollView}>
          <Text style={styles.fieldTitle}>{I18n.t('DATE_OF_BIRTH')}</Text>
          <TextInput
            pointerEvents="none"
            testID={'dateOfBirth'}
            value={dateOfBirth}
            editable={false}
            style={[styles.inputTextStyle, styles.inputDisabled]}
          />
          <Text style={styles.fieldTitle}>{I18n.t('OCUPATION')}</Text>
          <TextInput
            testID={'occupation'}
            returnKeyType="done"
            value={changedOccupation}
            editable={isEditable}
            style={[styles.inputTextStyle, !isEditable && styles.inputDisabled]}
            onChangeText={(text) => this.onChangeOccupation(text)}
          />

          <Text style={styles.fieldTitle}>{I18n.t('PROFESSION')}</Text>
          <TextInput
            testID={'profession'}
            returnKeyType="done"
            value={changedProfession}
            editable={isEditable}
            style={[styles.inputTextStyle, !isEditable && styles.inputDisabled]}
            onChangeText={(text) => this.onChangeProfession(text)}
          />
        </ScrollView>

        <View style={[styles.buttonView]}>
          <View style={styles.changeView}>
            <Button
              text={isChanged ? I18n.t('SAVE_CHANGES') : I18n.t('REQUEST_CHANGES')}
              withShadow={true}
              withBg={true}
              testID={'requestChange'}
              onClick={() =>
                this.props.onClick(isChanged, dateOfBirth, changedOccupation, changedProfession)
              }
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
   * Convert DatePicker date to given format
   * @param {String} date - refers user enter input as an nationality string
   *
   * It updates state object with nationality
   */
  handleDatePicked = (date) => {
    this.setState({
      dateOfBirth: moment(date).format(TextFormats.DATE_FORMAT),
    })
  }

  /**
   * On change occupation text
   * @param {String} ocupat - refers user enter input as an ocupation string
   * It updates state object with occupation
   */
  onChangeOccupation(ocupat) {
    this.setState({
      changedOccupation: ocupat.trim(),
    })
  }

  /**
   * On change profession text
   * @param {String} profes - refers user enter input as an profession string
   * It updates state object with profession
   */
  onChangeProfession(profes) {
    this.setState({
      changedProfession: profes.trim(),
    })
  }
  /**
   * On Change Request button action
   */
  onClickChangeRequest() {
    // will enavle on edit profile
    // this.setState({ isEditable: true })
  }
}
ProfileAditionalInfo.propTypes = {
  testID: PropTypes.string,
  onBoardingProfile: PropTypes.object,
  onClick: PropTypes.func,
}
