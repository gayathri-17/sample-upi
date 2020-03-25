import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const CheckMarkWhite = (props) => {
  const xml = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    >
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.155 7.987l-7.451 9.563c-.06.059-.156.187-.274.187-.123 0-.203-.085-.273-.155-.07-.07-4.227-4.066-4.227-4.066l-.08-.08a.314.314 0 01-.059-.172c0-.064.027-.123.059-.171.021-.022.038-.038.059-.065.412-.434 1.248-1.312 1.302-1.366.07-.07.128-.16.257-.16.134 0 .22.112.284.176.064.065 2.41 2.32 2.41 2.32l5.963-7.66a.306.306 0 01.188-.076.3.3 0 01.187.07l1.64 1.291a.3.3 0 01.069.188.278.278 0 01-.054.176z"
            clipRule="evenodd"
        ></path>
        <mask
            id="a"
            width="24"
            height="24"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
        >
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.155 7.987l-7.451 9.563c-.06.059-.156.187-.274.187-.123 0-.203-.085-.273-.155-.07-.07-4.227-4.066-4.227-4.066l-.08-.08a.314.314 0 01-.059-.172c0-.064.027-.123.059-.171.021-.022.038-.038.059-.065.412-.434 1.248-1.312 1.302-1.366.07-.07.128-.16.257-.16.134 0 .22.112.284.176.064.065 2.41 2.32 2.41 2.32l5.963-7.66a.306.306 0 01.188-.076.3.3 0 01.187.07l1.64 1.291a.3.3 0 01.069.188.278.278 0 01-.054.176z"
                clipRule="evenodd"
            ></path>
        </mask>
        <g mask="url(#a)">
            <path fill="#fff" d="M0 0H24V24H0z"></path>
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
export default CheckMarkWhite

CheckMarkWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
