'use client';

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useParams } from 'next/navigation';

function HeroSection() {
    const params = useParams();
    const locale = params.locale as string || 'en';
    const isRTL = locale === 'ar';

    // Since we can't use useTranslations due to context issues,
    // we'll use a direct approach to translations
    const translations = {
        en: {
            comingSoon: "Coming Soon - Join Waitlist",
            title: "Win More Tenders,",
            titleHighlight: "With Less Effort",
            description: "PLANIFI streamlines your entire tender process from discovery to submission with our all-in-one platform built for serious businesses.",
            cta: "Join Waitlist"
        },
        fr: {
            comingSoon: "Bientôt disponible - Inscrivez-vous",
            title: "Gagnez plus d'appels d'offres,",
            titleHighlight: "Avec moins d'effort",
            description: "PLANIFI simplifie l'ensemble de votre processus d'appel d'offres, de la découverte à la soumission, grâce à notre plateforme tout-en-un conçue pour les entreprises sérieuses.",
            cta: "Rejoindre la liste d'attente"
        },
        ar: {
            comingSoon: "قريبًا - انضم لقائمة الانتظار",
            title: "فز بمزيد من المناقصات،",
            titleHighlight: "بجهد أقل",
            description: "يبسط بلانيفاي عملية المناقصات بالكامل من الاكتشاف إلى التقديم من خلال منصتنا الشاملة المصممة للشركات الجادة.",
            cta: "انضم لقائمة الانتظار"
        }
    };

    const t = translations[locale as keyof typeof translations] || translations.en;

    return (
        <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
            <div className="container mx-auto px-4 lg:px-0 relative">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-1/2 flex flex-col gap-8">
                        <span className="bg-black text-white px-3 py-1 w-fit rounded-full text-sm font-medium mb-4 inline-block">
                            {t.comingSoon}
                        </span>

                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                                {t.title} <span className="bg-black text-white px-4">{t.titleHighlight}</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                {t.description}
                            </p>
                        </div>

                        <Link
                            href={`/${locale}/request`}
                            className="group bg-black text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all w-full lg:w-fit"
                        >
                            {t.cta}
                            <ArrowRight className={`w-5 h-5 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'} transition-transform`} />
                        </Link>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <Image
                            src="/preview.png"
                            alt="Planify Platform Interface"
                            className="w-full"
                            width={800}
                            height={600}
                        />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-black rounded-2xl rotate-12 -z-10"></div>
                        <div className="absolute -top-6 -right-6 w-24 h-24 border-4 border-black rounded-full -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection