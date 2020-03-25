import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const GreyPlusCircle = (props) => {
  const xml = `
    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5593 17.9156C26.3598 17.9156 27.0043 18.5546 27.0057 19.3565C27.0057 20.1487 26.364 20.796 25.5607 20.796L20.7619 20.7974L20.7619 25.5948C20.7591 26.3953 20.1215 27.0385 19.3224 27.0398C18.526 27.0385 17.8829 26.3981 17.8815 25.5934L17.8815 20.796L13.084 20.796C12.2877 20.7946 11.6418 20.157 11.639 19.3565C11.6376 18.5601 12.278 17.917 13.0813 17.9142L17.8787 17.9142L17.8801 13.1154C17.8815 12.319 18.5233 11.6717 19.3224 11.6731C20.1173 11.6731 20.7605 12.3107 20.7619 13.1181L20.7633 17.9142L25.5593 17.9156ZM9.66113 9.69409C4.32681 15.0284 4.32681 23.682 9.66113 29.0164C14.9955 34.3507 23.6491 34.3507 28.9834 29.0164C34.3191 23.6807 34.3177 15.0284 28.9834 9.69409C23.6491 4.35977 14.9968 4.35839 9.66113 9.69409Z" fill="#CCCCCC"/>
    </svg>
	`
  return (
    <SvgXml
      xml={xml}
      width={props.width ? props.width : '100%'}
      height={props.height ? props.height : '100%'}
    />
  )
}
export default GreyPlusCircle

GreyPlusCircle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
