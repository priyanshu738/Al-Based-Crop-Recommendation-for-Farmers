import React from 'react';
import {
  Sprout,
  ArrowRight,
  Droplets,
  Thermometer,
  Layers,
  Sparkles,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Activity,
  Cpu
} from 'lucide-react';
import { Language, translations } from '../lib/translations';
import { PresetCondition } from '../types';

interface LandingViewProps {
  language: Language;
  onStartTest: () => void;
  onSelectPreset: (preset: PresetCondition) => void;
  onOpenHistory: () => void;
  onOpenCatalog: () => void;
  onOpenMLGuide: () => void;
  presets: PresetCondition[];
}

export const LandingView: React.FC<LandingViewProps> = ({
  language,
  onStartTest,
  onSelectPreset,
  onOpenHistory,
  onOpenCatalog,
  onOpenMLGuide,
  presets
}) => {
  const t = translations[language];

  return (
    <div id="landing-container" className="space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#ffffff] to-[#f8f9fa] border border-[#e1e3e4] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e1ecd4] text-[#002114] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#012d1d]" />
            AI Precision Farming Engine
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#012d1d] leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-[#414844] leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="hero-start-btn"
              onClick={onStartTest}
              className="px-6 py-3.5 rounded-xl bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-base shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
            >
              <span>{t.startSoilTest}</span>
              <ArrowRight className="w-5 h-5 text-[#ffb702]" />
            </button>

            <button
              id="hero-history-btn"
              onClick={onOpenHistory}
              className="px-5 py-3.5 rounded-xl bg-white border border-[#c1c8c2] hover:bg-[#f3f4f5] text-[#191c1d] font-semibold text-base transition-colors"
            >
              {t.viewHistory}
            </button>

            <button
              id="hero-catalog-btn"
              onClick={onOpenCatalog}
              className="px-4 py-3.5 text-[#7d5800] hover:text-[#401c00] font-semibold text-sm hover:underline"
            >
              Explore 24+ Crops →
            </button>
          </div>
        </div>

        {/* Floating Highlight Metrics Card */}
        <div className="mt-8 pt-8 border-t border-[#e1e3e4] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e1e3e4]">
            <p className="text-xs font-semibold text-[#717973] uppercase tracking-wider">NPK + pH Inputs</p>
            <p className="text-2xl font-bold text-[#012d1d] mt-1">7 Factors</p>
            <p className="text-xs text-[#414844] mt-0.5">Laboratory or sensor test</p>
          </div>

          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e1e3e4]">
            <p className="text-xs font-semibold text-[#717973] uppercase tracking-wider">Supported Crops</p>
            <p className="text-2xl font-bold text-[#012d1d] mt-1">24+ Types</p>
            <p className="text-xs text-[#414844] mt-0.5">Cereals, pulses & fruits</p>
          </div>

          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e1e3e4]">
            <p className="text-xs font-semibold text-[#717973] uppercase tracking-wider">Prediction Engine</p>
            <p className="text-2xl font-bold text-[#7d5800] mt-1">Instant</p>
            <p className="text-xs text-[#414844] mt-0.5">Scored in &lt;100 ms</p>
          </div>

          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e1e3e4]">
            <p className="text-xs font-semibold text-[#717973] uppercase tracking-wider">Action Plan</p>
            <p className="text-2xl font-bold text-emerald-800 mt-1">Full Guide</p>
            <p className="text-xs text-[#414844] mt-0.5">Yield, NPK & pest tips</p>
          </div>
        </div>
      </section>

      {/* 1-Click Quick Presets for Farmers */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#012d1d]">
              {t.presetsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#414844]">
              Select a standard farming climate to test instant recommendations in 1 click
            </p>
          </div>
          <button
            onClick={onStartTest}
            className="text-xs sm:text-sm font-semibold text-[#012d1d] hover:underline"
          >
            Custom Field Entry →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className="bg-white p-5 rounded-xl border border-[#e1e3e4] hover:border-[#012d1d] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#f3f4f5] text-[#012d1d] border border-[#e1e3e4]">
                    {preset.badge}
                  </span>
                  <span className="text-xs font-medium text-[#717973]">
                    {preset.inputs.stateRegion}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#191c1d] group-hover:text-[#012d1d] transition-colors">
                  {preset.title}
                </h3>
                <p className="text-xs text-[#414844] line-clamp-2">
                  {preset.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f3f4f5] flex items-center justify-between text-xs">
                <span className="text-[#717973]">
                  N: {preset.inputs.n} • Temp: {preset.inputs.temperature}°C • Rain: {preset.inputs.rainfall}mm
                </span>
                <span className="font-bold text-[#012d1d] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Load →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works: 3 Simple Steps */}
      <section className="bg-white rounded-2xl border border-[#e1e3e4] p-6 sm:p-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#012d1d]">
            How Crop Recommendation Works
          </h2>
          <p className="text-xs sm:text-sm text-[#414844]">
            Scientifically calibrated against ICAR & FAO agronomic datasets to ensure realistic, high-yielding crop selection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f8f9fa] p-5 rounded-xl border border-[#e1e3e4] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e1ecd4] text-[#002114] flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-base text-[#191c1d]">Input Soil & Climate</h3>
            <p className="text-xs text-[#414844] leading-relaxed">
              Enter your soil Nitrogen (N), Phosphorus (P), Potassium (K), pH, plus seasonal temperature, humidity, and rainfall.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#012d1d]">
              <Layers className="w-4 h-4 text-[#7d5800]" />
              Works on any mobile phone
            </div>
          </div>

          <div className="bg-[#f8f9fa] p-5 rounded-xl border border-[#e1e3e4] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#c1ecd4] text-[#002114] flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-base text-[#191c1d]">Suitability Scoring</h3>
            <p className="text-xs text-[#414844] leading-relaxed">
              Our agronomy matrix checks 24+ crops against biological limiting factors and calculates a percentage confidence match.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#012d1d]">
              <Activity className="w-4 h-4 text-emerald-700" />
              Ranks top crop + 3 alternatives
            </div>
          </div>

          <div className="bg-[#f8f9fa] p-5 rounded-xl border border-[#e1e3e4] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#ffdcc6] text-[#401c00] flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-base text-[#191c1d]">Actionable Plan & Yield</h3>
            <p className="text-xs text-[#414844] leading-relaxed">
              Get detailed sowing calendars, expected yield per hectare, irrigation needs, pest alerts, and customized fertilizer dosage.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7d5800]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Download & print ready report
            </div>
          </div>
        </div>
      </section>

      {/* Agronomist & Machine Learning Banner */}
      <section className="bg-gradient-to-r from-[#012d1d] to-[#1b4332] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs font-medium">
            <Cpu className="w-3.5 h-3.5" />
            Developer & ML Ready Architecture
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Want to plug in a Scikit-Learn or PyTorch ML model?
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            The backend is modularized with standard REST API endpoints (<code>/api/recommend</code>). You can seamlessly connect a trained Random Forest / XGBoost model or Python microservice.
          </p>
        </div>

        <button
          onClick={onOpenMLGuide}
          className="px-5 py-3 rounded-xl bg-[#ffb702] hover:bg-[#ffba27] text-[#271900] font-bold text-sm transition-colors whitespace-nowrap cursor-pointer"
        >
          View ML Integration Code →
        </button>
      </section>
    </div>
  );
};
