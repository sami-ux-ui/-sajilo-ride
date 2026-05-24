"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { Sun, Moon, Globe, ShieldAlert, Award, User, Menu, X, LogOut, Terminal, Layers } from 'lucide-react';

export default function GlobalHeader() {
  const { 
    theme, toggleTheme, 
    lang, toggleLanguage, t, 
    user, userRole, setUserRole, logOut 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-dark-bg/85 border-b border-white/5 backdrop-blur-md text-white' 
        : 'bg-white/85 border-b border-black/5 backdrop-blur-md text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Majestic Nepal Flag Location-Pin Logo */}
          <Link href="/" className="flex items-center space-x-3 group" id="nav-logo-link">
            <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[10px] bg-dark-bg flex items-center justify-center overflow-hidden">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Nepal Flag-Inspired Pin Vector */}
                  <path d="M5 2C5 2 12 3 14 6C15.5 8.2 13.5 10.5 12 11.5C14.5 12.5 16 15 14 17.5C12.5 19.5 7.5 21 5 22V2Z" fill="#E11D48" />
                  <path d="M5 2V22M5 2C5 2 12 3 14 6C15.5 8.2 13.5 10.5 12 11.5C14.5 12.5 16 15 14 17.5C12.5 19.5 7.5 21 5 22" stroke="#2563EB" strokeWidth="1.5" />
                  {/* Sun/Moon Saffron Symbol */}
                  <circle cx="8" cy="7" r="1.5" fill="#F59E0B" />
                  <circle cx="8" cy="14" r="1.5" fill="#F59E0B" />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-saffron animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-primary via-saffron to-secondary bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                SAJILO RIDE
              </span>
              <span className={`block text-[9px] uppercase font-bold tracking-widest ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                सजिलो राइड • NEPAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            
            {/* Landing page anchor refs */}
            <Link href="/#how-it-works" className="px-3 py-2 text-sm font-semibold hover:text-primary transition-colors">{t('howItWorks')}</Link>
            <Link href="/#categories" className="px-3 py-2 text-sm font-semibold hover:text-primary transition-colors">{t('categories')}</Link>
            <Link href="/#safety" className="px-3 py-2 text-sm font-semibold hover:text-primary transition-colors">{t('safetyFeatures')}</Link>
            <Link href="/#earnings" className="px-3 py-2 text-sm font-semibold hover:text-primary transition-colors">{t('driverEarning')}</Link>

            {/* Platform Role Switcher Widgets */}
            <div className="h-6 w-[1px] bg-slate-500/20 mx-2" />
            
            <div className="flex items-center gap-1 bg-slate-500/10 p-1 rounded-xl">
              <button 
                id="role-btn-passenger"
                onClick={() => setUserRole('customer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  userRole === 'customer' 
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                {t('dashboardCustomer')}
              </button>
              
              <button 
                id="role-btn-driver"
                onClick={() => setUserRole('driver')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  userRole === 'driver' 
                    ? 'bg-secondary text-white shadow-md shadow-secondary/20 scale-105' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                {t('dashboardDriver')}
              </button>

              <button 
                id="role-btn-admin"
                onClick={() => setUserRole('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  userRole === 'admin' 
                    ? 'bg-saffron text-dark-bg shadow-md shadow-saffron/20 scale-105' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Admin
              </button>
            </div>

          </nav>

          {/* Interactive Controller Suite */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Language Toggle */}
            <button 
              id="header-lang-toggle"
              onClick={toggleLanguage}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                theme === 'dark' 
                  ? 'border-white/10 hover:bg-white/5 bg-white/5' 
                  : 'border-slate-200 hover:bg-slate-50 bg-slate-100'
              }`}
              title="Switch Language / भाषा परिवर्तन"
            >
              <Globe className="w-4 h-4 text-saffron" />
              <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
            </button>

            {/* Dark/Light Mode */}
            <button 
              id="header-theme-toggle"
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all ${
                theme === 'dark' 
                  ? 'border-white/10 bg-white/5 text-saffron hover:bg-white/10' 
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Session Controller */}
            {user ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-slate-500/20">
                <div className="text-right">
                  <span className="block text-xs font-extrabold">{user.name}</span>
                  <span className="block text-[10px] text-saffron font-bold">★ {user.rating || '4.9'}</span>
                </div>
                <button 
                  onClick={logOut}
                  className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link 
                href="/book" 
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-extrabold rounded-xl group bg-gradient-to-br from-primary via-saffron to-secondary hover:text-white dark:text-white"
                id="header-book-btn"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-dark-bg rounded-[10px] group-hover:bg-opacity-0">
                  {t('bookNow')}
                </span>
              </Link>
            )}

          </div>

          {/* Mobile Menu Toggle button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="p-1.5 rounded-lg bg-slate-500/10 text-saffron"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-white/5 text-saffron' : 'bg-slate-100 text-slate-700'}`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-500/10"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pt-4 pb-8 space-y-4 border-t border-slate-500/10 transition-all ${
          theme === 'dark' ? 'bg-dark-bg text-white' : 'bg-white text-slate-800'
        }`} id="mobile-menu-drawer">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-500/10 text-sm font-semibold"
            >
              {t('howItWorks')}
            </Link>
            <Link 
              href="/#categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-500/10 text-sm font-semibold"
            >
              {t('categories')}
            </Link>
            <Link 
              href="/#safety" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-500/10 text-sm font-semibold"
            >
              {t('safetyFeatures')}
            </Link>
            <Link 
              href="/#earnings" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-500/10 text-sm font-semibold"
            >
              {t('driverEarning')}
            </Link>
            
            <div className="h-[1px] bg-slate-500/10 my-2" />
            
            {/* Quick role toggles in mobile */}
            <span className="block text-[10px] uppercase font-black text-slate-500 tracking-wider px-3">
              Switch Workspace Terminals
            </span>
            <div className="grid grid-cols-3 gap-2 px-2">
              <button 
                onClick={() => { setUserRole('customer'); setMobileMenuOpen(false); }}
                className={`py-2 text-xs font-bold rounded-lg ${userRole === 'customer' ? 'bg-primary text-white' : 'bg-slate-500/10 text-slate-400'}`}
              >
                Rider
              </button>
              <button 
                onClick={() => { setUserRole('driver'); setMobileMenuOpen(false); }}
                className={`py-2 text-xs font-bold rounded-lg ${userRole === 'driver' ? 'bg-secondary text-white' : 'bg-slate-500/10 text-slate-400'}`}
              >
                Driver
              </button>
              <button 
                onClick={() => { setUserRole('admin'); setMobileMenuOpen(false); }}
                className={`py-2 text-xs font-bold rounded-lg ${userRole === 'admin' ? 'bg-saffron text-dark-bg' : 'bg-slate-500/10 text-slate-400'}`}
              >
                Admin
              </button>
            </div>
            
            <div className="h-[1px] bg-slate-500/10 my-2" />
            
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-500/5">
                <div>
                  <span className="block text-sm font-extrabold">{user.name}</span>
                  <span className="block text-[10px] text-saffron font-bold">★ {user.rating}</span>
                </div>
                <button 
                  onClick={() => { logOut(); setMobileMenuOpen(false); }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            ) : (
              <Link 
                href="/book" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 bg-primary text-white text-sm font-black rounded-xl"
              >
                {t('bookNow')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
