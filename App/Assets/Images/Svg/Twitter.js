import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Twitter = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="20"
      fill="none"
      viewBox="0 0 25 20"
    >
      <path
        fill="#898989"
        fillRule="evenodd"
        d="M7.82 15.538c-2.595 0-4.326-1.908-4.758-3.392a3.758 3.758 0 002.163 0c-1.514-.424-2.596-1.06-3.245-2.332-.433-.847-.649-1.695-.649-2.543.65.424 1.514.636 2.163.636-1.081-.848-1.73-1.696-2.163-2.968-.216-1.272 0-2.544.433-3.604 2.812 3.18 6.273 4.876 10.383 5.088v-.636c-.216-1.06 0-2.332.65-3.18.864-1.272 1.946-1.908 3.46-2.332 1.731-.212 3.245.212 4.327 1.272h.216c1.082-.212 1.947-.636 3.029-1.06-.433 1.06-1.082 2.12-2.163 2.756 1.081 0 1.946-.424 2.812-.636l-.65.636a6.52 6.52 0 01-1.73 1.696V7.27a17.329 17.329 0 01-1.298 4.451c-.649 1.484-1.514 2.756-2.812 3.816-1.947 1.908-4.326 3.18-6.922 3.816-.866.212-1.947.212-2.813.424-2.812 0-5.624-.636-8.003-2.12H.033c1.73.212 3.461 0 4.976-.636 1.298-.424 1.947-.848 2.812-1.484z"
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
export default Twitter

Twitter.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
