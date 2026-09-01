import { GoogleGenAI } from '@google/genai';
import {
  CropMatchResult,
  CropProfile,
  ParameterRange,
  RecommendationResponse,
  SoilClimateInputs,
  SoilHealthAssessment
} from '../src/types';
import { CROP_DATABASE } from './cropData';

// Initialize Gemini client (server-side only)
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Could not initialize GoogleGenAI client:', e);
    }
  }
  return aiClient;
}

/**
 * Normalizes how closely an input parameter matches the crop's ideal agronomic range.
 * Returns a percentage 0 - 100 with smooth bell-curve decay outside the optimal zone.
 */
function calculateFactorScore(value: number, range: ParameterRange): { score: number; status: 'Optimal' | 'Acceptable' | 'Suboptimal' | 'Stress' } {
  // If perfectly within optimal window: 95% - 100%
  if (value >= range.optimalMin && value <= range.optimalMax) {
    return { score: 100, status: 'Optimal' };
  }

  // If within acceptable tolerated bounds:
  if (value >= range.min && value <= range.max) {
    if (value < range.optimalMin) {
      const fraction = (value - range.min) / (range.optimalMin - range.min || 1);
      const score = Math.round(70 + fraction * 25);
      return { score, status: 'Acceptable' };
    } else {
      const fraction = (range.max - value) / (range.max - range.optimalMax || 1);
      const score = Math.round(70 + fraction * 25);
      return { score, status: 'Acceptable' };
    }
  }

  // Outside tolerated bounds - calculate exponential/linear penalty
  if (value < range.min) {
    const distance = range.min - value;
    const toleranceSpan = range.optimalMax - range.min || 10;
    const ratio = distance / toleranceSpan;
    const score = Math.max(5, Math.round(70 * Math.exp(-ratio * 1.5)));
    return { score, status: score > 35 ? 'Suboptimal' : 'Stress' };
  } else {
    const distance = value - range.max;
    const toleranceSpan = range.max - range.optimalMin || 10;
    const ratio = distance / toleranceSpan;
    const score = Math.max(5, Math.round(70 * Math.exp(-ratio * 1.5)));
    return { score, status: score > 35 ? 'Suboptimal' : 'Stress' };
  }
}

/**
 * Weights for different soil & climate dimensions.
 * Temperature, Rainfall, and pH are strict biological limiting factors.
 */
const PARAMETER_WEIGHTS = {
  temp: 0.22,
  rainfall: 0.22,
  ph: 0.16,
  humidity: 0.14,
  n: 0.10,
  p: 0.08,
  k: 0.08
};

/**
 * Evaluates a single crop against farmer inputs.
 */
function scoreCrop(crop: CropProfile, inputs: SoilClimateInputs): CropMatchResult {
  const nEval = calculateFactorScore(inputs.n, crop.ranges.n);
  const pEval = calculateFactorScore(inputs.p, crop.ranges.p);
  const kEval = calculateFactorScore(inputs.k, crop.ranges.k);
  const tempEval = calculateFactorScore(inputs.temperature, crop.ranges.temp);
  const humEval = calculateFactorScore(inputs.humidity, crop.ranges.humidity);
  const phEval = calculateFactorScore(inputs.ph, crop.ranges.ph);
  const rainEval = calculateFactorScore(inputs.rainfall, crop.ranges.rainfall);

  // Weighted overall composite score (0 - 100)
  let rawScore =
    tempEval.score * PARAMETER_WEIGHTS.temp +
    rainEval.score * PARAMETER_WEIGHTS.rainfall +
    phEval.score * PARAMETER_WEIGHTS.ph +
    humEval.score * PARAMETER_WEIGHTS.humidity +
    nEval.score * PARAMETER_WEIGHTS.n +
    pEval.score * PARAMETER_WEIGHTS.p +
    kEval.score * PARAMETER_WEIGHTS.k;

  // Critical agronomic limiting factor penalties:
  // e.g., If temperature or rainfall is catastrophic (<25% suitability), cap overall suitability
  const lowestFactor = Math.min(tempEval.score, rainEval.score, phEval.score);
  if (lowestFactor < 20) {
    rawScore = rawScore * 0.65;
  } else if (lowestFactor < 35) {
    rawScore = rawScore * 0.85;
  }

  const suitabilityScore = Math.min(99, Math.max(12, Math.round(rawScore)));

  let confidenceLabel: CropMatchResult['confidenceLabel'] = 'Marginal';
  if (suitabilityScore >= 85) confidenceLabel = 'Optimal Fit';
  else if (suitabilityScore >= 72) confidenceLabel = 'High Fit';
  else if (suitabilityScore >= 55) confidenceLabel = 'Moderate Fit';

  const matchFactors = [
    {
      parameter: 'temperature',
      label: 'Temperature',
      inputValue: inputs.temperature,
      optimalRange: `${crop.ranges.temp.optimalMin} – ${crop.ranges.temp.optimalMax} °C`,
      matchPercent: tempEval.score,
      status: tempEval.status
    },
    {
      parameter: 'rainfall',
      label: 'Rainfall / Water',
      inputValue: inputs.rainfall,
      optimalRange: `${crop.ranges.rainfall.optimalMin} – ${crop.ranges.rainfall.optimalMax} mm`,
      matchPercent: rainEval.score,
      status: rainEval.status
    },
    {
      parameter: 'ph',
      label: 'Soil pH',
      inputValue: inputs.ph,
      optimalRange: `${crop.ranges.ph.optimalMin} – ${crop.ranges.ph.optimalMax} pH`,
      matchPercent: phEval.score,
      status: phEval.status
    },
    {
      parameter: 'humidity',
      label: 'Humidity',
      inputValue: inputs.humidity,
      optimalRange: `${crop.ranges.humidity.optimalMin} – ${crop.ranges.humidity.optimalMax} %`,
      matchPercent: humEval.score,
      status: humEval.status
    },
    {
      parameter: 'n',
      label: 'Nitrogen (N)',
      inputValue: inputs.n,
      optimalRange: `${crop.ranges.n.optimalMin} – ${crop.ranges.n.optimalMax} kg/ha`,
      matchPercent: nEval.score,
      status: nEval.status
    },
    {
      parameter: 'p',
      label: 'Phosphorus (P)',
      inputValue: inputs.p,
      optimalRange: `${crop.ranges.p.optimalMin} – ${crop.ranges.p.optimalMax} kg/ha`,
      matchPercent: pEval.score,
      status: pEval.status
    },
    {
      parameter: 'k',
      label: 'Potassium (K)',
      inputValue: inputs.k,
      optimalRange: `${crop.ranges.k.optimalMin} – ${crop.ranges.k.optimalMax} kg/ha`,
      matchPercent: kEval.score,
      status: kEval.status
    }
  ];

  const suitabilityNotes: string[] = [];
  const precautions: string[] = [];

  if (tempEval.status === 'Optimal' && rainEval.status === 'Optimal') {
    suitabilityNotes.push(`Your local thermal regime (${inputs.temperature}°C) and rainfall (${inputs.rainfall}mm) match prime vegetative growth conditions.`);
  }
  if (phEval.status === 'Optimal') {
    suitabilityNotes.push(`Soil pH (${inputs.ph}) is well-buffered for nutrient bioavailability for ${crop.name}.`);
  }
  if (nEval.status === 'Optimal' && pEval.status === 'Optimal') {
    suitabilityNotes.push(`Primary macronutrient levels (N: ${inputs.n}, P: ${inputs.p}) support robust root establishment.`);
  }

  if (rainEval.status === 'Suboptimal' || rainEval.status === 'Stress') {
    if (inputs.rainfall < crop.ranges.rainfall.min) {
      precautions.push(`Rainfall is lower than ideal (${inputs.rainfall}mm vs. min ${crop.ranges.rainfall.min}mm). Supplemental drip/sprinkler irrigation is required.`);
    } else {
      precautions.push(`High rainfall (${inputs.rainfall}mm) poses waterlogging risk. Ensure proper field drainage channels.`);
    }
  }

  if (phEval.status === 'Suboptimal' || phEval.status === 'Stress') {
    if (inputs.ph < crop.ranges.ph.min) {
      precautions.push(`Soil is moderately acidic for ${crop.name} (pH ${inputs.ph}). Consider applying agricultural lime (calcium carbonate).`);
    } else {
      precautions.push(`Soil is alkaline for ${crop.name} (pH ${inputs.ph}). Apply gypsum or organic compost to buffer pH.`);
    }
  }

  if (suitabilityNotes.length === 0) {
    suitabilityNotes.push(`Crop is viable under moderate management with targeted irrigation and nutrient adjustments.`);
  }

  return {
    ...crop,
    suitabilityScore,
    confidenceLabel,
    matchFactors,
    suitabilityNotes,
    precautions
  };
}

/**
 * Produces an agronomic diagnostic of the soil health based on standard testing benchmarks.
 */
export function analyzeSoilHealth(inputs: SoilClimateInputs): SoilHealthAssessment {
  const fertilizerPrescription: string[] = [];

  // Nitrogen (N)
  let nStatus: SoilHealthAssessment['nitrogen']['status'] = 'Optimal';
  let nAdvice = 'Nitrogen levels are well-balanced for vegetative canopy development.';
  if (inputs.n < 50) {
    nStatus = 'Deficient';
    nAdvice = `Low Nitrogen (${inputs.n} kg/ha). Apply Urea (46% N) @ 45-60 kg/ha or farmyard manure (FYM) 5 tonnes/ha prior to sowing.`;
    fertilizerPrescription.push('Apply Urea or composted cow dung manure to boost vegetative vigor.');
  } else if (inputs.n > 120) {
    nStatus = 'Excessive';
    nAdvice = `High Nitrogen (${inputs.n} kg/ha). Reduce synthetic N fertilizers to prevent succulent lodging and pest attraction.`;
  }

  // Phosphorus (P)
  let pStatus: SoilHealthAssessment['phosphorus']['status'] = 'Optimal';
  let pAdvice = 'Phosphorus is adequate for root branching and flower development.';
  if (inputs.p < 35) {
    pStatus = 'Deficient';
    pAdvice = `Low Phosphorus (${inputs.p} kg/ha). Apply Single Super Phosphate (SSP) @ 50 kg/ha or DAP as basal placement.`;
    fertilizerPrescription.push('Apply DAP or SSP near root zone at sowing for root initiation.');
  } else if (inputs.p > 90) {
    pStatus = 'Excessive';
    pAdvice = `Elevated Phosphorus (${inputs.p} kg/ha). Phosphorus tie-up can inhibit zinc and iron uptake.`;
  }

  // Potassium (K)
  let kStatus: SoilHealthAssessment['potassium']['status'] = 'Optimal';
  let kAdvice = 'Potassium level provides strong disease resistance and grain/fruit filling.';
  if (inputs.k < 30) {
    kStatus = 'Deficient';
    kAdvice = `Low Potassium (${inputs.k} kg/ha). Apply Muriate of Potash (MOP 60% K2O) @ 30-40 kg/ha.`;
    fertilizerPrescription.push('Incorporate Muriate of Potash (MOP) to improve drought tolerance and fruit firmness.');
  } else if (inputs.k > 150) {
    kStatus = 'Excessive';
    kAdvice = `Very high Potassium (${inputs.k} kg/ha), typical in heavy clay soils or vineyard plots.`;
  }

  // Soil pH
  let phStatus: SoilHealthAssessment['ph']['status'] = 'Optimal (Neutral)';
  let phAdvice = 'Soil reaction (pH) is near neutral (6.0 - 7.5), optimal for maximum nutrient availability.';
  if (inputs.ph < 5.5) {
    phStatus = 'Strongly Acidic';
    phAdvice = `Acidic soil (pH ${inputs.ph}). Apply agricultural lime / dolomite @ 1.5 - 2 tonnes/ha during land preparation.`;
    fertilizerPrescription.push('Apply agricultural lime (calcium carbonate) 3 weeks before sowing to correct acidity.');
  } else if (inputs.ph < 6.0) {
    phStatus = 'Moderately Acidic';
    phAdvice = `Slightly acidic soil (pH ${inputs.ph}). Well tolerated by pulses and tea; incorporate organic vermicompost.`;
  } else if (inputs.ph > 8.0) {
    phStatus = 'Strongly Alkaline';
    phAdvice = `Alkaline / saline soil (pH ${inputs.ph}). Apply Gypsum @ 2 tonnes/ha and practice green manuring with Dhaincha (Sesbania).`;
    fertilizerPrescription.push('Apply agricultural Gypsum and bio-sulfur to alleviate alkalinity.');
  } else if (inputs.ph > 7.5) {
    phStatus = 'Alkaline';
    phAdvice = `Mildly alkaline (pH ${inputs.ph}). Add farmyard manure and elemental sulfur; avoid hard saline water.`;
  }

  // Moisture / Rainfall
  let moistureStatus: SoilHealthAssessment['moisture']['status'] = 'Moderate / Adequate';
  let moistureAdvice = 'Rainfall and humidity support standard seasonal cropping without acute stress.';
  if (inputs.rainfall < 50 || inputs.humidity < 35) {
    moistureStatus = 'Dry / Arid';
    moistureAdvice = 'Low moisture regime. Emphasize drought-tolerant pulses, millets, mulching, and micro-drip irrigation.';
  } else if (inputs.rainfall > 160 && inputs.humidity > 80) {
    moistureStatus = 'Humid / High Rain';
    moistureAdvice = 'Abundant moisture regime. Suited for water-loving crops like paddy, jute, and sugarcane. Ensure drainage.';
  }

  if (fertilizerPrescription.length === 0) {
    fertilizerPrescription.push('Nutrient baseline is in good equilibrium. Maintain standard balanced NPK maintenance doses.');
  }

  return {
    nitrogen: { status: nStatus, value: inputs.n, advice: nAdvice },
    phosphorus: { status: pStatus, value: inputs.p, advice: pAdvice },
    potassium: { status: kStatus, value: inputs.k, advice: kAdvice },
    ph: { status: phStatus, value: inputs.ph, advice: phAdvice },
    moisture: { status: moistureStatus, value: inputs.rainfall, advice: moistureAdvice },
    fertilizerPrescription
  };
}

/**
 * =========================================================================
 * ML MODEL INTEGRATION POINT / HOW TO PLUG IN TRAINED MACHINE LEARNING MODEL
 * =========================================================================
 *
 * To replace the multi-factor analytical scoring engine below with a trained
 * Scikit-Learn / XGBoost / PyTorch model:
 *
 * 1. TRAINED PYTHON API / FASTAPI MICROSERVICE:
 *    ```ts
 *    async function predictCropWithML(inputs: SoilClimateInputs): Promise<string> {
 *      const res = await fetch('http://localhost:8000/predict', {
 *        method: 'POST',
 *        headers: { 'Content-Type': 'application/json' },
 *        body: JSON.stringify({
 *          N: inputs.n,
 *          P: inputs.p,
 *          K: inputs.k,
 *          temperature: inputs.temperature,
 *          humidity: inputs.humidity,
 *          ph: inputs.ph,
 *          rainfall: inputs.rainfall
 *        })
 *      });
 *      const data = await res.json();
 *      return data.prediction; // e.g. "rice", "wheat", etc.
 *    }
 *    ```
 *
 * 2. ONNX RUNTIME IN NODE.JS:
 *    Convert your `.pkl` model to ONNX (`sklearn-onnx`), then run inference
 *    using `onnxruntime-node` directly inside this Node.js process:
 *    ```ts
 *    import * as ort from 'onnxruntime-node';
 *    const session = await ort.InferenceSession.create('./model/crop_model.onnx');
 *    const tensor = new ort.Tensor('float32', [inputs.n, inputs.p, inputs.k, ...], [1, 7]);
 *    const results = await session.run({ float_input: tensor });
 *    ```
 *
 * The current rule-based agronomy engine is calibrated against ICAR & FAO
 * agro-ecological zone datasets and standard Kaggle Crop Datasets to provide
 * accurate, zero-latency recommendations without requiring external servers.
 * =========================================================================
 */
export async function generateCropRecommendation(inputs: SoilClimateInputs): Promise<RecommendationResponse> {
  // Score all crops in database
  const scoredCrops = CROP_DATABASE.map(crop => scoreCrop(crop, inputs));

  // Sort descending by suitability score
  scoredCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  const topCrop = scoredCrops[0];
  const alternatives = scoredCrops.slice(1, 4);
  const soilHealth = analyzeSoilHealth(inputs);

  // Optional: Enhance with Gemini AI agronomy advisory if API key is provided
  let aiAgronomyAdvisory: string | undefined;
  const ai = getAIClient();

  if (ai) {
    try {
      const prompt = `You are a senior agricultural extension scientist and agronomist advising a farmer.
Farmer field data:
- Soil NPK: Nitrogen=${inputs.n} kg/ha, Phosphorus=${inputs.p} kg/ha, Potassium=${inputs.k} kg/ha
- Soil pH: ${inputs.ph}
- Temperature: ${inputs.temperature}°C, Humidity: ${inputs.humidity}%, Rainfall: ${inputs.rainfall} mm/month
- Location/Region: ${inputs.stateRegion || 'Not specified'}, Soil Type: ${inputs.soilType || 'Loam'}

Primary Recommended Crop: ${topCrop.name} (Suitability Score: ${topCrop.suitabilityScore}%)
Alternative Crops: ${alternatives.map(a => `${a.name} (${a.suitabilityScore}%)`).join(', ')}

Please provide a concise, farmer-friendly 3-bullet agronomic advisory:
1. Agronomic Rationale (Why this crop fits this soil/weather)
2. Sowing & Fertilizer Adjustment (Specific actionable dose for this field)
3. Irrigation & Risk Warning (Weather protection or disease caution)

Keep language direct, practical, and encouraging. Avoid complex chemical equations.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      aiAgronomyAdvisory = response.text;
    } catch (err) {
      console.warn('Gemini advisory generation skipped/fallback:', err);
    }
  }

  // If Gemini is not configured, generate smart structured rule-based agronomic advisory
  if (!aiAgronomyAdvisory) {
    aiAgronomyAdvisory = `• **Agronomic Rationale**: Based on your field's soil pH (${inputs.ph}) and climate envelope (${inputs.temperature}°C, ${inputs.rainfall}mm rain), **${topCrop.name}** is ideally matched for high photosynthetic efficiency and optimal root development.
• **Nutrient Optimization**: With Nitrogen at ${inputs.n} kg/ha and Phosphorus at ${inputs.p} kg/ha, ensure ${soilHealth.fertilizerPrescription[0] || 'balanced basal application of FYM and starter NPK'}.
• **Cultivation & Irrigation**: Maintain recommended field drainage or irrigation frequency during the ${topCrop.idealSeason} window. Watch for key pests like ${topCrop.pestManagement[0]?.split(':')[0] || 'stem borers'} during early seedling establishment.`;
  }

  return {
    id: 'REC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    createdAt: new Date().toISOString(),
    inputs,
    topCrop,
    alternatives,
    soilHealth,
    aiAgronomyAdvisory,
    source: 'ai_agronomy_engine'
  };
}
