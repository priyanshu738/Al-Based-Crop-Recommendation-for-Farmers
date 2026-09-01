import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { SoilClimateInputs, RecommendationResponse } from './src/types';
import { CROP_DATABASE, PRESET_CONDITIONS, REGION_CLIMATE_PRESETS } from './server/cropData';
import { generateCropRecommendation } from './server/recommendationEngine';

const app = express();
const PORT = 3000;

// Enable JSON body parsing
app.use(express.json());

// In-memory history store with file backing
const DATA_DIR = path.join(process.cwd(), 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating data directory:', err);
  }
}

let historyStore: RecommendationResponse[] = [];

// Load initial history from file or seed realistic sample history
function loadHistory(): void {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
      historyStore = JSON.parse(data);
    } else {
      // Seed 2 realistic sample assessments so history isn't empty on fresh start
      seedInitialHistory();
    }
  } catch (e) {
    console.warn('Failed to load history from file, starting with seed:', e);
    seedInitialHistory();
  }
}

async function seedInitialHistory() {
  try {
    const seed1 = await generateCropRecommendation({
      n: 95,
      p: 50,
      k: 42,
      temperature: 26.5,
      humidity: 86,
      ph: 6.4,
      rainfall: 220,
      stateRegion: 'West Bengal / Assam',
      soilType: 'Clay Loam',
      farmName: 'Brahmaputra Valley Field 1',
      fieldArea: '3.5 Acres'
    });
    const seed2 = await generateCropRecommendation({
      n: 85,
      p: 52,
      k: 38,
      temperature: 18.2,
      humidity: 52,
      ph: 7.1,
      rainfall: 65,
      stateRegion: 'Punjab / Haryana',
      soilType: 'Alluvial Loam',
      farmName: 'Kisan Seva Demo Plot',
      fieldArea: '5.0 Acres'
    });
    historyStore = [seed1, seed2];
    saveHistory();
  } catch (err) {
    console.error('Failed to generate seed history:', err);
  }
}

function saveHistory(): void {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(historyStore, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save history to file:', e);
  }
}

// Load history on boot
loadHistory();

// ==========================================
// REST API ENDPOINTS
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// All Crops Encyclopedia
app.get('/api/crops', (req, res) => {
  res.json({ crops: CROP_DATABASE, count: CROP_DATABASE.length });
});

// Presets for quick farmer testing
app.get('/api/presets', (req, res) => {
  res.json({ presets: PRESET_CONDITIONS });
});

// Regional climate weather presets
app.get('/api/region-weather/:region', (req, res) => {
  const region = decodeURIComponent(req.params.region);
  const data = REGION_CLIMATE_PRESETS[region] || null;
  res.json({ region, weather: data });
});

// Crop Recommendation endpoint
app.post('/api/recommend', async (req, res) => {
  try {
    const raw = req.body as Partial<SoilClimateInputs>;

    // Validate inputs
    const n = Number(raw.n);
    const p = Number(raw.p);
    const k = Number(raw.k);
    const temperature = Number(raw.temperature);
    const humidity = Number(raw.humidity);
    const ph = Number(raw.ph);
    const rainfall = Number(raw.rainfall);

    if (
      isNaN(n) || isNaN(p) || isNaN(k) ||
      isNaN(temperature) || isNaN(humidity) ||
      isNaN(ph) || isNaN(rainfall)
    ) {
      return res.status(400).json({
        error: 'Invalid input parameters. N, P, K, Temperature, Humidity, pH, and Rainfall must all be numbers.'
      });
    }

    if (n < 0 || p < 0 || k < 0) {
      return res.status(400).json({ error: 'NPK nutrient values cannot be negative numbers.' });
    }

    if (ph < 0 || ph > 14) {
      return res.status(400).json({ error: 'Soil pH must be between 0.0 and 14.0.' });
    }

    if (humidity < 0 || humidity > 100) {
      return res.status(400).json({ error: 'Relative Humidity must be between 0% and 100%.' });
    }

    if (rainfall < 0) {
      return res.status(400).json({ error: 'Rainfall cannot be a negative value.' });
    }

    const validatedInputs: SoilClimateInputs = {
      n,
      p,
      k,
      temperature,
      humidity,
      ph,
      rainfall,
      stateRegion: raw.stateRegion || 'Unspecified Region',
      soilType: raw.soilType || 'Loam',
      farmName: raw.farmName || 'Primary Farm Plot',
      fieldArea: raw.fieldArea || 'Unspecified'
    };

    // Run prediction
    const recommendation = await generateCropRecommendation(validatedInputs);

    // Persist in history (latest first, cap at 100 items)
    historyStore.unshift(recommendation);
    if (historyStore.length > 100) {
      historyStore = historyStore.slice(0, 100);
    }
    saveHistory();

    return res.status(200).json(recommendation);
  } catch (err: any) {
    console.error('Error generating crop recommendation:', err);
    return res.status(500).json({
      error: 'Failed to compute crop recommendation',
      details: err?.message || String(err)
    });
  }
});

// Recommendation History List
app.get('/api/history', (req, res) => {
  res.json({ history: historyStore, count: historyStore.length });
});

// Single History Entry Detail
app.get('/api/history/:id', (req, res) => {
  const { id } = req.params;
  const item = historyStore.find(h => h.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Recommendation not found' });
  }
  res.json(item);
});

// Delete History Entry
app.delete('/api/history/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = historyStore.length;
  historyStore = historyStore.filter(h => h.id !== id);
  if (historyStore.length !== initialLength) {
    saveHistory();
    return res.json({ success: true, message: 'Recommendation record removed' });
  }
  return res.status(404).json({ error: 'Record not found' });
});

// Clear All History
app.delete('/api/history', (req, res) => {
  historyStore = [];
  saveHistory();
  res.json({ success: true, message: 'All recommendation history cleared' });
});

// ==========================================
// VITE MIDDLEWARE & SERVER STARTUP
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Crop Recommendation Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
