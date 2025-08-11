"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import i18n from "i18next";
import Cookies from "js-cookie";
import React from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lng = Cookies.get("i18next") || "en";

  const navLinks = [
    { href: "/", label: t("navbar.home") },
    { href: "/about", label: t("navbar.about") },
    { href: "/services", label: t("navbar.services") },
    { href: "/documents", label: t("navbar.documents") },
    { href: "/projects", label: t("navbar.projects") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 text-lg font-bold">
              <Image src={scrolled ? "/imgs/logoBlue.svg" : "/imgs/logo.svg"} width={100} height={50} alt="Logo" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "gradient-text text-xl font-bold"
                      : "gradient-hover text-xl"
                  } transition-colors duration-200 ${
                    scrolled ? "text-black hover:text-gray-700" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {lng === "en" ? (
                <button
                  onClick={() => i18n.changeLanguage("ar")}
                  className={`text-xl hover:text-gray-300 ${
                    scrolled ? "text-black hover:text-gray-700" : "text-white"
                  }`}
                >
                  العربية
                </button>
              ) : (
                <button
                  onClick={() => i18n.changeLanguage("en")}
                  className={`text-xl hover:text-gray-300 ${
                    scrolled ? "text-black hover:text-gray-700" : "text-white"
                  }`}
                >
                  English
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon className={scrolled ? "text-black" : "text-white"} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[url('/imgs/sidebarImage.jpg')] text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <button onClick={() => setIsOpen(false)}>
            <CloseIcon className="text-white" />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`${
                pathname === link.href
                  ? "gradient-text text-xl font-bold"
                  : "gradient-hover text-xl"
              } transition-colors duration-200`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex">
            {lng === "en" ? (
              <button
                onClick={() => i18n.changeLanguage("ar")}
                className="text-white text-xl px-3 py-2 hover:text-gray-300"
              >
                العربية
              </button>
            ) : (
              <button
                onClick={() => i18n.changeLanguage("en")}
                className="text-white text-xl px-3 py-2 hover:text-gray-300"
              >
                English
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
