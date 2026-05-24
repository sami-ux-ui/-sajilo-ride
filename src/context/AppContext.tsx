"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// ==========================================
// TRANSLATION SYSTEM (ENGLISH / NEPALI MAP)
// ==========================================

const translations = {
  en: {
    title: "Sajilo Ride",
    subtitle: "Premium Ride-Booking for Nepal",
    tagline: "Namaste! Travel across Nepal easily.",
    heroTitle: "Sajilo Ride: Premium & Cultural Ride Booking for Nepal",
    heroSubtitle: "Experience Nepal's first modern multi-vehicle ride platform. Fixed fair pricing, instant digital checkouts, and 90% payout commissions kept locally for Nepalese drivers.",
    bookNow: "Book Ride Now",
    driveWithUs: "Earn as Driver",
    login: "OTP Login",
    phone: "Phone Number",
    enterOtp: "Enter 4-Digit OTP",
    verify: "Verify & Proceed",
    logout: "Log Out",
    welcome: "Welcome back",
    
    // Categories
    categories: "Our Ride Categories",
    categoriesSub: "Choose a vehicle built for Nepalese road vibes, from traffic-beating EV scooters to comfortable city-to-city cabs.",
    auto: "Auto Rickshaw",
    bike: "Motorbike Ride",
    taxi: "Comfort Cab/Taxi",
    scooter: "Electric Scooter",
    city_to_city: "City-to-City Travel",
    
    // Landing Page sections
    howItWorks: "How Sajilo Works",
    whyChooseUs: "Why Choose Sajilo Ride",
    safetyFeatures: "Elite Safety & SOS Support",
    driverEarning: "90% Earning for Drivers",
    testimonials: "Voices of Sajilo Riders",
    citiesCovered: "Our Active Cities",
    faqs: "Frequently Asked Questions",
    
    // Booking Form
    pickup: "Select Pickup Location",
    destination: "Select Destination Location",
    estimateFare: "Estimate Fare",
    womenSafe: "Women-Safe Ride (Female Driver)",
    evEco: "EV Eco Mode (Bonus Green Points)",
    scheduleRide: "Schedule for Later Date/Time",
    instantBook: "Book Instantly",
    fareBreakdown: "AI Fixed Fare Breakdown",
    confirmBooking: "Confirm and Pay Digitally",
    payingWith: "Choose Payment Gateway",
    sosTriggered: "EMERGENCY SOS SIGNAL ACTIVATED! Police (100) and Sajilo Security are on the way. Coordinates shared.",
    
    // Dashboards
    dashboardCustomer: "Passenger Portal",
    dashboardDriver: "Driver Terminal",
    dashboardAdmin: "Sajilo Backoffice Command",
    greenPoints: "EV Green Points Balance",
    referralShare: "Share & Earn Free Credits",
    activeRide: "Active Trip Tracking",
    rideHistory: "Your Journey Ledger",
    driverHeatmap: "High Demand Density Map",
    revenueStats: "Sajilo Financial Analytics",
    commissionRate: "10% Platform Commission",
    driverStatus: "Work Status",
    online: "Online & Dispatchable",
    offline: "Offline / Sleeping",
    activeJobs: "Active Booking Alerts",
    acceptJob: "Accept Sajilo Job",
    verifyDriver: "Approve Driver Credentials",
    disputes: "Rider Dispute & Complaint Center",
    resolved: "Resolved",
    pending: "Pending Action"
  },
  ne: {
    title: "सजिलो राइड",
    subtitle: "नेपालको प्रिमियम राइड-बुकिङ सेवा",
    tagline: "नमस्ते! नेपालभर सजिलै यात्रा गर्नुहोस्।",
    heroTitle: "सजिलो राइड: प्रिमियम र नेपाली संस्कृति झल्कने राइड बुकिङ",
    heroSubtitle: "नेपालको पहिलो आधुनिक बहु-सवारी साधन प्लेटफर्मको अनुभव लिनुहोस्। निश्चित पारदर्शी मूल्य, तुरुन्त डिजिटल भुक्तानी, र नेपाली चालकहरूका लागि ९०% नेट आम्दानी सुनिश्चित।",
    bookNow: "राइड बुक गर्नुहोस्",
    driveWithUs: "चालक बन्नुहोस्",
    login: "ओटिपी लगइन",
    phone: "मोबाइल नम्बर",
    enterOtp: "४-अङ्कको OTP हाल्नुहोस्",
    verify: "प्रमाणित गरी अगाडि बढ्नुहोस्",
    logout: "लग आउट",
    welcome: "स्वागत छ",
    
    // Categories
    categories: "हाम्रा राइड श्रेणीहरू",
    categoriesSub: "नेपाली सडक सुहाउँदा सवारी साधन रोज्नुहोस्, ट्राफिक छल्ने इभी स्कुटरदेखि आरामदायी अन्तर-शहर ट्याक्सीसम्म।",
    auto: "अटो रिक्सा",
    bike: "मोटरसाइकल राइड",
    taxi: "आरामदायी कार/ट्याक्सी",
    scooter: "इलेक्ट्रिक स्कुटर",
    city_to_city: "शहर-देखि-शहर यात्रा",
    
    // Landing Page sections
    howItWorks: "सजिलोले कसरी काम गर्छ?",
    whyChooseUs: "सजिलो राइड किन रोज्ने?",
    safetyFeatures: "विशेष सुरक्षा र आपतकालीन SOS सेवा",
    driverEarning: "चालकलाई ९०% सीधै आम्दानी",
    testimonials: "सजिलो राइडरका अनुभवहरू",
    citiesCovered: "हाम्रा सक्रिय शहरहरू",
    faqs: "धेरै सोधिने प्रश्नहरू",
    
    // Booking Form
    pickup: "पिकअप स्थान छान्नुहोस्",
    destination: "गन्तव्य स्थान छान्नुहोस्",
    estimateFare: "भाडा दर हेर्नुहोस्",
    womenSafe: "महिला-सुरक्षित राइड (महिला चालक)",
    evEco: "इभी इको मोड (बोनस ग्रीन पोइन्टहरू)",
    scheduleRide: "भविष्यको लागि सेड्युल गर्नुहोस्",
    instantBook: "तुरुन्त बुक गर्नुहोस्",
    fareBreakdown: "AI निर्धारित भाडा विवरण",
    confirmBooking: "अनलाइन भुक्तानी गरी बुकिङ गर्नुहोस",
    payingWith: "भुक्तानी विधि छान्नुहोस्",
    sosTriggered: "आपतकालीन SOS सिग्नल सक्रिय भयो! प्रहरी (१००) र सजिलो सुरक्षा टोली परिचालन भएको छ। वर्तमान स्थान पठाइयो।",
    
    // Dashboards
    dashboardCustomer: "यात्री पोर्टल",
    dashboardDriver: "चालक टर्मिनल",
    dashboardAdmin: "सजिलो प्रशासनिक कमाण्ड",
    greenPoints: "इभी ग्रीन पोइन्ट ब्यालेन्स",
    referralShare: "रेफर गर्नुहोस् र क्रेडिट कमाउनुहोस्",
    activeRide: "सक्रिय यात्रा ट्र्याकिङ",
    rideHistory: "तपाईंको यात्रा इतिहास",
    driverHeatmap: "सवारी माग उच्च भएको क्षेत्र",
    revenueStats: "सजिलो वित्तीय विश्लेषण",
    commissionRate: "१०% प्लेटफर्म कमिसन",
    driverStatus: "कार्य स्थिति",
    online: "अनलाइन (बुकिङ लिन तयार)",
    offline: "अफलाइन (आराम गर्दै)",
    activeJobs: "नयाँ बुकिङ अनुरोधहरू",
    acceptJob: "सजिलो बुकिङ स्वीकार्नुहोस्",
    verifyDriver: "चालक कागजात स्वीकृत गर्नुहोस्",
    disputes: "यात्री विवाद र गुनासो समाधान केन्द्र",
    resolved: "समाधान भयो",
    pending: "प्रक्रियामा"
  }
};

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  // Language State
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  // Auth State
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'customer' | 'driver' | 'admin'>('customer');
  
  // Active Ride States
  const [activeRide, setActiveRide] = useState<any>(null);
  const [ridePhase, setRidePhase] = useState<'idle' | 'matching' | 'arriving' | 'in_trip' | 'completed'>('idle');
  const [simulatedDriver, setSimulatedDriver] = useState<any>(null);
  const [driverCoords, setDriverCoords] = useState<{lat: number, lng: number}>({ lat: 27.7172, lng: 85.3240 });
  const [simTimer, setSimTimer] = useState<NodeJS.Timeout | null>(null);
  const [distanceRemaining, setDistanceRemaining] = useState<number>(0);
  const [sosActive, setSosActive] = useState<boolean>(false);
  const [greenPoints, setGreenPoints] = useState<number>(120);

  // Localization translator
  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ne' : 'en');
  };

  // Mock Login with simulated OTP code
  const requestMockOTP = async (phone: string, role: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, role })
      });
      return await res.json();
    } catch (err) {
      // Offline fallback code generator
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      return { success: true, message: `OTP sent (Offline Mode)`, code };
    }
  };

  const verifyMockOTP = async (phone: string, otp: string, role: string, name?: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, role, name })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        setUserRole(role as any);
        if (role === 'customer') setGreenPoints(data.user.greenPoints || 0);
      }
      return data;
    } catch (err) {
      // Offline fallback verifier
      if (otp === "4321" || otp.length === 4) {
        const dummyUser = {
          id: role === 'driver' ? 'drv_mock_123' : 'usr_mock_123',
          name: name || (role === 'driver' ? 'Sita Shrestha' : 'Aarav Devkota'),
          phone,
          role,
          greenPoints: 120,
          referralCode: "SAJILOMOCK1",
          rating: 4.9,
          vehicle: role === 'driver' ? { type: 'scooter', name: 'Super Soco (EV)', plate: 'Ba 12 Pa 5678', color: 'Royal Blue' } : null,
          earnings: role === 'driver' ? { gross: 24200, net: 21780, commission: 2420 } : null
        };
        setUser(dummyUser);
        setToken("mock_token_jwt");
        setUserRole(role as any);
        return { success: true, user: dummyUser };
      }
      return { success: false, message: "Invalid OTP" };
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    setActiveRide(null);
    setRidePhase('idle');
    setSosActive(false);
  };

  // Automated Ride simulation for beautiful local execution
  const startRideSimulation = (rideDetails: any) => {
    if (simTimer) clearInterval(simTimer);
    setActiveRide(rideDetails);
    setRidePhase('matching');
    setSosActive(false);

    // Step 1: Matching Animation (takes 3 seconds)
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      if (seconds === 3) {
        clearInterval(interval);
        // Bind a driver: Sita Shrestha by default
        const mockDriver = {
          id: "drv_2",
          name: "Sita Shrestha (Eco-EV Driver)",
          avatar: "nepali_jacket_woman.png",
          rating: 4.9,
          vehicle: {
            type: "scooter",
            name: "Super Soco CPx (Electric)",
            plate: "Ba 12 Pa 5678",
            color: "Royal Blue"
          },
          gender: "female"
        };
        setSimulatedDriver(mockDriver);
        setRidePhase('arriving');
        
        // Starting coordinates (Thamel area)
        setDriverCoords({ lat: 27.7172, lng: 85.3240 });

        // Phase 2: Driver Arriving (ticking path towards passenger pickup)
        let arriveStep = 0;
        const arriveInterval = setInterval(() => {
          arriveStep++;
          // Animate driver moving closer to pickup center
          setDriverCoords({
            lat: 27.7172 - (arriveStep * 0.0006),
            lng: 85.3240 - (arriveStep * 0.0005)
          });
          setDistanceRemaining(parseFloat((1.2 - arriveStep * 0.1).toFixed(1)));

          if (arriveStep >= 12) {
            clearInterval(arriveInterval);
            // Driver arrived! Transition to Phase 3: In Trip (takes 10 steps to destination)
            setRidePhase('in_trip');
            setDistanceRemaining(rideDetails.distanceKm || 5.4);

            let tripStep = 0;
            const tripInterval = setInterval(() => {
              tripStep++;
              // Animate driver moving towards Lalitpur/Patan destination
              setDriverCoords({
                lat: 27.7100 - (tripStep * 0.0035),
                lng: 85.3180 + (tripStep * 0.0004)
              });
              setDistanceRemaining(prev => Math.max(0, parseFloat((rideDetails.distanceKm - (tripStep * (rideDetails.distanceKm / 10))).toFixed(1))));

              if (tripStep >= 10) {
                clearInterval(tripInterval);
                // Phase 4: Completed
                setRidePhase('completed');
                confetti({
                  particleCount: 150,
                  spread: 80,
                  origin: { y: 0.6 }
                });
                
                // Award EV points if ride is EV
                if (rideDetails.isEV) {
                  setGreenPoints(prev => prev + 20);
                }
              }
            }, 1000);
            setSimTimer(tripInterval);
          }
        }, 600);
        setSimTimer(arriveInterval);
      }
    }, 1000);
    setSimTimer(interval);
  };

  const cancelActiveRide = () => {
    if (simTimer) clearInterval(simTimer);
    setRidePhase('idle');
    setActiveRide(null);
    setSimulatedDriver(null);
    setSosActive(false);
  };

  const triggerSOS = () => {
    setSosActive(true);
    alert(t('sosTriggered'));
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      lang, toggleLanguage, t,
      user, setUser, token, userRole, setUserRole, logOut,
      requestMockOTP, verifyMockOTP,
      activeRide, ridePhase, setActiveRide, setRidePhase,
      simulatedDriver, driverCoords, distanceRemaining,
      startRideSimulation, cancelActiveRide, triggerSOS, sosActive,
      greenPoints, setGreenPoints
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
