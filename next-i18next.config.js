/**
 * @file next-i18next.config.js
 * @description Configuration for next-i18next
 */

module.exports = {
    i18n: {
        locales: ['en', 'fr', 'ar'],
        defaultLocale: 'en',
    },
    localePath: './public/locales',
    reloadOnPrerender: process.env.NODE_ENV === 'development',
}