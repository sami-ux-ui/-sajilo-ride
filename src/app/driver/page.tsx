"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import MapComponent from '@/components/MapComponent';
import { 
  Award, Compass, DollarSign, Eye, Shield, 
  MapPin, Star, User, ChevronRight, RefreshCw, 
  ToggleLeft, ToggleRight, Radio, Landmark, EyeOff
} from 'lucide-react';

export default function DriverDashboard() {
  const { theme, lang, t, user, logOut } = useApp();
  
  // Driver Status
  const [online, setOnline] = useState<boolean>(true);
  const [earnings, setEarnings] = useState<any>({
    gross: 48900,
    net: 44010,
    commission: 4890,
    trips: 34
  });

  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeRide, setActiveRide] = useState<any | null>(null);

  useEffect(() => {
    fetchEarnings();
    fetchIncomingJobs();
    
    // Poll for jobs every 8 seconds if online
    const interval = setInterval(() => {
      if (online) fetchIncomingJobs();
    }, 8000);
    return () => clearInterval(interval);
  }, [online, user]);

  const fetchEarnings = async () => {
    try {
      const dId = user?.id || "drv_2"; // Sita Shrestha
      const res = await fetch(`http://localhost:5000/api/driver/earnings/${dId}`);
      const data = await res.json();
      if (data.success) {
        setEarnings({
          ...earnings,
          gross: data.earnings.gross || 48900,
          net: data.earnings.net || 44010,
          commission: data.earnings.commission || 4890
        });
      }
    } catch (err) {
      // offline fallback
    }
  };

  const fetchIncomingJobs = async () => {
    if (!online) {
      setActiveJobs([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/driver/jobs');
      const data = await res.json();
      if (data.success && data.jobs.length > 0) {
        setActiveJobs(data.jobs);
      } else {
        throw new Error();
      }
    } catch (err) {
      // Offline fallback mock booking alerts
      setActiveJobs([
        {
          id: "rid_alert_1",
          customerName: "Aarav Devkota",
          pickup: "Thamel, Kathmandu",
          destination: "Patan Durbar Square, Lalitpur",
          distanceKm: 6.2,
          fare: 450,
          vehicleType: "taxi",
          isEV: false,
          isWomenSafe: false
        },
        {
          id: "rid_alert_2",
          customerName: "Pooja Karki",
          pickup: "Baneshwor, Kathmandu",
          destination: "Tribhuvan Int'l Airport",
          distanceKm: 3.8,
          fare: 150,
          vehicleType: "scooter",
          isEV: true,
          isWomenSafe: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOnline = async () => {
    const nextState = !online;
    setOnline(nextState);
    try {
      const dId = user?.id || "drv_2";
      await fetch('http://localhost:5000/api/driver/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverId: dId, status: nextState ? 'online' : 'offline' })
      });
    } catch (err) {}
  };

  const handleAcceptJob = async (job: any) => {
    try {
      const dId = user?.id || "drv_2";
      const res = await fetch('http://localhost:5000/api/driver/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rideId: job.id, driverId: dId })
      });
      const data = await res.json();
      if (data.success) {
        setActiveRide(data.ride);
        setActiveJobs(prev => prev.filter(j => j.id !== job.id));
        alert("Sajilo Ride Job Claimed! Coordinate tracking stream started.");
      }
    } catch (err) {
      // Offline fallback
      setActiveRide(job);
      setActiveJobs(prev => prev.filter(j => j.id !== job.id));
      alert("Sajilo Ride Job Claimed (Offline Demo Mode). Navigate to pickup spot.");
    }
  };

  return (
    <div className={`min-h-[85vh] transition-colors duration-300 ${
      theme === 'dark' ? 'bg-dark-bg text-white' : 'bg-light-bg text-slate-800'
    } py-8 px-4 sm:px-6 lg:px-8`}>
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Dashboard Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
          <div className="text-left space-y-1">
            <span className="text-xs font-black text-secondary uppercase tracking-widest">{t('dashboardDriver')}</span>
            <h1 className="text-3xl font-extrabold">{t('welcome')}, {user?.name || "Sita Shrestha"}!</h1>
            <p className="text-slate-400 text-xs font-medium">Verify your daily gross splits, track customer densities via heatmaps, and accept dispatcher jobs.</p>
          </div>

          {/* Toggle Online status button */}
          <button 
            id="driver-online-toggle"
            onClick={handleToggleOnline}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow-md ${
              online 
                ? 'bg-green-500 text-white shadow-green-500/20' 
                : 'bg-slate-500/10 text-slate-400 border border-white/5'
            }`}
          >
            <Radio className={`w-4 h-4 ${online ? 'animate-pulse' : ''}`} />
            <span>{online ? t('online') : t('offline')}</span>
          </button>
        </div>

        {/* Stats Grid: Gross, net 90%, platform 10%, premium subscription */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl glass-card-dark text-left space-y-2">
            <span className="block text-[9px] text-slate-400 uppercase font-black tracking-wider">Gross Ride Revenue</span>
            <span className="text-2xl font-black text-white">NPR {earnings.gross}</span>
            <span className="block text-[8px] text-slate-400">Total fares billed across terminals</span>
          </div>

          <div className="bg-gradient-to-tr from-secondary/15 to-slate-900 border border-secondary/20 p-5 rounded-2xl text-left space-y-2">
            <span className="block text-[9px] text-secondary uppercase font-black tracking-wider">Net Driver Payout (90%)</span>
            <span className="text-2xl font-black text-secondary">NPR {earnings.net}</span>
            <span className="block text-[8px] text-slate-400">Directly settled to your mobile wallet</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl glass-card-dark text-left space-y-2">
            <span className="block text-[9px] text-primary uppercase font-black tracking-wider">Sajilo Commission (10%)</span>
            <span className="text-2xl font-black text-primary">NPR {earnings.commission}</span>
            <span className="block text-[8px] text-slate-400">Kept locally for server infrastructure</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl glass-card-dark text-left space-y-2">
            <span className="block text-[9px] text-saffron uppercase font-black tracking-wider">Active Subscription tier</span>
            <span className="text-lg font-black text-saffron uppercase block mt-1">Monthly Premium</span>
            <span className="block text-[8px] text-slate-400">Keeps 100% fare (NPR 499/week)</span>
          </div>

        </div>

        {/* Dispatch Jobs & Density Heatmap split viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Dispatch Heatmap */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-left">
              <Compass className="w-5 h-5 text-saffron" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">{t('driverHeatmap')}</h3>
            </div>
            <div className="h-[360px] rounded-3xl overflow-hidden border border-white/5">
              <MapComponent interactive={false} showHeatmap={online} />
            </div>
          </div>

          {/* Incoming Job Alerts */}
          <div className="space-y-4 flex flex-col">
            <div className="flex items-center space-x-2 text-left">
              <Radio className="w-5 h-5 text-primary animate-pulse" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">{t('activeJobs')}</h3>
            </div>

            <div className="flex-grow space-y-3 max-h-[360px] overflow-y-auto pr-2">
              {!online ? (
                <div className="p-8 bg-white/5 border border-white/5 rounded-2xl text-center text-slate-400 text-xs">
                  Toggle online status to receive live passenger dispatch alerts.
                </div>
              ) : activeJobs.length === 0 ? (
                <div className="p-8 bg-white/5 border border-white/5 rounded-2xl text-center text-slate-400 text-xs animate-pulse">
                  Scanning for active passenger requests in Kathmandu...
                </div>
              ) : (
                activeJobs.map((job, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between space-y-4 hover:border-secondary/30 transition-all text-left"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">Passenger Request</span>
                        <span className="text-xs font-black text-white">{job.customerName}</span>
                      </div>
                      {job.isEV && (
                        <span className="bg-green-500/20 text-green-500 text-[8px] px-2 py-0.5 rounded font-black">EV Eco-Ride</span>
                      )}
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <span className="font-bold text-slate-200 text-ellipsis overflow-hidden whitespace-nowrap">{job.pickup}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-bold text-slate-200 text-ellipsis overflow-hidden whitespace-nowrap">{job.destination}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div>
                        <span className="block text-[9px] text-slate-400 font-bold uppercase">Fixed Payout</span>
                        <span className="text-sm font-black text-saffron">NPR {job.fare}</span>
                      </div>
                      
                      <button
                        id={`accept-job-${job.id}`}
                        onClick={() => handleAcceptJob(job)}
                        className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-black rounded-xl transition-all"
                      >
                        Accept Booking
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
