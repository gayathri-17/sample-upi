import React from 'react'
import styles from './ProfessionalInformationScreenStyle'
import { View, TouchableOpacity, Text, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import Header from 'App/Components/Header/Header'
import Button from 'App/Components/Button/Button'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import UserActions from 'App/Stores/User/Actions'
import I18n from 'App/Localization/I18n'

/*
 * User can give their Professional Information here
 */
export class ProfessionalInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ocupation: '',
      isValidOcupation: true,
      profession: '',
      isValidProfession: true,
    }
  }

  render() {
    // to access current state
    const { ocupation, isValidOcupation, profession, isValidProfession } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <ToolBar testID={'ToolBar'} />
          <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
          <Header
            testID={'Header'}
            titleText={I18n.t('PROFESSIONAL_INFORMATION')}
            description={I18n.t('PROFESSIONAL_INFO_DESC')}
          />
          <View style={styles.mainContainer}>
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
              <Text style={styles.fieldTitle}>{I18n.t('OCUPATION')}</Text>
              <TextInput
                testID={'ocupation'}
                returnKeyType="done"
                value={ocupation}
                style={[
                  styles.inputTextStyle,
                  isValidOcupation ? styles.textInputBorderNill : styles.textInputDangerBorder,
                ]}
                onChangeText={(text) => this.onChangeOcupation(text)}
              />
              <Text style={styles.fieldTitle}>{I18n.t('PROFESSION')}</Text>
              <TextInput
                testID={'profession'}
                returnKeyType="done"
                value={profession}
                style={[
                  styles.inputTextStyle,
                  isValidProfession ? styles.textInputBorderNill : styles.textInputDangerBorder,
                ]}
                onChangeText={(text) => this.onChangeProfession(text)}
              />
            </KeyboardAvoidingView>

            <View style={styles.buttonContainer}>
              <Button
                testID={'continue'}
                text={I18n.t('CONTINUE_BUTTON')}
                withShadow={true}
                withBg={true}
                onClick={() => this.submitInformation()}
              />
              <TouchableOpacity
                testID={'backButton'}
                style={styles.backButtonContainer}
                onPress={() => this.onBackClicked()}
              >
                <Text style={styles.backTextStyle}>{I18n.t('BACK')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   *
   * @param {String} ocupation - refers user enter input as an ocupation string
   *
   * It updates state object with ocupation
   */
  onChangeOcupation(ocupation) {
    const validOcupation = ocupation.trim().length > 2
    this.setState({
      ocupation: ocupation,
      isValidOcupation: validOcupation,
    })
  }

  /**
   *
   * @param {String} profession - refers user enter input as an profession string
   *
   * It updates state object with profession
   */
  onChangeProfession(profession) {
    const validProfession = profession.trim().length > 2
    this.setState({
      profession: profession,
      isValidProfession: validProfession,
    })
  }

  // check all Inputs and navigate to PhoneverificationScreen
  submitInformation = () => {
    // to access current state
    const { ocupation, profession } = this.state
    const validOcupation = ocupation.trim().length > 2
    const validProfession = profession.trim().length > 2

    if (!validOcupation || !validProfession) {
      this.setState({
        isValidOcupation: validOcupation,
        isValidProfession: validProfession,
      })
      return
    }
    const profileData = {
      ...this.props.onBoardingProfile,
      ocupation: ocupation,
      profession: profession,
    }
    this.props.setOnBoardingProfile(profileData)
    Navigator.navigate(NavKeys.PHONE_VERIFICATION)
  }

  // navigate to the previous page
  onBackClicked = () => {
    Navigator.goBack()
  }
}
ProfessionalInformation.propTypes = {
  onBoardingProfile: PropTypes.object,
  setOnBoardingProfile: PropTypes.func,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  onBoardingProfile: state.user.onBoardingProfile,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  setOnBoardingProfile: (data) => dispatch(UserActions.setOnBoardingProfile(data)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalInformation)
