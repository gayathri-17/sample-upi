import React, { Component } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './BankAccountScreenStyle'
import DefaultStrings from '../../../Constants/DefaultStrings'
import Line from 'App/Components/Line/Line'
import AddWhite from 'App/Assets/Images/Svg/AddWhite'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ProfileHeader from 'App/Components/ProfileHeader/ProfileHeader'
import UserActions from 'App/Stores/User/Actions'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import { showAlert, getUserFullName, getUserAddress } from 'App/Components/Utils/Functions'
import I18n from 'App/Localization/I18n'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import Button from 'App/Components/Button/Button'
/**
 *  user can see their Bank Accounts here
 */

export class BankAccountsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountList: [],
    }
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    this.props.getBankAccounts(
      (list) => {},
      (err) => {
        showAlert(err)
      }
    )
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    const { bankAccounts } = this.props
    if (prevProps.bankAccounts !== bankAccounts) {
      this.updateDataToState(bankAccounts)
    }
  }

  /**
   * update the user back Account list to state
   */
  updateDataToState = (list) => {
    // set contact list to component state
    let tempList = list
    tempList.push({})
    this.setState({ accountList: tempList })
  }

  render() {
    // access current state
    const { accountList } = this.state
    const { onBoardingProfile, profilePhoto, dispatch } = this.props
    return (
      <SafeAreaView style={styles.container}>
        {/* Profile header component */}
        <ProfileHeader
          fullName={getUserFullName(onBoardingProfile)}
          address={getUserAddress(onBoardingProfile)}
          profilePhoto={profilePhoto}
          dispatch={dispatch}
          icon={CommonIcons.bankAccount}
        />
        <Text testID={'titleText'} style={styles.titleText}>
          {I18n.t('BANK_ACCOUNTS')}
        </Text>
        <Line styleProp={styles.titleLine} />
        <FlatList
          testID={'accountList'}
          contentContainerStyle={styles.flatlist}
          data={accountList}
          numColumns={2}
          keyExtractor={(item, index) => item.id}
          renderItem={(item) => this.renderChild(item)}
        />
        <Button
          style={[styles.backButtonStyle, styles.bottomMargin]}
          text={I18n.t('BACK')}
          withBorder={true}
          onClick={this.onClickBack}
        />
      </SafeAreaView>
    )
  }

  /**
   * navigate to the add bank account screen
   */
  onAddAccountClicked = () => {
    Navigator.navigate(NavKeys.ADD_BANK_ACCOUNT_TYPE)
  }
  /**
   * on click back function
   */
  onClickBack = () => {
    Navigator.goBack()
  }

  /**
   * render the bank detail card
   * @param {Object} flatItem bank detail object
   */
  renderChild = (flatItem) => {
    // access current state
    const { accountList } = this.state
    if (flatItem.index === accountList.length - 1)
      return (
        <TouchableOpacity
          onPress={this.onAddAccountClicked.bind(this)}
          style={styles.addBankDetail}
        >
          <Text style={styles.addBankText}>{I18n.t('ADD_NEW_BANK_ACCOUNTS')}</Text>
          <AddWhite width={styles.addImage.width} height={styles.addImage.height} />
        </TouchableOpacity>
      )
    else
      return (
        <View testID={'bankContainer' + flatItem.index} style={styles.bankDetail}>
          <Text style={styles.bankText}>{I18n.t('BANK') + flatItem.item.bank_name}</Text>
          <Text style={styles.bankText}>
            {I18n.t('BANK_TYPE') +
              (flatItem.item.type === DefaultStrings.TYPE_DOMESTIC
                ? I18n.t('DOMESTIC')
                : flatItem.item.type === DefaultStrings.TYPE_INTERNATIONAL
                ? I18n.t('INTERNATIONAL')
                : flatItem.item.type === DefaultStrings.TYPE_PERSONAL
                ? I18n.t('PERSONAL')
                : I18n.t('BUSINESS'))}
          </Text>
          <Text style={styles.bankText}>{I18n.t('ALIAS') + flatItem.item.alias}</Text>
          <Text style={styles.bankText}>{I18n.t('STATUS')}</Text>
          <Text
            style={[
              styles.statusText,
              flatItem.item.status === 1
                ? styles.statusVefified
                : flatItem.item.status === 2
                ? styles.statusRejected
                : styles.statusPending,
            ]}
          >
            {flatItem.item.status === 1
              ? I18n.t('VERIFIED')
              : flatItem.item.status === 2
              ? I18n.t('REJECTED')
              : I18n.t('PENDING')}
          </Text>
        </View>
      )
  }
}
BankAccountsScreen.propTypes = {
  getBankAccounts: PropTypes.func,
  bankAccounts: PropTypes.array,
  onBoardingProfile: PropTypes.object,
  profilePhoto: PropTypes.string,
  dispatch: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  bankAccounts: state.user.bankAccounts,
  onBoardingProfile: state.user.onBoardingProfile,
  profilePhoto: state.user.profilePhoto,
})

export const mapDispatchToProps = (dispatch) => ({
  getBankAccounts: (successFn, failureFn) =>
    dispatch(UserActions.getBankAccounts(successFn, failureFn)),
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountsScreen)
