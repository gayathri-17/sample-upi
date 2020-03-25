import React from 'react'
import styles from './BusinessInformationScreenStyle'
import { SafeAreaView, View, Text, KeyboardAvoidingView } from 'react-native'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import Header from 'App/Components/Header/Header'
import Button from 'App/Components/Button/Button'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import DropDownArrow from 'App/Assets/Images/Svg/DropDownArrow'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import PropTypes from 'prop-types'
import SignUpActions from 'App/Stores/SignUp/Actions'
import { connect } from 'react-redux'
import I18n from 'App/Localization/I18n'
import { renameBusinessCategory, renameBusinessSubCategory } from 'App/Components/Utils/Functions'
/*
 * User can give their Business Information here
 */
export class BusinessInformationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: '',
      address: '',
      selectedCountry: '',
      selectedState: '',
      city: '',
      zipcode: '',
      taxID: '',
      sourceOfFund: '',
      dba: '',
      categories: [],
      subCategories: [],
      selectedCategory: '',
      selectedSubCategory: '',
      validZipCode: true,
      isValidCompanyName: true,
      isValidAddress: true,
      isValidCity: true,
      isValidTaxID: true,
      isNameField: true,
      isValidSOF: true,
    }
  }

  // Get country list from API
  componentDidMount() {
    this.props.getCountryList(this.getCountryFromAPI)
    this.props.getBusinessCategory(this.filterCategory)
  }
  /**
   * Api callback for get country list
   * @param {Array} data country list
   */
  getCountryFromAPI = (data) => {
    this.updateCountry(data[0].value, 0)
  }

  render() {
    // To access current component state
    const {
      companyName,
      address,
      city,
      isValidCity,
      isValidCompanyName,
      isValidAddress,
      selectedCountry,
      selectedState,
      zipcode,
      validZipCode,
      isNameField,
      taxID,
      isValidTaxID,
      sourceOfFund,
      isValidSOF,
      dba,
      selectedCategory,
      categories,
      subCategories,
      selectedSubCategory,
    } = this.state

    // to access current props
    const { countryList, provinceList } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <ToolBar testID={'ToolBar'} />
          <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
          <Header
            testID={'Header'}
            titleText={I18n.t('BUSINESS_INFORMATION')}
            description={I18n.t('BUSINESS_INFO_DESC')}
          />
          <ScrollView>
            {isNameField && (
              <View>
                <Text style={styles.fieldTitle}>{I18n.t('COMPANY_NAME')}</Text>
                <TextInput
                  testID={'companyname'}
                  returnKeyType="done"
                  value={companyName}
                  style={[
                    styles.inputTextStyle,
                    isValidCompanyName ? styles.textInputBorderNill : styles.textInputDangerBorder,
                  ]}
                  onChangeText={(text) => this.onChangeCompanyName(text)}
                />
                <Text style={styles.fieldTitle}>{I18n.t('ADDRESS')}</Text>
                <TextInput
                  testID={'address'}
                  returnKeyType="done"
                  value={address}
                  style={[
                    styles.inputTextStyle,
                    isValidAddress ? styles.textInputBorderNill : styles.textInputDangerBorder,
                  ]}
                  onChangeText={(text) => this.onChangeAddress(text)}
                />
                <View style={styles.dropDownContainer}>
                  {/** country dropdown */}
                  <View style={styles.countryContainer}>
                    <Text style={styles.fieldTitle}>{I18n.t('COUNTRY')}</Text>
                    <View style={styles.dropDownStyleMargin}>
                      <RNPickerSelect
                        testID={'countryPicker'}
                        style={{
                          inputIOS: styles.countryDropDownInputStyle,
                          inputAndroid: styles.countryDropDownInputStyle,
                          iconContainer: styles.dropdownIconStyle,
                        }}
                        placeholder={{}}
                        onValueChange={this.updateCountry}
                        value={selectedCountry}
                        items={countryList}
                        Icon={this.dropDownArrowView}
                      />
                    </View>
                  </View>
                  {/** State Picker */}
                  <View style={styles.stateContainer}>
                    <Text style={styles.stateFieldTitle}>{I18n.t('STATE')}</Text>
                    <View style={styles.dropDownStyle}>
                      <RNPickerSelect
                        testID={'statePicker'}
                        style={{
                          inputIOS: styles.stateDropDownInputStyle,
                          inputAndroid: styles.stateDropDownInputStyle,
                          iconContainer: styles.dropdownIconStyle,
                        }}
                        placeholder={{}}
                        onValueChange={this.updateState}
                        value={selectedState}
                        items={provinceList}
                        Icon={this.dropDownArrowView}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.dropDownContainer}>
                  <View style={styles.countryContainer}>
                    <Text style={styles.fieldTitle}>{I18n.t('CITY')}</Text>
                    <TextInput
                      testID={'city'}
                      returnKeyType="done"
                      value={city}
                      style={[
                        styles.cityInputStyle,
                        isValidCity ? styles.textInputBorderNill : styles.textInputDangerBorder,
                      ]}
                      onChangeText={(text) => this.onChangeCity(text)}
                    />
                  </View>
                  {/** Zipcode  */}
                  <View style={styles.stateContainer}>
                    <Text style={styles.stateFieldTitle}>{I18n.t('ZIP_CODE')}</Text>
                    <TextInput
                      testID={'zipCode'}
                      returnKeyType="done"
                      value={zipcode}
                      style={[
                        styles.zipCodeTextStyle,
                        validZipCode ? styles.textInputBorderNill : styles.textInputDangerBorder,
                      ]}
                      onChangeText={(text) => this.onChangeZipCode(text)}
                    />
                  </View>
                </View>
              </View>
            )}
            {!isNameField && (
              <View>
                <Text style={styles.fieldTitle}>{I18n.t('TAXID_EIN_VAT')}</Text>
                <TextInput
                  testID={'taxId'}
                  returnKeyType="done"
                  value={taxID}
                  style={[
                    styles.inputTextStyle,
                    isValidTaxID ? styles.textInputBorderNill : styles.textInputDangerBorder,
                  ]}
                  onChangeText={this.onChangeTaxID}
                />
                <Text style={styles.fieldTitle}>{I18n.t('CATEGORY')}</Text>
                <RNPickerSelect
                  testID={'category'}
                  style={{
                    inputIOS: styles.categoryDropDownInputStyle,
                    inputAndroid: styles.categoryDropDownInputStyle,
                    iconContainer: styles.categoryIconStyle,
                  }}
                  placeholder={{}}
                  onValueChange={(itemValue, index) => this.onChangeCategory(itemValue)}
                  value={selectedCategory}
                  items={categories}
                  Icon={this.dropDownArrowView}
                />
                {subCategories.length > 1 && (
                  <View>
                    <Text style={styles.fieldTitle}>{I18n.t('SUB_CATEGORY')}</Text>
                    <RNPickerSelect
                      testID={'subcategory'}
                      style={{
                        inputIOS: styles.categoryDropDownInputStyle,
                        inputAndroid: styles.categoryDropDownInputStyle,
                        iconContainer: styles.categoryIconStyle,
                      }}
                      placeholder={{}}
                      onValueChange={this.onChangeSubCategory}
                      value={selectedSubCategory}
                      items={subCategories}
                      Icon={this.dropDownArrowView}
                    />
                  </View>
                )}
                <Text style={styles.fieldTitle}>{I18n.t('SOURCE_OF_FUNDS')}</Text>
                <TextInput
                  testID={'SOF'}
                  returnKeyType="done"
                  value={sourceOfFund}
                  style={[
                    styles.inputTextStyle,
                    isValidSOF ? styles.textInputBorderNill : styles.textInputDangerBorder,
                  ]}
                  onChangeText={this.onChangeFundSource}
                />
                <Text style={styles.fieldTitle}>{I18n.t('DBA_OPTIONAL')}</Text>
                <TextInput
                  testID={'dba'}
                  returnKeyType="done"
                  value={dba}
                  style={styles.inputTextStyle}
                  onChangeText={this.onChangeDBA}
                />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Button
                testID={'continue'}
                text={I18n.t('CONTINUE_BUTTON')}
                withShadow={true}
                withBg={true}
                onClick={() => this.submitInformation()}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  /**
   * filter categories and update the state
   * @param {Array} list categories list
   */
  filterCategory = (list) => {
    const categories = renameBusinessCategory(list)
    this.setState({
      categories: categories,
    })
    this.onChangeCategory(categories[0].value)
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
   * @param {String} companyName - refers user enter input as an companyName string
   *
   * It updates state object with companyName
   */
  onChangeCompanyName(companyName) {
    const validcompanyName = companyName.length > 2
    this.setState({
      companyName: companyName,
      isValidCompanyName: validcompanyName,
    })
  }

  /**
   *
   * @param {String} address - refers user enter input as an address string
   *
   * It updates state object with address
   */
  onChangeAddress(address) {
    const validAddress = address.length > 4
    this.setState({
      isValidAddress: validAddress,
      address: address,
    })
  }

  /**
   *
   * @param {String} city - refers user enter input as an city string
   *
   * It updates state object with city
   */
  onChangeCity(city) {
    const validCity = city.length > 3
    this.setState({
      isValidCity: validCity,
      city: city,
    })
  }

  /**
   *
   * @param {String} zipCode - refers user enter input as an ZipCode string
   *
   * It updates state object with ZipCode
   */
  onChangeZipCode(zipCode) {
    const isValidZipCode = zipCode.length > 2
    this.setState({
      zipcode: zipCode,
      validZipCode: isValidZipCode,
    })
  }

  /**
   *
   * @param {String} taxId - refers user enter input as an taxId string
   *
   * It updates state object with taxId
   */
  onChangeTaxID = (taxId) => {
    const isValidtax = taxId.length > 2
    this.setState({
      taxID: taxId,
      isValidTaxID: isValidtax,
    })
  }

  /**
   *
   * @param {String} sourceOfFund - refers user enter input as an sourceOfFund string
   *
   * It updates state object with sourceOfFund
   */
  onChangeFundSource = (sourceOfFund) => {
    const isValidsof = sourceOfFund.length > 2
    this.setState({
      sourceOfFund: sourceOfFund,
      isValidSOF: isValidsof,
    })
  }

  /**
   *
   * @param {String} dba - refers user enter input as an dba string
   *
   * It updates state object with dba
   */
  onChangeDBA = (dba) => {
    this.setState({
      dba: dba,
    })
  }

  /**
   * Change gender function
   * @param {String} state - refers State based on user selected in dropdown
   * It updates state object with selected by user
   */
  updateState = (state) => {
    this.setState({
      selectedState: state,
    })
  }

  /**
   * Change gender function
   * @param {String} city - refers city based on user selected in dropdown
   * It updates city object with selected by user
   */
  updateCity(city) {
    this.setState({
      selectedCity: city,
    })
  }

  // check all Inputs and navigate to PhoneverificationScreen
  submitInformation = () => {
    // to access current state
    const {
      isNameField,
      companyName,
      address,
      city,
      zipcode,
      taxID,
      sourceOfFund,
      selectedCountry,
      selectedState,
      dba,
      selectedSubCategory,
    } = this.state
    const validCompany = companyName.length > 2
    const validAddress = address.length > 4
    const validCity = city.length > 3
    const validZipcode = zipcode.length > 3
    const validSOF = sourceOfFund.length > 2
    const validTaxid = taxID.length > 2

    if (isNameField && validCompany && validAddress && validCity && validZipcode) {
      this.setState({ isNameField: false })
    } else if (!isNameField && validTaxid && validSOF) {
      const reqParam = {
        business_name: companyName,
        business_country: selectedCountry,
        business_province: selectedState,
        business_city: city,
        business_zip: zipcode,
        dba: dba,
        business_taxid: taxID,
        source_funds: sourceOfFund,
        business_address: address,
        sub_category: selectedSubCategory,
      }
      this.props.updateBusinessInfo(reqParam, this.businessInfoCallback)
    } else
      this.setState({
        isValidCompanyName: validCompany,
        isValidAddress: validAddress,
        isValidCity: validCity,
        validZipCode: validZipcode,
        isValidTaxID: !isNameField ? validTaxid : true,
        isValidSOF: !isNameField ? validSOF : true,
      })
  }

  /**
   * business information success callback
   * @param {string} message success message
   */
  businessInfoCallback = (message) => {
    Navigator.navigate(NavKeys.UPLOAD_BUSINESS_DOCUMENT)
  }

  /**
   *
   * @param {String} category - refers category based on user selected in dropdown
   * It updates category state object with selected by user
   */
  onChangeCategory(category) {
    let subCategory = []
    this.state.categories.map((item) => {
      if (item.value === category) {
        subCategory = renameBusinessSubCategory(item.bussinessSubcategories)
      }
    })
    this.setState({
      selectedCategory: category,
      subCategories: subCategory,
      selectedSubCategory: subCategory.length > 1 ? subCategory[0].value : 0,
    })
  }
  /**
   *
   * @param {String} category - refers subcategory based on user selected in dropdown
   * It updates subcategory state object with selected by user
   */
  onChangeSubCategory = (category) => {
    this.setState({
      selectedSubCategory: category,
    })
  }

  /**
   *
   * @param {String} country - refers Country based on user selected in dropdown
   * It updates country state object with selected by user
   */

  updateCountry = (country) => {
    this.setState({
      selectedCountry: country,
    })
    this.props.getProvinceList(country, this.provinceListCallback)
  }

  /**
   * Provience list Callback from API
   * @param {*} data province list
   */
  provinceListCallback = (data) => {
    this.updateProvince(data != null && data.length > 0 ? data[0].value : '')
  }

  /**
   *
   * @param {String} state - refers State based on user selected in dropdown
   * It updates state object with selected by user
   */
  updateProvince(state) {
    this.setState({
      selectedState: state,
    })
  }
}
BusinessInformationScreen.propTypes = {
  getCountryList: PropTypes.func,
  getProvinceList: PropTypes.func,
  getBusinessCategory: PropTypes.func,
  updateBusinessInfo: PropTypes.func,
  countryList: PropTypes.array,
  provinceList: PropTypes.array,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  countryList: state.signUp.countryList,
  provinceList: state.signUp.provinceList,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getCountryList: (successFn) => dispatch(SignUpActions.getCountryList(successFn)),
  getProvinceList: (counrtryIso, successFn) =>
    dispatch(SignUpActions.getProvinceList(counrtryIso, successFn)),
  getBusinessCategory: (successFn) => dispatch(SignUpActions.getBusinessCategory(successFn)),
  updateBusinessInfo: (businessData, successFn) =>
    dispatch(SignUpActions.updateBusinessInfo(businessData, successFn)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInformationScreen)
