/**
 * Initial states for user.
 *
 */
export const INITIAL_STATE = {
  token: '',
  onBoardingProfile: {
    firstname: '',
    lastname: '',
    gender: '',
    dob: '',
    phonecode: '',
    phonenumber: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    documentType: '',
    documentNumber: '',
    userType: '',
  },
  profilePhoto: null,
  language: 'eng',
  defaultCurrency: 'USD',
  balanceBasedOnCoinSelected: '',
  transactionLimit: {
    USD: {
      deposit: { total: 0, available: 0 },
      withdraw: { total: 0, available: 0 },
      fiat_transfer: { total: 0, available: 0 },
      buy: {
        total: 0,
        available: 0,
        detail: {
          ETH: { available: 0, total: 0 },
          DASH: { available: 0, total: 0 },
          BTC: { available: 0, total: 0 },
        },
      },
      sell: {
        total: 0,
        available: 0,
        detail: {
          ETH: { available: 0, total: 0 },
          DASH: { available: 0, total: 0 },
          BTC: { available: 0, total: 0 },
        },
      },
      transfer_external: {
        total: 0,
        available: 0,
        detail: {
          ETH: { available: 0, total: 0 },
          DASH: { available: 0, total: 0 },
          BTC: { available: 0, total: 0 },
        },
      },
      transfer_internal: { total: 0, available: 0 },
    },
    EUR: {
      deposit: { total: 0, available: 0 },
      withdraw: { total: 0, available: 0 },
      fiat_transfer: { total: 0, available: 0 },
      buy: {
        total: 0,
        available: 0,
        detail: {
          ETH: { available: 0, total: 0 },
          DASH: { available: 0, total: 0 },
          BTC: { available: 0, total: 0 },
        },
      },
      sell: {
        total: 0,
        available: 0,
        detail: {
          ETH: { available: 0, total: 0 },
          DASH: { available: 0, total: 0 },
          BTC: { available: 0, total: 0 },
        },
      },
      transfer_external: {
        total: 0,
        available: 0,
        detail: {
          ETH: { available: 0, total: 0 },
          DASH: { available: 0, total: 0 },
          BTC: { available: 0, total: 0 },
        },
      },
      transfer_internal: { total: 0, available: 0 },
    },
  },
  commissions: {},
  transfer: {},
  selectedBank: {
    uuid: '',
    bankName: '',
  },
  transferTransactionSuccess: {},

  // Current ETH,DASH,BTC value in USD
  currentCurrency: {
    ETH: {
      price: 0,
      last_price: 0,
      buy: 0,
      sale: 0,
      base: 0,
    },
    DASH: {
      price: 0,
      last_price: 0,
      buy: 0,
      sale: 0,
      base: 0,
    },
    BTC: {
      price: 0,
      last_price: 0,
      buy: 0,
      sale: 0,
      base: 0,
    },
  },
  euroCurrencyValue: {},

  // bank Accounts
  bankAccounts: [],

  // transaction list
  transactionList: [],

  // total amount balance
  getTotalBalance: {
    total: { USD: 0, EUR: 0 },
    ETH: 0,
    DASH: 0,
    BTC: 0,
    USD: 0,
    EUR: 0,
  },
}
