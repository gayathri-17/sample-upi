import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Logout = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#3AD1BF"
        d="M15 13a1 1 0 00-1 1v4c0 .55-.448 1-1 1h-3V4c0-.854-.544-1.617-1.362-1.901l-.296-.1H13c.552 0 1 .45 1 1.001v3a1 1 0 102 0V3c0-1.654-1.346-3-3-3H2.25c-.038 0-.07.017-.107.022C2.095.018 2.05 0 2 0 .897 0 0 .897 0 2v18c0 .854.544 1.617 1.362 1.9l6.018 2.007c.204.063.407.093.62.093 1.103 0 2-.897 2-2v-1h3c1.654 0 3-1.346 3-3v-4a1 1 0 00-1-1z"
      ></path>
      <path
        fill="#3AD1BF"
        d="M23.707 9.293l-4-4A1 1 0 0018 6v3h-4a1 1 0 000 2h4v3a1 1 0 001.707.707l4-4a.999.999 0 000-1.414z"
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
export default Logout

Logout.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
