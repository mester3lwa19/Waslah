// components/Form.jsx
'use client';
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

// Receive translations and language from the parent server component
// Provide an empty object as a default value for translations to prevent errors
export default function Form({ lng, translations }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [status, setStatus] = useState("idle");
  const isRTL = lng === "ar";

  useEffect(() => {
    // Note: This useEffect might not be strictly necessary if the language is
    // only set on page load via the server component, but it's good practice
    // for a client component that could be used in other contexts.
    // window.document.dir = lng === "ar" ? "rtl" : "ltr";
  }, [lng]);

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
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const align = isRTL ? "text-right" : "text-left";

  // Safely access properties using optional chaining or by checking for existence
  // Note: Using `translations.sendButton ?? ''` is another safe way to do this.
  let buttonText = translations.sendButton;
  if (isSubmitting) {
    buttonText = translations.sendingButton;
  } else if (status === "success") {
    buttonText = translations.successMessage;
  } else if (status === "error") {
    buttonText = translations.errorMessage;
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
                {translations.nameField}
              </label>
              <input
                type="text"
                {...register("name", {
                  required: translations.nameError,
                })}
                className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-xl"
                placeholder={translations.namePlaceholder}
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
                {translations.emailField}
              </label>
              <input
                type="email"
                {...register("email", {
                  required: translations.emailRequiredError,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: translations.emailInvalidError,
                  },
                })}
                className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-xl"
                placeholder={translations.emailPlaceholder}
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
                {translations.phoneField}
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: translations.phoneError,
                })}
                className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-xl"
                placeholder={translations.phonePlaceholder}
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
                {translations.addressField}
              </label>
              <input
                type="text"
                {...register("address", {
                  required: translations.addressError,
                })}
                className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-xl"
                placeholder={translations.addressPlaceholder}
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
              {translations.messageField}
            </label>
            <textarea
              rows="6"
              {...register("message", {
                required: translations.messageError,
              })}
              className="w-full px-4 py-3 sm:py-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 resize-vertical text-xl"
              placeholder={translations.messagePlaceholder}
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