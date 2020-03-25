import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Lock = (props) => {
  const xml = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="#3AD1BF"
      fillRule="evenodd"
      d="M2 15h11.357c.412 0 .75-.332.75-.74V7.165a.742.742 0 00-.75-.736h-.723V5.394c0-1.39-.543-2.933-1.426-3.864A4.869 4.869 0 007.682 0h-.007C6.292 0 5.03.6 4.15 1.527 3.266 2.457 2.723 4 2.723 5.39v1.038H2a.744.744 0 00-.75.736v7.095c0 .409.335.74.75.74zm2.498-9.606c0-.914.331-2.046.94-2.689v-.01c.59-.622 1.404-.987 2.237-.987h.007c.834 0 1.647.365 2.237.987v.007l-.004.003c.613.643.941 1.775.941 2.689v1.035H4.498V5.394z"
      clipRule="evenodd"
    ></path>
    <mask
      id="a"
      width="14"
      height="15"
      x= "1"
      y="0"
      maskUnits="userSpaceOnUse"
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M2 15h11.357c.412 0 .75-.332.75-.74V7.165a.742.742 0 00-.75-.736h-.723V5.394c0-1.39-.543-2.933-1.426-3.864A4.869 4.869 0 007.682 0h-.007C6.292 0 5.03.6 4.15 1.527 3.266 2.457 2.723 4 2.723 5.39v1.038H2a.744.744 0 00-.75.736v7.095c0 .409.335.74.75.74zm2.498-9.606c0-.914.331-2.046.94-2.689v-.01c.59-.622 1.404-.987 2.237-.987h.007c.834 0 1.647.365 2.237.987v.007l-.004.003c.613.643.941 1.775.941 2.689v1.035H4.498V5.394z"
        clipRule="evenodd"
      ></path>
    </mask>
    <g mask="url(#a)">
      <path fill="#3AD1BF" d="M0 0H15V15H0z"></path>
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
export default Lock

Lock.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
