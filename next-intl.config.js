// next-intl.config.js
module.exports = {
    // Locales that are supported by your application
    locales: ['en', 'fr', 'ar'],

    // Default locale to use when a non-locale prefixed path is used
    defaultLocale: 'en',

    // Optional: Locale detection strategy
    localeDetection: true,

    // Optional: Domain-specific locale configuration
    domains: [
        {
            // Note: You might need to update this based on your actual deployment
            domain: 'example.com',
            defaultLocale: 'en',
        },
        {
            domain: 'example.fr',
            defaultLocale: 'fr',
        },
        {
            domain: 'example.ar',
            defaultLocale: 'ar',
            // Optional: use http for local testing
            http: process.env.NODE_ENV === 'development',
        },
    ],

    // Optional: Pages that don't require locale prefixes
    // If you have pages that should be accessible without a locale prefix
    pages: {
        '*': [''],
    },
}