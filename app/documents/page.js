"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import i18n from "i18next";
import DownloadIcon from "@mui/icons-material/Download";
function Documents() {
  const { t } = useTranslation();
  const lng = Cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  const docs = t("documents.docs", { returnObjects: true });
  return (
    <>
      <div className="relative w-full h-dvh">
        {/* Background Image */}
        <Image
          src="/imgs/ServiciesHero.png"
          fill
          alt="Hero Image"
          className="object-cover"
          priority
        />

        {/* Overlay content */}
        <div
          className={`container absolute inset-0 flex flex-col mx-auto justify-center gap-6 sm:gap-8 text-white px-4 items-start pt-20 sm:pt-24 lg:pt-32`}
        >
          {/* Heading */}
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl gradient-text font-bold leading-tight md:leading-none ${
              lng === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("documents.title")}
          </h1>
          <p className="text-2xl text-white">{t("documents.description")}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {docs.map((doc, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 items-center text-center p-6 rounded-xl border border-yellow-300 bg-[#fffaf2] transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            {/* Icon */}
            <Image
              src={"/icons/ph_file-pdf.svg"}
              width={70}
              height={70}
              alt="pdfImage"
            />

            {/* Title */}
            <h2 className="text-4xl font-semibold gradient-text mt-4">
              {doc.title}
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-sm mt-2">{doc.description}</p>

            {/* Button */}
            <a
              href={doc.file}
              download
              className="mt-4 inline-flex gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
            >
              <DownloadIcon />
              {t("documents.download")}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default Documents;
