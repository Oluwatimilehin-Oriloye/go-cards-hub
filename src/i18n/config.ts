import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en';
import ig from './locales/ig';
import yo from './locales/yo';
import ha from './locales/ha';
import pcm from './locales/pcm';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ig: { translation: ig },
      yo: { translation: yo },
      ha: { translation: ha },
      pcm: { translation: pcm },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
