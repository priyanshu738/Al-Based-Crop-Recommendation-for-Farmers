import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingView } from './components/LandingView';
import { RecommendationForm } from './components/RecommendationForm';
import { ResultsView } from './components/ResultsView';
import { HistoryView } from './components/HistoryView';
import { CropCatalogView } from './components/CropCatalogView';
import { MLGuideModal } from './components/MLGuideModal';
import { Language } from './lib/translations';
import {
  CropProfile,
  PresetCondition,
  RecommendationResponse,
  SoilClimateInputs
} from './types';
import { PRESET_CONDITIONS, CROP_DATABASE } from '../server/cropData';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'form' | 'results' | 'history' | 'catalog' | 'ml-guide'
  >('home');
  const [language, setLanguage] = useState<Language>('en');

  const [presets, setPresets] = useState<PresetCondition[]>(PRESET_CONDITIONS);
  const [crops, setCrops] = useState<CropProfile[]>(CROP_DATABASE);
  const [history, setHistory] = useState<RecommendationResponse[]>([]);

  const [activeResult, setActiveResult] = useState<RecommendationResponse | null>(null);
  const [selectedPresetForForm, setSelectedPresetForForm] = useState<SoilClimateInputs | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMLModalOpen, setIsMLModalOpen] = useState(false);

  // Fetch initial history, presets, crops from REST backend
  useEffect(() => {
    fetchHistory();
    fetchPresets();
    fetchCrops();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
        // Auto-select latest if no active result
        if (data.history && data.history.length > 0 && !activeResult) {
          setActiveResult(data.history[0]);
        }
      }
    } catch (e) {
      console.warn('Could not fetch history:', e);
    }
  };

  const fetchPresets = async () => {
    try {
      const res = await fetch('/api/presets');
      if (res.ok) {
        const data = await res.json();
        if (data.presets && data.presets.length > 0) {
          setPresets(data.presets);
        }
      }
    } catch (e) {
      console.warn('Using fallback presets:', e);
    }
  };

  const fetchCrops = async () => {
    try {
      const res = await fetch('/api/crops');
      if (res.ok) {
        const data = await res.json();
        if (data.crops && data.crops.length > 0) {
          setCrops(data.crops);
        }
      }
    } catch (e) {
      console.warn('Using fallback crops:', e);
    }
  };

  // Submit form to backend /api/recommend
  const handleRecommendSubmit = async (inputs: SoilClimateInputs) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to calculate recommendation');
      }

      const recommendation: RecommendationResponse = await res.json();

      setActiveResult(recommendation);
      setHistory((prev) => [recommendation, ...prev]);
      setActiveTab('results');
      showToast(`Recommended: ${recommendation.topCrop.name} (${recommendation.topCrop.suitabilityScore}% Match)`);
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err?.message || 'Error communicating with crop recommendation service.');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete history item
  const handleDeleteHistoryItem = async (id: string) => {
    try {
      const res = await fetch(`/api/history/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHistory((prev) => prev.filter((item) => item.id !== id));
        if (activeResult?.id === id) {
          setActiveResult(null);
        }
        showToast('Assessment record deleted');
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  // Clear all history
  const handleClearAllHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all past crop recommendation records?')) {
      return;
    }
    try {
      const res = await fetch('/api/history', { method: 'DELETE' });
      if (res.ok) {
        setHistory([]);
        setActiveResult(null);
        showToast('All history cleared');
      }
    } catch (e) {
      console.error('Clear all error:', e);
    }
  };

  // Preset clicked from Home
  const handleSelectPresetFromHome = (preset: PresetCondition) => {
    setSelectedPresetForForm(preset.inputs);
    setActiveTab('form');
  };

  // Crop catalog test clicked
  const handleSelectCropFromCatalog = (crop: CropProfile) => {
    setSelectedPresetForForm({
      n: Math.round((crop.ranges.n.optimalMin + crop.ranges.n.optimalMax) / 2),
      p: Math.round((crop.ranges.p.optimalMin + crop.ranges.p.optimalMax) / 2),
      k: Math.round((crop.ranges.k.optimalMin + crop.ranges.k.optimalMax) / 2),
      temperature: Math.round((crop.ranges.temp.optimalMin + crop.ranges.temp.optimalMax) / 2),
      humidity: Math.round((crop.ranges.humidity.optimalMin + crop.ranges.humidity.optimalMax) / 2),
      ph: parseFloat(((crop.ranges.ph.optimalMin + crop.ranges.ph.optimalMax) / 2).toFixed(1)),
      rainfall: Math.round((crop.ranges.rainfall.optimalMin + crop.ranges.rainfall.optimalMax) / 2),
      soilType: crop.suitableSoilTypes[0] || 'Loam',
      farmName: `Test Plot for ${crop.name}`,
      fieldArea: '2.0 Hectares'
    });
    setActiveTab('form');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#191c1d]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#012d1d] text-white px-4 py-3 rounded-xl shadow-lg border border-[#e1ecd4] text-xs font-semibold animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ffb702]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-3 text-center text-xs font-bold text-rose-800">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        hasActiveResult={!!activeResult}
      />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'home' && (
          <LandingView
            language={language}
            onStartTest={() => {
              setSelectedPresetForForm(null);
              setActiveTab('form');
            }}
            onSelectPreset={handleSelectPresetFromHome}
            onOpenHistory={() => setActiveTab('history')}
            onOpenCatalog={() => setActiveTab('catalog')}
            onOpenMLGuide={() => setIsMLModalOpen(true)}
            presets={presets}
          />
        )}

        {activeTab === 'form' && (
          <RecommendationForm
            language={language}
            onSubmit={handleRecommendSubmit}
            isLoading={isLoading}
            presets={presets}
            initialInputs={selectedPresetForForm}
          />
        )}

        {activeTab === 'results' && (
          activeResult ? (
            <ResultsView
              language={language}
              result={activeResult}
              onTestAgain={() => {
                setSelectedPresetForForm(null);
                setActiveTab('form');
              }}
              onViewHistory={() => setActiveTab('history')}
            />
          ) : (
            <div className="text-center py-16 space-y-4">
              <p className="text-sm text-[#414844]">No recommendation generated yet.</p>
              <button
                onClick={() => setActiveTab('form')}
                className="px-6 py-3 rounded-xl bg-[#012d1d] text-white font-bold text-sm"
              >
                Start New Soil Test
              </button>
            </div>
          )
        )}

        {activeTab === 'history' && (
          <HistoryView
            language={language}
            history={history}
            onSelectRecord={(record) => {
              setActiveResult(record);
              setActiveTab('results');
            }}
            onDeleteRecord={handleDeleteHistoryItem}
            onClearAllHistory={handleClearAllHistory}
            onStartNewTest={() => {
              setSelectedPresetForForm(null);
              setActiveTab('form');
            }}
          />
        )}

        {activeTab === 'catalog' && (
          <CropCatalogView
            language={language}
            crops={crops}
            onSelectCropToTest={handleSelectCropFromCatalog}
          />
        )}

        {activeTab === 'ml-guide' && (
          <div className="space-y-6">
            <MLGuideModal isOpen={true} onClose={() => setActiveTab('home')} />
          </div>
        )}
      </main>

      {/* Floating ML Architecture Modal (if triggered via footer / banner) */}
      <MLGuideModal
        isOpen={isMLModalOpen}
        onClose={() => setIsMLModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        language={language}
        onOpenMLGuide={() => setIsMLModalOpen(true)}
        onOpenCatalog={() => setActiveTab('catalog')}
        onOpenForm={() => {
          setSelectedPresetForForm(null);
          setActiveTab('form');
        }}
      />
    </div>
  );
}
