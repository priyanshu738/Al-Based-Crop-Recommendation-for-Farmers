import React from 'react';
import {
  Sprout,
  Calendar,
  TrendingUp,
  Droplets,
  Clock,
  ShieldCheck,
  Bug,
  Sparkles,
  ArrowLeft,
  Printer,
  Share2,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronRight,
  Layers,
  Thermometer,
  CloudRain,
  Activity,
  Award
} from 'lucide-react';
import { Language, translations } from '../lib/translations';
import { RecommendationResponse, CropMatchResult } from '../types';

interface ResultsViewProps {
  language: Language;
  result: RecommendationResponse;
  onTestAgain: () => void;
  onViewHistory: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  language,
  result,
  onTestAgain,
  onViewHistory
}) => {
  const t = translations[language];
  const { topCrop, alternatives, inputs, soilHealth, aiAgronomyAdvisory } = result;

  const handlePrint = () => {
    window.print();
  };

  const [selectedAlternative, setSelectedAlternative] = React.useState<CropMatchResult | null>(null);

  // Active crop being inspected (default: top recommendation)
  const activeCrop = selectedAlternative || topCrop;

  return (
    <div id="results-view-container" className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#e1e3e4] no-print">
        <button
          onClick={onTestAgain}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#012d1d] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.testAnotherField}
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onViewHistory}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#c1c8c2] hover:bg-[#f3f4f5] text-xs font-semibold text-[#191c1d] flex items-center gap-1.5 transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            Field Records
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#ffb702]" />
            {t.printReport}
          </button>
        </div>
      </div>

      {/* Field Overview Summary Banner */}
      <div className="bg-[#f8f9fa] border border-[#e1e3e4] rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#717973]">Assessment Report</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#e1ecd4] text-[#002114]">
              {result.id}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#012d1d]">
            {inputs.farmName || 'Primary Farm Plot'} • {inputs.stateRegion || 'Regional Analysis'}
          </h2>
        </div>

        {/* Input Parameters Chips */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#414844]">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e1e3e4]">
            N: <strong className="text-[#191c1d]">{inputs.n}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e1e3e4]">
            P: <strong className="text-[#191c1d]">{inputs.p}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e1e3e4]">
            K: <strong className="text-[#191c1d]">{inputs.k}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e1e3e4]">
            pH: <strong className="text-[#191c1d]">{inputs.ph}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e1e3e4]">
            Temp: <strong className="text-[#191c1d]">{inputs.temperature}°C</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e1e3e4]">
            Rain: <strong className="text-[#191c1d]">{inputs.rainfall}mm</strong>
          </span>
        </div>
      </div>

      {/* Main Hero Card: Top Recommended Crop */}
      <div className="bg-white rounded-2xl border-2 border-[#012d1d] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#e1ecd4]/50 rounded-bl-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#012d1d] text-[#ffffff] text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Award className="w-3.5 h-3.5 text-[#ffb702]" />
                #1 Top Recommended Crop
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#e1ecd4] text-[#002114] text-xs font-bold">
                {topCrop.category}
              </span>
              <span className="text-xs text-[#717973] font-serif italic">
                {topCrop.scientificName}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#012d1d] tracking-tight">
                {topCrop.name}
              </h1>
              <p className="text-lg font-bold text-[#7d5800] mt-1">
                {topCrop.hindiName}
              </p>
              <p className="text-sm text-[#414844] max-w-2xl mt-2 leading-relaxed">
                {topCrop.description}
              </p>
            </div>
          </div>

          {/* Confidence Score Badge */}
          <div className="bg-[#f8f9fa] border border-[#c1c8c2] p-5 rounded-2xl text-center min-w-[180px] shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[#717973]">
              {t.confidenceScore}
            </p>
            <div className="text-4xl sm:text-5xl font-black text-[#012d1d] my-1">
              {topCrop.suitabilityScore}%
            </div>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              {topCrop.confidenceLabel}
            </span>
          </div>
        </div>

        {/* 4 Core Agronomic Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#e1e3e4]">
          {/* Ideal Season */}
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#717973] uppercase">
              <Calendar className="w-4 h-4 text-[#012d1d]" />
              {t.idealSeason}
            </div>
            <p className="text-sm font-bold text-[#191c1d] mt-1">
              {topCrop.idealSeason}
            </p>
            <p className="text-[11px] text-[#414844]">
              Maturity: {topCrop.growthDuration}
            </p>
          </div>

          {/* Expected Yield */}
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#717973] uppercase">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              {t.expectedYield}
            </div>
            <p className="text-sm font-bold text-[#191c1d] mt-1">
              {topCrop.expectedYield}
            </p>
            <p className="text-[11px] text-[#414844]">
              Demand: <strong className="text-[#012d1d]">{topCrop.marketDemand}</strong>
            </p>
          </div>

          {/* Water Requirement */}
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#717973] uppercase">
              <Droplets className="w-4 h-4 text-sky-700" />
              {t.waterRequirement}
            </div>
            <p className="text-sm font-bold text-[#191c1d] mt-1">
              {topCrop.waterRequirement}
            </p>
            <p className="text-[11px] text-[#414844]">
              Total water: {topCrop.waterRequirementMm}
            </p>
          </div>

          {/* Optimal Soil Type */}
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#717973] uppercase">
              <Layers className="w-4 h-4 text-[#7d5800]" />
              Ideal Soil
            </div>
            <p className="text-sm font-bold text-[#191c1d] mt-1">
              {topCrop.suitableSoilTypes[0]}
            </p>
            <p className="text-[11px] text-[#414844]">
              pH Range: {topCrop.ranges.ph.optimalMin} - {topCrop.ranges.ph.optimalMax}
            </p>
          </div>
        </div>
      </div>

      {/* Agronomic Advisory & Gemini AI Section */}
      {aiAgronomyAdvisory && (
        <div className="bg-gradient-to-br from-[#ffffff] to-[#f8f9fa] rounded-2xl border border-[#c1c8c2] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#012d1d] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#ffb702]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#012d1d]">
                Agronomic Intelligence & Field Advisory
              </h3>
              <p className="text-xs text-[#717973]">
                Scientific analysis of your soil nutrient balance and thermal regime
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e1e3e4] text-sm text-[#191c1d] leading-relaxed space-y-3 whitespace-pre-line font-medium">
            {aiAgronomyAdvisory}
          </div>
        </div>
      )}

      {/* Parameter Match Breakdown Table / Radar comparison */}
      <div className="bg-white rounded-2xl border border-[#e1e3e4] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e1e3e4] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#012d1d] flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-700" />
              Soil & Climate Compatibility Breakdown
            </h3>
            <p className="text-xs text-[#414844] mt-0.5">
              Comparing your laboratory values with {activeCrop.name}&apos;s optimal growth thresholds
            </p>
          </div>
          {selectedAlternative && (
            <button
              onClick={() => setSelectedAlternative(null)}
              className="text-xs font-semibold text-[#012d1d] hover:underline"
            >
              Reset to Top Recommendation ({topCrop.name})
            </button>
          )}
        </div>

        <div className="space-y-4">
          {activeCrop.matchFactors.map((factor) => {
            const isOptimal = factor.status === 'Optimal';
            const isAcceptable = factor.status === 'Acceptable';
            return (
              <div
                key={factor.parameter}
                className="bg-[#f8f9fa] p-3.5 sm:p-4 rounded-xl border border-[#e1e3e4] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-[180px]">
                  <p className="text-sm font-bold text-[#191c1d]">{factor.label}</p>
                  <p className="text-xs text-[#717973]">
                    Your value: <strong className="text-[#012d1d]">{factor.inputValue}</strong> (Ideal: {factor.optimalRange})
                  </p>
                </div>

                {/* Progress bar */}
                <div className="flex-1 max-w-md w-full flex items-center gap-3">
                  <div className="flex-1 bg-[#e1e3e4] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOptimal
                          ? 'bg-emerald-600'
                          : isAcceptable
                          ? 'bg-[#ffb702]'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${factor.matchPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono font-bold w-12 text-right text-[#191c1d]">
                    {factor.matchPercent}%
                  </span>
                </div>

                <div className="w-28 text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isOptimal
                        ? 'bg-emerald-100 text-emerald-900'
                        : isAcceptable
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {factor.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Soil Health Diagnosis & Fertilizer Recommendations */}
      <div className="bg-white rounded-2xl border border-[#e1e3e4] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-[#e1e3e4] pb-4">
          <h3 className="text-lg font-bold text-[#012d1d] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#7d5800]" />
            {t.soilHealthTitle} & Fertilizer Prescription
          </h3>
          <p className="text-xs text-[#414844] mt-0.5">
            Customized basal and foliar recommendations to maximize crop yield
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* N status */}
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#191c1d]">Nitrogen (N) Status</span>
              <span className="text-xs font-bold px-2 py-0.5 bg-white border rounded text-[#012d1d]">
                {soilHealth.nitrogen.status}
              </span>
            </div>
            <p className="text-xs text-[#414844]">{soilHealth.nitrogen.advice}</p>
          </div>

          {/* P status */}
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#191c1d]">Phosphorus (P) Status</span>
              <span className="text-xs font-bold px-2 py-0.5 bg-white border rounded text-[#012d1d]">
                {soilHealth.phosphorus.status}
              </span>
            </div>
            <p className="text-xs text-[#414844]">{soilHealth.phosphorus.advice}</p>
          </div>

          {/* K status */}
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#191c1d]">Potassium (K) Status</span>
              <span className="text-xs font-bold px-2 py-0.5 bg-white border rounded text-[#012d1d]">
                {soilHealth.potassium.status}
              </span>
            </div>
            <p className="text-xs text-[#414844]">{soilHealth.potassium.advice}</p>
          </div>

          {/* pH status */}
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#191c1d]">Soil Reaction (pH)</span>
              <span className="text-xs font-bold px-2 py-0.5 bg-white border rounded text-[#012d1d]">
                {soilHealth.ph.status}
              </span>
            </div>
            <p className="text-xs text-[#414844]">{soilHealth.ph.advice}</p>
          </div>
        </div>

        {/* Actionable Fertilizer List */}
        <div className="bg-[#e1ecd4]/50 border border-[#c1c8c2] p-4 sm:p-5 rounded-xl space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#002114]">
            Actionable Fertilizer Dosing
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#191c1d]">
            {soilHealth.fertilizerPrescription.map((pres, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <span>{pres}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Agronomic Management & Cultivation Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Care Tips */}
        <div className="bg-white rounded-2xl border border-[#e1e3e4] p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#012d1d] flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-700" />
            {t.careTips}
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#414844]">
            {topCrop.careTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#f8f9fa] p-3 rounded-lg border border-[#e1e3e4]">
                <span className="w-5 h-5 rounded-full bg-[#e1ecd4] text-[#002114] text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pest Management & Harvesting */}
        <div className="bg-white rounded-2xl border border-[#e1e3e4] p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#012d1d] flex items-center gap-2">
            <Bug className="w-5 h-5 text-rose-600" />
            {t.pestManagement} & Harvesting
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#414844]">
            {topCrop.pestManagement.map((pm, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="text-rose-950">{pm}</span>
              </li>
            ))}
            <li className="flex items-start gap-2 bg-amber-50/50 p-3 rounded-lg border border-amber-100">
              <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span className="text-amber-950">
                <strong>Harvest Guide:</strong> {topCrop.harvestingTips}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Alternative Crops Ranked by Suitability */}
      <div className="bg-white rounded-2xl border border-[#e1e3e4] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-[#e1e3e4] pb-4">
          <h3 className="text-lg font-bold text-[#012d1d] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffb702]" />
            {t.alternativesTitle}
          </h3>
          <p className="text-xs text-[#414844] mt-0.5">
            Secondary crop options ranked for inter-cropping or rotational fallback
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {alternatives.map((alt, idx) => (
            <div
              key={alt.id}
              onClick={() => setSelectedAlternative(alt)}
              className="bg-[#f8f9fa] p-5 rounded-xl border border-[#e1e3e4] hover:border-[#012d1d] hover:bg-white hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#717973]">
                    Rank #{idx + 2}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#e1ecd4] text-[#002114]">
                    {alt.suitabilityScore}% Fit
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#191c1d]">
                  {alt.name}
                </h4>
                <p className="text-xs font-semibold text-[#7d5800]">
                  {alt.hindiName}
                </p>
                <p className="text-xs text-[#414844] line-clamp-2">
                  {alt.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e1e3e4] text-xs font-bold text-[#012d1d] flex items-center justify-between">
                <span>Yield: {alt.expectedYield.split('/')[0]}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e1e3e4] no-print">
        <button
          onClick={onTestAgain}
          className="px-6 py-3.5 rounded-xl bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
        >
          {t.testAnotherField}
        </button>

        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-xl bg-white border border-[#c1c8c2] hover:bg-[#f3f4f5] text-xs font-semibold text-[#191c1d] flex items-center gap-2"
        >
          <Printer className="w-4 h-4 text-[#7d5800]" />
          Print / Export Full PDF
        </button>
      </div>
    </div>
  );
};
