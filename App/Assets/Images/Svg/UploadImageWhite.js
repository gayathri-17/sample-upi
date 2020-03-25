import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const UploadImageWhite = (props) => {
  const xml = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M19.613 10.493c0-.064.01-.129.01-.193 0-3.482-2.775-6.3-6.198-6.3-2.47 0-4.591 1.468-5.588 3.59a3.173 3.173 0 00-1.435-.349c-1.58 0-2.898 1.173-3.15 2.705A4.857 4.857 0 000 14.554c0 2.689 2.148 4.875 4.795 4.875h5.49v-4.286H7.705L12 10.659l4.296 4.478h-2.582v4.286h5.91c2.42 0 4.376-2.009 4.376-4.468s-1.966-4.457-4.387-4.462z"
        clipRule="evenodd"
      ></path>
      <mask
        id="a"
        width="24"
        height="16"
        x="0"
        y="4"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M19.613 10.493c0-.064.01-.129.01-.193 0-3.482-2.775-6.3-6.198-6.3-2.47 0-4.591 1.468-5.588 3.59a3.173 3.173 0 00-1.435-.349c-1.58 0-2.898 1.173-3.15 2.705A4.857 4.857 0 000 14.554c0 2.689 2.148 4.875 4.795 4.875h5.49v-4.286H7.705L12 10.659l4.296 4.478h-2.582v4.286h5.91c2.42 0 4.376-2.009 4.376-4.468s-1.966-4.457-4.387-4.462z"
          clipRule="evenodd"
        ></path>
      </mask>
    <g mask="url(#a)">
      <path fill="#FFFFFF" d="M0 0H24V24H0z"></path>
    </g>
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
export default UploadImageWhite

UploadImageWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
