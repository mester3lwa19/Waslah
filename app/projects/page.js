"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import i18n from "i18next";
import { LocationOn, SquareFoot, Factory } from "@mui/icons-material";
function Projects() {
  const { t } = useTranslation();
  const lng = Cookies.get("i18next") || "en";

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);

  const projects = t("projectsData", { returnObjects: true });
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
            className={`text-4xl sm:text-6xl md:text-7xl gradient-text font-bold leading-tight md:leading-none ${textAlign}`}
          >
            {t("projects.title")}
          </h1>
          <p
            className={`text-2xl text-white ${
              lng === "ar" ? "text-right" : "text-left"
            }`}
          >
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
              <div className="relative w-full h-72">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  priority={index < 6}
                />
              </div>

              {/* Card Body */}
              <div
                className={`flex flex-col gap-3 p-6 ${
                  lng === "ar" ? "text-right" : "text-left"
                }`}
              >
                {/* Company Logo */}
                {project.logo && (
                  <div className="relative w-24 h-20 ">
                    <Image
                      src={project.logo}
                      alt={`${project.title} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold">{project.title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm">{project.description}</p>

                {/* Meta Info */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3 text-sm text-gray-700 ${
                    lng === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LocationOn fontSize="medium" className="text-amber-600" />
                    <span className="text-base">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SquareFoot fontSize="medium" className="text-amber-600" />
                    <span className="text-base">{project.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Factory fontSize="medium" className="text-amber-600" />
                    <span className="text-base">{project.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/icons/delivery-type.png"}
                      width={20}
                      height={20}
                      alt="delivery-type"
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

export default Projects;
