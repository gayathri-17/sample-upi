/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { CommonTypes } from './Actions'

export const showOrHideLoader = (state, { status }) => ({
  ...state,
  isLoading: status,
})

export const enableDisableNotification = (state, { value }) => ({
  ...state,
  notificationEnabled: value,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const CommonReducer = createReducer(INITIAL_STATE, {
  [CommonTypes.SHOW_OR_HIDE_LOADER]: showOrHideLoader,
  [CommonTypes.ENABLE_DISABLE_NOTIFICATION]: enableDisableNotification,
})
