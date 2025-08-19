"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import i18n from "i18next";

function Services() {
  const { t } = useTranslation();
  const lng = Cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  const logos = t("servicesLogo", { returnObjects: true });

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
            className={`text-4xl sm:text-6xl md:text-7xl gradient-text font-bold leading-tight md:leading-none ${
              lng === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("services.title")}
          </h1>
          <p className="text-2xl text-white">{t("services.description")}</p>
        </div>
      </div>
      <div className=" section-bg ">
        <div className="container mx-auto max-w-7xl grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-transparent transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg"
            >
              {/* Image fills container but keeps aspect ratio */}
              <div className="relative w-full h-40 flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
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
              <p className="text-center text-xl">{logo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
