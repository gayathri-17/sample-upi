import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const VerifiedImage = (props) => {
  const xml = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="54"
  height="52"
  fill="none"
  viewBox="0 0 54 52"
>
  <path
    fill="#3AD1BF"
    d="M49.455 21.452a2.181 2.181 0 00-2.181 2.182v2.197a21.315 21.315 0 01-6.293 15.167 21.315 21.315 0 01-15.162 6.276h-.013c-11.83-.007-21.45-9.637-21.443-21.468a21.315 21.315 0 016.293-15.168 21.315 21.315 0 0115.162-6.275h.013c3.024.001 5.958.626 8.72 1.857a2.181 2.181 0 101.776-3.985A25.655 25.655 0 0025.833 0h-.015c-6.89 0-13.37 2.682-18.246 7.552C2.693 12.425.004 18.907 0 25.804c-.004 6.896 2.678 13.38 7.551 18.26 4.874 4.88 11.356 7.569 18.252 7.573h.016c6.89 0 13.37-2.682 18.245-7.552 4.88-4.874 7.569-11.356 7.573-18.253v-2.198a2.181 2.181 0 00-2.182-2.182z"
  ></path>
  <path
    fill="#3AD1BF"
    d="M53.362 3.016a2.182 2.182 0 00-3.085 0L25.819 27.474l-5.549-5.549a2.181 2.181 0 10-3.085 3.085l7.091 7.091c.426.426.985.639 1.543.639.558 0 1.116-.213 1.542-.639l26-26a2.181 2.181 0 000-3.085z"
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
export default VerifiedImage

VerifiedImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
