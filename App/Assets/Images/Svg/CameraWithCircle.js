import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const CameraWithCircle = (props) => {
  const xml = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      fill="none"
      viewBox="0 0 27 27"
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M20.438 6.685h4.381C26.02 6.685 27 7.633 27 8.84v13.117c0 1.207-.98 2.187-2.18 2.187H2.18c-1.206 0-2.18-.98-2.18-2.187V8.84c0-1.207.974-2.155 2.18-2.155h4.48L9.222 4.09v-.007c.396-.434.96-.707 1.596-.707h5.452c.598 0 1.123.247 1.513.636l.013.013c.006 0 .02.013.02.013l2.621 2.648zM7.502 14.857c0 3.31 2.694 6.01 5.997 6.01 3.31 0 5.998-2.7 5.998-6.01 0-3.317-2.687-6.01-5.998-6.01-3.303 0-5.997 2.693-5.997 6.01zm16-5.615c0 .507.409.915.908.915.5 0 .909-.408.909-.915a.913.913 0 00-.909-.915c-.5 0-.908.41-.908.915zM8.969 14.856a4.533 4.533 0 014.53-4.543 4.537 4.537 0 014.53 4.543A4.537 4.537 0 0113.5 19.4a4.537 4.537 0 01-4.53-4.544z"
        clipRule="evenodd"
      ></path>
      <mask
        id="a"
        width="27"
        height="22"
        x="0"
        y="3"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M20.438 6.685h4.381C26.02 6.685 27 7.633 27 8.84v13.117c0 1.207-.98 2.187-2.18 2.187H2.18c-1.206 0-2.18-.98-2.18-2.187V8.84c0-1.207.974-2.155 2.18-2.155h4.48L9.222 4.09v-.007c.396-.434.96-.707 1.596-.707h5.452c.598 0 1.123.247 1.513.636l.013.013c.006 0 .02.013.02.013l2.621 2.648zM7.502 14.857c0 3.31 2.694 6.01 5.997 6.01 3.31 0 5.998-2.7 5.998-6.01 0-3.317-2.687-6.01-5.998-6.01-3.303 0-5.997 2.693-5.997 6.01zm16-5.615c0 .507.409.915.908.915.5 0 .909-.408.909-.915a.913.913 0 00-.909-.915c-.5 0-.908.41-.908.915zM8.969 14.856a4.533 4.533 0 014.53-4.543 4.537 4.537 0 014.53 4.543A4.537 4.537 0 0113.5 19.4a4.537 4.537 0 01-4.53-4.544z"
          clipRule="evenodd"
        ></path>
      </mask>
      <g mask="url(#a)">
        <path fill="#fff" d="M0 0H27V27H0z"></path>
      </g>
    </svg>
	`
  return (
    <SvgXml
      xml={xml}
      testID={props.testID}
      width={props.width ? props.width : '100%'}
      height={props.height ? props.height : '100%'}
    />
  )
}
export default CameraWithCircle

CameraWithCircle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  testID: PropTypes.string,
}
