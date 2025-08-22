// components/common/Navbar.js (Server Component)
import { useTranslation } from "@/lib/i18n";
import { detectLanguage } from "@/lib/language-detector";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const lng = await detectLanguage();
  const { t } = await useTranslation(lng, "translation");

  const navLinks = [
    { href: "/", label: t("navbar.home") },
    { href: "/about", label: t("navbar.about") },
    { href: "/services", label: t("navbar.services") },
    { href: "/documents", label: t("navbar.documents") },
    { href: "/projects", label: t("navbar.projects") },
  ];

  return <NavbarClient navLinks={navLinks} lng={lng} />;
}
