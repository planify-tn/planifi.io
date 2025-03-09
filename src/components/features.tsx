
'use client';
import { Building2, FileText, Wrench, Calendar, Globe, ShieldCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { useParams } from 'next/navigation'

function Features() {
    const { t } = useTranslation('common');
    const params = useParams();
    const locale = params.locale || 'en';
    const isRTL = locale === 'ar';

    const features = t('features.items', { returnObjects: true });

    const icons = [
        <ShieldCheck key="shield" className="w-6 h-6 text-white" />,
        <Calendar key="calendar" className="w-6 h-6 text-white" />,
        <FileText key="filetext" className="w-6 h-6 text-white" />,
        <Building2 key="building" className="w-6 h-6 text-white" />,
        <Globe key="globe" className="w-6 h-6 text-white" />,
        <Wrench key="wrench" className="w-6 h-6 text-white" />
    ];

    return (
        <section id='features' className='py-24 bg-gray-50' dir={isRTL ? 'rtl' : 'ltr'}>
            <div className='container mx-auto px-4 lg:px-0 space-y-12'>
                <div className='text-center'>
                    <h2 className="text-4xl font-bold mb-4">{t('features.title')}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('features.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex gap-4 items-start mb-4">
                                <div className="bg-black rounded-full p-3 flex-shrink-0">
                                    {icons[index]}
                                </div>
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-4">{feature.description}</p>
                            <p className="text-sm font-medium text-black bg-gray-100 p-3 rounded-lg">
                                ✓ {feature.benefit}
                            </p>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center'>
                    <Link href='/request' className={`group bg-black text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all w-full lg:w-fit`}>
                        {t('features.cta')}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'} transition-transform`} />
                    </Link>
                </div>
            </div>
        </section>
    )
}


export default Features