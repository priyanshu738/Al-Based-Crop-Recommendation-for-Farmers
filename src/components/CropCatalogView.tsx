import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Layers,
  Thermometer,
  CloudRain,
  Droplets,
  Sprout,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Language, translations } from '../lib/translations';
import { CropProfile, CropCategory } from '../types';

interface CropCatalogViewProps {
  language: Language;
  crops: CropProfile[];
  onSelectCropToTest: (crop: CropProfile) => void;
}

const CATEGORIES: ('All' | CropCategory)[] = [
  'All',
  'Cereal',
  'Pulse',
  'Cash Crop',
  'Fruit',
  'Plantation'
];

export const CropCatalogView: React.FC<CropCatalogViewProps> = ({
  language,
  crops,
  onSelectCropToTest
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CropCategory>('All');
  const [activeModalCrop, setActiveModalCrop] = useState<CropProfile | null>(null);

  const filteredCrops = crops.filter((crop) => {
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    const matchesQuery =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div id="crop-catalog-container" className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header & Search */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e1e3e4] shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e1ecd4] text-[#002114] text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#012d1d]" />
            Agronomic Database (24+ Crops)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012d1d]">
            {t.cropLibrary}
          </h1>
          <p className="text-xs sm:text-sm text-[#414844] mt-1">
            Explore optimal soil nutrient envelopes, climatic thresholds, and cultivation guidelines for Indian & global staple crops.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#717973]" />
            <input
              type="text"
              placeholder="Search by crop name (e.g. Rice, Wheat, Chickpea, Mango)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-sm focus:ring-2 focus:ring-[#012d1d] outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#012d1d] text-white border-[#012d1d]'
                    : 'bg-[#f8f9fa] text-[#414844] border-[#c1c8c2] hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Crops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-xl border border-[#e1e3e4] hover:border-[#012d1d] hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e1ecd4] text-[#002114]">
                  {crop.category}
                </span>
                <span className="text-xs font-serif italic text-[#717973]">
                  {crop.scientificName}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#012d1d]">
                  {crop.name}
                </h3>
                <p className="text-xs font-bold text-[#7d5800]">
                  {crop.hindiName}
                </p>
                <p className="text-xs text-[#414844] line-clamp-2 mt-1">
                  {crop.description}
                </p>
              </div>

              {/* Requirement highlights */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#f3f4f5] text-[11px]">
                <div className="bg-[#f8f9fa] p-2 rounded-lg text-center">
                  <p className="text-[#717973] font-semibold">NPK Ideal</p>
                  <p className="font-mono font-bold text-[#012d1d] mt-0.5">
                    {crop.ranges.n.optimalMin}-{crop.ranges.p.optimalMin}-{crop.ranges.k.optimalMin}
                  </p>
                </div>

                <div className="bg-[#f8f9fa] p-2 rounded-lg text-center">
                  <p className="text-[#717973] font-semibold">Temp</p>
                  <p className="font-mono font-bold text-[#012d1d] mt-0.5">
                    {crop.ranges.temp.optimalMin}-{crop.ranges.temp.optimalMax}°C
                  </p>
                </div>

                <div className="bg-[#f8f9fa] p-2 rounded-lg text-center">
                  <p className="text-[#717973] font-semibold">Water</p>
                  <p className="font-bold text-[#012d1d] mt-0.5">
                    {crop.waterRequirement}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e1e3e4] flex items-center justify-between">
              <button
                onClick={() => setActiveModalCrop(crop)}
                className="text-xs font-bold text-[#7d5800] hover:underline"
              >
                View Full Specs →
              </button>

              <button
                onClick={() => onSelectCropToTest(crop)}
                className="px-3 py-1.5 bg-[#012d1d] hover:bg-[#1b4332] text-white rounded-lg text-xs font-bold transition-colors"
              >
                Test Field →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detailed crop spec */}
      {activeModalCrop && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 border border-[#e1e3e4] shadow-xl animate-fadeIn">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e1ecd4] text-[#002114]">
                  {activeModalCrop.category}
                </span>
                <h2 className="text-2xl font-bold text-[#012d1d] mt-1">
                  {activeModalCrop.name} ({activeModalCrop.hindiName})
                </h2>
                <p className="text-xs font-serif italic text-[#717973]">
                  {activeModalCrop.scientificName}
                </p>
              </div>

              <button
                onClick={() => setActiveModalCrop(null)}
                className="text-[#717973] hover:text-[#191c1d] p-1 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-[#414844] leading-relaxed">
              {activeModalCrop.description}
            </p>

            {/* Optimal Range matrix */}
            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#012d1d]">
                Agronomic Nutrient & Climate Thresholds
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#717973]">Nitrogen (N):</span>
                  <p className="font-bold text-[#191c1d]">{activeModalCrop.ranges.n.min} - {activeModalCrop.ranges.n.max} kg/ha</p>
                </div>
                <div>
                  <span className="text-[#717973]">Phosphorus (P):</span>
                  <p className="font-bold text-[#191c1d]">{activeModalCrop.ranges.p.min} - {activeModalCrop.ranges.p.max} kg/ha</p>
                </div>
                <div>
                  <span className="text-[#717973]">Potassium (K):</span>
                  <p className="font-bold text-[#191c1d]">{activeModalCrop.ranges.k.min} - {activeModalCrop.ranges.k.max} kg/ha</p>
                </div>
                <div>
                  <span className="text-[#717973]">Soil pH:</span>
                  <p className="font-bold text-[#191c1d]">{activeModalCrop.ranges.ph.optimalMin} - {activeModalCrop.ranges.ph.optimalMax}</p>
                </div>
                <div>
                  <span className="text-[#717973]">Temperature:</span>
                  <p className="font-bold text-[#191c1d]">{activeModalCrop.ranges.temp.optimalMin} - {activeModalCrop.ranges.temp.optimalMax} °C</p>
                </div>
                <div>
                  <span className="text-[#717973]">Humidity:</span>
                  <p className="font-bold text-[#191c1d]">{activeModalCrop.ranges.humidity.optimalMin} - {activeModalCrop.ranges.humidity.optimalMax} %</p>
                </div>
                <div>
                  <span className="text-[#717973]">Rainfall:</span>
                  <p className="font-bold text-[#191c1d]">{activeModalCrop.ranges.rainfall.optimalMin} - {activeModalCrop.ranges.rainfall.optimalMax} mm</p>
                </div>
                <div>
                  <span className="text-[#717973]">Expected Yield:</span>
                  <p className="font-bold text-[#191c1d]">{activeModalCrop.expectedYield.split('/')[0]}</p>
                </div>
              </div>
            </div>

            {/* Care tips */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#012d1d]">
                Agronomic Management & Care Tips
              </h4>
              <ul className="space-y-1.5 text-xs text-[#414844]">
                {activeModalCrop.careTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#7d5800] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pest management */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                Pest & Disease Control
              </h4>
              <ul className="space-y-1.5 text-xs text-rose-950">
                {activeModalCrop.pestManagement.map((pm, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>{pm}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#e1e3e4]">
              <button
                onClick={() => setActiveModalCrop(null)}
                className="px-4 py-2 rounded-lg border border-[#c1c8c2] text-xs font-bold text-[#414844]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const c = activeModalCrop;
                  setActiveModalCrop(null);
                  onSelectCropToTest(c);
                }}
                className="px-5 py-2 rounded-lg bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs font-bold"
              >
                Simulate Field with Optimal Specs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
