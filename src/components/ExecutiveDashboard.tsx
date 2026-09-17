import React from 'react';
import { 
  AlertOctagon, 
  TrendingUp, 
  Clock, 
  IndianRupee, 
  Building, 
  Scale, 
  ArrowUpRight, 
  Zap, 
  ShieldAlert, 
  Sliders, 
  Flame, 
  MapPin, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { LandAcquisitionProject, UserRole } from '../types';

interface ExecutiveDashboardProps {
  projects: LandAcquisitionProject[];
  onSelectProject: (project: LandAcquisitionProject) => void;
  onNavigateToWhatIf: (projectId: string) => void;
  onNavigateToScope: () => void;
  onNavigateToPredictor?: () => void;
  currentRole: UserRole;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  projects,
  onSelectProject,
  onNavigateToWhatIf,
  onNavigateToScope,
  onNavigateToPredictor,
  currentRole
}) => {
  // Compute High-Level Metrics
  const totalProjects = projects.length;
  const criticalProjects = projects.filter(p => p.riskLevel === 'CRITICAL');
  const highRiskProjects = projects.filter(p => p.riskLevel === 'HIGH');
  const moderateProjects = projects.filter(p => p.riskLevel === 'MODERATE');
  const lowRiskProjects = projects.filter(p => p.riskLevel === 'LOW');

  const totalCapitalCr = projects.reduce((acc, p) => acc + p.totalBudgetCr, 0);
  const totalCompensationAllocatedCr = projects.reduce((acc, p) => acc + p.compensationAllocatedCr, 0);
  const totalCompensationDisbursedCr = projects.reduce((acc, p) => acc + p.compensationDisbursedCr, 0);
  const totalDisbursementPct = totalCompensationAllocatedCr > 0 
    ? Math.round((totalCompensationDisbursedCr / totalCompensationAllocatedCr) * 100) 
    : 0;
  
  const avgDelayWeeks = totalProjects > 0 
    ? (projects.reduce((acc, p) => acc + p.predictedDelayWeeks, 0) / totalProjects).toFixed(1)
    : '0';
  const avgDelayMonths = (Number(avgDelayWeeks) / 4.3).toFixed(1);

  const totalActiveStays = projects.reduce((acc, p) => 
    acc + p.legalDisputes.filter(l => l.status === 'STAY_ORDER_ACTIVE').length, 0
  );

  // Risk Distribution Data for Donut Chart
  const riskDistribution = [
    { name: 'Critical Risk', count: criticalProjects.length, color: '#ef4444' },
    { name: 'High Risk', count: highRiskProjects.length, color: '#f97316' },
    { name: 'Moderate Risk', count: moderateProjects.length, color: '#eab308' },
    { name: 'Low Risk', count: lowRiskProjects.length, color: '#10b981' }
  ];

  // Stage-wise Bottlenecks Count
  const stageBottlenecks: Record<string, { name: string; count: number; avgDelay: number }> = {
    'STAGE_1_PRELIM_SURVEY': { name: '1. Survey & Sec 11', count: 0, avgDelay: 0 },
    'STAGE_2_SIA_APPROVAL': { name: '2. SIA Review', count: 0, avgDelay: 0 },
    'STAGE_3_SEC19_DECLARATION': { name: '3. Sec 19 Decl.', count: 0, avgDelay: 0 },
    'STAGE_4_VALUATION_AWARD': { name: '4. Award Inquiry', count: 0, avgDelay: 0 },
    'STAGE_5_COMPENSATION_PAY': { name: '5. Compensation', count: 0, avgDelay: 0 },
    'STAGE_6_POSSESSION_HANDOVER': { name: '6. Possession', count: 0, avgDelay: 0 },
    'STAGE_7_RR_EXECUTION': { name: '7. R&R Colony', count: 0, avgDelay: 0 }
  };

  projects.forEach(p => {
    if (stageBottlenecks[p.currentStage]) {
      stageBottlenecks[p.currentStage].count += 1;
      stageBottlenecks[p.currentStage].avgDelay += p.predictedDelayWeeks;
    }
  });

  const stageChartData = Object.keys(stageBottlenecks).map(key => {
    const item = stageBottlenecks[key];
    return {
      stage: item.name,
      activeProjects: item.count,
      avgDelayWeeks: item.count > 0 ? Number((item.avgDelay / item.count).toFixed(1)) : 0
    };
  });

  // State-wise Breakdown
  const stateSummary: Record<string, { state: string; avgDelay: number; count: number; budgetCr: number }> = {};
  projects.forEach(p => {
    if (!stateSummary[p.state]) {
      stateSummary[p.state] = { state: p.state, avgDelay: 0, count: 0, budgetCr: 0 };
    }
    stateSummary[p.state].avgDelay += p.predictedDelayWeeks;
    stateSummary[p.state].count += 1;
    stateSummary[p.state].budgetCr += p.totalBudgetCr;
  });

  const stateChartData = Object.values(stateSummary).map(s => ({
    state: s.state,
    avgDelayWeeks: Number((s.avgDelay / s.count).toFixed(1)),
    projectsCount: s.count,
    capitalCr: s.budgetCr
  }));

  // Sector-wise Risk Radar
  const sectorSummary: Record<string, { sector: string; avgRisk: number; count: number }> = {};
  projects.forEach(p => {
    if (!sectorSummary[p.sector]) {
      sectorSummary[p.sector] = { sector: p.sector, avgRisk: 0, count: 0 };
    }
    sectorSummary[p.sector].avgRisk += p.overallRiskScore;
    sectorSummary[p.sector].count += 1;
  });

  const sectorRadarData = Object.values(sectorSummary).map(s => ({
    sector: s.sector.replace('Dedicated Freight Corridor', 'DFC').replace('Renewable Energy', 'Renewables').replace('Airport Greenfield', 'Airport'),
    riskScore: Math.round(s.avgRisk / s.count)
  }));

  return (
    <div className="space-y-5 pb-12">
      {/* Top Banner Alert for High Risk */}
      {criticalProjects.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 text-red-600 rounded-lg">
              <AlertOctagon className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-red-950">
                  URGENT TRIAGE: {criticalProjects.length} Projects in Critical Delay Tier (Risk Score ≥ 80)
                </span>
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Action SLA &lt; 7 Days
                </span>
              </div>
              <p className="text-xs text-red-700 mt-0.5">
                Statutory 12-month Section 19 lapse countdown active on Vadodara stretch; High Court stay active on Palghar bullet train parcel.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToPredictor && (
              <button
                onClick={onNavigateToPredictor}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>ML Risk Predictor</span>
              </button>
            )}
            <button
              onClick={() => onSelectProject(criticalProjects[0])}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-1"
            >
              <span>Inspect Priority #1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Grid Layout: Left Sidebar Overview & Right Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Risk Summary & Key Delay Drivers (AI) */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          {/* Card 1: Risk Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Risk Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold text-slate-900">{totalProjects}</p>
                  <p className="text-xs text-slate-500 font-medium">Active Projects</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600">{criticalProjects.length}</p>
                  <p className="text-xs text-slate-500 font-medium">Critical Risk</p>
                </div>
              </div>

              {/* Stacked Risk Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex shadow-inner">
                <div 
                  className="bg-red-500 h-full transition-all" 
                  style={{ width: `${totalProjects > 0 ? (criticalProjects.length / totalProjects) * 100 : 0}%` }}
                ></div>
                <div 
                  className="bg-orange-400 h-full transition-all" 
                  style={{ width: `${totalProjects > 0 ? (highRiskProjects.length / totalProjects) * 100 : 0}%` }}
                ></div>
                <div 
                  className="bg-emerald-500 h-full transition-all" 
                  style={{ width: `${totalProjects > 0 ? ((moderateProjects.length + lowRiskProjects.length) / totalProjects) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-red-600">High / Critical ({criticalProjects.length + highRiskProjects.length})</span>
                <span className="text-orange-600">Med ({moderateProjects.length})</span>
                <span className="text-emerald-600">Low ({lowRiskProjects.length})</span>
              </div>
            </div>
          </div>

          {/* Card 2: Key Delay Drivers (AI) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Delay Drivers (AI)</h3>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">SHAP Attribution</span>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-1">
              <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-red-500">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-900">Legal Disputes & Injunctions</p>
                  <span className="text-[11px] font-extrabold text-red-600">+4.2 Mo</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">8 active court stays in High Court & LARRA</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-orange-400">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-900">R&R Resettlement Colony Readiness</p>
                  <span className="text-[11px] font-extrabold text-orange-600">+2.8 Mo</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Scheduled tribal block consultation hurdles</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-amber-400">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-900">Comp. Disbursement & Escrow</p>
                  <span className="text-[11px] font-extrabold text-amber-600">+1.5 Mo</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Banking KYC discrepancy & mutation gaps</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-blue-400">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-900">Inter-Dept. Clearances (MoEFCC/Rail)</p>
                  <span className="text-[11px] font-extrabold text-blue-600">+1.1 Mo</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Forest Stage-II & Wildlife Standing approvals</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Macro 3-Col KPI Cards, Tables & Charts */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* KPI 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col justify-between">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Predicted Avg Delay</p>
              <div className="my-1">
                <p className="text-3xl font-bold text-slate-900">
                  {avgDelayMonths} <span className="text-sm font-normal text-slate-500 uppercase">Months</span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-red-600 text-xs font-semibold">
                <span>↑ +{avgDelayWeeks} wks baseline</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col justify-between">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Comp. Payout Ratio</p>
              <div className="my-1">
                <p className="text-3xl font-bold text-slate-900">
                  {totalDisbursementPct} <span className="text-sm font-normal text-slate-500 uppercase">%</span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                <span>₹{totalCompensationDisbursedCr} / ₹{totalCompensationAllocatedCr} Cr</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col justify-between">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Model Confidence</p>
              <div className="my-1">
                <p className="text-3xl font-bold text-slate-900">
                  94.2 <span className="text-sm font-normal text-slate-500 uppercase">%</span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-blue-600 text-xs font-semibold">
                <span>XGBoost v3.4 Stable</span>
              </div>
            </div>
          </div>

          {/* High-Risk Land Acquisition Cases Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-800">High-Risk Land Acquisition Cases</h3>
                <p className="text-xs text-slate-500">Triage priority by AI risk score and statutory lapse window</p>
              </div>
              <button 
                onClick={onNavigateToScope}
                className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                View RFCTLARR Stages →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold">
                  <tr>
                    <th className="px-4 py-2.5 border-b border-slate-200">Project Corridor</th>
                    <th className="px-4 py-2.5 border-b border-slate-200">Delay Prob.</th>
                    <th className="px-4 py-2.5 border-b border-slate-200">Primary Bottleneck</th>
                    <th className="px-4 py-2.5 border-b border-slate-200 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-100">
                  {projects
                    .slice()
                    .sort((a, b) => b.overallRiskScore - a.overallRiskScore)
                    .slice(0, 4)
                    .map((proj) => {
                      const isCrit = proj.riskLevel === 'CRITICAL';
                      return (
                        <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-bold text-slate-900">{proj.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono">{proj.code} • {proj.state} ({proj.districts.join(', ')})</p>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`w-8 text-right font-bold ${isCrit ? 'text-red-600' : 'text-orange-500'}`}>
                                {proj.delayProbabilityPct}%
                              </span>
                              <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${isCrit ? 'bg-red-500' : 'bg-orange-500'}`}
                                  style={{ width: `${proj.delayProbabilityPct}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            <span className="font-medium text-slate-800">
                              {proj.stages.find(s => s.id === proj.currentStage)?.keyBottleneck || proj.topDelayDrivers[0]?.description || 'Statutory Stage Verification'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onSelectProject(proj)}
                                className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-[10px] font-bold transition-colors cursor-pointer"
                              >
                                VIEW
                              </button>
                              <button
                                onClick={() => onNavigateToWhatIf(proj.id)}
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

          {/* AI Recommendations Action Banner */}
          <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg shadow-md shadow-blue-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-950">AI Prescriptive Action for High-Risk Clusters</h4>
                <p className="text-xs text-blue-700 mt-0.5">
                  Predicted delay reduction of <strong>45 days</strong> if 'Inter-departmental Coordination Cell' is activated for Vadodara & Palghar within the next 7 days.
                </p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateToWhatIf(projects[0]?.id || '')}
              className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              RUN SIMULATION
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Stage Delay Breakdown & State Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Stage-wise Delay Bottleneck Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Stage-wise Land Acquisition Delay Distribution
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Active project counts and average delay weeks across RFCTLARR lifecycle stages
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis 
                  dataKey="stage" 
                  tick={{ fill: '#64748b', fontSize: 10 }} 
                  angle={-15} 
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="activeProjects" name="Active Projects Count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgDelayWeeks" name="Avg Predicted Delay (+Weeks)" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* State-wise Delay Latency */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                State-wise Land Acquisition Latency & Capital Outlay
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparison of average delay (weeks) and capital exposure across key States
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stateChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDelayLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="state" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area 
                  type="monotone" 
                  dataKey="avgDelayWeeks" 
                  name="Avg Delay (Weeks)" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorDelayLight)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
