import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const WhiteTick = (props) => {
  const xml = `
  <svg 
    width="98" 
    height="79" 
    viewBox="0 0 98 79" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    <path 
        d="M96.1522 1.80822C93.9467 -0.397012 90.371 -0.397012 88.1655 1.80822L24.8431 65.1304L10.4776 50.7649C8.2724 48.5594 4.6964 48.5594 2.49117 50.7649C0.285659 52.9704 0.285659 56.5462 2.49117 58.7517L20.8501 77.1106C21.9527 78.2135 23.3983 78.7648 24.8436 78.7648C26.2889 78.7648 27.7342 78.2135 28.8371 77.1106L96.1522 9.79497C98.3577 7.58946 98.3577 4.01373 96.1522 1.80822Z" 
        fill="white"/>
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
export default WhiteTick

WhiteTick.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
