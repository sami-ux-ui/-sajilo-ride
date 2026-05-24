"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/null'; // Simple null or basic imports, or standard Link from next/link
import { 
  Award, Clock, Compass, DollarSign, Gift, 
  MapPin, Star, User, ChevronRight, RefreshCw, Eye 
} from 'lucide-react';

export default function CustomerDashboard() {
  const { theme, lang, t, user, greenPoints, logOut } = useApp();
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  // Fetch local rides history on bootup
  useEffect(() => {
    fetchRides();
  }, [user]);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const uId = user?.id || "usr_1"; // fallback to default seeded user
      const res = await fetch(`http://localhost:5000/api/rides/history/${uId}`);
      const data = await res.json();
      if (data.success) {
        setRides(data.rides);
      } else {
        throw new Error();
      }
    } catch (err) {
      // Offline fallback mock data
      setRides([
        {
          id: "rid_mock_1",
          pickup: "Thamel, Kathmandu",
          destination: "Patan Durbar Square, Lalitpur",
          distanceKm: 6.2,
          fare: 450,
          vehicleType: "taxi",
          paymentMethod: "eSewa",
          paymentStatus: "paid",
          status: "completed",
          rating: 5,
          createdAt: "2026-05-22T08:30:00Z"
        },
        {
          id: "rid_mock_2",
          pickup: "Baneshwor, Kathmandu",
          destination: "Tribhuvan International Airport",
          distanceKm: 3.8,
          fare: 150,
          vehicleType: "scooter",
          paymentMethod: "Khalti",
          paymentStatus: "paid",
          status: "completed",
          rating: 4,
          createdAt: "2026-05-21T14:15:00Z"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleShareReferral = () => {
    const code = user?.referralCode || "SAJILO984";
    navigator.clipboard.writeText(code);
    alert(`Referral Code '${code}' copied to clipboard! Share with friends to earn NPR 100 free ride credits.`);
  };

  return (
    <div className={`min-h-[85vh] transition-colors duration-300 ${
      theme === 'dark' ? 'bg-dark-bg text-white' : 'bg-light-bg text-slate-800'
    } py-8 px-4 sm:px-6 lg:px-8`}>
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Dashboard Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
          <div className="text-left space-y-1">
            <span className="text-xs font-black text-primary uppercase tracking-widest">{t('dashboardCustomer')}</span>
            <h1 className="text-3xl font-extrabold">{t('welcome')}, {user?.name || "Aarav Devkota"}!</h1>
            <p className="text-slate-400 text-xs font-medium">Manage your Nepalese ride credits, check sustainability parameters, and review trip invoice ledgers.</p>
          </div>
          
          <button 
            onClick={fetchRides}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-500/10 hover:bg-slate-500/15 border border-white/5 text-xs font-bold rounded-xl transition-all w-fit"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Ledger</span>
          </button>
        </div>

        {/* Stats Grid: EV Points, Rating, Referral */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* EV Eco points */}
          <div className="bg-gradient-to-tr from-green-600/10 to-slate-900 border border-green-500/20 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-green-500 tracking-wider">EV Eco Mobility</span>
              <Award className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-bold">{t('greenPoints')}</span>
              <span className="text-3xl font-black text-green-400">🍃 {greenPoints} NPR</span>
            </div>
            <p className="text-[10px] text-slate-400">
              You earned these points by booking electric scooters and electric eco-cabs. Redeem them during invoice checks.
            </p>
          </div>

          {/* User rating */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 glass-card-dark">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-saffron tracking-wider">Passenger Rating Badge</span>
              <Star className="w-5 h-5 text-saffron fill-saffron" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-bold">Rider Trust Index</span>
              <span className="text-3xl font-black text-white">⭐ {user?.rating || '4.9'} / 5.0</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Calculated based on driver ratings for your promptness, ride courtesy, and road guidelines compliance.
            </p>
          </div>

          {/* Referral credits */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 glass-card-dark">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-secondary tracking-wider">Referral Reward Panel</span>
              <Gift className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-bold">{t('referralShare')}</span>
              <span className="text-xl font-black text-white block mt-1 select-all">{user?.referralCode || "SAJILO984"}</span>
            </div>
            <button 
              id="customer-share-referral-btn"
              onClick={handleShareReferral}
              className="w-full py-2 bg-secondary text-white font-bold text-xs rounded-xl hover:bg-secondary-dark transition-colors"
            >
              Copy Referral Code
            </button>
          </div>

        </div>

        {/* Ride History Ledger */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-extrabold">{t('rideHistory')}</h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs font-bold">Loading trip receipts...</div>
          ) : rides.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 text-center text-slate-400 text-xs">
              No historical rides found. Book your first Sajilo Ride!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rides.map((ride, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase">
                      {ride.vehicleType}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {new Date(ride.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="font-semibold text-slate-200 text-ellipsis overflow-hidden whitespace-nowrap">{ride.pickup}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-semibold text-slate-200 text-ellipsis overflow-hidden whitespace-nowrap">{ride.destination}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div>
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">Paid via {ride.paymentMethod}</span>
                      <span className="text-sm font-black text-saffron">NPR {ride.fare}</span>
                    </div>
                    <button
                      onClick={() => setSelectedReceipt(ride)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 text-xs font-bold rounded-lg text-slate-300 hover:text-white"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ==========================================
          RECEIPT INVOICE MODAL
          ========================================== */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="receipt-modal-overlay">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 p-6 rounded-3xl shadow-2xl text-white space-y-4 relative text-center">
            
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] text-saffron font-bold uppercase tracking-widest">Sajilo Tax Invoice</span>
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-white"
                id="close-receipt-modal-btn"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <span className="block text-2xl font-black text-saffron">NPR {selectedReceipt.fare}</span>
              <span className="block text-[9px] text-slate-400 uppercase font-bold">Transaction ID: {selectedReceipt.id}</span>
            </div>

            <div className="h-[1px] bg-white/5 my-2" />

            <div className="text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Pickup Spot:</span>
                <span className="font-bold text-white text-ellipsis overflow-hidden max-w-[200px]">{selectedReceipt.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination Spot:</span>
                <span className="font-bold text-white text-ellipsis overflow-hidden max-w-[200px]">{selectedReceipt.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Travel Distance:</span>
                <span className="font-bold text-white">{selectedReceipt.distanceKm} Km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="font-bold text-green-500">{selectedReceipt.paymentMethod} (Verified)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trip Status:</span>
                <span className="font-black text-green-400 uppercase">{selectedReceipt.status}</span>
              </div>
            </div>

            <div className="h-[1px] bg-white/5 my-2" />

            <div className="bg-slate-500/5 p-3 rounded-xl border border-white/5 text-[10px] text-slate-400 leading-normal text-left">
              This digital invoice satisfies all Nepalese dispatch transport guidelines. Standard 10% platform share matches municipal taxation cuts.
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2.5 bg-primary text-white text-xs font-black rounded-xl"
            >
              Print Receipt / Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
