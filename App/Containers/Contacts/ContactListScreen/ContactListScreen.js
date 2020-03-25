import React from 'react'
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native'
import styles from './ContactListScreenStyle'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Line from 'App/Components/Line/Line'
import DefaultStrings from 'App/Constants/DefaultStrings'
import UserActions from 'App/Stores/User/Actions'
import Colors from 'App/Theme/Colors'
import NavKeys from 'App/Constants/NavKeys'
import Navigator from 'App/Services/NavigationService'
import Search from 'App/Assets/Images/Svg/Search'
import Mic from 'App/Assets/Images/Svg/Mic'
import ContactListItem from 'App/Components/ContactListItem/ContactListItem'
import Voice from 'react-native-voice'
import MicMute from 'App/Assets/Images/Svg/MicMute'
import Button from 'App/Components/Button/Button'
import I18n from 'App/Localization/I18n'
import EmptyListView from 'App/Components/EmptyListView/EmptyListView'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

/**
 * User can view their contact list
 */
export class ContactListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currency: 'BTC',
      selectedContact: 'a contact',
      searchText: '',
      contactList: [],
      isStartRecord: true,
      filteredList: [],
      currentPage: 1,
      items: DefaultStrings.PAGINATION_ITEMS,
      totalPages: 0,
      loadMoreData: false,
    }
    Voice.onSpeechResults = this.onSpeechResults.bind(this)
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this)
    Voice.onSpeechError = this.onSpeechError.bind(this)
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    const { currentPage, items } = this.state
    this.getContactList(currentPage, items, true)
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  render() {
    const {
      //   selectedContact,
      //   currency,
      searchText,
      contactList,
      isStartRecord,
      filteredList,
    } = this.state
    const displayList = searchText && searchText.length > 0 ? filteredList : contactList
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {/* Search container */}
          <View style={styles.walletTitleContainer}>
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
            </View>
          </View>
        </TouchableWithoutFeedback>
        <LinearGradient
          colors={[Colors.ghostWhite, Colors.white]}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
          style={styles.borderLineStyle}
        />
        {/* Contact list */}
        <FlatList
          style={styles.listContainer}
          contentContainerStyle={displayList.length === 0 ? styles.listContentContainer : {}}
          data={displayList}
          renderItem={this.renderData}
          ListEmptyComponent={
            <EmptyListView
              height={styles.emptyListImageStyle.height}
              width={styles.emptyListImageStyle.width}
              color={Colors.mediumTurquoise}
              testID={'emptyList'}
            />
          }
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.01}
          onEndReached={this.loadMoreData}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={[styles.buttonView]}>
          <Button
            text={I18n.t('ADD_NEW_CONTACT')}
            withShadow={true}
            withBg={true}
            testID={'addNewContact'}
            onClick={() => this.navigateToAddContact()}
          />
        </View>
      </SafeAreaView>
    )
  }

  /**
   * render loader footer for pagination
   */
  renderFooter = () => {
    return (
      this.state.loadMoreData && (
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
            color={Colors.mediumTurquoise}
            animating={this.state.loading}
          />
        </View>
      )
    )
  }

  /**
   * load more contact list when on end scroll reached
   */
  loadMoreData = () => {
    if (this.state.totalPages > this.state.currentPage) {
      this.getContactList(this.state.page + 1, DefaultStrings.PAGINATION_ITEMS, false)
    }
  }

  /**
   * get contact from api and update to local component
   * @param {Integer} page refers page needs to load contact list
   * @param {Integer} items refers numbers of contact to load
   * @param {Boolean} isLoader whether loader to enabled or not
   */
  getContactList(page, items, isLoader) {
    let paginationData = '?page=' + page + '&items=' + items
    if (!isLoader) this.setState({ loadMoreData: true })
    if (page === 1)
      this.setState({ currentPage: 1, items: DefaultStrings.PAGINATION_ITEMS, totalPages: 0 })
    this.props.getContactList(paginationData, isLoader, this.handleSuccessStateAddContact)
  }

  /**
   * handle success state for contact list
   * @param {Object} list api response contact list
   */
  handleSuccessStateAddContact = (list) => {
    this.setState({
      contactList: [...this.state.contactList, ...list.data],
      currentPage: list.currentPage,
      totalPages: list.totalPages,
      items: DefaultStrings.PAGINATION_ITEMS,
      loadMoreData: false,
    })
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

    this.setState({ filteredList })
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
        isAllContacts={true}
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
    Navigator.navigate(NavKeys.CONTACT_DETAIL, {
      contact: item,
    })
  }

  /**
   * On change Name TextField
   */
  navigateToAddContact = () => {
    Navigator.navigate(NavKeys.ADD_NEW_CONTACT, {
      currency: this.state.currency,
      isFromContactTab: true,
      getContactList: this.getContactList.bind(this, 1, DefaultStrings.PAGINATION_ITEMS, true),
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

ContactListScreen.propTypes = {
  getContactList: PropTypes.func,
  setSelectedBank: PropTypes.func,
  navigation: PropTypes.object,
}

export const mapStateToProps = (state) => ({})

export const mapDispatchToProps = (dispatch) => ({
  getContactList: (coin, isLoader, successFn) =>
    dispatch(UserActions.getContactList(coin, isLoader, successFn)),
  setSelectedBank: (bankData) => dispatch(UserActions.setSelectedBank(bankData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactListScreen)
