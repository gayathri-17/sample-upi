import 'intl'
import 'intl/locale-data/jsonp/en'
import React from 'react'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Colors from 'App/Theme/Colors'
import { Alert, Linking } from 'react-native'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import styles from 'App/Containers/Send/SendEnterAmountScreen/SendEnterAmountScreenStyle'
import I18n from 'App/Localization/I18n'
import CurrencyType from '../../Constants/CurrencyType'
import ApiErrorCodes from '../../Constants/ApiErrorCodes'
import Rate, { AndroidMarket } from 'react-native-rate'
import RatingConstants from 'App/Constants/RatingConstants'
/**
 *  common functions used by any containers
 */

/**
 * Password validation function
 * @param {String} password require password for validation function
 * @returns {Boolean} returns true if the param meets below conditions, otherwise false
 * Password must atleast have minimum 8 chars, 1 upper case, 1 lower case, 1 number and 1 special char
 */
export function isValidPassword(password) {
  return /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(
    password
  )
}

/**
 * Get user full name from user object
 * @param {object} onBoardingProfile LogedIn user data
 * @retun userFullName
 */
export function getUserFullName(onBoardingProfile) {
  let firstName = onBoardingProfile.name
    ? onBoardingProfile.name
    : onBoardingProfile.firstname
    ? onBoardingProfile.firstname
    : ''
  let lastName = onBoardingProfile.lastName
    ? onBoardingProfile.lastName
    : onBoardingProfile.lastname
    ? onBoardingProfile.lastname
    : ''
  return firstName + ' ' + lastName
}
/**
 * Get user address from user object
 * @param {object} onBoardingProfile LogedIn user data
 * @retun AddressInfo
 */
export function getUserAddress(onBoardingProfile) {
  let city = onBoardingProfile.city ? onBoardingProfile.city : ''
  let country = onBoardingProfile.country ? onBoardingProfile.country : ''
  return city + ', ' + country
}
/**
 *  Rename each country object keys
 * @param {Array} listObject  Array of objects to rename key
 */
export function renameObjectKey(listObject) {
  listObject.map((o) => {
    Object.assign(o, { label: o.nicename, value: o.iso3 })
    delete o.iso3
    delete o.nicename
  })
  return listObject
}

/**
 *  Rename each province object keys
 * @param {Array} listObject  Array of objects to rename key
 */
export function renameProvinceObjectKey(listObject) {
  listObject.map((o) => {
    Object.assign(o, { label: o.exonimo_en, value: o.code })
    delete o.code
    delete o.exonimo_en
  })
  return listObject
}

/**
 *  Rename each businesscategory object keys
 * @param {Array} listObject  Array of objects to rename key
 */
export function renameBusinessCategory(listObject) {
  listObject.map((o) => {
    Object.assign(o, { label: o.category, value: o.id })
    delete o.id
    delete o.category
  })
  return listObject
}

/**
 *  Rename each businessSubcategory object keys
 * @param {Array} listObject  Array of objects to rename key
 */
export function renameBusinessSubCategory(listObject) {
  listObject.map((o) => {
    Object.assign(o, {
      label: o.subcategory ? o.subcategory : o.label,
      value: o.id ? o.id : o.value,
    })
    delete (o.id ? o.id : o.value)
    delete (o.subcategory ? o.subcategory : o.label)
  })
  return listObject
}

/**
 *  Rename each province object keys
 * @param {Array} listObject  Array of objects to rename key
 */
export function renameDocumentObjectKey(listObject) {
  listObject.map((o) => {
    Object.assign(o, { id: o.id, label: o.label, value: o.type })
  })
  return listObject
}

/**
 * Check is Object contain key value
 * @param {Object} attr Object of attribute
 * @param {String} key to check in object
 * @return value of the Key
 */
export function getValueByAttribute(attr, key) {
  return attr[key] || ''
}

/**
 * get color based on currency
 * @param {String} currency requires currency parameter
 * @returns {String} color code based on currency
 */
export function getCurrencyColor(currency) {
  switch (currency) {
    case CurrencyType.USD:
      return Colors.darkBlue
    case CurrencyType.EURO:
    case CurrencyType.EURO_NAME:
      return Colors.green
    case CurrencyType.BITCOIN:
      return Colors.gradientRed
    case CurrencyType.ETH:
      return Colors.ethBlue
    case CurrencyType.DASH:
      return Colors.dashBlue
  }
}

/**
 * get color gradient based on currency
 * @param {String} currency requires currency parameter
 * @returns {String} color code based on currency
 */
export function getCurrencyColorGradient(currency) {
  switch (currency) {
    case DefaultStrings.TYPE_USD:
      return Colors.darkBlue
    case DefaultStrings.TYPE_EURO:
      return Colors.green
    case DefaultStrings.TYPE_BTC:
      return Colors.bitcoinGradientStart
    case DefaultStrings.TYPE_ETH:
      return Colors.ethGradientStart
    case DefaultStrings.TYPE_DASH:
      return Colors.dashGradientStart
  }
}

/**
 * get image based on the currency
 * @param {String} currency Type (BITCOIN, DASH, ETH, USD, EURO)
 * @returns {View} return rendered based on the text
 */
export function getImage(currency) {
  switch (currency) {
    case CurrencyType.ETH:
      return <ETHLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    case CurrencyType.USD:
      return <USDLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    case CurrencyType.BITCOIN:
      return <BitcoinLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    case CurrencyType.DASH:
      return <DashLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
    case CurrencyType.EURO:
    case CurrencyType.EURO_NAME:
      return <EuroLogo width={styles.imageStyle.width} height={styles.imageStyle.height} />
  }
}

/**
 * get currency symbol based on currency
 * @param {String} currency Type ( USD, EURO)
 * @returns {String} return symbol based on currency
 */
export function getCurrencySymbol(currency) {
  switch (currency) {
    case CurrencyType.USD:
      return '$'
    case CurrencyType.EURO:
    case CurrencyType.EURO_NAME:
      return '€'
    case CurrencyType.BITCOIN:
      return I18n.t('TYPE_BTC')
    case CurrencyType.ETH:
      return I18n.t('TYPE_ETH')
    case CurrencyType.DASH:
      return I18n.t('TYPE_DASH')
    default:
      return '$'
  }
}

/**
 * get fiat currency symbol based on currency
 * @param {String} currency Type ( USD, EURO)
 * @returns {String} return symbol based on currency
 */
export function getFiatCurrencySymbol(currency) {
  switch (currency) {
    case CurrencyType.USD:
      return '$'
    case CurrencyType.EURO:
    case CurrencyType.EURO_NAME:
      return '€'
    default:
      return '$'
  }
}

/**
 * get currency wallet name based on currency
 * @param {String} currency Type ( USD, EURO)
 * @returns {String} return wallet name (USD wallet, EUR Wallet)
 */
export function getWalletName(currency) {
  switch (currency) {
    case DefaultStrings.TYPE_USD:
      return I18n.t('USD_WALLET')
    case DefaultStrings.TYPE_EURO:
      return I18n.t('EURO_WALLET')
    default:
      return currency
  }
}

/**
 * Show alert message api for faiure
 */
export function showAlert(err) {
  Alert.alert(I18n.t('ERROR'), err, [
    {
      text: I18n.t('OK'),
      style: 'ok',
    },
  ])
}

/**
 * Show alert message for validation
 */
export function showValidatonAlert(message) {
  Alert.alert(I18n.t('HEADER'), message, [
    {
      text: I18n.t('OK'),
      style: 'ok',
    },
  ])
}

/**
 * Alert for transaction
 */
export function transactionAlert(header, message) {
  Alert.alert(
    header,
    message,
    [
      {
        text: 'OK',
        onPress: function() {
          Navigator.navigateAndReset(NavKeys.TAB)
        },
      },
    ], // I want this function to make Saga continue
    { cancelable: false }
  )
}

/**
 * Alert for transaction cancel
 */
export function showAlertWithBack(header, message) {
  Alert.alert(
    header,
    message,
    [
      {
        text: 'OK',
        onPress: function() {
          Navigator.goBack()
        },
      },
    ], // I want this function to make Saga continue
    { cancelable: false }
  )
}

/**
 * Alert for businessDocument
 */
export function businessDocAlert(header, message) {
  Alert.alert(
    header,
    message,
    [
      {
        text: 'OK',
        style: 'ok',
      },
    ], // I want this function to make Saga continue
    { cancelable: false }
  )
}

/**
 * group an arry by given value
 * @param {Array} array
 * @param {Object} key
 */
export function groupBy(array, key) {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    ;(result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue)
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result
  }, {}) // empty object is the initial value for result object
}

/**
 * check the given number is between
 *
 */
export function between(value, from, to) {
  return value >= from && value <= to
}
/* get acronym for name
 * @param {String} name refers name to process acronym
 * @returns {String} returns acronym for string
 */
export function getAcronymForName(name) {
  var matches = name.match(/\b(\w)/g)
  var acronym = matches.join('')
  return acronym.toUpperCase().substring(0, 2)
}

/**
 *  Rename each country object keys for contact
 * @param {Array} listObject  Array of objects to rename key
 */
export function renameContactObjectKey(listObject) {
  listObject.map((o) => {
    Object.assign(o, { label: o.description + '(' + o.email + ')', value: o.email })
    delete o.email
    delete o.description
  })
  return listObject
}

/**
 * get gradient colors array by given Inpput screen type
 * @param {String} screenType
 */
export function getGradientArrayByType(screenType) {
  switch (screenType) {
    case DefaultStrings.TYPE_BTC:
      return [Colors.bitcoinGradientStart, Colors.gradientRed]
    case DefaultStrings.TYPE_ETH:
      return [Colors.ethGradientStart, Colors.ethGradientEnd]
    case DefaultStrings.TYPE_DASH:
      return [Colors.dashGradientStart, Colors.dashGradientEnd]
    case DefaultStrings.TYPE_EURO:
      return [Colors.euroGradientStart, Colors.euroGradientEnd]
    case DefaultStrings.TYPE_USD:
      return [Colors.usdGradientStart, Colors.usdGradientEnd]
  }
}

/**
 * get keyboard type selected color
 * @param {String} screenType
 */
export function getInputColor(screenType) {
  switch (screenType) {
    case CurrencyType.BITCOIN:
      return Colors.flamePea
    case CurrencyType.ETH:
      return Colors.endeavour
    case CurrencyType.DASH:
      return Colors.cerulean
  }
}

/**
 * get keyboard type selected color
 * @param {String} screenType
 */
export function getInputTextColor(screenType) {
  switch (screenType) {
    case DefaultStrings.TYPE_BTC:
      return Colors.btcInput
    case DefaultStrings.TYPE_ETH:
      return Colors.ethBlue
    case DefaultStrings.TYPE_DASH:
      return Colors.dashBlue
  }
}

/**
 * convert seconds to miniutes
 * @param {String} seconds to get data
 */
export function getMinutes(seconds) {
  const format = (val) => `0${Math.floor(val)}`.slice(-2)
  // const hours = seconds / 3600
  const minutes = (seconds % 3600) / 60

  return [minutes, seconds % 60].map(format).join(':')
}

/**
 * open mail Application present in user mobile
 * @param {String} email email address whoom you have to send
 * @param {String} subject sublect of the email
 * @param {String} description description of the email content
 * @param {String} extraDesc extra description of the content
 */
export function openEmail(email, subject, description, extraDesc) {
  Linking.openURL('mailto:' + email + '?subject=' + subject + '&body=' + description + extraDesc)
}

/**
 * number formattor based on user currency (USD, EUR)
 * @param {String} num user given values
 * @param {String} format formattor type
 */
export function currencyFormat(num, format) {
  if (num === 0 || num === '') return '0'
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: format,
    minimumFractionDigits: 2,
  })
  return formatter.format(num).replace('$', '')
}

/**
 * number formattor based on user currency (USD, EUR)
 * @param {String} num user given values
 * @returns rounded crypto value
 */
export function cryptocurrencyFormat(num) {
  return num.toFixed(8)
}

/**
 * return modified fontSize when length of the line is greater than container width
 * @param {String} text user given values
 * @param {number} width width of the container
 * @param {number} fontSize initial font size
 * @param {number} constant font character constant
 */
export function getFontSize(text = '0', width, fontSize, constant) {
  let CPL = Math.floor(width / (fontSize / constant))
  let numberOfLines = text.length / CPL
  if (numberOfLines > 1) {
    return getFontSize(text, width, fontSize - 0.5, constant)
  } else {
    return fontSize
  }
}

/**
 * show Error base on Code
 * @param {string} code error code
 * @param {string} message default error message
 */
export function showErrorByCode(code, message) {
  switch (code) {
    case ApiErrorCodes.TFA_INACTIVE:
      showAlertWithBack(I18n.t('ERROR'), I18n.t('TFA_INACTIVE'))
      break
    case ApiErrorCodes.COMPLETE_PROFILE:
      showAlertWithBack(I18n.t('ERROR'), I18n.t('TIER_INVALID'))
      break
    default:
      showAlertWithBack(I18n.t('HEADER'), message || I18n.t('TRY_AGAIN_LATER'))
      break
  }
}

/**
 * get error string based on code
 * @param {string} code error code
 * @param {string} message default error message
 * @returns {String} response message
 */
export function getErrorByCode(code, message) {
  switch (code) {
    case ApiErrorCodes.TFA_INACTIVE:
      return I18n.t('TFA_INACTIVE')
    case ApiErrorCodes.COMPLETE_PROFILE:
      return I18n.t('TIER_INVALID')
    default:
      return message || I18n.t('TRY_AGAIN_LATER')
  }
}

/**
 * Limit percentge round off
 * @param {string} num limit percentage
 * @returns {Number} rounded limit
 */
export function getLimitRoundOff(num) {
  return parseFloat(num).toFixed(1)
}

/**
 * Alert message with custom onpress function
 */
export function AlertMessage(header, message, onPressFunction) {
  Alert.alert(
    header,
    message,
    [
      {
        text: I18n.t('CANCEL'),
        style: 'cancel',
      },
      {
        text: I18n.t('OK'),
        onPress: onPressFunction,
      },
    ],
    { cancelable: true }
  )
}

// show App rating alert for tate and review our app
export function showRateAlert(onPressSuccessFunction) {
  Alert.alert(
    I18n.t('HEADER'),
    I18n.t('RATE_APP_CONTENT'),
    [
      {
        text: I18n.t('LATER'),
        style: 'cancel',
        onPress: () => Navigator.navigateAndReset(NavKeys.TAB),
      },
      {
        text: I18n.t('RATE_NOW'),
        onPress: onPressSuccessFunction,
      },
    ],
    { cancelable: false }
  )
}

// rate app function
export function RateApp() {
  const options = {
    AppleAppID: RatingConstants.AppleAppID,
    GooglePackageName: RatingConstants.ANDROID_PACKAGE_NAME,
    AmazonPackageName: RatingConstants.ANDROID_PACKAGE_NAME,
    OtherAndroidURL: RatingConstants.WEB_URL,
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
    inAppDelay: 5.0,
    openAppStoreIfInAppFails: true,
    fallbackPlatformURL: RatingConstants.WEB_URL,
  }
  Rate.rate(options, (success) => {
    Navigator.navigateAndReset(NavKeys.TAB)
  })
}
