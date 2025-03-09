import { Metadata } from 'next';
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
    title: "PLANIFI - MAAK CORP",
    description: "Affordable SAAS for small and medium businesses - Streamline your tender management process with our intuitive platform",
    metadataBase: new URL('https://planifi.tn'),
    authors: [{ name: 'MAAK CORP' }],
    keywords: [
        'tender management',
        'business software',
        'SAAS',
        'procurement',
        'bid management',
        'small business',
        'medium business',
        'Tunisia',
        'tender platform',
        'tender solutions'
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://planifi.tn',
        siteName: 'PLANIFI',
        title: 'PLANIFI - Tender Management Made Simple',
        description: 'Affordable SAAS for small and medium businesses - Streamline your tender management process',
        images: [
            {
                url: 'https://planifi.tn/og-image.svg',
                width: 1200,
                height: 630,
                alt: 'PLANIFI Platform Preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PLANIFI - Tender Management Made Simple',
        description: 'Affordable SAAS for small and medium businesses',
        images: ['https://planifi.tn/twitter-image.svg'],
    },
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: dark)',
                url: '/logo_white.png',
                type: 'image/png',
            },
            {
                media: '(prefers-color-scheme: light)',
                url: '/logo_dark.png',
                type: 'image/png',
            },
        ],
        apple: [
            { url: '/icon-192x192.svg' },
        ],
        shortcut: ['/icon-512x512.svg'],
    },
    manifest: '/manifest.json',
    alternates: {
        canonical: 'https://planifi.tn'
    },
};

// Separate the viewport export as required by Next.js
export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

// Define supported locales for static generation
export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }];
}

// Load translations
async function getMessages(locale: string) {
    try {
        return (await import(`../../public/locales/${locale}/common.json`)).default;
    } catch {
        console.error(`Failed to load messages for locale: ${locale}`);
        // Fallback to English if the requested locale isn't available
        return (await import(`../../public/locales/en/common.json`)).default;
    }
}

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    // Ensure locale is valid or fallback to default
    const locale = params?.locale || 'en';
    console.log('Current locale:', locale);

    const messages = await getMessages(locale);

    // Set HTML direction based on locale
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            {
                                "@context": "https://schema.org",
                                "@type": "SoftwareApplication",
                                "name": "PLANIFI",
                                "applicationCategory": "BusinessApplication",
                                "operatingSystem": "Web",
                                "description": "Tender management platform for small and medium businesses",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "YOUR_PRICE",
                                    "priceCurrency": "TND",
                                    "priceValidUntil": "2024-12-31"
                                },
                                "featureList": [
                                    "HR Module",
                                    "File Management",
                                    "Tender Tracking",
                                    "Browser Extension"
                                ],
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.8",
                                    "ratingCount": "150"
                                }
                            }
                        )
                    }}
                />
            </head>
            <body className={inter.className}>
                <Nav />
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <Footer />
            </body>
        </html>
    );
}