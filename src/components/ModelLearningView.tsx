import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Database, 
  Activity, 
  CheckCircle2, 
  RefreshCw, 
  TrendingUp, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  Check, 
  UploadCloud 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

export const ModelLearningView: React.FC = () => {
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainSuccess, setRetrainSuccess] = useState<string | null>(null);

  // Model Metrics State
  const [modelMetrics, setModelMetrics] = useState({
    version: 'v3.4.2-ensemble',
    aucRoc: 0.942,
    precision: 91.8,
    recall: 93.4,
    maeWeeks: 2.1,
    trainingSamplesCount: 1485,
    lastTrained: '2026-08-28T06:45:00Z'
  });

  // Feature Importance Data
  const featureImportance = [
    { feature: 'Circle Rate vs Market Discrepancy %', importance: 28.4 },
    { feature: 'Section 11 to 19 Elapsed Ratio', importance: 24.1 },
    { feature: 'High Court Active Stay Injunctions', importance: 18.7 },
    { feature: 'Forest Stage-II / Wildlife NOC Delay', importance: 12.3 },
    { feature: 'Compensation DBT Escrow Velocity', importance: 9.8 },
    { feature: 'Tribal PESA Gram Sabha Consent Status', importance: 6.7 }
  ];

  // Ingestion Form State
  const [ingestProjectName, setIngestProjectName] = useState('');
  const [ingestSector, setIngestSector] = useState('Highways & Expressways');
  const [ingestActualDelay, setIngestActualDelay] = useState('16');
  const [ingestPrimaryBottleneck, setIngestPrimaryBottleneck] = useState('Section 30 Valuation & Solatium Dispute');

  const triggerRetraining = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsRetraining(true);
    setRetrainSuccess(null);

    try {
      const response = await fetch('/api/model/retrain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newRecordsCount: 24,
          trainingBatchId: `BATCH-2026-${Date.now().toString().slice(-4)}`
        })
      });

      const data = await response.json();
      if (data.newMetrics) {
        setModelMetrics({
          version: data.newMetrics.version,
          aucRoc: data.newMetrics.aucRoc,
          precision: data.newMetrics.precision,
          recall: data.newMetrics.recall,
          maeWeeks: data.newMetrics.maeWeeks,
          trainingSamplesCount: data.newMetrics.trainingSamplesCount,
          lastTrained: new Date().toISOString()
        });
        setRetrainSuccess(`Model successfully retrained! Updated to ${data.newMetrics.version} with AUC-ROC ${data.newMetrics.aucRoc}.`);
        setIngestProjectName('');
      }
    } catch (err) {
      console.error('Error retraining model:', err);
    } finally {
      setIsRetraining(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Continuous Model Learning & MLOps Ingestion Pipeline
            </h2>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
              Active Learning Loop
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous ingestion of completed acquisition actuals, landmark court rulings, and disbursement records to eliminate model drift.
          </p>
        </div>

        <button
          onClick={() => triggerRetraining()}
          disabled={isRetraining}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-md shadow-emerald-950/40 cursor-pointer"
        >
          {isRetraining ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Calibrating Gradient Boosting Trees...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Trigger Pipeline Retraining</span>
            </>
          )}
        </button>
      </div>

      {retrainSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{retrainSuccess}</span>
        </div>
      )}

      {/* Model Performance Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 block font-semibold">Active Model Version</span>
          <span className="text-sm font-extrabold text-cyan-400 font-mono">{modelMetrics.version}</span>
          <span className="text-[10px] text-slate-400 block">Ensemble XGBoost + RF</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 block font-semibold">AUC - ROC Score</span>
          <span className="text-xl font-extrabold text-emerald-400 font-mono">{modelMetrics.aucRoc}</span>
          <span className="text-[10px] text-emerald-400 block font-bold">Top 1% Benchmark</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 block font-semibold">Precision</span>
          <span className="text-xl font-extrabold text-white font-mono">{modelMetrics.precision}%</span>
          <span className="text-[10px] text-slate-400 block">Low False Alarm Rate</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 block font-semibold">Recall (Detection)</span>
          <span className="text-xl font-extrabold text-white font-mono">{modelMetrics.recall}%</span>
          <span className="text-[10px] text-slate-400 block">Catches 93% of Delays</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 block font-semibold">MAE (Mean Error)</span>
          <span className="text-xl font-extrabold text-amber-400 font-mono">±{modelMetrics.maeWeeks}</span>
          <span className="text-[10px] text-slate-400 block">Weeks accuracy</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 block font-semibold">Historical Training Cases</span>
          <span className="text-xl font-extrabold text-purple-400 font-mono">{modelMetrics.trainingSamplesCount}</span>
          <span className="text-[10px] text-slate-400 block">Completed Projects</span>
        </div>
      </div>

      {/* Feature Importance & Ingestion Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Feature Importance */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Global Predictive Feature Importance (% Attribution)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Trained weight distribution of legal, statutory, and administrative variables
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance} layout="vertical" margin={{ top: 10, right: 20, left: 60, bottom: 5 }}>
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 35]} unit="%" />
                <YAxis dataKey="feature" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} width={140} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="importance" name="Weight Importance %" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 5 Cols: Ingest New Completed Case */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-cyan-400" />
              Ingest Completed Project Milestone Actuals
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Submit ground-truth completion records to retrain and calibrate the ensemble
            </p>
          </div>

          <form onSubmit={triggerRetraining} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project / Stretch Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Pune Ring Road Phase-II"
                value={ingestProjectName}
                onChange={(e) => setIngestProjectName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Infrastructure Sector</label>
              <select
                value={ingestSector}
                onChange={(e) => setIngestSector(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="Highways & Expressways">Highways & Expressways</option>
                <option value="High-Speed Rail">High-Speed Rail</option>
                <option value="Dedicated Freight Corridor">Dedicated Freight Corridor</option>
                <option value="Metro Urban Transit">Metro Urban Transit</option>
                <option value="Renewable Energy (Solar/Wind)">Renewable Energy (Solar/Wind)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actual Delay (Weeks)</label>
                <input
                  type="number"
                  required
                  value={ingestActualDelay}
                  onChange={(e) => setIngestActualDelay(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Litigation Present?</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none">
                  <option value="YES">Yes (High Court Stay)</option>
                  <option value="NO">No (Clean Handover)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Delay Driver</label>
              <select
                value={ingestPrimaryBottleneck}
                onChange={(e) => setIngestPrimaryBottleneck(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="Section 30 Valuation & Solatium Dispute">Section 30 Valuation & Solatium Dispute</option>
                <option value="Section 11 to 19 Statutory 12-Month Expiry">Section 11 to 19 Statutory 12-Month Expiry</option>
                <option value="Forest Clearance Stage-II & Wildlife NOC">Forest Clearance Stage-II & Wildlife NOC</option>
                <option value="Tribal PESA Gram Sabha Consent Friction">Tribal PESA Gram Sabha Consent Friction</option>
                <option value="Succession & Fragmented Land Title Mutations">Succession & Fragmented Land Title Mutations</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isRetraining}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-bold py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Ingest & Retrain Model</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
