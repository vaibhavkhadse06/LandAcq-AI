import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Scale, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  MapPin, 
  Sliders, 
  Copy, 
  Check, 
  Download, 
  ShieldAlert, 
  Send,
  Layers,
  IndianRupee,
  Users
} from 'lucide-react';
import { LandAcquisitionProject, UserRole } from '../types';

interface ProjectDetailModalProps {
  project: LandAcquisitionProject | null;
  onClose: () => void;
  onNavigateToWhatIf: (projectId: string) => void;
  currentRole: UserRole;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onNavigateToWhatIf,
  currentRole
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stages' | 'xai' | 'legal' | 'clearances' | 'parcels' | 'gemini-memo'>('overview');
  const [memoFocusArea, setMemoFocusArea] = useState('All Bottlenecks');
  const [memoAudience, setMemoAudience] = useState('District Collector & National Infrastructure Secretary');
  const [isGeneratingMemo, setIsGeneratingMemo] = useState(false);
  const [generatedMemo, setGeneratedMemo] = useState<string | null>(null);
  const [copiedMemo, setCopiedMemo] = useState(false);

  if (!project) return null;

  const isCritical = project.riskLevel === 'CRITICAL';
  const isHigh = project.riskLevel === 'HIGH';
  const disbPct = project.compensationAllocatedCr > 0
    ? Math.round((project.compensationDisbursedCr / project.compensationAllocatedCr) * 100)
    : 0;

  const generateExecutiveMemo = async () => {
    setIsGeneratingMemo(true);
    try {
      const response = await fetch('/api/gemini/generate-memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          focusArea: memoFocusArea,
          targetAudience: memoAudience
        })
      });
      const data = await response.json();
      setGeneratedMemo(data.generatedMemo || 'Failed to generate memo');
    } catch (err) {
      console.error('Error generating executive memo:', err);
      setGeneratedMemo('Error connecting to predictive AI decision support service.');
    } finally {
      setIsGeneratingMemo(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedMemo) {
      navigator.clipboard.writeText(generatedMemo);
      setCopiedMemo(true);
      setTimeout(() => setCopiedMemo(false), 2000);
    }
  };

  const downloadMemo = () => {
    if (generatedMemo) {
      const blob = new Blob([generatedMemo], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Executive_Action_Memo_${project.code}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl my-auto max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-slate-900 border border-slate-800 text-cyan-400 px-2 py-0.5 rounded">
                {project.code}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                isCritical 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                  : isHigh 
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' 
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {project.riskLevel} • Risk Score {project.overallRiskScore}/100
              </span>
              <span className="text-xs text-slate-400">
                {project.agency} • {project.state} ({project.districts.join(', ')})
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white">
              {project.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigateToWhatIf(project.id);
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulate Mitigation</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Sub-tabs */}
        <div className="px-5 border-b border-slate-800 bg-slate-950 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'overview', label: 'Summary & Overview' },
            { id: 'stages', label: 'Multi-Stage Forecast (RFCTLARR)' },
            { id: 'xai', label: 'Explainable AI (SHAP Drivers)' },
            { id: 'legal', label: `Legal Disputes (${project.legalDisputes.length})` },
            { id: 'clearances', label: `Inter-Dept Clearances (${project.clearances.length})` },
            { id: 'parcels', label: `Land Parcels (${project.parcels.length})` },
            { id: 'gemini-memo', label: '✨ AI Executive Action Memo' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-3 font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-200 text-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Macro Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 block">Forecast Delay</span>
                  <span className="text-xl font-extrabold text-rose-400">+{project.predictedDelayWeeks} wks</span>
                  <span className="text-[10px] text-slate-400 block">
                    Confidence: [{project.delayConfidenceIntervalWeeks[0]} - {project.delayConfidenceIntervalWeeks[1]} wks]
                  </span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 block">Delay Probability</span>
                  <span className="text-xl font-extrabold text-amber-400">{project.delayProbabilityPct}%</span>
                  <span className="text-[10px] text-slate-400 block">Ensemble ML Model</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 block">Land Handover Progress</span>
                  <span className="text-xl font-extrabold text-cyan-400">
                    {Math.round((project.landAcquiredHa / project.totalLandRequiredHa) * 100)}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {project.landAcquiredHa} of {project.totalLandRequiredHa} Ha
                  </span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 block">Compensation DBT</span>
                  <span className="text-xl font-extrabold text-emerald-400">{disbPct}%</span>
                  <span className="text-[10px] text-slate-400 block">
                    ₹{project.compensationDisbursedCr} / ₹{project.compensationAllocatedCr} Cr
                  </span>
                </div>
              </div>

              {/* Administrative Lead & Timeline info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    Administrative Jurisdiction & Officer in Charge
                  </h4>
                  <div className="space-y-1 text-slate-300">
                    <p><strong>Special LAO:</strong> {project.laoOfficerName}</p>
                    <p><strong>Direct Hotline:</strong> {project.laoContact}</p>
                    <p><strong>Districts:</strong> {project.districts.join(', ')} ({project.state})</p>
                    <p><strong>Implementing Agency:</strong> {project.agency} ({project.sector})</p>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Statutory Project Timelines
                  </h4>
                  <div className="space-y-1 text-slate-300">
                    <p><strong>Commencement Date:</strong> {project.startDate}</p>
                    <p><strong>Original Target Date:</strong> {project.originalTargetDate}</p>
                    <p><strong>AI Predicted Handover:</strong> <span className="text-rose-400 font-bold">{project.predictedCompletionDate}</span></p>
                    <p><strong>Last Sync Timestamp:</strong> {new Date(project.lastUpdated).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              {/* AI Prescriptions */}
              <div className="bg-slate-950 border border-emerald-500/30 p-4 rounded-xl space-y-3">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4" />
                  Prescriptive AI Action Roadmap (Automated Decision Support)
                </h4>
                <ul className="space-y-2 text-slate-300">
                  {project.aiRecommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="bg-emerald-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: MULTI-STAGE FORECAST */}
          {activeTab === 'stages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    RFCTLARR Act 2013 Lifecycle Stage Delay Breakdown
                  </h3>
                  <p className="text-xs text-slate-400">
                    Stage-by-stage delay probability and statutory bottleneck diagnostics
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {project.stages.map((stage, idx) => {
                  const isDone = stage.status === 'COMPLETED';
                  const isDelayed = stage.status === 'DELAYED';
                  const isInProg = stage.status === 'IN_PROGRESS';

                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        isDelayed 
                          ? 'bg-rose-950/20 border-rose-500/40' 
                          : isDone 
                          ? 'bg-slate-950/40 border-slate-800' 
                          : isInProg 
                          ? 'bg-cyan-950/20 border-cyan-500/40' 
                          : 'bg-slate-950/20 border-slate-900 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-emerald-400 font-bold">Stage 0{idx + 1}</span>
                            <span className="text-sm font-bold text-white">{stage.name}</span>
                            <span className="text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800 px-1.5 py-0.2 rounded">
                              {stage.statutoryReference}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs">
                            Planned: {stage.plannedDurationDays} days • Elapsed: {stage.elapsedDays} days
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className={`font-bold ${isDelayed ? 'text-rose-400' : 'text-slate-300'}`}>
                              {stage.predictedDelayWeeks > 0 ? `+${stage.predictedDelayWeeks} wks delay` : 'On Schedule'}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              Risk: {stage.delayProbability}% prob
                            </span>
                          </div>

                          <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                            isDone 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : isDelayed 
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse' 
                              : isInProg 
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                              : 'bg-slate-800 text-slate-500'
                          }`}>
                            {stage.status}
                          </span>
                        </div>
                      </div>

                      {stage.keyBottleneck && (
                        <div className="mt-3 bg-slate-950/80 border border-rose-500/30 p-2.5 rounded-lg text-rose-300 text-xs flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-rose-400">Critical Stage Choke Point: </span>
                            <span>{stage.keyBottleneck}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: EXPLAINABLE AI (SHAP) */}
          {activeTab === 'xai' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Explainable AI (XAI) Feature Attribution Breakdown (SHAP Waterfall)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Transparency and mathematical feature weight decomposition explaining why this project received a risk score of {project.overallRiskScore}/100.
                </p>
              </div>

              <div className="space-y-3">
                {project.topDelayDrivers.map((driver, idx) => {
                  const isRisk = driver.direction === 'INCREASES_RISK';
                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border ${
                        isRisk 
                          ? 'bg-rose-950/15 border-rose-900/40' 
                          : 'bg-emerald-950/15 border-emerald-900/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isRisk ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {driver.category}
                          </span>
                          <span className="font-bold text-white text-xs">{driver.feature}</span>
                        </div>
                        <span className={`text-sm font-extrabold ${
                          isRisk ? 'text-rose-400' : 'text-emerald-400'
                        }`}>
                          {isRisk ? `▲ +${driver.impactPercentage}% Risk` : `▼ -${driver.impactPercentage}% Mitigation`}
                        </span>
                      </div>

                      {/* Progress Bar representation */}
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mb-2">
                        <div 
                          className={`h-full rounded-full ${isRisk ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(100, driver.impactPercentage * 2.5)}%` }}
                        ></div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {driver.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: LEGAL DISPUTES */}
          {activeTab === 'legal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Active Litigation & Court Stays</h3>
                  <p className="text-xs text-slate-400">
                    Judicial petitions before High Court, Supreme Court, and Land Acquisition Authorities
                  </p>
                </div>
              </div>

              {project.legalDisputes.length === 0 ? (
                <div className="bg-slate-950 p-8 rounded-xl text-center space-y-2 border border-slate-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-white">No active court disputes registered</p>
                  <p className="text-xs text-slate-400">This corridor is free from judicial stay orders.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {project.legalDisputes.map((dispute, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-rose-400" />
                          <span className="font-mono font-bold text-rose-400 text-xs">{dispute.caseNumber}</span>
                          <span className="text-slate-400">• {dispute.court}</span>
                        </div>
                        <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                          {dispute.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{dispute.issue}</p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                        <span>Filing Date: {dispute.filingDate}</span>
                        <span>Parcels Affected: <strong>{dispute.parcelsAffectedCount}</strong></span>
                        <span>Financial Exposure: <strong className="text-amber-400">₹{dispute.financialImpactCr} Cr</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CLEARANCES */}
          {activeTab === 'clearances' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Inter-Departmental Clearances & NOC Tracker</h3>
                <p className="text-xs text-slate-400">
                  Ministry of Environment (MoEFCC), Railways, Defense, and State Revenue SLA monitor
                </p>
              </div>

              <div className="space-y-3">
                {project.clearances.map((c, idx) => {
                  const isBreached = c.daysPending > c.slaDays;
                  return (
                    <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{c.type}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.status === 'APPROVED' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : c.status === 'ESCALATED' 
                            ? 'bg-rose-500/20 text-rose-400 animate-pulse' 
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs">Department: {c.department}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                        <span>Officer: {c.officerInCharge}</span>
                        <span className={isBreached ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                          Pending: {c.daysPending} days (SLA: {c.slaDays} days) {isBreached ? '⚠️ SLA BREACHED' : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: PARCELS */}
          {activeTab === 'parcels' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Cadastral Land Parcels & Survey Numbers</h3>
                <p className="text-xs text-slate-400">
                  Granular plot-level risk scoring and possession handover status
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.parcels.map((parcel, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-cyan-400">{parcel.surveyNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        parcel.possessionStatus === 'ACQUIRED' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : parcel.possessionStatus === 'DISPUTED' 
                          ? 'bg-rose-500/20 text-rose-400' 
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {parcel.possessionStatus}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs">
                      Village: <strong>{parcel.village}</strong> ({parcel.district}) • Area: {parcel.areaHectares} Ha
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                      <span>Type: {parcel.classification}</span>
                      <span>Risk Score: <strong className={parcel.riskScore > 75 ? 'text-rose-400' : 'text-emerald-400'}>{parcel.riskScore}/100</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: GEMINI AI EXECUTIVE MEMO */}
          {activeTab === 'gemini-memo' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-emerald-500/30 p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Executive Delay Mitigation Action Memo Generator</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Synthesize real-time project metrics, RFCTLARR Act legal requirements, SHAP feature attributions, and pending clearance SLAs into a formal, actionable government directive.
                </p>

                {/* Generator Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Focus Area
                    </label>
                    <select
                      value={memoFocusArea}
                      onChange={(e) => setMemoFocusArea(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                    >
                      <option value="All Bottlenecks">Comprehensive (All Critical Bottlenecks)</option>
                      <option value="Court Stays & Sec 77 Escrow Deposit">Legal Stays & Compensation Escrow Payouts</option>
                      <option value="Forest Clearance Stage-II & Wildlife NOC">Environmental & Inter-Department Clearances</option>
                      <option value="Tribal PESA Consent & R&R Resettlement Colony">Tribal PESA Consents & R&R Townships</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Target Authority
                    </label>
                    <select
                      value={memoAudience}
                      onChange={(e) => setMemoAudience(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                    >
                      <option value="District Collector & National Infrastructure Secretary">District Collector & National Infrastructure Secretary</option>
                      <option value="Special Land Acquisition Officer (SLAO)">Special Land Acquisition Officer (SLAO)</option>
                      <option value="Chief Secretary Empowered Committee">Chief Secretary State Empowered Committee</option>
                      <option value="Implementing Agency Chairman (NHAI/Rail)">Implementing Agency Project Director</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={generateExecutiveMemo}
                    disabled={isGeneratingMemo}
                    className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-md shadow-emerald-950/40 cursor-pointer"
                  >
                    {isGeneratingMemo ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>Synthesizing Legal Directive...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Generate Executive Action Memo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Rendered Memo Box */}
              {generatedMemo && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 relative">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      Generated Administrative Directive
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer"
                      >
                        {copiedMemo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedMemo ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={downloadMemo}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Download (.md)</span>
                      </button>
                    </div>
                  </div>

                  <div className="prose prose-invert prose-xs max-w-none text-slate-200 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                    {generatedMemo}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
