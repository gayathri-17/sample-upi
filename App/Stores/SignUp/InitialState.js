/**
 * Initial states for sign up screen.
 *
 */
export const INITIAL_STATE = {
  countryList: [],
  provinceList: [],
  // For User Verification
  userVerification: {},
  verificationIsLoading: false,
  verificationErrorMessage: {},
  // For Business Documents
  getBusinessDocument: [],
  submitBusinessDocumentByType: [],
  businessDocumentIsLoading: false,
  businessDocumentsErrorMessage: {},
  userDocuments: [
    {
      id: 1,
      value: 'passpost',
      label: 'Passport',
    },
    {
      id: 3,
      value: 'driving_license',
      label: 'Driving License',
    },
    {
      id: 9,
      value: 'national_identity_card',
      label: 'Identity Card',
    },
  ],
}
