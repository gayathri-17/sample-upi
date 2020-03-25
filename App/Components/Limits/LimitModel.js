import React from 'react'
import styles from './LimitModelStyle'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { PropTypes } from 'prop-types'
import { BlurView } from '@react-native-community/blur'
import CancelImage from 'App/Assets/Images/Svg/CancelImage'
import ProgressCircle from 'react-native-progress-circle'
import I18n from 'App/Localization/I18n'
import { currencyFormat } from 'App/Components/Utils/CurrencyDefinder'
import { getCurrencyColor, getLimitRoundOff } from 'App/Components/Utils/Functions'
import { Colors } from 'App/Theme'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'

/*
 * Common component for Limit model
 */
export default class LimitModel extends React.Component {
  render() {
    const {
      isShow,
      onClickClose,
      usedLimit,
      currencyName,
      totalLimit,
      defaultCurrency,
      availabeLimit,
      viewRef,
      limitText,
    } = this.props
    return (
      <Modal animationType="fade" transparent={true} visible={isShow}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} viewRef={viewRef} />
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <View style={styles.closeViewForModal} onPress={onClickClose}>
              <TouchableOpacity onPress={onClickClose}>
                <CancelImage width={styles.cancelImage.width} height={styles.cancelImage.height} />
              </TouchableOpacity>
            </View>
            <View style={styles.ErrorIconView}>
              <ProgressCircle
                percent={parseFloat(usedLimit)}
                radius={styles.progressStyleModal.width}
                borderWidth={styles.progressStyleModal.borderWidth}
                color={getCurrencyColor(currencyName)}
                shadowColor={styles.progressStyle.shadowColor}
                bgColor={styles.progressStyle.color}
              >
                <Text style={styles.progressPercentTextStyle}>{getLimitRoundOff(usedLimit)}%</Text>
              </ProgressCircle>
              <Text style={styles.sendLimitText}>{limitText}</Text>
            </View>
            <View style={styles.marginForView}>
              <View style={styles.limitTextrowStyle}>
                <Text
                  style={[styles.limitTextStyle, styles.widthForTitle, styles.textSizeForLimit]}
                >
                  {I18n.t('YOUR_LIMIT')}
                </Text>
                <Text style={[styles.limitTextStyle, styles.widthForText, styles.textSizeForLimit]}>
                  {currencyFormat(totalLimit, defaultCurrency)}
                </Text>
              </View>
              <View style={[styles.limitTextrowStyle, { backgroundColor: Colors.ghostWhite }]}>
                <Text style={[styles.limitTextStyle, styles.widthForTitle]}>{I18n.t('USED')}</Text>
                <Text style={[styles.limitTextStyle, styles.widthForText]}>
                  {currencyFormat(totalLimit - availabeLimit, defaultCurrency)}
                </Text>
                <Text style={styles.usedTextStyle}> ({parseFloat(usedLimit).toFixed(2)}%)</Text>
              </View>
              <View style={styles.limitTextrowStyle}>
                <Text style={[styles.limitTextStyle, styles.widthForTitle]}>{I18n.t('LEFT')}</Text>
                <Text style={[styles.limitTextStyle, styles.widthForText]}>
                  {currencyFormat(availabeLimit, defaultCurrency)}
                </Text>
                <Text style={styles.usedTextStyle}>
                  ({parseFloat((100 - usedLimit).toFixed(2))}%)
                </Text>
              </View>
            </View>
            {/* view all my limits */}
            <TouchableOpacity
              onPress={this.onPressLimit}
              style={[
                styles.centerStyle,
                styles.marginForView,
                styles.bottomMargin,
                styles.borderSendStyle,
                { borderColor: getCurrencyColor(currencyName) },
              ]}
            >
              <Text
                style={[
                  styles.smallTextStyle,
                  styles.sendTextStyle,
                  {
                    borderColor: getCurrencyColor(currencyName),
                    color: getCurrencyColor(currencyName),
                  },
                ]}
              >
                {I18n.t('VIEW_ALL_MY_LIMITS')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  /**
   * open send limit modal
   */
  onPressLimit = () => {
    this.props.onClickClose()
    Navigator.navigate(NavKeys.ACCOUNT_LIMITS)
  }
}
LimitModel.propTypes = {
  isShow: PropTypes.bool,
  onClickClose: PropTypes.func,
  usedLimit: PropTypes.string,
  currencyName: PropTypes.string,
  totalLimit: PropTypes.string,
  defaultCurrency: PropTypes.string,
  availabeLimit: PropTypes.string,
  viewRef: PropTypes.Any,
  limitText: PropTypes.string,
}
