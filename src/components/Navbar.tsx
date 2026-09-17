import React from 'react';
import { 
  Building2, 
  Activity, 
  MapPin, 
  Sliders, 
  Bell, 
  Cpu, 
  FileCode2, 
  History, 
  BookOpen, 
  UserCheck, 
  Search,
  Sparkles,
  Layers,
  ShieldCheck,
  Smartphone,
  FileSpreadsheet,
  Presentation,
  Download
} from 'lucide-react';
import { UserRole } from '../types';
import { README_MARKDOWN_CONTENT } from '../data/readmeContent';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  unacknowledgedAlertsCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNewPrediction: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  setCurrentRole,
  unacknowledgedAlertsCount,
  searchQuery,
  setSearchQuery,
  onOpenNewPrediction
}) => {
  const roleDisplayNames: Record<UserRole, { label: string; name: string; dept: string }> = {
    NATIONAL_DIRECTOR: { label: 'National Director', name: 'Dr. V. K. Paul (Secy)', dept: 'Ministry of Infra & PM GatiShakti' },
    DISTRICT_COLLECTOR: { label: 'District Magistrate', name: 'Shri R. K. Patel (IAS)', dept: 'District Revenue & SLAO' },
    LEGAL_COMPLIANCE_OFFICER: { label: 'Legal Counsel', name: 'Adv. S. Ramanathan', dept: 'LARRA & Judicial Cell' },
    PROJECT_MANAGER: { label: 'Agency PM', name: 'Er. Rajesh Sharma', dept: 'NHAI / NHSRCL Corridor PM' },
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'risk-predictor', label: 'ML Risk Predictor', icon: Sparkles, highlight: true },
    { id: 'methodology-slides', label: 'Methodology Slides', icon: Presentation },
    { id: 'scope-of-study', label: 'Scope & Taxonomy', icon: BookOpen },
    { id: 'projects', label: 'Projects Portfolio', icon: Building2 },
    { id: 'gis-map', label: 'National GIS Map', icon: MapPin },
    { id: 'field-survey', label: 'Field Verification', icon: Smartphone },
    { id: 'what-if', label: 'What-If Simulator', icon: Sliders },
    { id: 'mis-reports', label: 'Statutory MIS', icon: FileSpreadsheet },
    { id: 'alerts', label: 'Alerts Matrix', icon: Bell, badge: unacknowledgedAlertsCount },
    { id: 'model-learning', label: 'Continuous Learning', icon: Cpu },
    { id: 'api-hub', label: 'APIs', icon: FileCode2 },
    { id: 'audit-trail', label: 'Audit Logs', icon: History }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-lg flex flex-col">
      {/* Top Utility Ribbon */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 sm:px-6 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Model v3.4.2 XGBoost Active
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-slate-300 hidden sm:flex">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            PM GatiShakti Synchronized
          </span>
          <span className="text-slate-700 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline">
            RFCTLARR Act 2013 Statutory Compliance
          </span>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 flex items-center gap-1 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            Active Role:
          </span>
          <select
            id="role-selector"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as UserRole)}
            className="bg-slate-900 border border-slate-700 text-blue-300 text-xs rounded-md px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer font-medium"
          >
            <option value="NATIONAL_DIRECTOR">🏛️ National Director (Secretary)</option>
            <option value="DISTRICT_COLLECTOR">📍 District Collector / Magistrate</option>
            <option value="LEGAL_COMPLIANCE_OFFICER">⚖️ Legal & Compliance Counsel</option>
            <option value="PROJECT_MANAGER">🏗️ Agency Project Manager</option>
          </select>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4 border-b border-slate-800">
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-md shadow-blue-500/20">
            L
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white flex items-center gap-2">
              <span>TerraGuard AI</span>
              <span className="text-slate-400 font-normal text-xs hidden lg:inline border-l border-slate-700 pl-2">
                Land Acquisition Predictive Analytics
              </span>
            </h1>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search corridors, packages, districts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Button & User Profile Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const blob = new Blob([README_MARKDOWN_CONTENT], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'README.md';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="hidden lg:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            title="Download complete README.md project documentation"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>README.md</span>
          </button>

          <button
            id="new-prediction-btn"
            onClick={onOpenNewPrediction}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Predict Risk Score</span>
            <span className="sm:hidden">Predict</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-200">{roleDisplayNames[currentRole].name}</p>
              <p className="text-[10px] text-slate-400">{roleDisplayNames[currentRole].dept}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xs">
              {currentRole === 'NATIONAL_DIRECTOR' ? 'ND' : currentRole === 'DISTRICT_COLLECTOR' ? 'DM' : currentRole === 'LEGAL_COMPLIANCE_OFFICER' ? 'LC' : 'PM'}
            </div>
          </div>
        </div>
      </div>

      {/* Nav Tabs Ribbon */}
      <nav className="px-4 sm:px-6 flex items-center gap-5 overflow-x-auto no-scrollbar bg-slate-900 text-xs font-medium border-t border-slate-800/40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 py-2.5 transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
                isActive
                  ? 'text-blue-400 border-blue-400 font-semibold'
                  : 'text-slate-300 hover:text-white border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.highlight && (
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] px-1.5 py-0.2 rounded font-bold">
                  Core
                </span>
              )}
              {item.badge && item.badge > 0 ? (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
