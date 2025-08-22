// app/services/page.js (Server Component)
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { detectLanguage } from "@/lib/language-detector";

export default async function Services() {
  const lng = await detectLanguage();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "translation");

  const textAlign = lng === "ar" ? "text-right" : "text-left";
  const logos = t("servicesLogo", { returnObjects: true }) || [];

  return (
    <>
      <div className="relative w-full h-dvh">
        {/* Background Image */}
        <Image
          src="/imgs/ServiciesHero.png"
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
            className={`text-4xl sm:text-6xl md:text-7xl gradient-text font-bold leading-tight md:leading-none ${textAlign}`}
          >
            {t("services.title")}
          </h1>
          <p className={`text-2xl text-white ${textAlign}`}>
            {t("services.description")}
          </p>
        </div>
      </div>

      <div className="section-bg">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-transparent transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg"
            >
              {/* Image fills container but keeps aspect ratio */}
              <div className="relative w-full h-40 flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt || `${logo.title} service icon`}
                  fill
                  className="object-contain"
                  priority={index < 6}
                />
              </div>

              {/* Title */}
              <span className="mt-4 text-center text-4xl gradient-text font-medium">
                {logo.title}
              </span>

              {/* Description */}
              <p className={`text-center text-xl ${textAlign}`}>
                {logo.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
