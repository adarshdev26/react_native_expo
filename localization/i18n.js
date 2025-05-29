// localization/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import ar from './ar.json';

// Fallback in case Localization.locale is undefined
const locale = Localization.locale || 'en';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: locale.startsWith('ar') ? 'ar' : 'en',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
