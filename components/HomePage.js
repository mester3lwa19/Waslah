// components/pages/HomePage.js (Server Component)
import React from "react";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { detectLanguage } from "@/lib/language-detector";
import SectionHeading from "@/components/common/SectionHeading";
import LogoSlider from "@/components/common/LogoSlider";
import VerificationSlider from "@/components/common/VerificationSlider";
import ProjectsSlider from "@/components/common/ProjectsSlider";
import ServicesSlider from "@/components/common/ServicesSlider";

export default async function HomePage() {
  const lng = await detectLanguage();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "translation");

  const textAlign = lng === "ar" ? "text-right" : "text-left";
  const justifyContent = lng === "ar" ? "sm:justify-end" : "sm:justify-start";
  const marginAuto = lng === "ar" ? "mr-auto" : "ml-auto";

  const verificationLogo = [
    { src: "/logos/ModonCity.svg", alt: "ModonCity" },
    { src: "/logos/Riyadh.svg", alt: "Riyadh" },
  ];

  const servicesLogos = t("servicesLogo", { returnObjects: true }) || [];

  return (
    <>
      {/* Hero Section */}
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
            className={`text-4xl sm:text-6xl md:text-7xl font-bold leading-tight md:leading-none ${textAlign}`}
          >
            {t("homePage.heroTitle")}
          </h1>

          {/* Stats */}
          <div
            className={`stats flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 ${justifyContent}`}
          >
            <div className={textAlign}>
              <span className="block text-2xl sm:text-2xl">
                {t("homePage.heroProjectsTitle")}
              </span>
              <h2 className="text-5xl sm:text-5xl font-bold gradient-text">
                {t("homePage.heroProjectsCount")}
              </h2>
            </div>

            <div className={textAlign}>
              <span className="block text-2xl sm:text-2xl">
                {t("homePage.heroVisionTitle")}
              </span>
              <h2 className="text-5xl sm:text-5xl font-bold gradient-text">
                {t("homePage.heroVisionYear")}
              </h2>
            </div>

            <div className={textAlign}>
              <span className="block text-2xl sm:text-2xl">
                {t("homePage.heroClientsTitle")}
              </span>
              <h2 className="text-5xl sm:text-5xl font-bold gradient-text">
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
            className={`text-lg sm:text-xl text-gray-700 mt-6 leading-relaxed ${textAlign} ${marginAuto}`}
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

      {/* Verification Section */}
      <section className="verification section-bg sm:py-16 py-10">
        <div className="container flex flex-col justify-center items-start mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading lng={lng} sectionTitle={t("homePage.verified")} />
          <VerificationSlider logos={verificationLogo} />
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects sm:py-16 py-10">
        <div className="container flex flex-col justify-center items-start mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            lng={lng}
            sectionTitle={t("homePage.projectsTitle")}
          />
          <div className="flex items-center">
            <p className="text-dark-blue-800 text-2xl">
              {t("homePage.projectsSubTitle")}
            </p>
            <a
              href="/pdfs/profile.pdf"
              download
              className="inline-block font-semibold py-3 px-6 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
            >
              <img src="/icons/download.svg" alt="Download" />
            </a>
          </div>
          <ProjectsSlider />
        </div>
      </section>

      {/* Vision Section */}
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

      {/* Services Section */}
      <section className="services sm:py-16 py-10">
        <div className="container flex flex-col justify-center items-start mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            lng={lng}
            sectionTitle={t("services.title")}
          />
          <ServicesSlider logos={servicesLogos} />
        </div>
      </section>

      {/* Engineering Design Section */}
      <section className="engineering flex flex-col justify-between container mx-auto design">
        {/* Image container */}
        <div className="relative w-full h-3/4 flex items-center justify-center">
          <Image
            width={200}
            height={200}
            src="/imgs/engineeringDesign.svg"
            alt="Engineering Design"
            className="object-contain"
            sizes="(max-width: 384px) 320px, (max-width: 576px) 384px, (max-width: 768px) 448px, (max-width: 1024px) 512px, 576px"
          />
        </div>

        {/* Title below image */}
        <span className="mt-3 text-center text-3xl gradient-text">
          {t("homePage.engineeringDesign")}
        </span>
      </section>

      {/* Contact Form Section */}
      <section className="form section-bg sm:py-16 py-10 my-10">
        <div className="container flex flex-col justify-center items-start mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            lng={lng}
            sectionTitle={t("homePage.contact.title")}
          />
          <Suspense fallback={<div>Loading form...</div>}>
            {/* Render the server component to get translations */}
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
