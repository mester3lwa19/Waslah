// lib/i18n-client.js
"use client";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Important: remove `lng` from here and let LanguageDetector handle it
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    defaultNS: "translation",
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ["cookie", "localStorage", "htmlTag", "navigator"],
      caches: ["cookie", "localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    // This is the key change: tell i18next to use React Suspense
    react: {
      useSuspense: true,
    },
  });

export default i18next;