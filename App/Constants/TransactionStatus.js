/**
 * This class contains the constant values transaction status.
 */
import I18n from 'App/Localization/I18n.js'
import { Platform } from 'react-native'

export const TransactionStatus = Object.freeze({
  ALL: 0,
  APPROVED: 1,
  PENDING: 2,
  REJECTED: 3,
  REFUNDED: 4,
  MINING: 5,
  MINED: 6,
})

// crypto transfer
export const cryptoStatus = Object.freeze({
  0: 0,
  1: 1,
  5: 2,
  6: 3,
  3: 4,
  2: 5,
})

export const Months = Object.freeze({
  1: I18n.t('JANUARY'),
  2: I18n.t('FEBRUARY'),
  3: I18n.t('MARCH'),
  4: I18n.t('APRIL'),
  5: I18n.t('MAY'),
  6: I18n.t('JUNE'),
  7: I18n.t('JULY'),
  8: I18n.t('AUGUST'),
  9: I18n.t('SEPTEMBER'),
  10: I18n.t('OCTOBBR'),
  11: I18n.t('NOVEMBER'),
  12: I18n.t('DECEMBER'),
})

export const TABS = {
  TAB_DASHBOARD: 'TAB_DASHBOARD',
  TAB_SEND: 'TAB_SEND',
  TAB_DEPOSIT: 'TAB_DEPOSIT',
  TAB_BUY_SELL: 'TAB_BUY_SELL',
  TAB_WALLETS: 'TAB_WALLETS',
  TAB_CONTACTS: 'TAB_CONTACTS',
  TAB_STATEMENTS: 'TAB_STATEMENTS',
  TAB_SETTINGS: 'TAB_SETTINGS',
  TAB_REFERRAL: 'TAB_REFERRAL',
}

export const GOOGLE_AUTH_APP_URL = {
  APP_STORE_URL:
    Platform.OS === 'android'
      ? 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
      : 'https://apps.apple.com/in/app/google-authenticator/id388497605',
}
