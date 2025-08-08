'use client';
import React,{use, useEffect} from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Image from "next/image";
export default function Home() {
  const { t } = useTranslation();
  const lng = Cookies.get('i18next') || 'en';
  useEffect(() => {
    window.document.dir = i18n.dir();
  },[lng]);
    return (
        <div>
          <Image src={"/imgs/hero1.jpg"} width={1000} height={400} alt="Hero Image" className="w-full h-dvh object-cover" />
            <h1>{t("homepage.title")}</h1>
            {/* <button onClick={() => i18n.changeLanguage('ar')}>Switch to Arabic</button>
            <button onClick={() => i18n.changeLanguage('en')}>Switch to English</button> */}
        </div>
    );
}
