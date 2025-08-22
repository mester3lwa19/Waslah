// components/Providers/I18nProvider.js
"use client";
import i18n from "../../lib/i18n-client";
import { I18nextProvider } from "react-i18next";
import { useLayoutEffect } from "react";

export default function I18nProvider({ children, lng }) {
  // Use useLayoutEffect to ensure the language is changed immediately
  // before the component is painted. This is crucial for hydration.
  useLayoutEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}