import { put, call, select } from 'redux-saga/effects'
import UserActions from 'App/Stores/User/Actions'
import { ApiService } from 'App/Services/ApiService'
import CommonActions from 'App/Stores/Common/Actions'
import ApiEndPoints from 'App/Constants/ApiEndPoints'
import { showAlert, between } from 'App/Components/Utils/Functions'
import handleConnectivityStatus from 'App/Services/NetworkService'
import I18n from 'App/Localization/I18n'
import { getToken } from './UserSaga'

/* get bankaccounts call
 * @param {Object} data contains the request informations to hit API service call
 */
export function* getBanckAccountsList(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Show loader
  yield put(CommonActions.showOrHideLoader(true))
  const token = yield select(getToken)
  // Fetch user bank accounts list from an API
  const apiResponse = yield call(ApiService.getApi, ApiEndPoints.GET_BANK_ACCOUNTS, token)
  if (apiResponse.status === 200) {
    // Hide loader
    yield put(CommonActions.showOrHideLoader(false))
    // trigger success callback
    yield call(data.successFn, apiResponse.data.data)
    yield put(UserActions.bankAccountsSuccess(apiResponse.data.data))
  } else {
    // if status code is not 200 process login failure with message
    // Hide loader
    yield put(CommonActions.showOrHideLoader(false))
    // Error handling - trigger callback
    yield call(
      data.failureFn,
      apiResponse.data && apiResponse.data.message ? apiResponse.data.message : apiResponse.problem
    )
  }
}

/** transfer transaction progress
 * @param {Object} data contains the request informations to hit API service call
 */
export function* addBankAccount(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    yield put(CommonActions.showOrHideLoader(true))
    const token = yield select(getToken)
    // transfer balance api request
    const response = yield call(
      ApiService.postApi,
      ApiEndPoints.GET_BANK_ACCOUNTS + '/' + data.apiType,
      data.data,
      token
    )
    yield put(CommonActions.showOrHideLoader(false))

    if (between(response.status, 200, 204)) {
      yield call(data.successFn, response.data.data)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * process deposit
 * @param {Object} data contains the request informations to hit API service call
 */
export function* getMasterBank(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))

    const response = yield call(ApiService.getApi, ApiEndPoints.MASTER_BANKACCOUNT, token)
    yield put(CommonActions.showOrHideLoader(false))
    if (between(response.status, 200, 204)) {
      // Send call back
      yield call(data.successFn, response.data.data)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * validate iban number
 * @param {Object} data refers request data to trigger api call
 */
export function* validateIBAN(data) {
  const token = yield select(getToken)
  // Fetch transaction detail from an API
  yield put(CommonActions.showOrHideLoader(true))
  const response = yield call(ApiService.postApi, ApiEndPoints.CHECK_IBAN, data.ibanData, token)
  yield put(CommonActions.showOrHideLoader(false))
  if (between(response.status, 200, 204)) {
    // if status code is 200 process transaction detail with success data
    yield call(data.successFn, response.data.data)
  } else {
    // if status code is not 200 process transaction detail with failure message
    response && response.data && response.data.message
      ? showAlert(response.data.message)
      : response.message
      ? showAlert(response.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}
