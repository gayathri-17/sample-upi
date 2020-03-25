import { put, call, select } from 'redux-saga/effects'
import { ApiService } from 'App/Services/ApiService'
import CommonActions from 'App/Stores/Common/Actions'
import ApiEndPoints from 'App/Constants/ApiEndPoints'
import { showAlert, between } from 'App/Components/Utils/Functions'
import handleConnectivityStatus from 'App/Services/NetworkService'
import I18n from 'App/Localization/I18n'
import { getToken } from './UserSaga'

/** add favourite
 * @param {Object} coin contains the request informations to hit API service call
 */
export function* addContact(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // transfer balance api request
    const response = yield call(
      ApiService.postApi,
      ApiEndPoints.FAVORITE + data.coin.coin,
      data.coin.data,
      token
    )

    if (between(response.status, 200, 204)) {
      // Send call back
      yield put(CommonActions.showOrHideLoader(false))
      yield call(data.successFn, {})
    } else {
      yield put(CommonActions.showOrHideLoader(false))
      // if status code is not 200 to 204 process request failure with message
      // Error handling - trigger callback
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/** get favourite
 * @param {Object} coin contains the request informations to hit API service call
 */
export function* getContactList(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)
    if (data.isLoader) {
      yield put(CommonActions.showOrHideLoader(true))
    }
    // get contact api request
    const response = yield call(ApiService.getApi, ApiEndPoints.FAVORITE + data.coin, token)
    if (response.status === 200) {
      // Send call back
      yield call(data.successFn, response.data)
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield put(CommonActions.showOrHideLoader(false))
      const error =
        response && response.data && response.data.message
          ? response.data.message
          : I18n.t('TRY_AGAIN_LATER')
      data.failureFn ? yield call(data.failureFn, error) : showAlert(error)
    }
  } else {
    data.failureFn ? yield call(data.failureFn, '') : showAlert(I18n.t('NETWORK_ERROR'))
  }
}
