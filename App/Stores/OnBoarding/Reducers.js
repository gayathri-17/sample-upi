/**
 * Redux state changes based on onboarding actions.
 *
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { OnBoardingActions } from './Actions'

// user information submit process start state change
export const submitUserInformation = (state) => ({
  ...state,
  userInfoRequest: {},
  userInfoRequestIsLoading: true,
  userInfoRequestError: {},
})

// user information submit success state change
export const submitUserInformationSuccess = (state, { userInformation }) => ({
  ...state,
  userInfoRequest: userInformation,
  userInfoRequestIsLoading: false,
  userInfoRequestError: null,
})

// user information Failure state change
export const submitUserInformationFailure = (state, { errorMessage }) => ({
  ...state,
  userInfoRequest: {},
  userInfoRequestIsLoading: false,
  userInfoRequestError: errorMessage,
})

// phone number validation process start state change
export const phoneNumberValidation = (state) => ({
  ...state,
  phoneInformation: {},
  userInfoRequestIsLoading: true,
  phoneInformationError: {},
})

// phone number validation submit success state change
export const phoneNumberValidationSuccess = (state, { phoneInformation }) => ({
  ...state,
  phoneInformation: phoneInformation,
  userInfoRequestIsLoading: false,
  phoneInformationError: null,
})

// phone number validation Failure state change
export const phoneNumberValidationFailure = (state, { errorMessage }) => ({
  ...state,
  phoneInformation: {},
  userInfoRequestIsLoading: false,
  phoneInformationError: errorMessage,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const OnBoardingReducer = createReducer(INITIAL_STATE, {
  [OnBoardingActions.SUBMIT_USER_INFORMATION]: submitUserInformation,
  [OnBoardingActions.SUBMIT_USER_INFORMATION_SUCCESS]: submitUserInformationSuccess,
  [OnBoardingActions.SUBMIT_USER_INFORMATION_FAILURE]: submitUserInformationFailure,
  [OnBoardingActions.PHONE_NUMBER_VALIDATION]: phoneNumberValidation,
  [OnBoardingActions.PHONE_NUMBER_VALIDATION_SUCCESS]: phoneNumberValidationSuccess,
  [OnBoardingActions.PHONE_NUMBER_VALIDATION_FAILURE]: phoneNumberValidationFailure,
})
