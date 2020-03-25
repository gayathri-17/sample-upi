import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Navigator from 'App/Services/NavigationService'
import styles from './DepositViewerScreenStyle'
import UserActions from 'App/Stores/User/Actions'
import Button from 'App/Components/Button/Button'
import NavKeys from '../../../Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'
import { RateApp, showRateAlert } from 'App/Components/Utils/Functions'

/**
 *user can see their bank detail and save as pdf
 */
export class DepositViewerScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fee: props.navigation.state.params.fee,
      screenType: props.navigation.state.params.screenType,
      screenName: props.navigation.state.params.screenName,
      wireCode: props.navigation.state.params.wireCode,
      bankData: {},
    }
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    this.props.getMasterBank(this.setBankData)
  }

  render() {
    // to access current state
    const { fee, bankData, wireCode } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.headerText}>{I18n.t('BANK_DETAILS')}</Text>
          {bankData !== {} && (
            <View style={styles.bankDetailContainer}>
              {this.renderBankView(I18n.t('BANK_NAME_COLON'), bankData.bank_name)}
              {this.renderBankView(I18n.t('COMPANY_NAME_COLON'), bankData.name)}
              {this.renderBankView(I18n.t('ADDRESS_COLON'), bankData.address)}
              {this.renderBankView(I18n.t('ACCOUNT_NUMBER_COLON'), bankData.account_number)}
              {this.renderBankView(I18n.t('BANK_ADDRESS_COLON'), bankData.bank_address)}
              {this.renderBankView(I18n.t('ROUDING_ABA_COLON'), bankData.routing)}
              {this.renderBankView(I18n.t('SWIFT_COLON'), bankData.swift)}
              {this.renderBankView(I18n.t('REFERENCE_CODE_COLON'), wireCode)}
            </View>
          )}
          <Text style={styles.wireTitleText}>{I18n.t('WIRE_TRANSFER_TITLE')}</Text>
          <Text style={styles.penaltyDest}>
            {I18n.t('PENALTY_DESC')}${fee}
            {I18n.t('PENALTY')}
          </Text>
          <Button
            testID={'continue'}
            text={I18n.t('SAVE_AS_PDF')}
            withShadow={true}
            withBg={true}
            onClick={() => {}}
          />
          <TouchableOpacity
            testID={'backButton'}
            style={styles.backButtonContainer}
            onPress={() => this.onBackClicked()}
          >
            <Text style={styles.backTextStyle}>{I18n.t('BACK_TO_DASHBOARD')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   * set bank data
   * @param {Object} data bank data
   */
  setBankData = (data) => {
    let usdBank = {}
    let euroBank = {}
    data.map((item) => {
      if (parseInt(item.type) === 1) usdBank = item
      else euroBank = item
    })

    this.setState({ bankData: this.state.screenType === CurrencyType.USD ? usdBank : euroBank })
  }

  /**
   * render the bank table data by given value
   * @param {String} name field title
   * @param {String} value field value to corressponding title
   */
  renderBankView = (name, value) => {
    return (
      <View style={styles.dataContainer}>
        <Text style={styles.titleText}>{name}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    )
  }

  /**
   * navigate to the DashboardScreen
   */
  onBackClicked = () => {
    if (this.props.appRating) Navigator.navigateAndReset(NavKeys.TAB)
    else {
      showRateAlert(this.setAppRating)
    }
  }

  /**
   * set app rating to true
   */
  setAppRating = () => {
    this.props.setAppRating(true)
    RateApp()
  }
}
DepositViewerScreen.propTypes = {
  getMasterBank: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  appRating: PropTypes.bool,
  setAppRating: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  appRating: state.user.appRating,
})

export const mapDispatchToProps = (dispatch) => ({
  getMasterBank: (successFn) => dispatch(UserActions.getMasterBank(successFn)),
  setAppRating: (data) => dispatch(UserActions.setAppRating(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositViewerScreen)
