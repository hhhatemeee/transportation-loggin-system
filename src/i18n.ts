import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { localizationRu } from './assets/locales/ru/translation'

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

const resources = {
  ru: {
    translation: localizationRu,
  },
}
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: false,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
