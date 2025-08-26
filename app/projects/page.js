// app/projects/page.js (Server Component)
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { detectLanguage } from "@/lib/language-detector";
import { LocationOn, SquareFoot, Factory } from "@mui/icons-material";
export const metadata = {
  title: "Our Projects | Waslah Mi'mar Contracting Company",
  description:
    "Explore our portfolio of completed industrial, residential, commercial, and warehouse projects. See our expertise and commitment to excellence.",
};
export default async function Projects() {
  const lng = await detectLanguage();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "translation");

  const projects = t("projectsData", { returnObjects: true }) || [];
  const textAlign = lng === "ar" ? "text-right" : "text-left";
  const flexDirection = lng === "ar" ? "flex-row-reverse" : "flex-row";

  return (
    <>
      <div className="relative w-full h-dvh">
        <Image
          src="/imgs/ProjectsHero.jpg"
          fill
          alt="Hero Image"
          className="object-cover"
          priority
        />

        <div
          className={`container absolute inset-0 flex flex-col mx-auto justify-center gap-6 sm:gap-8 text-white px-4 pt-20 sm:pt-24 lg:pt-32`}
        >
          <h1
            className={`text-5xl sm:text-5xl md:text-6xl gradient-text font-bold leading-tight md:leading-none ${textAlign}`}
          >
            {t("projects.title")}
          </h1>
          <p className={`text-lg sm:text-xl text-white ${textAlign}`}>
            {t("projects.description")}
          </p>
        </div>
      </div>

      <div className="section-bg py-12">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-xl bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
            >
              {/* Top Image */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
                <Image
                  src={project.src}
                  alt={project.alt || `${project.title} project image`}
                  fill
                  className="object-cover"
                  priority={index < 6}
                />
              </div>

              {/* Card Body */}
              <div className={`flex flex-col gap-3 p-6 ${textAlign}`}>
                {/* Company Logo */}
                {project.logo && (
                  <div className="relative w-24 h-20">
                    <Image
                      src={project.logo}
                      alt={`${project.title} company logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold">{project.title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-none">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3 text-sm text-gray-700 ${textAlign}`}
                >
                  <div className={`flex items-center gap-2 flex-start`}>
                    <LocationOn fontSize="medium" className="text-amber-600" />
                    <span className="text-base">{project.location}</span>
                  </div>
                  <div className={`flex items-center gap-2 flex-start`}>
                    <SquareFoot fontSize="medium" className="text-amber-600" />
                    <span className="text-base">{project.size}</span>
                  </div>
                  <div className={`flex items-center gap-2 flex-start`}>
                    <Factory fontSize="medium" className="text-amber-600" />
                    <span className="text-base">{project.type}</span>
                  </div>
                  <div className={`flex items-center gap-2 flex-start`}>
                    <Image
                      src="/icons/delivery-type.png"
                      width={20}
                      height={20}
                      alt="Delivery type icon"
                    />
                    <span className="text-base">{project.delivery}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
