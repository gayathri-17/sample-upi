import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { UserReducer } from 'App/Stores/User/Reducers'
import { SignUpReducer } from 'App/Stores/SignUp/Reducers'
import { OnBoardingReducer } from 'App/Stores/OnBoarding/Reducers'
import { WalletReducer } from 'App/Stores/WalletBalance/Reducers'
import { CommonReducer } from 'App/Stores/Common/Reducers'
import DefaultStrings from 'App/Constants/DefaultStrings'

export default () => {
  /**
   * Register your reducers as an argument of combineReducers.
   * @see https://redux.js.org/api-reference/combinereducers
   */
  const appReducer = combineReducers({
    user: UserReducer,
    signUp: SignUpReducer,
    onBoarding: OnBoardingReducer,
    wallet: WalletReducer,
    common: CommonReducer,
  })

  const rootReducer = (state, action) => {
    if (action.type === DefaultStrings.LOG_OUT) {
      state = undefined
    }

    return appReducer(state, action)
  }

  return configureStore(rootReducer, rootSaga)
}
