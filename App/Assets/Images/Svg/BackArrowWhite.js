import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const BackArrowWhite = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="none"
      viewBox="0 0 50 50"
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M0 25c0 13.808 11.192 25 25 25s25-11.192 25-25S38.808 0 25 0 0 11.192 0 25zm12.309-1.361l8.78-8.781a1.92 1.92 0 012.72 0 1.92 1.92 0 010 2.72l-5.51 5.509h18.248a1.923 1.923 0 110 3.846H18.322l5.486 5.489a1.918 1.918 0 010 2.719 1.92 1.92 0 01-2.719 0l-8.78-8.783a1.921 1.921 0 010-2.72z"
        clipRule="evenodd"
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
export default BackArrowWhite

BackArrowWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
