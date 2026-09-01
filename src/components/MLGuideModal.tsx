import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Terminal,
  Server,
  Sparkles
} from 'lucide-react';

interface MLGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MLGuideModal: React.FC<MLGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const pythonFastAPICode = `# main.py (FastAPI Microservice)
from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="Crop Recommendation ML Model")

# Load trained Random Forest or XGBoost model (trained on Kaggle Crop Dataset)
with open("crop_model.pkl", "rb") as f:
    model = pickle.load(f)

class CropFeatures(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@app.post("/predict")
def predict(features: CropFeatures):
    data = np.array([[
        features.N,
        features.P,
        features.K,
        features.temperature,
        features.humidity,
        features.ph,
        features.rainfall
    ]])
    prediction = model.predict(data)[0]
    probabilities = model.predict_proba(data)[0]
    confidence = float(np.max(probabilities))
    return {
        "recommended_crop": prediction,
        "confidence": confidence
    }
`;

  const nodeJSSwapCode = `// In server/recommendationEngine.ts (Line ~210)
// Replace generateCropRecommendation() with:

export async function generateCropRecommendation(inputs: SoilClimateInputs) {
  // Call your trained Python Scikit-Learn service
  const response = await fetch('http://localhost:8000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      N: inputs.n,
      P: inputs.p,
      K: inputs.k,
      temperature: inputs.temperature,
      humidity: inputs.humidity,
      ph: inputs.ph,
      rainfall: inputs.rainfall
    })
  });

  const mlResult = await response.json();
  const topCropId = mlResult.recommended_crop.toLowerCase();
  
  // Lookup rich agronomic data & care tips from CROP_DATABASE
  const cropProfile = CROP_DATABASE.find(c => c.id === topCropId) || CROP_DATABASE[0];
  
  return {
    id: 'REC-' + Date.now().toString(36).toUpperCase(),
    createdAt: new Date().toISOString(),
    inputs,
    topCrop: {
      ...cropProfile,
      suitabilityScore: Math.round(mlResult.confidence * 100),
      confidenceLabel: 'Optimal Fit',
      // ... match factors
    },
    soilHealth: analyzeSoilHealth(inputs),
    source: 'trained_scikit_learn_model'
  };
}
`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 border border-[#e1e3e4] shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdcc6] text-[#401c00] text-xs font-bold">
              <Cpu className="w-3.5 h-3.5" />
              Machine Learning Architecture
            </div>
            <h2 className="text-2xl font-bold text-[#012d1d]">
              How to Plug in a Trained ML Model (Scikit-Learn / PyTorch)
            </h2>
            <p className="text-xs text-[#414844]">
              Step-by-step guide to replacing rule-based logic with a real Machine Learning API.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#717973] hover:text-[#191c1d] p-1 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Overview banner */}
        <div className="bg-[#f8f9fa] border border-[#e1e3e4] rounded-xl p-4 space-y-2 text-xs text-[#414844]">
          <p className="font-semibold text-[#012d1d]">
            Where is the model integration point located in code?
          </p>
          <p>
            Check <code className="bg-white px-1.5 py-0.5 rounded border font-mono text-[#012d1d]">server/recommendationEngine.ts</code>. The function <code>generateCropRecommendation(inputs)</code> is designed with a plug-and-play interface.
          </p>
        </div>

        {/* Step 1: Train & Expose Python FastAPI */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#012d1d] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#7d5800]" />
              Step 1: Expose Trained Scikit-Learn Model via FastAPI (Python)
            </h3>
            <button
              onClick={() => copyToClipboard(pythonFastAPICode, 'fastapi')}
              className="text-xs text-[#012d1d] font-bold hover:underline flex items-center gap-1"
            >
              {copiedCode === 'fastapi' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode === 'fastapi' ? 'Copied' : 'Copy Code'}
            </button>
          </div>

          <div className="bg-[#191c1d] text-emerald-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
            <pre>{pythonFastAPICode}</pre>
          </div>
        </div>

        {/* Step 2: Swap Node.js Fetch in recommendationEngine.ts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#012d1d] flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-700" />
              Step 2: Connect Node.js Backend to Python REST Endpoint
            </h3>
            <button
              onClick={() => copyToClipboard(nodeJSSwapCode, 'nodejs')}
              className="text-xs text-[#012d1d] font-bold hover:underline flex items-center gap-1"
            >
              {copiedCode === 'nodejs' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode === 'nodejs' ? 'Copied' : 'Copy Code'}
            </button>
          </div>

          <div className="bg-[#191c1d] text-emerald-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
            <pre>{nodeJSSwapCode}</pre>
          </div>
        </div>

        {/* Local Run instructions */}
        <div className="bg-[#e1ecd4]/50 border border-[#c1c8c2] p-4 rounded-xl space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#002114]">
            How to Run this Project Locally
          </h4>
          <ol className="list-decimal list-inside text-xs text-[#191c1d] space-y-1">
            <li>Clone repository or extract downloaded files</li>
            <li>Run <code>npm install</code> to install dependencies</li>
            <li>Run <code>npm run dev</code> to start the full-stack server on <code>http://localhost:3000</code></li>
            <li>Build for production: <code>npm run build && npm start</code></li>
          </ol>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#e1e3e4]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-xs shadow-xs"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
