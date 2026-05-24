"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Smartphone, MapPin, ShieldCheck, HelpCircle, 
  ArrowRight, Users, CheckCircle, Star, Sparkles, 
  Map, DollarSign, Heart, Compass, ShieldAlert, Award
} from 'lucide-react';

export default function LandingPage() {
  const { theme, lang, t } = useApp();
  
  // Custom states for interactive FAQs and Cities
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedCity, setSelectedCity] = useState<string>("Kathmandu");

  // Fictional Nepali Testimonials
  const testimonials = [
    {
      name: "Aarav Devkota",
      location: "Lalitpur",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
      comment: lang === 'en' 
        ? "Sajilo's fixed pricing is a lifesaver during traffic. I know exactly how much I am paying before starting my trip from Lalitpur to Thamel. Highly recommended!"
        : "ट्राफिक जामको समयमा सजिलोको निश्चित भाडा प्रणाली निकै उपयोगी छ। ललितपुरदेखि ठमेलसम्मको भाडा पहिल्यै थाहा पाउनु निकै सजिलो छ। सबैलाई सिफारिस गर्छु!"
    },
    {
      name: "Pooja Karki",
      location: "Pokhara Lakeside",
      role: "Travel Blogger",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
      comment: lang === 'en'
        ? "I always toggle EV Eco Mode to book electric scooters. Getting bonus green points while riding through beautiful lakeside Pokhara is incredibly rewarding!"
        : "म सधैं इलेक्ट्रिक स्कुटर बुक गर्न इभी इको मोड अन गर्छु। सुन्दर पोखरा लेकसाइडमा यात्रा गर्दा बोनस ग्रीन पोइन्टहरू प्राप्त गर्नु निकै रमाइलो छ!"
    },
    {
      name: "Biraj Thapa",
      location: "Kathmandu",
      role: "Sajilo Pro Driver",
      avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=120",
      comment: lang === 'en'
        ? "Keeping 90% of my net fare has completely changed my daily livelihood. Sajilo respects drivers, pays out instantly, and protects us with direct insurance."
        : "आफ्नो भाडाको ९०% सीधै प्राप्त गर्दा मेरो दैनिक जीविकोपार्जनमा निकै सुधार भएको छ। सजिलोले चालकलाई सम्मान गर्छ, तुरुन्त भुक्तानी गर्छ, र बीमा पनि प्रदान गर्छ।"
    }
  ];

  // Active cities data
  const cities = [
    { name: "Kathmandu", desc: lang === 'en' ? "Hub of historical valleys & busy streets" : "ऐतिहासिक उपत्यका र व्यस्त सडकहरूको केन्द्र", rides: "150K+", drivers: "5,000+" },
    { name: "Pokhara", desc: lang === 'en' ? "Lakeside views & eco-friendly rides" : "तालको किनारा र पर्यावरण-अनुकूल यात्राहरू", rides: "80K+", drivers: "2,500+" },
    { name: "Lalitpur", desc: lang === 'en' ? "Cultural squares & artful alleys" : "सांस्कृतिक दरवार क्षेत्र र कलात्मक गल्लीहरू", rides: "60K+", drivers: "1,800+" },
    { name: "Bhaktapur", desc: lang === 'en' ? "Ancient brick architecture pathways" : "प्राचीन ईंट वास्तुकला र सम्पदा मार्गहरू", rides: "40K+", drivers: "1,200+" },
    { name: "Chitwan", desc: lang === 'en' ? "National park safari & plains transit" : "राष्ट्रिय निकुञ्ज सफारी र तराईको ट्रान्जिट", rides: "30K+", drivers: "800+" },
    { name: "Butwal", desc: lang === 'en' ? "Commercial city crossing & rapid travel" : "व्यापारिक केन्द्र र द्रुत यात्रा", rides: "25K+", drivers: "650+" },
    { name: "Biratnagar", desc: lang === 'en' ? "Industrial zones & eastern plains routes" : "औद्योगिक क्षेत्र र पूर्वी तराई मार्गहरू", rides: "20K+", drivers: "500+" }
  ];

  // FAQs data
  const faqs = [
    {
      q: lang === 'en' ? "Is Sajilo Ride really fixed pricing?" : "के सजिलो राइडमा साँच्चै निश्चित भाडा प्रणाली छ?",
      a: lang === 'en' 
        ? "Yes! Unlike bidding systems where you have to constantly bargain, Sajilo Ride uses an AI fare estimation engine that secures a fixed transparent price before booking. No surprise surges, no stressful negotiations."
        : "हो! लगातार मोलतोल गर्नुपर्ने बिडिङ प्रणालीको विपरित, सजिलो राइडले एआई भाडा अनुमान इन्जिन प्रयोग गरी बुकिङ गर्नु अगावै निश्चित पारदर्शी भाडा तय गर्छ। कुनै अतिरिक्त शुल्क वा तनावपूर्ण मोलतोल हुँदैन।"
    },
    {
      q: lang === 'en' ? "How does the 90% driver payout work?" : "चालकको ९०% भुक्तानी कसरी काम गर्छ?",
      a: lang === 'en'
        ? "Sajilo is built to empower Nepalese drivers. We only take a 10% platform commission to keep operational infrastructure secure, while drivers keep 90% of their gross earnings, paid out instantly to eSewa or Khalti wallets."
        : "सजिलो नेपाली चालकहरूलाई सशक्त बनाउन निर्माण गरिएको हो। हामी सञ्चालन प्रणाली सुरक्षित राख्न केवल १०% प्लेटफर्म कमिसन लिन्छौं, जबकि चालकहरूले आफ्नो कुल कमाइको ९०% राख्छन् र तुरुन्तै ईसेवा वा खल्ती वालेटमा प्राप्त गर्छन्।"
    },
    {
      q: lang === 'en' ? "What is EV Eco Mode?" : "इभी इको मोड के हो?",
      a: lang === 'en'
        ? "EV Eco Mode lets passengers filter and book 100% electric scooters or electric taxis. By choosing green mobility, passengers earn double 'EV Green Points' which can be redeemed for promo codes and discounts!"
        : "इभी इको मोडले यात्रीहरूलाई १००% विद्युतीय स्कुटर वा विद्युतीय ट्याक्सी फिल्टर र बुक गर्न अनुमति दिन्छ। हरित सवारी रोज्दा, यात्रीहरूले दोब्बर 'इभी ग्रीन पोइन्टहरू' प्राप्त गर्छन् जसलाई प्रमो कोड र छुटहरूमा साट्न सकिन्छ!"
    },
    {
      q: lang === 'en' ? "Is the Women-Safe Ride feature secure?" : "महिला-सुरक्षित राइड कत्तिको सुरक्षित छ?",
      a: lang === 'en'
        ? "Absolutely. When female riders toggle 'Women-Safe Ride', our system matches them exclusively with highly-rated verified female drivers. We also provide a direct Emergency SOS button linked to local authorities and Sajilo safety cells."
        : "पूर्ण रूपमा सुरक्षित छ। जब महिला यात्रीहरूले 'महिला-सुरक्षित राइड' अन गर्छन्, हाम्रो प्रणालीले उनीहरूलाई उच्च-रेटेड प्रमाणित महिला चालकहरूसँग मात्र जोड्दछ। हामी स्थानीय प्रहरी र सजिलो सुरक्षा टोलीसँग जोडिएको आपतकालीन SOS बटन पनि प्रदान गर्छौं।"
    }
  ];

  return (
    <div className={`transition-colors duration-300 ${
      theme === 'dark' ? 'bg-dark-bg text-white' : 'bg-light-bg text-slate-800'
    }`}>

      {/* ==========================================
          1. HERO SECTION WITH HIMALAYAN NIGHTLIFE VIBE
          ========================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Animated Background Glowing Gradients */}
        <div className="absolute top-10 left-10 w-[30vw] h-[30vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[30vw] h-[30vw] rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />
        
        {/* Floating Particles Backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 95}%`,
                top: `${80 + Math.random() * 20}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 5}s`
              }} 
            />
          ))}
        </div>

        {/* Dynamic Himalayan Mountains Vector Silhouette */}
        <div className="absolute bottom-0 inset-x-0 h-[220px] pointer-events-none opacity-[0.06] dark:opacity-[0.09] himalaya-silhouette">
          <svg className="w-full h-full" viewBox="0 0 1440 220" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 220H1440V120L1320 80L1200 130L1080 70L960 120L840 50L720 110L600 40L480 120L360 80L240 140L120 70L0 120V220Z" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Animated Hero Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-slate-500/10 px-4 py-2 rounded-full border border-white/5">
              <Sparkles className="w-4 h-4 text-saffron animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-saffron">
                {t('tagline')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {lang === 'en' ? (
                <>
                  Travel Across <span className="bg-gradient-to-r from-primary to-saffron bg-clip-text text-transparent">Nepal</span> with <span className="bg-gradient-to-r from-saffron via-white to-secondary bg-clip-text text-transparent">Premium</span> Ease
                </>
              ) : (
                <>
                  सजिलो यात्रा, <span className="bg-gradient-to-r from-primary to-saffron bg-clip-text text-transparent">प्रिमियम</span> सेवा – नेपालको <span className="bg-gradient-to-r from-secondary to-saffron bg-clip-text text-transparent">आफ्नै</span>
                </>
              )}
            </h1>

            <p className={`text-base sm:text-lg font-medium leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('heroSubtitle')}
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/book" 
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center space-x-2 group"
                id="hero-book-now-btn"
              >
                <span>{t('bookNow')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              
              <Link 
                href="/book?role=driver" 
                className="w-full sm:w-auto px-8 py-4 bg-slate-500/10 hover:bg-slate-500/20 text-saffron border border-saffron/20 font-extrabold text-sm rounded-2xl transition-all flex items-center justify-center space-x-2"
                id="hero-driver-btn"
              >
                <Award className="w-4 h-4 text-saffron" />
                <span>{t('driveWithUs')}</span>
              </Link>
            </div>

            {/* Supports eSewa, Khalti, IME Pay badges */}
            <div className="pt-4 border-t border-slate-500/10 space-y-2">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {t('eSewaKhalti')}
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap opacity-80">
                <span className="px-3 py-1 text-[10px] font-black rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">eSewa Verified</span>
                <span className="px-3 py-1 text-[10px] font-black rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">Khalti SDK</span>
                <span className="px-3 py-1 text-[10px] font-black rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20">IME Pay</span>
                <span className="px-3 py-1 text-[10px] font-black rounded-lg bg-slate-500/15 text-slate-400">Cash Option</span>
              </div>
            </div>

          </motion.div>

          {/* Majestic Hero Smartphone Mockup Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-[320px] h-[640px] rounded-[48px] bg-slate-900 p-3.5 shadow-2xl ring-12 ring-slate-800 border-4 border-slate-700/50">
              
              {/* Camera Notch notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-5 rounded-full bg-slate-950 flex items-center justify-center z-20">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800" />
              </div>

              {/* Dynamic Screen Viewport */}
              <div className="w-full h-full rounded-[38px] bg-dark-bg overflow-hidden relative border border-slate-800 flex flex-col justify-between">
                
                {/* Smartphone map backdrop */}
                <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />

                {/* Smartphone Custom Vector Map Illustration */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

                {/* Top header bar */}
                <div className="relative z-10 px-6 pt-8 pb-3 bg-gradient-to-b from-dark-bg to-transparent flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Sajilo App</span>
                    <span className="text-sm font-black text-white">Kathmandu Center</span>
                  </div>
                  <span className="bg-green-500/20 text-green-500 text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">ACTIVE DRIVERS: 504</span>
                </div>

                {/* Simulated Interactive Booking card */}
                <div className="relative z-10 p-5 mx-4 mb-6 rounded-3xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[10px] text-saffron font-bold">★ MOCK APP PREVIEW</span>
                    <span className="text-[10px] text-slate-400">9:41 AM</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                      <span className="text-xs font-bold text-white">Thamel Chowk, KTM</span>
                    </div>
                    <div className="h-4 w-0.5 bg-slate-700 ml-1.25" />
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="text-xs font-bold text-white">Lakeside, Pokhara (City-to-City)</span>
                    </div>
                  </div>

                  {/* Pricing and Category mockup */}
                  <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <div>
                      <span className="text-[8px] text-slate-400 uppercase block">EV Scooter Eco mode</span>
                      <span className="text-xs font-black text-white">NPR 150 <span className="text-[9px] text-green-500 font-bold">(-8% EV Save)</span></span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-primary text-white text-[9px] font-black uppercase">Fixed Fare</span>
                  </div>

                  <Link href="/book" className="block text-center w-full py-2.5 bg-primary text-white rounded-xl text-xs font-black hover:bg-primary-dark transition-colors">
                    {t('confirmBooking')}
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ==========================================
          2. DOWNLOAD APP BUTTONS SECTION
          ========================================== */}
      <section className={`py-10 border-y ${theme === 'dark' ? 'border-white/5 bg-slate-950/40' : 'border-slate-200 bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-black">{lang === 'en' ? "Get the Sajilo Mobile App" : "सजिलो मोबाइल एप डाउनलोड गर्नुहोस्"}</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm font-medium">
            {lang === 'en' 
              ? "Book rides in seconds, track drivers live, activate SOS triggers, and pay cashless through secure gateway protocols built natively in our iOS & Android platforms."
              : "सेकेन्डमै राइड बुक गर्नुहोस्, चालकलाई लाइभ ट्र्याक गर्नुहोस्, आपतकालीन SOS सक्रिय गर्नुहोस्, र सुरक्षित भुक्तानी विधि प्रयोग गरी नगदरहित यात्रा गर्नुहोस्।"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Google Play Store button */}
            <button className="flex items-center space-x-3 bg-black hover:bg-slate-900 border border-white/10 text-white px-6 py-3 rounded-2xl shadow-xl w-52 text-left transition-all">
              <Smartphone className="w-8 h-8 text-saffron" />
              <div>
                <span className="block text-[9px] uppercase font-bold text-slate-400">Download for</span>
                <span className="block text-sm font-black tracking-wider">Android APK</span>
              </div>
            </button>
            
            {/* Apple App Store button */}
            <button className="flex items-center space-x-3 bg-black hover:bg-slate-900 border border-white/10 text-white px-6 py-3 rounded-2xl shadow-xl w-52 text-left transition-all">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5ZM15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C15.85 1.04 14.51 1.73 13.73 2.64C13.07 3.41 12.49 4.52 12.64 5.78C13.87 5.87 15.12 5.17 15.97 4.17Z" />
              </svg>
              <div>
                <span className="block text-[9px] uppercase font-bold text-slate-400">Download on</span>
                <span className="block text-sm font-black tracking-wider">Apple iOS</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. HOW IT WORKS SECTION
          ========================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="how-it-works">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Sajilo Process</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('howItWorks')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", tKey: "pickup", desc: lang === 'en' ? "Open the app and select your pickup point and destination anywhere in the city." : "एप खोलेर आफ्नो पिकअप र गन्तव्य स्थान छान्नुहोस्।" },
            { step: "02", tKey: "estimateFare", desc: lang === 'en' ? "Select your vehicle and review your AI-estimated fixed fare. No dynamic surge hidden surprises." : "आफ्नो सवारी रोज्नुहोस् र पारदर्शी एआई भाडा दर सुनिश्चित गर्नुहोस्।" },
            { step: "03", tKey: "confirmBooking", desc: lang === 'en' ? "Pay cashless instantly via integrated partners (eSewa, Khalti, IME Pay) or select standard Cash." : "ईसेवा, खल्ती, आईएमई पे वा नगद मार्फत तुरुन्त भुक्तानी गर्नुहोस्।" },
            { step: "04", tKey: "activeRide", desc: lang === 'en' ? "Track your verified local driver live on our vector canvas map and travel safely to your drop-off." : "नक्सामा आफ्नो चालकलाई लाइभ ट्र्याक गर्नुहोस् र सुरक्षित यात्रा गर्नुहोस्।" }
          ].map((item, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border transition-all ${
              theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-white/10' : 'bg-white border-slate-200 hover:shadow-lg'
            }`}>
              <span className="text-3xl font-black text-saffron block mb-3">{item.step}</span>
              <h3 className="text-base font-extrabold text-white mb-2">{t(item.tKey)}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          4. RIDE CATEGORIES SECTION
          ========================================== */}
      <section className={`py-20 border-y ${theme === 'dark' ? 'border-white/5 bg-slate-950/20' : 'border-slate-200 bg-slate-50'}`} id="categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">Nepali Road Fleet</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('categories')}</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">{t('categoriesSub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { type: "auto", tKey: "auto", desc: lang === 'en' ? "Three-wheeled rickshaws for quick tight shortcuts" : "छोटा सडक र छिटो यात्राका लागि प्रसिद्ध तीन-पाङ्ग्रे अटो", rates: "Base: NPR 50 • Per Km: 35" },
              { type: "bike", tKey: "bike", desc: lang === 'en' ? "Standard motorbikes to bypass major city congestion" : "सडकको ट्राफिक छल्न तीव्र गतिको मोटरसाइकल यात्रा", rates: "Base: NPR 30 • Per Km: 20" },
              { type: "taxi", tKey: "taxi", desc: lang === 'en' ? "Spacious, comfortable cabs for family travel" : "परिवारसँग आरामदायी र सुरक्षित कार/ट्याक्सी यात्रा", rates: "Base: NPR 80 • Per Km: 60" },
              { type: "scooter", tKey: "scooter", desc: lang === 'en' ? "100% Electric scooters for eco-conscious commuting" : "पर्यावरण-मैत्री र कम खर्चिलो इलेक्ट्रिक स्कुटर", rates: "Base: NPR 25 • Per Km: 15" },
              { type: "city_to_city", tKey: "city_to_city", desc: lang === 'en' ? "Comfortable inter-city schedules for longer transits" : "एक शहरदेखि अर्को शहरसम्मको सुरक्षित लामो यात्रा", rates: "Base: NPR 600 • Per Km: 75" }
            ].map((cat, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all group hover:-translate-y-1.5 ${
                  theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-primary/20' : 'bg-white border-slate-200 hover:shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-saffron group-hover:scale-110 transition-transform">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-white group-hover:text-primary transition-colors">{t(cat.tKey)}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{cat.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5">
                  <span className="block text-[10px] uppercase font-bold text-saffron">{cat.rates}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          5. WHY CHOOSE US SECTION
          ========================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Sajilo Advantage</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('whyChooseUs')}</h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'en'
                ? "Sajilo is engineered specifically for Nepalese urban challenges. We merge dynamic tech platforms with local road layouts, fixed transparent fares, sustainable EV fleets, and unmatched safety safeguards."
                : "सजिलो विशेष गरी नेपाली सडक र यात्राका चुनौतीहरूलाई मध्यनजर गरेर निर्माण गरिएको हो। हामी प्राविधिक विकास र स्थानीय आवश्यकतालाई जोड्दै निश्चित भाडा, हरित सवारी र उत्कृष्ट सुरक्षा प्रदान गर्दछौं।"}
            </p>

            <div className="space-y-4 pt-4">
              {[
                { title: lang === 'en' ? "Fixed Transparent Prices" : "निश्चित पारदर्शी भाडा", desc: lang === 'en' ? "No dynamic surges or bidding stress. Know your exact price before booking." : "कुनै लुकेको अतिरिक्त शुल्क वा मोलतोलको झन्झट हुँदैन।" },
                { title: lang === 'en' ? "Sustainable EV Mobility Focus" : "पर्यावरण-अनुकूल हरित सवारी", desc: lang === 'en' ? "Book eco-scooters, earn EV green points, and redeem them for free ride credits." : "हरित सवारी रोजेर वातावरण संरक्षणमा सहयोग पुऱ्याउनुहोस् र थप छुट पाउनुहोस्।" },
                { title: lang === 'en' ? "90% Earning Kept Locally" : "९०% आम्दानी सीधै नेपाली चालकलाई", desc: lang === 'en' ? "Support local livelihoods. Sajilo only keeps 10% platform administration cuts." : "हाम्रा चालकहरूले आफ्नो कुल कमाइको ९०% राख्छन्, जसले स्थानीय अर्थतन्त्रलाई बढावा दिन्छ।" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-sm text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] border border-white/5">
            {/* Visual illustration slot showcasing Nepal backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-slate-900 to-secondary/20 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-950 via-slate-900/60 to-transparent z-15" />
            
            {/* Text Overlay inside picture box */}
            <div className="absolute bottom-8 left-8 right-8 z-20 space-y-3">
              <span className="px-3 py-1 bg-saffron text-dark-bg text-[10px] font-black rounded-lg uppercase inline-block">NEPALESE CULTURAL BORDER</span>
              <h3 className="text-xl font-extrabold text-white">Kathmandu Valley Transit Grid</h3>
              <p className="text-xs text-slate-300">
                {lang === 'en' ? "Connecting Thamel, Patan, Bhaktapur, Pokhara and beyond with highly-rated drivers wearing traditional jackets." : "ठमेल, पाटन, भक्तपुर, पोखरा लगायतका शहरहरूमा हाम्रा उच्च रेटेड चालकहरू मार्फत सेवा।"}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          6. SAFETY FEATURES & SOS PANIC BUTTON
          ========================================== */}
      <section className={`py-20 border-y ${theme === 'dark' ? 'border-white/5 bg-red-950/5' : 'border-slate-200 bg-red-50/20'}`} id="safety">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex justify-center order-last lg:order-first">
            {/* Massive Glowing interactive Mock SOS Trigger */}
            <div className="relative p-8 rounded-full bg-rose-500/10 border-4 border-rose-500/20 w-64 h-64 flex items-center justify-center shadow-inner group">
              <div className="absolute inset-4 rounded-full bg-rose-600/20 animate-ping pointer-events-none" />
              <button 
                id="landing-sos-panic-btn"
                onClick={() => alert(t('sosTriggered'))}
                className="w-44 h-44 rounded-full bg-gradient-to-tr from-primary to-rose-600 shadow-xl shadow-rose-600/40 hover:scale-105 hover:shadow-rose-600/65 active:scale-95 transition-all text-white font-black uppercase text-xl flex flex-col items-center justify-center space-y-1 sos-glow"
              >
                <ShieldAlert className="w-10 h-10 text-white animate-bounce" />
                <span>SOS PANIC</span>
                <span className="text-[9px] text-white/80 font-bold">Press to test</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Safety Safeguard</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('safetyFeatures')}</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'en'
                ? "Your security is our topmost pride. Every Sajilo ride is monitored live by GPS coordinates. Our emergency suite triggers direct local authority signals and notifies family contacts instantly."
                : "तपाईंको सुरक्षा नै हाम्रो मुख्य प्राथमिकता हो। सजिलोका हरेक यात्राहरू नक्सामा प्रत्यक्ष ट्र्याक गरिन्छ र आपतकालीन समयमा सुरक्षा कमाण्ड सक्रिय पारिन्छ।"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { title: lang === 'en' ? "Emergency SOS Button" : "आपतकालीन SOS बटन", desc: lang === 'en' ? "Instant notification to Nepal Police (100) and family." : "प्रहरी र परिवारलाई तुरुन्तै वर्तमान स्थानको जानकारी।" },
                { title: lang === 'en' ? "Verified Women-Safe Rides" : "महिला-सुरक्षित राइड विकल्प", desc: lang === 'en' ? "Connect female passengers exclusively to certified female drivers." : "महिला यात्रीहरूका लागि प्रमाणित महिला चालकको मात्र व्यवस्था।" },
                { title: lang === 'en' ? "Dynamic Trip Link Sharing" : "लाइभ यात्रा साझेदारी", desc: lang === 'en' ? "Share your ongoing live map coordinate path to anyone." : "आफ्नो यात्रा मार्ग परिवार वा साथीहरूलाई सेयर गर्नुहोस्।" },
                { title: lang === 'en' ? "Driver Identity Verification" : "चालकको लाइसेन्स प्रमाणीकरण", desc: lang === 'en' ? "Every single driver wears a verification badge with document checks." : "हरेक चालकको सरकारी कागजात र पृष्ठभूमि जाँच गरिएको हुन्छ।" }
              ].map((safety, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-primary" /> {safety.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{safety.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          7. DRIVER EARNING & SUBSCRIPTION SECTION
          ========================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="earnings">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">Driver Empowerment</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('driverEarning')}</h2>
            <div className="h-1 w-20 bg-secondary rounded-full" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'en'
                ? "Sajilo Ride features a fair commission architecture. We pledge that 90% of every net ride fare goes directly to driver bank or wallet accounts, while our 10% platform administration fee fuels technical framework expansion."
                : "सजिलो राइडले निष्पक्ष कमिसन नीति अवलम्बन गरेको छ। हरेक यात्राको कुल भाडाको ९०% सीधै चालकको वालेटमा जान्छ भने प्लेटफर्मको कमिसन मात्र १०% रहनेछ।"}
            </p>

            <div className="bg-slate-500/10 p-5 rounded-2xl border border-white/5 space-y-4">
              <h4 className="font-extrabold text-sm text-saffron">{lang === 'en' ? "Optional Premium Driver Subscription Plans" : "वैकल्पिक प्रिमियम चालक सदस्यता योजना"}</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                {lang === 'en' 
                  ? "Drivers can opt out of the 10% commission completely by choosing our subscription tier. Pay a fixed weekly fee and keep 100% of all bookings!"
                  : "चालकहरूले १०% कमिसन तिर्नुको सट्टा हाम्रो साप्ताहिक सदस्यता योजना लिएर सबै बुकिङको १००% कमाइ आफै राख्न सक्छन्!"}
              </p>
              <div className="flex items-center space-x-2 text-xs text-white font-bold">
                <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-lg">Keep 100% Net Fare</span>
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg">NPR 499 / Week</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "90%", label: lang === 'en' ? "Driver Earning Share" : "चालकको नेट आम्दानी हिस्सा", color: "text-primary" },
              { title: "10%", label: lang === 'en' ? "Platform Commission" : "सजिलो प्लेटफर्म कमिसन", color: "text-secondary" },
              { title: "1-Click", label: lang === 'en' ? "Instant Wallet Payout" : "तुरुन्तै भुक्तानी फिर्ता", color: "text-saffron" },
              { title: "Free", label: lang === 'en' ? "First 3 Rides for New Drivers" : "नयाँ चालकलाई सुरुका ३ राइड नि:शुल्क", color: "text-green-500" }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center space-y-2">
                <span className={`text-3xl font-black block ${stat.color}`}>{stat.title}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          8. TESTIMONIALS SECTION
          ========================================== */}
      <section className={`py-20 border-y ${theme === 'dark' ? 'border-white/5 bg-slate-950/20' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Sajilo Community</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('testimonials')}</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:shadow-lg ${
                  theme === 'dark' ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <p className="text-xs sm:text-sm italic text-slate-300 leading-relaxed mb-6">
                  &ldquo;{test.comment}&rdquo;
                </p>
                <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-saffron bg-slate-800 flex-shrink-0">
                    <img src={test.avatar} alt={test.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block text-xs font-black">{test.name}</span>
                    <span className="block text-[10px] text-slate-400 font-bold">{test.role} • {test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          9. CITY COVERAGE GRID SECTION
          ========================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">Active Coverage</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('citiesCovered')}</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cities list grid */}
          <div className="space-y-2 lg:col-span-1">
            {cities.map((city, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCity(city.name)}
                className={`w-full text-left p-4 rounded-xl flex items-center justify-between transition-all font-extrabold text-sm ${
                  selectedCity === city.name 
                    ? 'bg-primary text-white scale-[1.02] shadow-lg shadow-primary/20' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <span>{city.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Selected City details panel */}
          <div className={`p-8 rounded-3xl border lg:col-span-2 flex flex-col justify-between ${
            theme === 'dark' ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-800 shadow-xl'
          }`}>
            <div className="space-y-4">
              <span className="px-3 py-1 bg-saffron text-dark-bg text-[10px] font-black rounded-lg uppercase tracking-wider inline-block">Sajilo Hub</span>
              <h3 className="text-3xl font-extrabold">{selectedCity} Hub Operations</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {cities.find(c => c.name === selectedCity)?.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Total Rides Completed</span>
                <span className="text-2xl font-black text-primary">{cities.find(c => c.name === selectedCity)?.rides}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Active Sajilo Drivers</span>
                <span className="text-2xl font-black text-secondary">{cities.find(c => c.name === selectedCity)?.drivers}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          10. FAQ ACCORDION SECTION
          ========================================== */}
      <section className={`py-20 border-t ${theme === 'dark' ? 'border-white/5 bg-slate-950/20' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Sajilo Helpdesk</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('faqs')}</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl border overflow-hidden transition-all ${
                  theme === 'dark' ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-extrabold text-sm focus:outline-none"
                  id={`faq-btn-${idx}`}
                >
                  <span>{faq.q}</span>
                  <span className="text-primary font-black text-lg">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                
                {activeFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          11. FOOTER WITH NEPALI CULTURAL VIBE
          ========================================== */}
      <footer className={`py-12 border-t ${theme === 'dark' ? 'bg-dark-bg border-white/5 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-primary to-saffron bg-clip-text text-transparent">SAJILO RIDE</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Sajilo Ride is Nepal's first premium and cultural multi-vehicle dispatch service platform. Built natively for Kathmandu, Pokhara, and expanding nationwide.
            </p>
            <span className="block text-[10px] text-saffron font-bold">© 2026 Sajilo Ride Pvt. Ltd.</span>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400">Rider Hub</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-bold">
              <li><Link href="/book" className="hover:text-primary">Book an auto rickshaw</Link></li>
              <li><Link href="/book" className="hover:text-primary">Book a motorcycle</Link></li>
              <li><Link href="/book" className="hover:text-primary">Electric Eco-scooters</Link></li>
              <li><Link href="/book" className="hover:text-primary">City-to-City rates</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400">Driver Portal</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-bold">
              <li><Link href="/book?role=driver" className="hover:text-primary">Driver Registration</Link></li>
              <li><Link href="/book?role=driver" className="hover:text-primary">Subscription details</Link></li>
              <li><Link href="/book?role=driver" className="hover:text-primary">Accident Insurance</Link></li>
              <li><Link href="/book?role=driver" className="hover:text-primary">Driver Code of Conduct</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400">Safety & Security</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-bold">
              <li><button onClick={() => alert(t('sosTriggered'))} className="hover:text-primary text-left">Trigger SOS Panic</button></li>
              <li><Link href="/#safety" className="hover:text-primary">Women-Safe protocols</Link></li>
              <li><Link href="/#safety" className="hover:text-primary">GPS Ride tracking details</Link></li>
              <li><Link href="/#faqs" className="hover:text-primary">Customer Dispute solver</Link></li>
            </ul>
          </div>

        </div>
        
        {/* Saffron and Blue thin colored line at very bottom */}
        <div className="mt-8 border-t border-slate-500/10 pt-4 text-center">
          <div className="flex justify-center space-x-1.5 mb-2">
            <span className="w-8 h-1.5 rounded-full bg-primary" />
            <span className="w-8 h-1.5 rounded-full bg-saffron" />
            <span className="w-8 h-1.5 rounded-full bg-secondary" />
          </div>
          <span className="text-[10px] text-slate-400 font-black">Proudly Engineered and Kept 100% in Nepal • सजिलो यात्रा • जय नेपाल</span>
        </div>
      </footer>

    </div>
  );
}
