import React from 'react'
import { store } from 'App/App'
import 'intl'
import 'intl/locale-data/jsonp/en'
import CurrencyType from '../../Constants/CurrencyType'
import CurrencySeperatorType from 'App/Constants/CurrencySeperatorType'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import { groupBy } from 'App/Components/Utils/Functions'
import { NativeModules } from 'react-native'

/**
 * common function for currency validation based on the user's default currency
 */

// <---Common--->
/**
 * number formattor based on user currency (USD, EUR)
 * @param {String} num user given values
 * @param {String} format formattor type
 */
export function currencyFormat(num, format) {
  format = format === CurrencyType.EURO_NAME ? CurrencySeperatorType.EURO : format
  const checkFormat = format === CurrencySeperatorType.USD || format === CurrencySeperatorType.EURO
  const actualFormat = checkFormat ? format : store.getState().user.defaultCurrency
  if (num === 0 || num === '') num = '0'
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: actualFormat,
    minimumFractionDigits: 2,
  })
  return formatter.format(num).replace(/^(\D+)/, '$1 ')
}

/**
 * get user default currency
 */
export function getDefaultCurrency() {
  return store.getState().user.defaultCurrency
}
// <----Dashboard--->
/**
 * get wallet balance based on currency type
 * @param {String} type currency type
 */
export function getDashboardBalanceByType(type) {
  const walletBalance = store.getState().user.getTotalBalance
  const defaultCurrency = store.getState().user.defaultCurrency
  if (!walletBalance) return '0'
  switch (type) {
    case CurrencyType.ALL:
      return currencyFormat(
        defaultCurrency === CurrencySeperatorType.USD
          ? walletBalance.total.USD
          : walletBalance.total.EUR,
        defaultCurrency
      )
        .replace('$', '')
        .replace('€', '')
    case CurrencyType.USD:
      return currencyFormat(walletBalance.USD, CurrencySeperatorType.USD).replace('$', '')
    case CurrencyType.BITCOIN:
      return cryptocurrencyFormat(parseFloat(walletBalance.BTC))
    case CurrencyType.DASH:
      return cryptocurrencyFormat(parseFloat(walletBalance.DASH))
    case CurrencyType.ETH:
      return cryptocurrencyFormat(parseFloat(walletBalance.ETH))
    case CurrencyType.EURO:
    case CurrencyType.EURO_NAME:
      return currencyFormat(walletBalance.EUR, CurrencySeperatorType.EURO).replace('€', '')
  }
}

/**
 * get defaultCurrency logo by currency type
 * @param {*} style logo style
 */
export function getDashboardDefaultLogo(style) {
  const defaultCurrency = store.getState().user.defaultCurrency
  return defaultCurrency === CurrencySeperatorType.USD ? (
    <USDLogo width={style.width} height={style.height} />
  ) : (
    <EuroLogo width={style.width} height={style.height} />
  )
}

/**
 * get transaction total based on user selectedCurrency type
 * @param {bool} isCurrency need extension of the currency name
 * @param {*} transactionItem current transaction item
 */
export function getTransactionTotal(isCurrency, transactionItem) {
  const defaultCurrency = store.getState().user.defaultCurrency
  return (
    currencyFormat(
      defaultCurrency === CurrencyType.USD ? transactionItem.total.USD : transactionItem.total.EUR,
      defaultCurrency
    ) +
    ' ' +
    (isCurrency ? defaultCurrency : '')
  )
}

// <-----Deposit----->
/**
 * merge crypto balance data by their currency type
 * @param {*} data cryptoBalance data
 * @param {String} type Crypto Type
 */
export function getMergedCryptoBalanceByType(data, type) {
  const currencyList = getCurrencyListByType(type)
  const mergedData = data.map((balanceObj) => {
    const temp = currencyList.find((currentObj) => currentObj.uuid === balanceObj.uuid)
    return {
      ...balanceObj,
      balance: temp ? temp.balance : 0,
      fiatBalance: getFiatBalanceByDefaultCurrency(temp.fiatBalances),
      fiatBalances: temp.fiatBalances,
    }
  })
  const groupedData = groupBy(mergedData, 'type')
  return { groupedData: groupedData, mergedData: mergedData }
}

/**
 * get wallet balance list by type
 * @param {String} type Crypto Type
 */
export function getCurrencyListByType(type) {
  switch (type) {
    case CurrencyType.BITCOIN:
      return store.getState().wallet.getWalletBalance.BTC
    case CurrencyType.ETH:
      return store.getState().wallet.getWalletBalance.ETH
    case CurrencyType.DASH:
      return store.getState().wallet.getWalletBalance.DASH
  }
}

/**
 * get fiat balance based on user selected Default Currency
 * @param {*} fiatBalance wallet fiat balance
 */
export function getFiatBalanceByDefaultCurrency(fiatBalance) {
  const defaultCurrency = store.getState().user.defaultCurrency
  if (!fiatBalance) return currencyFormat('0', defaultCurrency)
  else if (defaultCurrency === CurrencySeperatorType.USD)
    return currencyFormat(fiatBalance.USD, CurrencySeperatorType.USD) + ' ' + defaultCurrency
  else return currencyFormat(fiatBalance.EUR, CurrencySeperatorType.EURO) + ' ' + defaultCurrency
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
 * number formattor based on user currency (USD, EUR)
 * @param {String} num user given values
 * @param {String} format formattor type
 */
export function currencyFormatWithoutSymbol(num, format) {
  return currencyFormat(num, format)
    .replace('$', '')
    .replace('€', '')
}

// <--------Limit screen------->
/**
 * get limits based on user selected  currency
 */
export function getLimits() {
  const defaultCurrency = store.getState().user.defaultCurrency
  return defaultCurrency === CurrencyType.USD
    ? store.getState().user.transactionLimit.USD
    : store.getState().user.transactionLimit.EUR
}

// <---------Widget------->
/**
 * update the Widget based on the default value
 * @param {*} usdValue crypto rate based on the USD data
 * @param {*} euroValue crypto rate based on the USD data
 */
export function updateWidget(usdValue, euroValue) {
  let value = getDefaultCurrency() === CurrencyType.USD ? usdValue : euroValue

  const btcLastPrice = parseFloat(value.BTC.last_price)
  const btcBase = parseFloat(value.BTC.base)

  const dashLastPrice = parseFloat(value.DASH.last_price)
  const dashBase = parseFloat(value.DASH.base)

  const ethLastPrice = parseFloat(value.ETH.last_price)
  const ethBase = parseFloat(value.ETH.base)

  const widgetData = {
    BTC: {
      amount: currencyFormat(parseFloat(value.BTC.base)),
      percentage: ratePercentageCalculation(btcLastPrice, btcBase),
      changedAmount: currencyFormat(btcBase - btcLastPrice),
      isIncrease: getRateIncreaseType(btcBase, btcLastPrice),
    },
    DASH: {
      amount: currencyFormat(parseFloat(value.DASH.base)),
      percentage: ratePercentageCalculation(dashLastPrice, dashBase),
      changedAmount: currencyFormat(dashBase - dashLastPrice),
      isIncrease: getRateIncreaseType(dashBase, dashLastPrice),
    },
    ETH: {
      amount: currencyFormat(parseFloat(value.ETH.base)),
      percentage: ratePercentageCalculation(ethLastPrice, ethBase),
      changedAmount: currencyFormat(ethBase - ethLastPrice),
      isIncrease: getRateIncreaseType(ethBase, ethLastPrice),
    },
  }
  NativeModules.SharedStorage.set(JSON.stringify({ widgetData }))
}

/**
 * find weter the value increase or not
 * @param {float} baseValue current value
 * @param {float} lastValue previous changed value
 * @returns {number} 1: value Increased, 2: value Decreased, 3: value not change
 */
export function getRateIncreaseType(baseValue, lastValue) {
  return baseValue > lastValue ? 1 : baseValue < lastValue ? 2 : 3
}

/**
 * calculate increase or decreased percentage of the currency rate
 * @param {float} lastValue previous changed value
 * @param {float} currentValue current value
 */
export function ratePercentageCalculation(lastValue, currentValue) {
  return (((currentValue - lastValue) / lastValue) * 100).toFixed(2) + ' %'
}
