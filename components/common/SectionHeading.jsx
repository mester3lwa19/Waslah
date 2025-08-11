import React from "react";
import Image from "next/image";
function SectionHeading({ lng, sectionTitle }) {
  return (
    <h2 className="gradient-text flex justify-start items-center gap-4 text-3xl font-bold mb-4">
      {lng === "ar" ? (
        <>
          {" "}
          <Image
            src={"/imgs/Line 2.svg"}
            width={100}
            height={50}
            alt="Who We Are"
          />
          <span>{sectionTitle}</span>
          <Image
            src={"/imgs/Line 1.svg"}
            width={100}
            height={50}
            alt="Who We Are"
          />
        </>
      ) : (
        <>
          {" "}
          <Image
            src={"/imgs/Line 1.svg"}
            width={100}
            height={50}
            alt="Who We Are"
          />
          <span>{sectionTitle}</span>
          <Image
            src={"/imgs/Line 2.svg"}
            width={100}
            height={50}
            alt="Who We Are"
          />
        </>
      )}
    </h2>
  );
}

export default SectionHeading;
