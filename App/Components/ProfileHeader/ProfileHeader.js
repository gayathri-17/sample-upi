import React from 'react'
import { PropTypes } from 'prop-types'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import Styles from '../ProfileHeader/ProfileHeaderStyle'
import LinearGradient from 'react-native-linear-gradient'
import Line from 'App/Components/Line/Line'
import { Colors } from 'App/Theme'
import CameraWithCircle from 'App/Assets/Images/Svg/CameraWithCircle'
import ImagePicker from 'react-native-image-picker'
import UserActions from 'App/Stores/User/Actions'
import SvgIcon from 'App/Components/SvgIcon/SvgIcon'

/*
 * User settings header component (User info with icon)
 */
export default class ProfileHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isProfileAvailable: false,
      avatarSource: this.getProfileImage(this.props.profilePhoto),
    }
  }

  render() {
    const { testID, fullName, address, icon } = this.props
    const { avatarSource } = this.state
    return (
      <View style={Styles.container} testID={testID}>
        <Line styleProp={Styles.lineStyle} />
        <View style={Styles.subContainer}>
          <TouchableOpacity
            testID={'profileImage'}
            style={Styles.cameraView}
            onPress={() => this.openImagePicker()}
          >
            {avatarSource ? (
              <Image style={Styles.profileImage} source={{ uri: avatarSource }} />
            ) : (
              <CameraWithCircle width={Styles.cameraIcon.width} height={Styles.cameraIcon.height} />
            )}
          </TouchableOpacity>
          <View style={Styles.userInfo}>
            <Text style={Styles.userName}>{fullName}</Text>
            <Text style={[Styles.userName, Styles.address]}>{address}</Text>
          </View>
          <View style={Styles.selectedSettingsView}>
            {icon && (
              <SvgIcon
                width={Styles.selectedSettingsIcon.width}
                height={Styles.selectedSettingsIcon.height}
                xml={icon}
              />
            )}
          </View>
        </View>
        <LinearGradient
          colors={[Colors.ghostWhite, Colors.white]}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
          style={Styles.borderLineStyle}
        />
      </View>
    )
  }
  getProfileImage(profilePhoto) {
    return profilePhoto || null
  }
  // Open Image picket to get new user profile pick
  openImagePicker() {
    const options = {
      title: 'Select Avatar',
      quality: 0.1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(options, this.showImagePicker)
  }

  /**
   * show image pciker
   * @param {Object} response - image picker response
   */
  showImagePicker = (response) => {
    if (response.error) {
      // 'ImagePicker Error: ', response.error
    } else if (response.data) {
      let imageData = 'data:image/jpeg;base64,' + response.data
      this.setState({
        avatarSource: imageData,
      })
      const data = {
        avatar: imageData,
      }
      this.props.dispatch(
        UserActions.uploadProfilePhoto(data, () => {
          this.props.dispatch(UserActions.setProfilePhoto(imageData))
        })
      )
    }
  }
}

ProfileHeader.propTypes = {
  testID: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string,
  icon: PropTypes.string,
  dispatch: PropTypes.func,
}
