import React, { Component } from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import { Style, contentContainerStyle } from './TabsStyle'
import { Colors } from 'App/Theme'
import { PropTypes } from 'prop-types'
import { hapticVibrate } from 'App/APIs/HapticFeedback'
import I18n from 'App/Localization/I18n'
import { TABS } from 'App/Constants/TransactionStatus'

/**
 * Custom tab bar component
 */

class Tabs extends Component {
  constructor(props) {
    super(props)
    // Initializing state for current component
    this.state = {
      navigationState: {},
      currentState: TABS.TAB_DASHBOARD,
    }
  }

  /**
   * Lifecycle callback after view rendered, Here initializing
   * navigaion state prop to current component state
   */
  componentDidMount() {
    this.setState({ navigationState: this.props.navigationState })
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    if (prevProps.navigationState !== this.props.navigationState) {
      this.setState({ navigationState: this.props.navigationState })
      this.list.scrollToIndex({
        animated: true,
        index: this.props.navigationState.index,
      })
      const selectedItem = this.props.navigationState.routes[this.props.navigationState.index]
      // refresh navigation state
      this.refreshNavigationState(selectedItem)
      hapticVibrate() // vibrate when tab change
    }
  }

  /**
   * refresh stack navigation state
   * @param {Object} selectedItem - refers selected navigation state
   */
  refreshNavigationState = (selectedItem) => {
    // if selected item contains routes navigate to specific route
    if (selectedItem.hasOwnProperty('routes') && this.state.currentState !== selectedItem.key) {
      this.props.navigation.navigate(selectedItem.routes[0].routeName)
      // if selected item not conains any routes navigate to selected route
    } else {
      this.props.navigation.navigate(selectedItem.routeName)
    }
    this.setState({ currentState: selectedItem.key })
  }

  render() {
    return (
      <View style={Style.tabBar}>
        {/* List of pages rendered in flatlist */}
        <FlatList
          contentContainerStyle={{ contentContainerStyle }}
          data={this.state.navigationState.routes}
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          ref={(ref) => {
            this.list = ref
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              testID={'TabButton' + index}
              key={item.routeName}
              onPress={this.refreshNavigationState.bind(this, item)}
              style={[Style.tab, index === 0 && Style.paddingLeft]}
            >
              <View>
                {/* Selected page text color to be changed by checking with index */}
                <Text
                  style={[
                    Style.tabLabel,
                    {
                      color:
                        this.state.navigationState.index === index
                          ? Colors.mediumTurquoise
                          : Colors.tabsGrey,
                    },
                  ]}
                >
                  {I18n.t(item.routeName)}
                </Text>
                {/* Indicator color changed based on page change */}
                <View
                  style={[
                    Style.tabIndicatorContainer,
                    {
                      backgroundColor:
                        this.state.navigationState.index === index
                          ? Colors.mediumTurquoise
                          : Colors.transparent,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

Tabs.propTypes = {
  navigationState: PropTypes.object,
  navigation: PropTypes.object,
  position: PropTypes.object,
}

export default Tabs
