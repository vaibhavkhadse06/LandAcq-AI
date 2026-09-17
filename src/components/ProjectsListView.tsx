import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  Scale, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Sliders, 
  Download,
  IndianRupee,
  Users
} from 'lucide-react';
import { LandAcquisitionProject, RiskLevel, ProjectSector, UserRole } from '../types';

interface ProjectsListViewProps {
  projects: LandAcquisitionProject[];
  onSelectProject: (project: LandAcquisitionProject) => void;
  onNavigateToWhatIf: (projectId: string) => void;
  currentRole?: UserRole;
  onOpenNewPrediction?: () => void;
}

export const ProjectsListView: React.FC<ProjectsListViewProps> = ({
  projects,
  onSelectProject,
  onNavigateToWhatIf,
  currentRole,
  onOpenNewPrediction
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'risk' | 'delay' | 'budget' | 'families'>('risk');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Extract unique sectors & states
  const sectors = ['ALL', ...Array.from(new Set(projects.map(p => p.sector)))];
  const states = ['ALL', ...Array.from(new Set(projects.map(p => p.state)))];

  // Filtering
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.districts.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSector = selectedSector === 'ALL' || project.sector === selectedSector;
    const matchesState = selectedState === 'ALL' || project.state === selectedState;
    const matchesRisk = selectedRisk === 'ALL' || project.riskLevel === selectedRisk;

    return matchesSearch && matchesSector && matchesState && matchesRisk;
  });

  // Sorting
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let diff = 0;
    if (sortField === 'risk') diff = a.overallRiskScore - b.overallRiskScore;
    else if (sortField === 'delay') diff = a.predictedDelayWeeks - b.predictedDelayWeeks;
    else if (sortField === 'budget') diff = a.totalBudgetCr - b.totalBudgetCr;
    else if (sortField === 'families') diff = a.affectedFamiliesCount - b.affectedFamiliesCount;

    return sortDirection === 'desc' ? -diff : diff;
  });

  const toggleSort = (field: 'risk' | 'delay' | 'budget' | 'families') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportPortfolioCSV = () => {
    const headers = ['Code', 'Project Name', 'Sector', 'Agency', 'State', 'Risk Score', 'Risk Level', 'Delay Probability %', 'Predicted Delay (Weeks)', 'Budget (Cr)', 'Affected Families'];
    const rows = sortedProjects.map(p => [
      p.code,
      `"${p.name}"`,
      p.sector,
      p.agency,
      p.state,
      p.overallRiskScore,
      p.riskLevel,
      p.delayProbabilityPct,
      p.predictedDelayWeeks,
      p.totalBudgetCr,
      p.affectedFamiliesCount
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TerraGuard_Land_Acquisition_Portfolio_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              National Land Acquisition Project Portfolio
            </h2>
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2 py-0.5 rounded">
              {filteredProjects.length} Projects Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time statutory tracking, early delay risk scoring, and predictive lifecycle analytics
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportPortfolioCSV}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          {onOpenNewPrediction && (
            <button
              onClick={onOpenNewPrediction}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Score New Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search corridor or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Sector Filter */}
          <div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Infrastructure Sectors</option>
              {sectors.filter(s => s !== 'ALL').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All States / UTs</option>
              {states.filter(s => s !== 'ALL').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Risk Filter */}
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="CRITICAL">🔴 Critical Risk (80-100)</option>
              <option value="HIGH">🟠 High Risk (60-79)</option>
              <option value="MODERATE">🟡 Moderate Risk (40-59)</option>
              <option value="LOW">🟢 Low Risk (0-39)</option>
            </select>
          </div>
        </div>

        {/* Quick Sorting Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold">Sort By:</span>
            <button
              onClick={() => toggleSort('risk')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                sortField === 'risk' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Risk Score {sortField === 'risk' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => toggleSort('delay')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                sortField === 'delay' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Delay Weeks {sortField === 'delay' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => toggleSort('budget')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                sortField === 'budget' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Budget Outlay {sortField === 'budget' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => toggleSort('families')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                sortField === 'families' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Displaced PAFs {sortField === 'families' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{sortedProjects.length}</strong> of {projects.length} Corridors
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase text-slate-500 font-bold tracking-wider">
                <th className="py-3 px-4">Corridor & Agency</th>
                <th className="py-3 px-4">Current Statutory Stage</th>
                <th className="py-3 px-4">Risk Tier & Index</th>
                <th className="py-3 px-4">Forecast Delay</th>
                <th className="py-3 px-4">Disbursement Velocity</th>
                <th className="py-3 px-4">Legal Stays</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {sortedProjects.map((project) => {
                const isCrit = project.riskLevel === 'CRITICAL';
                const isHigh = project.riskLevel === 'HIGH';
                const isMod = project.riskLevel === 'MODERATE';
                const disbPct = project.compensationAllocatedCr > 0
                  ? Math.round((project.compensationDisbursedCr / project.compensationAllocatedCr) * 100)
                  : 0;

                const staysCount = project.legalDisputes.filter(l => l.status === 'STAY_ORDER_ACTIVE').length;

                return (
                  <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{project.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {project.code} • <span className="font-semibold text-blue-600">{project.agency}</span> • {project.state}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">
                        {project.stages.find(s => s.id === project.currentStage)?.name || project.currentStage}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                        {project.stages.find(s => s.id === project.currentStage)?.keyBottleneck || 'In Progress'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isCrit ? 'bg-red-50 text-red-600 border border-red-200' :
                          isHigh ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                          isMod ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}>
                          {project.riskLevel} ({project.overallRiskScore}/100)
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className={`font-bold ${isCrit ? 'text-red-600' : isHigh ? 'text-orange-500' : 'text-slate-800'}`}>
                        +{project.predictedDelayWeeks} wks
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {project.delayProbabilityPct}% probability
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full ${disbPct < 40 ? 'bg-red-500' : disbPct < 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${disbPct}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{disbPct}%</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {staysCount > 0 ? (
                        <span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          {staysCount} Injunctions
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">None</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectProject(project)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          VIEW
                        </button>
                        <button
                          onClick={() => onNavigateToWhatIf(project.id)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          SIMULATE
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
