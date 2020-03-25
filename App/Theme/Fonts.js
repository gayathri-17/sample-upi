/**
 * This file contains the application's fonts.
 *
 * Define font related names here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  extraSmall: 10,
}

const style = {
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  normal: {
    fontSize: size.regular,
  },
}

const family = {
  GothamRoundedBold: 'GothamRounded-Bold',
  GothamRoundedBoldItalic: 'GothamRounded-BoldItalic',
  GothamRoundedBook: 'GothamRounded-Book',
  GothamRoundedBookItalic: 'GothamRounded-BookItalic',
  GothamRoundedLight: 'GothamRounded-Light',
  GothamRoundedLightItalic: 'GothamRounded-LightItalic',
  GothamRoundedMedium: 'GothamRounded-Medium',
  GothamRoundedMediumItalic: 'GothamRounded-MediumItalic',
}

export default {
  size,
  style,
  family,
}
