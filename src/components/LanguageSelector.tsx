'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/app/i18n';

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const languages = [
        { code: 'en', name: 'English', dir: 'ltr' },
        { code: 'fr', name: 'Français', dir: 'ltr' },
        { code: 'ar', name: 'العربية', dir: 'rtl' }
    ];

    const handleLanguageChange = (newLocale: string) => {
        // Extract the path without the locale prefix
        // For example: /en/products -> /products
        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

        // Create the new path with the new locale
        const newPath = `/${newLocale}${pathWithoutLocale}`;

        // Set a cookie to remember this locale choice
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

        // Use the router to navigate to the new path
        router.push(newPath);
        router.refresh(); // Force a refresh to ensure all components update

        // Close the dropdown
        setIsOpen(false);

        // Set direction in HTML for RTL support
        document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLocale;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setIsOpen(false);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
                className="flex items-center gap-2 text-sm text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Globe size={16} />
                <span>{languages.find(lang => lang.code === locale)?.name || 'English'}</span>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50 w-32">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${locale === language.code ? 'font-bold bg-gray-100' : ''
                                }`}
                            onClick={() => handleLanguageChange(language.code)}
                        >
                            {language.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;