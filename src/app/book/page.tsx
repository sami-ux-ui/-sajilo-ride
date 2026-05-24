"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import MapComponent from '@/components/MapComponent';
import { 
  Smartphone, MapPin, Calendar, Clock, Gift, Shield, 
  Sparkles, CheckCircle2, AlertTriangle, Star, Check, 
  Volume2, Compass, ShieldAlert, ArrowRight, UserCheck 
} from 'lucide-react';

export default function BookPage() {
  const { 
    theme, lang, t, 
    user, userRole, setUserRole, verifyMockOTP, requestMockOTP,
    activeRide, ridePhase, startRideSimulation, cancelActiveRide,
    simulatedDriver, distanceRemaining, triggerSOS, sosActive, greenPoints
  } = useApp();

  // Onboarding States
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [otpInput, setOtpInput] = useState<string>("");
  const [otpStep, setOtpStep] = useState<'phone' | 'otp'>('phone');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [showSmsBanner, setShowSmsBanner] = useState<boolean>(false);

  // Booking Form States
  const [pickup, setPickup] = useState<string>("Thamel, Kathmandu");
  const [destination, setDestination] = useState<string>("Patan Durbar Square, Lalitpur");
  const [vehicleType, setVehicleType] = useState<'auto' | 'bike' | 'taxi' | 'scooter' | 'city_to_city'>('scooter');
  const [promoInput, setPromoInput] = useState<string>("");
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [appliedPromo, setAppliedPromo] = useState<string>("");
  const [isEV, setIsEV] = useState<boolean>(true);
  const [isWomenSafe, setIsWomenSafe] = useState<boolean>(false);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<string>("");

  // Fare calculations
  const [fareDetails, setFareDetails] = useState<any>({
    distanceKm: 5.4,
    durationMins: 18,
    basePrice: 106,
    trafficMultiplier: 1.0,
    systemFee: 15,
    evDiscount: 10,
    discountAmount: 10,
    netFare: 111
  });

  // Digital Gateway Modal States
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [selectedGateway, setSelectedGateway] = useState<'eSewa' | 'Khalti' | 'IME' | 'Cash'>('eSewa');
  const [gatewayStep, setGatewayStep] = useState<'select' | 'credential' | 'verify' | 'success'>('select');
  const [gatewayPhone, setGatewayPhone] = useState<string>("");
  const [gatewayPin, setGatewayPin] = useState<string>("");
  const [gatewayOtp, setGatewayOtp] = useState<string>("");

  // Rating States
  const [userRating, setUserRating] = useState<number>(5);
  const [userReview, setUserReview] = useState<string>("");

  // Auto calculate when pickup/destination or options change
  useEffect(() => {
    calculateFare(pickup, destination, vehicleType, appliedPromo, isEV);
  }, [pickup, destination, vehicleType, appliedPromo, isEV]);

  const calculateFare = (p: string, d: string, type: string, promo: string, eco: boolean) => {
    const configs: any = {
      auto: { base: 50, perKm: 35, speed: 20 },
      bike: { base: 30, perKm: 20, speed: 35 },
      taxi: { base: 80, perKm: 60, speed: 25 },
      scooter: { base: 25, perKm: 15, speed: 28 },
      city_to_city: { base: 600, perKm: 75, speed: 50 }
    };
    const conf = configs[type] || configs.scooter;

    const hash = (p + d).length;
    const distanceKm = Math.max(1.5, parseFloat((2.5 + (hash % 12) * 1.1).toFixed(1)));
    const durationMins = Math.max(5, Math.round((distanceKm / conf.speed) * 60 + (hash % 6)));
    let basePrice = conf.base + (distanceKm * conf.perKm);

    // Rush hour factor
    let trafficMultiplier = 1.0;
    const hour = new Date().getHours();
    if ((hour >= 9 && hour <= 11) || (hour >= 17 && hour <= 19)) {
      trafficMultiplier = 1.25;
    }
    let finalPrice = basePrice * trafficMultiplier + 15; // +15 system fee

    let discount = 0;
    if (promo === 'SAJILONEPAL') discount += 50;
    else if (promo === 'ECOMOBILITY') discount += Math.round(finalPrice * 0.20);

    let evDiscount = 0;
    if (eco && (type === 'scooter' || type === 'taxi')) {
      evDiscount = Math.round(finalPrice * 0.08);
      discount += evDiscount;
    }

    const netFare = Math.max(conf.base, Math.round(finalPrice - discount));

    setFareDetails({
      distanceKm,
      durationMins,
      basePrice: Math.round(basePrice),
      trafficMultiplier,
      systemFee: 15,
      evDiscount,
      discountAmount: discount,
      netFare
    });
  };

  const handleLocationsMapUpdate = (p: string, d: string, dist: number) => {
    setPickup(p);
    setDestination(d);
  };

  // Auth: Request mock OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;
    const res = await requestMockOTP(phoneInput, userRole);
    if (res.success) {
      setGeneratedOtp(res.code || "4321");
      setOtpStep('otp');
      setShowSmsBanner(true);
      // Auto hide banner after 12 seconds
      setTimeout(() => setShowSmsBanner(false), 12000);
    }
  };

  // Auth: Verify mock OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput) return;
    const res = await verifyMockOTP(phoneInput, otpInput, userRole, nameInput);
    if (!res.success) {
      alert("Invalid OTP code. Try entering the code displayed on your screen.");
    } else {
      setShowSmsBanner(false);
    }
  };

  // Booking Flow: Promo
  const handleApplyPromo = () => {
    if (promoInput.toUpperCase() === 'SAJILONEPAL' || promoInput.toUpperCase() === 'ECOMOBILITY') {
      setAppliedPromo(promoInput.toUpperCase());
      alert(`Promo code '${promoInput.toUpperCase()}' applied successfully!`);
    } else {
      alert("Invalid Promo Code. Try using 'SAJILONEPAL' or 'ECOMOBILITY'.");
    }
  };

  // Booking Flow: Confirm booking and trigger checkout modal
  const handleTriggerCheckout = () => {
    if (isScheduled && (!scheduleDate || !scheduleTime)) {
      alert("Please select a date and time for your scheduled ride.");
      return;
    }
    setGatewayStep('select');
    setShowCheckout(true);
  };

  // Digital Gateway: Proceed step
  const handleGatewayProceed = () => {
    if (selectedGateway === 'Cash') {
      // Cash payment completes immediately, skips to simulated matching
      setShowCheckout(false);
      triggerRideBooking();
    } else {
      setGatewayStep('credential');
    }
  };

  // Digital Gateway: Confirm checkout credentials and prompt OTP
  const handleGatewayVerify = () => {
    if (!gatewayPhone || !gatewayPin) {
      alert("Please fill your mobile banking credentials.");
      return;
    }
    // Simulate eSewa/Khalti OTP verification code
    setGatewayStep('verify');
    setGatewayOtp("9876"); // mock gateway verification OTP
  };

  // Digital Gateway: Complete payment Verification
  const handleGatewaySettle = () => {
    if (gatewayOtp !== "9876") {
      alert("Incorrect verification code.");
      return;
    }
    setGatewayStep('success');
    setTimeout(() => {
      setShowCheckout(false);
      triggerRideBooking();
    }, 1500);
  };

  const triggerRideBooking = () => {
    if (isScheduled) {
      alert(`Sajilo ride scheduled for ${scheduleDate} at ${scheduleTime}! Check your historical ledger.`);
      // Reset
      setIsScheduled(false);
    } else {
      // Start real-time live coordinate simulation over map
      startRideSimulation({
        pickup,
        destination,
        vehicleType,
        distanceKm: fareDetails.distanceKm,
        fare: fareDetails.netFare,
        isEV,
        isWomenSafe
      });
    }
  };

  // Active ride: Submit rating & feedback
  const handleFeedbackSubmit = () => {
    alert("Namaste! Thank you for supporting Sajilo Ride. Your rating has been logged.");
    cancelActiveRide();
    setUserRating(5);
    setUserReview("");
  };

  return (
    <div className={`min-h-[85vh] transition-colors duration-300 ${
      theme === 'dark' ? 'bg-dark-bg text-white' : 'bg-light-bg text-slate-800'
    } py-8 px-4 sm:px-6 lg:px-8`}>

      {/* Floating SMS Banner Notification for OTP Simulation */}
      {showSmsBanner && generatedOtp && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] max-w-sm w-[90%] bg-slate-900/95 border border-saffron/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.25)] backdrop-blur-lg text-white flex items-start space-x-3 transition-transform animate-bounce">
          <Smartphone className="w-6 h-6 text-saffron mt-0.5 animate-pulse" />
          <div className="flex-grow space-y-1">
            <span className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">SMS MESSAGE FROM SAJILO</span>
            <span className="block text-xs font-bold leading-normal">
              Your Sajilo OTP is: <span className="text-saffron font-black text-sm tracking-widest">{generatedOtp}</span>. Valid for 5 minutes.
            </span>
          </div>
        </div>
      )}

      {/* ==========================================
          1. MOCK ONBOARDING AUTH PORTAL (IF LOGGED OUT)
          ========================================== */}
      {!user ? (
        <div className="max-w-md mx-auto mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl glass-card-dark text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-saffron flex items-center justify-center shadow-lg">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold">{t('login')}</h2>
            <p className="text-slate-400 text-xs font-medium">
              Enter your phone and get a simulated OTP code instantly on your screen to test the premium booking features.
            </p>
          </div>

          {/* Quick role toggle inside onboarding card */}
          <div className="grid grid-cols-2 gap-2 bg-slate-500/10 p-1 rounded-xl">
            <button 
              onClick={() => setUserRole('customer')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${userRole === 'customer' ? 'bg-primary text-white shadow' : 'text-slate-400'}`}
            >
              Rider Account
            </button>
            <button 
              onClick={() => setUserRole('driver')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${userRole === 'driver' ? 'bg-secondary text-white shadow' : 'text-slate-400'}`}
            >
              Driver Partner
            </button>
          </div>

          <form onSubmit={otpStep === 'phone' ? handleRequestOtp : handleVerifyOtp} className="space-y-4">
            {otpStep === 'phone' ? (
              <div className="space-y-3">
                <input 
                  id="auth-name-input"
                  type="text"
                  placeholder="Full Name (e.g. Aarav Devkota)"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className={`w-full text-xs p-3.5 rounded-xl border outline-none font-bold ${
                    theme === 'dark' ? 'bg-dark-card border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                  required
                />
                <input 
                  id="auth-phone-input"
                  type="tel"
                  placeholder={t('phone') + " (e.g. 9841234567)"}
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className={`w-full text-xs p-3.5 rounded-xl border outline-none font-bold ${
                    theme === 'dark' ? 'bg-dark-card border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                  required
                />
                <button 
                  id="auth-submit-phone"
                  type="submit"
                  className="w-full py-3.5 bg-primary text-white text-xs font-black rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  Send OTP Code
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Sent to {phoneInput}</span>
                <input 
                  id="auth-otp-input"
                  type="text"
                  maxLength={4}
                  placeholder={t('enterOtp')}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className={`w-full text-xs p-3.5 rounded-xl border text-center tracking-widest font-black outline-none ${
                    theme === 'dark' ? 'bg-dark-card border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setOtpStep('phone')}
                    className="py-3 bg-slate-500/10 text-slate-400 text-xs font-bold rounded-xl"
                  >
                    Back
                  </button>
                  <button 
                    id="auth-submit-otp"
                    type="submit"
                    className="py-3 bg-primary text-white text-xs font-black rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
                  >
                    {t('verify')}
                  </button>
                </div>
              </div>
            )}
          </form>

        </div>
      ) : (

        // ==========================================
        // 2. MAIN ACTIVE RIDE BOOKING PANEL (LOGGED IN)
        // ==========================================
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT PANEL: Map Viewer */}
          <div className="h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl relative order-last lg:order-first">
            <MapComponent 
              interactive={ridePhase === 'idle'} 
              onSelectLocations={handleLocationsMapUpdate}
            />
          </div>

          {/* RIGHT PANEL: Form Flow & Actions */}
          <div className="flex flex-col justify-between">
            
            {/* Phase 1: Idle Booking form */}
            {ridePhase === 'idle' && (
              <div className={`p-6 rounded-3xl border flex-grow flex flex-col justify-between space-y-6 ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'
              }`}>
                
                {/* Form header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] text-saffron font-bold uppercase tracking-widest">Premium Fixed Fares</span>
                    <h2 className="text-xl font-extrabold">Sajilo Dispatch Dispatcher</h2>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">{t('greenPoints')}</span>
                    <span className="text-sm font-black text-green-500">🍃 {greenPoints} Pts</span>
                  </div>
                </div>

                {/* Ride category selection cards */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Select Fleet Category</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { id: "scooter", label: "Scooter (EV)", rate: "Base 25" },
                      { id: "bike", label: "Bike Ride", rate: "Base 30" },
                      { id: "auto", label: "Auto RE", rate: "Base 50" },
                      { id: "taxi", label: "Taxi Cab", rate: "Base 80" },
                      { id: "city_to_city", label: "Inter-City", rate: "Base 600" }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        id={`category-card-${cat.id}`}
                        onClick={() => setVehicleType(cat.id as any)}
                        className={`p-3 rounded-xl border flex flex-col justify-between text-center transition-all ${
                          vehicleType === cat.id 
                            ? 'bg-primary text-white border-primary shadow-md scale-105' 
                            : theme === 'dark' 
                              ? 'bg-dark-card border-white/5 text-slate-400 hover:bg-white/5' 
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Compass className={`w-4 h-4 mx-auto mb-1 ${vehicleType === cat.id ? 'text-white' : 'text-saffron'}`} />
                        <span className="block text-[9px] font-black leading-tight mb-1">{cat.label}</span>
                        <span className="block text-[8px] opacity-75 font-semibold">{cat.rate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Toggles: EV, Women safe, Scheduled */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* EV Eco mode toggle */}
                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all ${
                    isEV ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 hover:bg-white/5'
                  }`}>
                    <div className="space-y-0.5 text-left">
                      <span className="block text-[9px] font-black uppercase text-green-500">EV Eco Mode</span>
                      <span className="block text-[8px] text-slate-400">-8% Green Saver</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={isEV} 
                      onChange={(e) => setIsEV(e.target.checked)}
                      className="accent-green-500"
                    />
                  </label>

                  {/* Women Safe Ride toggle */}
                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all ${
                    isWomenSafe ? 'border-primary/30 bg-primary/5' : 'border-white/5 hover:bg-white/5'
                  }`}>
                    <div className="space-y-0.5 text-left">
                      <span className="block text-[9px] font-black uppercase text-primary">Women-Safe</span>
                      <span className="block text-[8px] text-slate-400">Female Driver only</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={isWomenSafe} 
                      onChange={(e) => setIsWomenSafe(e.target.checked)}
                      className="accent-primary"
                    />
                  </label>

                  {/* Scheduled Booking toggle */}
                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all ${
                    isScheduled ? 'border-saffron/30 bg-saffron/5' : 'border-white/5 hover:bg-white/5'
                  }`}>
                    <div className="space-y-0.5 text-left">
                      <span className="block text-[9px] font-black uppercase text-saffron">Schedule Later</span>
                      <span className="block text-[8px] text-slate-400">Set Date / Time</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={isScheduled} 
                      onChange={(e) => setIsScheduled(e.target.checked)}
                      className="accent-saffron"
                    />
                  </label>
                </div>

                {/* Scheduled DateTime picker overlays */}
                {isScheduled && (
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-500/5 border border-white/5 animate-fade-in">
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Select Schedule Date</label>
                      <input 
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className={`w-full text-xs p-2 rounded-lg border outline-none font-bold ${
                          theme === 'dark' ? 'bg-dark-card border-white/10 text-white' : 'bg-white border-slate-200'
                        }`}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Select Dispatch Time</label>
                      <input 
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className={`w-full text-xs p-2 rounded-lg border outline-none font-bold ${
                          theme === 'dark' ? 'bg-dark-card border-white/10 text-white' : 'bg-white border-slate-200'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Promo Code module */}
                <div className="flex gap-2">
                  <input 
                    id="book-promo-input"
                    type="text"
                    placeholder="Enter Promo Code (e.g. SAJILONEPAL)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className={`flex-grow text-xs p-3 rounded-xl border outline-none font-bold uppercase ${
                      theme === 'dark' ? 'bg-dark-card border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="px-5 bg-saffron hover:bg-saffron-dark text-dark-bg text-xs font-black rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* AI Invoice Breakdown */}
                <div className="bg-slate-500/10 p-4 rounded-2xl border border-white/5 space-y-2 text-xs">
                  <span className="block font-black text-slate-400 uppercase tracking-widest text-[9px]">{t('fareBreakdown')}</span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Distance & Base Price ({fareDetails.distanceKm} km)</span>
                    <span className="font-extrabold text-white">NPR {fareDetails.basePrice}</span>
                  </div>
                  {fareDetails.trafficMultiplier > 1 && (
                    <div className="flex justify-between text-saffron">
                      <span>Traffic Multiplier Factor</span>
                      <span className="font-extrabold">x{fareDetails.trafficMultiplier}</span>
                    </div>
                  )}
                  {fareDetails.evDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>EV Eco Discount (-8%)</span>
                      <span className="font-extrabold">- NPR {fareDetails.evDiscount}</span>
                    </div>
                  )}
                  {appliedPromo && (
                    <div className="flex justify-between text-green-400">
                      <span>Promo Discount ({appliedPromo})</span>
                      <span className="font-extrabold">- NPR {fareDetails.discountAmount - fareDetails.evDiscount}</span>
                    </div>
                  )}
                  <div className="h-[1px] bg-white/5 my-2" />
                  <div className="flex justify-between text-sm font-black">
                    <span className="text-white uppercase tracking-wider">Total Fixed Invoice</span>
                    <span className="text-saffron text-lg">NPR {fareDetails.netFare}</span>
                  </div>
                </div>

                {/* Confirm Dispatch button */}
                <button 
                  id="book-dispatch-btn"
                  onClick={handleTriggerCheckout}
                  className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center space-x-2"
                >
                  <span>{isScheduled ? "Schedule Sajilo Dispatch" : t('confirmBooking')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}

            {/* Phase 2: Live Dispatch Matching Screen */}
            {ridePhase === 'matching' && (
              <div className="p-8 rounded-3xl border bg-slate-900/60 border-white/10 flex-grow flex flex-col justify-center items-center text-center space-y-6 min-h-[500px]">
                {/* Glowing Radar scan animation */}
                <div className="relative w-36 h-36 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <div className="absolute inset-2 rounded-full border border-primary/40 animate-ping" />
                  <div className="absolute inset-8 rounded-full border border-primary/60 animate-pulse" />
                  <Compass className="w-12 h-12 text-primary animate-spin-slow" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Searching for Sajilo Dispatch...</h3>
                  <p className="text-slate-400 text-xs max-w-sm">
                    Namaste! Our AI allocator is scanning nearby drivers in Thamel area. Toggling female-matching parameters if active.
                  </p>
                </div>

                <div className="bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 text-[11px] text-saffron font-bold animate-pulse">
                  NPR {fareDetails.netFare} • Eco EV Scooter
                </div>

                <button 
                  onClick={cancelActiveRide}
                  className="px-6 py-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold rounded-xl transition-all"
                >
                  Cancel Request
                </button>
              </div>
            )}

            {/* Phase 3 & 4: Active ride tracking (Arriving & In Trip) */}
            {['arriving', 'in_trip'].includes(ridePhase) && simulatedDriver && (
              <div className={`p-6 rounded-3xl border flex-grow flex flex-col justify-between space-y-6 ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'
              }`}>
                
                {/* Tracker header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                      {ridePhase === 'arriving' ? 'Driver approaching pickup' : 'Safely on trip to dropoff'}
                    </span>
                    <h3 className="text-lg font-black text-white">Sajilo Active Ride Tracker</h3>
                  </div>
                  <span className="bg-green-500/20 text-green-500 text-[10px] px-3 py-1 rounded-full font-black animate-pulse">
                    GPS CONNECTED
                  </span>
                </div>

                {/* Driver information card with Dhaka Topi detail */}
                <div className="flex items-center space-x-4 bg-slate-500/10 p-5 rounded-2xl border border-white/5">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-saffron bg-slate-800 flex-shrink-0 flex items-center justify-center text-white">
                    <UserCheck className="w-8 h-8 text-saffron" />
                  </div>
                  <div className="flex-grow text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="block font-black text-sm text-white">{simulatedDriver.name}</span>
                      <span className="bg-saffron/20 text-saffron text-[9px] px-2 py-0.5 rounded font-black">★ {simulatedDriver.rating}</span>
                    </div>
                    <span className="block text-xs text-slate-400 font-bold">
                      {simulatedDriver.vehicle.name} • <span className="text-white font-extrabold">{simulatedDriver.vehicle.plate}</span>
                    </span>
                    <span className="block text-[9px] text-green-500 font-black uppercase">🪪 VERIFIED SAJILO DHAKA-TOPI Badge</span>
                  </div>
                </div>

                {/* Live stats progress */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Distance Left</span>
                    <span className="text-xl font-black text-saffron">{distanceRemaining} Km</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">AI ETA</span>
                    <span className="text-xl font-black text-secondary">
                      {ridePhase === 'arriving' ? 'Arriving now' : '8 mins'}
                    </span>
                  </div>
                </div>

                {/* Emergency Panic SOS Suite */}
                <div className="bg-rose-500/5 p-4 rounded-2xl border border-rose-500/20 text-center space-y-3">
                  <span className="block text-[10px] font-black uppercase text-rose-500 tracking-widest flex items-center justify-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-rose-500 animate-bounce" /> Emergency Safety Suite
                  </span>
                  <p className="text-slate-400 text-[10px]">
                    If you feel unsafe at any point, press the SOS button to instantly dispatch emergency security and notify police authorities.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      id="book-sos-btn"
                      onClick={triggerSOS}
                      className={`py-3 bg-gradient-to-tr from-primary to-rose-600 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/20 ${sosActive ? 'animate-pulse' : ''}`}
                    >
                      TRIGGER SOS PANIC
                    </button>
                    
                    <button 
                      onClick={() => alert("Live tracking coordinate link copied to clipboard. Share with family!")}
                      className="py-3 bg-slate-500/10 text-white text-xs font-bold rounded-xl"
                    >
                      Share live trip
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Phase 5: Completed rating flow */}
            {ridePhase === 'completed' && (
              <div className={`p-6 rounded-3xl border flex-grow flex flex-col justify-between space-y-6 ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'
              }`}>
                
                <div className="text-center space-y-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto text-green-500 shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-green-500 font-extrabold uppercase tracking-widest">Namaste! Arrived Safely</span>
                    <h3 className="text-2xl font-black text-white">Journey Completed</h3>
                    <p className="text-slate-400 text-xs max-w-xs mx-auto">
                      Your EV Eco ride was completed successfully. You have earned <span className="text-green-500 font-black">+20 EV Green Points!</span>
                    </p>
                  </div>
                </div>

                {/* Star rating slide */}
                <div className="bg-slate-500/10 p-5 rounded-2xl border border-white/5 text-center space-y-4">
                  <label className="block text-xs font-bold text-slate-300">Rate your experience with {simulatedDriver?.name}</label>
                  <div className="flex justify-center space-x-1.5">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        id={`star-btn-${num}`}
                        onClick={() => setUserRating(num)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star className={`w-8 h-8 ${num <= userRating ? 'fill-saffron text-saffron' : 'text-slate-500'}`} />
                      </button>
                    ))}
                  </div>

                  <input 
                    id="feedback-review-input"
                    type="text"
                    placeholder="Write a review (e.g. Friendly driver, clean vehicle)..."
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    className={`w-full text-xs p-3.5 rounded-xl border outline-none font-bold ${
                      theme === 'dark' ? 'bg-dark-card border-white/10 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <button 
                  id="submit-feedback-btn"
                  onClick={handleFeedbackSubmit}
                  className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-black text-sm rounded-2xl shadow-xl transition-all"
                >
                  Submit Review & Exit
                </button>

              </div>
            )}

          </div>

        </div>
      )}

      {/* ==========================================
          3. DIGITAL PAYMENT GATEWAY MODAL CHECKOUT
          ========================================== */}
      {showCheckout && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" id="payment-modal-overlay">
          
          <div className="w-full max-w-md bg-slate-900 border border-white/10 p-6 rounded-3xl shadow-2xl space-y-6 text-white text-center relative">
            
            {/* Modal header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-[10px] text-saffron font-bold uppercase tracking-widest">Sajilo Payment Gateway</span>
              <button 
                onClick={() => setShowCheckout(false)}
                className="text-slate-400 hover:text-white font-black"
                id="close-payment-modal-btn"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Select Gateway */}
            {gatewayStep === 'select' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold">Choose Payout Method</h3>
                  <p className="text-[11px] text-slate-400">Select a secure verified Nepalese digital wallet or cash payment.</p>
                </div>

                {/* Branded gateway grids */}
                <div className="grid grid-cols-2 gap-3">
                  {/* eSewa */}
                  <button
                    id="gateway-esewa-btn"
                    onClick={() => setSelectedGateway('eSewa')}
                    className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center transition-all ${
                      selectedGateway === 'eSewa' 
                        ? 'bg-green-600/10 border-green-500 scale-[1.02] text-green-400' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-400'
                    }`}
                  >
                    <span className="text-xl font-extrabold tracking-wider block mb-1">eSewa</span>
                    <span className="text-[8px] font-bold uppercase">Digital Wallet</span>
                  </button>

                  {/* Khalti */}
                  <button
                    id="gateway-khalti-btn"
                    onClick={() => setSelectedGateway('Khalti')}
                    className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center transition-all ${
                      selectedGateway === 'Khalti' 
                        ? 'bg-indigo-600/10 border-indigo-500 scale-[1.02] text-indigo-400' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-400'
                    }`}
                  >
                    <span className="text-xl font-extrabold tracking-wider block mb-1">Khalti</span>
                    <span className="text-[8px] font-bold uppercase">Digital Wallet</span>
                  </button>

                  {/* IME Pay */}
                  <button
                    id="gateway-ime-btn"
                    onClick={() => setSelectedGateway('IME')}
                    className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center transition-all ${
                      selectedGateway === 'IME' 
                        ? 'bg-orange-600/10 border-orange-500 scale-[1.02] text-orange-400' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-400'
                    }`}
                  >
                    <span className="text-xl font-extrabold tracking-wider block mb-1">IME Pay</span>
                    <span className="text-[8px] font-bold uppercase">Mobile Banking</span>
                  </button>

                  {/* Cash */}
                  <button
                    id="gateway-cash-btn"
                    onClick={() => setSelectedGateway('Cash')}
                    className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center transition-all ${
                      selectedGateway === 'Cash' 
                        ? 'bg-slate-500/15 border-slate-400 scale-[1.02] text-white' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-400'
                    }`}
                  >
                    <span className="text-xl font-extrabold tracking-wider block mb-1">Cash</span>
                    <span className="text-[8px] font-bold uppercase">Offline Payment</span>
                  </button>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400">Total Payable Fare:</span>
                  <span className="text-saffron font-black text-base">NPR {fareDetails.netFare}</span>
                </div>

                <button
                  id="checkout-proceed-btn"
                  onClick={handleGatewayProceed}
                  className="w-full py-3.5 bg-primary text-white text-xs font-black rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Proceed with {selectedGateway}
                </button>
              </div>
            )}

            {/* Step 2: Credential Entry (eSewa / Khalti mock login) */}
            {gatewayStep === 'credential' && (
              <div className="space-y-4 text-left">
                <div className="text-center space-y-1">
                  <h4 className="text-lg font-black">{selectedGateway} Branded Portal</h4>
                  <p className="text-[10px] text-slate-400">Enter your secure wallet credentials to authorize transaction.</p>
                </div>

                <div className="space-y-3 pt-3">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">eSewa ID / Mobile Number</label>
                    <input 
                      id="gateway-phone-input"
                      type="text"
                      placeholder="98********"
                      value={gatewayPhone}
                      onChange={(e) => setGatewayPhone(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl bg-dark-card border border-white/10 text-white outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Wallet Web-PIN</label>
                    <input 
                      id="gateway-pin-input"
                      type="password"
                      placeholder="****"
                      value={gatewayPin}
                      onChange={(e) => setGatewayPin(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl bg-dark-card border border-white/10 text-white outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button 
                    onClick={() => setGatewayStep('select')}
                    className="py-3 bg-slate-500/10 text-slate-400 text-xs font-bold rounded-xl text-center"
                  >
                    Back
                  </button>
                  <button 
                    id="gateway-auth-submit"
                    onClick={handleGatewayVerify}
                    className="py-3 bg-primary text-white text-xs font-black rounded-xl"
                  >
                    Authenticate Account
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: SMS Transaction OTP confirmation */}
            {gatewayStep === 'verify' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-lg font-black">Transaction OTP Verification</h4>
                  <p className="text-[10px] text-slate-400">We have sent a verification code to your billing account. Enter <span className="text-saffron font-black">9876</span> to test.</p>
                </div>

                <input 
                  id="gateway-otp-input"
                  type="text"
                  placeholder="Verification Code"
                  value={gatewayOtp}
                  onChange={(e) => setGatewayOtp(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-dark-card border border-white/10 text-white text-center font-black tracking-widest"
                />

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setGatewayStep('credential')}
                    className="py-3 bg-slate-500/10 text-slate-400 text-xs font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button 
                    id="gateway-verify-submit"
                    onClick={handleGatewaySettle}
                    className="py-3 bg-primary text-white text-xs font-black rounded-xl"
                  >
                    Confirm NPR {fareDetails.netFare} Payout
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Payout Success screen */}
            {gatewayStep === 'success' && (
              <div className="space-y-4 py-8">
                <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto text-green-500 animate-pulse">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">Payment Authorized</h4>
                  <p className="text-[10px] text-slate-400">Transaction ID logged in persistent backend DB. Booting simulated dispatcher...</p>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
