"use client";
import { Check } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

function Pricing() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const isRTL = router.locale === 'ar';

    // State to track billing period
    const [billingPeriod, setBillingPeriod] = useState('monthly');

    // Get plans from translations
    const plans = t('pricing.plans', { returnObjects: true });

    return (
        <section id='pricing' className='py-24 bg-gray-50' dir={isRTL ? 'rtl' : 'ltr'}>
            <div className='container mx-auto px-4 lg:px-0 space-y-16'>
                <div className='text-center'>
                    <h2 className="text-4xl font-bold mb-4">{t('pricing.title')}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('pricing.description')}
                    </p>

                    <div className="flex flex-col items-center justify-center mt-8">
                        <div className="relative inline-flex items-center">
                            <div className="relative z-0 flex p-1 bg-gray-100 rounded-full shadow-inner">
                                <button
                                    onClick={() => setBillingPeriod('monthly')}
                                    className={`relative px-6 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-full whitespace-nowrap
                                    ${billingPeriod === 'monthly'
                                            ? 'text-white'
                                            : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {t('pricing.billingPeriods.monthly')}
                                    {billingPeriod === 'monthly' && (
                                        <span className="absolute inset-0 bg-black rounded-full"
                                            style={{
                                                zIndex: -1,
                                                transition: "all 0.3s ease"
                                            }}
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => setBillingPeriod('quarterly')}
                                    className={`relative px-6 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-full whitespace-nowrap
                                    ${billingPeriod === 'quarterly'
                                            ? 'text-white'
                                            : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {t('pricing.billingPeriods.quarterly')}
                                    {billingPeriod === 'quarterly' && (
                                        <span className="absolute inset-0 bg-black rounded-full"
                                            style={{
                                                zIndex: -1,
                                                transition: "all 0.3s ease"
                                            }}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        {billingPeriod === 'quarterly' && (
                            <span className="mt-2 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('pricing.billingPeriods.quarterlySavings')}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`group relative ${plan.badge
                                ? 'bg-black text-white'
                                : 'bg-white border-2 border-gray-200 hover:border-black'} 
                                rounded-3xl transition-colors`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-stone-300 text-black px-6 py-1 rounded-xl text-sm font-bold !z-50">
                                    {plan.badge}
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                                <p className={`${plan.badge ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                                    {plan.description}
                                </p>
                                <div className="mb-8">
                                    <span className="text-3xl font-bold">
                                        {billingPeriod === 'monthly' ? plan.monthly.price : plan.quarterly.price}
                                    </span>
                                    <span className={`ml-2 ${plan.badge ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {billingPeriod === 'monthly' ? plan.monthly.period : plan.quarterly.period}
                                    </span>
                                </div>

                                <div className="mb-8">
                                    <h4 className={`font-semibold mb-4 ${plan.badge ? 'text-gray-200' : 'text-gray-700'}`}>
                                        What's included:
                                    </h4>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3">
                                                <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.badge ? 'text-white' : 'text-black'}`} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href={`/request?plan=${encodeURIComponent(plan.name.toLowerCase().replace(' ', '-'))}${billingPeriod === 'quarterly' ? '&billing=quarterly' : ''}`}
                                    className={`w-full py-4 px-3 rounded-full font-semibold block text-center ${plan.badge
                                        ? 'bg-white text-black hover:bg-gray-100'
                                        : 'border-2 border-black text-black group-hover:bg-black group-hover:text-white'
                                        } transition-colors`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-lg mb-4">{t('pricing.helpChoosingText')}</p>
                    <Link href="/contact" className="text-black font-semibold underline">{t('pricing.contactSales')}</Link>
                </div>
            </div>
        </section>
    )
}

export default Pricing