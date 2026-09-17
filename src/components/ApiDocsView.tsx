import React, { useState } from 'react';
import { 
  FileCode2, 
  Layers, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Database, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Globe,
  Download 
} from 'lucide-react';
import { README_MARKDOWN_CONTENT } from '../data/readmeContent';

export const ApiDocsView: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'predict' | 'simulate' | 'projects' | 'alerts'>('predict');
  const [requestBody, setRequestBody] = useState<string>(
    JSON.stringify({
      sector: "Highways & Expressways",
      totalLandRequiredHa: 145.0,
      affectedFamiliesCount: 1850,
      privateLandPct: 78.0,
      forestTribalLandPct: 15.0,
      circleRateDiscrepancyPct: 45.0,
      currentStage: "STAGE_3_SEC19_DECLARATION",
      daysElapsedInCurrentStage: 290,
      activeLegalDisputesCount: 3,
      compensationDisbursedPct: 35.0,
      clearancesPendingCount: 2
    }, null, 2)
  );

  const [responsePayload, setResponsePayload] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const testApi = async () => {
    setIsLoading(true);
    try {
      let url = '/api/predict';
      let method = 'POST';
      let body: any = requestBody;

      if (selectedEndpoint === 'simulate') {
        url = '/api/simulate-what-if';
        body = JSON.stringify({
          projectId: "PROJ-HSR-001",
          compensationDisbursementMultiplier: 1.8,
          fastTrackLegalSettlementPct: 75,
          clearanceSlaCompressionDays: 50,
          enhancedRRPackagePct: 20,
          dedicatedJointTaskforce: true
        });
      } else if (selectedEndpoint === 'projects') {
        url = '/api/projects';
        method = 'GET';
        body = undefined;
      } else if (selectedEndpoint === 'alerts') {
        url = '/api/alerts';
        method = 'GET';
        body = undefined;
      }

      const res = await fetch(url, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body
      });

      const data = await res.json();
      setResponsePayload(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponsePayload(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const copySnippet = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-emerald-400" />
              Government Data Lake & PM GatiShakti REST Integration APIs
            </h2>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
              OpenAPI 3.0 Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Secure machine-to-machine endpoints to integrate with State Land Record Portals, PM GatiShakti NMP, and ERP Data Lakes.
          </p>
        </div>

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
          className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          title="Download complete README documentation"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          Download README.md
        </button>
      </div>

      {/* Connected Government Ecosystem Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { name: 'PM GatiShakti NMP', status: 'ACTIVE', latency: '42ms', sync: 'Live 50+ Layers' },
          { name: 'Bhoomi Karnataka', status: 'ACTIVE', latency: '68ms', sync: 'Cadastral RTC Sync' },
          { name: 'e-Bhoomi Haryana', status: 'ACTIVE', latency: '54ms', sync: 'Circle Rate Feed' },
          { name: 'CPGRAMS Grievances', status: 'ACTIVE', latency: '92ms', sync: 'Dispute Stream' },
          { name: 'TARANG Power Grid', status: 'ACTIVE', latency: '61ms', sync: 'RoW Corridor Sync' },
          { name: 'NHAI Data Lake', status: 'ACTIVE', latency: '38ms', sync: 'RAMS Milestone API' }
        ].map((sys, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 text-[11px] truncate">{sys.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>{sys.latency}</span>
              <span className="text-emerald-400 font-bold">{sys.status}</span>
            </div>
            <span className="text-[9px] text-slate-500 block truncate">{sys.sync}</span>
          </div>
        ))}
      </div>

      {/* Interactive API Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Endpoint Selection */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            Available Endpoints
          </h3>

          <div className="space-y-2">
            {[
              { id: 'predict', method: 'POST', path: '/api/predict', desc: 'Real-time delay probability & SHAP feature scoring' },
              { id: 'simulate', method: 'POST', path: '/api/simulate-what-if', desc: 'Policy intervention counterfactual simulation' },
              { id: 'projects', method: 'GET', path: '/api/projects', desc: 'Portfolio query & stage status feed' },
              { id: 'alerts', method: 'GET', path: '/api/alerts', desc: 'Statutory lapse & threshold notifications' }
            ].map((ep) => (
              <div
                key={ep.id}
                onClick={() => {
                  setSelectedEndpoint(ep.id as any);
                  setResponsePayload(null);
                }}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedEndpoint === ep.id
                    ? 'bg-emerald-500/10 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-mono">
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                    ep.method === 'POST' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="font-bold text-slate-200">{ep.path}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{ep.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 8 Cols: Interactive Tester & Payload Preview */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {selectedEndpoint === 'predict' || selectedEndpoint === 'simulate' ? 'POST' : 'GET'}
                </span>
                <span className="font-mono text-xs font-bold text-white">
                  /api/{selectedEndpoint === 'predict' ? 'predict' : selectedEndpoint === 'simulate' ? 'simulate-what-if' : selectedEndpoint}
                </span>
              </div>

              <button
                onClick={testApi}
                disabled={isLoading}
                className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Executing Request...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>

            {/* Request Body (For POST) */}
            {(selectedEndpoint === 'predict' || selectedEndpoint === 'simulate') && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  JSON Request Payload
                </span>
                <textarea
                  rows={6}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>
            )}

            {/* Live Response Box */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Server Response JSON
              </span>
              <pre className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400 max-h-60 overflow-y-auto whitespace-pre-wrap">
                {responsePayload || 'Click "Send Request" to execute live against backend API.'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
