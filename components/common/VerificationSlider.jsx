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
    </div>
  );
}
