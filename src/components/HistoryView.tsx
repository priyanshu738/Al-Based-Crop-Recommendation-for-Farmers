import React from 'react';
import {
  History,
  Trash2,
  Eye,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';
import { Language, translations } from '../lib/translations';
import { RecommendationResponse } from '../types';

interface HistoryViewProps {
  language: Language;
  history: RecommendationResponse[];
  onSelectRecord: (record: RecommendationResponse) => void;
  onDeleteRecord: (id: string) => void;
  onClearAllHistory: () => void;
  onStartNewTest: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  language,
  history,
  onSelectRecord,
  onDeleteRecord,
  onClearAllHistory,
  onStartNewTest
}) => {
  const t = translations[language];

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `crop-recommendations-history-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="history-view-container" className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e1e3e4] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e1ecd4] text-[#002114] text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5 text-[#012d1d]" />
            Field Testing Records
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012d1d]">
            {t.history}
          </h1>
          <p className="text-xs sm:text-sm text-[#414844] mt-1">
            Browse and compare past soil analyses and crop recommendations.
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={exportJSON}
              className="px-3.5 py-2 rounded-lg bg-[#f8f9fa] border border-[#c1c8c2] hover:bg-[#f3f4f5] text-xs font-semibold text-[#191c1d] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#7d5800]" />
              Export Records (JSON)
            </button>

            <button
              onClick={onClearAllHistory}
              className="px-3 py-2 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear History
            </button>
          </div>
        )}
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#e1e3e4] text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#f8f9fa] border border-[#e1e3e4] mx-auto flex items-center justify-center text-[#717973]">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#191c1d]">No Assessment Records Yet</h3>
          <p className="text-xs sm:text-sm text-[#414844] max-w-md mx-auto">
            {t.historyEmpty}
          </p>
          <button
            onClick={onStartNewTest}
            className="px-6 py-3 rounded-xl bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-sm shadow-xs transition-colors"
          >
            {t.startSoilTest}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const dateFormatted = new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={item.id}
                className="bg-white p-5 sm:p-6 rounded-xl border border-[#e1e3e4] hover:border-[#012d1d] hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#f3f4f5] text-[#414844] rounded">
                      {item.id}
                    </span>
                    <span className="text-xs text-[#717973] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {dateFormatted}
                    </span>
                    <span className="text-xs font-semibold text-[#7d5800]">
                      {item.inputs.stateRegion || 'General Region'}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-bold text-[#012d1d]">
                      {item.topCrop.name}
                    </h3>
                    <span className="text-xs font-bold text-[#717973]">
                      ({item.topCrop.hindiName})
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#e1ecd4] text-[#002114]">
                      {item.topCrop.suitabilityScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-[#414844]">
                    Farm: <strong className="text-[#191c1d]">{item.inputs.farmName || 'Primary Plot'}</strong> • NPK: {item.inputs.n}-{item.inputs.p}-{item.inputs.k} • pH: {item.inputs.ph} • Temp: {item.inputs.temperature}°C • Rain: {item.inputs.rainfall}mm
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onSelectRecord(item)}
                    className="px-4 py-2.5 rounded-lg bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#ffb702]" />
                    View Full Report
                  </button>

                  <button
                    onClick={() => onDeleteRecord(item.id)}
                    className="p-2.5 rounded-lg text-[#717973] hover:text-rose-700 hover:bg-rose-50 transition-colors"
                    title="Delete record"
                    aria-label="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
