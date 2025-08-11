"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function LogoCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const logos = [
    "/logos/Aluminbond.svg",
    "/logos/Bawzir.svg",
    "/logos/Etoile.svg",
    "/logos/Omsteel.svg",
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {logos.map((logo, index) => (
          <CarouselItem key={index} className="basis-1/2 pl-4">
            {/* <img
              src={logo}
              alt={`Logo ${index}`}
              className="w-full h-auto object-contain"
            /> */}
            <Image
              src={logo}
              alt={`Logo ${index}`}
              width={200}
              height={100}
              className="w-full h-auto object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
