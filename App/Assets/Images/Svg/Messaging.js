import React from 'react'
import { SvgXml } from 'react-native-svg'
import { PropTypes } from 'prop-types'

const Messaging = (props) => {
  const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="33"
      fill="none"
      viewBox="0 0 38 33"
    >
      <rect width="38" height="27" fill="#31C5C3" rx="5" />
      <path fill="#31C5C3" d="M9 33l-5-7h8l-3 7z" />
      <circle cx="10.5" cy="13.5" r="2.5" fill="#fff" />
      <circle cx="19.667" cy="13.5" r="2.5" fill="#fff" />
      <circle cx="28.833" cy="13.5" r="2.5" fill="#fff" />
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
export default Messaging

Messaging.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
