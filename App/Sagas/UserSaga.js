import { put, call, all, select } from 'redux-saga/effects'
import { UserService } from 'App/Services/UserService'
import UserActions from 'App/Stores/User/Actions'
import { ApiService } from 'App/Services/ApiService'
import WalletActions from 'App/Stores/WalletBalance/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import ApiEndPoints from 'App/Constants/ApiEndPoints'
import { showAlert, between, showAlertWithBack } from 'App/Components/Utils/Functions'
import handleConnectivityStatus from 'App/Services/NetworkService'
import DefaultStrings from 'App/Constants/DefaultStrings'
import I18n from 'App/Localization/I18n'
import Checkpoints from 'App/Constants/Checkpoints'

// Parse token from store
export const getToken = (state) => state.user.token

/**
 * login call
 * @param {Object} data contains the request informations to hit API service call
 */
export function* userLogin(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Show loader
  yield put(CommonActions.showOrHideLoader(true))
  // Fetch user informations from an API
  // Hide loader
  const login = yield call(ApiService.postApi, ApiEndPoints.LOGIN, data.loginData)
  yield put(CommonActions.showOrHideLoader(false))
  if (login.status === 200) {
    // if login success, set token
    yield put(UserActions.setToken(login.data.token))
    // After login success navigate to dashboard
    yield Navigator.navigateAndReset(NavKeys.TAB)
  } else {
    // if status code is not 200 process login failure with message
    // Error handling - trigger callback
    yield call(
      data.failureFn,
      login.data && login.data.message ? login.data.message : login.problem
    )
  }
}

/**
 * Dashboard api request
 */
export function* getWalletBalance(data) {
  const token = yield select(getToken)
  yield put(CommonActions.showOrHideLoader(true))
  const [walletBalance, transactionList, currencyResponse, balanceResponse] = yield all([
    // Fetch wallet balance api request
    call(UserService.walletBalance, token),
    // Fetch transaction api  list request
    call(UserService.getTransactionList, token),

    call(ApiService.getApi, ApiEndPoints.CURRENT_CURRENCY, token),

    call(ApiService.getApi, ApiEndPoints.TOTAL_BALANCE, token),
  ])
  yield put(CommonActions.showOrHideLoader(false))
  if (
    between(walletBalance.status, 200, 204) &&
    between(transactionList.status, 200, 204) &&
    between(currencyResponse.status, 200, 204) &&
    between(balanceResponse.status, 200, 204)
  ) {
    // dispatch api success action
    yield put(
      WalletActions.walletBalanceSuccess(walletBalance.data.data, transactionList.data.data)
    )

    if (
      currencyResponse.data &&
      currencyResponse.data.data &&
      currencyResponse.data.data.USD &&
      currencyResponse.data.data.USD.BTC &&
      currencyResponse.data.data.USD.ETH &&
      currencyResponse.data.data.USD.DASH
    )
      yield put(UserActions.setCurrencyValue(currencyResponse.data.data.USD))
    if (
      currencyResponse.data &&
      currencyResponse.data.data &&
      currencyResponse.data.data.EUR &&
      currencyResponse.data.data.EUR.BTC &&
      currencyResponse.data.data.EUR.ETH &&
      currencyResponse.data.data.EUR.DASH
    )
      yield put(UserActions.setEuroCurrencyValue(currencyResponse.data.data.EUR))

    yield put(UserActions.setCurrencyExpiration(currencyResponse.data.data))

    yield put(UserActions.setTotalBalance(balanceResponse.data.data))
  } else {
    // dispatch api failure action
    yield put(WalletActions.walletBalanceFailure(walletBalance.data))
    walletBalance && walletBalance.data && walletBalance.data.message
      ? yield call(data.failureFn, walletBalance.data.message)
      : yield call(data.failureFn, I18n.t('TRY_AGAIN_LATER'))
  }
}

// Get profile information of the user
export function* getProfile(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    if (data.failureFn) yield call(data.failureFn, {})
    else showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Get auth token from store
  yield put(CommonActions.showOrHideLoader(true))
  const token = yield select(getToken)
  // Fetch user informations from an API
  const profileData = yield call(UserService.getProfile, token)
  yield put(CommonActions.showOrHideLoader(false))
  if (profileData.status === 200) {
    // if success handle navigation
    // After login success navigate to dashboard
    yield data.successFn && call(data.successFn)
    yield put(UserActions.setOnBoardingProfile(profileData.data.data))
    // navigate to screens baed on the checkpoint value
    switch (profileData.data.data.checkpoint) {
      case Checkpoints.POINT_ONE: // 1.Pre Register
        yield Navigator.navigateAndReset(NavKeys.SIGN_UP_ACCOUNT_PROGRESS)
        break
      case Checkpoints.POINT_TWO: // 2.Persional Info
        yield Navigator.navigateAndReset(NavKeys.ACCOUNT_TYPE_SELECTION)
        break
      case Checkpoints.POINT_THREE: // 3.SMS verification
        yield Navigator.navigateAndReset(NavKeys.PHONE_VALIDATION)
        break
      case Checkpoints.POINT_FOUR: // 4.Persional Doc
        yield Navigator.navigateAndReset(NavKeys.DOCUMENT_SELECTION)
        break
      case Checkpoints.POINT_FIVE: // 5.Businsess Info
        yield Navigator.navigateAndReset(NavKeys.BUSINESS_INFORMATION)
        break
      case Checkpoints.POINT_SIX: // 6.Business Doc
        yield Navigator.navigateAndReset(NavKeys.UPLOAD_BUSINESS_DOCUMENT)
        break
    }
  } else if (profileData.status === 401) {
    // if token exppired logout from app
    yield put({ type: DefaultStrings.LOG_OUT })
    Navigator.navigateAndReset(NavKeys.LOGIN)
  } else {
    // if status code is not 200 process failure with message
    // Error handling
    const Error =
      profileData && profileData.data && profileData.data.message
        ? profileData.data.message
        : I18n.t('TRY_AGAIN_LATER')
    if (data.failureFn) {
      yield call(data.failureFn, {})
    } else {
      showAlert(Error)
    }
  }
}

// Get profile Photo of the user
export function* getProfilePhoto(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Get auth token from store
  yield put(CommonActions.showOrHideLoader(true))
  const token = yield select(getToken)
  // Fetch user Photo from an API
  const response = yield call(ApiService.getApi, ApiEndPoints.PROFILE_PHOTO, token)
  yield put(CommonActions.showOrHideLoader(false))
  if (between(response.status, 200, 204)) {
    // if success handle
    yield call(data.successFn, response.data.data)
    yield put(UserActions.setProfilePhoto(response.data.data))
  } else if (response.status === 401) {
    // if token exppired logout from app
    yield put({ type: DefaultStrings.LOG_OUT })
    Navigator.navigateAndReset(NavKeys.LOGIN)
  } else {
    // if status code is not 200 process failure with message
    // Error handling
    response && response.data && response.data.message
      ? showAlert(response.data.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

// Upload profile Photo of the user
export function* uploadProfilePhoto(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Get auth token from store
  yield put(CommonActions.showOrHideLoader(true))
  const token = yield select(getToken)
  // Upload user Photo
  const response = yield call(ApiService.postApi, ApiEndPoints.PROFILE_PHOTO, data.data, token)
  yield put(CommonActions.showOrHideLoader(false))
  if (between(response.status, 200, 204)) {
    yield call(data.successFn)
  } else if (response.status === 401) {
    // if token exppired logout from app
    yield put({ type: DefaultStrings.LOG_OUT })
    Navigator.navigateAndReset(NavKeys.LOGIN)
  } else {
    // if status code is not 200 process failure with message
    // Error handling
    response && response.data && response.data.message
      ? showAlert(response.data.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

// change default fiat currency
export function* changeFiatCurrency(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Get auth token from store
  yield put(CommonActions.showOrHideLoader(true))
  const token = yield select(getToken)
  // Update  user default fiat currency
  const response = yield call(
    ApiService.postApi,
    ApiEndPoints.PROFILE_FIAT_CURRENCY,
    data.data,
    token
  )
  yield put(CommonActions.showOrHideLoader(false))
  if (between(response.status, 200, 204)) {
    yield call(data.successFn, response)
  } else if (response.status === 401) {
    // if token exppired logout from app
    yield put({ type: DefaultStrings.LOG_OUT })
    Navigator.navigateAndReset(NavKeys.LOGIN)
  } else {
    // if status code is not 200 process failure with message
    // Error handling
    response && response.data && response.data.message
      ? showAlert(response.data.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

// change default language
export function* changeLanguage(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Get auth token from store
  yield put(CommonActions.showOrHideLoader(true))
  const token = yield select(getToken)
  // update user default language
  const response = yield call(ApiService.postApi, ApiEndPoints.PROFILE_LANGUAGE, data.data, token)
  yield put(CommonActions.showOrHideLoader(false))
  if (between(response.status, 200, 204)) {
    yield call(data.successFn, response)
  } else if (response.status === 401) {
    // if token exppired logout from app
    yield put({ type: DefaultStrings.LOG_OUT })
    Navigator.navigateAndReset(NavKeys.LOGIN)
  } else {
    // if status code is not 200 process failure with message
    // Error handling
    response && response.data && response.data.message
      ? showAlert(response.data.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/** Get account balance and transaction Limit
 * @param {Object} coin contains the request informations to hit API service call
 */
export function* getBalanceAndLimit(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)
    // Show loader
    yield put(CommonActions.showOrHideLoader(true))
    const [balance, transactionLimit, commision] = yield all([
      // Fetch wallet balance api request
      call(ApiService.getApi, ApiEndPoints.BALANCE + '/' + data.coin, token),
      // Fetch transaction limit api list request
      call(ApiService.getApi, ApiEndPoints.LIMIT, token),
      // get commissions
      call(ApiService.getApi, ApiEndPoints.COMMISSTION, token),
    ])
    if (balance.status === 200 && transactionLimit.status === 200) {
      // Hide loader
      yield put(CommonActions.showOrHideLoader(false))
      // store data in reducers
      yield put(
        UserActions.setBalanceAndTransactionLimit(balance.data.data, transactionLimit.data.data)
      )
      yield put(UserActions.setCommissions(commision.data.data))
    } else {
      // if status code is not 200 process request failure with message
      // Hide loader
      yield put(CommonActions.showOrHideLoader(false))
      // Error handling - trigger callback
      if (data.failureFn)
        yield call(data.failureFn, balance && balance.data && balance.data.message)
    }
  } else {
    data.failureFn ? yield call(data.failureFn, '') : showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * Get commissions for available currency
 */
export function* getCommisions() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)
    // Show loader
    yield put(CommonActions.showOrHideLoader(true))
    // Fetch commission balance api request
    const commision = yield call(ApiService.getApi, ApiEndPoints.COMMISSTION, token)

    if (commision.status === 200) {
      // Hide loader
      yield put(CommonActions.showOrHideLoader(false))
      // store data in reducers
      yield put(UserActions.setCommissions(commision.data.data))
    } else {
      // if status code is not 200 process request failure with message
      // Hide loader
      yield put(CommonActions.showOrHideLoader(false))
      // Error handling - trigger callback
      commision && commision.data && commision.data.message
        ? showAlert(commision.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * get current Currency values
 */
export function* getCurrencyValues() {
  const token = yield select(getToken)
  // Fetch current Currency values from an API
  const apiResponse = yield call(ApiService.getApi, ApiEndPoints.CURRENT_CURRENCY, token)
  if (apiResponse.status === 200) {
    if (
      apiResponse.data &&
      apiResponse.data.data &&
      apiResponse.data.data.USD &&
      apiResponse.data.data.USD.BTC &&
      apiResponse.data.data.USD.ETH &&
      apiResponse.data.data.USD.DASH
    )
      yield put(UserActions.setCurrencyValue(apiResponse.data.data.USD))
    if (
      apiResponse.data &&
      apiResponse.data.data &&
      apiResponse.data.data.EUR &&
      apiResponse.data.data.EUR.BTC &&
      apiResponse.data.data.EUR.ETH &&
      apiResponse.data.data.EUR.DASH
    )
      yield put(UserActions.setEuroCurrencyValue(apiResponse.data.data.EUR))
    yield put(UserActions.setCurrencyExpiration(apiResponse.data.data))
  }
}

/**
 * get BitcoinBalance
 */
export function* getBitcoinBalance(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)
    yield put(CommonActions.showOrHideLoader(true))
    // Fetch current Currency values from an API
    const apiResponse = yield call(ApiService.getApi, ApiEndPoints.WALLET + data.coin, token)
    yield put(CommonActions.showOrHideLoader(false))
    if (between(apiResponse.status, 200, 204)) {
      yield call(data.successFn, apiResponse.data.data)
    } else {
      const error =
        apiResponse && apiResponse.data && apiResponse.data.message
          ? apiResponse.data.message
          : I18n.t('TRY_AGAIN_LATER')

      data.failureFn ? yield call(data.failureFn, error) : showAlert(error)
    }
  } else {
    data.failureFn
      ? yield call(data.failureFn, '')
      : showAlertWithBack(I18n.t('ERROR'), I18n.t('NETWORK_ERROR'))
  }
}

/**
 * get Total Balance
 */
export function* getTotalBalance() {
  const token = yield select(getToken)
  // Fetch transaction detail from an API
  const response = yield call(ApiService.getApi, ApiEndPoints.TOTAL_BALANCE, token)
  if (between(response.status, 200, 204)) {
    // if status code is 200 process transaction detail with success data
    yield put(UserActions.setTotalBalance(response.data.data))
  } else {
    // if status code is not 200 process transaction detail with failure message
    response && response.data && response.data.message
      ? showAlert(response.data.message)
      : response.message
      ? showAlert(response.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}
