import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const EmptyList = (props) => {
  const color = props.color ? `${props.color}44` : '#3AD1BF44'
  const xml = `
  <svg width="153px" height="153px" viewBox="0 0 153 153" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Generator: Sketch 62 (91390) - https://sketch.com -->
  <title>Group@1x</title>
  <desc>Created with Sketch.</desc>
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Artboard-Copy" transform="translate(-71.000000, -64.000000)" fill-rule="nonzero">
          <g id="Group@1x" transform="translate(55.000000, 36.000000)">
              <g id="blob-shape" transform="translate(89.719875, 95.683919) rotate(165.000000) translate(-89.719875, -95.683919) translate(18.219875, 16.683919)" fill=${color}>
                  <path d="M113.181287,2.57431782 C128.801472,6.47178936 145.058452,15.5409058 141.986857,27.8329314 C138.95272,40.1624327 116.627467,55.7148432 114.642167,74.6400656 C112.656868,93.6027636 131.048981,115.975749 131.798151,133.064663 C132.54732,150.153577 115.691005,161.995894 100.407946,155.812405 C85.1248863,149.628917 71.3776246,125.419623 54.4838508,117.812058 C37.5900769,110.241969 17.4748739,119.236134 9.30892556,115.038857 C1.14297722,110.804104 4.88882508,93.3404338 3.91490464,77.4132665 C2.97844267,61.4860991 -2.71524608,47.095435 1.59247896,37.0519506 C5.86274552,27.045942 20.1344259,21.3496374 32.7953917,16.1030411 C45.4563574,10.8189691 56.5066086,5.94712973 69.5421592,2.91159901 C82.5777098,-0.161407392 97.5611012,-1.3606294 113.181287,2.57431782 Z" id="Path"></path>
              </g>
              <g id="3024050" transform="translate(27.000000, 63.000000)">
                  <polyline id="Fill-2" fill="#D4D5CF" points="32.4477261 29.5628711 32.0379556 32.1053515 14.0830565 29.5128668 14.4931488 26.970709 32.4477261 29.5628711"></polyline>
                  <polyline id="Fill-3" fill="#D4D5CF" points="23.405415 20.4933686 25.9818508 20.8656592 23.1253676 38.5823693 20.5489318 38.2104013 23.405415 20.4933686"></polyline>
                  <path d="M40.9904584,15.008373 L28.1179362,81.3361068 L104.105088,80.9605901 C107.515228,80.9434919 110.537487,77.909033 111.6345,73.4002518 L125.108641,18.028637 C125.941702,14.6060797 124.11399,11.0460911 121.525644,11.0486692 L44.6175547,11.1296468 C42.9195664,11.1315824 41.4346715,12.7194632 40.9904584,15.008373" id="Fill-116" fill=${color}></path>
                  <path d="M105.076241,80.8734857 C105.623138,80.7415387 106.088596,80.5950743 106.485169,80.4424803 C106.030012,80.6434656 105.558759,80.7886396 105.076241,80.8734857" id="Fill-117" fill="#6D232C"></path>
                  <path d="M105.853614,79.1459154 C97.6115301,79.1459154 96.816775,69.6915405 96.8161312,69.6847657 L89.5596854,11.0822233 L121.525644,11.048672 C121.52661,11.048672 121.527254,11.048672 121.528541,11.048672 C123.685872,11.048672 125.314009,13.5240497 125.312402,16.3301014 C125.311756,16.8888599 125.247055,17.4605228 125.108641,18.028637 L111.6345,73.4002518 C111.068933,75.7249711 109.991555,77.6577208 108.612885,78.9871918 C108.682414,78.8768596 108.703659,78.81137 108.703659,78.81137 C107.66684,79.0413901 106.718542,79.1459154 105.853614,79.1459154" id="Fill-118" fill="#707070"></path>
                  <path d="M96.8161312,69.6847657 L88.7707244,4.7087629 C88.4411054,2.04659468 86.3249773,0.0606146179 83.8264398,0.0686310339 L66.184743,0.126426823 C64.878821,0.130943347 63.6269771,0.687121 62.6996018,1.6752719 L54.3226446,10.5999231 L5.25737971,10.8567197 C2.25926338,10.8722049 -0.0442067113,13.7156793 0.353009903,16.9104747 L7.82287113,76.964757 C8.15345579,79.6233765 10.2657211,81.6067757 12.7607179,81.6019542 L98.2704462,81.4325669 C107.79431,81.6303261 108.703659,78.81137 108.703659,78.81137 C97.7888935,81.2354529 96.8170969,69.6921857 96.8161312,69.6847657" id="Fill-119" fill="#DBDBDB"></path>
                  <path d="M57.060671,59.784868 L47.5487172,51.208957 L50.4325613,48.104492 L59.944837,56.6807257 L57.060671,59.784868 M44.3613275,48.3351574 L34.8493737,39.7592464 L37.7332178,36.6547814 L47.2451716,45.2306924 L44.3613275,48.3351574" id="Fill-120" fill-opacity="0.173432037" fill="#000000"></path>
                  <polyline id="Fill-121" fill-opacity="0.173432037" fill="#000000" points="38.941928 60.4733153 35.7548602 57.5995156 55.8519608 35.9663341 59.0393505 38.8401338 38.941928 60.4733153"></polyline>
              </g>
          </g>
      </g>
  </g>
</svg>`

  return (
    <SvgXml
      xml={xml}
      width={props.width ? props.width : '100%'}
      height={props.height ? props.height : '100%'}
    />
  )
}
export default EmptyList

EmptyList.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
}