"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer-bg text-white py-10 mt-10">
      <div className="flex flex-col container mx-auto px-4">
        {/* Top Details */}
        <div className="details flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-6">
          <Image src="/imgs/logo.svg" width={100} height={50} alt="Logo" />

          <div className="details-items grid grid-cols-1 sm:grid-cols-2 lg:flex lg:gap-10 gap-6">
            <div className="detail-item flex flex-col gap-2">
              <h3 className="text-lg font-bold">{t("footer.location")}</h3>
              <p className="text-sm flex gap-1 text-primary-25">
                <LocationOnIcon fontSize="small" />
                {t("footer.locationDescription")}
              </p>
            </div>

            <div className="detail-item flex flex-col gap-2">
              <h3 className="text-lg font-bold">{t("footer.phone")}</h3>
              <p className="text-sm flex gap-1 text-primary-25">
                <PhoneIcon fontSize="small" />
                {t("footer.phoneDescription")}
              </p>
            </div>

            <div className="detail-item flex flex-col gap-2">
              <h3 className="text-lg font-bold">{t("footer.whatsapp")}</h3>
              <p className="text-sm flex gap-1 text-primary-25">
                <WhatsAppIcon fontSize="small" />
                {t("footer.whatsappDescription")}
              </p>
            </div>

            <div className="detail-item flex flex-col gap-2">
              <h3 className="text-lg font-bold">{t("footer.email")}</h3>
              <p className="text-sm flex gap-1 text-primary-25">
                <EmailIcon fontSize="small" />
                {t("footer.emailDescription")}
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="map mt-10">
          <iframe
            className="rounded-xl w-full h-[250px] md:h-[350px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.6256401323194!2d46.75312902499272!3d24.671010978053403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f042f2004a441%3A0x99206ac1ae47d179!2z2LfYsdmK2YIg2LXZhNin2K0g2KfZhNiv2YrZhiDYp9mE2KPZitmI2KjZitiMINin2YTYsdmK2KfYtiDYp9mE2LPYudmI2K_Zitip!5e0!3m2!1sar!2seg!4v1754691606837!5m2!1sar!2seg"
            allowFullScreen
            loading="lazy"
            style={{ border: 0 }}
          ></iframe>
        </div>

        {/* Bottom Social */}
        <div className="social flex flex-col mt-10 gap-6">
          <hr className="border-gray-500" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center sm:text-left">
              {t("footer.rights")}
            </p>
            <div className="social-icons flex gap-3 text-xl">
              <FacebookIcon />
              <YouTubeIcon />
              <XIcon />
              <LinkedInIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
