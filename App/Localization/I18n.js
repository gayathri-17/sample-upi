import I18n from 'i18n-js'
import eng from 'App/Localization/Locales/eng'
import est from 'App/Localization/Locales/est'
import spa from 'App/Localization/Locales/spa'

I18n.fallbacks = true
I18n.locale = 'eng' // default language settings for initial state and test case
I18n.translations = {
  eng,
  est,
  spa,
}

export default I18n
