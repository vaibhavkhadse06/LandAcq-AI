import React, { useState } from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  Clock, 
  Layers, 
  Cpu, 
  ChevronRight, 
  FileText, 
  ShieldCheck, 
  Zap,
  Filter,
  Download,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ScopeOfStudyItem } from '../types';
import { SCOPE_OF_STUDY_DATA } from '../data/mockData';
import { README_MARKDOWN_CONTENT } from '../data/readmeContent';

interface ScopeOfStudyViewProps {
  scopeData?: ScopeOfStudyItem[];
  onNavigateToDashboard?: () => void;
  onNavigateToPrediction?: () => void;
}

export const ScopeOfStudyView: React.FC<ScopeOfStudyViewProps> = ({
  scopeData = SCOPE_OF_STUDY_DATA,
  onNavigateToDashboard,
  onNavigateToPrediction
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredStages = scopeData.filter(item => 
    item.lifecycleStage.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.statutoryBasis.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.delayRiskFactors.some(f => f.toLowerCase().includes(searchFilter.toLowerCase())) ||
    item.parametersAnalyzed.some(p => p.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const exportSummary = () => {
    const jsonStr = JSON.stringify(scopeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TerraGuard_Scope_of_Study_Taxonomy.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([README_MARKDOWN_CONTENT], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:p-8 relative overflow-hidden">
        <div className="space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Statutory Research Framework & Systematic Problem Definition
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Scope of Study: Early Detection & Predictive Modeling of Land Acquisition Delays
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Land acquisition in infrastructure projects (Highways, High-Speed Rail, Metro, Dedicated Freight Corridors, Ports, Energy) is prone to multifaceted systemic delays. This study establishes an end-to-end AI/ML predictive analytics architecture that models delay probabilities across all 7 lifecycle stages under the <strong>Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement (RFCTLARR) Act, 2013</strong>.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button 
            onClick={handleDownloadReadme}
            className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            Download README.md
          </button>
          <button 
            onClick={exportSummary}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            Export Taxonomy Data (JSON)
          </button>
          {onNavigateToPrediction && (
            <button 
              onClick={onNavigateToPrediction}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Test Predictive Model On Custom Project
            </button>
          )}
        </div>
      </div>

      {/* Problem vs Solution Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Identified Problems */}
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
            <div className="p-1.5 rounded-md bg-red-50 text-red-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span>Identified Problems & Existing Gaps</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Historically, infrastructure monitoring in government has been <em>purely reactive</em>. Authorities only discover delays after statutory deadlines lapse or when court stay orders are issued.
          </p>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Absence of Pre-emptive Detection:</strong> No automated risk engine exists to forecast which ongoing projects will suffer possession bottlenecks before they occur.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Multifaceted Delay Drivers:</strong> Fragmented land records, contested circle rates, delayed KYC disbursements, and uncoordinated inter-departmental clearances create compounding delays.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Statutory Lapse Risks:</strong> Section 11(1) notifications automatically lapse if Section 19 declaration is not issued within 12 months, triggering a catastrophic total project reset.</span>
            </li>
          </ul>
        </div>

        {/* Expected AI Solution */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
            <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
              <Cpu className="w-4 h-4" />
            </div>
            <span>Delivered AI Solution & Predictive Scope</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            This platform delivers a proactive decision support system combining gradient-boosted ensembles (XGBoost/LightGBM) with explainable SHAP attributions.
          </p>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Automated Early Warning Engine:</strong> Dispatches alerts 90, 60, and 30 days prior to statutory lapse deadlines under Section 19(1).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Explainable Delay Attribution:</strong> Calculates feature-level SHAP impact showing exactly which factors (e.g. 24% title disputes, 18% disbursement latency) drive risk.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Counterfactual What-If Simulation:</strong> Allows policymakers to simulate policy interventions and calculate projected weeks saved and cost overrun prevented.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 7 Lifecycle Stages Taxonomy */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              RFCTLARR 7-Stage Comprehensive Lifecycle Taxonomy
            </h3>
            <p className="text-xs text-slate-500">
              Systematic parameter analysis, delay risk factors, predictive metrics, and AI mitigation capabilities
            </p>
          </div>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search taxonomy stages..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredStages.map((stage, idx) => {
            const isExpanded = selectedStageIndex === idx;
            return (
              <div 
                key={idx}
                className={`bg-white rounded-xl border transition-all shadow-sm ${
                  isExpanded ? 'border-blue-400 ring-1 ring-blue-400' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
                  onClick={() => setSelectedStageIndex(isExpanded ? null : idx)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{stage.lifecycleStage}</h4>
                      <p className="text-[11px] text-blue-600 font-semibold">{stage.statutoryBasis}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      {stage.parametersAnalyzed.length} Parameters • {stage.delayRiskFactors.length} Risk Factors
                    </span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90 text-blue-600' : ''}`} />
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    {/* Parameters */}
                    <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg">
                      <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-600" />
                        Parameters Analyzed
                      </h5>
                      <ul className="space-y-1.5 text-slate-600">
                        {stage.parametersAnalyzed.map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold">›</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Delay Risk Factors */}
                    <div className="space-y-2 bg-red-50/60 p-3.5 rounded-lg border border-red-100">
                      <h5 className="font-bold text-red-950 text-xs flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        Delay Risk Factors
                      </h5>
                      <ul className="space-y-1.5 text-red-900/80">
                        {stage.delayRiskFactors.map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-red-500 font-bold">›</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Predictive Metrics */}
                    <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg">
                      <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-amber-600" />
                        Predictive Metrics
                      </h5>
                      <ul className="space-y-1.5 text-slate-600">
                        {stage.predictiveMetrics.map((m, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">›</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* AI Mitigation Capability */}
                    <div className="space-y-2 bg-blue-50 p-3.5 rounded-lg border border-blue-100">
                      <h5 className="font-bold text-blue-950 text-xs flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-blue-600" />
                        AI Mitigation Capability
                      </h5>
                      <p className="text-blue-900 text-[11px] leading-relaxed">
                        {stage.aiMitigationCapability}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
