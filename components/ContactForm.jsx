// components/ContactForm.jsx
import React from "react";
import { useTranslation } from "@/lib/i18n";
import { detectLanguage } from "@/lib/language-detector";
import Form from "./Form";

export default async function ContactForm() {
  const lng = await detectLanguage();
  const { t } = await useTranslation(lng, "translation");

  const translations = {
    nameField: t("homePage.contact.fields.name"),
    emailField: t("homePage.contact.fields.email"),
    phoneField: t("homePage.contact.fields.phone"),
    addressField: t("homePage.contact.fields.address"),
    messageField: t("homePage.contact.fields.message"),
    namePlaceholder: t("homePage.contact.placeholders.name"),
    emailPlaceholder: t("homePage.contact.placeholders.email"),
    phonePlaceholder: t("homePage.contact.placeholders.phone"),
    addressPlaceholder: t("homePage.contact.placeholders.address"),
    messagePlaceholder: t("homePage.contact.placeholders.message"),
    nameError: t("homePage.contact.errors.name"),
    emailRequiredError: t("homePage.contact.errors.emailRequired"),
    emailInvalidError: t("homePage.contact.errors.emailInvalid"),
    phoneError: t("homePage.contact.errors.phone"),
    addressError: t("homePage.contact.errors.address"),
    messageError: t("homePage.contact.errors.message"),
    sendButton: t("homePage.contact.buttons.send"),
    sendingButton: t("homePage.contact.buttons.sending"),
    successMessage: t("homePage.contact.successMessage"),
    errorMessage: t("homePage.contact.errorMessage"),
  };

  return <Form lng={lng} translations={translations} />;
}
