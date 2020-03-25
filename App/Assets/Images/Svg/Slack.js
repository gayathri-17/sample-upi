import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Slack = (props) => {
  const xml = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="22"
  height="22"
  fill="none"
  viewBox="0 0 22 22"
>
  <path
    fill="#898989"
    fillRule="evenodd"
    d="M7.864 5.041A2.24 2.24 0 015.622 2.8 2.24 2.24 0 017.864.557 2.24 2.24 0 0110.106 2.8v2.242H7.864zM2.258 16.283A2.24 2.24 0 004.5 14.041V11.8H2.258a2.24 2.24 0 00-2.241 2.242 2.24 2.24 0 002.241 2.242zM7.864 11.8a2.24 2.24 0 00-2.242 2.242v5.605a2.24 2.24 0 002.242 2.242 2.24 2.24 0 002.242-2.242v-5.605A2.24 2.24 0 007.864 11.8zm2.242-3.377A2.24 2.24 0 007.864 6.18H2.242A2.24 2.24 0 000 8.422a2.24 2.24 0 002.242 2.242h5.622a2.24 2.24 0 002.242-2.242zm6.741 0A2.24 2.24 0 0119.09 6.18a2.24 2.24 0 012.242 2.242 2.24 2.24 0 01-2.242 2.242h-2.242V8.422zm-3.364 2.24a2.24 2.24 0 002.242-2.241V2.799A2.24 2.24 0 0013.483.557 2.24 2.24 0 0011.241 2.8v5.622a2.24 2.24 0 002.242 2.242zm0 6.744a2.24 2.24 0 012.242 2.242 2.24 2.24 0 01-2.242 2.242 2.24 2.24 0 01-2.242-2.242v-2.242h2.242zm-2.242-3.365a2.24 2.24 0 002.242 2.242h5.622a2.24 2.24 0 002.242-2.242 2.24 2.24 0 00-2.242-2.242h-5.622a2.24 2.24 0 00-2.242 2.242z"
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
export default Slack

Slack.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
