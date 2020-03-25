import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './RadioButtonStyle'

class RadioButton extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onClick.bind(this, !this.props.selected)}>
        <View style={[Style.button, this.props.buttonStyle]}>
          {this.props.selected ? (
            <View style={[Style.buttonSelection, this.props.buttonSelectionStyle]} />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
RadioButton.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  buttonSelectionStyle: PropTypes.object,
}

export default RadioButton
