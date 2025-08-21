import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Image from "next/image";

// Custom slider component
export default function ServicesSlider({ logos = [] }) {
  // Ensure logos is an array and has content
  const logoList = Array.isArray(logos) ? logos : [];

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

      {/* Navigation buttons - only show if more than 1 slide */}
      {logoList.length > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-800 text-white shadow-lg hover:scale-110 transition-transform"
            aria-label="Previous slide"
          >
            <ArrowForwardIosIcon />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-800 text-white shadow-lg hover:scale-110 transition-transform"
            aria-label="Next slide"
          >
            <ArrowBackIosNewIcon />
          </button>
        </div>
      )}

      {/* Dots indicator - only show if more than 1 slide */}
      {logoList.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {logoList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-blue-800" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
