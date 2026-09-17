import React, { useState } from 'react';
import { 
  History, 
  ShieldCheck, 
  Search, 
  Filter, 
  Lock, 
  KeyRound, 
  CheckCircle2, 
  FileText, 
  Clock 
} from 'lucide-react';
import { AuditLog, UserRole } from '../types';

interface AuditTrailViewProps {
  auditLogs: AuditLog[];
  currentRole: UserRole;
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({
  auditLogs,
  currentRole
}) => {
  const [filterAction, setFilterAction] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesAction = filterAction === 'ALL' || log.action === filterAction;
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.projectName && log.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.tamperEvidenceHash.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesAction && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              Statutory Compliance & Security Audit Ledger
            </h2>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
              Immutable Cryptographic Log
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete tamper-evident record of all AI predictions, policy simulations, legal directives, and user actions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Current Session Role:</span>
            <span className="font-bold text-emerald-400">{currentRole}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by user, project, action, or SHA-256 hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold">Action Type:</span>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Actions</option>
            <option value="PREDICTION_GENERATED">Prediction Generated</option>
            <option value="POLICY_SIMULATION_EXECUTED">Policy Simulation Executed</option>
            <option value="ALERT_DISPATCHED">Alert Dispatched</option>
            <option value="MODEL_RETRAINED">Model Retrained</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Timestamp (IST)</th>
                <th className="py-3.5 px-4">User & Role</th>
                <th className="py-3.5 px-4">Action Event</th>
                <th className="py-3.5 px-4">Affected Corridor</th>
                <th className="py-3.5 px-4">Action Details</th>
                <th className="py-3.5 px-4">Tamper Hash (SHA-256)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-200">{log.user}</div>
                    <div className="text-[10px] text-emerald-400 font-mono">{log.role}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-300">{log.projectName || 'System-Wide'}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                    {log.details}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                    {log.tamperEvidenceHash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
