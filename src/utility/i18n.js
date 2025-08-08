import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@src/locales/en.json';
import ta from '@src/locales/ta.json';

const resources = {
  en: {
    translation: en,
  },
  ta: {
    translation: ta,
  },
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ta', // default language
    fallbackLng: 'ta', // fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;