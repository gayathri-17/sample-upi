import React from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import styles from './ContactListStyle'
import LinearGradient from 'react-native-linear-gradient'
import { getImage } from 'App/Components/Utils/Functions'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Line from 'App/Components/Line/Line'
import DefaultStrings from 'App/Constants/DefaultStrings'
import UserActions from 'App/Stores/User/Actions'
import Colors from 'App/Theme/Colors'
import NavKeys from 'App/Constants/NavKeys'
import Navigator from 'App/Services/NavigationService'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import Search from 'App/Assets/Images/Svg/Search'
import Mic from 'App/Assets/Images/Svg/Mic'
import GreyPlusCircle from 'App/Assets/Images/Svg/GreyPlusCircle'
import ContactListItem from 'App/Components/ContactListItem/ContactListItem'
import Voice from 'react-native-voice'
import MicMute from 'App/Assets/Images/Svg/MicMute'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'
import ErrorModal from 'App/Components/Modal/ErrorModal/ErrorModal'

/**
 * User can view their contact list
 */
export class ContactList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currency: props.navigation.state.params.currency,
      selectedContact: 'a contact',
      searchText: '',
      contactList: [],
      isStartRecord: true,
      filteredList: [],
      apiRequestFailure: false,
      apiErrMessage: '',
    }
    Voice.onSpeechResults = this.onSpeechResults.bind(this)
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this)
    Voice.onSpeechError = this.onSpeechError.bind(this)
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    this.getContactList()
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  render() {
    const {
      selectedContact,
      currency,
      searchText,
      contactList,
      isStartRecord,
      filteredList,
      apiErrMessage,
      apiRequestFailure,
    } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {/* Send container */}
        <View style={styles.walletTitleContainer}>
          <View style={styles.walletTitleImageContainer}>
            <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
          </View>
          <Text style={styles.walletTitleText}>{I18n.t('SEND_SMALL')}</Text>
          {getImage(currency)}
          <Text style={[styles.walletTitleText, styles.textLowerCase]}> {I18n.t('TO')}</Text>
          <Text style={styles.bankAccountTextStyle}>{selectedContact}</Text>
        </View>
        <View style={styles.centerStyle}>
          <Line styleProp={styles.lineStyle} />
        </View>
        {/* To container */}
        <View style={styles.walletTitleContainer}>
          <View style={styles.walletTitleImageContainer}>
            <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
          </View>
          <Text style={styles.walletTitleText}>{I18n.t('TO')}</Text>
          <View style={styles.rowStyle}>
            <View style={styles.sectionStyle}>
              <TouchableOpacity
                width={styles.searchIconStyle.width}
                height={styles.searchIconStyle.height}
                style={styles.searchIconStyle}
              >
                <Search />
              </TouchableOpacity>

              <TextInput
                style={styles.inputStyle}
                value={searchText}
                autoCapitalize="none"
                placeholder={I18n.t('SEARCH')}
                onChangeText={this.search}
              />
              <TouchableOpacity
                width={styles.mikeIconStyle.width}
                height={styles.mikeIconStyle.height}
                style={styles.mikeIconStyle}
                onPress={this.onStartAndStopRecognition.bind(this)}
              >
                {isStartRecord && <Mic />}
                {!isStartRecord && <MicMute />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.plusCircleIcon} onPress={this.navigateToAddContact}>
              <GreyPlusCircle />
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient
          colors={[Colors.ghostWhite, Colors.white]}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
          style={styles.borderLineStyle}
        />
        {/* Contact list */}
        <FlatList
          style={styles.listContainer}
          data={searchText && searchText.length > 0 ? filteredList : contactList}
          renderItem={this.renderData}
          ItemSeparatorComponent={this.renderSeparator}
          extraData={this.state.isOpen}
          keyExtractor={(item) => item.id}
        />
        {/* api request failure modal */}
        <ErrorModal
          isShow={apiRequestFailure}
          isHideClose={false}
          onCLickClose={this.goBack}
          onClickSubmit={this.getContactList}
          submitButtonTitle={I18n.t('RETRY')}
          errorMessage={apiErrMessage || I18n.t('NETWORK_ERROR')}
        />
      </SafeAreaView>
    )
  }

  /**
   * go back to previous screen
   */
  goBack = () => {
    Navigator.goBack()
  }

  /**
   * get contact from api and update to local component
   */
  getContactList = () => {
    this.setState({ apiRequestFailure: false })
    this.props.getContactList(this.state.currency, true, this.setContactList, this.handleApiFailure)
  }
  setContactList = (list) => {
    // set contact list to component state
    this.setState({ contactList: list.data })
  }

  /**
   * handle api failure
   * @param {String} error error message
   */
  handleApiFailure = (error) => {
    this.setState({ apiRequestFailure: true, apiErrMessage: error })
  }

  /**
   * render list separator component
   * @returns {View} returns item separator component
   */
  renderSeparator = () => {
    return (
      <View style={styles.centerStyle}>
        <Line styleProp={styles.lineStyleForSeparotor} />
      </View>
    )
  }

  /**
   * filter search results
   * @param {String} searchText refers string to search
   */
  search = (searchText) => {
    this.setState({ searchText: searchText })
    // filter based on search text
    let filteredList = this.state.contactList.filter(function(item) {
      return item.description.toLowerCase().includes(searchText.toLowerCase())
    })

    this.setState({ filteredList: filteredList })
  }

  /**
   * render contact list data
   * @param {Object} item refers list itearation object
   * @returns {TransListItem} returns list iteration view
   */
  renderData = ({ item, index }) => {
    return (
      <ContactListItem
        contact={item}
        searchText={this.state.searchText}
        onPress={this.onPressListItem.bind(this, item, index)}
      />
    )
  }

  /**
   * on press function for list item
   * @param {Object} item refers list itearation object
   * @param {index} index refers selected index
   */
  onPressListItem = (item, index) => {
    if (
      this.state.currency === DefaultStrings.TYPE_USD ||
      this.state.currency === CurrencyType.EURO
    ) {
      this.props.setSelectedBank({
        id_account: item.id,
        to: item.description,
        type: DefaultStrings.TYPE_CONTACT,
        currency: this.state.currency,
      })
      Navigator.navigate(NavKeys.SEND_ENTER_AMOUNT_DETAIL, {
        currencyType: this.state.currency,
      })
    } else {
      this.props.navigation.state.params.addContact(item)
      this.props.navigation.goBack()
    }
  }

  /**
   * On change Name TextField
   */
  navigateToAddContact = () => {
    Navigator.navigate(NavKeys.ADD_NEW_CONTACT, {
      currency: this.state.currency,
      getContactList: () => this.getContactList(),
    })
  }

  /**
   * on press mike to start and stop speach
   */
  onStartAndStopRecognition() {
    if (this.state.isStartRecord) {
      this.setState({
        searchText: '',
      })
      Voice.start(DefaultStrings.ENGLISH_US)
    } else {
      Voice.stop()
    }
    this.setState({ isStartRecord: !this.state.isStartRecord })
  }
  /**
   * Voice Error callback function
   * @param {*} e voice component Object
   */
  onSpeechError = (e) => {
    // Handle error
    this.setState({ isStartRecord: true })
  }
  /**
   * Voice end callback function
   */
  onSpeechEndHandler = () => {
    this.setState({ isStartRecord: true })
  }
  /**
   * Voice result callback function
   * @param {*} e voice component Object
   */
  onSpeechResults(e) {
    if (e.value) {
      this.search(e.value[0])
    }
  }
}

ContactList.propTypes = {
  getContactList: PropTypes.func,
  setSelectedBank: PropTypes.func,
  navigation: PropTypes.object,
}

export const mapStateToProps = (state) => ({})

export const mapDispatchToProps = (dispatch) => ({
  getContactList: (coin, isLoader, successFn, failureFn) =>
    dispatch(UserActions.getContactList(coin, isLoader, successFn, failureFn)),
  setSelectedBank: (bankData) => dispatch(UserActions.setSelectedBank(bankData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList)
