"use client";
import React, { useEffect } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Image from "next/image";
import SectionHeading from "@/components/common/SectionHeading";
import LogoSlider from "@/components/common/LogoSlider";
import VerificationSlider from "@/components/common/VerificationSlider";
import ProjectsSlider from "@/components/common/ProjectsSlider";
import ServicesSlider from "@/components/common/ServicesSlider";
import Form from "@/components/Form";
export default function Home() {
  const { t } = useTranslation();
  const lng = Cookies.get("i18next") || "en";
  const verificationLogo = [
    { src: "/logos/ModonCity.svg", alt: "ModonCity" },
    { src: "/logos/Riyadh.svg", alt: "Riyadh" },
  ];
  const servicesLogos = t("servicesLogo", { returnObjects: true });
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
          className={`container absolute inset-0 flex flex-col mx-auto justify-center gap-6 sm:gap-8 text-white px-4 items-start pt-20 sm:pt-24 lg:pt-32`}
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
      <section className="whoWeAre section-bg">
        <div className="container mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            lng={lng}
            sectionTitle={t("homePage.whoWeAreTitle")}
          />
          <p
            className={`text-lg sm:text-xl text-gray-700 mt-6 leading-relaxed  ${
              lng === "ar" ? "text-right mr-auto" : "text-left ml-auto"
            }`}
          >
            {t("homePage.whoWeAreDescription")}
          </p>
        </div>
      </section>

      {/* Companies section */}
      <section className="companies py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            lng={lng}
            sectionTitle={t("homePage.companiesWeWorkedWithTitle")}
          />
          <div className="mt-8 sm:mt-12">
            <LogoSlider />
          </div>
        </div>
      </section>
      <section className="verification section-bg sm:py-16 py-10">
        <div className="container flex flex-col justify-center items-start mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading lng={lng} sectionTitle={t("homePage.verified")} />
          <VerificationSlider logos={verificationLogo} />
        </div>
      </section>
      <section className="projects sm:py-16 py-10">
        <div className="container flex flex-col justify-center items-start mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            lng={lng}
            sectionTitle={t("homePage.projectsTitle")}
          />
          <div className="flex items-center ">
            <p className="text-dark-blue-800 text-2xl">
              {t("homePage.projectsSubTitle")}
            </p>
            <a
              href={"/pdfs/profile.pdf"}
              download
              className="inline-block  font-semibold py-3 px-6  transition duration-300 ease-in-out transform hover:scale-110 focus:outline-non"
            >
              <img src="/icons/download.svg"></img>
            </a>
          </div>
          <ProjectsSlider />
        </div>
      </section>
      <section className="vision section-bg sm:py-16 py-10">
        <div className="container flex flex-col justify-center items-start mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            lng={lng}
            sectionTitle={t("homePage.visionSectionTitle")}
          />

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <div className="gradient-border flex flex-col justify-center items-center gap-4 px-4 py-6 h-full">
              <h3 className="text-2xl sm:text-3xl my-2 sm:my-4 gradient-text text-center">
                {t("homePage.visionTitle")}
              </h3>
              <p className="text-base sm:text-xl text-center">
                {t("homePage.visionDescription")}
              </p>
            </div>

            <div className="gradient-border flex flex-col justify-center items-center gap-4 px-4 py-6 h-full">
              <h3 className="text-2xl sm:text-3xl my-2 sm:my-4 gradient-text text-center">
                {t("homePage.missionTitle")}
              </h3>
              <p className="text-base sm:text-xl text-center">
                {t("homePage.missionDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="services sm:py-16 py-10">
        <div className="container flex flex-col justify-center items-start mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading lng={lng} sectionTitle={t("homePage.verified")} />
          <ServicesSlider logos={servicesLogos} />
        </div>
      </section>
      <section className="engineering flex flex-col justify-between container mx-auto design">
        {/* Image container */}
        <div className="relative w-full h-3/4 flex items-center justify-center">
          <Image
            width={200}
            height={200}
            src={"/imgs/engineeringDesign.svg"}
            alt={"engineeringDesign"}
            className="object-contain"
            sizes="(max-width: 384px) 320px, (max-width: 576px) 384px, (max-width: 768px) 448px, (max-width: 1024px) 512px, 576px"
          />
        </div>

        {/* Title below image */}
        <span className="mt-3 text-center text-3xl gradient-text">
          {t("homePage.engineeringDesign")}
        </span>
      </section>
      <section className="form section-bg sm:py-16 py-10 my-10">
        <div className="container flex flex-col justify-center items-start mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            lng={lng}
            sectionTitle={t("homePage.contact.title")}
          />
          <Form />
        </div>
      </section>
    </>
  );
}
