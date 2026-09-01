export type Language = 'en' | 'hi' | 'es' | 'mr';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  dashboard: string;
  newRecommendation: string;
  history: string;
  cropLibrary: string;
  howToIntegrateML: string;
  heroTitle: string;
  heroSubtitle: string;
  startSoilTest: string;
  viewHistory: string;
  formTitle: string;
  formSubtitle: string;
  nitrogenLabel: string;
  nitrogenDesc: string;
  phosphorusLabel: string;
  phosphorusDesc: string;
  potassiumLabel: string;
  potassiumDesc: string;
  tempLabel: string;
  humidityLabel: string;
  phLabel: string;
  rainfallLabel: string;
  stateLabel: string;
  soilTypeLabel: string;
  farmNameLabel: string;
  calculateButton: string;
  analyzingButton: string;
  presetsTitle: string;
  resultsTitle: string;
  confidenceScore: string;
  idealSeason: string;
  expectedYield: string;
  waterRequirement: string;
  growthDuration: string;
  careTips: string;
  pestManagement: string;
  harvesting: string;
  alternativesTitle: string;
  soilHealthTitle: string;
  fertilizerPlan: string;
  printReport: string;
  testAnotherField: string;
  historyEmpty: string;
  sensorsOnline: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'CropWise AI',
    tagline: 'Precision Farming & Crop Recommendation',
    dashboard: 'Home Overview',
    newRecommendation: 'Crop Advisor',
    history: 'Field History',
    cropLibrary: 'Crop Database',
    howToIntegrateML: 'ML Model Guide',
    heroTitle: 'Find the Highest Yielding Crop for Your Field',
    heroSubtitle: 'Enter your soil nutrients (NPK, pH) and local climate data to get instant, data-driven crop recommendations with yield projections and care guides.',
    startSoilTest: 'Start Soil Analysis',
    viewHistory: 'View Past Records',
    formTitle: 'Soil & Climate Parameters',
    formSubtitle: 'Fill in your laboratory soil test values and climate conditions or choose a quick regional preset below.',
    nitrogenLabel: 'Nitrogen (N) in Soil',
    nitrogenDesc: 'Essential for leaf growth and green foliage (kg/ha)',
    phosphorusLabel: 'Phosphorus (P) in Soil',
    phosphorusDesc: 'Vital for root strength and flower formation (kg/ha)',
    potassiumLabel: 'Potassium (K) in Soil',
    potassiumDesc: 'Builds drought tolerance and grain quality (kg/ha)',
    tempLabel: 'Average Temperature (°C)',
    humidityLabel: 'Relative Humidity (%)',
    phLabel: 'Soil Reaction (pH Level)',
    rainfallLabel: 'Seasonal Rainfall (mm)',
    stateLabel: 'State / Region (Optional)',
    soilTypeLabel: 'Primary Soil Type',
    farmNameLabel: 'Farm / Plot Name (Optional)',
    calculateButton: 'Predict Optimal Crop',
    analyzingButton: 'Analyzing Soil & Climate...',
    presetsTitle: 'Quick Regional Presets',
    resultsTitle: 'Crop Recommendation Report',
    confidenceScore: 'Suitability Confidence',
    idealSeason: 'Ideal Sowing Window',
    expectedYield: 'Projected Yield',
    waterRequirement: 'Water & Irrigation Need',
    growthDuration: 'Time to Maturity',
    careTips: 'Agronomic Care & Management',
    pestManagement: 'Pest & Disease Prevention',
    harvesting: 'Harvesting & Maturity Guide',
    alternativesTitle: 'Ranked Alternative Crops',
    soilHealthTitle: 'Soil Health & Fertility Diagnosis',
    fertilizerPlan: 'Fertilizer & Amendment Recommendation',
    printReport: 'Print / Save Report',
    testAnotherField: 'Analyze Another Field',
    historyEmpty: 'No previous crop recommendations found. Run your first soil test to build records.',
    sensorsOnline: 'Sensors Online'
  },
  hi: {
    appName: 'क्रॉपवाइज़ एआई',
    tagline: 'सटीक कृषि और फसल अनुशंसा',
    dashboard: 'मुख्य पृष्ठ',
    newRecommendation: 'फसल सलाहकार',
    history: 'खेत का इतिहास',
    cropLibrary: 'फसल विवरण',
    howToIntegrateML: 'एमएल मॉडल गाइड',
    heroTitle: 'अपनी मिट्टी के लिए सबसे उपयुक्त फसल चुनें',
    heroSubtitle: 'अपनी मिट्टी के पोषक तत्व (NPK, pH) और मौसम की जानकारी दर्ज करें और तुरंत सर्वश्रेष्ठ फसल, अपेक्षित पैदावार और देखभाल सलाह पाएं।',
    startSoilTest: 'मिट्टी की जांच शुरू करें',
    viewHistory: 'पुराने रिकॉर्ड देखें',
    formTitle: 'मिट्टी और जलवायु विवरण',
    formSubtitle: 'मिट्टी परीक्षण रिपोर्ट और मौसम के मान दर्ज करें या नीचे दिए गए तैयार विकल्पों में से चुनें।',
    nitrogenLabel: 'मिट्टी में नाइट्रोजन (N)',
    nitrogenDesc: 'पौधों के विकास और पत्तियों के लिए आवश्यक (किग्रा/हेक्टेयर)',
    phosphorusLabel: 'मिट्टी में फॉस्फोरस (P)',
    phosphorusDesc: 'जड़ों के विकास और फूलों के लिए महत्वपूर्ण (किग्रा/हेक्टेयर)',
    potassiumLabel: 'मिट्टी में पोटाश (K)',
    potassiumDesc: 'रोग प्रतिरोधकता और दाने भरने के लिए (किग्रा/हेक्टेयर)',
    tempLabel: 'औसत तापमान (°C)',
    humidityLabel: 'हवा में नमी / आर्द्रता (%)',
    phLabel: 'मिट्टी का पीएच (pH स्तर)',
    rainfallLabel: 'मौसमी वर्षा (मिमी)',
    stateLabel: 'राज्य / क्षेत्र',
    soilTypeLabel: 'मिट्टी का प्रकार',
    farmNameLabel: 'खेत / प्लॉट का नाम',
    calculateButton: 'फसल की सिफारिश प्राप्त करें',
    analyzingButton: 'विश्लेषण हो रहा है...',
    presetsTitle: 'त्वरित क्षेत्रीय उदाहरण',
    resultsTitle: 'फसल अनुशंसा रिपोर्ट',
    confidenceScore: 'उपयुक्तता स्कोर',
    idealSeason: 'बुआई का सही समय',
    expectedYield: 'अनुमानित पैदावार',
    waterRequirement: 'सिंचाई आवश्यकता',
    growthDuration: 'फसल अवधि',
    careTips: 'देखभाल और प्रबंधन',
    pestManagement: 'कीट एवं रोग रोकथाम',
    harvesting: 'कटाई और भंडारण सुझाव',
    alternativesTitle: 'अन्य उपयुक्त वैकल्पिक फसलें',
    soilHealthTitle: 'मिट्टी स्वास्थ्य जांच',
    fertilizerPlan: 'उर्वरक एवं पोषण योजना',
    printReport: 'रिपोर्ट प्रिंट / सेव करें',
    testAnotherField: 'अन्य खेत की जांच करें',
    historyEmpty: 'कोई पिछला रिकॉर्ड नहीं मिला। पहला परीक्षण शुरू करें।',
    sensorsOnline: 'सेंसर चालू हैं'
  },
  mr: {
    appName: 'क्रॉपवाइझ एआय',
    tagline: 'अचूक शेती आणि पीक शिफारस',
    dashboard: 'मुख्य पृष्ठ',
    newRecommendation: 'पीक सल्लागार',
    history: 'मागील नोंदी',
    cropLibrary: 'पीक माहिती',
    howToIntegrateML: 'एमएल मार्गदर्शक',
    heroTitle: 'तुमच्या जमिनीसाठी सर्वाधिक उत्पादन देणारे पीक निवडा',
    heroSubtitle: 'मातीचे NPK, pH आणि हवामानाची माहिती भरा आणि उत्पादन व खत व्यवस्थापनासह त्वरित पीक शिफारस मिळवा.',
    startSoilTest: 'माती परीक्षण सुरू करा',
    viewHistory: 'इतिहास पहा',
    formTitle: 'माती आणि हवामान तपशील',
    formSubtitle: 'माती चाचणी आणि स्थानिक हवामान माहिती भरा.',
    nitrogenLabel: 'नायट्रोजन (N)',
    nitrogenDesc: 'पानांच्या वाढीसाठी उपयुक्त (किग्रा/हेक्टर)',
    phosphorusLabel: 'फॉस्फरस (P)',
    phosphorusDesc: 'मुळांच्या मजबुतीसाठी (किग्रा/हेक्टर)',
    potassiumLabel: 'पोटॅश (K)',
    potassiumDesc: 'रोग प्रतिकारशक्ती वाढवण्यासाठी (किग्रा/हेक्टर)',
    tempLabel: 'सरासरी तापमान (°C)',
    humidityLabel: 'हवेतील आर्द्रता (%)',
    phLabel: 'जमिनीचा सामू (pH)',
    rainfallLabel: 'पाऊस (मिमी)',
    stateLabel: 'राज्य / जिल्हा',
    soilTypeLabel: 'मातीचा प्रकार',
    farmNameLabel: 'शेताचे नाव',
    calculateButton: 'योग्य पीक शोधा',
    analyzingButton: 'विश्लेषण चालू आहे...',
    presetsTitle: 'द्रुत निवड',
    resultsTitle: 'पीक शिफारस अहवाल',
    confidenceScore: 'उपयुक्तता टक्केवारी',
    idealSeason: 'पेरणीचा हंगाम',
    expectedYield: 'अपेक्षित उत्पादन',
    waterRequirement: 'पाण्याची गरज',
    growthDuration: 'कालावधी',
    careTips: 'व्यवस्थापन टिप्स',
    pestManagement: 'कीड व रोग नियंत्रण',
    harvesting: 'काढणी मार्गदर्शन',
    alternativesTitle: 'पर्यायी पिके',
    soilHealthTitle: 'जमीन आरोग्य निदान',
    fertilizerPlan: 'खत मात्रा शिफारस',
    printReport: 'अहवाल जतन करा',
    testAnotherField: 'दुसरे शेत तपासा',
    historyEmpty: 'नोंदी उपलब्ध नाहीत. पहिले परीक्षण सुरू करा.',
    sensorsOnline: 'सेंसर कार्यरत'
  },
  es: {
    appName: 'CropWise AI',
    tagline: 'Agricultura de Precisión y Recomendación de Cultivos',
    dashboard: 'Inicio',
    newRecommendation: 'Asesor de Cultivos',
    history: 'Historial de Parcelas',
    cropLibrary: 'Catálogo de Cultivos',
    howToIntegrateML: 'Guía de Modelos ML',
    heroTitle: 'Encuentre el Cultivo Óptimo para su Suelo y Clima',
    heroSubtitle: 'Ingrese los nutrientes de su suelo (NPK, pH) y clima local para recibir recomendaciones respaldadas por datos.',
    startSoilTest: 'Iniciar Análisis de Suelo',
    viewHistory: 'Ver Historial',
    formTitle: 'Parámetros de Suelo y Clima',
    formSubtitle: 'Complete los valores de laboratorio y condiciones climáticas.',
    nitrogenLabel: 'Nitrógeno (N)',
    nitrogenDesc: 'Crecimiento foliar (kg/ha)',
    phosphorusLabel: 'Fósforo (P)',
    phosphorusDesc: 'Desarrollo de raíces y floración (kg/ha)',
    potassiumLabel: 'Potasio (K)',
    potassiumDesc: 'Resistencia a sequía y llenado (kg/ha)',
    tempLabel: 'Temperatura Media (°C)',
    humidityLabel: 'Humedad Relativa (%)',
    phLabel: 'pH del Suelo',
    rainfallLabel: 'Precipitación Estacional (mm)',
    stateLabel: 'Región / Provincia',
    soilTypeLabel: 'Tipo de Suelo',
    farmNameLabel: 'Nombre del Campo / Lote',
    calculateButton: 'Recomendar Mejor Cultivo',
    analyzingButton: 'Analizando Datos...',
    presetsTitle: 'Ajustes Rápidos Regionales',
    resultsTitle: 'Informe de Recomendación',
    confidenceScore: 'Nivel de Idoneidad',
    idealSeason: 'Época Ideal de Siembra',
    expectedYield: 'Rendimiento Proyectado',
    waterRequirement: 'Requerimiento Hídrico',
    growthDuration: 'Ciclo Vegetativo',
    careTips: 'Manejo Agronómico',
    pestManagement: 'Control de Plagas',
    harvesting: 'Consejos de Cosecha',
    alternativesTitle: 'Cultivos Alternativos',
    soilHealthTitle: 'Diagnóstico de Salud del Suelo',
    fertilizerPlan: 'Plan de Fertilización',
    printReport: 'Imprimir Informe',
    testAnotherField: 'Analizar Otro Lote',
    historyEmpty: 'No hay registros anteriores. Inicie su primer análisis.',
    sensorsOnline: 'Sensores Activos'
  }
};
