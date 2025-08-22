// components/common/Footer.js (Server Component)
import { useTranslation } from "@/lib/i18n";
import { detectLanguage } from "@/lib/language-detector";
import FooterClient from "./FooterClient";

export default async function Footer() {
  const lng = await detectLanguage();
  const { t } = await useTranslation(lng, "translation");

  const footerData = {
    location: t("footer.location"),
    locationDescription: t("footer.locationDescription"),
    phone: t("footer.phone"),
    phoneDescription: t("footer.phoneDescription"),
    whatsapp: t("footer.whatsapp"),
    whatsappDescription: t("footer.whatsappDescription"),
    email: t("footer.email"),
    emailDescription: t("footer.emailDescription"),
    rights: t("footer.rights"),
  };

  return <FooterClient footerData={footerData} lng={lng} />;
}
