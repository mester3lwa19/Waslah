// components/VerificationSlider.js

"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

export default function VerificationSlider({ logos, lng }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isRTL = lng === "ar";

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % logos.length);
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, [logos.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % logos.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + logos.length) % logos.length
    );
  };

  return (
    <div className="relative w-full">
      <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
        {logos.map((logo, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 384px) 320px, (max-width: 576px) 384px, (max-width: 768px) 448px, (max-width: 1024px) 512px, 576px"
                priority={index < 2}
                onError={(e) => {
                  console.error(`Failed to load image: ${logo.src}`);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-2 sm:px-3">
        {/* Previous button */}
        <button
          onClick={prevSlide}
          className="pointer-events-auto flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 transform rounded-full bg-blue-800 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
          aria-label={isRTL ? "Next slide" : "Previous slide"}
        ></button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="pointer-events-auto flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 transform rounded-full bg-blue-800 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
          aria-label={isRTL ? "Previous slide" : "Next slide"}
        ></button>
      </div>
    </div>
  );
}
