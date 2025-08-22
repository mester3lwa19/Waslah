// app/about/page.js (Pure Server Component - Alternative Version)
import React from "react";
import Image from "next/image";
import { useTranslation } from '@/lib/i18n';
import { detectLanguage } from "@/lib/language-detector";
import SectionHeading from "@/components/common/SectionHeading";

export default async function About() {
  const lng = await detectLanguage();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "translation");

  const textAlign = lng === "ar" ? "text-right" : "text-left";
  const items = t("about.items", { returnObjects: true }) || [];

  return (
    <>
      <div className="relative w-full h-dvh">
        <Image
          src="/imgs/AboutHero.jpg"
          fill
          alt="Hero Image"
          className="object-cover"
          priority
        />

        <div
          className={`container absolute inset-0 flex flex-col mx-auto justify-center gap-6 sm:gap-8 text-white px-4 pt-20 sm:pt-24 lg:pt-32`}
        >
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl gradient-text font-bold leading-tight md:leading-none ${textAlign}`}
          >
            {t("about.title")}
          </h1>
          <p className={`text-2xl text-white ${textAlign}`}>
            {t("about.description")}
          </p>
        </div>
      </div>

      <div className="py-10">
        <div className="container mx-auto flex flex-col">
          <div className="flex items-center">
            <p className="text-dark-blue-800 text-2xl">
              {t("homePage.projectsSubTitle")}
            </p>
            <a
              href={"/pdfs/profile.pdf"}
              download
              className="inline-block font-semibold py-3 px-6 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
            >
              <img src="/icons/download.svg" alt="Download" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 my-6">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col gap-3 flex-start">
                {/* Title with icon */}
                <div className="flex items-center gap-3 justify-start">
                  <div className="relative w-7 h-7">
                    <Image
                      src={item.img}
                      alt={item.alt || `Icon ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold gradient-text">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-bg py-10">
        <div className="container mx-auto flex flex-col">
          <SectionHeading lng={lng} sectionTitle={t("about.founder")} />

          <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
            {/* Founder Image */}
            <div className="flex-shrink-0">
              <Image
                src="/imgs/Mohamed-Shahat.jpg"
                alt="Mohamed Shahat - Founder"
                width={400}
                height={300}
                className="rounded-xl object-cover shadow-md max-w-full md:max-w-lg"
              />
            </div>

            {/* Founder Description */}
            <p
              className={`text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-800 ${textAlign}`}
            >
              {t("about.founderDescription")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
