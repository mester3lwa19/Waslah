"use client";
import React, { useEffect } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Image from "next/image";
import SectionHeading from "@/components/common/SectionHeading";
import LogoCarousel from "@/components/common/LogoCarousel";
export default function Home() {
  const { t } = useTranslation();
  const lng = Cookies.get("i18next") || "en";

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);

  return (
    <>
      <div className="relative w-full h-dvh">
        {/* Background Image */}
        <Image
          src="/imgs/Hero1.jpg"
          fill
          alt="Hero Image"
          className="object-cover"
          priority
        />

        {/* Overlay content */}
        <div
          className={`container absolute inset-0 flex flex-col mx-auto justify-center gap-6 sm:gap-8 text-white px-4 items-start`}
        >
          {/* Heading */}
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl font-bold leading-tight md:leading-none ${
              lng === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("homePage.heroTitle")}
          </h1>

          {/* Stats */}
          <div
            className={`stats flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 ${
              lng === "ar" ? "sm:justify-end" : "sm:justify-start"
            }`}
          >
            <div className={`${lng === "ar" ? "text-right" : "text-left"}`}>
              <span className="block text-2xl sm:text-2xl">
                {t("homePage.heroProjectsTitle")}
              </span>
              <h2 className="text-5xl sm:text-5xl  font-bold gradient-text">
                {t("homePage.heroProjectsCount")}
              </h2>
            </div>

            <div className={`${lng === "ar" ? "text-right" : "text-left"}`}>
              <span className="block text-2xl sm:text-2xl">
                {t("homePage.heroVisionTitle")}
              </span>
              <h2 className="text-5xl sm:text-5xl  font-bold gradient-text">
                {t("homePage.heroVisionYear")}
              </h2>
            </div>

            <div className={`${lng === "ar" ? "text-right" : "text-left"}`}>
              <span className="block text-2xl sm:text-2xl">
                {t("homePage.heroClientsTitle")}
              </span>
              <h2 className="text-5xl sm:text-5xl  font-bold gradient-text">
                {t("homePage.heroClientsCount")}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* Who we are */}
      <div className=" whoWeAre section-bg">
        <div className="container mx-auto py-8">
          <SectionHeading
            lng={lng}
            sectionTitle={t("homePage.whoWeAreTitle")}
          />
          <p className="text-xl text-gray-700">
            {t("homePage.whoWeAreDescription")}
          </p>
        </div>
      </div>
      <div className="container flex flex-col gap-8 mx-auto mt-6">
        <SectionHeading
          lng={lng}
          sectionTitle={t("homePage.companiesWeWorkedWithTitle")}
        />
        <LogoCarousel />
      </div>
    </>
  );
}
