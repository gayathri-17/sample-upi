import React from 'react'
import styles from './ErrorModalStyle'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { PropTypes } from 'prop-types'
import Button from 'App/Components/Button/Button'
import CancelImage from 'App/Assets/Images/Svg/CancelImage'
import ErrorIcon from '../../../Assets/Images/Svg/ErrorIcon'
import { BlurView } from '@react-native-community/blur'

/*
 * Common component for error message
 */
export default class ErrorModal extends React.Component {
  render() {
    const {
      onCLickClose,
      onClickSubmit,
      submitButtonTitle,
      errorMessage,
      isShow,
      isHideClose,
    } = this.props
    return (
      <Modal animationType="fade" transparent={true} visible={isShow}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
        <View style={[styles.container]}>
          <View style={styles.alertContainer}>
            <View style={styles.closeView}>
              {!isHideClose && (
                <TouchableOpacity onPress={onCLickClose}>
                  <CancelImage
                    width={styles.cancelImage.width}
                    height={styles.cancelImage.height}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.ErrorIconView}>
              <ErrorIcon width={styles.errorIcon.width} height={styles.errorIcon.height} />
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <View style={styles.buttonView}>
              <Button
                withBg={true}
                withShadow={true}
                text={submitButtonTitle}
                onClick={onClickSubmit}
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
ErrorModal.propTypes = {
  isShow: PropTypes.bool,
  isHideClose: PropTypes.bool,
  onCLickClose: PropTypes.func,
  onClickSubmit: PropTypes.func,
  submitButtonTitle: PropTypes.string,
  errorMessage: PropTypes.string,
}
