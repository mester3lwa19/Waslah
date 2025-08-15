import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Image from "next/image";

// Custom slider component
export default function ServicesSlider({ logos }) {
  // State to keep track of the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay functionality using useEffect
  useEffect(() => {
    // Set an interval for autoplay, changing the slide every 3 seconds (3000ms)
    const autoplayInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % logos.length);
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(autoplayInterval);
  }, [logos.length]);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % logos.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + logos.length) % logos.length
    );
  };

  return (
    <div className="relative w-full">
      {/* Slider container with taller height */}
      <div className="relative h-[300px]  overflow-hidden">
        {logos.map((logo, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image fills most of container */}
            <div className="relative w-full h-[80%] flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                priority={index < 2}
              />
            </div>
            {/* Title */}
            <span className="mt-4 text-center text-3xl sm:text-3xl gradient-text">
              {logo.title}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-800 text-white shadow-lg hover:scale-110 transition-transform"
        >
          <ArrowForwardIosIcon />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-800 text-white shadow-lg hover:scale-110 transition-transform"
        >
          <ArrowBackIosNewIcon />
        </button>
      </div>
    </div>
  );
}
