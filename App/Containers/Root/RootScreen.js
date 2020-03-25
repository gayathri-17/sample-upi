import React, { Component } from 'react'
import LottieView from 'lottie-react-native'

import NavigationService from 'App/Services/NavigationService'
import AppNavigator from 'App/Navigators/AppNavigator'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import { PropTypes } from 'prop-types'

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.startup()
    this.props.showOrHideLoader(false) // Hide loader on app launch
  }

  render() {
    // access current state
    const { isLoading } = this.props

    return (
      <View style={styles.container}>
        <AppNavigator
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <LottieView
              source={require('App/Assets/Images/App_Loader.json')}
              autoPlay={true}
              loop={true}
            />
          </View>
        )}
      </View>
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
  isLoading: PropTypes.bool,
  showOrHideLoader: PropTypes.func,
  usdValue: PropTypes.object,
  euroValue: PropTypes.object,
}

const mapStateToProps = (state) => ({
  isLoading: state.common.isLoading,
  usdValue: state.user.currentCurrency,
  euroValue: state.user.euroCurrencyValue,
})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  showOrHideLoader: (status) => dispatch(CommonActions.showOrHideLoader(status)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
