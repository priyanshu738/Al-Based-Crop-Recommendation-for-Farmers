export interface SoilClimateInputs {
  n: number; // Nitrogen in soil (kg/ha or index, 0 - 150)
  p: number; // Phosphorus in soil (kg/ha, 0 - 150)
  k: number; // Potassium in soil (kg/ha, 0 - 210)
  temperature: number; // °C (e.g., 5 to 50)
  humidity: number; // % (e.g., 10 to 100)
  ph: number; // Soil pH (0 to 14)
  rainfall: number; // Annual/Seasonal Rainfall in mm (20 to 3000)
  stateRegion?: string;
  soilType?: string;
  farmName?: string;
  fieldArea?: string;
}

export type CropCategory = 'Cereal' | 'Pulse' | 'Cash Crop' | 'Fruit' | 'Vegetable' | 'Oilseed' | 'Plantation';

export interface ParameterRange {
  min: number;
  max: number;
  optimalMin: number;
  optimalMax: number;
  unit: string;
}

export interface CropProfile {
  id: string;
  name: string;
  hindiName: string;
  scientificName: string;
  category: CropCategory;
  description: string;
  idealSeason: string;
  growthDuration: string;
  expectedYield: string;
  waterRequirement: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  waterRequirementMm: string;
  marketDemand: 'High' | 'Moderate' | 'Very High' | 'Export Quality';
  ranges: {
    n: ParameterRange;
    p: ParameterRange;
    k: ParameterRange;
    temp: ParameterRange;
    humidity: ParameterRange;
    ph: ParameterRange;
    rainfall: ParameterRange;
  };
  suitableSoilTypes: string[];
  careTips: string[];
  pestManagement: string[];
  harvestingTips: string;
  iconName: string;
  colorTheme: string;
}

export interface CropMatchResult extends CropProfile {
  suitabilityScore: number; // 0 - 100
  confidenceLabel: 'Optimal Fit' | 'High Fit' | 'Moderate Fit' | 'Marginal';
  matchFactors: {
    parameter: string;
    label: string;
    inputValue: number;
    optimalRange: string;
    matchPercent: number; // 0 - 100
    status: 'Optimal' | 'Acceptable' | 'Suboptimal' | 'Stress';
  }[];
  suitabilityNotes: string[];
  precautions: string[];
}

export interface SoilHealthAssessment {
  nitrogen: { status: 'Deficient' | 'Optimal' | 'Excessive'; value: number; advice: string };
  phosphorus: { status: 'Deficient' | 'Optimal' | 'Excessive'; value: number; advice: string };
  potassium: { status: 'Deficient' | 'Optimal' | 'Excessive'; value: number; advice: string };
  ph: { status: 'Strongly Acidic' | 'Moderately Acidic' | 'Optimal (Neutral)' | 'Alkaline' | 'Strongly Alkaline'; value: number; advice: string };
  moisture: { status: 'Dry / Arid' | 'Moderate / Adequate' | 'Humid / High Rain'; value: number; advice: string };
  fertilizerPrescription: string[];
}

export interface RecommendationResponse {
  id: string;
  createdAt: string;
  inputs: SoilClimateInputs;
  topCrop: CropMatchResult;
  alternatives: CropMatchResult[];
  soilHealth: SoilHealthAssessment;
  aiAgronomyAdvisory?: string;
  source: 'ai_agronomy_engine' | 'rule_based_scorer';
}

export interface PresetCondition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  inputs: SoilClimateInputs;
}
