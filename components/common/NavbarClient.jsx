"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavbarClient({ navLinks, lng: initialLng }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lng, setLng] = useState(initialLng);

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    // Set initial scroll state after mounting
    if (typeof window !== "undefined") {
      setScrolled(window.scrollY > 50);
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Handle language change
  const handleLanguageChange = (newLng) => {
    // Set cookie for language preference
    document.cookie = `i18next=${newLng}; path=/; max-age=31536000; SameSite=Lax`;
    setLng(newLng);

    // Update HTML attributes
    document.documentElement.lang = newLng;
    document.documentElement.dir = newLng === "ar" ? "rtl" : "ltr";

    // Reload page to apply server-side language detection and get new translations
    window.location.reload();
  };

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 text-lg font-bold">
              <Image src="/imgs/logo.svg" width={100} height={50} alt="Logo" />
            </div>

            {/* Desktop Menu Skeleton */}
            <div className="hidden md:flex gap-4">
              {navLinks.map((_, i) => (
                <div key={i} className="w-16 h-6 bg-transparent"></div>
              ))}
              <div className="w-16 h-6 bg-transparent"></div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MenuIcon className="text-white" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-white text-black shadow-md"
            : "bg-transparent text-white"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 text-lg font-bold">
              <Image
                src={scrolled ? "/imgs/logoBlue.svg" : "/imgs/logo.svg"}
                width={100}
                height={50}
                alt="Logo"
              />
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
                  onClick={() => handleLanguageChange("ar")}
                  className={`text-xl hover:text-gray-300 ${
                    scrolled ? "text-black hover:text-gray-700" : "text-white"
                  }`}
                >
                  العربية
                </button>
              ) : (
                <button
                  onClick={() => handleLanguageChange("en")}
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
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle mobile menu"
              >
                <MenuIcon className={scrolled ? "text-black" : "text-white"} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[url('/imgs/sidebarImage.jpg')] bg-cover bg-center text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10">
          <div className="p-4 flex justify-between items-center border-b border-gray-700">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close mobile menu"
            >
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
                  onClick={() => {
                    handleLanguageChange("ar");
                    setIsOpen(false);
                  }}
                  className="text-white text-xl px-3 py-2 hover:text-gray-300"
                >
                  العربية
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleLanguageChange("en");
                    setIsOpen(false);
                  }}
                  className="text-white text-xl px-3 py-2 hover:text-gray-300"
                >
                  English
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
