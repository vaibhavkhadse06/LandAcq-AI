import React, { useState } from 'react';
import { 
  X, 
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
  Info
} from 'lucide-react';
import { ProjectSector, LifecycleStage } from '../types';
import { computePredictiveRisk, DetailedPredictionResult } from '../utils/predictionEngine';

interface NewPredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPredictionComplete: (prediction: DetailedPredictionResult) => void;
  onNavigateToWhatIf?: (projectName: string) => void;
}

export const NewPredictionModal: React.FC<NewPredictionModalProps> = ({
  isOpen,
  onClose,
  onPredictionComplete,
  onNavigateToWhatIf
}) => {
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<DetailedPredictionResult | null>(null);

  if (!isOpen) return null;

  // Quick Preset Scenarios for instant evaluation
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

  const handleCompute = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

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

    try {
      // Calculate prediction immediately using the ML engine
      const result = computePredictiveRisk(payload);
      setPredictionResult(result);
      onPredictionComplete(result);

      // Also notify backend asynchronously for audit logging
      fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.debug('Backend sync note:', err));
    } catch (err) {
      console.warn('Calculating fallback prediction:', err);
      const fallback = computePredictiveRisk(payload);
      setPredictionResult(fallback);
      onPredictionComplete(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl my-auto max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Predictive Risk & Delay Scoring Engine
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-semibold border border-emerald-500/30">
                  XGBoost v3.5
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Input land acquisition parameters to compute delay risk score (0-100), forecast delay weeks, and SHAP attributions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-200">
          {!predictionResult ? (
            <form onSubmit={handleCompute} className="space-y-5">
              {/* Quick Preset Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Quick Preset Test Scenarios:
                  </span>
                  <span className="text-[10px] text-blue-400 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Click any preset to auto-fill
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => loadPreset('expressway-lapse')}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-white text-[11px]">Expressway Corridor</div>
                    <div className="text-[9px] text-rose-400 font-semibold">Sec 19 Lapse Risk</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset('bullet-train')}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-white text-[11px]">Bullet Train HSR</div>
                    <div className="text-[9px] text-amber-400 font-semibold">High Circle Rate Gap</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset('tribal-rail')}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-white text-[11px]">Tribal Mineral Rail</div>
                    <div className="text-[9px] text-indigo-400 font-semibold">PESA Gram Sabha</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset('metro-urban')}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-white text-[11px]">Urban Metro Transit</div>
                    <div className="text-[9px] text-emerald-400 font-semibold">Low-Risk Handover</div>
                  </button>
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {/* Project Title */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project / Corridor Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. NH-48 Expressway Package 3"
                  />
                </div>

                {/* Sector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as ProjectSector)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Highways">Highways & Expressways</option>
                    <option value="High-Speed Rail">High-Speed Rail</option>
                    <option value="Dedicated Freight Corridor">Dedicated Freight Corridor</option>
                    <option value="Metro Rail">Metro Urban Transit</option>
                    <option value="Renewable Energy">Renewable Energy Park</option>
                    <option value="Industrial Corridor">Industrial Corridor</option>
                  </select>
                </div>

                {/* Statutory Stage */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Statutory Stage</label>
                  <select
                    value={currentStage}
                    onChange={(e) => setCurrentStage(e.target.value as LifecycleStage)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="STAGE_1_PRELIM_SURVEY">1. Survey & Sec 11 Notification</option>
                    <option value="STAGE_2_SIA_APPROVAL">2. Social Impact Assessment (SIA)</option>
                    <option value="STAGE_3_SEC19_DECLARATION">3. Section 19 Statutory Declaration</option>
                    <option value="STAGE_4_VALUATION_AWARD">4. Section 30 Valuation & Award</option>
                    <option value="STAGE_5_COMPENSATION_PAY">5. Compensation DBT & Escrow</option>
                    <option value="STAGE_6_POSSESSION_HANDOVER">6. Physical Possession & Handover</option>
                    <option value="STAGE_7_RR_EXECUTION">7. R&R Colony Execution</option>
                  </select>
                </div>

                {/* Days Elapsed in Current Stage */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Days in Current Stage {currentStage === 'STAGE_3_SEC19_DECLARATION' && <span className="text-rose-400">(Max 365d)</span>}
                  </label>
                  <input
                    type="number"
                    value={daysElapsedInCurrentStage}
                    onChange={(e) => setDaysElapsedInCurrentStage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Total Land Required */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Land (Hectares)</label>
                  <input
                    type="number"
                    value={totalLandRequiredHa}
                    onChange={(e) => setTotalLandRequiredHa(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Affected Families */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Affected Families (PAFs)</label>
                  <input
                    type="number"
                    value={affectedFamiliesCount}
                    onChange={(e) => setAffectedFamiliesCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Private Land % */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Private Land (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={privateLandPct}
                    onChange={(e) => setPrivateLandPct(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Forest / Tribal Land % */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Forest / Tribal Land (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={forestTribalLandPct}
                    onChange={(e) => setForestTribalLandPct(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Circle Rate Discrepancy */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Circle Rate vs Market Gap (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="200"
                    value={circleRateDiscrepancyPct}
                    onChange={(e) => setCircleRateDiscrepancyPct(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Active Court Stays / Disputes */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Court Stays / Disputes</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={activeLegalDisputesCount}
                    onChange={(e) => setActiveLegalDisputesCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Compensation Disbursed % */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Compensation Disbursed (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={compensationDisbursedPct}
                    onChange={(e) => setCompensationDisbursedPct(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Pending Clearances */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Clearances (NOCs)</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={clearancesPendingCount}
                    onChange={(e) => setClearancesPendingCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-extrabold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-950/30 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Running ML Models...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Compute Prediction Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Prediction Results View */
            <div className="space-y-6">
              {/* Statutory Section 19 Lapse Warning Banner if applicable */}
              {predictionResult.statutoryLapseThreat && (
                <div className="bg-rose-950/60 border border-rose-500/50 p-4 rounded-xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-rose-200">Critical Statutory Lapse Threat Detected</h4>
                    <p className="text-[11px] text-rose-300/90 mt-0.5">
                      {predictionResult.statutoryLapseWarning}
                    </p>
                  </div>
                </div>
              )}

              {/* Main Score Summary Card */}
              <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Scoring Target</span>
                    <h3 className="text-sm font-bold text-white">{projectName}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                    predictionResult.riskLevel === 'CRITICAL' 
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                      : predictionResult.riskLevel === 'HIGH'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : predictionResult.riskLevel === 'MODERATE'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {predictionResult.riskLevel} RISK
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Overall Risk Score</span>
                    <span className={`text-2xl font-black ${
                      predictionResult.overallRiskScore >= 75 ? 'text-rose-400' : predictionResult.overallRiskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {predictionResult.overallRiskScore}
                      <span className="text-xs text-slate-500 font-normal">/100</span>
                    </span>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Predicted Delay</span>
                    <span className="text-2xl font-black text-rose-400">
                      +{predictionResult.predictedDelayWeeks}
                      <span className="text-xs text-slate-400 font-normal"> wks</span>
                    </span>
                    <span className="text-[9px] text-slate-500 block">
                      ({(predictionResult.predictedDelayWeeks / 4.3).toFixed(1)} months)
                    </span>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Delay Probability</span>
                    <span className="text-2xl font-black text-amber-400">
                      {predictionResult.delayProbabilityPct}%
                    </span>
                    <span className="text-[9px] text-slate-500 block">Confidence 95%</span>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Capital at Risk</span>
                    <span className="text-2xl font-black text-white">
                      ₹{predictionResult.capitalAtRiskCr || Math.round((predictionResult.predictedDelayWeeks * 12.5))}
                      <span className="text-xs text-slate-400 font-normal"> Cr</span>
                    </span>
                    <span className="text-[9px] text-slate-500 block">Cost Overrun</span>
                  </div>
                </div>

                {/* Priority Action Recommendation */}
                {predictionResult.priorityAction && (
                  <div className="bg-blue-950/40 border border-blue-500/30 p-3 rounded-lg flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-blue-500/20 text-blue-300 rounded font-bold text-[10px]">KEY DIRECTIVE</span>
                      <span className="text-slate-200">{predictionResult.priorityAction}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Explainable AI (SHAP) Drivers */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    Top Delay Bottlenecks (SHAP Feature Attribution)
                  </span>
                  <span className="text-[10px] text-slate-500">Sorted by mathematical weight</span>
                </div>

                <div className="space-y-2">
                  {(predictionResult.topDelayDrivers || predictionResult.shapDrivers || []).map((driver, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-950 border border-slate-800/90 hover:border-slate-700 p-3 rounded-lg flex items-center justify-between transition-colors"
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

              {/* Prescriptive AI Recommendations */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Prescriptive Administrative & Legal Directives
                </span>
                <div className="space-y-2">
                  {(predictionResult.aiRecommendations || []).map((rec, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-start gap-2.5">
                      <span className="text-blue-400 font-bold mt-0.5">•</span>
                      <span className="text-slate-300 leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setPredictionResult(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer text-xs"
                >
                  ← Test Another Scenario
                </button>

                <div className="flex items-center gap-2">
                  {onNavigateToWhatIf && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigateToWhatIf(projectName);
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-xs shadow-md"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      Simulate Mitigations (What-If)
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2 rounded-lg transition-colors cursor-pointer text-xs shadow-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
