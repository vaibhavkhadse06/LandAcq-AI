import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Building2, 
  Scale, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  IndianRupee,
  Sliders,
  Layers,
  Flame,
  Info,
  TrendingUp,
  Cpu,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { ProjectSector, LifecycleStage } from '../types';
import { computePredictiveRisk, DetailedPredictionResult } from '../utils/predictionEngine';

interface RiskPredictionSandboxViewProps {
  onNavigateToWhatIf?: (projectName: string) => void;
  onPredictionComplete?: (prediction: DetailedPredictionResult) => void;
}

export const RiskPredictionSandboxView: React.FC<RiskPredictionSandboxViewProps> = ({
  onNavigateToWhatIf,
  onPredictionComplete
}) => {
  // Input parameters state
  const [projectName, setProjectName] = useState<string>('Delhi-Amritsar-Katra Expressway (Pkg 4)');
  const [sector, setSector] = useState<ProjectSector>('Highways');
  const [totalLandRequiredHa, setTotalLandRequiredHa] = useState<number>(120);
  const [affectedFamiliesCount, setAffectedFamiliesCount] = useState<number>(1400);
  const [privateLandPct, setPrivateLandPct] = useState<number>(75);
  const [forestTribalLandPct, setForestTribalLandPct] = useState<number>(15);
  const [circleRateDiscrepancyPct, setCircleRateDiscrepancyPct] = useState<number>(40);
  const [currentStage, setCurrentStage] = useState<LifecycleStage>('STAGE_3_SEC19_DECLARATION');
  const [daysElapsedInCurrentStage, setDaysElapsedInCurrentStage] = useState<number>(240);
  const [activeLegalDisputesCount, setActiveLegalDisputesCount] = useState<number>(2);
  const [compensationDisbursedPct, setCompensationDisbursedPct] = useState<number>(30);
  const [clearancesPendingCount, setClearancesPendingCount] = useState<number>(2);
  const [totalBudgetCr, setTotalBudgetCr] = useState<number>(1450);

  // Output prediction result
  const [prediction, setPrediction] = useState<DetailedPredictionResult>(() => {
    return computePredictiveRisk({
      sector: 'Highways',
      totalLandRequiredHa: 120,
      affectedFamiliesCount: 1400,
      privateLandPct: 75,
      forestTribalLandPct: 15,
      circleRateDiscrepancyPct: 40,
      currentStage: 'STAGE_3_SEC19_DECLARATION',
      daysElapsedInCurrentStage: 240,
      activeLegalDisputesCount: 2,
      compensationDisbursedPct: 30,
      clearancesPendingCount: 2,
      totalBudgetCr: 1450
    });
  });

  // Real-time recalculation as inputs change
  useEffect(() => {
    const payload = {
      sector,
      totalLandRequiredHa,
      affectedFamiliesCount,
      privateLandPct,
      forestTribalLandPct,
      circleRateDiscrepancyPct,
      currentStage,
      daysElapsedInCurrentStage,
      activeLegalDisputesCount,
      compensationDisbursedPct,
      clearancesPendingCount,
      totalBudgetCr
    };

    const res = computePredictiveRisk(payload);
    setPrediction(res);
    if (onPredictionComplete) {
      onPredictionComplete(res);
    }
  }, [
    sector,
    totalLandRequiredHa,
    affectedFamiliesCount,
    privateLandPct,
    forestTribalLandPct,
    circleRateDiscrepancyPct,
    currentStage,
    daysElapsedInCurrentStage,
    activeLegalDisputesCount,
    compensationDisbursedPct,
    clearancesPendingCount,
    totalBudgetCr
  ]);

  // Presets
  const loadPreset = (type: 'bullet-train' | 'expressway-lapse' | 'tribal-rail' | 'metro-urban') => {
    if (type === 'bullet-train') {
      setProjectName('Ahmedabad-Mumbai High Speed Rail (Surat-Navsari Pkg)');
      setSector('High-Speed Rail');
      setTotalLandRequiredHa(180);
      setAffectedFamiliesCount(2800);
      setPrivateLandPct(85);
      setForestTribalLandPct(8);
      setCircleRateDiscrepancyPct(55);
      setCurrentStage('STAGE_3_SEC19_DECLARATION');
      setDaysElapsedInCurrentStage(290);
      setActiveLegalDisputesCount(4);
      setCompensationDisbursedPct(25);
      setClearancesPendingCount(3);
      setTotalBudgetCr(3200);
    } else if (type === 'expressway-lapse') {
      setProjectName('Varanasi-Ranchi-Kolkata Expressway (Pkg 2)');
      setSector('Highways');
      setTotalLandRequiredHa(210);
      setAffectedFamiliesCount(1900);
      setPrivateLandPct(70);
      setForestTribalLandPct(20);
      setCircleRateDiscrepancyPct(45);
      setCurrentStage('STAGE_3_SEC19_DECLARATION');
      setDaysElapsedInCurrentStage(310);
      setActiveLegalDisputesCount(3);
      setCompensationDisbursedPct(20);
      setClearancesPendingCount(2);
      setTotalBudgetCr(2400);
    } else if (type === 'tribal-rail') {
      setProjectName('Jharkhand Mineral Corridor Rail Doubling');
      setSector('Dedicated Freight Corridor');
      setTotalLandRequiredHa(140);
      setAffectedFamiliesCount(950);
      setPrivateLandPct(35);
      setForestTribalLandPct(60);
      setCircleRateDiscrepancyPct(30);
      setCurrentStage('STAGE_2_SIA_APPROVAL');
      setDaysElapsedInCurrentStage(160);
      setActiveLegalDisputesCount(1);
      setCompensationDisbursedPct(10);
      setClearancesPendingCount(4);
      setTotalBudgetCr(1600);
    } else if (type === 'metro-urban') {
      setProjectName('Bengaluru Metro Phase 3 (Outer Ring Line)');
      setSector('Metro Rail');
      setTotalLandRequiredHa(45);
      setAffectedFamiliesCount(620);
      setPrivateLandPct(60);
      setForestTribalLandPct(0);
      setCircleRateDiscrepancyPct(20);
      setCurrentStage('STAGE_5_COMPENSATION_PAY');
      setDaysElapsedInCurrentStage(75);
      setActiveLegalDisputesCount(0);
      setCompensationDisbursedPct(80);
      setClearancesPendingCount(1);
      setTotalBudgetCr(1850);
    }
  };

  // Prepare SHAP chart data
  const shapChartData = (prediction.topDelayDrivers || prediction.shapDrivers || []).map(driver => ({
    name: driver.feature.length > 24 ? driver.feature.substring(0, 22) + '...' : driver.feature,
    impact: driver.impactPercentage,
    direction: driver.direction,
    category: driver.category
  }));

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              Machine Learning Risk & Delay Prediction Sandbox
            </h2>
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
              Live Gradient Boosting Model
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compute real-time acquisition risk scores (0–100), forecast delay in weeks, and inspect explainable SHAP feature weights for any corridor package.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => loadPreset('expressway-lapse')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs rounded font-medium transition-colors cursor-pointer border border-slate-700"
          >
            Sec 19 Lapse
          </button>
          <button
            onClick={() => loadPreset('bullet-train')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded font-medium transition-colors cursor-pointer border border-slate-700"
          >
            Bullet Train HSR
          </button>
          <button
            onClick={() => loadPreset('tribal-rail')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs rounded font-medium transition-colors cursor-pointer border border-slate-700"
          >
            Tribal Corridor
          </button>
          <button
            onClick={() => loadPreset('metro-urban')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs rounded font-medium transition-colors cursor-pointer border border-slate-700"
          >
            Urban Metro
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs on Left (5 Cols), Live Output on Right (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form Controls */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-400" />
              Corridor Feature Parameters
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Auto-updating
            </span>
          </div>

          <div className="space-y-3.5 text-xs text-slate-300">
            {/* Project Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project / Package Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:border-blue-500 focus:outline-none text-xs"
              />
            </div>

            {/* Sector & Stage Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sector</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as ProjectSector)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:border-blue-500 focus:outline-none text-xs"
                >
                  <option value="Highways">Highways & Expressways</option>
                  <option value="High-Speed Rail">High-Speed Rail</option>
                  <option value="Dedicated Freight Corridor">Dedicated Freight Corridor</option>
                  <option value="Metro Rail">Metro Urban Transit</option>
                  <option value="Renewable Energy">Renewable Energy Park</option>
                  <option value="Industrial Corridor">Industrial Corridor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Stage</label>
                <select
                  value={currentStage}
                  onChange={(e) => setCurrentStage(e.target.value as LifecycleStage)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:border-blue-500 focus:outline-none text-xs"
                >
                  <option value="STAGE_1_PRELIM_SURVEY">1. Survey & Sec 11</option>
                  <option value="STAGE_2_SIA_APPROVAL">2. SIA Assessment</option>
                  <option value="STAGE_3_SEC19_DECLARATION">3. Section 19 Declaration</option>
                  <option value="STAGE_4_VALUATION_AWARD">4. Sec 30 Valuation</option>
                  <option value="STAGE_5_COMPENSATION_PAY">5. Compensation DBT</option>
                  <option value="STAGE_6_POSSESSION_HANDOVER">6. Handover</option>
                  <option value="STAGE_7_RR_EXECUTION">7. R&R Colony</option>
                </select>
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="space-y-3 pt-2">
              {/* Private Land % */}
              <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Private Land Share:</span>
                  <span className="font-bold text-blue-400">{privateLandPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={privateLandPct}
                  onChange={(e) => setPrivateLandPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Tribal/Forest Land % */}
              <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Forest / Tribal Land Share:</span>
                  <span className="font-bold text-indigo-400">{forestTribalLandPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={forestTribalLandPct}
                  onChange={(e) => setForestTribalLandPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Circle Rate Discrepancy */}
              <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Circle Rate vs Market Price Gap:</span>
                  <span className="font-bold text-amber-400">{circleRateDiscrepancyPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={circleRateDiscrepancyPct}
                  onChange={(e) => setCircleRateDiscrepancyPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Days Elapsed in Current Stage */}
              <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Days Elapsed in Stage:</span>
                  <span className={`font-bold ${daysElapsedInCurrentStage > 270 ? 'text-rose-400' : 'text-slate-200'}`}>
                    {daysElapsedInCurrentStage} days {daysElapsedInCurrentStage > 270 && '(Near Section 19 365d Lapse!)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="450"
                  value={daysElapsedInCurrentStage}
                  onChange={(e) => setDaysElapsedInCurrentStage(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              {/* Active Court Stays */}
              <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Active High Court Stays:</span>
                  <span className="font-bold text-rose-400">{activeLegalDisputesCount} cases</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={activeLegalDisputesCount}
                  onChange={(e) => setActiveLegalDisputesCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              {/* Compensation Disbursed % */}
              <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Compensation Disbursed:</span>
                  <span className="font-bold text-emerald-400">{compensationDisbursedPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={compensationDisbursedPct}
                  onChange={(e) => setCompensationDisbursedPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Total Land Required & Total Budget */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Land Area (Ha)</label>
                  <input
                    type="number"
                    value={totalLandRequiredHa}
                    onChange={(e) => setTotalLandRequiredHa(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Budget (₹ Cr)</label>
                  <input
                    type="number"
                    value={totalBudgetCr}
                    onChange={(e) => setTotalBudgetCr(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Model Output & Explainability (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Statutory Section 19 Lapse Warning Banner if applicable */}
          {prediction.statutoryLapseThreat && (
            <div className="bg-rose-950/60 border border-rose-500/50 p-4 rounded-xl flex items-start gap-3 shadow-lg">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-rose-200">Critical Statutory Lapse Threat Detected under Section 19(7)</h4>
                <p className="text-[11px] text-rose-300/90 mt-0.5">
                  {prediction.statutoryLapseWarning}
                </p>
              </div>
            </div>
          )}

          {/* Main Prediction Score Cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Target Evaluation</span>
                <h3 className="text-sm font-bold text-white">{projectName}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                prediction.riskLevel === 'CRITICAL' 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                  : prediction.riskLevel === 'HIGH'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                  : prediction.riskLevel === 'MODERATE'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {prediction.riskLevel} RISK
              </span>
            </div>

            {/* 4 KPI Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Predicted Risk Score</span>
                <span className={`text-2xl font-black ${
                  prediction.overallRiskScore >= 75 ? 'text-rose-400' : prediction.overallRiskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {prediction.overallRiskScore}
                  <span className="text-xs text-slate-500 font-normal">/100</span>
                </span>
                <span className="text-[9px] text-slate-500 block">RFCTLARR Index</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Forecast Delay</span>
                <span className="text-2xl font-black text-rose-400">
                  +{prediction.predictedDelayWeeks}
                  <span className="text-xs text-slate-400 font-normal"> wks</span>
                </span>
                <span className="text-[9px] text-slate-500 block">
                  ({(prediction.predictedDelayWeeks / 4.3).toFixed(1)} months)
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Delay Probability</span>
                <span className="text-2xl font-black text-amber-400">
                  {prediction.delayProbabilityPct}%
                </span>
                <span className="text-[9px] text-slate-500 block">Confidence 95%</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Capital at Risk</span>
                <span className="text-2xl font-black text-white">
                  ₹{prediction.capitalAtRiskCr}
                  <span className="text-xs text-slate-400 font-normal"> Cr</span>
                </span>
                <span className="text-[9px] text-slate-500 block">Escalation Cost</span>
              </div>
            </div>

            {/* Key Action Directive */}
            {prediction.priorityAction && (
              <div className="bg-blue-950/40 border border-blue-500/30 p-3 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-blue-500/20 text-blue-300 rounded font-bold text-[10px]">KEY DIRECTIVE</span>
                  <span className="text-slate-200">{prediction.priorityAction}</span>
                </div>
              </div>
            )}
          </div>

          {/* Explainable AI (SHAP) Chart & Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-400" />
                SHAP Feature Attribution (Why the model predicts this risk)
              </span>
              <span className="text-[10px] text-slate-500">Mathematical impact on delay probability</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shapChartData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 40]} unit="%" />
                  <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} width={140} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(value: any) => [`${value}% impact`, 'Weight']}
                  />
                  <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                    {shapChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.direction === 'INCREASES_RISK' ? '#ef4444' : '#10b981'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2">
              {(prediction.topDelayDrivers || prediction.shapDrivers || []).map((driver, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-950 border border-slate-800/90 hover:border-slate-700 p-2.5 rounded-lg flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{driver.feature}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                        {driver.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{driver.description}</p>
                  </div>
                  <span className={`font-black text-xs px-2.5 py-1 rounded ${
                    driver.direction === 'INCREASES_RISK'
                      ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                      : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                  }`}>
                    {driver.direction === 'INCREASES_RISK' ? '+' : '-'}{driver.impactPercentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptive AI Directives & What-If Bridge */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Prescriptive Administrative Actions & Mitigations
              </span>

              {onNavigateToWhatIf && (
                <button
                  onClick={() => onNavigateToWhatIf(projectName)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Sliders className="w-3 h-3" />
                  Simulate Policy Interventions
                </button>
              )}
            </div>

            <div className="space-y-2">
              {(prediction.aiRecommendations || []).map((rec, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-start gap-2.5 text-xs">
                  <span className="text-blue-400 font-bold mt-0.5">•</span>
                  <span className="text-slate-300 leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
