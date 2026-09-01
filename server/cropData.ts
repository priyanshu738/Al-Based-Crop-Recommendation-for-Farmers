import { CropProfile, PresetCondition } from '../src/types';

export const CROP_DATABASE: CropProfile[] = [
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    hindiName: 'चावल (धान)',
    scientificName: 'Oryza sativa',
    category: 'Cereal',
    description: 'Primary staple cereal thriving in warm, high-moisture tropical floodplains and irrigated lowlands.',
    idealSeason: 'Kharif (June – November)',
    growthDuration: '105 – 150 days',
    expectedYield: '4.0 – 6.5 tonnes / hectare',
    waterRequirement: 'Very High',
    waterRequirementMm: '1500 – 2500 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 60, max: 140, optimalMin: 80, optimalMax: 120, unit: 'kg/ha' },
      p: { min: 30, max: 80, optimalMin: 40, optimalMax: 60, unit: 'kg/ha' },
      k: { min: 30, max: 60, optimalMin: 35, optimalMax: 50, unit: 'kg/ha' },
      temp: { min: 20, max: 38, optimalMin: 22, optimalMax: 30, unit: '°C' },
      humidity: { min: 70, max: 100, optimalMin: 80, optimalMax: 95, unit: '%' },
      ph: { min: 5.0, max: 7.8, optimalMin: 6.0, optimalMax: 7.0, unit: 'pH' },
      rainfall: { min: 140, max: 350, optimalMin: 180, optimalMax: 280, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Clay', 'Clay Loam', 'Alluvial Silty Soil'],
    careTips: [
      'Maintain 2-5 cm standing water layer during the vegetative and tillering stages.',
      'Split Nitrogen application: 50% basal, 25% at active tillering, and 25% at panicle initiation.',
      'Incorporate organic manure (FYM) 2-3 weeks before transplanting.'
    ],
    pestManagement: [
      'Monitor for Stem Borer: Use pheromone traps @ 5/acre and apply Neem oil or Chlorantraniliprole.',
      'Control Blast disease with Tricyclazole 75% WP @ 0.6 g/L water at first symptom onset.'
    ],
    harvestingTips: 'Harvest when 80-85% of the panicles turn golden yellow and grain moisture drops to ~20%.',
    iconName: 'Sprout',
    colorTheme: 'emerald'
  },
  {
    id: 'wheat',
    name: 'Wheat',
    hindiName: 'गेहूं',
    scientificName: 'Triticum aestivum',
    category: 'Cereal',
    description: 'Major cool-season rabi cereal requiring cool germination and warm sunny grain-filling periods.',
    idealSeason: 'Rabi (November – April)',
    growthDuration: '110 – 140 days',
    expectedYield: '4.5 – 6.0 tonnes / hectare',
    waterRequirement: 'Medium',
    waterRequirementMm: '450 – 650 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 40, max: 120, optimalMin: 60, optimalMax: 100, unit: 'kg/ha' },
      p: { min: 30, max: 70, optimalMin: 45, optimalMax: 60, unit: 'kg/ha' },
      k: { min: 20, max: 60, optimalMin: 30, optimalMax: 45, unit: 'kg/ha' },
      temp: { min: 10, max: 26, optimalMin: 15, optimalMax: 22, unit: '°C' },
      humidity: { min: 30, max: 70, optimalMin: 40, optimalMax: 60, unit: '%' },
      ph: { min: 5.5, max: 8.2, optimalMin: 6.2, optimalMax: 7.5, unit: 'pH' },
      rainfall: { min: 30, max: 120, optimalMin: 50, optimalMax: 90, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Well-drained Loam', 'Clay Loam', 'Alluvial Soil'],
    careTips: [
      'Critical irrigation stages: Crown Root Initiation (CRI at 21 days), Tillering, Flowering, and Milking.',
      'Ensure seed treatment with Trichoderma viride or Carboxin prior to sowing.',
      'Avoid delayed sowing beyond November to prevent terminal heat stress in March.'
    ],
    pestManagement: [
      'Watch out for Yellow/Brown Rust; spray Propiconazole 25 EC (1 ml/L) if stripe rust spots appear.',
      'Manage Aphids with Imidacloprid 17.8 SL @ 0.5 ml/L during flowering.'
    ],
    harvestingTips: 'Harvest when leaves and stems turn completely straw-colored and grains are hard (moisture < 12%).',
    iconName: 'Wheat',
    colorTheme: 'amber'
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    hindiName: 'मक्का',
    scientificName: 'Zea mays',
    category: 'Cereal',
    description: 'High-energy versatile grain crop adaptable across agro-climatic zones with excellent biomass.',
    idealSeason: 'Kharif & Rabi (June-Oct / Oct-Feb)',
    growthDuration: '90 – 120 days',
    expectedYield: '5.0 – 8.0 tonnes / hectare',
    waterRequirement: 'Medium',
    waterRequirementMm: '500 – 800 mm',
    marketDemand: 'High',
    ranges: {
      n: { min: 60, max: 120, optimalMin: 70, optimalMax: 100, unit: 'kg/ha' },
      p: { min: 35, max: 75, optimalMin: 45, optimalMax: 65, unit: 'kg/ha' },
      k: { min: 15, max: 45, optimalMin: 20, optimalMax: 35, unit: 'kg/ha' },
      temp: { min: 18, max: 35, optimalMin: 22, optimalMax: 29, unit: '°C' },
      humidity: { min: 50, max: 85, optimalMin: 55, optimalMax: 75, unit: '%' },
      ph: { min: 5.5, max: 7.8, optimalMin: 6.0, optimalMax: 7.2, unit: 'pH' },
      rainfall: { min: 60, max: 180, optimalMin: 70, optimalMax: 120, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Deep Fertile Loam', 'Sandy Loam', 'Silt Loam'],
    careTips: [
      'Extremely sensitive to waterlogging; create ridged furrows for effective drainage.',
      'Side-dress Nitrogen at knee-high stage and tasseling for maximum cob girth.',
      'Ensure adequate spacing of 60 cm x 20 cm for hybrid varieties.'
    ],
    pestManagement: [
      'Fall Armyworm (FAW): Apply Emamectin Benzoate 5% SG @ 0.4 g/L in whorls when young larvae appear.',
      'Control Stem Borer with Carbofuran granules or Trichogramma egg parasitoids.'
    ],
    harvestingTips: 'Harvest when outer husk turns dry and paper-like with a dark black layer visible at the base of the kernel.',
    iconName: 'Trees',
    colorTheme: 'yellow'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    hindiName: 'कपास',
    scientificName: 'Gossypium hirsutum',
    category: 'Cash Crop',
    description: 'Premier fiber and cash crop ideal for deep black cotton soils and sunny semi-arid climates.',
    idealSeason: 'Kharif (May – November)',
    growthDuration: '150 – 180 days',
    expectedYield: '2.0 – 3.5 tonnes lint / hectare',
    waterRequirement: 'Medium',
    waterRequirementMm: '650 – 1000 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 90, max: 150, optimalMin: 110, optimalMax: 140, unit: 'kg/ha' },
      p: { min: 35, max: 70, optimalMin: 40, optimalMax: 60, unit: 'kg/ha' },
      k: { min: 15, max: 40, optimalMin: 20, optimalMax: 35, unit: 'kg/ha' },
      temp: { min: 21, max: 36, optimalMin: 23, optimalMax: 30, unit: '°C' },
      humidity: { min: 55, max: 85, optimalMin: 65, optimalMax: 80, unit: '%' },
      ph: { min: 6.0, max: 8.5, optimalMin: 6.5, optimalMax: 7.8, unit: 'pH' },
      rainfall: { min: 50, max: 140, optimalMin: 60, optimalMax: 100, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Deep Black Regur Soil', 'Medium Black Soil', 'Alluvial Loam'],
    careTips: [
      'Requires warm days and bright sunshine during boll formation and opening.',
      'Apply foliar spray of 2% DAP and 1% Potassium Nitrate during peak square/boll development.',
      'Maintain clean inter-row weeding during the first 60 days.'
    ],
    pestManagement: [
      'Pink Bollworm: Install pheromone traps (5/ha), release Trichogramma, and avoid late season ratoon crops.',
      'Sucking pests (Jassids, Thrips): Spray Flonicamid 50 WG or Neem-based formulations.'
    ],
    harvestingTips: 'Pick only fully burst clean bolls in the morning after dew evaporates; keep dry and clean.',
    iconName: 'Flower2',
    colorTheme: 'stone'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    hindiName: 'गन्ना',
    scientificName: 'Saccharum officinarum',
    category: 'Cash Crop',
    description: 'Long-duration heavy commercial crop yielding high sucrose under abundant water and tropical heat.',
    idealSeason: 'Autumn / Spring Planting (Oct / Feb)',
    growthDuration: '300 – 365 days',
    expectedYield: '80 – 120 tonnes / hectare',
    waterRequirement: 'Very High',
    waterRequirementMm: '1800 – 2500 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 80, max: 150, optimalMin: 100, optimalMax: 140, unit: 'kg/ha' },
      p: { min: 40, max: 80, optimalMin: 50, optimalMax: 70, unit: 'kg/ha' },
      k: { min: 40, max: 90, optimalMin: 50, optimalMax: 75, unit: 'kg/ha' },
      temp: { min: 21, max: 40, optimalMin: 24, optimalMax: 34, unit: '°C' },
      humidity: { min: 60, max: 90, optimalMin: 70, optimalMax: 85, unit: '%' },
      ph: { min: 5.5, max: 8.0, optimalMin: 6.5, optimalMax: 7.5, unit: 'pH' },
      rainfall: { min: 100, max: 280, optimalMin: 120, optimalMax: 200, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Deep Loam', 'Heavy Alluvial Soil', 'Black Clay Loam'],
    careTips: [
      'Earthing up at 90-120 days to anchor tall stalks and prevent wind lodging.',
      'Trash mulching in alternate rows conserves soil moisture and controls weeds effectively.',
      'Drip fertigation yields up to 40% water savings and higher sugar recovery.'
    ],
    pestManagement: [
      'Early Shoot Borer: Soil application of Chlorantraniliprole 0.4 G or spraying Carbofuran.',
      'Red Rot disease: Use certified disease-free setts and hot water treatment (52°C for 30 min).'
    ],
    harvestingTips: 'Test with hand refractometer (Brix > 18%); harvest flush to the ground level where sugar concentration is highest.',
    iconName: 'Candy',
    colorTheme: 'lime'
  },
  {
    id: 'chickpea',
    name: 'Chickpea (Gram / Chana)',
    hindiName: 'चना',
    scientificName: 'Cicer arietinum',
    category: 'Pulse',
    description: 'Premier nitrogen-fixing drought-tolerant legume thriving in cool, dry rabi climates.',
    idealSeason: 'Rabi (October – March)',
    growthDuration: '90 – 115 days',
    expectedYield: '1.8 – 2.6 tonnes / hectare',
    waterRequirement: 'Low',
    waterRequirementMm: '250 – 400 mm',
    marketDemand: 'High',
    ranges: {
      n: { min: 20, max: 60, optimalMin: 35, optimalMax: 50, unit: 'kg/ha' },
      p: { min: 55, max: 90, optimalMin: 65, optimalMax: 82, unit: 'kg/ha' },
      k: { min: 65, max: 95, optimalMin: 72, optimalMax: 88, unit: 'kg/ha' },
      temp: { min: 14, max: 28, optimalMin: 17, optimalMax: 22, unit: '°C' },
      humidity: { min: 12, max: 35, optimalMin: 14, optimalMax: 25, unit: '%' },
      ph: { min: 5.8, max: 8.5, optimalMin: 6.8, optimalMax: 7.8, unit: 'pH' },
      rainfall: { min: 20, max: 95, optimalMin: 60, optimalMax: 85, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Light to Heavy Loam', 'Deep Black Soil', 'Sandy Loam'],
    careTips: [
      'Requires very little starter Nitrogen due to rich Rhizobium root nodulation.',
      'Perform nipping/topping at 30-35 days to stimulate prolific branch formation and more pods.',
      'Avoid excess irrigation during flowering which triggers vegetative dropping.'
    ],
    pestManagement: [
      'Pod Borer (Helicoverpa armigera): Install bird perches @ 20/acre and spray NPV or Indoxacarb 14.5 SC.',
      'Wilt and Root Rot: Inoculate seed with Trichoderma harzianum @ 10 g/kg.'
    ],
    harvestingTips: 'Harvest when leaves turn reddish-brown and dry pods rattle upon gentle shaking.',
    iconName: 'CircleDot',
    colorTheme: 'amber'
  },
  {
    id: 'kidneybeans',
    name: 'Kidney Beans (Rajma)',
    hindiName: 'राजमा',
    scientificName: 'Phaseolus vulgaris',
    category: 'Pulse',
    description: 'Nutritious high-protein pulse that loves temperate to sub-tropical moderate conditions.',
    idealSeason: 'Rabi in Plains / Kharif in Hills',
    growthDuration: '90 – 120 days',
    expectedYield: '1.5 – 2.2 tonnes / hectare',
    waterRequirement: 'Medium',
    waterRequirementMm: '400 – 600 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 10, max: 40, optimalMin: 18, optimalMax: 30, unit: 'kg/ha' },
      p: { min: 50, max: 80, optimalMin: 60, optimalMax: 75, unit: 'kg/ha' },
      k: { min: 15, max: 30, optimalMin: 18, optimalMax: 25, unit: 'kg/ha' },
      temp: { min: 15, max: 27, optimalMin: 18, optimalMax: 24, unit: '°C' },
      humidity: { min: 18, max: 40, optimalMin: 20, optimalMax: 30, unit: '%' },
      ph: { min: 5.2, max: 6.8, optimalMin: 5.5, optimalMax: 6.2, unit: 'pH' },
      rainfall: { min: 60, max: 150, optimalMin: 75, optimalMax: 120, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Slightly Acidic Loam', 'Rich Organic Silt Loam'],
    careTips: [
      'Unlike other legumes, Rajma nodulates poorly and needs 90-100 kg/ha supplemental Nitrogen.',
      'Maintain loose soil around root zones with timely hoeing.',
      'Irrigate at critical pod initiation and seed development stages.'
    ],
    pestManagement: [
      'Anthracnose: Spray Carbendazim 50 WP @ 1 g/L at early signs of circular lesions.',
      'Aphids: Spray Dimethoate 30 EC @ 1.7 ml/L.'
    ],
    harvestingTips: 'Harvest when pods turn yellowish-brown and seeds harden inside pods.',
    iconName: 'Bean',
    colorTheme: 'red'
  },
  {
    id: 'pigeonpeas',
    name: 'Pigeonpeas (Arhar / Tur)',
    hindiName: 'अरहर (तूर)',
    scientificName: 'Cajanus cajan',
    category: 'Pulse',
    description: 'Deep-rooted resilient pulse crop that tolerates dry spells and enriches soil organic matter.',
    idealSeason: 'Kharif (June – December)',
    growthDuration: '140 – 180 days',
    expectedYield: '1.6 – 2.4 tonnes / hectare',
    waterRequirement: 'Low',
    waterRequirementMm: '350 – 550 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 10, max: 40, optimalMin: 15, optimalMax: 30, unit: 'kg/ha' },
      p: { min: 55, max: 80, optimalMin: 60, optimalMax: 75, unit: 'kg/ha' },
      k: { min: 15, max: 35, optimalMin: 18, optimalMax: 25, unit: 'kg/ha' },
      temp: { min: 20, max: 38, optimalMin: 25, optimalMax: 32, unit: '°C' },
      humidity: { min: 30, max: 70, optimalMin: 45, optimalMax: 65, unit: '%' },
      ph: { min: 5.5, max: 7.8, optimalMin: 6.0, optimalMax: 7.2, unit: 'pH' },
      rainfall: { min: 80, max: 200, optimalMin: 120, optimalMax: 170, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Deep Loam', 'Well-drained Black Soil', 'Alluvial Soil'],
    careTips: [
      'Ideal for intercropping with Soybean, Cotton, or Millets (1:2 ratio).',
      'Requires good surface drainage to prevent Phytophthora stem blight in monsoon.',
      'Foliar spray with 2% Urea at flower initiation boosts pod set.'
    ],
    pestManagement: [
      'Pod fly & Pod borer: Spray Flubendiamide 39.35 SC @ 0.2 ml/L at 50% flowering.',
      'Sterility Mosaic Disease: Control vector eriophyid mites with Dicofol or wettable sulfur.'
    ],
    harvestingTips: 'Harvest when 75-80% pods turn brown and dry; thresh mechanically or under cattle treading.',
    iconName: 'Circle',
    colorTheme: 'amber'
  },
  {
    id: 'mothbeans',
    name: 'Mothbeans (Matki)',
    hindiName: 'मोठ (मटकी)',
    scientificName: 'Vigna aconitifolia',
    category: 'Pulse',
    description: 'Extremely drought-hardy arid legume that thrives in low rainfall and sandy soils.',
    idealSeason: 'Kharif (July – October)',
    growthDuration: '75 – 90 days',
    expectedYield: '0.8 – 1.4 tonnes / hectare',
    waterRequirement: 'Very Low',
    waterRequirementMm: '200 – 350 mm',
    marketDemand: 'Moderate',
    ranges: {
      n: { min: 5, max: 30, optimalMin: 12, optimalMax: 25, unit: 'kg/ha' },
      p: { min: 35, max: 60, optimalMin: 42, optimalMax: 55, unit: 'kg/ha' },
      k: { min: 10, max: 30, optimalMin: 15, optimalMax: 25, unit: 'kg/ha' },
      temp: { min: 24, max: 35, optimalMin: 27, optimalMax: 32, unit: '°C' },
      humidity: { min: 40, max: 70, optimalMin: 45, optimalMax: 60, unit: '%' },
      ph: { min: 5.5, max: 8.5, optimalMin: 6.5, optimalMax: 7.8, unit: 'pH' },
      rainfall: { min: 30, max: 75, optimalMin: 40, optimalMax: 65, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Sandy Loam', 'Arid Sandy Soil', 'Light Alluvial'],
    careTips: [
      'Excellent cover crop preventing wind and water erosion in desert margins.',
      'Minimal fertilizer requirement; response to 20 kg P2O5 is significant.',
      'Tolerates acute moisture stress during mid-growth.'
    ],
    pestManagement: [
      'Jassids and Whitefly: Spray Azadirachtin (Neem 1500 ppm) @ 2 ml/L.',
      'Powdery mildew: Apply wettable sulfur @ 2 g/L.'
    ],
    harvestingTips: 'Cut crop close to the ground as soon as lower pods turn dark brown.',
    iconName: 'Shield',
    colorTheme: 'orange'
  },
  {
    id: 'mungbean',
    name: 'Mungbean (Green Gram)',
    hindiName: 'मूंग',
    scientificName: 'Vigna radiata',
    category: 'Pulse',
    description: 'Short-duration fast-maturing pulse ideal for crop rotations and soil health replenishment.',
    idealSeason: 'Kharif / Zaid (Summer: March-May)',
    growthDuration: '60 – 75 days',
    expectedYield: '1.2 – 1.8 tonnes / hectare',
    waterRequirement: 'Low',
    waterRequirementMm: '300 – 450 mm',
    marketDemand: 'High',
    ranges: {
      n: { min: 10, max: 35, optimalMin: 15, optimalMax: 28, unit: 'kg/ha' },
      p: { min: 35, max: 65, optimalMin: 45, optimalMax: 58, unit: 'kg/ha' },
      k: { min: 10, max: 30, optimalMin: 15, optimalMax: 25, unit: 'kg/ha' },
      temp: { min: 25, max: 38, optimalMin: 27, optimalMax: 32, unit: '°C' },
      humidity: { min: 70, max: 95, optimalMin: 80, optimalMax: 90, unit: '%' },
      ph: { min: 6.0, max: 7.8, optimalMin: 6.5, optimalMax: 7.2, unit: 'pH' },
      rainfall: { min: 35, max: 70, optimalMin: 42, optimalMax: 60, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Well-drained Loam', 'Sandy Loam'],
    careTips: [
      'Fits neatly between Rabi wheat harvest and Kharif paddy transplanting.',
      'Treat seeds with Rhizobium and PSB biofertilizers before sowing.',
      'Maintain one light irrigation at flowering and another at pod filling.'
    ],
    pestManagement: [
      'Yellow Mosaic Virus (YMV): Rogue infected plants and spray Dimethoate against whiteflies.',
      'Cercospora Leaf Spot: Spray Mancozeb @ 2 g/L.'
    ],
    harvestingTips: 'Pick pods in 2-3 hand pickings as they turn blackish-brown to prevent shattering.',
    iconName: 'Sparkles',
    colorTheme: 'emerald'
  },
  {
    id: 'blackgram',
    name: 'Blackgram (Urad)',
    hindiName: 'उड़द',
    scientificName: 'Vigna mungo',
    category: 'Pulse',
    description: 'Valued pulse crop delivering high phosphoric assimilation and protein-rich culinary staple.',
    idealSeason: 'Kharif / Spring (June / Feb)',
    growthDuration: '70 – 85 days',
    expectedYield: '1.1 – 1.6 tonnes / hectare',
    waterRequirement: 'Low',
    waterRequirementMm: '350 – 500 mm',
    marketDemand: 'High',
    ranges: {
      n: { min: 20, max: 60, optimalMin: 35, optimalMax: 48, unit: 'kg/ha' },
      p: { min: 50, max: 80, optimalMin: 60, optimalMax: 75, unit: 'kg/ha' },
      k: { min: 10, max: 30, optimalMin: 15, optimalMax: 25, unit: 'kg/ha' },
      temp: { min: 22, max: 35, optimalMin: 26, optimalMax: 32, unit: '°C' },
      humidity: { min: 60, max: 75, optimalMin: 62, optimalMax: 70, unit: '%' },
      ph: { min: 6.2, max: 8.0, optimalMin: 6.8, optimalMax: 7.6, unit: 'pH' },
      rainfall: { min: 55, max: 85, optimalMin: 60, optimalMax: 75, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Black Cotton Soil', 'Loamy Alluvial Soil'],
    careTips: [
      'Apply 20 kg N and 40 kg P2O5 per ha as basal dressing.',
      'Provide foliar nourishment of 2% DAP at 30 and 45 days after sowing.',
      'Weed thoroughly within first 25 days.'
    ],
    pestManagement: [
      'Leaf Crinkle Virus: Use certified seeds and control vector aphids.',
      'Pod Borer: Spray Thiodicarb 75 WP @ 1 g/L.'
    ],
    harvestingTips: 'Harvest when 85% of pods turn black; avoid delays to prevent shattering.',
    iconName: 'CircleCheck',
    colorTheme: 'zinc'
  },
  {
    id: 'lentil',
    name: 'Lentil (Masoor)',
    hindiName: 'मसूर',
    scientificName: 'Lens culinaris',
    category: 'Pulse',
    description: 'Cool-season hardy rabi pulse producing high mineral and protein grains with low water use.',
    idealSeason: 'Rabi (October – March)',
    growthDuration: '100 – 120 days',
    expectedYield: '1.4 – 2.0 tonnes / hectare',
    waterRequirement: 'Low',
    waterRequirementMm: '250 – 350 mm',
    marketDemand: 'High',
    ranges: {
      n: { min: 10, max: 35, optimalMin: 15, optimalMax: 25, unit: 'kg/ha' },
      p: { min: 55, max: 85, optimalMin: 62, optimalMax: 78, unit: 'kg/ha' },
      k: { min: 10, max: 30, optimalMin: 15, optimalMax: 25, unit: 'kg/ha' },
      temp: { min: 14, max: 28, optimalMin: 18, optimalMax: 24, unit: '°C' },
      humidity: { min: 50, max: 75, optimalMin: 58, optimalMax: 70, unit: '%' },
      ph: { min: 5.8, max: 7.8, optimalMin: 6.4, optimalMax: 7.2, unit: 'pH' },
      rainfall: { min: 35, max: 65, optimalMin: 42, optimalMax: 55, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Light Loam', 'Alluvial Silt Loam', 'Clayey Loam'],
    careTips: [
      'Can be grown successfully on conserved residual soil moisture after rice harvest (relay cropping).',
      'Seed inoculation with Rhizobium leguminosarum boosts nodulation.',
      'One irrigation at pod formation increases grain weight by 20%.'
    ],
    pestManagement: [
      'Lentil Rust: Spray Mancozeb 75 WP @ 2 g/L at first symptom.',
      'Root Rot / Collar Rot: Treat seed with Carbendazim (2 g/kg).'
    ],
    harvestingTips: 'Harvest in the early morning to minimize pod splitting and seed drop.',
    iconName: 'Coins',
    colorTheme: 'amber'
  },
  {
    id: 'banana',
    name: 'Banana',
    hindiName: 'केला',
    scientificName: 'Musa acuminata',
    category: 'Fruit',
    description: 'Fast-growing high-calorie tropical fruit requiring heavy Potassium and continuous moisture.',
    idealSeason: 'Year-round / Monsoonal Planting',
    growthDuration: '10 – 13 months',
    expectedYield: '40 – 70 tonnes / hectare',
    waterRequirement: 'Very High',
    waterRequirementMm: '1500 – 2200 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 80, max: 125, optimalMin: 90, optimalMax: 110, unit: 'kg/ha' },
      p: { min: 65, max: 95, optimalMin: 72, optimalMax: 88, unit: 'kg/ha' },
      k: { min: 45, max: 65, optimalMin: 48, optimalMax: 55, unit: 'kg/ha' },
      temp: { min: 24, max: 35, optimalMin: 26, optimalMax: 30, unit: '°C' },
      humidity: { min: 72, max: 92, optimalMin: 78, optimalMax: 85, unit: '%' },
      ph: { min: 5.5, max: 7.5, optimalMin: 6.0, optimalMax: 6.8, unit: 'pH' },
      rainfall: { min: 90, max: 130, optimalMin: 95, optimalMax: 115, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Deep Alluvial Loam', 'Rich Volcanic Soil', 'Well-drained River Basin'],
    careTips: [
      'High Potassium feeder: apply split Potassium doses through bunch formation for large finger size.',
      'Perform desuckering regularly, leaving only 1 strong follower sucker per mother plant.',
      'Propping with bamboo or poly-ropes prevents plant fall during heavy bunch maturity.'
    ],
    pestManagement: [
      'Sigatoka Leaf Spot: Spray Propiconazole 25 EC (1 ml/L) mixed with mineral oil.',
      'Banana Pseudostem Weevil: Inject Chlorpyrifos or swab stem base with neem extract.'
    ],
    harvestingTips: 'Harvest when fruit ridges become rounded and floral ends drop off readily (75-80% maturity for transport).',
    iconName: 'Banana',
    colorTheme: 'yellow'
  },
  {
    id: 'mango',
    name: 'Mango',
    hindiName: 'आम',
    scientificName: 'Mangifera indica',
    category: 'Fruit',
    description: 'King of tropical fruits thriving with distinct dry spells for flowering and warm summers for fruit ripening.',
    idealSeason: 'Perennial (Flowering Dec-Jan, Harvest Apr-Jul)',
    growthDuration: 'Perennial Tree (Bearing 4th year onwards)',
    expectedYield: '8.0 – 15.0 tonnes / hectare',
    waterRequirement: 'Medium',
    waterRequirementMm: '700 – 1200 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 10, max: 40, optimalMin: 18, optimalMax: 30, unit: 'kg/ha' },
      p: { min: 15, max: 40, optimalMin: 22, optimalMax: 32, unit: 'kg/ha' },
      k: { min: 20, max: 45, optimalMin: 26, optimalMax: 35, unit: 'kg/ha' },
      temp: { min: 24, max: 37, optimalMin: 27, optimalMax: 34, unit: '°C' },
      humidity: { min: 45, max: 65, optimalMin: 48, optimalMax: 55, unit: '%' },
      ph: { min: 5.0, max: 7.5, optimalMin: 5.8, optimalMax: 6.8, unit: 'pH' },
      rainfall: { min: 85, max: 120, optimalMin: 90, optimalMax: 105, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Deep Alluvial Loam', 'Red Lateritic Loam'],
    careTips: [
      'Withhold irrigation 2 months prior to flowering to induce floral bud differentiation.',
      'Apply paclobutrazol (Cultar) in September to regulate alternate bearing in standard cultivars.',
      'Foliar spray Boron (0.2%) during pea-sized fruit stage to prevent internal fruit necrosis.'
    ],
    pestManagement: [
      'Mango Hopper: Spray Thiamethoxam 25 WG @ 0.3 g/L at panicle emergence.',
      'Fruit Fly: Install methyl eugenol pheromone traps @ 10 traps/hectare.'
    ],
    harvestingTips: 'Harvest with 8-10 mm pedicel stalk attached using pole pickers to avoid sap burn on fruit skin.',
    iconName: 'Apple',
    colorTheme: 'amber'
  },
  {
    id: 'grapes',
    name: 'Grapes',
    hindiName: 'अंगूर',
    scientificName: 'Vitis vinifera',
    category: 'Fruit',
    description: 'High-value horticultural crop thriving in dry, sunny climates with controlled drip fertigation.',
    idealSeason: 'Perennial Vine (Pruning in Oct, Harvest Feb-Apr)',
    growthDuration: '120 – 140 days post-pruning',
    expectedYield: '20 – 30 tonnes / hectare',
    waterRequirement: 'Medium',
    waterRequirementMm: '500 – 750 mm',
    marketDemand: 'Export Quality',
    ranges: {
      n: { min: 10, max: 40, optimalMin: 18, optimalMax: 30, unit: 'kg/ha' },
      p: { min: 115, max: 145, optimalMin: 125, optimalMax: 140, unit: 'kg/ha' },
      k: { min: 180, max: 210, optimalMin: 195, optimalMax: 205, unit: 'kg/ha' },
      temp: { min: 12, max: 38, optimalMin: 22, optimalMax: 32, unit: '°C' },
      humidity: { min: 75, max: 88, optimalMin: 78, optimalMax: 84, unit: '%' },
      ph: { min: 5.5, max: 7.2, optimalMin: 6.0, optimalMax: 6.8, unit: 'pH' },
      rainfall: { min: 60, max: 80, optimalMin: 65, optimalMax: 75, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Gravelly Sandy Loam', 'Light Alluvial', 'Red Sandy Loam'],
    careTips: [
      'Very high Potassium and Phosphorus requirement for sugar translocation and bunch elongation.',
      'Apply Gibberellic Acid (GA3) at berry shatter stage for thinning and berry enlargement.',
      'Train on Y-trellis or Bower system to ensure proper canopy aeration and sun exposure.'
    ],
    pestManagement: [
      'Downy Mildew: Spray Bordeaux mixture 1% or Metalaxyl 8% + Mancozeb 64% WP.',
      'Mealybugs: Release predatory beetle Cryptolaemus montrouzieri @ 1500/ha.'
    ],
    harvestingTips: 'Harvest full bunches early in the day when TSS (Total Soluble Solids) reaches 18-20° Brix.',
    iconName: 'Grape',
    colorTheme: 'purple'
  },
  {
    id: 'apple',
    name: 'Apple',
    hindiName: 'सेब',
    scientificName: 'Malus domestica',
    category: 'Fruit',
    description: 'Temperate orchard fruit requiring chilling hours (winter dormancy) and well-aerated hillside soils.',
    idealSeason: 'Temperate Perennial (Spring Blossom, Aug-Oct Harvest)',
    growthDuration: '130 – 160 days from bloom',
    expectedYield: '12 – 22 tonnes / hectare',
    waterRequirement: 'Medium',
    waterRequirementMm: '800 – 1100 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 10, max: 40, optimalMin: 18, optimalMax: 30, unit: 'kg/ha' },
      p: { min: 120, max: 150, optimalMin: 130, optimalMax: 145, unit: 'kg/ha' },
      k: { min: 185, max: 215, optimalMin: 195, optimalMax: 205, unit: 'kg/ha' },
      temp: { min: 15, max: 28, optimalMin: 18, optimalMax: 24, unit: '°C' },
      humidity: { min: 85, max: 98, optimalMin: 88, optimalMax: 94, unit: '%' },
      ph: { min: 5.5, max: 6.8, optimalMin: 5.8, optimalMax: 6.4, unit: 'pH' },
      rainfall: { min: 100, max: 130, optimalMin: 108, optimalMax: 118, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Hill Loam', 'Rich Volcanic Loam', 'Deep Acidic Loam'],
    careTips: [
      'Requires 800-1200 chilling hours (< 7°C) for breaking dormancy and uniform bud burst.',
      'Thin fruits to 1 fruit per cluster within 30 days of petal fall for large fruit size.',
      'Apply Calcium Nitrate sprays to prevent bitter pit disorder in storage.'
    ],
    pestManagement: [
      'Apple Scab: Preventive spraying of Captan 50 WP or Difenoconazole 25 EC at pink bud stage.',
      'Woolly Apple Aphid: Soil drenching with Chlorpyrifos or release Aphelinus mali.'
    ],
    harvestingTips: 'Test starch-iodine index; harvest carefully by gently twisting fruit upwards without damaging the spur.',
    iconName: 'Apple',
    colorTheme: 'rose'
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    hindiName: 'तरबूज',
    scientificName: 'Citrullus lanatus',
    category: 'Fruit',
    description: 'Warm summer cucurbit demanding high sunlight, sandy loam beds, and high sweetness accumulation.',
    idealSeason: 'Zaid / Summer (January – June)',
    growthDuration: '80 – 100 days',
    expectedYield: '25 – 45 tonnes / hectare',
    waterRequirement: 'Medium',
    waterRequirementMm: '400 – 600 mm',
    marketDemand: 'High',
    ranges: {
      n: { min: 10, max: 40, optimalMin: 15, optimalMax: 30, unit: 'kg/ha' },
      p: { min: 10, max: 35, optimalMin: 15, optimalMax: 28, unit: 'kg/ha' },
      k: { min: 40, max: 60, optimalMin: 46, optimalMax: 55, unit: 'kg/ha' },
      temp: { min: 23, max: 36, optimalMin: 25, optimalMax: 30, unit: '°C' },
      humidity: { min: 80, max: 95, optimalMin: 85, optimalMax: 92, unit: '%' },
      ph: { min: 6.0, max: 7.5, optimalMin: 6.3, optimalMax: 6.8, unit: 'pH' },
      rainfall: { min: 40, max: 60, optimalMin: 45, optimalMax: 55, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Sandy Loam', 'Riverbed Alluvial Loam'],
    careTips: [
      'Prepare raised beds with black silver plastic mulch and inline drip irrigation.',
      'Gradually decrease irrigation 10 days prior to harvest to concentrate sugars (Brix > 11%).',
      'Turn developing melons gently to avoid sunscalding and yellow underbellies.'
    ],
    pestManagement: [
      'Fruit Fly: Use cue-lure traps @ 10/acre.',
      'Powdery & Downy Mildew: Spray Azoxystrobin 23 SC @ 1 ml/L.'
    ],
    harvestingTips: 'Check for drying of tendril nearest to the fruit and a dull, hollow thumping sound.',
    iconName: 'Citrus',
    colorTheme: 'red'
  },
  {
    id: 'orange',
    name: 'Orange / Citrus',
    hindiName: 'संतरा',
    scientificName: 'Citrus sinensis',
    category: 'Fruit',
    description: 'Subtropical citrus fruit delivering juicy vitamin-rich yields with well-drained loams.',
    idealSeason: 'Mrig Bahar / Ambia Bahar (Oct-Feb)',
    growthDuration: '240 – 270 days from bloom',
    expectedYield: '15 – 25 tonnes / hectare',
    waterRequirement: 'Medium',
    waterRequirementMm: '900 – 1200 mm',
    marketDemand: 'High',
    ranges: {
      n: { min: 10, max: 40, optimalMin: 15, optimalMax: 30, unit: 'kg/ha' },
      p: { min: 10, max: 35, optimalMin: 15, optimalMax: 25, unit: 'kg/ha' },
      k: { min: 5, max: 25, optimalMin: 8, optimalMax: 15, unit: 'kg/ha' },
      temp: { min: 15, max: 35, optimalMin: 22, optimalMax: 32, unit: '°C' },
      humidity: { min: 85, max: 98, optimalMin: 90, optimalMax: 94, unit: '%' },
      ph: { min: 6.0, max: 8.0, optimalMin: 6.5, optimalMax: 7.5, unit: 'pH' },
      rainfall: { min: 100, max: 120, optimalMin: 105, optimalMax: 115, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Light Loam', 'Medium Deep Black Loam', 'Alluvial Silt'],
    careTips: [
      'Apply micro-nutrient mixture (Zinc, Iron, Manganese, Boron) 2-3 times during active flushes.',
      'Keep tree basins free of standing water to prevent Phytophthora gummosis.',
      'Prune dead wood and water sprouts immediately after harvest.'
    ],
    pestManagement: [
      'Citrus Leaf Miner: Spray Abamectin 1.9 EC @ 0.5 ml/L on new flushes.',
      'Citrus Canker: Spray Copper Oxychloride (0.3%) + Streptocycline (100 ppm).'
    ],
    harvestingTips: 'Harvest when skin color turns from dark green to characteristic bright orange with balanced acidity.',
    iconName: 'Sun',
    colorTheme: 'orange'
  },
  {
    id: 'coconut',
    name: 'Coconut',
    hindiName: 'नारियल',
    scientificName: 'Cocos nucifera',
    category: 'Plantation',
    description: 'Tree of life for coastal tropical ecosystems, needing high humidity, warm temps, and sandy loams.',
    idealSeason: 'Perennial Palm (Year-round Harvest)',
    growthDuration: 'Bearing 5th year onward for 60+ years',
    expectedYield: '80 – 120 nuts / palm / year',
    waterRequirement: 'High',
    waterRequirementMm: '1300 – 2300 mm',
    marketDemand: 'Very High',
    ranges: {
      n: { min: 15, max: 45, optimalMin: 20, optimalMax: 35, unit: 'kg/ha' },
      p: { min: 10, max: 35, optimalMin: 15, optimalMax: 25, unit: 'kg/ha' },
      k: { min: 25, max: 50, optimalMin: 30, optimalMax: 40, unit: 'kg/ha' },
      temp: { min: 24, max: 34, optimalMin: 26, optimalMax: 30, unit: '°C' },
      humidity: { min: 85, max: 100, optimalMin: 92, optimalMax: 98, unit: '%' },
      ph: { min: 5.2, max: 7.8, optimalMin: 5.8, optimalMax: 6.5, unit: 'pH' },
      rainfall: { min: 130, max: 230, optimalMin: 150, optimalMax: 200, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Coastal Sandy Loam', 'Red Laterite', 'Alluvial Soil'],
    careTips: [
      'Apply 1.3 kg MOP (Muriate of Potash), 1 kg Urea, and 2 kg SSP per adult palm annually.',
      'Maintain mulch of green leaves or coconut husk around palm basin (1.8 m radius).',
      'Provide regular summer irrigation (40-50 liters/day/palm through drip).'
    ],
    pestManagement: [
      'Rhinoceros Beetle: Hook out beetles from crown; place naphthalene balls in leaf axils.',
      'Red Palm Weevil: Pheromone traps (Ferrolure+) and root feeding with Imidacloprid.'
    ],
    harvestingTips: 'Harvest 11-12 month old nuts for copra and oil; 7-8 month old green nuts for tender water.',
    iconName: 'Palmtree',
    colorTheme: 'emerald'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    hindiName: 'कॉफ़ी',
    scientificName: 'Coffea arabica / canephora',
    category: 'Plantation',
    description: 'High-value shade-grown plantation crop flourishing on humid tropical mountain slopes.',
    idealSeason: 'Blossom shower Mar-Apr, Harvest Nov-Feb',
    growthDuration: 'Perennial Shrub (Bearing 3rd-4th year)',
    expectedYield: '1.2 – 2.5 tonnes clean coffee / ha',
    waterRequirement: 'High',
    waterRequirementMm: '1200 – 1800 mm',
    marketDemand: 'Export Quality',
    ranges: {
      n: { min: 80, max: 130, optimalMin: 90, optimalMax: 120, unit: 'kg/ha' },
      p: { min: 15, max: 45, optimalMin: 20, optimalMax: 35, unit: 'kg/ha' },
      k: { min: 25, max: 45, optimalMin: 28, optimalMax: 38, unit: 'kg/ha' },
      temp: { min: 20, max: 30, optimalMin: 23, optimalMax: 27, unit: '°C' },
      humidity: { min: 50, max: 75, optimalMin: 55, optimalMax: 68, unit: '%' },
      ph: { min: 6.0, max: 7.2, optimalMin: 6.2, optimalMax: 6.8, unit: 'pH' },
      rainfall: { min: 110, max: 200, optimalMin: 140, optimalMax: 180, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Deep Volcanic Loam', 'Forest Humus Loam', 'Rich Lateritic Soil'],
    careTips: [
      'Maintain two-tier shade trees (silver oak, dadap) to buffer direct sun and regulate microclimate.',
      'Ensure blossom showers of 25-40 mm in March followed by backing showers for uniform berry setting.',
      'Regular centering, desuckering, and handling of branches post-harvest.'
    ],
    pestManagement: [
      'Coffee Berry Borer: Install broca traps with attractant; spray Beauveria bassiana.',
      'Coffee Leaf Rust (Hemileia vastatrix): Spray 0.5% Bordeaux mixture before monsoon.'
    ],
    harvestingTips: 'Hand-pick only bright crimson red ripe cherries; avoid stripping green or over-ripe berries.',
    iconName: 'Coffee',
    colorTheme: 'amber'
  },
  {
    id: 'jute',
    name: 'Jute (Golden Fiber)',
    hindiName: 'जूट (पटसन)',
    scientificName: 'Corchorus olitorius',
    category: 'Cash Crop',
    description: 'Golden fiber crop flourishing in warm humid river deltas with plenty of retting water.',
    idealSeason: 'Kharif (March – August)',
    growthDuration: '100 – 120 days',
    expectedYield: '2.5 – 3.8 tonnes fiber / hectare',
    waterRequirement: 'High',
    waterRequirementMm: '1200 – 1600 mm',
    marketDemand: 'High',
    ranges: {
      n: { min: 60, max: 100, optimalMin: 70, optimalMax: 90, unit: 'kg/ha' },
      p: { min: 35, max: 60, optimalMin: 42, optimalMax: 55, unit: 'kg/ha' },
      k: { min: 30, max: 55, optimalMin: 36, optimalMax: 48, unit: 'kg/ha' },
      temp: { min: 23, max: 36, optimalMin: 25, optimalMax: 32, unit: '°C' },
      humidity: { min: 70, max: 92, optimalMin: 78, optimalMax: 88, unit: '%' },
      ph: { min: 6.0, max: 7.5, optimalMin: 6.2, optimalMax: 7.0, unit: 'pH' },
      rainfall: { min: 140, max: 220, optimalMin: 160, optimalMax: 200, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Alluvial Silt Loam', 'Clayey Delta Soil'],
    careTips: [
      'Sow with narrow line spacing of 25 cm x 5 cm for fine, non-branching fiber stalks.',
      'Perform wheel hoe weeding at 20 and 35 days after sowing.',
      'Ensure availability of slow-moving clean microbial retting water pools.'
    ],
    pestManagement: [
      'Yellow Mite: Spray Fenazaquin 10 EC @ 1.5 ml/L.',
      'Stem Rot (Macrophomina phaseolina): Seed treatment with Carbendazim (2 g/kg).'
    ],
    harvestingTips: 'Harvest at 50% small pod initiation stage (120 days) for optimum fiber strength and softness.',
    iconName: 'Layers',
    colorTheme: 'amber'
  },
  {
    id: 'tea',
    name: 'Tea',
    hindiName: 'चाय',
    scientificName: 'Camellia sinensis',
    category: 'Plantation',
    description: 'Highland aromatic beverage crop requiring well-drained acidic soil and frequent light mists.',
    idealSeason: 'Year-round Plucking (Peak Mar-Nov)',
    growthDuration: 'Perennial Bush (Plucking every 7-10 days)',
    expectedYield: '2.0 – 3.0 tonnes made tea / ha',
    waterRequirement: 'High',
    waterRequirementMm: '1400 – 2200 mm',
    marketDemand: 'Export Quality',
    ranges: {
      n: { min: 50, max: 110, optimalMin: 65, optimalMax: 90, unit: 'kg/ha' },
      p: { min: 20, max: 50, optimalMin: 28, optimalMax: 40, unit: 'kg/ha' },
      k: { min: 30, max: 60, optimalMin: 38, optimalMax: 50, unit: 'kg/ha' },
      temp: { min: 16, max: 30, optimalMin: 20, optimalMax: 26, unit: '°C' },
      humidity: { min: 70, max: 95, optimalMin: 80, optimalMax: 90, unit: '%' },
      ph: { min: 4.5, max: 5.8, optimalMin: 4.8, optimalMax: 5.5, unit: 'pH' },
      rainfall: { min: 130, max: 260, optimalMin: 160, optimalMax: 220, unit: 'mm/month' }
    },
    suitableSoilTypes: ['Acidic Virgin Forest Loam', 'Lateritic Red Hill Soil'],
    careTips: [
      'Strict acid lover (pH 4.8 - 5.5); avoid any liming or alkaline irrigation water.',
      'Maintain continuous shade regulation with Albizia and Grevillea trees.',
      'Prune systematically every 3-5 years to maintain an accessible plucking table.'
    ],
    pestManagement: [
      'Tea Mosquito Bug: Spray Thiamethoxam 25 WG @ 0.25 g/L.',
      'Red Spider Mite: Spray Propargite 57 EC @ 2 ml/L during dry spells.'
    ],
    harvestingTips: 'Pluck standard "two leaves and a bud" gently with finger tips every 7 to 10 days.',
    iconName: 'Leaf',
    colorTheme: 'emerald'
  }
];

export const PRESET_CONDITIONS: PresetCondition[] = [
  {
    id: 'preset-wetland-rice',
    title: 'Monsoon Floodplain / Wetland',
    subtitle: 'High rainfall & humidity, rich alluvial clay',
    description: 'Typical conditions of West Bengal, Odisha, Assam, and coastal delta plains during monsoon.',
    badge: 'Wetland / Delta',
    inputs: {
      n: 95,
      p: 50,
      k: 42,
      temperature: 26.5,
      humidity: 86,
      ph: 6.4,
      rainfall: 220,
      stateRegion: 'West Bengal / Assam',
      soilType: 'Clay Loam',
      farmName: 'Delta Valley Field 1',
      fieldArea: '2.5 Hectares'
    }
  },
  {
    id: 'preset-rabi-wheat',
    title: 'Indo-Gangetic Plain / Rabi Season',
    subtitle: 'Cool winter, moderate moisture, fertile alluvium',
    description: 'Typical winter conditions across Punjab, Haryana, Uttar Pradesh, and Madhya Pradesh.',
    badge: 'North Plains',
    inputs: {
      n: 85,
      p: 52,
      k: 38,
      temperature: 18.2,
      humidity: 52,
      ph: 7.1,
      rainfall: 65,
      stateRegion: 'Punjab / Haryana / UP',
      soilType: 'Alluvial Loam',
      farmName: 'Green Meadows Plot B',
      fieldArea: '4.0 Hectares'
    }
  },
  {
    id: 'preset-arid-pulses',
    title: 'Semi-Arid Pulse & Cotton Belt',
    subtitle: 'Warm, low humidity, black cotton / sandy loam',
    description: 'Typical conditions of Maharashtra, Gujarat, Rajasthan, and central plateau during post-monsoon.',
    badge: 'Semi-Arid / Plateau',
    inputs: {
      n: 42,
      p: 72,
      k: 78,
      temperature: 28.0,
      humidity: 28,
      ph: 7.4,
      rainfall: 55,
      stateRegion: 'Maharashtra / Gujarat',
      soilType: 'Black Cotton Soil',
      farmName: 'Deccan Ridge Farm',
      fieldArea: '3.0 Hectares'
    }
  },
  {
    id: 'preset-horticulture-orchard',
    title: 'High-Value Horticultural Zone',
    subtitle: 'High potassium, controlled moisture, warm sunny days',
    description: 'Typical conditions in Nashik, Bijapur, Solapur for grapes, pomegranates, and fruits.',
    badge: 'Horticulture / Vineyard',
    inputs: {
      n: 25,
      p: 130,
      k: 195,
      temperature: 29.5,
      humidity: 82,
      ph: 6.2,
      rainfall: 72,
      stateRegion: 'Maharashtra / Karnataka',
      soilType: 'Sandy Loam',
      farmName: 'Sunshine Orchards',
      fieldArea: '1.8 Hectares'
    }
  },
  {
    id: 'preset-coastal-plantation',
    title: 'Tropical Coastal Plantation',
    subtitle: 'High heat, coastal sea humidity, sandy alluvial soil',
    description: 'Typical conditions in Kerala, coastal Karnataka, Tamil Nadu, and Goa.',
    badge: 'Coastal Tropics',
    inputs: {
      n: 32,
      p: 22,
      k: 35,
      temperature: 28.5,
      humidity: 94,
      ph: 6.1,
      rainfall: 180,
      stateRegion: 'Kerala / Coastal Karnataka',
      soilType: 'Coastal Sandy Loam',
      farmName: 'Seaside Palm Estate',
      fieldArea: '5.0 Hectares'
    }
  }
];

export const REGION_CLIMATE_PRESETS: Record<string, Partial<PresetCondition['inputs']>> = {
  'Punjab / Haryana': { temperature: 19, humidity: 55, rainfall: 70, ph: 7.2, soilType: 'Alluvial Loam' },
  'Uttar Pradesh / Bihar': { temperature: 24, humidity: 68, rainfall: 110, ph: 6.9, soilType: 'Silt Loam' },
  'West Bengal / Assam': { temperature: 27, humidity: 88, rainfall: 230, ph: 6.2, soilType: 'Clay Loam' },
  'Maharashtra / Vidarbha': { temperature: 29, humidity: 45, rainfall: 75, ph: 7.5, soilType: 'Black Cotton Soil' },
  'Gujarat / Saurashtra': { temperature: 30, humidity: 50, rainfall: 60, ph: 7.6, soilType: 'Medium Black' },
  'Madhya Pradesh': { temperature: 23, humidity: 48, rainfall: 85, ph: 7.0, soilType: 'Deep Black Loam' },
  'Andhra Pradesh / Telangana': { temperature: 31, humidity: 62, rainfall: 90, ph: 6.8, soilType: 'Red Loam' },
  'Karnataka / Deccan': { temperature: 26, humidity: 70, rainfall: 100, ph: 6.5, soilType: 'Red Sandy Loam' },
  'Tamil Nadu': { temperature: 30, humidity: 75, rainfall: 115, ph: 6.7, soilType: 'Clay Loam' },
  'Kerala': { temperature: 28, humidity: 92, rainfall: 210, ph: 5.6, soilType: 'Laterite Soil' },
  'Rajasthan (Arid Zone)': { temperature: 33, humidity: 25, rainfall: 35, ph: 7.9, soilType: 'Sandy Arid' },
  'Himachal / Kashmir (Hill Zone)': { temperature: 16, humidity: 82, rainfall: 115, ph: 5.9, soilType: 'Hill Loam' }
};
