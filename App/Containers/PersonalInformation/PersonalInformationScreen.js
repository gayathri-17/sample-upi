import React from 'react'
import styles from './PersonalInformationScreenStyle'
import { View, TouchableOpacity, Text, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import TextFormats from 'App/Constants/TextFormats'
import Header from 'App/Components/Header/Header'
import Button from 'App/Components/Button/Button'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Navigator from 'App/Services/NavigationService'
import RNPickerSelect from 'react-native-picker-select'
import DropDownArrow from 'App/Assets/Images/Svg/DropDownArrow'
import NavKeys from 'App/Constants/NavKeys'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import UserActions from 'App/Stores/User/Actions'
import SignUpActions from 'App/Stores/SignUp/Actions'
import I18n from 'App/Localization/I18n'
/*
 * User can give their Personal Information here
 */
export class PersonalInformationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genders: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'Female' }],
      selectedGender: 'male',
      firstName: '',
      lastName: '',
      nationality: '',
      documentNumber: '',
      selectedDocument: {},
      dateOfBirth: TextFormats.DATE_FORMAT,
      isValidFirstName: true,
      isValidNationality: true,
      isValidDocNo: true,
      isValidDOB: true,
      isDatePickerVisible: false,
      isValidLastName: true,
      selectedIndex: 0,
      selectedDate: new Date(),
    }
  }

  /**
   * Initial lifecycle callback to load data
   */
  componentDidMount() {
    this.props.getUserDocuments()
    this.setState({ selectedDocument: this.props.userDocuments[this.state.selectedIndex] })
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    const { userDocuments } = this.props
    if (prevProps.userDocuments !== userDocuments) {
      this.setState({ selectedDocument: this.props.userDocuments[this.state.selectedIndex] })
    }
  }

  render() {
    // To access current component state with simplified field of state
    const {
      firstName,
      lastName,
      nationality,
      isValidFirstName,
      isValidDocNo,
      isValidNationality,
      isValidDOB,
      dateOfBirth,
      isDatePickerVisible,
      genders,
      selectedGender,
      selectedDocument,
      documentNumber,
      isValidLastName,
      selectedDate,
    } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
            <ToolBar testID={'ToolBar'} />
            <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
            <Header
              testID={'Header'}
              titleText={I18n.t('PERSONAL_INFORMATION')}
              description={I18n.t('PERSONAL_INFO_DESC')}
            />
            <ScrollView>
              <Text style={styles.fieldTitle}>{I18n.t('FIRST_NAME')}</Text>
              <TextInput
                testID={'firstName'}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.lastName.focus()
                }}
                value={firstName}
                style={[
                  styles.inputTextStyle,
                  isValidFirstName ? styles.textInputBorderNill : styles.textInputDangerBorder,
                ]}
                onChangeText={(text) => this.onChangeFirstName(text)}
              />
              <Text style={styles.fieldTitle}>{I18n.t('LAST_NAME')}</Text>
              <TextInput
                testID={'lastName'}
                returnKeyType="done"
                ref={(input) => {
                  this.lastName = input
                }}
                value={lastName}
                style={[
                  styles.inputTextStyle,
                  isValidLastName ? styles.textInputBorderNill : styles.textInputDangerBorder,
                ]}
                onChangeText={(text) => this.onChangeLastName(text)}
              />
              <View style={styles.dropDownContainer}>
                {/** Gender dropdown */}
                <View style={styles.genderAndDateContainer}>
                  <Text style={styles.fieldTitle}>{I18n.t('GENDER')}</Text>
                  <View style={styles.dropDownStyleMargin}>
                    <RNPickerSelect
                      testID={'genderPicker'}
                      style={{
                        inputIOS: styles.dropDownInputStyle,
                        inputAndroid: styles.dropDownInputStyle,
                        iconContainer: styles.dropdownIconStyle,
                      }}
                      placeholder={{}}
                      onValueChange={this.updateGender}
                      value={selectedGender}
                      items={genders}
                      Icon={this.dropDownArrowView}
                    />
                  </View>
                </View>
                {/** DOB Picker */}
                <View style={styles.genderAndDateContainer}>
                  <Text style={styles.dateFieldTitle}>{I18n.t('DATE_OF_BIRTH')}</Text>
                  <TouchableOpacity
                    style={[
                      styles.dateContainer,
                      isValidDOB ? styles.textInputBorderNill : styles.textInputDangerBorder,
                    ]}
                    testID={'dobPicker'}
                    onPress={this.showDateTimePicker}
                  >
                    <Text style={styles.dateText}>{dateOfBirth}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Document selection drop down */}
              <Text style={styles.fieldTitle}>{I18n.t('TYPE_OF_DOCUMENT')}</Text>
              <View style={styles.dropDownStyleMargin}>
                <RNPickerSelect
                  testID={'selectDocumentPicker'}
                  style={{
                    inputIOS: styles.dropDownDocumentSelection,
                    inputAndroid: styles.dropDownDocumentSelection,
                    iconContainer: styles.dropdownIconStyle,
                  }}
                  placeholder={{}}
                  onValueChange={this.onChangeDocument}
                  value={selectedDocument}
                  items={this.props.userDocuments}
                  Icon={this.dropDownArrowView}
                />
              </View>
              {/* Document number input field */}
              <Text style={styles.fieldTitle}>{I18n.t('DOCUMENT_NUMBER')}</Text>
              <TextInput
                testID={'documentNumber'}
                returnKeyType="done"
                value={documentNumber}
                style={[
                  styles.inputTextStyle,
                  isValidDocNo ? styles.textInputBorderNill : styles.textInputDangerBorder,
                ]}
                onChangeText={(text) => this.onChangeDocumentNumber(text)}
              />
              <Text style={styles.fieldTitle}>{I18n.t('NATIONALITY')}</Text>
              <TextInput
                testID={'nationality'}
                returnKeyType="done"
                value={nationality}
                autoCapitalize={'characters'}
                style={[
                  styles.inputTextStyle,
                  isValidNationality ? styles.textInputBorderNill : styles.textInputDangerBorder,
                ]}
                onChangeText={(text) => this.onChangeNationality(text)}
              />
              <View style={styles.buttonContainer}>
                <Button
                  testID={'continue'}
                  text={I18n.t('CONTINUE_BUTTON')}
                  withShadow={true}
                  withBg={true}
                  onClick={() => this.submitInformation()}
                />
                <TouchableOpacity
                  testID={'BackButton'}
                  style={styles.backButtonContainer}
                  onPress={() => this.onBackClicked()}
                >
                  <Text style={styles.backTextStyle}>{I18n.t('BACK')}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <DateTimePicker
              maximumDate={new Date()}
              isVisible={isDatePickerVisible}
              date={selectedDate}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    )
  }
  /**
   * Dropdown view function
   * @returns {DropDownArrow} returns Drop down arrow view
   */
  dropDownArrowView = () => {
    return (
      <DropDownArrow
        width={styles.dropDownImageStyle.width}
        height={styles.dropDownImageStyle.height}
      />
    )
  }
  /**
   *
   * @param {String} firstName - refers user enter input as an firstName string
   *
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
   *
   * @param {String} lastName - refers user enter input as an lastName string
   *
   * It updates state object with lastName
   */
  onChangeLastName(lastName) {
    const validLastName = lastName.trim().length > 2
    this.setState({
      lastName: lastName,
      isValidLastName: validLastName,
    })
  }

  /**
   *
   * @param {String} docNo - refers user enter input as a document number
   *
   * It updates state object with documentNumber
   */
  onChangeDocumentNumber(docNo) {
    this.setState({
      documentNumber: docNo,
      isValidDocNo: docNo.trim().length > 0,
    })
  }

  /**
   *
   * @param {String} nationality - refers user enter input as an nationality string
   *
   * It updates state object with nationality
   */
  onChangeNationality(nationality) {
    const validNationality = nationality.trim().length > 0
    this.setState({
      nationality: nationality,
      isValidNationality: validNationality,
    })
  }

  /**
   * Change gender function
   * @param {String} gender - refers gender based on user selected in dropdown
   * It updates gender state object with selected by user
   */
  updateGender = (gender) => {
    this.setState({
      selectedGender: gender,
    })
  }
  /**
   * Change document function
   * @param {String} itemValue - refers document based on user selected in dropdown
   * @param {number} index - selected index
   * It updates document name state object with selected by user
   */
  onChangeDocument = (itemValue, index) => {
    this.setState({ selectedDocument: itemValue, selectedIndex: index })
  }

  /**
   * It updates the datePickerVisible boolean by true,
   * and it can allow to show the datePicker
   */
  showDateTimePicker = () => {
    this.setState({ isDatePickerVisible: true })
  }

  /**
   * It updates the datePickerVisible boolean by false,
   * and it can allow to hide the datePicker
   */
  hideDateTimePicker = () => {
    this.setState({ isDatePickerVisible: false })
  }

  /**
   *
   * @param {String} date - refers user enter input as an nationality string
   *
   * It updates state object with nationality
   */
  handleDatePicked = (date) => {
    var isoDate = new Date(date).toISOString()
    this.setState({
      isDatePickerVisible: false,
      isValidDOB: true,
      selectedDate: date,
      dateOfBirth: moment(isoDate).format(TextFormats.DATE_FORMAT),
    })
  }

  // check all user's inputs and navigate to PhoneverificationScreen if everything is valid inputs
  submitInformation = () => {
    const isValidFirstName = this.state.firstName.trim().length > 0
    const isValidLastName = this.state.lastName.trim().length > 0
    const isValidDocNo = this.state.documentNumber.trim().length > 0
    const isValidNationality = this.state.nationality.trim().length > 0
    const isValidDOB = this.state.dateOfBirth !== TextFormats.DATE_FORMAT
    if (isValidFirstName && isValidLastName && isValidDocNo && isValidNationality && isValidDOB) {
      const profileData = {
        ...this.props.onBoardingProfile,
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        gender: this.state.selectedGender,
        dob: this.state.dateOfBirth,
        documentType: this.props.userDocuments[this.state.selectedIndex].id, // this.state.selectedDocument,//TODO: to be changed as the types will be shown dynamic from API in the next commit
        documentNumber: this.state.documentNumber,
      }
      this.props.setOnBoardingProfile(profileData)
      Navigator.navigate(NavKeys.ADDRESS_INFORMATION_SCREEN)
    } else {
      this.setState({
        isValidFirstName: isValidFirstName,
        isValidLastName: isValidLastName,
        isValidDocNo: isValidDocNo,
        isValidNationality: isValidNationality,
        isValidDOB: isValidDOB,
      })
    }
  }

  // navigate to the previous page
  onBackClicked = () => {
    Navigator.goBack()
  }
}

PersonalInformationScreen.propTypes = {
  setOnBoardingProfile: PropTypes.func,
  onBoardingProfile: PropTypes.object,
  userDocuments: PropTypes.array,
  getUserDocuments: PropTypes.func,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  onBoardingProfile: state.user.onBoardingProfile,
  userDocuments: state.signUp.userDocuments,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  setOnBoardingProfile: (data) => dispatch(UserActions.setOnBoardingProfile(data)),
  getUserDocuments: () => dispatch(SignUpActions.getUserDocuments()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformationScreen)
