import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Projects slider component using shadcn carousel
export default function ProjectsSlider() {
  const { t } = useTranslation();
  const projects = t("projectsData", { returnObjects: true });
  const [imageErrors, setImageErrors] = useState(new Set());

  // Function to get image source with proper fallback
  const getImageSource = (project, index) => {
    // If this image has errored before, use fallback immediately
    if (imageErrors.has(index)) {
      return `/imgs/projects${(index % 3) + 1}.jpg`;
    }

    // Try project's image first, then fallback
    return project.src;
  };

  // Handle image loading errors
  const handleImageError = (index, e) => {
    console.error(`Failed to load image for project ${index + 1}`);

    // Mark this index as having an error
    setImageErrors((prev) => new Set(prev).add(index));

    // Set fallback image
    const fallbackImage = `/imgs/project${(index % 3) + 1}.jpg`;
    e.currentTarget.src = fallbackImage;
  };

  // Add loading check
  if (!projects || !Array.isArray(projects)) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="w-full px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {projects.map((project, index) => (
            <CarouselItem
              key={`project-${index}`}
              className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full">
                <CardContent className="p-0">
                  <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden bg-white">
                    {/* Project Image */}
                    <div className="relative h-48 sm:h-56">
                      <Image
                        src={getImageSource(project, index)}
                        alt={project.title || `Project ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={(e) => handleImageError(index, e)}
                        priority={index < 3} // Prioritize first 3 images
                      />
                    </div>

                    {/* Project Info */}
                    <div className="p-4 h-32 sm:h-40 flex flex-col justify-between">
                      {/* Client Logo Placeholder */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">
                            {project.title
                              ? project.title.split(" ")[0].substring(0, 2)
                              : "PR"}
                          </span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3
                        className="text-sm font-bold text-gray-800 line-clamp-2 mb-2"
                        dir="rtl"
                      >
                        {project.title || `مشروع ${index + 1}`}
                      </h3>

                      {/* Project Details */}
                      <div
                        className="space-y-2 text-xs text-gray-600"
                        dir="rtl"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-blue-500">📍</span>
                            <span className="truncate">
                              {project.location || "غير محدد"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">📏</span>
                            <span>{project.size || "غير محدد"}</span>
                          </div>
                          {project.type && (
                            <div className="flex items-center gap-1">
                              <span className="text-orange-500">🏭</span>
                              <span>{project.type}</span>
                            </div>
                          )}
                        </div>

                        {project.delivery && (
                          <div className="flex items-center gap-1">
                            <span className="text-green-500">⚡</span>
                            <span>{project.delivery}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom styled navigation buttons */}
        <CarouselPrevious className="left-2 h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700" />
        <CarouselNext className="right-2 h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700" />
      </Carousel>
    </div>
  );
}
