import React from 'react';
import {
  Sprout,
  PlusCircle,
  History,
  BookOpen,
  Code2,
  Globe,
  Radio,
  Menu,
  X
} from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface NavbarProps {
  activeTab: 'home' | 'form' | 'results' | 'history' | 'catalog' | 'ml-guide';
  setActiveTab: (tab: 'home' | 'form' | 'results' | 'history' | 'catalog' | 'ml-guide') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  hasActiveResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  hasActiveResult
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = translations[language];

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#ffffff] border-b border-[#e1e3e4] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div
            id="brand-logo-button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#012d1d] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-[#a5d0b9]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#012d1d]">
                  AgriAI
                </span>
                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold bg-[#e1ecd4] text-[#002114] rounded-full">
                  CropWise
                </span>
              </div>
              <p className="text-xs text-[#414844] font-medium hidden sm:block">
                Precision Crop Recommendation
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-home-btn"
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'home'
                  ? 'bg-[#012d1d] text-white shadow-xs'
                  : 'text-[#414844] hover:text-[#012d1d] hover:bg-[#f3f4f5]'
              }`}
            >
              {t.dashboard}
            </button>

            <button
              id="nav-advisor-btn"
              onClick={() => setActiveTab('form')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'form'
                  ? 'bg-[#012d1d] text-white shadow-xs'
                  : 'text-[#414844] hover:text-[#012d1d] hover:bg-[#f3f4f5]'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-[#ffb702]" />
              {t.newRecommendation}
            </button>

            {hasActiveResult && (
              <button
                id="nav-results-btn"
                onClick={() => setActiveTab('results')}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                  activeTab === 'results'
                    ? 'bg-[#012d1d] text-white shadow-xs'
                    : 'text-[#012d1d] bg-[#e1ecd4] font-bold'
                }`}
              >
                <Sprout className="w-4 h-4 text-[#012d1d]" />
                Latest Result
              </button>
            )}

            <button
              id="nav-history-btn"
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-[#012d1d] text-white shadow-xs'
                  : 'text-[#414844] hover:text-[#012d1d] hover:bg-[#f3f4f5]'
              }`}
            >
              <History className="w-4 h-4" />
              {t.history}
            </button>

            <button
              id="nav-catalog-btn"
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'bg-[#012d1d] text-white shadow-xs'
                  : 'text-[#414844] hover:text-[#012d1d] hover:bg-[#f3f4f5]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {t.cropLibrary}
            </button>

            <button
              id="nav-mlguide-btn"
              onClick={() => setActiveTab('ml-guide')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'ml-guide'
                  ? 'bg-[#012d1d] text-white shadow-xs'
                  : 'text-[#414844] hover:text-[#012d1d] hover:bg-[#f3f4f5]'
              }`}
              title="View how to plug in Python ML / Scikit-Learn Model"
            >
              <Code2 className="w-4 h-4 text-[#7d5800]" />
              ML Architecture
            </button>
          </nav>

          {/* Right Controls: Sensor Status & Language */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Sensor Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3f4f5] border border-[#e1e3e4] text-xs font-medium text-[#414844]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <Radio className="w-3.5 h-3.5 text-emerald-700" />
              <span>Model Ready (24 Crops)</span>
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center bg-[#f8f9fa] border border-[#c1c8c2] rounded-lg px-2 py-1 text-xs font-semibold text-[#191c1d]">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-[#414844]" />
              <select
                id="language-selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent focus:outline-none cursor-pointer pr-1 text-xs font-medium text-[#191c1d]"
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="es">Español</option>
              </select>
            </div>

            {/* Direct CTA */}
            <button
              id="cta-start-test-nav"
              onClick={() => setActiveTab('form')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-[#ffb702]" />
              <span>New Soil Test</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#414844] hover:bg-[#f3f4f5] hover:text-[#012d1d]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-white border-b border-[#e1e3e4] px-4 pt-2 pb-4 space-y-1 animate-fadeIn">
          <button
            id="m-nav-home"
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              activeTab === 'home' ? 'bg-[#012d1d] text-white' : 'text-[#414844] hover:bg-[#f3f4f5]'
            }`}
          >
            <Sprout className="w-4 h-4" />
            {t.dashboard}
          </button>

          <button
            id="m-nav-advisor"
            onClick={() => { setActiveTab('form'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              activeTab === 'form' ? 'bg-[#012d1d] text-white' : 'text-[#414844] hover:bg-[#f3f4f5]'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[#ffb702]" />
            {t.newRecommendation}
          </button>

          {hasActiveResult && (
            <button
              id="m-nav-results"
              onClick={() => { setActiveTab('results'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
                activeTab === 'results' ? 'bg-[#012d1d] text-white' : 'text-[#012d1d] bg-[#e1ecd4]'
              }`}
            >
              <Sprout className="w-4 h-4 text-[#012d1d]" />
              Latest Recommendation Result
            </button>
          )}

          <button
            id="m-nav-history"
            onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              activeTab === 'history' ? 'bg-[#012d1d] text-white' : 'text-[#414844] hover:bg-[#f3f4f5]'
            }`}
          >
            <History className="w-4 h-4" />
            {t.history}
          </button>

          <button
            id="m-nav-catalog"
            onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              activeTab === 'catalog' ? 'bg-[#012d1d] text-white' : 'text-[#414844] hover:bg-[#f3f4f5]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t.cropLibrary}
          </button>

          <button
            id="m-nav-mlguide"
            onClick={() => { setActiveTab('ml-guide'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              activeTab === 'ml-guide' ? 'bg-[#012d1d] text-white' : 'text-[#414844] hover:bg-[#f3f4f5]'
            }`}
          >
            <Code2 className="w-4 h-4 text-[#7d5800]" />
            ML Architecture & API Guide
          </button>
        </div>
      )}
    </header>
  );
};
