"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import i18n from "i18next";
import { LocationOn, SquareFoot, Factory } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function ProjectsSlider() {
  const { t } = useTranslation();
  const lng = Cookies.get("i18next") || "en";
  const isRTL = lng === "ar";

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);

  const projects = t("projectsData", { returnObjects: true });

  // Debug logging
  console.log(`Language: ${lng}, Projects count: ${projects?.length}`);
  console.log("Projects data:", projects);

  return (
    <div className="py-12 w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Swiper Container with proper width constraints */}
        <div className="relative w-full overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: `.swiper-button-next-${lng}`,
              prevEl: `.swiper-button-prev-${lng}`,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: `.swiper-pagination-${lng}`,
            }}
            dir={isRTL ? "rtl" : "ltr"}
            key={lng}
            className="projects-swiper w-full"
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24, // Adjust this as needed
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 28, // Adjust this as needed
              },
            }}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={`${lng}-${index}`} className="">
                <div className="flex flex-col section-bg rounded-xl bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full">
                  {/* Top Image */}
                  <div className="relative w-full h-72 overflow-hidden">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      priority={index < 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Card Body */}
                  <div
                    className={`flex flex-col gap-3 p-4 sm:p-6 flex-grow ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {/* Company Logo */}
                    {project.logo && (
                      <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex-shrink-0">
                        <Image
                          src={project.logo}
                          alt={`${project.title} logo`}
                          fill
                          className="object-contain"
                          sizes="96px"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    {project.description && (
                      <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                        {project.description}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto text-sm text-gray-700 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div className={`flex items-center gap-2 flex-start`}>
                        <LocationOn
                          fontSize="small"
                          className="text-amber-600 flex-shrink-0"
                        />
                        <span className="text-sm truncate">
                          {project.location}
                        </span>
                      </div>
                      <div className={`flex items-center gap-2 flex-start}`}>
                        <SquareFoot
                          fontSize="small"
                          className="text-amber-600 flex-shrink-0"
                        />
                        <span className="text-sm truncate">{project.size}</span>
                      </div>
                      <div className={`flex items-center gap-2 flex-start`}>
                        <Factory
                          fontSize="small"
                          className="text-amber-600 flex-shrink-0"
                        />
                        <span className="text-sm truncate">{project.type}</span>
                      </div>
                      <div className={`flex items-center gap-2 flex-start`}>
                        <Image
                          src="/icons/delivery-type.png"
                          width={16}
                          height={16}
                          alt="delivery-type"
                          className="flex-shrink-0"
                        />
                        <span className="text-sm truncate">
                          {project.delivery}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons with correct direction handling */}
          <button
            className={`swiper-button-prev-${lng} absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center ${
              isRTL ? "right-2 sm:right-4" : "left-2 sm:left-4"
            }`}
            aria-label={isRTL ? "Next slide" : "Previous slide"}
          >
            <span className="text-lg leading-none">{isRTL ? "→" : "←"}</span>
          </button>

          <button
            className={`swiper-button-next-${lng} absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center ${
              isRTL ? "left-2 sm:left-4" : "right-2 sm:right-4"
            }`}
            aria-label={isRTL ? "Previous slide" : "Next slide"}
          >
            <span className="text-lg leading-none">{isRTL ? "←" : "→"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectsSlider;
