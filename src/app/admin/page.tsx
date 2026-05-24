"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Award, Shield, Compass, Landmark, RefreshCw, 
  Users, Layers, FileText, CheckCircle, AlertTriangle 
} from 'lucide-react';

export default function AdminPanel() {
  const { theme, lang, t } = useApp();
  
  // Admin stats
  const [metrics, setMetrics] = useState<any>({
    totalRides: 2,
    completedRides: 2,
    grossVolume: 600,
    platformRevenue: 60, // 10% platform share
    totalDrivers: 4,
    activeDrivers: 3,
    pendingDisputes: 1
  });

  const [disputes, setDisputes] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Fetch system KPIs
      const resStats = await fetch('http://localhost:5000/api/admin/dashboard');
      const dataStats = await resStats.json();
      if (dataStats.success) {
        setMetrics(dataStats.metrics);
      }

      // Fetch disputes
      const resDisp = await fetch('http://localhost:5000/api/admin/disputes');
      const dataDisp = await resDisp.json();
      if (dataDisp.success) {
        setDisputes(dataDisp.disputes);
      }
    } catch (err) {
      // Offline fallback mock data
      setMetrics({
        totalRides: 142,
        completedRides: 138,
        grossVolume: 84300,
        platformRevenue: 8430,
        totalDrivers: 12,
        activeDrivers: 8,
        pendingDisputes: 2
      });

      setDisputes([
        {
          id: "dsp_1",
          rideId: "rid_1",
          reporterName: "Aarav Devkota",
          subject: "Charged twice on eSewa",
          description: "My eSewa was debited twice due to network lag. Please refund 450 NPR.",
          status: "pending",
          createdAt: "2026-05-22T09:00:00Z"
        },
        {
          id: "dsp_2",
          rideId: "rid_2",
          reporterName: "Sita Shrestha",
          subject: "Customer luggage mismatch",
          description: "The customer carried excessive luggage exceeding EV vehicle specifications.",
          status: "pending",
          createdAt: "2026-05-22T15:00:00Z"
        }
      ]);
    }

    // Set mock drivers awaiting verification
    setDrivers([
      { id: "drv_new_1", name: "Ramesh Adhikari", vehicle: "Suzuki Alto Taxi", plate: "Ba 3 Cha 1122", status: "pending_verify" },
      { id: "drv_new_2", name: "Kiran Gurung", vehicle: "Ather 450X (EV)", plate: "Ba 9 Pa 8877", status: "pending_verify" }
    ]);
    setLoading(false);
  };

  const handleResolveDispute = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/disputes/${id}/resolve`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: 'resolved' } : d));
        alert("Dispute ticket resolved successfully!");
      }
    } catch (err) {
      // Offline fallback
      setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: 'resolved' } : d));
      alert("Dispute ticket resolved successfully! (Offline Mode)");
    }
  };

  const handleVerifyDriver = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/admin/drivers/${id}/verify`, {
        method: 'POST'
      });
      setDrivers(prev => prev.filter(d => d.id !== id));
      alert("Driver vehicle documents approved and verified successfully!");
    } catch (err) {
      // Offline fallback
      setDrivers(prev => prev.filter(d => d.id !== id));
      alert("Driver vehicle documents approved and verified successfully! (Offline Mode)");
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
            <span className="text-xs font-black text-saffron uppercase tracking-widest">{t('dashboardAdmin')}</span>
            <h1 className="text-3xl font-extrabold">Sajilo Command Center</h1>
            <p className="text-slate-400 text-xs font-medium">Monitor nationwide ride revenues, settle customer billing complaints, and verify driver credentials.</p>
          </div>
          
          <button 
            onClick={fetchAdminData}
            className="flex items-center space-x-1.5 px-4 py-2 bg-saffron text-dark-bg text-xs font-black rounded-xl transition-all w-fit"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Backoffice</span>
          </button>
        </div>

        {/* KPI Scoreboard cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-left space-y-2">
            <span className="block text-[9px] text-slate-400 uppercase font-black">Gross Billed Volume</span>
            <span className="text-xl font-black text-white">NPR {metrics.grossVolume}</span>
            <span className="block text-[8px] text-green-500">100% Digital & Cash ledger</span>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-tr from-saffron/15 to-slate-900 border border-saffron/20 text-left space-y-2">
            <span className="block text-[9px] text-saffron uppercase font-black">Platform Revenue (10%)</span>
            <span className="text-xl font-black text-saffron">NPR {metrics.platformRevenue}</span>
            <span className="block text-[8px] text-slate-400">Retained administrative commission</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-left space-y-2">
            <span className="block text-[9px] text-slate-400 uppercase font-black">Total Bookings</span>
            <span className="text-xl font-black text-white">{metrics.totalRides} Trips</span>
            <span className="block text-[8px] text-slate-400">All fleet categories</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-left space-y-2">
            <span className="block text-[9px] text-slate-400 uppercase font-black">Online Dispatchers</span>
            <span className="text-xl font-black text-secondary">{metrics.activeDrivers} Active</span>
            <span className="block text-[8px] text-slate-400">Bikes, scooters, autos, cabs</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-left space-y-2">
            <span className="block text-[9px] text-primary uppercase font-black">Pending Disputes</span>
            <span className="text-xl font-black text-primary">{metrics.pendingDisputes} Tickets</span>
            <span className="block text-[8px] text-slate-400">Rider / Driver complaints</span>
          </div>

        </div>

        {/* Dispute solver and Driver Verification queues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Dispute Center */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-left">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">{t('disputes')}</h3>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {disputes.length === 0 ? (
                <div className="p-8 bg-white/5 border border-white/5 rounded-2xl text-center text-slate-400 text-xs">
                  All customer billing disputes resolved. System clean!
                </div>
              ) : (
                disputes.map((disp, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between space-y-4 text-left"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">Reporter: {disp.reporterName}</span>
                        <span className="text-xs font-black text-white">{disp.subject}</span>
                      </div>
                      <span className={`text-[8px] px-2.5 py-0.5 rounded font-black uppercase ${
                        disp.status === 'pending' ? 'bg-primary/20 text-primary' : 'bg-green-500/20 text-green-500'
                      }`}>
                        {disp.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {disp.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[9px] text-slate-400 font-bold">Ride Reference: {disp.rideId}</span>
                      
                      {disp.status === 'pending' && (
                        <button
                          id={`resolve-dispute-${disp.id}`}
                          onClick={() => handleResolveDispute(disp.id)}
                          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-black rounded-xl transition-all"
                        >
                          Resolve & Refund
                        </button>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

          {/* Driver Approval Queue */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-left">
              <Users className="w-5 h-5 text-secondary" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">{t('verifyDriver')}</h3>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {drivers.length === 0 ? (
                <div className="p-8 bg-white/5 border border-white/5 rounded-2xl text-center text-slate-400 text-xs">
                  No pending driver registrations awaiting documentation check.
                </div>
              ) : (
                drivers.map((drv, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between space-y-4 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">Registration Applicant</span>
                        <span className="text-xs font-black text-white">{drv.name}</span>
                      </div>
                      <span className="bg-saffron/20 text-saffron text-[8px] px-2 py-0.5 rounded font-black uppercase">Document review</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <span className="block text-slate-400">Vehicle: <span className="font-bold text-white">{drv.vehicle}</span></span>
                      <span className="block text-slate-400">Plate Code: <span className="font-extrabold text-white">{drv.plate}</span></span>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-white/5">
                      <button
                        id={`verify-driver-${drv.id}`}
                        onClick={() => handleVerifyDriver(drv.id)}
                        className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-black rounded-xl transition-all"
                      >
                        Approve License & Plate
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
