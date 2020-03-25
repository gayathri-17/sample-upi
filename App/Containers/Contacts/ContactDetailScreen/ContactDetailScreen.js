import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import styles from './ContactDetailScreenStyle'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import UserActions from 'App/Stores/User/Actions'
import NavKeys from 'App/Constants/NavKeys'
import Navigator from 'App/Services/NavigationService'
import handleConnectivityStatus from 'App/Services/NetworkService'
import Button from 'App/Components/Button/Button'
import I18n from 'App/Localization/I18n'
import { getAcronymForName, showAlert } from 'App/Components/Utils/Functions'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import SvgIcon from 'App/Components/SvgIcon/SvgIcon'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import USDLogoDisable from 'App/Assets/Images/Svg/USDLogoDisable'
import BitcoinLogoDisable from 'App/Assets/Images/Svg/BitcoinLogoDisable'
import DashLogoDisable from 'App/Assets/Images/Svg/DashLogoDisable'
import ETHLogoDisable from 'App/Assets/Images/Svg/ETHLogoDisable'
import EuroLogoDisable from 'App/Assets/Images/Svg/EuroLogoDisable'
import CurrencyType from 'App/Constants/CurrencyType'

/**
 * User can view their detail of contact
 */
export class ContactDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    const contact = this.props.navigation.state.params.contact
    this.state = {
      selectedContact: this.props.navigation.state.params.contact,
      name: contact.description,
      email: contact.email,
      firstName: contact.description.substring(0, contact.description.lastIndexOf(' ')),
      lastName: contact.description.substring(contact.description.lastIndexOf(' ') + 1),
      curency: contact.currency,
      address: contact.address,
      isFiat: contact.currency === CurrencyType.USD || contact.currency === CurrencyType.EURO,
    }
  }

  render() {
    const { firstName, lastName, name, curency, email, address, isFiat } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.rowStyle}>
            <View style={styles.circleStyle}>
              <Text testID={'description'} style={styles.acronymTextStyle}>
                {getAcronymForName(name)}
              </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.firstNameStyle}>{firstName} </Text>
              <Text style={styles.lastNameStyle}>{lastName}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editContactView}>
            <SvgIcon
              xml={CommonIcons.edit}
              width={styles.editContactView.width}
              height={styles.editContactView.height}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          {/* showing Name  */}
          {this.getNameContainer(I18n.t('NAME'), name)}
          {/* currency selection */}
          <View style={[styles.rowStyle, styles.marginForView]}>
            <Text style={styles.headerNameContainer}>{I18n.t('CURRENCY')}</Text>
            <View style={styles.currencyView}>
              <TouchableOpacity style={styles.currencyContainer}>
                {curency === DefaultStrings.TYPE_EURO || curency === DefaultStrings.TYPE_EUR ? (
                  <EuroLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <EuroLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyContainer}>
                {curency === DefaultStrings.TYPE_USD ? (
                  <USDLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <USDLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.currencyContainer}>
                {curency === DefaultStrings.TYPE_BTC ? (
                  <BitcoinLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <BitcoinLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.currencyContainer}>
                {curency === DefaultStrings.TYPE_ETH ? (
                  <ETHLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <ETHLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.currencyContainer}>
                {curency === DefaultStrings.TYPE_DASH ? (
                  <DashLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <DashLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* showing address  */}
          {!isFiat && this.getNameContainer(curency + ' ' + I18n.t('ADDRESS'), address)}
          {/* showing email  */}
          {this.getNameContainer(I18n.t('CONTACT_EMAIL'), email)}
        </View>
        <View style={[styles.marginForView, styles.buttonContainer]}>
          {!isFiat && (
            <Button
              style={styles.buttonStyle}
              text={I18n.t('CONTACT_REQUEST')}
              withShadow={false}
              withBorder={true}
              withBg={false}
              onClick={this.contactRequest}
            />
          )}
          <Button
            style={styles.buttonStyle}
            text={I18n.t('CONTACT_SEND')}
            withShadow={false}
            withBg={true}
            onClick={this.contactSend}
          />
        </View>
      </SafeAreaView>
    )
  }

  /**
   * navigate to deposit for fiat currencies
   */
  contactRequest = () => {
    Navigator.navigate(NavKeys.BITCOIN_WALLET_SCREEN, {
      selectedType: DefaultStrings.REQUEST_TO_CONTACT,
      screenType: this.state.curency,
      contact: this.state.selectedContact,
    })
  }

  /**
   * navigate to send based on selected currency
   */
  contactSend = () => {
    const { selectedContact, isFiat, curency } = this.state
    if (!handleConnectivityStatus) {
      showAlert(I18n.t('NETWORK_ERROR'))
      return
    }
    // navigate to fiat amount detail if selected currency is fiat
    if (isFiat) {
      this.props.setSelectedBank({
        id_account: selectedContact.id,
        to: selectedContact.description,
        type: DefaultStrings.TYPE_CONTACT,
        currency: curency,
      })
      Navigator.navigate(NavKeys.SEND_ENTER_AMOUNT_DETAIL, {
        currencyType: this.state.curency,
      })
      // navigate to crypto amount detail if selected currency is crypto
    } else {
      Navigator.navigate(NavKeys.CRYPTO_WALLET_LIST, {
        currencyType: curency,
        currencyName: curency,
        contact: selectedContact,
      })
    }
  }

  /**
   * get name container
   * @param {String} header refers header text
   * @param {String} value refers value text
   */
  getNameContainer = (header, value) => {
    return (
      <View style={styles.marginForView}>
        <Text style={styles.headerNameContainer}>{header}</Text>
        <Text style={styles.valueNameContainer}>{value}</Text>
      </View>
    )
  }
}

ContactDetailScreen.propTypes = {
  getContactList: PropTypes.func,
  setSelectedBank: PropTypes.func,
  navigation: PropTypes.object,
}

export const mapStateToProps = (state) => ({})

export const mapDispatchToProps = (dispatch) => ({
  setSelectedBank: (bankData) => dispatch(UserActions.setSelectedBank(bankData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetailScreen)
