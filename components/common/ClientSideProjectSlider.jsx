// components/ClientSideSwiper.jsx
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import i18n from "i18next";
import { LocationOn, SquareFoot, Factory } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

// This is a client component that receives props from a server component
export default function ClientSideProjectSlider({ projects, lng }) {
  const isRTL = lng === "ar";

  useEffect(() => {
    // This effect ensures the document direction is updated if the language changes
    // This is the only part that needs to be client-side
    document.dir = i18n.dir(lng);
  }, [lng]);

  return (
    <>
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
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={`${lng}-${index}`} className="">
              <div className="flex flex-col section-bg rounded-xl bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full">
                {/* Top Image */}
                <div className="relative w-full h-72 overflow-hidden">
                  <Image
                    src={project.src || "/placeholder-image.jpg"}
                    alt={project.alt || project.title || "Project image"}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority={index < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div
                  className={`flex flex-col gap-3 p-4 sm:p-6 flex-grow ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
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
                  <h3 className="text-lg sm:text-xl font-bold line-clamp-2">
                    {project.title || "Untitled Project"}
                  </h3>
                  {project.description && (
                    <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                      {project.description}
                    </p>
                  )}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto text-sm text-gray-700 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {project.location && (
                      <div className={`flex items-center gap-2 flex-start`}>
                        <LocationOn
                          fontSize="small"
                          className="text-amber-600 flex-shrink-0"
                        />
                        <span className="text-sm truncate">
                          {project.location}
                        </span>
                      </div>
                    )}
                    {project.size && (
                      <div className={`flex items-center gap-2 flex-start`}>
                        <SquareFoot
                          fontSize="small"
                          className="text-amber-600 flex-shrink-0"
                        />
                        <span className="text-sm truncate">{project.size}</span>
                      </div>
                    )}
                    {project.type && (
                      <div className={`flex items-center gap-2 flex-start`}>
                        <Factory
                          fontSize="small"
                          className="text-amber-600 flex-shrink-0"
                        />
                        <span className="text-sm truncate">{project.type}</span>
                      </div>
                    )}
                    {project.delivery && (
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
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
