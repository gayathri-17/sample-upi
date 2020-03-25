import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const DangerCross = (props) => {
  const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="7"
      fill="none"
      viewBox="0 0 7 7"
    >
    <path
      fill="red"
      fillRule="evenodd"
      d="M7 1.4L5.6 0 3.5 2.1 1.4 0 0 1.4l2.1 2.1L0 5.6 1.4 7l2.1-2.1L5.6 7 7 5.6 4.9 3.5 7 1.4z"
      clipRule="evenodd"
    />
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
export default DangerCross

DangerCross.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
