import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SignUpActions } from './Actions'

/**
 * Redux state changes based on sign up actions.
 *
 */

// store country list in state
export const setCountryList = (state, { countryList }) => ({
  ...state,
  countryList: countryList,
})

// store provinces List in state
export const setProvinceList = (state, { provinceList }) => ({
  ...state,
  provinceList: provinceList,
})

// User verification process start state change
export const userVerification = (state) => ({
  ...state,
  verificationIsLoading: true,
  verificationErrorMessage: null,
})

// User verification sucess state change
export const verificationSuccess = (state, { verification }) => ({
  ...state,
  userVerification: verification,
  verificationIsLoading: false,
  verificationErrorMessage: null,
})

// User verification Faiilure state change
export const verificationFailure = (state, { errorMessage }) => ({
  ...state,
  userVerification: {},
  verificationIsLoading: false,
  verificationErrorMessage: errorMessage,
})

// Business Documents process start state change
export const getBusinessDocuments = (state) => ({
  ...state,
  businessDocumentIsLoading: true,
  businessDocumentsErrorMessage: null,
})

// Business Documents sucess state change
export const businessDocumentSuccess = (state, { businessDocuments }) => ({
  ...state,
  getBusinessDocument: businessDocuments,
  businessDocumentIsLoading: false,
  businessDocumentsErrorMessage: null,
})

// Business Documents Failure state change
export const businessDocumentFailure = (state, { errorMessage }) => ({
  ...state,
  getBusinessDocument: [],
  businessDocumentIsLoading: false,
  businessDocumentsErrorMessage: errorMessage,
})

// Business Documents process start state change
export const submitBusinessDocument = (state) => ({
  ...state,
  businessDocumentIsLoading: true,
  businessDocumentsErrorMessage: null,
})

// Business Documents upload sucess state change
export const submitBusinessDocumentSuccess = (state, { submitBusinessDocument }) => ({
  ...state,
  submitBusinessDocumentByType: submitBusinessDocument,
  businessDocumentIsLoading: false,
  businessDocumentsErrorMessage: null,
})

// upload Business Documents Failure state change
export const submitBusinessDocumentFailure = (state, { errorMessage }) => ({
  ...state,
  submitBusinessDocumentByType: [],
  businessDocumentIsLoading: false,
  businessDocumentsErrorMessage: errorMessage,
})

// set user documents
export const setUserDocuments = (state, { documents }) => ({
  ...state,
  userDocuments: documents,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const SignUpReducer = createReducer(INITIAL_STATE, {
  [SignUpActions.SET_COUNTRY_LIST]: setCountryList,
  [SignUpActions.SET_PROVINCE_LIST]: setProvinceList,
  [SignUpActions.USER_VERIFICATION]: userVerification,
  [SignUpActions.VERIFICATION_SUCCESS]: verificationSuccess,
  [SignUpActions.VERIFICATION_FAILURE]: verificationFailure,
  [SignUpActions.GET_BUSINESS_DOCUMENTS]: getBusinessDocuments,
  [SignUpActions.BUSINESS_DOCUMENT_SUCCESS]: businessDocumentSuccess,
  [SignUpActions.BUSINESS_DOCUMENT_FAILURE]: businessDocumentFailure,
  [SignUpActions.SUBMIT_BUSINESS_DOCUMENT]: submitBusinessDocument,
  [SignUpActions.SUBMIT_BUSINESS_DOCUMENT_SUCCESS]: submitBusinessDocumentSuccess,
  [SignUpActions.SUBMIT_BUSINESS_DOCUMENT_FAILURE]: submitBusinessDocumentFailure,
  [SignUpActions.SET_USER_DOCUMENTS]: setUserDocuments,
})
