"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

// Custom slider component
export default function ServicesSlider({ logos, lng }) {
  // Ensure logos is an array and has content
  const logoList = Array.isArray(logos) ? logos : [];
  const isRTL = lng === "ar";
  // State to keep track of the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Early return if no logos
  if (logoList.length === 0) {
    return (
      <div className="relative w-full h-[300px] flex items-center justify-center">
        <div className="text-center text-gray-500">No services available</div>
      </div>
    );
  }

  // Autoplay functionality using useEffect
  useEffect(() => {
    // Only set up autoplay if we have logos
    if (logoList.length > 1) {
      const autoplayInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % logoList.length);
      }, 3000);

      // Clear the interval when the component unmounts
      return () => clearInterval(autoplayInterval);
    }
  }, [logoList.length]);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % logoList.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + logoList.length) % logoList.length
    );
  };

  return (
    <div className="relative w-full">
      {/* Slider container with taller height */}
      <div className="relative h-[300px] overflow-hidden">
        {logoList.map((logo, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image fills most of container */}
            <div className="relative w-full h-[80%] flex items-center justify-center">
              <Image
                src={logo.src || "/placeholder-logo.jpg"}
                alt={logo.alt || logo.title || "Service logo"}
                fill
                className="object-contain"
                priority={index < 2}
              />
            </div>
            {/* Title */}
            <span className="mt-4 text-center text-3xl sm:text-3xl gradient-text">
              {logo.title || "Untitled Service"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
