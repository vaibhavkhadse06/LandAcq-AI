import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  ShieldAlert, 
  Eye, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Info, 
  CheckCircle2, 
  Scale, 
  Sparkles, 
  Flame 
} from 'lucide-react';
import { LandAcquisitionProject, LandParcel } from '../types';

interface GisCorridorMapViewProps {
  projects: LandAcquisitionProject[];
  onSelectProject: (project: LandAcquisitionProject) => void;
  onNavigateToWhatIf: (projectId: string) => void;
}

export const GisCorridorMapView: React.FC<GisCorridorMapViewProps> = ({
  projects,
  onSelectProject,
  onNavigateToWhatIf
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [activeMapLayer, setActiveMapLayer] = useState<'risk' | 'litigation' | 'tribal' | 'disbursement'>('risk');
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Map coordinate bounds approximation for India (8 to 35 N, 68 to 96 E)
  const mapToCanvasCoords = (lat: number, lng: number) => {
    // Mapping lat (8 to 34) and lng (68 to 90) into percentage 0 to 100
    const minLat = 8.0;
    const maxLat = 34.0;
    const minLng = 68.0;
    const maxLng = 90.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;

    return { 
      x: Math.max(5, Math.min(95, x)), 
      y: Math.max(5, Math.min(95, y)) 
    };
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              GIS Digital Map & Infrastructure Corridor Visualizer
            </h2>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
              Spatial Decision Support
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Geospatial tracking of national infrastructure corridors, cadastral land parcels, and high-risk acquisition choke points
          </p>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <span className="text-[10px] text-slate-500 px-2 font-bold uppercase">Layer:</span>
          <button
            onClick={() => setActiveMapLayer('risk')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
              activeMapLayer === 'risk' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Risk Score
          </button>
          <button
            onClick={() => setActiveMapLayer('litigation')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
              activeMapLayer === 'litigation' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Court Stays
          </button>
          <button
            onClick={() => setActiveMapLayer('tribal')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
              activeMapLayer === 'tribal' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Forest & PESA
          </button>
          <button
            onClick={() => setActiveMapLayer('disbursement')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
              activeMapLayer === 'disbursement' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Disbursement %
          </button>
        </div>
      </div>

      {/* Main GIS Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Interactive Digital Map */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-5 relative min-h-[500px] flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:28px_28px]"></div>

          {/* Map Compass & HUD */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Spatial Projection: WGS 84 • NMP GatiShakti Coordinate Grid</span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg text-slate-400">
                <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
              </div>
            </div>
          </div>

          {/* Render Vector Nodes for Projects */}
          <div className="relative z-10 w-full h-[400px] my-auto">
            {/* SVG Connecting Corridors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 22% 38% Q 40% 50% 48% 68% T 78% 75%"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-40"
              />
              <path
                d="M 38% 30% L 22% 38% L 28% 62%"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="opacity-30"
              />
            </svg>

            {/* Project Nodes */}
            {projects.map((project) => {
              const pos = mapToCanvasCoords(project.coordinates[0], project.coordinates[1]);
              const isSelected = project.id === currentProject.id;
              const isCritical = project.riskLevel === 'CRITICAL';
              const isHigh = project.riskLevel === 'HIGH';

              let markerBg = 'bg-emerald-500';
              if (activeMapLayer === 'risk') {
                markerBg = isCritical ? 'bg-rose-500' : isHigh ? 'bg-orange-500' : project.riskLevel === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500';
              } else if (activeMapLayer === 'litigation') {
                markerBg = project.legalDisputes.length > 0 ? 'bg-rose-500' : 'bg-emerald-500';
              } else if (activeMapLayer === 'tribal') {
                markerBg = project.forestTribalLandPct > 10 ? 'bg-cyan-500' : 'bg-slate-600';
              } else if (activeMapLayer === 'disbursement') {
                const disb = project.compensationAllocatedCr > 0 ? (project.compensationDisbursedCr / project.compensationAllocatedCr) : 0;
                markerBg = disb < 0.5 ? 'bg-rose-500' : disb < 0.8 ? 'bg-amber-500' : 'bg-emerald-500';
              }

              return (
                <div
                  key={project.id}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    setSelectedParcel(null);
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring animation */}
                    {isCritical && (
                      <span className="absolute w-8 h-8 rounded-full bg-rose-500/30 animate-ping pointer-events-none"></span>
                    )}

                    <div className={`w-6 h-6 rounded-full ${markerBg} text-slate-950 font-extrabold text-[10px] flex items-center justify-center shadow-lg border-2 ${
                      isSelected ? 'border-white ring-2 ring-emerald-400' : 'border-slate-950'
                    }`}>
                      {project.overallRiskScore}
                    </div>

                    {/* Tooltip Label */}
                    <div className={`absolute top-full mt-1.5 whitespace-nowrap px-2 py-0.5 rounded text-[9px] font-bold shadow-lg transition-all ${
                      isSelected 
                        ? 'bg-slate-900 text-white border border-emerald-500/50' 
                        : 'bg-slate-950/80 text-slate-300 border border-slate-800'
                    }`}>
                      {project.code}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Legend Footer */}
          <div className="relative z-10 bg-slate-900/90 border border-slate-800 backdrop-blur-md p-3 rounded-lg flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-400">Risk Color Codes:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Critical (&gt;80)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                <span>High (65-80)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Moderate (40-65)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Low (&lt;40)</span>
              </div>
            </div>

            <span className="text-[10px] text-slate-400">Click any marker to inspect corridor parcels</span>
          </div>
        </div>

        {/* Right Col: Selected Corridor GIS Parcel Inspector */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded">
                {currentProject.code}
              </span>
              <h3 className="text-base font-extrabold text-white mt-1">
                {currentProject.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentProject.state} ({currentProject.districts.join(', ')}) • {currentProject.agency}
              </p>
            </div>

            {/* Choke Point Snapshot */}
            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Composite Risk Score:</span>
                <span className={`font-extrabold text-sm ${
                  currentProject.overallRiskScore > 75 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {currentProject.overallRiskScore}/100 ({currentProject.riskLevel})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Forecast Delay:</span>
                <span className="font-bold text-rose-400">+{currentProject.predictedDelayWeeks} Weeks</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Land Possessed:</span>
                <span className="font-bold text-cyan-400">
                  {currentProject.landAcquiredHa} / {currentProject.totalLandRequiredHa} Ha ({Math.round((currentProject.landAcquiredHa / currentProject.totalLandRequiredHa) * 100)}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tribal / Forest Exposure:</span>
                <span className="font-bold text-amber-400">{currentProject.forestTribalLandPct}% of Alignment</span>
              </div>
            </div>

            {/* Cadastral Parcels List */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Cadastral Survey Parcels ({currentProject.parcels.length} Tracked):
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {currentProject.parcels.map((parcel, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedParcel(parcel)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      selectedParcel?.surveyNumber === parcel.surveyNumber
                        ? 'bg-emerald-500/10 border-emerald-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="font-mono text-cyan-400">{parcel.surveyNumber}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                        parcel.possessionStatus === 'DISPUTED' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {parcel.possessionStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {parcel.village}, {parcel.district} • {parcel.areaHectares} Ha ({parcel.classification})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={() => onSelectProject(currentProject)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-lg transition-all cursor-pointer text-center"
            >
              Full Deep Dive
            </button>
            <button
              onClick={() => onNavigateToWhatIf(currentProject.id)}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold py-2 rounded-lg transition-all cursor-pointer text-center"
            >
              Simulate Actions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
