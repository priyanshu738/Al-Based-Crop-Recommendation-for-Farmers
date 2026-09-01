import React, { useState } from 'react';
import {
  Sprout,
  Thermometer,
  Droplets,
  CloudRain,
  Layers,
  Sparkles,
  AlertCircle,
  RotateCcw,
  Check,
  MapPin,
  HelpCircle,
  ArrowRight,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { Language, translations } from '../lib/translations';
import { PresetCondition, SoilClimateInputs } from '../types';

interface RecommendationFormProps {
  language: Language;
  onSubmit: (inputs: SoilClimateInputs) => void;
  isLoading: boolean;
  presets: PresetCondition[];
  initialInputs?: SoilClimateInputs | null;
}

const REGION_OPTIONS = [
  'Punjab / Haryana',
  'Uttar Pradesh / Bihar',
  'West Bengal / Assam',
  'Maharashtra / Vidarbha',
  'Gujarat / Saurashtra',
  'Madhya Pradesh',
  'Andhra Pradesh / Telangana',
  'Karnataka / Deccan',
  'Tamil Nadu',
  'Kerala',
  'Rajasthan (Arid Zone)',
  'Himachal / Kashmir (Hill Zone)'
];

const SOIL_TYPES = [
  'Alluvial Loam (दोमट मिट्टी)',
  'Black Cotton Soil (काली मिट्टी)',
  'Red & Yellow Soil (लाल मिट्टी)',
  'Clay Loam (चिकनी मिट्टी)',
  'Sandy Loam (बलुई दोमट)',
  'Laterite Soil (लैटेराइट मिट्टी)',
  'Silt Loam'
];

export const RecommendationForm: React.FC<RecommendationFormProps> = ({
  language,
  onSubmit,
  isLoading,
  presets,
  initialInputs
}) => {
  const t = translations[language];

  // Form state with sensible defaults (medium all-round values)
  const [formData, setFormData] = useState<SoilClimateInputs>(() => {
    if (initialInputs) return initialInputs;
    return {
      n: 80,
      p: 45,
      k: 40,
      temperature: 24.0,
      humidity: 65,
      ph: 6.5,
      rainfall: 120,
      stateRegion: 'Punjab / Haryana',
      soilType: 'Alluvial Loam (दोमट मिट्टी)',
      farmName: 'My Main Farm Plot',
      fieldArea: '2.5 Hectares'
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Animate loading simulation messages
  React.useEffect(() => {
    let timer: any;
    if (isLoading) {
      setActiveStepIndex(0);
      timer = setInterval(() => {
        setActiveStepIndex((prev) => (prev < 3 ? prev + 1 : prev));
      }, 700);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  // Handle Preset selection
  const applyPreset = (preset: PresetCondition) => {
    setSelectedPresetId(preset.id);
    setFormData(preset.inputs);
    setErrors({});
  };

  // Handle Region weather auto-fill
  const handleRegionChange = async (region: string) => {
    setFormData((prev) => ({ ...prev, stateRegion: region }));
    try {
      const res = await fetch(`/api/region-weather/${encodeURIComponent(region)}`);
      const data = await res.json();
      if (data.weather) {
        setFormData((prev) => ({
          ...prev,
          temperature: data.weather.temperature ?? prev.temperature,
          humidity: data.weather.humidity ?? prev.humidity,
          rainfall: data.weather.rainfall ?? prev.rainfall,
          ph: data.weather.ph ?? prev.ph,
          soilType: data.weather.soilType ?? prev.soilType
        }));
      }
    } catch (e) {
      console.warn('Could not fetch regional climate presets:', e);
    }
  };

  // Live validator
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.n < 0 || formData.n > 250) {
      newErrors.n = 'Nitrogen should be between 0 and 250 kg/ha';
    }
    if (formData.p < 0 || formData.p > 250) {
      newErrors.p = 'Phosphorus should be between 0 and 250 kg/ha';
    }
    if (formData.k < 0 || formData.k > 300) {
      newErrors.k = 'Potassium should be between 0 and 300 kg/ha';
    }
    if (formData.temperature < -5 || formData.temperature > 55) {
      newErrors.temperature = 'Temperature should be between -5°C and 55°C';
    }
    if (formData.humidity < 5 || formData.humidity > 100) {
      newErrors.humidity = 'Relative Humidity must be between 5% and 100%';
    }
    if (formData.ph < 0 || formData.ph > 14) {
      newErrors.ph = 'Soil pH must be between 0.0 and 14.0';
    }
    if (formData.rainfall < 0 || formData.rainfall > 3500) {
      newErrors.rainfall = 'Rainfall must be between 0 and 3500 mm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      n: 60,
      p: 40,
      k: 35,
      temperature: 25,
      humidity: 60,
      ph: 6.5,
      rainfall: 100,
      stateRegion: 'Punjab / Haryana',
      soilType: 'Alluvial Loam (दोमट मिट्टी)',
      farmName: '',
      fieldArea: ''
    });
    setErrors({});
    setSelectedPresetId('');
  };

  // Soil pH spectrum classification
  const getPhClassification = (ph: number) => {
    if (ph < 5.5) return { label: 'Strongly Acidic', color: 'text-red-700 bg-red-50 border-red-200' };
    if (ph < 6.5) return { label: 'Slightly Acidic (Good for most crops)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (ph <= 7.5) return { label: 'Neutral (Ideal nutrient uptake)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (ph <= 8.5) return { label: 'Moderately Alkaline', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { label: 'Strongly Alkaline (Saline risk)', color: 'text-purple-700 bg-purple-50 border-purple-200' };
  };

  const phStatus = getPhClassification(formData.ph);

  return (
    <div id="crop-recommendation-form-container" className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e1e3e4] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e1ecd4] text-[#002114] text-xs font-bold mb-2">
              <Sprout className="w-3.5 h-3.5 text-[#012d1d]" />
              Soil & Climate Input Form
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012d1d]">
              {t.formTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#414844] mt-1">
              {t.formSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="self-start sm:self-center px-3.5 py-2 rounded-lg border border-[#c1c8c2] hover:bg-[#f3f4f5] text-xs font-semibold text-[#414844] flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Values
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-6 pt-6 border-t border-[#e1e3e4]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#717973] mb-3">
            {t.presetsTitle} (Click to auto-fill)
          </p>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  selectedPresetId === p.id
                    ? 'bg-[#012d1d] text-white border-[#012d1d] shadow-xs'
                    : 'bg-[#f8f9fa] text-[#414844] border-[#c1c8c2] hover:border-[#012d1d] hover:bg-white'
                }`}
              >
                {p.title.split('/')[0]} ({p.inputs.stateRegion?.split('/')[0]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Soil Nutrients (NPK) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e1e3e4] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#e1e3e4] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#012d1d] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#7d5800]" />
                1. Soil Nutrients (NPK Levels in kg/ha)
              </h2>
              <p className="text-xs text-[#414844] mt-0.5">
                Obtained from your Soil Health Card / Laboratory soil test
              </p>
            </div>
            <span className="text-xs font-medium bg-[#f3f4f5] px-2.5 py-1 rounded-full text-[#414844]">
              Macro-nutrients
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nitrogen (N) */}
            <div className="space-y-2 bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
              <div className="flex items-center justify-between">
                <label htmlFor="input-n" className="font-bold text-sm text-[#191c1d]">
                  {t.nitrogenLabel}
                </label>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#e1ecd4] text-[#002114] rounded">
                  {formData.n} kg/ha
                </span>
              </div>
              <p className="text-[11px] text-[#414844] leading-tight">
                {t.nitrogenDesc}
              </p>
              <div className="pt-2">
                <input
                  id="input-n"
                  type="number"
                  min="0"
                  max="250"
                  step="1"
                  value={formData.n}
                  onChange={(e) => setFormData({ ...formData, n: Number(e.target.value) })}
                  className="w-full text-base font-bold px-3 py-2 bg-white border border-[#c1c8c2] rounded-lg focus:ring-2 focus:ring-[#012d1d] focus:border-[#012d1d] outline-none"
                />
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={formData.n}
                  onChange={(e) => setFormData({ ...formData, n: Number(e.target.value) })}
                  className="w-full accent-[#012d1d] mt-2 cursor-pointer"
                />
              </div>
              {errors.n && <p className="text-xs text-red-600 font-medium">{errors.n}</p>}
            </div>

            {/* Phosphorus (P) */}
            <div className="space-y-2 bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
              <div className="flex items-center justify-between">
                <label htmlFor="input-p" className="font-bold text-sm text-[#191c1d]">
                  {t.phosphorusLabel}
                </label>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#e1ecd4] text-[#002114] rounded">
                  {formData.p} kg/ha
                </span>
              </div>
              <p className="text-[11px] text-[#414844] leading-tight">
                {t.phosphorusDesc}
              </p>
              <div className="pt-2">
                <input
                  id="input-p"
                  type="number"
                  min="0"
                  max="250"
                  step="1"
                  value={formData.p}
                  onChange={(e) => setFormData({ ...formData, p: Number(e.target.value) })}
                  className="w-full text-base font-bold px-3 py-2 bg-white border border-[#c1c8c2] rounded-lg focus:ring-2 focus:ring-[#012d1d] focus:border-[#012d1d] outline-none"
                />
                <input
                  type="range"
                  min="0"
                  max="160"
                  value={formData.p}
                  onChange={(e) => setFormData({ ...formData, p: Number(e.target.value) })}
                  className="w-full accent-[#012d1d] mt-2 cursor-pointer"
                />
              </div>
              {errors.p && <p className="text-xs text-red-600 font-medium">{errors.p}</p>}
            </div>

            {/* Potassium (K) */}
            <div className="space-y-2 bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
              <div className="flex items-center justify-between">
                <label htmlFor="input-k" className="font-bold text-sm text-[#191c1d]">
                  {t.potassiumLabel}
                </label>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#e1ecd4] text-[#002114] rounded">
                  {formData.k} kg/ha
                </span>
              </div>
              <p className="text-[11px] text-[#414844] leading-tight">
                {t.potassiumDesc}
              </p>
              <div className="pt-2">
                <input
                  id="input-k"
                  type="number"
                  min="0"
                  max="300"
                  step="1"
                  value={formData.k}
                  onChange={(e) => setFormData({ ...formData, k: Number(e.target.value) })}
                  className="w-full text-base font-bold px-3 py-2 bg-white border border-[#c1c8c2] rounded-lg focus:ring-2 focus:ring-[#012d1d] focus:border-[#012d1d] outline-none"
                />
                <input
                  type="range"
                  min="0"
                  max="220"
                  value={formData.k}
                  onChange={(e) => setFormData({ ...formData, k: Number(e.target.value) })}
                  className="w-full accent-[#012d1d] mt-2 cursor-pointer"
                />
              </div>
              {errors.k && <p className="text-xs text-red-600 font-medium">{errors.k}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Soil pH & Characteristics */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e1e3e4] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#e1e3e4] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#012d1d] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                2. Soil Reaction (pH) & Field Profile
              </h2>
              <p className="text-xs text-[#414844] mt-0.5">
                Scale 0 (Strong Acid) to 14 (Strong Alkaline), with 6.0 - 7.5 ideal for most crops
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* pH Slider and status */}
            <div className="space-y-3 bg-[#f8f9fa] p-5 rounded-xl border border-[#e1e3e4]">
              <div className="flex items-center justify-between">
                <label htmlFor="input-ph" className="font-bold text-sm text-[#191c1d]">
                  {t.phLabel}
                </label>
                <span className="text-lg font-mono font-black text-[#012d1d]">
                  pH {formData.ph.toFixed(1)}
                </span>
              </div>

              <input
                id="input-ph"
                type="range"
                min="3.5"
                max="9.5"
                step="0.1"
                value={formData.ph}
                onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) })}
                className="w-full accent-[#012d1d] cursor-pointer"
              />

              {/* pH Color Scale */}
              <div className="h-2.5 rounded-full w-full bg-gradient-to-r from-red-500 via-amber-400 via-emerald-500 to-purple-600"></div>
              <div className="flex justify-between text-[10px] text-[#717973] font-medium">
                <span>3.5 (Acidic)</span>
                <span>6.5 - 7.0 (Neutral)</span>
                <span>9.5 (Alkaline)</span>
              </div>

              {/* Classification Badge */}
              <div className={`mt-2 px-3 py-2 rounded-lg border text-xs font-semibold ${phStatus.color}`}>
                Status: {phStatus.label}
              </div>
              {errors.ph && <p className="text-xs text-red-600 font-medium">{errors.ph}</p>}
            </div>

            {/* Soil Type Selection & Farm Name */}
            <div className="space-y-4 bg-[#f8f9fa] p-5 rounded-xl border border-[#e1e3e4]">
              <div>
                <label htmlFor="input-soil-type" className="font-bold text-sm text-[#191c1d] block mb-1.5">
                  {t.soilTypeLabel}
                </label>
                <select
                  id="input-soil-type"
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#c1c8c2] rounded-lg text-sm font-medium text-[#191c1d] focus:ring-2 focus:ring-[#012d1d] outline-none"
                >
                  {SOIL_TYPES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="input-farm-name" className="font-semibold text-xs text-[#414844] block mb-1">
                    Plot / Field Name
                  </label>
                  <input
                    id="input-farm-name"
                    type="text"
                    placeholder="e.g. North Acre #2"
                    value={formData.farmName || ''}
                    onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#c1c8c2] rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#012d1d] outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="input-field-area" className="font-semibold text-xs text-[#414844] block mb-1">
                    Area Size (Optional)
                  </label>
                  <input
                    id="input-field-area"
                    type="text"
                    placeholder="e.g. 3 Acres"
                    value={formData.fieldArea || ''}
                    onChange={(e) => setFormData({ ...formData, fieldArea: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#c1c8c2] rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#012d1d] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Climate & Weather Parameters */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e1e3e4] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e1e3e4] pb-4 gap-2">
            <div>
              <h2 className="text-lg font-bold text-[#012d1d] flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-sky-700" />
                3. Weather & Climate Conditions
              </h2>
              <p className="text-xs text-[#414844] mt-0.5">
                Local seasonal averages for temperature, humidity, and rainfall
              </p>
            </div>

            {/* Regional Auto-fill dropdown */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7d5800]" />
              <select
                id="region-autofill-select"
                value={formData.stateRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="px-3 py-1.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-lg text-xs font-semibold text-[#012d1d] focus:ring-2 focus:ring-[#012d1d] outline-none cursor-pointer"
              >
                {REGION_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    📍 {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Temperature */}
            <div className="space-y-2 bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
              <div className="flex items-center justify-between">
                <label htmlFor="input-temp" className="font-bold text-sm text-[#191c1d] flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-rose-600" />
                  {t.tempLabel}
                </label>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 rounded">
                  {formData.temperature.toFixed(1)} °C
                </span>
              </div>
              <p className="text-[11px] text-[#414844]">Average seasonal daily temperature</p>
              <div className="pt-2">
                <input
                  id="input-temp"
                  type="number"
                  min="5"
                  max="48"
                  step="0.5"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) || 0 })}
                  className="w-full text-base font-bold px-3 py-2 bg-white border border-[#c1c8c2] rounded-lg focus:ring-2 focus:ring-[#012d1d] outline-none"
                />
                <input
                  type="range"
                  min="8"
                  max="42"
                  step="0.5"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                  className="w-full accent-rose-600 mt-2 cursor-pointer"
                />
              </div>
              {errors.temperature && <p className="text-xs text-red-600 font-medium">{errors.temperature}</p>}
            </div>

            {/* Humidity */}
            <div className="space-y-2 bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
              <div className="flex items-center justify-between">
                <label htmlFor="input-hum" className="font-bold text-sm text-[#191c1d] flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-600" />
                  {t.humidityLabel}
                </label>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 rounded">
                  {formData.humidity} %
                </span>
              </div>
              <p className="text-[11px] text-[#414844]">Atmospheric moisture percentage</p>
              <div className="pt-2">
                <input
                  id="input-hum"
                  type="number"
                  min="10"
                  max="100"
                  step="1"
                  value={formData.humidity}
                  onChange={(e) => setFormData({ ...formData, humidity: Number(e.target.value) })}
                  className="w-full text-base font-bold px-3 py-2 bg-white border border-[#c1c8c2] rounded-lg focus:ring-2 focus:ring-[#012d1d] outline-none"
                />
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formData.humidity}
                  onChange={(e) => setFormData({ ...formData, humidity: Number(e.target.value) })}
                  className="w-full accent-sky-600 mt-2 cursor-pointer"
                />
              </div>
              {errors.humidity && <p className="text-xs text-red-600 font-medium">{errors.humidity}</p>}
            </div>

            {/* Rainfall */}
            <div className="space-y-2 bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
              <div className="flex items-center justify-between">
                <label htmlFor="input-rain" className="font-bold text-sm text-[#191c1d] flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-blue-700" />
                  {t.rainfallLabel}
                </label>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded">
                  {formData.rainfall} mm
                </span>
              </div>
              <p className="text-[11px] text-[#414844]">Expected monthly / seasonal rainfall</p>
              <div className="pt-2">
                <input
                  id="input-rain"
                  type="number"
                  min="10"
                  max="500"
                  step="5"
                  value={formData.rainfall}
                  onChange={(e) => setFormData({ ...formData, rainfall: Number(e.target.value) })}
                  className="w-full text-base font-bold px-3 py-2 bg-white border border-[#c1c8c2] rounded-lg focus:ring-2 focus:ring-[#012d1d] outline-none"
                />
                <input
                  type="range"
                  min="20"
                  max="350"
                  step="5"
                  value={formData.rainfall}
                  onChange={(e) => setFormData({ ...formData, rainfall: Number(e.target.value) })}
                  className="w-full accent-blue-700 mt-2 cursor-pointer"
                />
              </div>
              {errors.rainfall && <p className="text-xs text-red-600 font-medium">{errors.rainfall}</p>}
            </div>
          </div>
        </div>

        {/* Submit Button & Loading State */}
        <div className="bg-white p-6 rounded-2xl border border-[#e1e3e4] shadow-xs space-y-4">
          {isLoading ? (
            <div className="space-y-4 py-3">
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 rounded-full border-3 border-[#012d1d] border-t-transparent animate-spin"></div>
                <span className="text-base font-bold text-[#012d1d]">
                  {activeStepIndex === 0 && '🔬 Evaluating soil NPK & pH bioavailability...'}
                  {activeStepIndex === 1 && '⛅ Calculating thermal and rainfall compatibility envelope...'}
                  {activeStepIndex === 2 && '📊 Ranking 24+ crop varieties by yield and market fit...'}
                  {activeStepIndex >= 3 && '🌱 Preparing agronomy care plan & fertilizer schedule...'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#f3f4f5] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#012d1d] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (activeStepIndex + 1) * 28)}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#717973] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Validating against ICAR agro-climatic envelopes
              </div>

              <button
                id="submit-recommendation-btn"
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#012d1d] hover:bg-[#1b4332] text-white font-extrabold text-base sm:text-lg shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>{t.calculateButton}</span>
                <ArrowRight className="w-5 h-5 text-[#ffb702]" />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
