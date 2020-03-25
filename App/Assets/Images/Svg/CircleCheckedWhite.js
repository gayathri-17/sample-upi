import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const CircleCheckedWhite = (props) => {
  const xml = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="134"
      fill="none"
      viewBox="0 0 140 134"
    >
      <path
        fill="#fff"
        d="M128.04 55.54a5.647 5.647 0 00-5.647 5.647v5.689c-.009 14.837-5.795 28.783-16.293 39.269-10.49 10.478-24.43 16.247-39.255 16.247h-.033c-30.63-.018-55.535-24.95-55.517-55.58.008-14.838 5.795-28.784 16.293-39.27 10.49-10.478 24.43-16.247 39.255-16.247h.033a55.202 55.202 0 0122.576 4.809A5.647 5.647 0 1094.05 5.787 66.42 66.42 0 0066.882 0h-.04C49.005 0 32.229 6.943 19.606 19.551 6.973 32.17.01 48.951 0 66.806c-.01 17.854 6.933 34.644 19.55 47.276 12.619 12.632 29.4 19.595 47.255 19.605h.04c17.838 0 34.615-6.943 47.237-19.551 12.632-12.618 19.595-29.4 19.605-47.257v-5.691a5.647 5.647 0 00-5.647-5.648z"
      ></path>
      <path
        fill="#fff"
        d="M138.152 7.808a5.648 5.648 0 00-7.987 0L66.843 71.131 52.477 56.765a5.647 5.647 0 10-7.986 7.987L62.85 83.11a5.63 5.63 0 003.994 1.654 5.63 5.63 0 003.993-1.654l67.315-67.316a5.647 5.647 0 000-7.987z"
      ></path>
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
export default CircleCheckedWhite

CircleCheckedWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
