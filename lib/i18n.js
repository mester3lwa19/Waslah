'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
     detection: {
        order: ['cookie','localStorage', 'hash',  'sessionStorage','htmlTag', 'navigator',  'path', 'subdomain'],
        caches: ['cookie', 'localStorage'],
     },
     backend: {
        loadPath:'/locales/{{lng}}/translation.json',
     },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
