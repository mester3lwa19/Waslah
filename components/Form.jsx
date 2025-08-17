import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import emailjs from "emailjs-com";

export default function Form() {
  const { t } = useTranslation();
  const lng = Cookies.get("i18next") || "en";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [status, setStatus] = useState("idle");
  // idle | success | error

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EmailJs_ServiceID,
        process.env.NEXT_PUBLIC_EmailJs_TemplateID,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EmailJs_PublicID
      );
      reset();
      setStatus("success");

      // Reset button text back to default after 3s
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");

      // Reset button text back to default after 3s
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const align = lng === "ar" ? "text-right" : "text-left";

  // Decide button text
  let buttonText = t("homePage.contact.buttons.send");
  if (isSubmitting) {
    buttonText = t("homePage.contact.buttons.sending");
  } else if (status === "success") {
    buttonText = t("homePage.contact.successMessage");
  } else if (status === "error") {
    buttonText = t("homePage.contact.errorMessage");
  }

  return (
    <div className="w-full mt-6">
      <div className="mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 sm:p-8 lg:p-12 space-y-8"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <label
                className={`block ${align} text-primary-500 font-medium mb-3 text-xl`}
              >
                {t("homePage.contact.fields.name")}
              </label>
              <input
                type="text"
                {...register("name", {
                  required: t("homePage.contact.errors.name"),
                })}
                className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-xl"
                placeholder={t("homePage.contact.placeholders.name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block ${align} text-primary-500 font-medium mb-3 text-xl`}
              >
                {t("homePage.contact.fields.email")}
              </label>
              <input
                type="email"
                {...register("email", {
                  required: t("homePage.contact.errors.emailRequired"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("homePage.contact.errors.emailInvalid"),
                  },
                })}
                className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-xl"
                placeholder={t("homePage.contact.placeholders.email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone + Address */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <label
                className={`block ${align} text-primary-500 font-medium mb-3 text-xl`}
              >
                {t("homePage.contact.fields.phone")}
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: t("homePage.contact.errors.phone"),
                })}
                className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-xl"
                placeholder={t("homePage.contact.placeholders.phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block ${align} text-primary-500 font-medium mb-3 text-xl`}
              >
                {t("homePage.contact.fields.address")}
              </label>
              <input
                type="text"
                {...register("address", {
                  required: t("homePage.contact.errors.address"),
                })}
                className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-xl"
                placeholder={t("homePage.contact.placeholders.address")}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              className={`block ${align} text-primary-500 font-medium mb-3 text-xl`}
            >
              {t("homePage.contact.fields.message")}
            </label>
            <textarea
              rows="6"
              {...register("message", {
                required: t("homePage.contact.errors.message"),
              })}
              className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 resize-vertical text-xl"
              placeholder={t("homePage.contact.placeholders.message")}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-2">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-12 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 text-xl"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
