import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Sparkles, 
  TrendingDown, 
  Clock, 
  IndianRupee, 
  Scale, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  Zap 
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
import { LandAcquisitionProject, WhatIfSimulationParams, SimulationResult } from '../types';

interface WhatIfSimulationViewProps {
  projects: LandAcquisitionProject[];
  initialProjectId?: string;
  onProjectUpdated?: (updatedProject: LandAcquisitionProject) => void;
}

export const WhatIfSimulationView: React.FC<WhatIfSimulationViewProps> = ({
  projects,
  initialProjectId,
  onProjectUpdated
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjectId || projects[0]?.id || ''
  );

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Simulation Parameters
  const [disbursementMultiplier, setDisbursementMultiplier] = useState<number>(1.5);
  const [legalSettlementPct, setLegalSettlementPct] = useState<number>(60);
  const [slaCompressionDays, setSlaCompressionDays] = useState<number>(45);
  const [rrPackageIncreasePct, setRrPackageIncreasePct] = useState<number>(20);
  const [jointTaskforceDeployed, setJointTaskforceDeployed] = useState<boolean>(true);

  // Simulation Results
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [appliedNotification, setAppliedNotification] = useState<boolean>(false);

  // Run simulation whenever parameters change
  const runSimulation = async () => {
    if (!currentProject) return;
    setIsSimulating(true);

    try {
      const payload: WhatIfSimulationParams = {
        projectId: currentProject.id,
        compensationDisbursementSpeedMultiplier: disbursementMultiplier,
        disputeResolutionFastTrackPct: legalSettlementPct,
        environmentalClearanceSlaReductionDays: slaCompressionDays,
        rrPackageEnhancedAssistancePct: rrPackageIncreasePct,
        dedicatedTaskforceDeployed: jointTaskforceDeployed
      };

      const response = await fetch('/api/simulate-what-if', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setSimulationResult(data.simulation || data);
    } catch (err) {
      console.error('Error running What-If simulation:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [
    selectedProjectId, 
    disbursementMultiplier, 
    legalSettlementPct, 
    slaCompressionDays, 
    rrPackageIncreasePct, 
    jointTaskforceDeployed
  ]);

  // Reset to default
  const resetParameters = () => {
    setDisbursementMultiplier(1.0);
    setLegalSettlementPct(0);
    setSlaCompressionDays(0);
    setRrPackageIncreasePct(0);
    setJointTaskforceDeployed(false);
  };

  // Maximize interventions
  const applyAggressivePolicy = () => {
    setDisbursementMultiplier(2.0);
    setLegalSettlementPct(80);
    setSlaCompressionDays(60);
    setRrPackageIncreasePct(25);
    setJointTaskforceDeployed(true);
  };

  const applyAsDirective = () => {
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 3000);
  };

  // Prepare chart comparison data
  const comparisonData = currentProject && simulationResult ? [
    {
      metric: 'Risk Score (0-100)',
      Baseline: simulationResult.originalRiskScore,
      Mitigated: simulationResult.simulatedRiskScore,
    },
    {
      metric: 'Delay Weeks',
      Baseline: simulationResult.originalDelayWeeks,
      Mitigated: simulationResult.simulatedDelayWeeks,
    }
  ] : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Interactive "What-If" Policy Mitigation & Counterfactual Sandbox
            </h2>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
              Prescriptive ML Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate administrative interventions, fast-track judicial arbitration, compensation boosts, and inter-ministerial taskforces to quantify delay reduction.
          </p>
        </div>

        {/* Project Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-bold whitespace-nowrap">Select Corridor:</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.code} - {p.name} ({p.riskLevel})
              </option>
            ))}
          </select>
        </div>
      </div>

      {appliedNotification && (
        <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Mitigation strategy successfully approved and logged to official PM GatiShakti Audit Trail!</span>
        </div>
      )}

      {/* Main Grid: Levers on Left, Impact Simulation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Policy Levers & Sliders */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Administrative Intervention Levers
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={resetParameters}
                className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={applyAggressivePolicy}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
              >
                Max Impact Preset
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Lever 1: Compensation Disbursement Velocity */}
            <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200">
                  1. Compensation Payout Velocity Multiplier
                </label>
                <span className="font-mono font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {disbursementMultiplier.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={disbursementMultiplier}
                onChange={(e) => setDisbursementMultiplier(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Accelerates DBT bank transfers, special camps for succession title rectifications, and escrow funding.
              </p>
            </div>

            {/* Lever 2: Special Lok Adalat & Court Arbitration */}
            <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200">
                  2. Special Lok Adalat & Out-of-Court Settlement
                </label>
                <span className="font-mono font-extrabold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  {legalSettlementPct}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={legalSettlementPct}
                onChange={(e) => setLegalSettlementPct(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Resolves circle rate disputes and vacates High Court stay orders via mutually agreed enhanced consent packages.
              </p>
            </div>

            {/* Lever 3: Inter-departmental Clearances SLA Compression */}
            <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200">
                  3. MoEFCC / Railway Clearance Compression
                </label>
                <span className="font-mono font-extrabold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                  -{slaCompressionDays} Days
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={slaCompressionDays}
                onChange={(e) => setSlaCompressionDays(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Single-window fast-track for Forest Stage-II, Railway GAD approval, and Defense NOCs.
              </p>
            </div>

            {/* Lever 4: Enhanced R&R Livelihood Grant */}
            <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200">
                  4. Enhanced R&R Package & Livelihood Grants
                </label>
                <span className="font-mono font-extrabold text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                  +{rrPackageIncreasePct}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={rrPackageIncreasePct}
                onChange={(e) => setRrPackageIncreasePct(parseInt(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Incentivizes voluntary physical possession handover without physical resistance or community agitation.
              </p>
            </div>

            {/* Lever 5: Dedicated Inter-departmental Joint Taskforce */}
            <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div>
                <label className="font-bold text-slate-200 block">
                  5. Deploy Joint Inter-Ministerial Taskforce
                </label>
                <span className="text-[10px] text-slate-400">
                  Dedicated Sub-Divisional Magistrate + Forest + Revenue squad
                </span>
              </div>
              <button
                onClick={() => setJointTaskforceDeployed(!jointTaskforceDeployed)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  jointTaskforceDeployed 
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {jointTaskforceDeployed ? 'DEPLOYED' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Real-time Simulation Output */}
        <div className="lg:col-span-7 space-y-5">
          {/* Key Impact Headline Banner */}
          {simulationResult && (
            <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Predictive Outcome Quantification
                </span>
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded">
                  {simulationResult.weeksSaved > 0 ? `▲ High Mitigation Impact` : `Baseline State`}
                </span>
              </div>

              {/* 3 Major Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 block font-semibold">Risk Score Reduction</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-500 line-through">
                      {simulationResult.originalRiskScore}
                    </span>
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                    <span className="text-xl font-extrabold text-emerald-400">
                      {simulationResult.simulatedRiskScore}/100
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 block font-bold">
                    -{simulationResult.originalRiskScore - simulationResult.simulatedRiskScore} pts ({simulationResult.simulatedRiskLevel})
                  </span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 block font-semibold">Delay Weeks Saved</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-500 line-through">
                      +{simulationResult.originalDelayWeeks}w
                    </span>
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                    <span className="text-xl font-extrabold text-emerald-400">
                      +{simulationResult.simulatedDelayWeeks}w
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 block font-bold">
                    ⏱️ Saved {simulationResult.weeksSaved} Weeks
                  </span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 block font-semibold">Cost Overrun Averted</span>
                  <div className="text-xl font-extrabold text-cyan-400">
                    ₹{simulationResult.costSavedCr} Cr
                  </div>
                  <span className="text-[10px] text-cyan-400/80 block font-medium">
                    Capital Loss Prevented
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Bar Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              Baseline vs Mitigated Trajectory
            </h3>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                  <XAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="Baseline" fill="#f43f5e" name="Baseline (No Intervention)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Mitigated" fill="#10b981" name="Mitigated (What-If Strategy)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown Explanation & Dispatch Button */}
          {simulationResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Simulation Narrative & Administrative Impact Analysis:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {simulationResult.narrative}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-slate-400">
                  Ready to translate these simulation parameters into official executive directives?
                </span>
                <button
                  onClick={applyAsDirective}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer whitespace-nowrap"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Adopt Policy & Issue Directives</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
