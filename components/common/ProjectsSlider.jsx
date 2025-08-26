// components/ProjectsSlider.jsx
import React from "react";
import { useTranslation } from "@/lib/i18n"; // Use the server-side hook
import { detectLanguage } from "@/lib/language-detector"; // Use the server-side language detector

import ClientSideProjectSlider from "./ClientSideProjectSlider"; // Client component for Swiper

export default async function ProjectsSlider() {
  const lng = await detectLanguage();
  const { t } = await useTranslation(lng, "translation");
  const isRTL = lng === "ar";

  const projectsData = t("projectsData", { returnObjects: true });
  const projects = Array.isArray(projectsData) ? projectsData : [];

  if (projects.length === 0) {
    return (
      <div className="py-12 w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            {t("noProjectsAvailable")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ClientSideProjectSlider projects={projects} lng={lng} />
      </div>
    </div>
  );
}
