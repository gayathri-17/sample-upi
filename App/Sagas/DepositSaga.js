import { put, call, select } from 'redux-saga/effects'
import { ApiService } from 'App/Services/ApiService'
import CommonActions from 'App/Stores/Common/Actions'
import ApiEndPoints from 'App/Constants/ApiEndPoints'
import { showAlert, between, showErrorByCode } from 'App/Components/Utils/Functions'
import handleConnectivityStatus from 'App/Services/NetworkService'
import I18n from 'App/Localization/I18n'
import { getToken } from './UserSaga'

/**
 * process deposit
 * @param {Object} data contains the request informations to hit API service call
 */
export function* processDeposit(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(ApiService.postApi, ApiEndPoints.DEPOSIT, data.depositData, token)
    yield put(CommonActions.showOrHideLoader(false))
    if (between(response.status, 200, 204)) {
      // Send call back
      yield call(data.successFn, response.data.data)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      response && response.data
        ? showErrorByCode(response.data.code, response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * confirm deposit
 * @param {*} data request data
 */
export function* confirmFiatDeposit(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    const confirmDepositRes = yield call(
      ApiService.postApi,
      ApiEndPoints.DEPOSIT_CONFIRM,
      data.confirmData,
      token
    )
    yield put(CommonActions.showOrHideLoader(false))
    if (between(confirmDepositRes.status, 200, 204)) {
      // Send call back
      yield call(data.successFn, {})
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      confirmDepositRes.data && confirmDepositRes.data.message
        ? showAlert(confirmDepositRes.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}
