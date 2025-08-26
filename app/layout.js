// app/layout.js
import "../app/styles/globals.css";
import I18nProvider from "../components/Providers/I18nProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { detectLanguage } from "@/lib/language-detector";
import { Zain } from "next/font/google";

const zain = Zain({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "800", "900"],
});

export const metadata = {
  title: "Waslah",
  description:
    "Waslah Mi'mar Contracting Company provides comprehensive engineering and execution services for industrial, residential, commercial, and warehouse projects. Discover our vision, projects, and clients.",
  icons: {
    icon: "/imgs/LogoWhite.png ",
  },
};

export default async function RootLayout({ children }) {
  // Detect language on server side
  const lng = await detectLanguage();

  return (
    <html
      lang={lng}
      dir={lng === "ar" ? "rtl" : "ltr"}
      className={zain.className}
    >
      <body>
        <Navbar />
        <main className="">
          <I18nProvider lng={lng}>{children}</I18nProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
