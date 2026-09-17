import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Filter, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Clock, 
  IndianRupee, 
  Layers, 
  Sparkles, 
  Share2,
  Calendar
} from 'lucide-react';
import { LandAcquisitionProject, UserRole, MisReportFilter } from '../types';

interface MisReportGeneratorViewProps {
  projects: LandAcquisitionProject[];
  currentRole: UserRole;
  onSelectProject?: (project: LandAcquisitionProject) => void;
}

export const MisReportGeneratorView: React.FC<MisReportGeneratorViewProps> = ({
  projects,
  currentRole,
  onSelectProject
}) => {
  const [filter, setFilter] = useState<MisReportFilter>({
    sector: 'ALL',
    state: 'ALL',
    riskLevel: 'ALL',
    stage: 'ALL',
    fiscalYear: '2026-27'
  });

  const [reportType, setReportType] = useState<'STATUTORY_COMPLIANCE' | 'FINANCIAL_DISBURSEMENT' | 'PAF_RESETTLEMENT' | 'RISK_TRIAGE'>('STATUTORY_COMPLIANCE');

  // Filter projects according to selections
  const filteredProjects = projects.filter(p => {
    const matchSector = filter.sector === 'ALL' || p.sector === filter.sector;
    const matchState = filter.state === 'ALL' || p.state === filter.state;
    const matchRisk = filter.riskLevel === 'ALL' || p.riskLevel === filter.riskLevel;
    const matchStage = filter.stage === 'ALL' || p.currentStage === filter.stage;
    return matchSector && matchState && matchRisk && matchStage;
  });

  // Calculate Aggregates
  const totalBudgetCr = filteredProjects.reduce((acc, p) => acc + p.totalBudgetCr, 0);
  const totalAllocatedCr = filteredProjects.reduce((acc, p) => acc + p.compensationAllocatedCr, 0);
  const totalDisbursedCr = filteredProjects.reduce((acc, p) => acc + p.compensationDisbursedCr, 0);
  const totalFamilies = filteredProjects.reduce((acc, p) => acc + p.affectedFamiliesCount, 0);
  const totalStays = filteredProjects.reduce((acc, p) => acc + p.legalDisputes.filter(l => l.status === 'STAY_ORDER_ACTIVE').length, 0);
  const avgDelayWeeks = filteredProjects.length > 0 
    ? (filteredProjects.reduce((acc, p) => acc + p.predictedDelayWeeks, 0) / filteredProjects.length).toFixed(1)
    : '0';

  const handlePrintReport = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = [
      'Project Code',
      'Corridor Name',
      'Sector',
      'Agency',
      'State',
      'Current Stage',
      'Statutory Lapse Countdown (Days)',
      'Risk Score (100)',
      'Risk Level',
      'Predicted Delay (Weeks)',
      'Total Budget (Cr)',
      'Compensation Allocated (Cr)',
      'Compensation Disbursed (Cr)',
      'Disbursement %',
      'Displaced Families',
      'Active Court Stays'
    ];

    const rows = filteredProjects.map(p => {
      const disbPct = p.compensationAllocatedCr > 0 ? ((p.compensationDisbursedCr / p.compensationAllocatedCr) * 100).toFixed(1) : '0';
      const stays = p.legalDisputes.filter(l => l.status === 'STAY_ORDER_ACTIVE').length;
      return [
        p.code,
        `"${p.name}"`,
        p.sector,
        p.agency,
        p.state,
        p.currentStage,
        p.statutoryLapseCountdownDays || 'N/A',
        p.overallRiskScore,
        p.riskLevel,
        p.predictedDelayWeeks,
        p.totalBudgetCr,
        p.compensationAllocatedCr,
        p.compensationDisbursedCr,
        `${disbPct}%`,
        p.affectedFamiliesCount,
        stays
      ];
    });

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TerraGuard_MIS_Report_${reportType}_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Controls Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              Statutory MIS Report & Executive Briefing Generator
            </h2>
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2 py-0.5 rounded">
              RFCTLARR 2013 Formats
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated Management Information System (MIS) compliance summaries, financial disbursement tracking, and delay risk scorecards
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Briefing</span>
          </button>
        </div>
      </div>

      {/* Filter Ribbon & Report Type Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3 text-xs">
          <span className="font-bold text-slate-500 mr-2">Report Template:</span>
          {[
            { id: 'STATUTORY_COMPLIANCE', label: '1. RFCTLARR Statutory Compliance Matrix' },
            { id: 'FINANCIAL_DISBURSEMENT', label: '2. Compensation & PFMS Escrow Tracking' },
            { id: 'PAF_RESETTLEMENT', label: '3. PAF Rehabilitation & Colony Status' },
            { id: 'RISK_TRIAGE', label: '4. AI Early Warning & Delay Risk Triage' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setReportType(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                reportType === t.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sector</label>
            <select
              value={filter.sector}
              onChange={(e) => setFilter({ ...filter, sector: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Sectors</option>
              <option value="Highways & Expressways">Highways & Expressways</option>
              <option value="High-Speed Rail">High-Speed Rail</option>
              <option value="Dedicated Freight Corridor">Dedicated Freight Corridor</option>
              <option value="Metro Rail Transit">Metro Rail Transit</option>
              <option value="Renewable Energy">Renewable Energy</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">State / UT</label>
            <select
              value={filter.state}
              onChange={(e) => setFilter({ ...filter, state: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none"
            >
              <option value="ALL">All States</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Haryana">Haryana</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Risk Severity</label>
            <select
              value={filter.riskLevel}
              onChange={(e) => setFilter({ ...filter, riskLevel: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="CRITICAL">🔴 Critical Risk (80+)</option>
              <option value="HIGH">🟠 High Risk (60-79)</option>
              <option value="MODERATE">🟡 Moderate Risk (40-59)</option>
              <option value="LOW">🟢 Low Risk (&lt;40)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Fiscal Year</label>
            <select
              value={filter.fiscalYear}
              onChange={(e) => setFilter({ ...filter, fiscalYear: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none"
            >
              <option value="2026-27">FY 2026-27 (Current)</option>
              <option value="2025-26">FY 2025-26</option>
            </select>
          </div>
        </div>
      </div>

      {/* Official Government Document Sheet */}
      <div className="bg-white rounded-xl shadow-md border border-slate-300 p-6 sm:p-8 space-y-6 print:p-0 print:border-none print:shadow-none font-sans">
        {/* Letterhead */}
        <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🇮🇳</span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600">Government of India / National Infrastructure Pipeline</h3>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Land Acquisition Management Information System (MIS) Report
                </h2>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">
              Statutory Review under RFCTLARR Act, 2013 | PM GatiShakti Portal Synchronized
            </p>
          </div>

          <div className="text-right text-xs">
            <p className="font-mono font-bold text-slate-800">Doc Ref: MIS-2026/LARD-{reportType.slice(0, 4)}</p>
            <p className="text-slate-500 text-[11px]">Generated on: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            <p className="text-blue-600 font-bold text-[11px]">Role: {currentRole}</p>
          </div>
        </div>

        {/* Executive Summary Metrics Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Filtered Corridors</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{filteredProjects.length}</p>
            <p className="text-[10px] text-slate-500 font-medium">Projects in Scope</p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Capital Exposure</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">₹{totalBudgetCr.toLocaleString('en-IN')} <span className="text-xs font-normal">Cr</span></p>
            <p className="text-[10px] text-slate-500 font-medium">Compensation: ₹{totalAllocatedCr} Cr</p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Compensation Disbursed</p>
            <p className="text-2xl font-bold text-emerald-600 mt-0.5">
              {totalAllocatedCr > 0 ? Math.round((totalDisbursedCr / totalAllocatedCr) * 100) : 0}%
            </p>
            <p className="text-[10px] text-slate-500 font-medium">₹{totalDisbursedCr} / ₹{totalAllocatedCr} Cr</p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Active Injunctions</p>
            <p className="text-2xl font-bold text-red-600 mt-0.5">{totalStays}</p>
            <p className="text-[10px] text-slate-500 font-medium">Avg Delay: +{avgDelayWeeks} wks</p>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-[10px] uppercase font-bold text-slate-700">
                <th className="p-2.5 border-r border-slate-200">#</th>
                <th className="p-2.5 border-r border-slate-200">Corridor / Package Code</th>
                <th className="p-2.5 border-r border-slate-200">Agency & State</th>
                <th className="p-2.5 border-r border-slate-200">Current Statutory Stage</th>
                <th className="p-2.5 border-r border-slate-200 text-right">Comp. Disbursed</th>
                <th className="p-2.5 border-r border-slate-200 text-right">PAFs</th>
                <th className="p-2.5 border-r border-slate-200 text-center">Delay Risk</th>
                <th className="p-2.5 text-center">Court Stays</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProjects.map((p, idx) => {
                const disbPct = p.compensationAllocatedCr > 0
                  ? Math.round((p.compensationDisbursedCr / p.compensationAllocatedCr) * 100)
                  : 0;
                const activeStays = p.legalDisputes.filter(l => l.status === 'STAY_ORDER_ACTIVE').length;

                return (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-2.5 border-r border-slate-200 font-mono text-slate-500">{idx + 1}</td>
                    <td className="p-2.5 border-r border-slate-200 font-bold text-slate-900">
                      <div>{p.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 font-normal">{p.code}</div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200">
                      <div className="font-semibold text-blue-700">{p.agency}</div>
                      <div className="text-[10px] text-slate-500">{p.state} ({p.districts.join(', ')})</div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-[11px] text-slate-700">
                      <div className="font-medium">{p.stages.find(s => s.id === p.currentStage)?.name || p.currentStage}</div>
                      {p.statutoryLapseCountdownDays ? (
                        <div className="text-[10px] font-bold text-red-600 mt-0.5">
                          ⏳ {p.statutoryLapseCountdownDays} days to Sec 19 lapse
                        </div>
                      ) : null}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-right">
                      <div className="font-bold text-slate-800">₹{p.compensationDisbursedCr} Cr</div>
                      <div className="text-[10px] text-slate-500 font-medium">({disbPct}% of ₹{p.compensationAllocatedCr} Cr)</div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-right font-medium text-slate-800">
                      {p.affectedFamiliesCount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        p.riskLevel === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        p.riskLevel === 'MODERATE' ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {p.overallRiskScore}/100 (+{p.predictedDelayWeeks}w)
                      </span>
                    </td>
                    <td className="p-2.5 text-center font-bold">
                      {activeStays > 0 ? (
                        <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                          {activeStays} Active
                        </span>
                      ) : (
                        <span className="text-emerald-600">Nil</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Official Statutory Notes & Sign-off Block */}
        <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-600">
          <div>
            <h5 className="font-bold text-slate-800 uppercase mb-1">Compliance Notes & AI Directives:</h5>
            <p>
              1. All parcels marked in Critical Risk category require District Magistrate SLAO review within 7 calendar days to prevent Section 11 lapse.
            </p>
            <p>
              2. PFMS payment gateways must be utilized for direct DBT disbursement to PAF escrow accounts to minimize title litigations.
            </p>
          </div>

          <div className="text-right flex flex-col justify-end">
            <p className="font-bold text-slate-800">Authorized Digital Certification</p>
            <p className="text-[10px] text-slate-500 font-mono">National Infrastructure Monitoring System (NIMS) / PM GatiShakti</p>
          </div>
        </div>
      </div>
    </div>
  );
};
