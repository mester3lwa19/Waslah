'use client';
import React from "react";

const LogoSlider = () => {
  const logos = [
    { src: "/logos/Alka.svg", alt: "Alka" },
    { src: "/logos/Almoases.svg", alt: "Almoases" },
    { src: "/logos/Aluminbond.svg", alt: "Aluminbond" },
    { src: "/logos/Bawazir.svg", alt: "Bawazir" },
    { src: "/logos/Etoile.svg", alt: "Etoile" },
    { src: "/logos/Omsteel.svg", alt: "Omsteel" },
  ];

  return (
    <section className="flex justify-center items-center gap-8 px-8 flex-col overflow-hidden min-h-[300px]">
      <div className="w-[90%] max-w-7xl mx-auto relative h-[120px] mt-8 overflow-hidden group">
        {/* Mask gradient effect */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
          }}
        />

        {logos.map((logo, index) => (
          <img
            key={index}
            className="logo-slider-item transition-all duration-500 ease-in-out w-4300px] h-[120px] rounded-md absolute object-contain p-4 group-hover:animation-pause"
            src={logo.src}
            alt={logo.alt}
            style={{
              left: "max(calc(200px * 6), 100%)",
              animationName: "scrollLeft",
              animationDuration: "35s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `calc(35s / 6 * (6 - ${index + 1}) * -1)`,
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default LogoSlider;
