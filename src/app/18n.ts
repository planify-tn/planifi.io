import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Define the locales your application supports
export const locales = ["en", "fr", "ar"];
export const defaultLocale = "en";

// This function is used by the middleware and getStaticParams to determine which
// locales should be used for which paths
export default getRequestConfig(async ({ locale }) => {
  // Validate that the requested locale is supported
  if (!locales.includes(locale as any)) notFound();

  // Load the translations for the locale
  const messages = await import(`../public/locales/${locale}/common.json`);

  return {
    messages: messages.default,
  };
});
