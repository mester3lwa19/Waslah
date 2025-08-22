// lib/language-detector.js
import { cookies, headers } from 'next/headers';

const supportedLngs = ['en', 'ar'];
const fallbackLng = 'en';

export async function detectLanguage() {
  // Check cookies first
  const cookieStore = await cookies();
  const cookieLng = cookieStore.get('i18next')?.value;
  
  if (cookieLng && supportedLngs.includes(cookieLng)) {
    return cookieLng;
  }

  // Check Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  
  if (acceptLanguage) {
    const browserLngs = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
      .map(lang => lang.split('-')[0]); // Extract language code only

    for (const lang of browserLngs) {
      if (supportedLngs.includes(lang)) {
        return lang;
      }
    }
  }

  return fallbackLng;
}