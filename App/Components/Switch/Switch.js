import React, { Component } from 'react'
import { Text, Animated, TouchableWithoutFeedback, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import styles from './SwitchStyle'
import Colors from 'App/Theme/Colors'

/**
 * Common component for switch
 */
export class Switch extends Component {
  static defaultProps = {
    value: false,
    onValueChange: () => null,
    renderInsideCircle: () => null,
    disabled: false,
    activeText: 'On',
    inActiveText: 'Off',
    backgroundActive: 'green',
    backgroundInactive: 'gray',
    circleActiveColor: 'white',
    circleInActiveColor: 'white',
    circleBorderActiveColor: Colors.switchBorderActive,
    circleBorderInactiveColor: Colors.switchBorderinActive,
    circleSize: 30,
    barHeight: null,
    circleBorderWidth: 1,
    changeValueImmediately: true,
    innerCircleStyle: { alignItems: 'center', justifyContent: 'center' },
    outerCircleStyle: {},
    renderActiveText: false,
    renderInActiveText: false,
    switchLeftPx: 2,
    switchRightPx: 2,
    switchWidthMultiplier: 2,
  }

  constructor(props, context) {
    super(props, context)
    // initial state set to component
    this.state = {
      value: props.value,
      transformSwitch: new Animated.Value(
        props.value
          ? props.circleSize / props.switchLeftPx
          : -props.circleSize / props.switchRightPx
      ),
      backgroundColor: new Animated.Value(props.value ? 75 : -75),
      circleColor: new Animated.Value(props.value ? 75 : -75),
      circleBorderColor: new Animated.Value(props.value ? 75 : -75),
    }

    this.handleSwitch = this.handleSwitch.bind(this)
    this.animateSwitch = this.animateSwitch.bind(this)
  }

  /**
   * get updatated props
   * @param {Object} nextProps - refers currency string
   */
  componentWillReceiveProps(nextProps) {
    const { disabled } = this.props
    if (nextProps.value === this.props.value) {
      return
    }
    if (disabled) {
      return
    }

    this.animateSwitch(nextProps.value, () => {
      this.setState({ value: nextProps.value })
    })
  }

  /**
   * handle switch change function
   * set changed to prop function
   */
  handleSwitch() {
    const { value } = this.state
    const { onValueChange, disabled, changeValueImmediately, value: propValue } = this.props
    if (disabled) {
      return
    }

    if (changeValueImmediately) {
      this.animateSwitch(!propValue)
      onValueChange(!propValue)
    } else {
      this.animateSwitch(!value, () => {
        this.setState({ value: !value }, () => onValueChange(this.state.value))
      })
    }
  }

  /**
   * animation for switch on and off
   * @param {Object} boolean - switch value true or false
   */
  animateSwitch(value, cb = () => {}) {
    Animated.parallel([
      Animated.spring(this.state.transformSwitch, {
        toValue: value
          ? this.props.circleSize / this.props.switchLeftPx
          : -this.props.circleSize / this.props.switchRightPx,
      }),
      Animated.timing(this.state.backgroundColor, {
        toValue: value ? 75 : -75,
        duration: 200,
      }),
      Animated.timing(this.state.circleColor, {
        toValue: value ? 75 : -75,
        duration: 200,
      }),
      Animated.timing(this.state.circleBorderColor, {
        toValue: value ? 75 : -75,
        duration: 200,
      }),
    ]).start(cb)
  }

  render() {
    const { transformSwitch, backgroundColor, circleColor, circleBorderColor } = this.state

    const {
      backgroundActive,
      backgroundInactive,
      circleActiveColor,
      circleInActiveColor,
      activeText,
      inActiveText,
      circleSize,
      containerStyle,
      activeTextStyle,
      inactiveTextStyle,
      barHeight,
      circleInactiveBorderColor,
      circleActiveBorderColor,
      circleBorderWidth,
      innerCircleStyle,
      outerCircleStyle,
      renderActiveText,
      renderInActiveText,
      renderInsideCircle,
      switchWidthMultiplier,
    } = this.props

    // interpolator for background color change
    const interpolatedColorAnimation = backgroundColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [backgroundInactive, backgroundActive],
    })

    // interpolator for switch on animation
    const interpolatedCircleColor = circleColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [circleInActiveColor, circleActiveColor],
    })

    // interpolator for switch off animation
    const interpolatedCircleBorderColor = circleBorderColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [circleInactiveBorderColor, circleActiveBorderColor],
    })

    return (
      <TouchableWithoutFeedback onPress={this.handleSwitch}>
        <Animated.View
          style={[
            styles.container,
            containerStyle,
            {
              backgroundColor: interpolatedColorAnimation,
              width: circleSize * switchWidthMultiplier,
              height: barHeight || circleSize,
              borderRadius: circleSize,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.animatedContainer,
              {
                left: transformSwitch,
                width: circleSize * switchWidthMultiplier,
              },
              outerCircleStyle,
            ]}
          >
            {renderActiveText && (
              <Text style={[styles.text, styles.paddingRight, activeTextStyle]}>{activeText}</Text>
            )}

            <Animated.View
              style={[
                styles.circle,
                {
                  borderWidth: circleBorderWidth,
                  borderColor: interpolatedCircleBorderColor,
                  backgroundColor: interpolatedCircleColor,
                  width: circleSize,
                  height: circleSize,
                  borderRadius: circleSize / 2,
                },
                innerCircleStyle,
              ]}
            >
              {renderInsideCircle()}
            </Animated.View>
            {renderInActiveText && (
              <Text style={[styles.text, styles.paddingLeft, inactiveTextStyle]}>
                {inActiveText}
              </Text>
            )}
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
Switch.propTypes = {
  onValueChange: PropTypes.func,
  disabled: PropTypes.bool,
  activeText: PropTypes.string,
  inActiveText: PropTypes.string,
  backgroundActive: PropTypes.string,
  backgroundInactive: PropTypes.string,
  value: PropTypes.bool,
  circleActiveColor: PropTypes.string,
  circleInActiveColor: PropTypes.string,
  circleSize: PropTypes.number,
  circleBorderActiveColor: PropTypes.string,
  circleBorderInactiveColor: PropTypes.string,
  activeTextStyle: Text.propTypes.style,
  inactiveTextStyle: Text.propTypes.style,
  containerStyle: ViewPropTypes.style,
  barHeight: PropTypes.number,
  circleBorderWidth: PropTypes.number,
  innerCircleStyle: ViewPropTypes.style,
  renderInsideCircle: PropTypes.func,
  changeValueImmediately: PropTypes.bool,
  outerCircleStyle: ViewPropTypes.style,
  renderActiveText: PropTypes.bool,
  renderInActiveText: PropTypes.bool,
  switchLeftPx: PropTypes.number,
  switchRightPx: PropTypes.number,
  switchWidthMultiplier: PropTypes.number,
  circleInactiveBorderColor: PropTypes.string,
  circleActiveBorderColor: PropTypes.string,
}
