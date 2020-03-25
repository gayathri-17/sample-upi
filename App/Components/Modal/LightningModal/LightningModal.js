import React from 'react'
import styles from './LightningModalStyle'
import { View, Text, TouchableOpacity, Modal, Linking } from 'react-native'
import { PropTypes } from 'prop-types'
import CancelImage from 'App/Assets/Images/Svg/CancelImage'
import Slack from 'App/Assets/Images/Svg/Slack'
import Youtube from 'App/Assets/Images/Svg/Youtube'
import Twitter from 'App/Assets/Images/Svg/Twitter'
import Instagram from 'App/Assets/Images/Svg/Instagram'
import Facebook from 'App/Assets/Images/Svg/Facebook'
import Telegram from 'App/Assets/Images/Svg/Telegram'
import Lightning from 'App/Assets/Images/Svg/Lightning'
import { BlurView } from '@react-native-community/blur'
import Line from 'App/Components/Line/Line'
import I18n from 'App/Localization/I18n'

/**
 * Component contains success status of every transaction
 * and it also contains options to share the same to social media
 */
export default class LightningModal extends React.Component {
  render() {
    const { onCLickClose, isShow } = this.props
    return (
      <Modal animationType="fade" transparent={true} visible={isShow}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
        <View style={styles.container}>
          <View style={styles.alertContainer}>
            <View style={styles.closeView}>
              <TouchableOpacity onPress={onCLickClose}>
                <CancelImage width={styles.cancelImage.width} height={styles.cancelImage.height} />
              </TouchableOpacity>
            </View>
            <View style={styles.infoIconView}>
              <Lightning width={styles.infoIcon.width} height={styles.infoIcon.height} />
            </View>
            <Text style={styles.message}>{I18n.t('LIGHTNING_HINT')}</Text>
            <Line styleProp={styles.lineStyle} />
            <View style={styles.shareContainer}>
              <TouchableOpacity
                style={styles.socioTouch}
                onPress={this.handleClick.bind(this, 'http://slack.mercury.cash/')}
              >
                <Slack width={styles.socioTouch.width} height={styles.socioTouch.height} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socioTouch}
                onPress={this.handleClick.bind(this, 'https://www.youtube.com/c/mercurycash')}
              >
                <Youtube width={styles.socioTouch.width} height={styles.socioTouch.height} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socioTouch}
                onPress={this.handleClick.bind(this, 'https://twitter.com/mercurycash')}
              >
                <Twitter width={styles.socioTouch.width} height={styles.socioTouch.height} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socioTouch}
                onPress={this.handleClick.bind(this, 'https://www.instagram.com/mercury.cash/')}
              >
                <Instagram width={styles.socioTouch.width} height={styles.socioTouch.height} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socioTouch}
                onPress={this.handleClick.bind(this, 'https://www.facebook.com/mercurycash')}
              >
                <Facebook width={styles.socioTouch.width} height={styles.socioTouch.height} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socioTouch}
                onPress={this.handleClick.bind(this, 'https://t.me/mercurycash')}
              >
                <Telegram width={styles.socioTouch.width} height={styles.socioTouch.height} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  /**
   * on press function for social media icon
   * @param {String} url - refers url to open web page
   */
  handleClick = (url) => {
    Linking.canOpenURL(url).then(this.openUrl.bind(this, url))
  }

  /**
   * open web url
   * @param {String} url - refers url to open web page
   */
  openUrl = (url) => {
    Linking.openURL(url)
  }
}
LightningModal.propTypes = {
  isShow: PropTypes.bool,
  onCLickClose: PropTypes.func,
}
