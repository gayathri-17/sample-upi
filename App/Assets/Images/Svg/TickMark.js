import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const TickMark = (props) => {
  const xml = `
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="8"
		height="7"
		fill="none"
		viewBox="0 0 8 7"
	>
	<path
		fill="#898989"
		fillRule="evenodd"
		d="M7.965 1.052l-4.8 5.834c-.038.036-.1.114-.176.114-.08 0-.132-.052-.176-.095L.09 4.425l-.052-.05A.185.185 0 010 4.272c0-.039.017-.075.038-.104a277.527 277.527 0 01.877-.873c.044-.042.082-.098.165-.098.086 0 .142.069.183.108.042.04 1.553 1.415 1.553 1.415L6.657.046A.203.203 0 016.777 0 .2.2 0 016.9.042L7.955.83A.177.177 0 018 .944a.163.163 0 01-.035.108z"
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
export default TickMark

TickMark.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
