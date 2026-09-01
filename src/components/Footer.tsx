import React from 'react';
import { Sprout, PhoneCall, ShieldCheck, Cpu, Heart } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface FooterProps {
  language: Language;
  onOpenMLGuide: () => void;
  onOpenCatalog: () => void;
  onOpenForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenMLGuide,
  onOpenCatalog,
  onOpenForm
}) => {
  const t = translations[language];

  return (
    <footer id="app-footer" className="bg-[#ffffff] border-t border-[#e1e3e4] mt-16 text-[#414844]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#012d1d] flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-[#a5d0b9]" />
              </div>
              <span className="text-lg font-bold text-[#012d1d]">AgriAI CropWise</span>
            </div>
            <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
              Empowering farmers with data-driven agronomic intelligence, soil health evaluation, and precision crop matching.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#012d1d] bg-[#f3f4f5] px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              ICAR & FAO Agro-ecological Benchmarks
            </div>
          </div>

          {/* Col 2: Quick Features */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#191c1d]">
              Agricultural Tools
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onOpenForm}
                  className="hover:text-[#012d1d] hover:underline transition-colors"
                >
                  Soil & Climate Crop Prediction
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCatalog}
                  className="hover:text-[#012d1d] hover:underline transition-colors"
                >
                  Crop Benchmark Encyclopedia (24+ Crops)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenForm}
                  className="hover:text-[#012d1d] hover:underline transition-colors"
                >
                  Soil NPK & pH Diagnostic Tool
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Developer & ML */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#191c1d]">
              For Agronomists & Developers
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onOpenMLGuide}
                  className="flex items-center gap-1.5 text-[#7d5800] hover:text-[#401c00] font-semibold hover:underline"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Plug-in Custom ML / Scikit-Learn Model
                </button>
              </li>
              <li className="text-xs text-[#717973]">
                REST API Endpoint: <code className="bg-[#f3f4f5] px-1 py-0.5 rounded font-mono text-[#012d1d]">POST /api/recommend</code>
              </li>
              <li className="text-xs text-[#717973]">
                Zero-cold-start rule & Gaussian distance recommendation engine.
              </li>
            </ul>
          </div>

          {/* Col 4: Farmer Advisory & Support */}
          <div className="space-y-2.5 bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#012d1d] flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-[#7d5800]" />
              Kisan Support Helpline
            </h4>
            <p className="text-xs text-[#414844]">
              For emergency soil testing kits and localized agronomist consultations:
            </p>
            <div className="text-sm font-bold text-[#012d1d]">
              Toll-Free: 1800-180-1551
            </div>
            <div className="text-[11px] text-[#717973]">
              Available 6:00 AM – 10:00 PM (All Days)
            </div>
          </div>
        </div>

        <div className="border-t border-[#e1e3e4] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#717973]">
          <p>© {new Date().getFullYear()} AgriAI Precision Farming Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with care for sustainable farming communities worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
